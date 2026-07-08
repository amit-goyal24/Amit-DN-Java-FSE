SET SERVEROUTPUT ON;

-- ====================================================================
-- Scenario 1: Process monthly interest for all savings accounts
-- ====================================================================
CREATE OR REPLACE PROCEDURE ProcessMonthlyInterest AS
BEGIN
UPDATE Accounts
SET Balance = Balance + (Balance * 0.01)
WHERE AccountType = 'Savings';

COMMIT;
DBMS_OUTPUT.PUT_LINE('Monthly interest (1%) processed for all Savings accounts.');
END ProcessMonthlyInterest;
/

-- ====================================================================
-- Scenario 2: Update employee bonus based on performance
-- ====================================================================
CREATE OR REPLACE PROCEDURE UpdateEmployeeBonus(
    p_department IN VARCHAR2,
    p_bonus_percentage IN NUMBER
) AS
BEGIN
UPDATE Employees
SET Salary = Salary + (Salary * (p_bonus_percentage / 100))
WHERE Department = p_department;

COMMIT;
DBMS_OUTPUT.PUT_LINE('Bonus of ' || p_bonus_percentage || '% applied to department: ' || p_department);
END UpdateEmployeeBonus;
/

-- ====================================================================
-- Scenario 3: Transfer funds between accounts securely
-- ====================================================================
CREATE OR REPLACE PROCEDURE TransferFunds(
    p_from_account IN NUMBER,
    p_to_account IN NUMBER,
    p_amount IN NUMBER
) AS
    v_source_balance NUMBER;
BEGIN
    -- Check balance of the source account
SELECT Balance INTO v_source_balance
FROM Accounts
WHERE AccountID = p_from_account;

-- If sufficient balance, proceed with transfer
IF v_source_balance >= p_amount THEN
        -- Deduct from source
UPDATE Accounts SET Balance = Balance - p_amount WHERE AccountID = p_from_account;
-- Add to destination
UPDATE Accounts SET Balance = Balance + p_amount WHERE AccountID = p_to_account;

COMMIT;
DBMS_OUTPUT.PUT_LINE('Success: $' || p_amount || ' transferred from Account ' || p_from_account || ' to ' || p_to_account);
ELSE
        DBMS_OUTPUT.PUT_LINE('Error: Insufficient balance in source account. Transfer cancelled.');
END IF;

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Error: One or both accounts do not exist.');
WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('An unexpected error occurred: ' || SQLERRM);
ROLLBACK;
END TransferFunds;
/