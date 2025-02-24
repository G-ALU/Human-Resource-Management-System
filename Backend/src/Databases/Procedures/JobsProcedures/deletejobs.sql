CREATE OR ALTER PROCEDURE deletejobs
    @job_id VARCHAR(255)
AS
BEGIN
    DELETE FROM jobs WHERE job_id = @job_id;
END;