CREATE PROCEDURE bookEvent
    @booking_id VARCHAR(255),
    @user_id VARCHAR(255),
    @event_id VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if the user exists
    IF NOT EXISTS (SELECT 1 FROM Users WHERE user_id = @user_id)
    BEGIN
        SELECT 'Invalid user' AS Result
        RETURN
    END

    -- Check if the event exists
    IF NOT EXISTS (SELECT 1 FROM event WHERE event_id = @event_id)
    BEGIN
        SELECT 'Invalid event' AS Result
        RETURN
    END

    -- Check if the booking already exists
    IF EXISTS (SELECT 1 FROM bookings WHERE user_id = @user_id AND event_id = @event_id)
    BEGIN
        SELECT 'Booking already exists' AS Result
        RETURN
    END

    -- Insert the new booking
    INSERT INTO bookings (booking_id, user_id, event_id, booking_date)
    VALUES (@booking_id, @user_id, @event_id, GETDATE())

    -- Check if the insertion was successful
    IF @@ROWCOUNT > 0
    BEGIN
        SELECT 'Booking successful' AS Result
    END
    ELSE
    BEGIN
        SELECT 'Booking failed' AS Result
    END
END