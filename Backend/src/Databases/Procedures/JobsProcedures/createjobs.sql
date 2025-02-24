CREATE OR ALTER PROCEDURE createjobs(
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
    INSERT INTO jobs(job_id, image, title, description, location, status, salary) VALUES(@job_id, @image, @title, @description, @location, @status, @salary)
END

-- job_id VARCHAR(255) PRIMARY KEY NOT NULL,
-- image VARCHAR(255) NOT NULL,
-- title VARCHAR(255) NOT NULL,
-- description VARCHAR(255) NOT NULL,
-- location VARCHAR(50) NOT NULL,
-- status VARCHAR(10) NOT NULL CHECK (status IN ('Open', 'Closed')),
-- salary DECIMAL(10,2) NOT NULL,