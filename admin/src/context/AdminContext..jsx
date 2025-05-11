import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const AdminContext = createContext();

const  AdminContextProvider = (props) => {

   const [atoken, setAtoken] = useState(localStorage.getItem('atoken') || '');

    const [dashdata, setDashData] = useState(false)


    const url = "http://localhost:4000";

    const getDashData = async () => {
        try {
            
            const { data } = await axios.get(url + '/api/admin/dashboard',{headers:{ atoken }})
            if (data.success) {
                setDashData(data.dashdata)
                
                  
            }else{
                toast.error('Error')
            }
            
        } catch (error) {
            toast.error('error')
        }
    }
    const value = {
        atoken, setAtoken,
        url,
        dashdata,getDashData
    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}
export default AdminContextProvider