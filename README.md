# Projeto de API com Node.js e MySQL

Este projeto é uma API para gerenciar informações de pacientes, desenvolvida com Node.js e MySQL.

1. Inicie a aplicação se ainda não estiver em execução:
```bash
docker-compose up -d
```

### Rotas Disponíveis

- `GET /pacientes` - Lista todos os pacientes.
- `GET /pacientes/:id` - Retorna um paciente específico pelo ID.
- `POST /pacientes` - Cria um novo paciente. Espera um corpo JSON com `id_paciente`, `nome_paciente`, `data_nascimento`, `plano_saude` e `historico_medico`.
- `PUT /pacientes/:id` - Atualiza um paciente existente. Espera um corpo JSON com `id_paciente`, `nome_paciente`, `data_nascimento`, `plano_saude` e `historico_medico`.
- `DELETE /uspacientesers/:id` - Deleta um paciente pelo ID.

### Exemplos

1. GET /pacientes
```bash
curl -X GET http://localhost:3000/pacientes
```

2. GET /pacientes/:id
```bash
curl -X GET http://localhost:3000/pacientes/1
```

3. POST /pacientes
```bash
curl -X POST http://localhost:3000/pacientes \
-H 'Content-Type: application/json' \
-d '{
  "nome_paciente": "João Silva",
  "data_nascimento": "1990-01-01",
  "plano_saude": "Plano A",
  "historico_medico": "Sem histórico relevante"
}'
```

4. PUT /pacientes/:id
```bash
curl -X PUT http://localhost:3000/pacientes/1 \
-H 'Content-Type: application/json' \
-d '{
  "nome_paciente": "João Silva Atualizado",
  "data_nascimento": "1990-01-01",
  "plano_saude": "Plano B",
  "historico_medico": "Histórico atualizado"
}'
```

4. DELETE /pacientes/:id
```bash
curl -X DELETE http://localhost:3000/pacientes/1
```


# Inicializando separadamente

1. Inicie o contêiner MySQL se ainda não estiver em execução:
```bash
docker run --name mysql -e MYSQL_ROOT_PASSWORD=ifpecjbg -e MYSQL_DATABASE=hospital -p 3307:3306 -d mysql
```

2. Inicie o servidor Node.js:

```bash
cd server
npm i
npm start
```
