### Função Lambda para Inserção de Dados no Bucket S3

Essa função Lambda cria a inserção de dados no bucket do S3.

Usamos a lib: [lambda-multipart-parser](https://www.npmjs.com/package/lambda-multipart-parser)

Essa biblioteca nos ajuda a manipular o multipart para ser enviado nas requests da Lambda.

---

### O que é uma Presigned URL?

Uma **Presigned URL** é uma URL temporária que permite a inserção de dados no bucket do S3. Essa URL é gerada pelo próprio bucket.

---

### Estrutura de Pastas

Vamos ter duas pastas:

1. **Convencional**
2. **Presigned URLs**

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


O server faz as validações e salva no S3. Porém, no modelo das Urls presigned-urls, o upload acontece no client
e não mais no Server.

---

**Presigned Urls:**

## Client - /upload --- application/json -> Server - Presigned Url -> S3 (Bucket)

Dessa forma, o Client faz uma request mandando um application/json ou nada. Enquanto isso, o server, faz uma request pedindo
uma presigned Url e devolve essa url para o client inserir os dados.