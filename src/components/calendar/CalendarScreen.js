import React, { useEffect } from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'

import { messages } from '../../helpers/calendar-messages';
import { NavBar } from "../ui/NavBar"

import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { CalendarEvent } from './CalendarEvent';
import { useState } from 'react';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { iuOpenModal } from '../../actions/iu';
import {  eventClearActiveEvent, eventeSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';



moment.locale('es')
const localizer = momentLocalizer(moment) // or globalizeLocalizer







export const CalendarScreen = () => {
    const dispatch = useDispatch();

    const {events, activeEvent} = useSelector( state => state.calendar );
    const {uid} = useSelector( state => state.auth );
    

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

    useEffect(() => {
        dispatch(eventStartLoading())
    }, [])


    const onDoubleClick=(e)=>{
        dispatch(iuOpenModal())
    }

    const onSelectEvent=(e)=>{
      
        dispatch(eventeSetActive(e))
      
    }

    const onViewChange=(e)=>{
        setLastView(e)
        localStorage.setItem('lastView', e)
    }
    const onSelectSlot =(e)=>{

        dispatch(eventClearActiveEvent())
    }


const eventStyleGetter =(event, start, end, isSelected) => {

    const style = {
        backgroundColor:(uid === event.user._id) ? '#367CF7' : '#464646',
        borderRadius: '0px',
        opacity: 0.8,
        display: 'block',
        color: 'white'
    }

    return {
        style
    }
}



    return (
        <div className="calender-screen">
            <NavBar/>

            <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      messages={messages}
      eventPropGetter={eventStyleGetter}
      onDoubleClickEvent={onDoubleClick}
      onSelectEvent={onSelectEvent}
      onView={onViewChange}
      onSelectSlot ={onSelectSlot}
      selectable={true}
      view={lastView}
      components={{
          event: CalendarEvent
      }}
             />
            <AddNewFab/>
            {
            (activeEvent)
            && <DeleteEventFab/>
            }
            
             <CalendarModal/>
        </div>
    )
}
