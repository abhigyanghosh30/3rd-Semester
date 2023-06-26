#include<stdio.h>
// #include<sys/stat.h>
#include<stdlib.h>
#include<fcntl.h>
#include<unistd.h>

int main(int argc, char *argv[])
{
    int fd;

    if(argc !=2 )
    {
        printf("Usage: ./a.out [filename]\n");
		return 0;
    }
    fd = open(argv[1],  O_RDONLY);
    if(fd < 0)
    {
        fprintf(stderr, "Failed to open file \"%s\"\n", argv[1]);
		exit(1);
    }
    char s[101];
	size_t size_read;
    size_read = read(fd, s, 100);
    if(size_read < 0){
		/* read returns -1 if there was an error reading the file */

		fprintf(stderr, "Failed to read file \"%s\"\n", argv[1]);
		exit(1);
	}
    int fw[2];
    printf("%s",s);
    fw[0] = open("new.txt",O_CREAT);
    fw[1] = open("new.txt",O_RDWR);
    write(fw[1],s,100);
    close(fd);
    close(fw[0]);
    close(fw[1]);
}