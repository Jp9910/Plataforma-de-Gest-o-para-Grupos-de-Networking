export const swaggerDocs = {
    openapi: "3.0.0",
    info: {
        title: "Plataforma Networking API",
        version: "1.0.0",
        description: "API da plataforma de grupo de networking"
    },
    servers: [{ url: "http://localhost:3001", description: "Local" }],
    components: {
        schemas: {
            Intencao: {
                type: "object",
                properties: {
                    id: { type: "integer", example: 1 },
                    nome: { type: "string", example: "Bob" },
                    email: { type: "string", example: "teste@email.com" },
                    empresa: { type: "string", example: "Empresa X" },
                    motivo_participar: { type: "string", example: "Preciso de networking" },
                    status: { type: "string", example: "Pendente" },
                    created_at: { type: "string", format: "date-time", example: (new Date()).toISOString() }
                }
            },
            CadastroIntencao: {
                type: "object",
                properties: {
                    nome: { type: "string", example: "Bob" },
                    email: { type: "string", example: "emaildobob@gmail.com" },
                    empresa: { type: "string", example: "Alguma empresa" },
                    motivo_participar: { type: "string", example: "Conectar com profissionais" }
                },
                required: ["nome", "email"]
            },
            AprovarIntencao: {
                type: "object",
                properties: { bool_aprovar: { type: "boolean", example: true } },
                required: ["bool_aprovar"]
            },
            RespostaErro: {
                type: "object",
                properties: { errors: { type: "array", items: { message: { type: "string" } } }, status: {type : "integer"} }
            }
        },
        parameters: {
            parametroId: {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "integer" }
            }
        }
    },
    paths: {
        "/intencoes": {
            get: {
                summary: "Listar intenções",
                responses: {
                    "200": {
                        description: "Lista de intenções",
                        content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Intencao" } } } }
                    }
                }
            }
        },
        "/intencoes/cadastro": {
            post: {
                summary: "Cadastrar nova intenção",
                requestBody: {
                    required: true,
                    content: { "application/json": { schema: { $ref: "#/components/schemas/CadastroIntencao" } } }
                },
                responses: {
                    "201": { description: "Intenção cadastrada", content: { "application/json": { schema: { $ref: "#/components/schemas/Intencao" } } } },
                    "400": { description: "Erro de validação", content: { "application/json": { schema: { $ref: "#/components/schemas/RespostaErro" } } } }
                }
            }
        },
        "/intencoes/{id}/status": {
            put: {
                summary: "Aprovar ou rejeitar intenção",
                parameters: [{ $ref: "#/components/parameters/parametroId" }],
                requestBody: {
                    required: true,
                    content: { "application/json": { schema: { $ref: "#/components/schemas/AprovarIntencao" } } }
                },
                responses: {
                    "204": { description: "Status alterado com sucesso (sem conteúdo)" },
                    "400": { description: "Erro de validação", content: { "application/json": { $ref: "#/components/schemas/RespostaErro" } } },
                    "404": { description: "Intenção não encontrada" }
                }
            }
        }
    }
};