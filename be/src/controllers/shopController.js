import mysql from 'mysql2';
import config from '../db.js'


// GET ALL DATA
export const getAllData = (req,res) => {
    config.query(`SELECT * FROM shop`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
}

// GET DATA BY ID
export const getDataById = (req,res) => {
    const id = req.params.id
    config.query(`SELECT * FROM shop WHERE id = ${id}`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
}

// CREATE DATA
export const createData = (req,res) => {
    const { name, price, image } = req.body
    config.query(`INSERT INTO shop (name, price, image) VALUES ('${name}', '${price}', '${image}')`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
}

// UPDATE DATA
export const updateData = (req,res) => {
    const id = req.params.id
    const { name, price, image } = req.body
    config.query(`UPDATE shop SET name = '${name}', price = '${price}', image = '${image}' WHERE id = ${id}`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
}

// DELETE DATA
export const deleteData = (req,res) => {
    const id = req.params.id
    config.query(`DELETE FROM shop WHERE id = ${id}`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
}