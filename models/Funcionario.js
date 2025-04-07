const pool = require("../db");

const Funcionario = {
  async create({ nome, cpf, telefone, email }) {
    const result = await pool.query(
      "INSERT INTO funcionarios (nome, cpf, telefone, email) VALUES ($1, $2, $3, $4) RETURNING *",
      [nome, cpf, telefone, email]
    );
    return result.rows[0];
  },

  async findAll() {
    const result = await pool.query("SELECT * FROM funcionarios");
    return result.rows;
  },

  async findById(id) {
    const result = await pool.query("SELECT * FROM funcionarios WHERE id = $1", [id]);
    return result.rows[0];
  },

  async update(id, { nome, cpf, telefone, email }) {
    const result = await pool.query(
      "UPDATE funcionarios SET nome = $1, cpf = $2, telefone = $3, email = $4 WHERE id = $5 RETURNING *",
      [nome, cpf, telefone, email, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await pool.query(
      "DELETE FROM funcionarios WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  },

  async deleteAll() {
    const result = await pool.query("DELETE FROM funcionarios RETURNING *");
    return result.rows;
  }
  
  };
  


module.exports = Funcionario;
