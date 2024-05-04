import mysql from 'mysql2';
import products from './products.json' assert { type: "json" };
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "toko",
  port: 3306
});

con.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
  con.query(`CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,

    email VARCHAR(255),
    password VARCHAR(255)
)`, (err, result) => {
    if (err) {
        console.log(err);
    } else {
        console.log("table user telah dibuat");
    }
})

con.query(`CREATE TABLE IF NOT EXISTS shop (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(255),
    harga INT,
    jumlah INT,
    diskon INT,
    value INT,
    image VARCHAR(255)
)`, (err, result) => {
  let check = []
    if (err) {
        console.log(err);
    } else {
     
      con.query(`SELECT * FROM shop where nama = 'Buku Tulis'`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
          check = result
          if (check.length === 0) {
            console.log(check);
          products.forEach(detail => {
        con.query(`insert into shop (nama, harga, jumlah, diskon, value, image) values ('${detail.nama}', '${detail.harga}', '${detail.jumlah}', '${detail.diskon}', '${detail.value}', '${detail.image}')`,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
        })
      });
            console.log("table shop telah dibuat");
        }
        }
      })
      
}}
)
  
}
);

export default con;