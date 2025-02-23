CREATE OR ALTER PROCEDURE updateEventDetails(
    @image VARCHAR(255),
    @event_id VARCHAR(255),
    @date VARCHAR(255),
    @duration VARCHAR(50),
    @Location VARCHAR(50),
    @Ticketsavailable VARCHAR(255),
    @Singlesprice DECIMAL(10,2),
    @Groupsprice DECIMAL(10,2),
    @description VARCHAR(255)
)
AS
BEGIN
    UPDATE event SET image=@image, date = @date, duration = @duration, Location = @Location,  Ticketsavailable =  @Ticketsavailable, Singlesprice =  @Singlesprice,  Groupsprice = @Groupsprice, description = @description WHERE event_id = @event_id
END