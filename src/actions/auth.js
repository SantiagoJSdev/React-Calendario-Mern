import Swal from "sweetalert2";
import { fetchConnToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types";
import { eventLogaut } from "./events";



export const starLogin = (email, password) => {
    return async(dispatch) => {
 
             
            
       const resp = await fetchSinToken('auth', {email,password}, 'POST');
       const body = await resp.json();
       console.log(body)

       if (body.ok) {

        localStorage.setItem('token', body.token);
        localStorage.setItem('token-init-date', new Date().getTime());
        dispatch(login({
            uid: body.uid,
            name: body.name
        }

        ))
       } else {
           Swal.fire('Error', body.msg, 'error')
       }

}
}

export const starRegister = (email, password, name) => {
    return async(dispatch) => {
 
             
            
       const resp = await fetchSinToken('auth/new', {email,password,name}, 'POST');
       const body = await resp.json();
       console.log(body)

       if (body.ok) {

        localStorage.setItem('token', body.token);
        localStorage.setItem('token-init-date', new Date().getTime());
        dispatch(login({
            uid: body.uid,
            name: body.name
        }

        ))
       } else {
           Swal.fire('Error', body.msg, 'error')
       }

}
}

const login = (user) => {
    return {
        type: types.authLogin,
        payload: user
    }

}

//con esta accion revalidamos token y ponemos en el estado el checking en falso
//cargando informacion de user q este activo cuando actualice la informacion en el store
export const startChecking = () => {
    return async(dispatch)=>{


                 
       const resp = await fetchConnToken('auth/renew');
       const body = await resp.json();
       

       if (body.ok) {

        localStorage.setItem('token', body.token);
        localStorage.setItem('token-init-date', new Date().getTime());
        dispatch(login({
            uid: body.uid,
            name: body.name
        }

        ))
       } else {
          dispatch(checkingFinish())
       }


    }


}

const checkingFinish =()=>({type: types.authCheckingFinish})

export const startLogaut = () => {
    return (dispatch)=>{

        localStorage.clear();
        dispatch(eventLogaut())
        dispatch(logout())
    }

}

export const logout= () => ({type:types.authLogaut})