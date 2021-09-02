import moment from "moment"

export const prepareEvents = (events) =>{



    return events.map((e)=>({
        ...e,
        end: moment(e.end).toDate(), /// convierte la fecha string con moment y conviertela en una fecha javascript
        start:moment(e.start).toDate()
    }))
}