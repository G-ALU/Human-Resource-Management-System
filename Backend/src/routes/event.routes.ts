import { Router } from 'express';
import { EventController } from '../Controllers/event.controller';

const event_router = Router();

let controller = new EventController()

event_router.post('/create', controller.createjobs);
event_router.put('/:job_id', controller.updatejobs);
event_router.delete('/:job_id', controller.deletejobs);
event_router.get('/all-jobs', controller.fetchalljobs);
event_router.get('/:job_id', controller.fetchsinglejob)

export default event_router;