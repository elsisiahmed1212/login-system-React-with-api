import React, { useState } from 'react';
import {useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { jwtDecode } from "jwt-decode";
import { useContext } from 'react';
import { auth } from '../context/Context';
import { useNavigate } from 'react-router-dom';
import { NavLink} from 'react-router-dom';
function Login() {
    let navegator = useNavigate()
    let {setislogin}= useContext(auth)
    let [loding , setloding] = useState(false)
    let [erroemsg, seterroemsg] = useState('')

    async function handelRegister(values) {
        setloding(true)
        try {
            let data = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values)
            setloding(false)
            localStorage.setItem('userToken',data.data.token) 
            setislogin(jwtDecode(data.data.token))
            navegator('/')
        } catch (error) {
            seterroemsg(error?.response?.data?.message);
            setloding(false)
        }
    }

    let  validationRegister = Yup.object({
        email:Yup.string().email().required(),
        password:Yup.string().required('Password is required'),
    })

    let formik = useFormik({
        initialValues: {
            email:"",
            password:""
        },
        validationSchema:validationRegister,
        onSubmit:handelRegister
    });


    return (
        <div className="login h-screen flex items-center my-10">
        <form className="w-full p-10 mx-auto" onSubmit={formik.handleSubmit}>
            {erroemsg?
                    <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">{erroemsg}</span> 
                </div>
            :""}
            <div className="relative z-0 w-full mb-5 group">
                <input type="email" onBlur={formik.handleBlur}  value={formik.values.email} onChange={formik.handleChange} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
                <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
            </div>
            {formik?.errors?.email  && formik.touched.email?
                    <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium">{formik?.errors?.email}</span>
                    </div>
                    :''}
            <div className="relative z-0 w-full mb-5 group">
                <input type="password" onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
                <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            </div>
            {formik?.errors?.password  && formik.touched.password?
                    <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium">{formik?.errors?.password}</span>
                    </div>
                    :''}
            <div className="flex gap-8 items-center">
                <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">{loding?<i className='fas fa-spin fa-spinner text-white'></i>:'Register'}</button>
                <p>Forget <span className='text-green-500' > <NavLink to={'/forgetpassword'}>Password</NavLink></span></p>
            </div>
            </form>
        </div>
    );
}

export default Login;