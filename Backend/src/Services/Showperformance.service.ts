import { sqlconfig } from '../config/sql.config'
import mssql, { pool } from 'mssql'
import { v4 } from "uuid";
import { UserDetails } from "../Models/user.interface";
import { Performance } from '../Models/user.performance';
import { Request } from 'express';


// export class UserPerformanceService {
//   static async showPerformanceRecord(
//     record_id: string,
//     user_id: string,
//     taskCompleted: number,
//     hoursworked: number
//   ): Promise<{ username: string; taskCompleted: number; hoursworked: number } | null> {
//     try {
//       const result = await pool
//         .request()
//         .input('record_id', record_id)
//         .input('user_id', user_id)
//         .input('taskCompleted', taskCompleted)
//         .input('hoursworked', hoursworked)
//         .execute('showperformancerecord');

//       if (result.recordset.length > 0) {
//         const { username, taskCompleted, hoursworked } = result.recordset[0];
//         return { username, taskCompleted, hoursworked };
//       }

//       return null; // No matching data returned
//     } catch (err) {
//       console.error('Error executing stored procedure:', err);
//       throw new Error('Database error while showing performance record.');
//     }
//   }
// }




export class showperformanceservice {
    async showperformancerecord(performance: Performance, userdetails: UserDetails) {
      try {
        let pool = await mssql.connect(sqlconfig);
  
        const result = await pool.request()
          .input('record_id', mssql.VarChar, performance.record_id)
          .input('user_id', mssql.VarChar, userdetails.user_id)
          .input('taskCompleted', mssql.Int, performance.taskCompleted)
          .input('hoursworked', mssql.Int, performance.hoursworked)
          .execute('showperformancerecord');
  
        if (result.recordset.length > 0) {
          const { username, taskCompleted, hoursworked } = result.recordset[0];
          return {
            username,
            taskCompleted,
            hoursworked,
            message: 'New data fetched successfully'
          };
        } else {
          return {
            message: 'Error fetching employee data'
          };
        }
      } catch (error) {
        console.error('Database error:', error);
        throw new Error('Something went wrong while executing the stored procedure.');
      }
    }
  }







// export class PerformanceService {

//      async showperformancerecord(Performance: Performance, userdetails:UserDetails){
//           let pool = await mssql.connect(sqlconfig)
       
  
//           let result = await (await pool.request()
//        .input('record_id', mssql.VarChar, Performance.record_id)
//        .input('user_id', mssql.VarChar, userdetails.user_id)
//        .input('taskCompleted', mssql.Int, Performance.taskCompleted)
//        .input('hoursworked', mssql.Int, Performance.hoursworked)
       
      
      
      
//        .execute('showperformancerecord')).rowsAffected
  
//        if (result.recordset.length > 0) {
//                   const { username, taskCompleted, hoursworked } = result.recordset[0];
//           return{ username, 
//             taskCompleted, 
//             hoursworked,
//               message: 'New data fetched successfully'
//           }
//        }else{
//           return{
//               message: 'Error fetching employees data'
//           }
//        }
//       }
//     }

// export class UserPerformanceService {
//     static async showPerformanceRecord(
//       record_id: string,
//       user_id: string,
//       taskCompleted: number,
//       hoursworked: number
//     ): Promise<{ username: string; taskCompleted: number; hoursworked: number } | null> {
//       try {
//         const result = await pool
//           .request()
//           .input('record_id', record_id)
//           .input('user_id', user_id)
//           .input('taskCompleted', taskCompleted)
//           .input('hoursworked', hoursworked)
//           .execute('showperformancerecord');
  
//         if (result.recordset.length > 0) {
//           const { username, taskCompleted, hoursworked } = result.recordset[0];
//           return { username, taskCompleted, hoursworked };
//         }
  
//         return null; // No matching data returned
//       } catch (err) {
//         console.error('Error executing stored procedure:', err);
//         throw new Error('Database error while showing performance record.');
//       }
//     }
//   }