CREATE TABLE Cliente (
    id SERIAL UNIQUE NOT NULL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    cpf VARCHAR(11) UNIQUE,
    email VARCHAR(50),
    data_nascimento DATE NOT NULL,
    telefone VARCHAR(50)
);

CREATE TABLE Medicamentos (
    id SERIAL UNIQUE NOT NULL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    fabricante VARCHAR(20) UNIQUE,
    principio_ativo VARCHAR(50),
    data_validade DATE NOT NULL,
    preco VARCHAR(50)
);