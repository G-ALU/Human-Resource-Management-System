CREATE OR ALTER PROCEDURE createperformancesummary(
    @record_id VARCHAR(255),
    @taskCompleted INT,
    @hoursworked DECIMAL(5,2)
    
    )
AS
BEGIN
    INSERT INTO PerformanceRecords(record_id, taskCompleted, hoursworked) VALUES(@record_id, @taskCompleted, @hoursworked)
END









--  record_id VARCHAR(255) PRIMARY KEY,
--     user_id VARCHAR(255) FOREIGN KEY REFERENCES Users(user_id),
--     username VARCHAR(255) NOT NULL,
--     taskCompleted INT,
--     hoursworked DECIMAL(5,2),
--     rating FLOAT,
--     daterecorded DATE

-- CREATE OR ALTER PROCEDURE createjobs(
    -- @job_id VARCHAR(255),
    -- @image VARCHAR(255),
    -- @title VARCHAR(255),
    -- @description VARCHAR(255),
    -- @location VARCHAR(50),
    -- @status VARCHAR(10),
    -- @salary DECIMAL(10,2)
-- )
-- AS
-- BEGIN
--     INSERT INTO jobs(job_id, image, title, description, location, status, salary) VALUES(@job_id, @image, @title, @description, @location, @status, @salary)
-- END

