### Função Lambda para Inserção de Dados no Bucket S3

Essa função Lambda cria a inserção de dados no bucket do S3.

Usamos a lib: [lambda-multipart-parser](https://www.npmjs.com/package/lambda-multipart-parser)

Essa biblioteca nos ajuda a manipular o multipart para ser enviado nas requests da Lambda.

---

### O que é uma Presigner URL?

Uma **Presigner URL** é uma URL temporária que permite a inserção de dados no bucket do S3. Essa URL é gerada pelo próprio bucket.

---

### Estrutura de Pastas

Vamos ter duas pastas:

1. **Convencional**
2. **Presigner URLs**

---

### Requisitos

Para que o processo funcione, precisamos:

- Ter a Lambda criada.
- Ter o bucket S3 criado.
- Ter a policy para criar o `PutObject`.
- Mudar o timeout da Lambda caso demore mais do que o esperado.

---

### Diferença Entre os Modelos de Upload

**Modelo Convencional:**

No modelo convencional, quem envia o arquivo é o servidor:

## Client - multipart/form-data-> Server -> S3 (Bucket)


O server faz as validações e salva no S3. Porém, no modelo das Urls presigner-urls, o upload acontece no client
e não mais no Server.

---

**Presigner Urls:**

## Client - /upload --- application/json -> Server - Presigner Url -> S3 (Bucket)

Dessa forma, o Client faz uma request mandando um application/json ou nada. Enquanto isso, o server, faz uma request pedindo
uma presigner Url e devolve essa url para o client inserir os dados.

---

### Por fim, temos uma forma de deixar o conteúdo do bucket publico para ser acessado.

Dentro do arquivo temos dois arquivos de JS. Um sobre o PutObjectCommand, onde vemos anteriormente que conseguimos gerar uma url e inserir o arquivo no bucket, mas agora, para disponibilizar, temos o GetObjectCommand, onde disponibilizamos o conteúdo para a internet de forma simples e por uma quantidade x de tempo.