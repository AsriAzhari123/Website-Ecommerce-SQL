import Cart from "../models/CartModel.js"

export const getCart = async (req, res) => {
    try{
       const cart = await Cart.find()
       res.status(200).json(cart)
    }catch(err){
        res.json({message: err})
    }
}

export const updateCart = async (req, res) => {
    try{
        const id = req.params.id;
        const updateProduk = req.body;
        const options = {new: true};

        const result = await Cart.findByIdAndUpdate(id, updateProduk, options);
        res.send(result);
    }catch(err){
        res.status(400).json({ message: err })
    }
}


export const addToCart = async (req, res) => {
    try{
    const data = await Cart.insertMany([
        {
            toko : req.body.toko,
            namaBarang : req.body.namaBarang,
            img : req.body.img,
            quantity : req.body.quantity,
            diskon : req.body.diskon,
            harga : req.body.harga
        }
    ])
    res.status(200).json(data)

    }catch(err){
        res.status(400).json({message: err})
    }
}

export const deleteCart = async (req, res) => {
    try{
        const id = req.params.id
        const data = await Cart.findByIdAndDelete(id)
        res.status(200).json({message: "Success"})
    }catch(err){
        res.status(400).json({message: err})
    }
}

export const deleteAllCart = async (req, res) => {
    try{
        await Cart.deleteMany()
        res.status(200).json({message: "Success"})
    }catch(err){
        res.status(400).json({message: err})
    }
}