import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { starLogin, starRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {

 const dispatch = useDispatch();
    
    const [ formLoginValues, handleLoginInputChange ] = useForm( {
        
        lEmail: "fernando@gmail.com",
        lPassword: "125556"
    } );

    const [ formRegisterValues, handleRegisterInputChange ] = useForm( {
        
        rName: 'nando',
        rEmail: "nando@gmail.com",
        rPassword1: "125556",
        rPassword2: "125556"
    } );

    const {rName, rEmail, rPassword1, rPassword2} = formRegisterValues;

    const {lEmail, lPassword} = formLoginValues
    
    const landleLogin =(e)=>{
        
        e.preventDefault()
       
        dispatch(starLogin(lEmail,lPassword))
        
    }
    const handleRegister=(e)=>{

        e.preventDefault()

        if (rPassword1 !== rPassword2){
            return Swal.fire('Error', 'Las contraseñas deben ser iguales', 'error')
        }
       dispatch(starRegister(rEmail,rPassword1,rName)) 
    }





    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={landleLogin}>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="lEmail"
                                value={lEmail}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name =   "lPassword"
                                value = {lPassword}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='rName'
                                value={rName}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='rEmail'
                                value={rEmail}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name='rPassword1'
                                value={rPassword1}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name='rPassword2'
                                value={rPassword2}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}