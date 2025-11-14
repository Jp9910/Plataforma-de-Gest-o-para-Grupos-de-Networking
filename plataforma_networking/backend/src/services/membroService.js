import pool from '../config/conexaoBD.js';
import bcrypt from 'bcrypt'
import ErroBadRequest from '../erros/erroBadRequest.js'
import ErroNaoAutorizado from '../erros/erroNaoAutorizado.js';
import jwt from 'jsonwebtoken'

class MembroService {

    /**
     * Busca os membros no banco de dados
     * @returns {Promise<import('pg').QueryResult>} Resultado da query ao banco de dados
     */
    static async buscarMembros() {
        const result = await pool.query('SELECT id,nome,email FROM membros ORDER BY created_at DESC');
        return result
        // const result = await pool.query('SELECT * FROM convites ORDER BY created_at DESC');
        // return result
    }

    /**
     * Realiza login do membro
     * @param {string} email
     * @param {string} senha
     * @throws {ErroNaoAutorizado}
     * @returns {string} tokenJWT do usuário autenticado
     */
    static async loginMembro(email, senha) {
        const membroRes = await pool.query('SELECT * FROM membros WHERE email = $1', [email]);
        if (membroRes.rowCount < 1) {
            throw new ErroNaoAutorizado('Credenciais inválidas');
        }
        const membro = membroRes.rows[0]
        const match = await bcrypt.compare(senha, membro.senha);
        
        if (!match) {
            throw new ErroNaoAutorizado('Credenciais inválidas');
        }

        // Generate a JWT token for the authenticated user
        const token = jwt.sign(
            { idMembro: membro.id, email: membro.email },  // guardar dados no token
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );
        console.log("token:", token)
        return token;
    }

    /**
     * Cria uma novo membro
     * 
     * @param {string} nome 
     * @param {string} email 
     * @param {string} empresa
     * @throws {ErroBadRequest}
     * @returns {Promise<import('pg').QueryResult>} Resultado da query ao banco de dados
     */
    static async criarMembro(token, nome, email, senha, empresa, telefone, cargo) {
        const client = await pool.connect();
        const hashSenha = await bcrypt.hash(senha, 10);
        console.log(hashSenha)
        try {
            await client.query('BEGIN');
            const conviteRes = await client.query(
                'SELECT * FROM convites WHERE token = $1 FOR UPDATE', [token]
            );

            // checar se o token corresponde a algum convite
            if (conviteRes.rowCount === 0 || conviteRes.rows[0].token !== token) {
                throw new ErroBadRequest('Nenhum convite vinculado ao token passado.');
            }

            // checar se o convite ja expirou
            if (new Date(conviteRes.rows[0].expira_em) <= new Date()) {
                throw new ErroBadRequest('Convite já expirou.');
            }

            // checar se o convite já foi usado
            if (conviteRes.rows[0].usado) {
                throw new ErroBadRequest('Convite já foi usado');
            }

            // atualizar o convite como usado
            await client.query(
                'UPDATE convites SET usado = $1 WHERE token = $2',
                [true, token]
            );

            // criar novo membro
            const resultInsert = await client.query(
                `INSERT INTO membros (nome, email, senha, empresa, telefone, cargo)
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
                [nome, email, hashSenha, empresa, telefone, cargo]
            );

            await client.query('COMMIT');
            return resultInsert

        } catch (err) {
            await client.query('ROLLBACK').catch(() => { });
            if (err.message.includes('duplicate key')) {
                throw new ErroBadRequest("Já existe um membro cadastrado com esse email")
            }
            throw err;
        } finally {
            client.release();
        }

    }
}

export default MembroService