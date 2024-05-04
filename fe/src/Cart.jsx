import { useState, useEffect } from "react"
import './Cart.css'
import Swal from 'sweetalert2'
export default function Cart() {
    const [dataCart, setDataCart] = useState([])
    const [totalHarga, setTotalHarga] = useState(0)
    const [diskon, setTotalDiskon] = useState(0)
    function changeHarga(data){
        let totalharga = 0 
        let totaldiskon = 0 
        for(let i =0 ; i < data.length;i++){
            for(let j =0 ;j < data[i].Product.length;j++){
                totalharga += (data[i].Product[j].harga *data[i].Product[j].quantity)    
                if(data[i].Product[j].diskon !== 0){
                    let diskonya =  (data[i].Product[j].diskon / 100 * data[i].Product[j].harga ) * data[i].Product[j].quantity
                    totaldiskon += diskonya
                }        
            }
        }
        setTotalHarga(totalharga)
        setTotalDiskon(totaldiskon)
    }
    useEffect(()=>{
        fetch("http://localhost:3000/api/cart")
        .then((data)=> data.json())
        .then((data)=>{    
          mappingData(data)
        })
      },[])
    function mappingData(data){
        let mapping = {}
        for (let i = 0; i < data.length; i++) {
            const namaToko = data[i].toko
            if (!mapping[namaToko]) {
                mapping[namaToko] = {
                    toko: data[i].toko,
                    Product: [{
                        id: data[i]._id,
                        namaBarang: data[i].namaBarang,
                        img: data[i].img,
                        quantity: data[i].quantity,
                        diskon: data[i].diskon,
                        harga: data[i].harga
                    }]
                }
            }
            else{
                mapping[namaToko].Product.push({
                    id: data[i]._id,
                    namaBarang: data[i].namaBarang,
                    img: data[i].img,
                    quantity: data[i].quantity,
                    diskon: data[i].diskon,
                    harga: data[i].harga
                })
            }
        }
        let keys = Object.keys(mapping)
        let DataState = []
        for(let i = 0; i < keys.length;i++){
            let keysnya = keys[i]
            DataState.push(mapping[keysnya])
        }
        setDataCart(DataState)
        changeHarga(DataState)
    }
    
    return (
        <>
        <nav className="navbar navbar-dark bg-dark p-2">
            <span className="navbar-brand mb-0 h1">Altrumshop</span>
            <a class="navbar-brand" href="/">Home</a>
            <a class="navbar-brand" href="/cart"><i class="bi bi-cart4 w-10 h-10"></i></a>
        </nav>
            {dataCart.length === 0 ? <div class="textNone">Cart kosong</div> : <div>{dataCart.map((val,idx) => {
                return (
                <>
                <p class="namaTokoCart">{val.toko}</p>
                <div class ="isiCart">
                    {val.Product.map((value,index)=>{
                        return(
                        <div key= {value.id} class="boxcart">
                            <img src={value.img} alt="" width="100px" height = "100px" />
                            <p>Nama Barang : {value.namaBarang}</p>
                            <p>Harga Barang : {value.harga}</p>
                            <p>Jumlah Barang : {value.quantity}</p>
                            {
                                dataCart[idx].Product[index].quantity ===1 ?<button disabled>-</button>:
                                <button onClick={()=>{
                                    let databackup = [...dataCart]
                                    dataCart[idx].Product[index].quantity -=1
                                    setDataCart(databackup)
                                    changeHarga(databackup)
                                    fetch(`http://localhost:3000/api/cart/${value.id}`,{
                                        method : "PATCH",
                                        headers : {"content-type" : "application/json"},
                                        body :JSON.stringify({
                                            quantity : dataCart[idx].Product[index].quantity
                                        })
                                    })
                                }}>-</button>
                            }
                            <button onClick={()=>{
                                    let databackup = [...dataCart]
                                    dataCart[idx].Product[index].quantity +=1
                                    setDataCart(databackup)
                                    changeHarga(databackup)
                                    fetch(`http://localhost:3000/api/cart/${value.id}`,{
                                        method : "PATCH",
                                        headers : {"content-type" : "application/json"},
                                        body :JSON.stringify({
                                            quantity : dataCart[idx].Product[index].quantity
                                        })
                                    })
                                }}>+</button>
                                <button onClick={()=>{
                                    fetch(`http://localhost:3000/api/cart/${value.id}`,{
                                        method :"DELETE"
                                    })
                                    .then(()=>{
                                        let databackup =[...dataCart]
                                        console.log(databackup[idx].Product)
                                        let dataDelete = databackup[idx].Product.filter((jawaban)=> jawaban.id !== value.id)
                                        databackup[idx].Product = dataDelete
                                        if(databackup[idx].Product.length === 0){
                                            databackup.splice(idx,1)
                                        }
                                        setDataCart(databackup)
                                        changeHarga(databackup)
                                    })
                                }}>delete</button>
                        </div>)
                    })}
                </div>
                </>)
            })}
            <p>Harga Sebelum Didiskon : {totalHarga}</p>
        <p>harga diskon : {diskon}</p>
        <p>Harga Setelah Didiskon : {totalHarga - diskon}</p>
        <button onClick={()=>{
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Terimah Kasih Telah berbelanja!',
                showConfirmButton: false,
                timer: 1500
            })
            fetch("http://localhost:3000/api",{
                method : "DELETE",
                headers :{
                    "content-type" : "application/json"
                }
            })
            .then(()=>{setDataCart([])})
        }}>Check Out</button>
            </div>}
        

        </>
    )
}