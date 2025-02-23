import mssql from 'mssql'
import { v4 } from 'uuid'
import { sqlconfig } from '../config/sql.config'
import { booking } from '../Models/booking.interface'
import lodash from 'lodash'

export class BookingService {
    async bookEvent(booking: booking) {
        try {
            let pool = await mssql.connect(sqlconfig)
            let booking_id = v4()

            let isBooked = (await pool.query(`SELECT * FROM bookings WHERE booking_id = '${booking_id}'`)).recordset
            console.log('Booking id',isBooked[0]);
            
            if (!lodash.isEmpty(isBooked)) {
                return {
                    error: 'Booking already exists'
                }
            }

            let result = (await pool.request()
                .input('booking_id', booking_id)
                .input('user_id', mssql.VarChar(255), booking.user_id)
                .input('event_id', mssql.VarChar(255), booking.event_id)
                .execute('bookEvent')).rowsAffected

                if(result[0] === 0){
                    return {
                        error: 'Booking not created'
                    }
                }else{
                    return {
                        message: 'Booking created successfully'
                    }
                }
        } catch (error) {
            console.error('SQL error', error)
            throw error
        }
    }

    async getAllBookings() {
        try {
            let pool = await mssql.connect(sqlconfig)
            let result = await pool.request().query('SELECT * FROM bookings')
            return result.recordset
        } catch (error) {
            console.error('SQL error', error)
            throw error
        }
    }

    async getBookingsByUser(user_id: string) {
        try {
            let pool = await mssql.connect(sqlconfig)
            let result = (await pool.request()
                .input('user_id', mssql.VarChar(255), user_id)
                .query(`SELECT * FROM bookings WHERE user_id = '${user_id}'`)).recordset
            console.log(result[0]);
            
                if(result.length > 0){
                    return {
                        bookings: result
                    }
                }

        } catch (error) {
            console.error('SQL error', error)
            throw error
        }
    }

    async getBookingsByEvent(event_id: string) {
        try {
            let pool = await mssql.connect(sqlconfig)
            let result = (await pool.request()
                .input('event_id', mssql.VarChar(255), event_id)
                .query(`SELECT * FROM bookings WHERE event_id = '${event_id}'`)).recordset

                if (lodash.isEmpty(result)) {
                    return {
                        error: "No bookings found"
                    }
                } else {
                    return {
                        bookings: result
                    }
                }
            
        } catch (error) {
            console.error('SQL error', error)
            throw error
        }
    }

    async cancelBooking(booking_id: string) {
        try {
            let pool = await mssql.connect(sqlconfig);
            let result = await pool.request()
                .input('booking_id', mssql.VarChar(255), booking_id)
                .execute('cancelBooking');

            const message = result.recordset[0]?.message;
            const error = result.recordset[0]?.error;

            if (message) {
                return { message: message };
            } else {
                return { error: error };
            }
        } catch (error) {
            console.error('SQL error', error);
            throw error;
        }
    }

    async getTotalRevenue() {
        try {
            let pool = await mssql.connect(sqlconfig);
            let result = await pool.request().execute('gettotalrevenue');
            return { totalRevenue: result.recordset[0].totalRevenue };
        } catch (error) {
            console.error('SQL error', error);
            throw error;
        }
    }
}