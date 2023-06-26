USE COMPANY;
-- 1
create view v1 as
SELECT distinct(p.Dnum),e.Fname from EMPLOYEE e JOIN WORKS_ON w ON e.Ssn=w.Essn JOIN PROJECT p on p.Pnumber=w.Pno; 
create view v2 as 
SELECT count(Dnum) as count,Fname from v1 GROUP BY Fname;
SELECT Fname FROM v2 WHERE count=(SELECT COUNT(*) FROM DEPARTMENT); 
-- 2
SELECT Fname,Minit,Lname from EMPLOYEE where Ssn in (SELECT Mgr_ssn FROM (SELECT COUNT(Mgr_ssn) as count,Mgr_ssn FROM EMPLOYEE JOIN DEPARTMENT ON EMPLOYEE.Dno=DEPARTMENT.Dnumber WHERE EMPLOYEE.Salary>(SELECT avg(Salary) FROM EMPLOYEE) and EMPLOYEE.Ssn!=DEPARTMENT.Mgr_Ssn group by Mgr_ssn) as temp1 WHERE temp1.count>=2);
-- 3
create view sexcount as
(SELECT COUNT(Mgr_ssn) as count,Mgr_ssn,Sex FROM DEPARTMENT JOIN EMPLOYEE ON DEPARTMENT.Dnumber=EMPLOYEE.Dno Group by Mgr_ssn,EMPLOYEE.Sex);
create view totalcount as
SELECT SUM(count) as tcount,Mgr_ssn from sexcount group by Mgr_ssn;
SELECT e.Fname,d.Mgr_start_date FROM EMPLOYEE e JOIN DEPARTMENT d ON d.Mgr_ssn=e.Ssn where (SELECT tcount from totalcount Where Mgr_ssn=e.Ssn)> 2*(SELECT count from sexcount WHERE Mgr_ssn=e.Ssn AND Sex='F'); 
-- 3 correct
create view counts as
SELECT COUNT(Sex) as count,Sex,Dno FROM EMPLOYEE GROUP BY Dno,Sex;
create view deptres as
SELECT distinct(c.Dno) from counts c WHERE (SELECT count from counts d where d.Dno=c.Dno and d.Sex='M')<(SELECT count from counts d where d.Dno=c.Dno and d.Sex='F');
SELECT e.Fname,e.Minit,e.Lname,dp.Mgr_start_date FROM DEPARTMENT dp JOIN EMPLOYEE e ON dp.Mgr_ssn=e.Ssn WHERE e.Dno in (SELECT distinct(c.Dno) from counts c WHERE (SELECT count from counts d where d.Dno=c.Dno and d.Sex='M')<(SELECT count from counts d where d.Dno=c.Dno and d.Sex='F'));
-- 4
create view temp1 as
SELECT sum(Hours) as sum,Essn FROM WORKS_ON Group by Essn;
;  
UPDATE EMPLOYEE
SET Salary=Salary*0.9
WHERE Super_ssn IN (SELECT Essn FROM temp1 WHERE sum>(select avg(sum) from temp1));

select avg(sum) from temp1;