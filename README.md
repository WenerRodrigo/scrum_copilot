# Scrum Copilot


# Descrição

Este projeto é uma aplicação Angular que permite o gerenciamento completo de uma lista de tarefas, incluindo funcionalidades de CRUD (Create, Read, Update, Delete), telas de dashboard para monitoramento do progresso, autenticação com validações, reset de senha via e-mail, e integração com uma API em C# para manipulação de dados no banco de dados SQL Server. Além disso, há a inclusão de um bot para geração de relatórios sobre o status das etapas.

# Funcionalidades

# 1. CRUD

# Tarefas: Permite criar, visualizar, editar e excluir tarefas.

# Metas e Etapas: Possibilidade de associar metas a tarefas e dividir em etapas.

# 2. Dashboard
# Visão Geral: 
Exibe o status geral das tarefas, destacando as concluídas, em atraso, em andamento e em execução.
Gráficos Interativos: Gráficos visuais que facilitam a compreensão do progresso.

# 3. Autenticação e Segurança
# Cadastro de Usuário: 
Formulário de registro com validações para garantir dados consistentes.
Login e Logout: Autenticação segura para acessar as funcionalidades.

# 4. Recuperação de Senha
# Reset de Senha via E-mail: 
Funcionalidade para redefinir a senha do usuário por meio de um link enviado por e-mail.

# 5. Relatórios
# Bot de Relatórios: 
Integração com um bot para gerar relatórios sobre o status das etapas, fornecendo insights valiosos.
Pré-requisitos

Node.js e npm: Instalados para execução do ambiente Angular.

Angular CLI: Necessário para gerenciar a aplicação Angular.

Banco de Dados SQL Server: Configurado com as tabelas necessárias para armazenar dados.

Visual Studio ou IDE equivalente: Para executar a API em C#.


# Configuração

# Clone o repositório:
git clone https://github.com/seu-usuario/seu-projeto.git
cd seu-projeto

# Instale as dependências:
npm install ou npm i

# Configuração da API:
Abra o projeto da API no Visual Studio.
Configure a conexão com o banco de dados no arquivo appsettings.json.
Execute a API.

# Executando o Projeto
Utilize o seguinte comando para iniciar a aplicação Angular:
ng serve ou npm start


# Contribuindo
Contribuições são bem-vindas. Antes de realizar alterações significativas, abra uma issue para discussão.


# Preview

![Alt text](TelaInicio.png)

![Alt text](TelaValidarEmail.png)

![Alt text](TelaCadastro.png)

![Alt text](TelaDashboard.png)

![Alt text](TelaSobre.png)

![Alt text](TelaMetas.png)

![Alt text](TelaEtapas.png)

![Alt text](TelaEtapasReport.png)

![Alt text](TelaEtapaFiltro.png)

![Alt text](TelaPopup.png)

