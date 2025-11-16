# Plataforma de Gestão para Grupos de Networking

Teste técnico para o processo seletivo de desenvolvedor fullstack na AG Sistemas

## Executar o projeto

O jeito mais fácil de rodar o projeto (em modo desenvolvimento) é por meio do Docker.

Depois disso, basta clonar o repositório, e em um terminal navegar até a raiz do projeto e executar no terminal:

> docker-compose up -d

Isso irá iniciar o banco de dados, o backend e o frontend, podendo levar 1 ou 2 minutos. Por rodar em modo build, algumas páginas podem demorar alguns segundos a mais para carregar na primeira vez que forem acessadas.

Normalmente seria necessário configurar arquivos de ambiente (.env) mas por conveniência, deixei arquivos .env.public no repositório, que são usados na build de desenvolvimento feita com o docker.

## Executar os testes

Para iniciar os testes no backend, é preciso iniciar o Docker (para os testes de integração), e após isso navegar para /projeto/backend e executar no terminal:

> npm install
> npm test

Para iniciar os testes no frontend, basta navegar para /projeto/frontend e executar no terminal:

> npm install
> npm test

(Obs: No frontend, é possível que o Vitest acuse de não estar conseguindo localizar a biblioteca happy-dom para os testes, e sugerirá instalá-la, mas basta apertar N para recusar a instalação e os testes funcionarão normalmente. Não sei explicar porque isso acontece, talvez seja um problema em alguma biblioteca)