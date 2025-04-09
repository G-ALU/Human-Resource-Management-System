CREATE PROCEDURE GetUserPayrollSummary
    @user_id VARCHAR(255)
AS
BEGIN
    SELECT 
        username,
        SUM(BasicSalary) AS TotalBasic,
        SUM(Bonus) AS TotalBonus,
        SUM(Overtime) AS TotalOvertime,
        SUM(TotalPay) AS TotalEarnings
    FROM Payroll
    WHERE user_id = @user_id
    GROUP BY username;
END;
