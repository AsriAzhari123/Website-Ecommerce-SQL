import dotenv from "dotenv"
import express from "express"

import cors from "cors"
import router from "./src/router/shopRouter.js" 
dotenv.config()

import database from './src/db.js'
import mysql from 'mysql2';


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



database.on('error', (error) => {
    console.log(error)
})
database.once('connected', () => {
    console.log('Database Connected');
    // buatkan query create table untuk membuat table users, jika table sudah ada maka tidak perlu dibuat lagi
   
})


app.use('/api', router);
app.listen(3000, () => {
    console.log('Server Started');
});


// penjelasan:
// kita di sini menggunakan dotenv untuk mengambil data dari file .env
// kita menggunakan express untuk membuat server
// kita menggunakan mongoose untuk menghubungkan ke database
// kita menggunakan cors untuk mengizinkan akses dari luar
// kita menggunakan router untuk menghubungkan ke router
//
// kita menggunakan app.use(cors()); untuk mengizinkan akses dari luar
// kita menggunakan app.use(express.json()); untuk mengizinkan akses dari luar
// kita menggunakan app.use(express.urlencoded({ extended: true })); untuk mengizinkan akses dari luar
// kita menggunakan app.use('/api', router); untuk menghubungkan ke router
// kita menggunakan app.listen(3000, () => { untuk membuat server
//
// kita menggunakan mongoose.connect(mongoString); untuk menghubungkan ke database

// database.one itu adalah fungsi yang akan dijalankan ketika database berhasil terhubung
// database.on('error', (error) => { ini adalah fungsi yang akan dijalankan ketika terjadi error