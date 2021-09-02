
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogaut } from '../../actions/auth';

export const NavBar = () => {

    const dispatch = useDispatch();

    
    const handleSalir= () =>{
        dispatch(startLogaut())
    }

    const {name} = useSelector( state => state.auth );
    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">
                {name}
                </span>

                <button 
                onClick={handleSalir}
                
                className="btn btn-outline-danger">
                    <i className="fas fa-sign-out-alt"></i>
                    <span> Salir</span>
                </button>
            
        </div>
    )
}
