import express from 'express';
const router = express();
import User from '../models/userModel.js'
import middlewareValidation from '../controllers/middleware.js'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../db.js'
import mysql from 'mysql2';




const JWT_SECRET = 'eriyfbercbieobu3hrurebuberHBububUOBUOUBuo3728u'

//REGISTRASI NEW USER--------------------------------------------------------------------
router.post("/registrasi", async (req, res) => {
   
    const { email, password } = req.body

    // buatkan query menggunakan sql untuk mencari user berdasarkan email
    config.query(`SELECT * FROM users WHERE email = '${email}'`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(result);
            if (result.length === 0) {
                // console.log('email belum terdaftar');
                bcryptjs.genSalt(10, (err, salt) => {
                    if (err) {
                        console.log(err);
                    } else {
                        bcryptjs.hash(password, salt, (err, hash) => {
                            if (err) {
                                console.log(err);
                            } else {
                                // console.log(hash);
                                config.query(`INSERT INTO users (email, password) VALUES ('${email}', '${hash}')`, (err, result) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        res.send({ message: "Registrasi Success" });
                                    }
                                })
                            }
                        })
                    }
                })
            } else {
                res.send({ error: "Email Sudah Terdaftar" });
            }
        }
    })

});

//LOGIN USER--------------------------------------------------------------------
router.post('/login', async (req, res) => {
    const { email, password } = req.body

//    buatkan query menggunakan sql untuk mencari user berdasarkan email
    config.query(`SELECT * FROM users WHERE email = '${email}'`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(result);
            if (result.length === 0) {
                res.send({ error: "Email Salah" });
            } else {
                // console.log(result[0].password);
                bcryptjs.compare(password, result[0].password, (err, isMatch) => {
                    if (err) {
                        console.log(err);
                    } else if (!isMatch) {
                        res.send({ error: "Password Salah" });
                    } else {
                        // console.log(result[0]);
                        const token = jwt.sign({ email: result[0].email }, JWT_SECRET)
                        res.send({ message: "Login Success", token: token, data: result[0] });
                    }
                })
            }
        }
    })
})


// ROUTE YANG HANYA BISA AKSES SAMA ADMIN SAJA ATAU YG SUDAH LOGIN------------------------------
router.post('/GetUser',middlewareValidation, async (req, res) => {
    const { token } = req.body
    // console.log('masuk');
    // console.log(token);

    try {
        const user = jwt.verify(token.token, JWT_SECRET)

        const userEmail = user.email

        User.findOne({ email: userEmail })
            .then((data) => {
                res.send({ status: 'ok', data: data })
            }).catch((err) => {
                res.send({ status: 'err', data: err })
            })
    } catch (err) {
        // console.log(err);
        res.json({ status: 'error', message: 'Token is invalid' });
    }

    // res.json({ message: 'Successfully authenticated' });
})

// // ROUTE UNTUK MENCARI TOTAL USER YG ADA ------------------------------
// router.get('/lenUser', async (req, res) => {

//     try {
//         const user = await User.find()
//         res.json(user.length)
//     } catch (err) {
//         // console.log(err);
//         res.json({ status: 'error', message: 'User Not Found' });
//     }

//     // res.json({ message: 'Successfully authenticated' });
// })




module.exports = router;