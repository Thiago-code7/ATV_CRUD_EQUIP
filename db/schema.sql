-- Tabela funcionarios
CREATE TABLE IF NOT EXISTS public.funcionarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    email VARCHAR(255)
);

INSERT INTO funcionarios (nome, cpf, telefone, email)
VALUES ('Rayssa Helena', '02020491522', '(31) 93456-7890', 'rayssa@email.com');


-- Tabela equipamentos
CREATE TABLE IF NOT EXISTS public.equipamentos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    numero_patrimonio VARCHAR(50)
);

INSERT INTO equipamentos (nome, descricao, numero_patrimonio)
VALUES ('Extintor de incêndio', 'Extintor de pó químico 4kg', 'EQP-2025-004');


-- Tabela enderecos
CREATE TABLE IF NOT EXISTS public.enderecos (
    id SERIAL PRIMARY KEY,
    cep VARCHAR(9) NOT NULL,
    logradouro VARCHAR(100) NOT NULL,
    complemento VARCHAR(100),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    estado VARCHAR(2),
    numero VARCHAR(10),
    funcionario_id INTEGER REFERENCES public.funcionarios(id) ON DELETE CASCADE
);

INSERT INTO enderecos (cep, logradouro, complemento, bairro, cidade, estado, numero, funcionario_id)
VALUES ('00022-988', 'rua da saudade', 'bloco j', 'nova descoberta', 'Natal', 'RN', '775', 1);


-- Tabela emprestimos
CREATE TABLE IF NOT EXISTS emprestimos (
    id SERIAL PRIMARY KEY,
    funcionario_id INTEGER REFERENCES funcionarios(id) ON DELETE CASCADE,
    equipamento_id INTEGER REFERENCES equipamentos(id) ON DELETE CASCADE,
    data_retirada DATE NOT NULL,
    data_devolucao DATE,
    status VARCHAR(20) NOT NULL DEFAULT 'pendente'
);

INSERT INTO emprestimos (funcionario_id, equipamento_id, data_retirada, data_devolucao, status)
VALUES (1, 1, '2025-03-03', '2025-04-07', 'devolvido');
