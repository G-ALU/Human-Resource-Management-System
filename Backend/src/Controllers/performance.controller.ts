import { Request, Response } from 'express';
import { PerformanceService } from '../Services/performance.service';


let performanceService = new PerformanceService();

export class PerformanceController {
    async createperformancesummary(req: Request, res: Response){
        
        try {
            let {taskCompleted, hoursworked} = req.body

            let result = await performanceService.createperformancesummary(req.body)

            return res.status(201).json(result)
        } catch (error) {
            return res.json({
                error: 'Error in creating the summary'
            })
            
        }

    }

  }





// export const getUserPerformanceSummary = async (req: Request, res: Response) => {
//   const user_id = req.params.user_id;

//   try {
//     const summary = await PerformanceService.getUserPerformanceSummary(user_id);
//     if (summary) {
//       res.status(200).json(summary);
//     } else {
//       res.status(404).json({ message: 'Performance metrics not found' });
//     }
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };
