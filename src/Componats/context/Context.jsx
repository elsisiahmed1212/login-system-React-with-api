import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

export let auth = createContext()
export default function ContextProfider({children}){
    let [islogin , setislogin] = useState(null)

    // علشان لة انا عمل تحديث للصفحه كل هتروح 
    // هني بقل لو انا طلعت من الموقع من غير م اعمل تسجيل خروج روحي هات البيانات المحفوظه واعرضها 
    useEffect(()=>{
        if (localStorage.getItem('userToken')){
            setislogin(jwtDecode(localStorage.getItem('userToken')))
        }
    },[])

    return <auth.Provider value={{islogin,setislogin}}>
        {children}
    </auth.Provider>
}