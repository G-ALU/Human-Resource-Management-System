import mssql, { pool } from "mssql";
import { v4 } from "uuid";
import bcrypt from "bcrypt";
import lodash from "lodash";
import { Performance } from '../Models/user.performance';
import { sqlconfig } from "../config/sql.config"

export class PerformanceService {

     async createperformancesummary(Performance: Performance){
          let pool = await mssql.connect(sqlconfig)
          let record_id = v4()
  
          let result = await (await pool.request()
       .input('record_id', record_id)
       .input('taskCompleted', mssql.Int, Performance.taskCompleted)
       .input('hoursworked', mssql.Int, Performance.hoursworked)
       
      
      
      
       .execute('createperformancesummary')).rowsAffected
  
       if(result[0] == 1){
          return{
              message: 'Performance metric created successfully'
          }
       }else{
          return{
              message: 'Error creating summary'
          }
       }
      }
    }


         


    //  static async getUserPerformanceSummary(user_id: string): Promise<UserPerformanceSummary | null> {
    //   try {
        
    //     const pool = await mssql.connect(sqlconfig);
    //     const result = await pool.request()
    //       .input('user_id', mssql.VarChar(255), user_id)
    //       .execute('GetUserPerformanceSummary');
  
    //     if (result.recordset.length > 0) {
    //       const summary = result.recordset[0];
    //       return {
    //         username: summary.username,
    //         avgTasksCompleted: summary.AvgTasksCompleted,
    //         avgHoursWorked: summary.AvgHoursWorked,
    //         avgRating: summary.AvgRating
    //       };
    //     } else  {
    //         return null;
    //       }
    //   } catch (err) {
    //     console.error('performance metrics cannot be found:', err);
    //     throw err;
    //   }
    // }
  

  // export class eventService{
          
  //     async createjobs(jobs: jobs){
  //         let pool = await mssql.connect(sqlconfig)
  //         let jobId = v4()
  
  //         let result = await (await pool.request()
  //      .input('job_id', jobId)
  //      .input('image', mssql.VarChar, jobs.image)
  //      .input('title', mssql.VarChar, jobs.title)
  //      .input('description', mssql.VarChar, jobs.description)
  //      .input('location', mssql.VarChar, jobs.location)
  //      .input('status', mssql.VarChar, jobs.status)
  //      .input('salary', mssql.Float, jobs.salary)
      
      
      
  //      .execute('createjobs')).rowsAffected
  
  //      if(result[0] == 1){
  //         return{
  //             message: 'Job created successfully'
  //         }
  //      }else{
  //         return{
  //             message: 'Error creating job'
  //         }
  //      }
  //     }