async function connect() {
    if (global.connection && global.connection.state !== 'disconnected') {
        return global.connection;
    }

    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '4862',
        database: 'alunos'
    });

    global.connection = connection;
    return connection;
}

exports.get = async (req, res) => {
    const con = await connect();
    const [rows] = await con.query('SELECT * FROM aluno');
    res.status(200).send(rows);
};

exports.getById = async (req, res) => {
    const id = req.params.id;
    const con = await connect();
    const [rows] = await con.query('SELECT * FROM aluno WHERE idaluno = ?', [id]);

    if (rows.length === 0) {
        return res.status(404).send({ error: 'Aluno não encontrado' });
    }

    res.status(200).send(rows[0]);
};

exports.post = async (req, res) => {
    const con = await connect();
    const sql = 'INSERT INTO aluno (nome, idade, curso, matricula, email) VALUES (?, ?, ?, ?, ?)';
    const values = [req.body.nome, req.body.idade, req.body.curso, req.body.matricula, req.body.email];
    await con.query(sql, values);
    res.status(201).send('Aluno inserido com sucesso');
};

exports.put = async (req, res) => {
    const id = req.params.id;
    const con = await connect();
    const sql = 'UPDATE aluno SET nome = ?, idade = ?, curso = ?, matricula = ?, email = ? WHERE idaluno = ?';
    const values = [req.body.nome, req.body.idade, req.body.curso, req.body.matricula, req.body.email, id];
    await con.query(sql, values);
    res.status(200).send('Aluno atualizado com sucesso');
};

exports.delete = async (req, res) => {
    const id = req.params.id;
    const con = await connect();
    const sql = 'DELETE FROM aluno WHERE idaluno = ?';
    await con.query(sql, [id]);
    res.status(200).send('Aluno excluído com sucesso');
};
