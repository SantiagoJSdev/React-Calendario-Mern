

import React from 'react'
import { useDispatch } from 'react-redux';
import { iuOpenModal } from '../../actions/iu';

export const AddNewFab = () => {

    const dispatch = useDispatch();
    const handleClick = ()=>{

        dispatch(iuOpenModal())
    }
    return (
        <button
        onClick={handleClick}
        className='btn btn-primary fab'
        
        >
            <i className='fas fa-plus'></i>
        </button>
    )
}
