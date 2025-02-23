CREATE OR ALTER PROCEDURE createEvent(
    @event_id VARCHAR(255),
    @date VARCHAR(255),
    @duration VARCHAR(50),
    @Location VARCHAR(50),
    @Ticketsavailable VARCHAR(255),
    @Singlesprice DECIMAL(10,2),
    @Groupsprice DECIMAL(10,2),
    @description VARCHAR(255),
    @image VARCHAR(255)
)
AS
BEGIN
    INSERT INTO event(event_id, date, duration, Location, Ticketsavailable, Singlesprice, Groupsprice, description, image) VALUES(@event_id, @date, @duration, @Location, @Ticketsavailable, @Singlesprice, @Groupsprice, @description, @image)
END