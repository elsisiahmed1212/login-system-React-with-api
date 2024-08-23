import React, { useState } from 'react';
import {useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { jwtDecode } from "jwt-decode";
import { useContext } from 'react';
import { auth } from '../context/Context';
import { useNavigate } from 'react-router-dom';
import { NavLink} from 'react-router-dom';
function ResetCode() {
    let navegator = useNavigate()
    let {setislogin}= useContext(auth)
    let [loding , setloding] = useState(false)
    let [erroemsg, seterroemsg] = useState('')

    async function handelresrtcode(values) {
        setloding(true)
        try {
            await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',values)
            setloding(false)
            navegator('/restpassword')
        } catch (error) {
            seterroemsg(error?.response?.data?.message);
            setloding(false)
        }
    }


    let formik = useFormik({
        initialValues: {
            resetCode:"",
        },
        onSubmit:handelresrtcode
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
                <input type="text" onBlur={formik.handleBlur}  value={formik.values.resetCode} onChange={formik.handleChange} id="resetCode" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
                <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Reset Code</label>
            </div>
            {formik?.errors?.resetCode  && formik.touched.resetCode?
                    <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium">{formik?.errors?.resetCode}</span>
                    </div>
                    :''}
            <div className="flex gap-8 items-center">
                <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">{loding?<i className='fas fa-spin fa-spinner text-white'></i>:'Resset'}</button>
            </div>
            </form>
        </div>
    );
}

export default ResetCode;