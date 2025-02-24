import mssql, { pool } from 'mssql'
import { v4 } from 'uuid'
import { jobs } from '../Models/event.interface'
import { sqlconfig } from '../config/sql.config'
import lodash from 'lodash'

export class eventService{
        
    async createjobs(jobs: jobs){
        let pool = await mssql.connect(sqlconfig)
        let jobId = v4()

        let result = await (await pool.request()
     .input('job_id', jobId)
     .input('image', mssql.VarChar, jobs.image)
     .input('title', mssql.VarChar, jobs.title)
     .input('description', mssql.VarChar, jobs.description)
     .input('location', mssql.VarChar, jobs.location)
     .input('status', mssql.VarChar, jobs.status)
     .input('salary', mssql.Float, jobs.salary)
    
    
    
     .execute('createjobs')).rowsAffected

     if(result[0] == 1){
        return{
            message: 'Job created successfully'
        }
     }else{
        return{
            message: 'Error creating job'
        }
     }
    }

    async updatejobs(jobs: jobs){
        let pool = await mssql.connect(sqlconfig)

        let jobsExists = (await pool.request().query(`SELECT * FROM jobs WHERE job_id = '${jobs.job_id}'`)).recordset
        console.log(jobsExists);

        if(lodash.isEmpty(jobsExists)){
            return{
                error: 'Job not found'
            }
        }else{
            let result = (await pool.request()
            .input('job_id', jobsExists[0].job_id)
            .input('image', jobs.image)
            .input('title',  jobs.title)
            .input('description', jobs.description)
            .input('location', jobs.location)
            .input('status', jobs.status)
            .input('salary', jobs.salary)
            
           .execute('updatejobsdetails')).rowsAffected
            console.log(result);

            if(result[0] < 1){
                return{
                    error: "Unable to update job details"
                }
            }else{
                
                return{
                    message: "Job details updated successfully"
                }
            }
            
        }
        
    }

    async deletejobs(job_id: string) {
        try {
            let pool = await mssql.connect(sqlconfig);
            let jobsExists = (await pool.request()
                .input('job_id', mssql.VarChar, job_id)
                .query(`SELECT * FROM jobs WHERE job_id = @job_id`)).recordset;

            if (jobsExists.length === 0) {
                return {
                    error: 'Job not found'
                };
            }

            await pool.request()
                .input('job_id', mssql.VarChar, job_id)
                .execute('deletejobs');

            return {
                message: 'Removed Job successfully'
            };
        } catch (error) {
            console.error('SQL error', error);
            throw error;
        }
    }

    async fetchalljobs(){
        let pool = await mssql.connect(sqlconfig)
        let result = (await pool.query(`SELECT * FROM jobs`)).recordset

        if(result.length == 0){
            return{
                message: 'No jobs found'
            }
        }else{
            return{
                jobs: result
            }
        }

    }

    async fetchsinglejob(job_id: string){
        let pool = await mssql.connect(sqlconfig);
        let jobs = (await pool.request().input('job_id', mssql.VarChar, job_id).query(`SELECT * FROM jobs WHERE job_id = '${job_id}'`)).recordset;

        if(!jobs[0].job_id){
            return {
                error: "Job not found"
            }
        }else{
            return {
                jobs: jobs[0]
            }
        }
    }

}