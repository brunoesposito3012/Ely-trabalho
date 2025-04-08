-- Cria o usuário
CREATE USER 'bruno'@'localhost' IDENTIFIED BY '1234';

-- Concede todos os privilégios sobre o banco de dados Escola
GRANT ALL PRIVILEGES ON alunos.* TO 'bruno'@'localhost';

-- Aplica as mudanças
FLUSH PRIVILEGES;


CREATE DATABASE alunos;

USE alunos;

CREATE TABLE aluno (
    idaluno INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    idade INT,
    curso VARCHAR(100),
    matricula VARCHAR(20),
    email VARCHAR(100)
);

SELECT * FROM aluno


SELECT * FROM aluno WHERE idaluno = 6;


INSERT INTO aluno (nome, idade, curso, matricula, email) VALUES
('Ana Beatriz Silva', 20, 'Engenharia de Software', '2025001', 'ana.silva@email.com'),
('Carlos Eduardo Lima', 22, 'Administração', '2025002', 'carlos.lima@email.com'),
('Fernanda Rocha', 19, 'Direito', '2025003', 'fernanda.rocha@email.com'),
('Lucas Almeida', 21, 'Sistemas de Informação', '2025004', 'lucas.almeida@email.com'),
('Bruno Mendes', 23, 'Arquitetura e Urbanismo', '2025005', 'bruno.mendes@email.com');
