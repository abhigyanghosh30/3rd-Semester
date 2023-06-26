#include <sys/stat.h>
#include <sys/types.h>
#include <sys/utsname.h>
#include <unistd.h>
#include <fcntl.h>


int check_integrity(int fd1,int fd2)
{
    int flag=0;
    char rbuf1[4096],rbuf2[4096];
    int seek = lseek(fd1,0,SEEK_END);
    char rev[4096];
    while(seek > 4096)
    {
        seek = lseek(fd1,seek-4096,SEEK_SET);
        read(fd1,rbuf1,4096);
        read(fd2,rbuf2,4096);
        for(int i=0;i<4096;i++)
        {
            rev[i]=rbuf2[4095-i];
        }
        for(int i=0;i<4096;i++)
        {
            if(rbuf1[i] >= 'A' && rbuf1[i] <='Z')
            {    
                if(rev[i] != rbuf1[i]+32)
                {
                    return 1;
                }
            }
            else if(rev[i] >='a' && rbuf1[i]<='z')
            {
                if(rbuf2[i] != rbuf1[i]-32)
                {
                    return 1;
                } 
            }
        }
    }
    lseek(fd1,0,SEEK_SET);
    lseek(fd2,-seek,SEEK_END);
    read(fd1,rbuf1,seek);
    read(fd2,rbuf2,seek);
    for(int i=0;i<seek;i++)
    {
        for(int i=0;i<seek;i++)
        {
            rev[i]=rbuf2[seek-1-i];
        }
        if(rbuf1[i] >= 'A' && rbuf1[i] <='Z')
        {    
            if(rev[i] != rbuf1[i]+32)
            {
                flag = 1;
                break;
            }
        }
        else if(rbuf1[i] >='a' && rbuf1[i]<='z')
        {
            if(rev[i] != rbuf1[i]-32)
            {
                flag = 1;
                break;
            } 
        }
    }
    return flag;
}

int main(int argc, char *argv[])
{
    int linkat = symlink("./Assignment/rev.txt","./link.txt");
    struct stat stafile;
    
    /*
    CHECKING IF THE FILES EXIST
    */

    if(stat("./Assignment",&stafile)==0 && S_ISDIR(stafile.st_mode)==1)
    {
        write(1,"Checking whether the directory has been created: Yes\n",54);
        if(stat("./Assignment/rev.txt",&stafile)==0||(stafile.st_mode))
            write(1,"Checking whether the file has been created: Yes\n",49);
        else
            write(1,"Checking whether the file has been created: No\n",48);
    }
    else
    {
        write(1,"Checking whether the directory has been created: No\n",53);
        write(1,"Checking whether the file has been created: No\n",48);
    }

    char buf[1024];
    int len;
    len = readlink("link.txt",buf,sizeof(buf)-1);
    buf[len]='\0';

    if(lstat("./link.txt",&stafile)==0 && stat("./link.txt",&stafile)== 0)
        write(1,"Checking whether the symlink has been created: Yes\n",52);
    else
        write(1,"Checking whether the symlink has been created: No\n",51);
    

    /*
    CHECKING FOR FILE SIMILARITY
    */

    int fd1 = open(argv[1],O_RDONLY);
    int fd2 = open(buf,O_RDONLY);
    struct stat st1, st2;
    stat(argv[1],&st1);
    stat(buf,&st2);
    if(st1.st_size == st2.st_size)
    {
        if(check_integrity(fd1,fd2) == 0)
            write(1,"Checking whether file contents have been reversed and case-inverted: Yes\n",74);
        else
            write(1,"Checking whether file contents have been reversed and case-inverted: No\n",73);
    }
    else
        write(1,"Checking whether file contents have been reversed and case-inverted: No\n",73);
    /*
    CHECKING FOR FILE PERMISSIONS
    */

    int status = stat("Assignment/rev.txt",&stafile);
    write(1,"\nAssignment/rev.txt\n",21);
    // For user
    int wrx=(stafile.st_mode)/64;
    if((wrx/4)%2==1 && status==0)
        write(1,"User has read permission: Yes\n",31);
    else
        write(1,"User has read permission: No\n",30);
    if((wrx/2)%2==1 && status==0)
        write(1,"User has write permission: Yes\n",32);
    else
        write(1,"User has write permission: No\n",31);
    if(wrx%2==1 && status==0)
        write(1,"User has execute permission: Yes\n",34);
    else
        write(1,"User has execute permission: No\n",33);
    
    // For Group
    wrx = (stafile.st_mode)/8;
    if((wrx/4)%2==1 && status==0)
        write(1,"Group has read permission: Yes\n",32);
    else
        write(1,"Group has read permission: No\n",31);
    if((wrx/2)%2==1 && status==0)
        write(1,"Group has write permission: Yes\n",33);
    else
        write(1,"Group has write permission: No\n",32);
    if(wrx%2==1 && status==0)
        write(1,"Group has execute permission: Yes\n",35);
    else
        write(1,"Group has execute permission: No\n",34);
    
    // For Others
    wrx = (stafile.st_mode);
    if((wrx/4)%2==1 && status==0)
        write(1,"Others has read permission: Yes\n",33);
    else
        write(1,"Others has read permission: No\n",32);
    if((wrx/2)%2==1 && status==0)
        write(1,"Others has write permission: Yes\n",34);
    else
        write(1,"Others has write permission: No\n",33);
    if(wrx%2==1 && status==0)
        write(1,"Others has execute permission: Yes\n",36);
    else
        write(1,"Others has execute permission: No\n",35);
    
    status = lstat("./link.txt",&stafile);

    write(1,"\nlink.txt \n",13);
    // For user
    wrx=(stafile.st_mode)/64;
    if((wrx/4)%2==1 && status==0)
        write(1,"User has read permission: Yes\n",31);
    else
        write(1,"User has read permission: No\n",30);
    if((wrx/2)%2==1 && status==0)
        write(1,"User has write permission: Yes\n",32);
    else
        write(1,"User has write permission: No\n",31);
    if(wrx%2==1 && status==0)
        write(1,"User has execute permission: Yes\n",34);
    else
        write(1,"User has execute permission: No\n",33);
    
    // For Group
    wrx = (stafile.st_mode)/8;
    if((wrx/4)%2==1 && status==0)
        write(1,"Group has read permission: Yes\n",32);
    else
        write(1,"Group has read permission: No\n",31);
    if((wrx/2)%2==1 && status==0)
        write(1,"Group has write permission: Yes\n",33);
    else
        write(1,"Group has write permission: No\n",32);
    if(wrx%2==1 && status==0)
        write(1,"Group has execute permission: Yes\n",35);
    else
        write(1,"Group has execute permission: No\n",34);
    // For Others
    wrx = (stafile.st_mode);
    if((wrx/4)%2==1 && status==0)
        write(1,"Others has read permission: Yes\n",33);
    else
        write(1,"Others has read permission: No\n",32);
    if((wrx/2)%2==1 && status==0)
        write(1,"Others has write permission: Yes\n",34);
    else
        write(1,"Others has write permission: No\n",33);
    if(wrx%2==1 && status==0)
        write(1,"Others has execute permission: Yes\n",36);
    else
        write(1,"Others has execute permission: No\n",35);
    
    
    status = stat("Assignment",&stafile);
    write(1,"\nAssignment\n",13);
    // For user
    wrx=(stafile.st_mode)/64;
    if((wrx/4)%2==1 && status==0)
        write(1,"User has read permission: Yes\n",31);
    else
        write(1,"User has read permission: No\n",30);
    if((wrx/2)%2==1 && status==0)
        write(1,"User has write permission: Yes\n",32);
    else
        write(1,"User has write permission: No\n",31);
    if(wrx%2==1 && status==0)
        write(1,"User has execute permission: Yes\n",34);
    else
        write(1,"User has execute permission: No\n",33);
    
    // For Group
    wrx = (stafile.st_mode)/8;
    if((wrx/4)%2==1 && status==0)
        write(1,"Group has read permission: Yes\n",32);
    else
        write(1,"Group has read permission: No\n",31);
    if((wrx/2)%2==1 && status==0)
        write(1,"Group has write permission: Yes\n",33);
    else
        write(1,"Group has write permission: No\n",32);
    if(wrx%2==1 && status==0)
        write(1,"Group has execute permission: Yes\n",35);
    else
        write(1,"Group has execute permission: No\n",34);
    
    // For Others
    wrx = (stafile.st_mode);
    if((wrx/4)%2==1 && status==0)
        write(1,"Others has read permission: Yes\n",33);
    else
        write(1,"Others has read permission: No\n",32);
    if((wrx/2)%2==1 && status==0)
        write(1,"Others has write permission: Yes\n",34);
    else
        write(1,"Others has write permission: No\n",33);
    if(wrx%2==1 && status==0)
        write(1,"Others has execute permission: Yes\n",36);
    else
        write(1,"Others has execute permission: No\n",35);     
}