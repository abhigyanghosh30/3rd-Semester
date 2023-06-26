#include <sys/stat.h>
#include <sys/types.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdlib.h>

int main(int argc, char *argv[])
{
    if(argc != 2)
    {
		write(1,"Usage: ./a.out [filename]\n",27);
		return 0;
	}
    int file_read = open(argv[1],O_RDONLY);
    if(file_read == -1)
    {
        write(1,"Failed to open file\n",21);
		exit(1);    
    }
    char ch[4096];
    int directory = mkdir("./Assignment",0777);
    if(directory == -1)
    {
        write(1,"Failed to create directory Assignment\n",39);
        exit(1);
    }
    int new_file[2];
    new_file[0] = open("./Assignment/rev.txt",O_CREAT|O_RDWR);
    if(new_file[0] == -1)
    {
        write(1,"Failed to create file rev.txt\n",31);
        exit(1);
    }
    char rev[4096];
    int seek = lseek(file_read,0,SEEK_END);

    // Reading 4 Kb each time 
    while(seek > 4096)
    {
        seek = lseek(file_read,seek-4096,SEEK_SET);
        read(file_read,ch,4096);
        for(int i=0 ; i<4096 ; i++)
        {
            rev[i]=ch[4095-i];
            if(rev[i]>='A' && rev[i]<='Z')
                rev[i] += 32;
            else if(rev[i]>='a' && rev[i]<='z')
                rev[i] -= 32;

        }
        write(new_file[0],rev,4096);        
    }
    // The remaining part
    lseek(file_read,0,SEEK_SET);
    read(file_read,ch,seek);
    for(int i=0 ; i<seek ; i++)
    {
        rev[i]=ch[seek-1-i];
        if(rev[i]>='A' && rev[i]<='Z')
            rev[i] += 32;
        else if(rev[i]>='a' && rev[i]<='z')
            rev[i] -= 32;
    }
    write(new_file[0],rev,seek);

    int left = seek;
    close(file_read);
    close(new_file[0]);
    chmod("./Assignment/rev.txt",0600);
    chmod("./Assignment",0700);
    
}