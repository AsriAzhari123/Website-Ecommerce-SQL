import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Route ,Routes,BrowserRouter} from "react-router-dom"
import Cart from './Cart'
import Login from './login'
import Register from './register'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <nav className="navbar navbar-dark bg-dark p-2">
            <span className="navbar-brand mb-0 h1">Altrumshop</span>
            <a class="navbar-brand" href="/">Home</a>
            <a class="navbar-brand" href="/cart"><i class="bi bi-cart4 w-10 h-10"></i></a>
        </nav>
        {/* <BrowserRouter>
        <Routes>
            <Route path='/' element = {<App/>}/>
            <Route path='/cart' element = {<Cart/>}/>
            <Route path='/login' element = {<Login/>}/>
            <Route path='/register' element = {<Register/>}/>
        </Routes>
        </BrowserRouter> */}
    </React.StrictMode>
)
