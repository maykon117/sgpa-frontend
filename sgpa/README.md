# SGPA — Sistema de Gestão de Perfis e Experiências Acadêmicas

Frontend / protótipo funcional do SGPA, desenvolvido para a disciplina de Análise e Projeto de Sistemas.

Centraliza o histórico acadêmico e profissional de estudantes: experiências, projetos, cursos,
certificados e habilidades, com visualização para professores e administração da plataforma.

> **Este é apenas o front-end.** Todos os dados são mockados e persistidos no `localStorage` do
> navegador para simular o funcionamento do sistema. Não há backend, banco de dados real ou
> autenticação segura — a estrutura já está organizada para futura integração com Node.js +
> Express e PostgreSQL.

## Tecnologias

- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router v6
- Lucide React (ícones)

## Como executar

```bash
npm install
npm run dev
```

A aplicação abre em `http://localhost:5173`.

Para gerar a build de produção:

```bash
npm run build
npm run preview
```

## Contas de demonstração

Todas usam a senha `123456`.

| Papel          | E-mail                        |
| -------------- | ------------------------------ |
| Aluno          | joao.silva@sgpa.edu.br         |
| Professor      | carlos.mendes@sgpa.edu.br      |
| Administrador  | fernanda.lima@sgpa.edu.br      |

Também é possível criar uma nova conta pela tela de cadastro.

## Estrutura do projeto

```
src/
  components/   componentes reutilizáveis (Button, Modal, Cards, formulários...)
  data/         dados mockados (usuários, projetos, experiências, cursos...)
  hooks/        useAuth (sessão), useAppData (CRUD mockado), useLocalStorage
  layouts/      Sidebar, Header, navegação mobile, AppLayout, AuthLayout
  pages/        uma página por rota
  routes/       proteção de rotas por papel de usuário
  types/        interfaces TypeScript compartilhadas
  utils/        formatação, cálculo de completude do perfil, evolução acadêmica
```

## Papéis de usuário

- **Aluno** — mantém seu próprio perfil, projetos, experiências, cursos, certificados,
  habilidades e visualiza/imprime seu currículo.
- **Professor** — pesquisa e filtra alunos, e visualiza o perfil acadêmico/profissional completo
  de cada um.
- **Administrador** — visualiza indicadores gerais da plataforma e gerencia usuários (visualizar,
  editar, ativar/desativar).

## Persistência

Os dados são salvos em `localStorage` sob chaves prefixadas com `sgpa:` (`sgpa:users`,
`sgpa:projects`, etc). Para reiniciar a demonstração do zero, limpe o localStorage do navegador
para este domínio.
