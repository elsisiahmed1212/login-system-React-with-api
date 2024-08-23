import { Children, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './Componats/register/Register'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from './Componats/layaout/Layout.jsx'
import Home from './Componats/home/Home.jsx'
import Login from './Componats/login/Login.jsx'
import ProtectedApi from './Componats/protectedapi/ProtectedApi.jsx'
import ForgotPassword from './Componats/forgotpassword/ForgotPassword.jsx'
import ResetCode from './Componats/resetcode/ResetCode.jsx'
import ResetPassword from './Componats/resetpassword/ResetPassword.jsx'
function App() {
  
  let rout = createBrowserRouter([
    {path:'/',element:<Layout></Layout>,children:[
      {index:true , element:<ProtectedApi><Home></Home></ProtectedApi>},
      {path:'/forgetpassword' , element:<ForgotPassword></ForgotPassword>},
      {path:'/restcode' , element:<ResetCode></ResetCode>},
      {path:'/restpassword', element:<ResetPassword></ResetPassword>},
      {path:'/login',element:<Login></Login>},
      {path:'/register',element:<Register></Register>}
    ]}
])

  return (
    <RouterProvider router={rout}></RouterProvider>
  )
}

export default App
