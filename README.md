# Sistema de Gerenciamento de Produtos das Indústrias Wayne

## Descrição

Este é um sistema de gerenciamento de produtos para um ambiente de produção e estoque, onde os usuários préviamente cadastrados podem adicionar, visualizar e excluir produtos. O sistema possui uma interface web simples, permitindo fácil interação e uso.

## Funcionalidades

- **Adicionar Produtos:** Os administradores podem inserir novos produtos, especificando seu nome e status (disponível ou indisponível).
- **Visualizar Produtos:** Os produtos cadastrados são exibidos em uma lista, com suas respectivas informações.
- **Excluir Produtos:** Os administradores podem remover produtos indesejados da lista.
- **Atualizar Status:** Os gerentes podem atualizar o status dos produtos.

## Tecnologias Utilizadas

- **Frontend:**
  - HTML
  - CSS
  - JavaScript

- **Backend:**
  - Flask (Python)
  - SQLite (banco de dados)

## Estrutura do Projeto

**Página de login:** Somente três usuários foram préviamente cadastrados e  tem acesso ao sistema.

User: alfred / Senha: 12345

User: coringa / Senha: 12345

User: bruce / Senha: 12345

![Página de login](images/login.png)
![Página de login](images/login-eerro.png)

**Painel do usuário:** O painel do usuário também muda de acordo com o cargo (funcionário, gerente ou administrador) consedendo mais opções a uns e menos a outros. Até o momento, a única aba implementada é a da categoria "ARMAS".
![Página de login](images/welcome23.png)
![Página de login](images/welcomme1.png)
![Página de login](images/welcome2.png)

**Lista de produtos:** Aqui o usuário tem acesso a todos os produtos cadastrados em nosso banco de dados. Também é possível adcionar, excluir ou mesmo editar o status dos produtos de acordo com o tipo de conta que está acessando.
![Página de login](images/pro2.png)
![Página de login](images/pro1.png)
![Página de login](images/pro3.png)


