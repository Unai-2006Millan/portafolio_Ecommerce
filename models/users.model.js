const db = require('../db');
const bcrypt = require('bcrypt');

exports.getAll = async () => {
    try{

        const result = await db.query('select * from usuarios');
        return result.rows;

    } catch(err) {
        throw new Error('Error fetching usuarios: ' + err.message);
    }
       
}

exports.create = async (user) => {
    try{
        const {nombre, email, contrasenia } = user;

        const hashedPassword = await bcrypt.hash(contrasenia, 10);

        const result = await db.query(
            'insert into usuarios (nombre_completo, email, contrasenia) values ($1, $2, $3) returning *',
            [nombre, email, hashedPassword]
        )
        console.log("Creating user: " + result.rows[0]);
        console.log("Successfully created user: " + result.rows[0]);
        return result.rows[0];
    } catch(err) {
        throw new Error('Error creating user: ' + err.message);
    }
}

exports.getById = async (id) => {
    try {
        const result = await db.query('select * from usuarios where id = $1', [id]);
        return result.rows[0];
    } catch(err) {
        throw new Error('Error fetching user by ID: ' + err.message);
    }
}

exports.findByEmail = async (email) => {
    const result = await db.query('select * from usuarios where email = $1', [email]);
    return result.rows[0];
}

exports.update = async (id, user) => {
    const { nombre, email, contrasenia } = user;
    const hashedPassword = await bcrypt.hash(contrasenia, 10);

    const result = await db.query('update usuarios set nombre_completo = $1, email = $2, contrasenia = $3 where id = $4 returning *', 
    [nombre, email, hashedPassword, id]);

    return result.rows[0];
}

exports.delete = async (id) => {
    await db.query('delete from usuarios where id = $1', [id]);

    console.log("Successfully deleted user with ID: " + id);
}