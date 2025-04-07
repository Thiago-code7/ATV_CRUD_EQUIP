const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const rotas = require("./routes/index");

app.use(cors());
app.use(express.json());

// 🔐 Prefixo para suas rotas (ex: /api/funcionarios)
app.use("/api", rotas);

// Rota de teste simples
app.get('/teste', (req, res) => {
  res.json({ mensagem: 'API funcionando! 🎉' });
});

// ✅ Apenas uma chamada do listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
