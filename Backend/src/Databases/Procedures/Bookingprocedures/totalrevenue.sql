CREATE OR ALTER PROCEDURE gettotalrevenue
AS
BEGIN
    SELECT SUM(event.Singlesprice) AS totalRevenue
    FROM bookings
    JOIN event ON bookings.event_id = event.event_id;

    SELECT SUM(event.Groupsprice) AS totalRevenue
    FROM bookings
    JOIN event ON bookings.event_id = event.event_id;
END