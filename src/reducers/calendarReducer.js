
import { types } from "../types/types";



// {
//     id: new Date().getTime(),
//     title: 'cumpleaños del jefe',
//     start: moment().toDate(),
//     end: moment().add(2, 'hours').toDate(),

//     notes: 'comprar pastel',
//     user:{
//         _id: 123,
//         name: 'santiago'
//     }
// }





const initialState = {
    events: [],
    activeEvent: null

}

export const calendarReducer = (state= initialState, action) => {
  
    switch (action.type) {

        case types.eventeSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }
        case types.eventAddNew:
            return {
                ...state,
                events: [...state.events, action.payload]
            }
         case types.eventClearActiveEvent:
                    
             return {
                 ...state,
                 activeEvent: null
             }  

             case types.eventUpdate:
                    
                return {
                    ...state,
                    events: state.events.map((e)=>{
                     return  ( e.id === action.payload.id) 
                       ? action.payload
                       : e
                    })
                }  
    
                case types.eventDelete:
                    
                    return {
                        ...state,
                        events: state.events.filter((e)=>{
                         return  ( e.id !== state.activeEvent.id) 
                           
                        }),
                        activeEvent: null
                    }
                    
                    case types.eventLoaded:
                        return {
                            ...state,
                            events: [...action.payload]

                        }

                        case types.eventLogaut:
                            return {
                                ...initialState
                            }
    
        default:
         return   state;
}

}
