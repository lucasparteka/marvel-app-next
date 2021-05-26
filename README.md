# Marvel App Nextjs

Projeto frontend desenvolvido em React com Nextjs e Material UI para consumir api da Marvel


## Instalação

Aplicação desenvolvida usando node `14.0.0` react `17.0.2` e next `10.2.2`


Crie uma [conta na marvel](https://www.marvel.com/signin?referer=https%3A%2F%2Fdeveloper.marvel.com%2Faccount) 

Criar um arquivo `.env` baseado no modelo `.env-example` contido na raiz do projeto.

No arquivo `.env` inserir sua chave publica e privada gerada pela Marvel.

Após isso

```bash
npm run install
```

### Para subir a aplicação como ambiente de dev do next

Dessa forma, nenhuma estratégia de geração estática ou SSR será feita pelo next

```bash
npm run dev
```

### Para subir a aplicação simulando ambiente de prod
Dessa forma, o next irá gerar as páginas informadas nos métodos `getStaticPaths` em tempo de build

```bash
npm run build
npm start
```

A aplicação estará disponível no endereço `http://localhost:3000/`

dúvidas? entre em contato comigo pelo email `lucasparteka@gmail.com`