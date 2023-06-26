# Chapter 1

## 1.1 Define the following terms

- data : known facts that can be recorded and that have implicit meaning.
- database : A database is a collection of related data.
- DBMS : a collection of programs that enables users to create and maintain a database

- database system : The database and DBMS software together form a database system

- database catalog : The database catalog contains information such as structure of each file, the type and storage format and various constraints on the data.

- program-data independence : The structure of data files is stored in the DBMS catalog separately from the access programs. We call this property program-data independence.

- user view : A view may be a subset of the database or it may contain virtual data that is derived from the database files but is not explicitly stored.

- DBA : The DBA is responsible for authorizing access to the database, coordinating and monitoring its use, and acquiring software and hardware resources as needed

- end user : End users are the people whose jobs require access to the database for querying,updating, and generating reports; the database primarily exists for their use

- canned transaction : querying and updating the database, using standard types of queries and updates

- deductive database system : Some database systems provide capabilities for defining deduction rules for inferencing new information from the stored database facts. Such systems are called deductive database systems.

- persistent object : Object-Oriented database systems are compatible with programming languages such as c++ and JAVA. An object that is stored in such a way that it survives that termination of the DBMS program is persistent.

- meta-data : Information about the data is called Meta data. The information stored in the catalog is called Meta data. The schema of a table is an example of Meta data.

- transaction-processing application : A transaction is a logical unit of database. The processing includes one or more database operations like, insertion, deletion, modification and retrieval. The database operations that form a transaction can either be embedded within an application program on they can be specified interactively via a high-level query language such as SQL.

## 1.2 What four main types of actions involve databases? Briefly discuss each

> 1. Database Administration
> 2. Database Designing
> 3. Database Users
> 4. System Analysis and Application Programming

## 1.3. Discuss the main characteristics of the database approach and how it differs from traditional file systems

> 1. Controls Redundancy
> 2. Restricts Unauthorized access
> 3. Providing Persistent Storage for Program Objects
> 4. Provide storage structures and search techniques for efficient query processing
> 5. Provide backup and recovery
> 6. Provide multiple UI
> 7. Representing Complex Relationships among Data
> 8. Enforcing Integrity Constraints
> 9. Permitting Inferencing and Actions Using Rules

## 1.4. What are the responsibilities of the DBA and the database designers

> DBA is responsible for granting access, overlooking and coordinating transactions and acquiring hadware and software resources as needed
> Database Designers are responsible for identifying the type of data to be stored in the database and choosing appropriaate structures to represent and store this data

## 1.5. What are the different types of database end users? Discuss the main activities of each

> End users are the people whose jobs require access to the database for querying,updating, and generating reports; the database primarily exists for their use. There are several categories of end users:
> 1. Casual End Users : occasionally access the database, but they may need different information each time.
> 2. Naive End Users : Their main job function revolves around constantly querying and updating the database, using standard types of queries and updates—called canned transactions—that have been carefully programmed and tested
> 3. Sophisticated End Users : include engineers, scientists, business analysts, and others who thoroughly familiarize themselves with the facilities of the DBMS in order to implement their own applications to meet their complex requirements
> 4. Standalone Users : maintain personal databases by using ready-made program packages that provide easy-to-use menu-based or graphics-based interfaces