CREATE  OR ALTER PROCEDURE cancelBooking
    @booking_id VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM bookings
    WHERE booking_id = @booking_id;

    -- Check if any rows were affected
    IF @@ROWCOUNT > 0
    BEGIN
        SELECT 'Booking cancelled successfully' AS message;
    END
    ELSE
    BEGIN
        SELECT 'Booking not found' AS error;
    END
END;