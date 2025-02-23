import express from 'express';
import { BookingController } from '../Controllers/booking.controller';

const booking_router = express.Router();
let bookingController = new BookingController();

// Book an event
booking_router.post('/', bookingController.bookEvent);

// Get all bookings
booking_router.get('/', bookingController.getAllBookings);

// Get bookings by user
booking_router.get('/user/:user_id', bookingController.getBookingsByUser);

// Get bookings by event
booking_router.get('/event/:event_id', bookingController.getBookingsByEvent);

// Cancel a booking
booking_router.delete('/', bookingController.cancelBooking);

// Get total revenue
booking_router.get('/book/revenue', bookingController.getTotalRevenue);

export default booking_router;