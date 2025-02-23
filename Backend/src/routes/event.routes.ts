import { Router } from 'express';
import { EventController } from '../Controllers/event.controller';

const event_router = Router();

let controller = new EventController()

event_router.post('/create', controller.createEvent);
event_router.put('/:event_id', controller.updateEvent);
event_router.delete('/:event_id', controller.deleteEvent)
event_router.get('/all-events', controller.fetchAllEvents);
event_router.get('/:event_id', controller.fetchSingleEvent)

export default event_router;