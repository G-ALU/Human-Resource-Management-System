CREATE OR ALTER PROCEDURE deleteUser
    @user_id VARCHAR(255)
AS
BEGIN
    -- DELETE FROM Users WHERE user_id = @user_id;
    UPDATE  Users SET isActive = 0 WHERE user_id = @user_id;
END;

