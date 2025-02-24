CREATE OR ALTER PROCEDURE updatejobsdetails(
 
@job_id VARCHAR(255),
@image VARCHAR(255),
@title VARCHAR(255),
@description VARCHAR(255),
@location VARCHAR(50),
@status VARCHAR(10),
@salary DECIMAL(10,2)
)
AS
BEGIN
    UPDATE jobs SET image=@image, title = @title, description = @description, location = @location, status = @status, salary = @salary WHERE job_id = @job_id
END

--@job_id VARCHAR(255),
--@image VARCHAR(255),
--@title VARCHAR(255),
--@description VARCHAR(255),
--@location VARCHAR(50),
--@status VARCHAR(10),
--@salary DECIMAL(10,2)