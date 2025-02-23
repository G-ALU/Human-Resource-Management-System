CREATE OR ALTER PROCEDURE reactiveUser
    @user_id VARCHAR(255)
AS
BEGIN
    -- DELETE FROM Users WHERE user_id = @user_id;
    UPDATE  Users SET isActive = 1 WHERE user_id = @user_id;
END;