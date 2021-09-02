import { types } from "../types/types"


export const iuOpenModal =()=>{
  
    
    return {
        type: types.uiOpenModal,
        payload: true
    }  
}

export const iuClosenModal =()=>{

    return {
        type: types.uiCloseModal,
        payload: false
    }



}