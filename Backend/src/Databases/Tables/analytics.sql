CREATE TABLE PerformanceRecords (
    record_id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255),
    taskCompleted INT,
    hoursworked INT,
    CONSTRAINT FK_Perf_User FOREIGN KEY (user_id) REFERENCES Users(user_id)
   
);

ALTER TABLE PerformanceRecords ADD username VARCHAR(255) NOT NULL;

DROP TABLE PerformanceRecords

SELECT * FROM PerformanceRecords


CREATE TABLE Payroll (
    PayrollID INT PRIMARY KEY IDENTITY,
    user_id VARCHAR(255) FOREIGN KEY REFERENCES Users(user_id),
    username VARCHAR(255) NOT NULL,
    BasicSalary DECIMAL(10,2),
    Bonus DECIMAL(10,2),
    Overtime DECIMAL(10,2),
    TotalPay DECIMAL(10,2),
    PaymentDate DATE
);

SELECT * FROM Payroll