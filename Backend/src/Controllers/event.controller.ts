import { Request, Response } from 'express';
import { eventService } from '../Services/event.service';
import { Image } from 'mssql';

let EventService = new eventService();

export class EventController {
    async createjobs(req: Request, res: Response){
        
        try {
            let {image, title, description, location, status, salary} = req.body

            let result = await EventService.createjobs(req.body)

            return res.status(201).json(result)
        } catch (error) {
            return res.json({
                error: 'Error in creating the job'
            })
            
        }

    }

    async updatejobs(req: Request, res: Response){
        try{
            let job_id = req.params.job_id
            let {image, title, description, location, status, salary} = req.body

            let jobs = {
                job_id: job_id,
                image, 
                title, 
                description, 
                location, 
                status, 
                salary
            }
            let response = await EventService.updatejobs(jobs)
            return res.status(200).json(response)
        }catch (error){
            return res.json({
                error: 'Failed to update the Jobs details'
            })
        }
    }

    async deletejobs(req: Request, res: Response){
        try{
            let {job_id} = req.params

            let response = await EventService.deletejobs(job_id)
            return res.status(200).json(response)
        }catch(error){
            return res.json({
                error: 'Error in removing the job'
            })
        }
    }

    async fetchalljobs(req: Request, res: Response){
        try{
            let result = await EventService.fetchalljobs()
            return res.status(200).json(result)
        }catch(error){
            return res.json({
                error: 'Error in getting all the jobs'
            })
        }
    }

    async fetchsinglejob(req: Request, res: Response){
        try{
            let{job_id} = req.params

            let response = await EventService.fetchsinglejob(job_id)
            return res.status(200).json(response)
        }catch(error){
            return res.json({
                error: 'Error in getting the job'
            })
        }
    }
}