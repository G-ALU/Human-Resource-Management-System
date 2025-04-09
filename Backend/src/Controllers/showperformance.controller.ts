import { Request, Response } from 'express';
import { showperformanceservice } from '../Services/Showperformance.service';

let ShowPerformanceService = new showperformanceservice();

export class showperformancecontroller {
  async showperformancerecord(req: Request, res: Response) {
    try {
      // Destructure performance and userdetails from req.body
      const { performance, userdetails } = req.body;

      // Now pass them as two arguments
      const result = await ShowPerformanceService.showperformancerecord(performance, userdetails);

      return res.status(201).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: 'Error in showing the employee data',
      });
    }
  }
}
