import { useState ,useEffect} from 'react'
import './App.css'
import Swal from 'sweetalert2'

function App() {
  const [data, setData] = useState([])
  
  useEffect(()=>{
    fetch("http://localhost:3000/api")
    .then((data)=> data.json())
    .then((data)=>{
      setData(data)
    })
  },[])
  return (
    <>
  
    
     {data.length === 0 ? <>Loading</>: 
     <div>
      {
        data.map((value)=>{
          console.log(data)
          return(
            <>
  
            <div  class="isi">
             
                  <div key={value.id} class="box">
                    <img src={value.image} width = "200px" height="200px" alt="" />
                    <p>{value.nama}</p>
                    <p>Harga : {value.harga}</p>
                    {value.diskon  !==0 && <p>Diskon : {value.diskon}%</p>}
                    <button onClick={()=>{
                      Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Barang Sudah Ditambahkan Kekeranjang',
                        showConfirmButton: false,
                        timer: 1500
                      })
                      fetch("http://localhost:3000/api",{
                        method : "POST",
                        headers : {
                          "content-type" : "application/json"
                        },
                        body :JSON.stringify({
                   
                          namaBarang : value.nama,
                          img : value.image,
                          quantity : 1,
                          diskon : value.diskon,
                          harga : value.harga
                        })
                      })
          
                    }}> Add To Cart</button>
                  </div>
                
            
            </div>
            </>
          )
        })
      }
     </div>}
     
    </>
  )
}

export default App
