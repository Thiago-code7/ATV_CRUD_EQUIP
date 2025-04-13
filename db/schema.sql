CREATE TABLE IF NOT EXISTS emprestimos (
    id SERIAL PRIMARY KEY,
    funcionario_id INTEGER REFERENCES funcionarios(id) ON DELETE CASCADE,
    equipamento_id INTEGER REFERENCES equipamentos(id) ON DELETE CASCADE,
    data_retirada DATE NOT NULL,
    data_devolucao DATE,
    status VARCHAR(20) NOT NULL DEFAULT 'pendente'
);

// INSERT
    {
	"id": 4,
	"funcionario_id": 10,
	"equipamento_id": 8,
	"data_retirada": "2025-03-03T03:00:00.000Z",
	"data_devolucao": "2025-04-07T03:00:00.000Z",
	"status": "devolvido"
    }

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

INSERT
{
	"id": 3,
	"cep": "00022-988",
	"logradouro": "rua da saudade",
	"complemento": "bloco j",
	"bairro": "nova descoberta",
	"cidade": "Natal",
	"estado": "RN",
	"numero": "775",
	"funcionario_id": 10
}

CREATE TABLE IF NOT EXISTS public.equipamentos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    numero_patrimonio VARCHAR(50)
);

INSERT
{
	"id": 10,
	"nome": "Extintor de incêndio",
	"descricao": "Extintor de pó químico 4kg",
	"numero_patrimonio": "EQP-2025-004"
}

CREATE TABLE IF NOT EXISTS public.funcionarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    email VARCHAR(255)
);

INSERT
{
	"id": 12,
	"nome": "Rayssa Helena",
	"cpf": "02020491522",
	"telefone": "(31) 93456-7890",
	"email": "rayssa@email.com"
}