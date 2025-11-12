import { Client } from 'pg'
import { PostgreSqlContainer } from "@testcontainers/postgresql";
import request from 'supertest';
import fs from 'fs';

let containerPostgres;
let postgresClient;
let app;

describe("Intencoes Rotas", () => {

    beforeAll(async () => {
        containerPostgres = await new PostgreSqlContainer("postgres:17-alpine")
            .start()

        const stringConexao = containerPostgres.getConnectionUri();

        // cliente independente para o postgres
        postgresClient = new Client({ connectionString: stringConexao });
        await postgresClient.connect();

        // para os testes das rotas, o app deve criar seu proprio cliente/pool quando instanciado a partir dessa env
        process.env.DATABASE_CONNECTION_STRING = stringConexao;
        // importar o app apenas depois de definir a variavel dinamicamente
        ({ default: app } = await import('../../src/app.js'));

        // inicializar bd
        await executarSqlInit()
    });

    beforeEach(async () => {
        // limpar linhas das tabelas antes de cada teste
        await postgresClient.query('TRUNCATE convites, membros, intencoes RESTART IDENTITY CASCADE');
    });

    afterAll(async () => {
        await postgresClient.end()
        const { default: poolDoApp } = await import('../../src/config/conexaoBD.js'); // importar pool do app para encerrar conexao
        await poolDoApp.end();
        await containerPostgres.stop();
    });

    test('POST /intencoes -> cria intenção e retorna 201 com id', async () => {
        const dadosMock = { nome: 'João', email: 'joao@email.com', empresa: 'Empresa Qualquer', motivo_participar: 'networking' };
        
        // app deve criar seu proprio cliente para o banco a partir da env que foi definida no beforeAll
        const res = await request(app)
            .post('/intencoes')
            .send(dadosMock)
            .set('Content-Type', 'application/json');

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        const inserido = await postgresClient.query('SELECT * FROM intencoes WHERE id = $1', [res.body.id]);
        // console.log(inserido)
        expect(inserido.rowCount).toBe(1);
    });

    test('PUT /intencoes/:id/status aprova intenção e cria convite', async () => {
        const ins = await postgresClient.query(
            `INSERT INTO intencoes (nome, email, empresa, motivo_participar, status)
            VALUES ($1,$2,$3,$4,'pendente') RETURNING *`,
            ['Ana', 'alice@email.com', 'ABCD', 'motivo']
        );
        const id = ins.rows[0].id;

        const res = await request(app)
            .put(`/intencoes/${id}/status`)
            .send({ bool_aprovar: true });

        expect(res.status).toBe(204);
        const inviteRes = await postgresClient.query('SELECT * FROM convites WHERE intencao_id = $1', [id]);
        expect(inviteRes.rowCount).toBe(1);
        expect(inviteRes.rows[0]).toHaveProperty('token');
    });
});

async function executarSqlInit() {
    const sqlInit = fs.readFileSync("initBD/001_schema.sql", 'utf8')
    // console.log(sqlInit)
    await postgresClient.query(sqlInit);
}