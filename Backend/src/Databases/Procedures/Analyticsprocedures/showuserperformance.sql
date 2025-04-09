CREATE OR ALTER PROCEDURE showperformancerecord
    @record_id VARCHAR(255),
    @user_id VARCHAR(255),
    @taskCompleted INT,
    @hoursworked INT
AS
BEGIN
    -- Check if the user exists
    IF EXISTS (SELECT 1 FROM Users WHERE user_id = @user_id)
    BEGIN
        -- Insert new performance record
        INSERT INTO PerformanceRecords (record_id, user_id, taskCompleted, hoursworked)
        VALUES (@record_id, @user_id, @taskCompleted, @hoursworked);

        -- Return joined info (Username, TaskCompleted, HoursWorked)
        SELECT 
            U.username,
            P.taskCompleted,
            P.hoursworked
        FROM Users U
        INNER JOIN PerformanceRecords P ON U.user_id = P.user_id
        WHERE P.record_id = @record_id;
    END

        ELSE
    BEGIN
        -- Optional: Raise error or return message
        RAISERROR ('User not found. Cannot insert performance record.', 16, 1);
    END
END;