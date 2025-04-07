const pool = require("../db");

const Endereco = {
  async create({ cep, logradouro, complemento, bairro, cidade, estado, numero, funcionario_id }) {
    const result = await pool.query(
      `INSERT INTO enderecos 
      (cep, logradouro, complemento, bairro, cidade, estado, numero, funcionario_id) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [cep, logradouro, complemento, bairro, cidade, estado, numero, funcionario_id]
    );
    return result.rows[0];
  },

  async findAll() {
    const result = await pool.query("SELECT * FROM enderecos");
    return result.rows;
  },

  async findById(id) {
    const result = await pool.query("SELECT * FROM enderecos WHERE id = $1", [id]);
    return result.rows[0];
  },

  async update(id, { cep, logradouro, complemento, bairro, cidade, estado, numero, funcionario_id }) {
    const result = await pool.query(
      `UPDATE enderecos SET 
      cep = $1, logradouro = $2, complemento = $3, bairro = $4, cidade = $5, 
      estado = $6, numero = $7, funcionario_id = $8 
      WHERE id = $9 RETURNING *`,
      [cep, logradouro, complemento, bairro, cidade, estado, numero, funcionario_id, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await pool.query("DELETE FROM enderecos WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
  },

  async deleteAll() {
    const result = await pool.query("DELETE FROM enderecos RETURNING *");
    return result.rows;
  }
};

module.exports = Endereco;
