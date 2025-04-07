CREATE TABLE PerformanceRecords (
    RecordID INT PRIMARY KEY,
    user_id VARCHAR(255) FOREIGN KEY REFERENCES Users(user_id),
    TaskCompleted INT,
    HoursWorked DECIMAL(5,2),
    Rating FLOAT,
    DateRecorded DATE
);

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