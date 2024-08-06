const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const app = express();
require("dotenv").config();
const PORT = process.env.NODEJS_PORT || 3000;

app.use(bodyParser.json());

// Configurar banco de dados MySQL
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_ROOT_USER || "root",
  password: process.env.MYSQL_ROOT_PASSWORD || "ifpecjbg",
  database: process.env.MYSQL_DATABASE || "hospital",
  port: process.env.MYSQL_PORT || 3307,
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar com o banco de dados: ", err.message);
    return;
  }
  console.log("Conexão estabelecida.");
});

// Criar tabela pacientes
db.query(
  `CREATE TABLE IF NOT EXISTS pacientes (
  id_paciente INT AUTO_INCREMENT PRIMARY KEY, 
  nome_paciente VARCHAR(255) NOT NULL, 
  data_nascimento DATE NOT NULL, 
  plano_saude VARCHAR(255) NOT NULL, 
  historico_medico VARCHAR(255) NOT NULL
  )`,
  (err) => {
    if (err) {
      console.error("Erro ao criar tabela: ", err.message);
      return;
    }
    console.log('Tabela "pacientes" criada ou já existe');
  }
);

// Rotas

// Listagem de todos os registros
app.get("/pacientes", (req, res) => {
  db.query("SELECT * FROM pacientes", (err, results) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.json(results);
  });
});

// Recuperação de um cadastro pelo campo id
app.get("/pacientes/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM pacientes WHERE id_paciente = ?",
    [id],
    (err, result) => {
      if (err) {
        res.status(500).send(err.message);
        return;
      }
      if (result.length === 0) {
        res.status(404).send("Paciente não encontrado.");
        return;
      }
      res.json(result[0]);
    }
  );
});

// Cadastro
app.post("/pacientes", (req, res) => {
  const { nome_paciente, data_nascimento, plano_saude, historico_medico } =
    req.body;
  db.query(
    "INSERT INTO pacientes (nome_paciente, data_nascimento, plano_saude, historico_medico) VALUES (?, ?, ?, ?)",
    [nome_paciente, data_nascimento, plano_saude, historico_medico],
    (err, result) => {
      if (err) {
        res.status(500).send(err.message);
        return;
      }
      res.status(201).json({ id: result.insertId });
    }
  );
});

// Edição
app.put("/pacientes/:id", (req, res) => {
  const id = req.params.id;
  const { nome_paciente, data_nascimento, plano_saude, historico_medico } =
    req.body;
  db.query(
    "UPDATE pacientes SET nome_paciente = ?, data_nascimento = ?, plano_saude = ?, historico_medico = ? WHERE id_paciente = ?",
    [nome_paciente, data_nascimento, plano_saude, historico_medico, id],
    (err, result) => {
      if (err) {
        res.status(500).send(err.message);
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).send("Paciente não encontrado.");
        return;
      }
      res.sendStatus(204);
    }
  );
});

// Deleção
app.delete("/pacientes/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "DELETE FROM pacientes WHERE id_paciente = ?",
    [id],
    (err, result) => {
      if (err) {
        res.status(500).send(err.message);
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).send("Paciente não encontrado.");
        return;
      }
      res.sendStatus(204);
    }
  );
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor ativo em http://localhost:${PORT}`);
});
