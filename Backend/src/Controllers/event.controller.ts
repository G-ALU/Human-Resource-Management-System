import { Request, Response } from 'express';
import { eventService } from '../Services/event.service';
import { Image } from 'mssql';

let EventService = new eventService();

export class EventController {
    async createEvent(req: Request, res: Response){
        
        try {
            let {date, duration, Location, Ticketsavailable, Singlesprice, Groupsprice, description, image} = req.body

            let result = await EventService.createEvent(req.body)

            return res.status(201).json(result)
        } catch (error) {
            return res.json({
                error: error
            })
            
        }

    }

    async updateEvent(req: Request, res: Response){
        try{
            let event_id = req.params.event_id
            let {date, duration, Location, Ticketsavailable, Singlesprice, Groupsprice, description, image} = req.body

            let event = {
                event_id: event_id,
                date, duration, Location, Ticketsavailable, Singlesprice, Groupsprice, description, image
            }
            let response = await EventService.updateEvent(event)
            return res.status(200).json(response)
        }catch (error){
            return res.json({
                error: 'Failed to update event details'
            })
        }
    }

    async deleteEvent(req: Request, res: Response){
        try{
            let {event_id} = req.params

            let response = await EventService.deleteEvent(event_id)
            return res.status(200).json(response)
        }catch(error){
            return res.json({
                error: 'Error deleting event'
            })
        }
    }

    async fetchAllEvents(req: Request, res: Response){
        try{
            let result = await EventService.fetchAllEvents()
            return res.status(200).json(result)
        }catch(error){
            return res.json({
                error
            })
        }
    }

    async fetchSingleEvent(req: Request, res: Response){
        try{
            let{event_id} = req.params

            let response = await EventService.fetchSingleEvent(event_id)
            return res.status(200).json(response)
        }catch(error){
            return res.json({
                error: 'Error fetching event'
            })
        }
    }
}