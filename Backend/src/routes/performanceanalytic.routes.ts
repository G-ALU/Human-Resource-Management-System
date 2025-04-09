import { Router } from 'express';
import { PerformanceController } from '../Controllers/performance.controller';

const performance_router = Router();

let controller = new PerformanceController()

performance_router.post('/create', controller.createperformancesummary)

export default performance_router;