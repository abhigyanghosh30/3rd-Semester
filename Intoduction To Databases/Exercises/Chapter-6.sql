-- 6.10
-- a 
SELECT Fname,Minit,Lname FROM EMPLOYEE JOIN PROJECT ON EMPLOYEE.Dno=PROJECT.Dnum JOIN WORKS_ON ON EMPLOYEE.Ssn=WORKS_ON.Essn AND WORKS_ON.Pno=PROJECT.Pnumber WHERE EMPLOYEE.Dno=5 AND WORKS_ON.Hours>10 AND PROJECT.Pname="ProductX";
-- b
SELECT Fname,Minit,Lname FROM EMPLOYEE JOIN DEPENDENT ON EMPLOYEE.Ssn=DEPENDENT.Essn WHERE EMPLOYEE.Fname=DEPENDENT.Dependent_name;
-- c
SELECT e1.Fname,e1.Minit,e1.Lname FROM EMPLOYEE e1 JOIN EMPLOYEE e2 ON e1.Super_ssn=e2.Ssn where e2.Fname="Franklin" and e2.Lname="Wong";
-- 6.11
-- a
INSERT INTO `EMPLOYEE` VALUES ('ROBERT','F','SCOTT','943775543', '1972-06-21', '2365 Newcastle Rd, Bellaire, TX','M', 58000,'888665555', 1);
-- b
INSERT INTO `PROJECT` VALUES ('ProductA',4,'Bellaire',2);

-- 6.12
USE STUDENT;
-- a
SELECT Name from STUDENT WHERE Major='CS';
-- b 
SELECT Course_name FROM COURSE INNER JOIN SECTION ON COURSE.Course_number=SECTION.Course_number WHERE SECTION.Instructor='King' AND SECTION.Year IN (7,8);
-- c
SELECT c.Course_number,s.Semester,s.Year 
FROM COURSE c JOIN SECTION s ON c.Course_number=s.Course_number;

-- 6.13
-- a
INSERT INTO STUDENT.STUDENT VALUES ('Johnson', 25, 1, 'Math');
-- b
UPDATE STUDENT SET Class=2 WHERE Name='Smith';
-- c
INSERT INTO COURSE VALUES ('Knowledge Engineering', 'CS4390', 3, 'cs');
-- d
DELETE FROM STUDENT WHERE Name='Smith' AND Student_number=18;