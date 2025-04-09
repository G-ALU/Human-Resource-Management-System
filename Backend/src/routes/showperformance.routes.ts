import { Router } from 'express';
import { showperformancecontroller } from '../Controllers/showperformance.controller';

const showperformance_router = Router();

let showcontroller = new showperformancecontroller()

showperformance_router.post('/showperformance-records', showcontroller.showperformancerecord)

export default showperformance_router;