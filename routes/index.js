const express = require("express");
const router = express.Router();

const funcionarioController = require("../controllers/funcionarioController");
const enderecoController = require("../controllers/enderecoController");
const equipamentoController = require("../controllers/equipamentoController");
const emprestimoController = require("../controllers/emprestimoController");

// Funcionário
router.post("/funcionarios", funcionarioController.criar);
router.get("/funcionarios", funcionarioController.listar);
router.put("/funcionarios/:id", funcionarioController.atualizar);
router.delete("/funcionarios/:id", funcionarioController.deletar);
router.delete("/funcionarios", funcionarioController.deletarTodos);



// Endereço
// Endereços
router.post("/enderecos", enderecoController.criar);
router.get("/enderecos", enderecoController.listar);
router.put("/enderecos/:id", enderecoController.atualizar);
router.delete("/enderecos/:id", enderecoController.deletar);
router.delete("/enderecos", enderecoController.deletarTodos);


// Equipamento
router.post("/equipamentos", equipamentoController.criar);
router.get("/equipamentos", equipamentoController.listar);
router.put("/equipamentos/:id", equipamentoController.atualizar);
router.delete("/equipamentos/:id", equipamentoController.deletar);
router.delete("/equipamentos", equipamentoController.deletarTodos);

// Empréstimos
router.post("/emprestimos", emprestimoController.criar);
router.get("/emprestimos", emprestimoController.listar);
router.put("/emprestimos/:id/devolver", emprestimoController.devolver);
router.get("/emprestimos/:id", emprestimoController.buscarPorId);
router.delete("/emprestimos/:id", emprestimoController.deletarPorId); // Rota para deletar um empréstimo por ID
router.delete("/emprestimos", emprestimoController.deletarTodos); // Rota para deletar todos os empréstimos


module.exports = router;
