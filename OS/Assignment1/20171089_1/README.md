# Assignment 1 - Basic System Calls

## Question 1

### Usage

 1. To compile : `gcc q1.c -o q1`

 2. To run : `./q1 <file to reverse>`

### Points to Note

- The parsed text is stored in ./Assignment/rev.txt

- The program might take a few minutes to parse large files(>= 1 GB). Please wait patiently.

- The Permissions for Assignment have been set to wrx for user as otherwise scripts cannot be written to access rev.txt inside it. rev.txt however has only wr permissions for user.

- The reversed file is named as rev.txt and is stored inside Assignment directory.

## Question 2

### Usage

 1. To compile : `gcc q2.c -o q2`

 2. To run : `./q2 <file that was reversed in question 1>`

### Points to Note

- The output lists the permissions for each file/directory in the format specified in the question.

- If the file doesn't exist or is not accessible, then it prints No.

- File comparison also takes some time for large files(>= 1 GB). Please wait patiently.

- The symbolic link to reversed file is named as link.txt.
