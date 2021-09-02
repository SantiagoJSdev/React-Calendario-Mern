import Swal from "sweetalert2"
import { fetchConnToken } from "../helpers/fetch"
import { prepareEvents } from "../helpers/prepareEvents"
import { types } from "../types/types"



export const eventStartAddNew = (event)=>{

    return async(dispatch, getState)=>{
        // creo mi accion asincrona la cual llama a el helper mi fech con fetchSinTokenla cual llama a 
        // mi endpoint para que realice la grabacion bd
        const {uid, name} = getState().auth
        try {
            const resp = await fetchConnToken('events', event, 'POST');
            const body = await resp.json(); //en el body obtengo el evento ya grabado
            console.log(body)
            if (body.ok) {
                event.id = body.evento.id
                event.user = {
                    _id: uid,
                    name: name
                }
                dispatch(eventAddNew(event))

            }
            
        } catch (error) {

            console.log(error)
            
        }
       
    }
}



 const eventAddNew =(event)=>{

    return {
        type: types.eventAddNew,
        payload: event
    }


}

export const eventeSetActive =(event)=>{

    return {
        type: types.eventeSetActive,
        payload: event
    }


}

export const eventClearActiveEvent =()=>({
    type: types.eventClearActiveEvent
})



export const eventStartUpdate = (event) =>{

    return async(dispatch)=>{

        try {
            
            const resp = await fetchConnToken(`events/${event.id}`, event, 'PUT')
            const body = await resp.json();

            if (body.ok) {

                dispatch(eventUpdate(event))
            }else {
                Swal.fire('Error', body.msg, 'error')
            }
            
        } catch (error) {
            console.log(error)
            
        }
    }
}


const eventUpdate =(event)=>{

    return {
        type: types.eventUpdate,
        payload: event
    }
}


export const eventStartDelete=()=>{
    return async(dispatch,getState)=>{

        const {id}= getState().calendar.activeEvent

        try {
            
            const resp = await fetchConnToken(`events/${id}`, {}, 'DELETE')
            const body = await resp.json();

            if (body.ok) {

                dispatch(eventDelete())
            }else {
                Swal.fire('Error', body.msg, 'error')
            }
            
        } catch (error) {
            console.log(error)
            
        }
    }
}



export const eventDelete =()=>({
    type: types.eventDelete
})

export const eventStartLoading =()=>{
    return async(dispatch)=>{

        try {

            const resp = await fetchConnToken('events')
            const body = await resp.json()
            const events = prepareEvents(body.evento)
           
            //aqui extraigo la lista de mis evento de la base de datos
            //aqui recibimos los eventos pero las fechas vienen como string
            dispatch(eventLoaded(events))

            
        } catch (error) {
            
        }
        


    }


}

const eventLoaded = (events) => {

return {
    type: types.eventLoaded,
    payload: events
}


}

export const eventLogaut =()=>({type:types.eventLogaut})