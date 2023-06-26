-- Roll No: 20171089
-- Seat No: F16

-- 1
CREATE VIEW temp1 as
SELECT COUNT(Fname) as count,Dno FROM EMPLOYEE group by Dno;
SELECT Dname from DEPARTMENT WHERE Dnumber IN (SELECT temp1.Dno from temp1 WHERE temp1.count=(SELECT MAX(temp1.count) FROM temp1));

-- 2
create view depcount as
SELECT Count(Essn) as Dcount,Essn,Dno FROM DEPENDENT JOIN EMPLOYEE on EMPLOYEE.Ssn=DEPENDENT.Essn group by Essn;
create view maxdepcount as
SELECT MAX(Dcount) as Mdcount,Dno FROM depcount group by Dno;

SELECT Essn FROM depcount,maxdepcount WHERE maxdepcount.Dno=depcount.Dno and depcount.Dcount=maxdepcount.Mdcount;

create view epcount as
SELECT COUNT(Pno),Essn FROM WORKS_ON group by Essn;
SELECT COUNT()

 
UPDATE DEPARTMENT
SET Mgr_ssn = e.Ssn
WHERE 