# Plataforma de Gestão para Grupos de Networking

Teste técnico para o processo seletivo de desenvolvedor fullstack na AG Sistemas

## Executar o projeto

O jeito mais fácil de rodar o projeto (em modo desenvolvimento) é por meio do Docker.

Depois disso, basta clonar o repositório, e em um terminal navegar até a raiz do projeto e executar no terminal:

> docker-compose up -d

Isso irá iniciar o banco de dados, o backend e o frontend, podendo levar 1 ou 2 minutos. Por rodar em modo build, algumas páginas podem demorar alguns segundos a mais para carregar na primeira vez que forem acessadas.

Normalmente seria necessário configurar arquivos de ambiente (.env) mas por conveniência, deixei arquivos .env.public no repositório, que são usados na build de desenvolvimento feita com o docker.

## Executar os testes

Para iniciar os testes no backend, basta navegar para /projeto/backend e executar no terminal:

> npm test