# Plataforma de Gestão para Grupos de Networking

Teste técnico para o processo seletivo de desenvolvedor fullstack na AG Sistemas

## Executar o projeto

O jeito mais fácil de rodar o projeto (em modo desenvolvimento) é por meio do Docker.

Primeiro instale o Docker (https://docs.docker.com/engine/install/). Depois disso, basta clonar o repositório, e em um terminal navegar até a raiz do projeto e executar no terminal:

> docker-compose up -d

Isso irá iniciar o banco de dados, o backend e o frontend, podendo levar entre 1 a 4 minutos para terminar a inicialização. Por rodar em modo dev, algumas páginas podem demorar alguns segundos a mais para carregar na primeira vez que forem acessadas. Após terminar a inicialização, pode-se acessar `http://localhost:3000` no navegador para utilizar a plataforma.

Normalmente seria necessário configurar arquivos de ambiente (.env) mas por conveniência, deixei arquivos .env.public no repositório, que são usados na build de desenvolvimento feita com o docker.

*Sobre o cadastro de membro: Após aprovar uma intenção, um token será gerado para o cadastro do membro, e um link com esse token será impresso no console do container do backend e também no console do navegador, no formato `http://localhost:3000/membros/cadastro/<token_de_cadastro>`. Para cadastrar o membro, é necessário usar esse link.

*Senha padrão de administrador: 123

## Executar os testes

Para iniciar os testes no backend, é preciso iniciar o Docker (para os testes de integração), e após isso navegar para /projeto/backend e executar no terminal:

> npm install
> npm test

Para iniciar os testes no frontend, basta navegar para /projeto/frontend e executar no terminal:

> npm install
> npm test

(Obs: No frontend, é possível que o Vitest acuse de não estar conseguindo localizar a biblioteca happy-dom para os testes, e sugerirá instalá-la, mas basta apertar N para recusar a instalação e os testes funcionarão normalmente. Não sei explicar porque isso acontece, talvez seja um problema em alguma biblioteca)