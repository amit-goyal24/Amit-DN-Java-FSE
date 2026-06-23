SET SERVEROUTPUT ON;

-- ====================================================================
-- Scenario 1: Apply a 1% discount to loan interest rates for customers > 60
-- ====================================================================
DECLARE
CURSOR c_customers IS SELECT CustomerID, DOB FROM Customers;
v_age NUMBER;
BEGIN
FOR cust IN c_customers LOOP
        -- Calculate age in years
        v_age := TRUNC(MONTHS_BETWEEN(SYSDATE, cust.DOB) / 12);

        IF v_age > 60 THEN
UPDATE Loans
SET InterestRate = InterestRate - 1
WHERE CustomerID = cust.CustomerID;
END IF;
END LOOP;
COMMIT;
DBMS_OUTPUT.PUT_LINE('Scenario 1: Senior citizen discounts applied.');
END;
/

-- ====================================================================
-- Scenario 2: Promote to VIP based on balance over $10,000
-- Note: Assuming an 'IsVIP' column exists. If not, you'd run:
-- ALTER TABLE Customers ADD IsVIP VARCHAR2(5) DEFAULT 'FALSE';
-- ====================================================================
BEGIN
FOR cust IN (SELECT CustomerID, Balance FROM Customers) LOOP
        IF cust.Balance > 10000 THEN
UPDATE Customers
SET IsVIP = 'TRUE'
WHERE CustomerID = cust.CustomerID;
END IF;
END LOOP;
COMMIT;
DBMS_OUTPUT.PUT_LINE('Scenario 2: VIP statuses updated.');
END;
/

-- ====================================================================
-- Scenario 3: Reminders for loans due in the next 30 days
-- ====================================================================
BEGIN
    DBMS_OUTPUT.PUT_LINE('--- Loan Reminders ---');
FOR loan_rec IN (
        SELECT c.Name, l.EndDate
        FROM Loans l
        JOIN Customers c ON l.CustomerID = c.CustomerID
        WHERE l.EndDate BETWEEN SYSDATE AND SYSDATE + 30
    ) LOOP
        DBMS_OUTPUT.PUT_LINE('Reminder: Dear ' || loan_rec.Name || ', your loan is due soon on ' || TO_CHAR(loan_rec.EndDate, 'YYYY-MM-DD'));
END LOOP;
END;
/