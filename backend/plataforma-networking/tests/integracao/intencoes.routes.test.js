import { Client } from 'pg'
import { PostgreSqlContainer }  from "@testcontainers/postgresql";
import { GenericContainer } from 'testcontainers';
import request from 'supertest';
import app from '../../src/app.js';

describe("Intencoes Rotas", () => {
    let containerPostgres;

    beforeAll(async () => {
        // containerPostgres = await new GenericContainer('postgres', '17')
        //     .withEnvironment({'POSTGRES_USER': 'test_user', 'POSTGRES_PASSWORD': 'test_senha', 'POSTGRES_DB': 'test_db'})
        //     .withCopyDirectoriesToContainer([{ // copiar o script sql para a pasta especifica do postgres que rodará o script
        //         source: "../../initBD",
        //         target: "/docker-entrypoint-initdb.d"
        //     }, ])
        //     .withExposedPorts(5432)
        //     .start();
        // const port = containerPostgres.getMappedPort(5432);
        // const stringConexao = `postgres://test_user:test_senha@localhost:${port}/test_db`;

        containerPostgres = await new PostgreSqlContainer("postgres:17-alpine")
            .start()

        const stringConexao = containerPostgres.getConnectionUri();

        postgresClient = new Client({ connectionString: stringConexao });
        await postgresClient.connect();
    });

    beforeEach(async () => {
        // limpar linhas das tabelas antes de cada teste
        await postgresClient.query('TRUNCATE convites, membros, intencoes RESTART IDENTITY CASCADE');
    });

    afterAll(async () => {
        await postgresClient.end()
        await containerPostgres.stop();
    });

    test('POST /intencoes -> cria intenção e retorna 201 com id', async () => {
        const payload = { nome: 'João', email: 'joao@email.com', empresa: 'Empresa Qualquer', motivo_participar: 'networking' };
        const res = await request(app)
            .post('/intencoes')
            .send(payload)
            .set('Content-Type', 'application/json');

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        const db = await postgresClient.query('SELECT * FROM intencoes WHERE id = $1', [res.body.id]);
        expect(db.rowCount).toBe(1);
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