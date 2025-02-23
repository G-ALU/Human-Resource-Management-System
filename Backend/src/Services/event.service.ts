import mssql, { pool } from 'mssql'
import { v4 } from 'uuid'
import { event } from '../Models/event.interface'
import { sqlconfig } from '../config/sql.config'
import lodash from 'lodash'

export class eventService{
        
    async createEvent(event: event){
        let pool = await mssql.connect(sqlconfig)
        let eventId = v4()

        let result = await (await pool.request()
     .input('event_id', eventId)
     .input('date', mssql.VarChar, event.date)
     .input('duration', mssql.VarChar, event.duration)
     .input('Location', mssql.VarChar, event.Location)
     .input('Ticketsavailable', mssql.VarChar, event.Ticketsavailable)
     .input('Singlesprice', mssql.Float, event.Singlesprice)
     .input('Groupsprice', mssql.Float, event.Groupsprice)
     .input('description', mssql.VarChar, event.description)
     .input('image', mssql.VarChar, event.image)
     .execute('createEvent')).rowsAffected

     if(result[0] == 1){
        return{
            message: 'Event created successfully'
        }
     }else{
        return{
            message: 'Error creating event'
        }
     }
    }

    async updateEvent(event: event){
        let pool = await mssql.connect(sqlconfig)

        let eventExists = (await pool.request().query(`SELECT * FROM event WHERE event_id = '${event.event_id}'`)).recordset
        console.log(eventExists);

        if(lodash.isEmpty(eventExists)){
            return{
                error: 'Event not found'
            }
        }else{
            let result = (await pool.request()
            .input('event_id', eventExists[0].event_id)
            .input('date',  event.date)
            .input('duration', event.duration)
            .input('Location', event.Location)
            .input('Ticketsavailable', event.Ticketsavailable)
            .input('Singlesprice', event.Singlesprice)
            .input('Groupsprice', event.Groupsprice)
            .input('description', event.description)
            .input('image', event.image)
            .execute('updateEventDetails')).rowsAffected
            console.log(result);

            if(result[0] < 1){
                return{
                    error: "Unable to update event details"
                }
            }else{
                
                return{
                    message: "Event details updated successfully"
                }
            }
            
        }
        
    }

    async deleteEvent(event_id: string) {
        try {
            let pool = await mssql.connect(sqlconfig);
            let eventExists = (await pool.request()
                .input('event_id', mssql.VarChar, event_id)
                .query(`SELECT * FROM event WHERE event_id = @event_id`)).recordset;

            if (eventExists.length === 0) {
                return {
                    error: 'Event not found'
                };
            }

            await pool.request()
                .input('event_id', mssql.VarChar, event_id)
                .execute('deleteEvent');

            return {
                message: 'Removed event successfully'
            };
        } catch (error) {
            console.error('SQL error', error);
            throw error;
        }
    }

    async fetchAllEvents(){
        let pool = await mssql.connect(sqlconfig)
        let result = (await pool.query(`SELECT * FROM event`)).recordset

        if(result.length == 0){
            return{
                message: 'No events found'
            }
        }else{
            return{
                event: result
            }
        }

    }

    async fetchSingleEvent(event_id: string){
        let pool = await mssql.connect(sqlconfig);
        let event = (await pool.request().input('event_id', mssql.VarChar, event_id).query(`SELECT * FROM event WHERE event_id = '${event_id}'`)).recordset;

        if(!event[0].event_id){
            return {
                error: "Event not found"
            }
        }else{
            return {
                event: event[0]
            }
        }
    }

}