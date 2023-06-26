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
SELECT COUNT(w.Pno) as pcount,w.Essn,e.Dno FROM WORKS_ON w JOIN EMPLOYEE e ON w.Essn=e.Ssn GROUP BY Essn;

create view dpcount as
SELECT COUNT(Pnumber) as pcount,Dnum FROM PROJECT group by Dnum;

SELECT Essn from epcount ep,dpcount dp WHERE ep.Dno=dp.Dnum and ep.pcount=dp.pcount; 
 
UPDATE DEPARTMENT,EMPLOYEE
SET Mgr_ssn = EMPLOYEE.Ssn
WHERE EMPLOYEE.Ssn IN (SELECT Essn FROM depcount,maxdepcount WHERE maxdepcount.Dno=depcount.Dno and depcount.Dcount=maxdepcount.Mdcount)
AND EMPLOYEE.Ssn IN (SELECT Essn from epcount ep,dpcount dp WHERE ep.Dno=dp.Dnum and ep.pcount=dp.pcount);

-- 3
SELECT Ssn FROM EMPLOYEE e WHERE e.Ssn in (SELECT f.Super_ssn FROM EMPLOYEE f) or e.Super_ssn IN;  