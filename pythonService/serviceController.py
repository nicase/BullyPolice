import os
import subprocess
import time

def runReddit ():
    newpid = os.fork()
    if newpid == 0:
        subprocess.run(["python3", "runReddit.py"])
        os.exit()
    return newpid

def runTwitterEn ():
    newpid = os.fork()
    if newpid == 0:
        subprocess.run(["python3", "runTwitterEn.py"])
        os.exit()
    return newpid

def runTwitterEs ():
    newpid = os.fork()
    if newpid == 0:
        subprocess.run(["python3", "runTwitterEs.py"])
        os.exit()
    return newpid

if __name__ == "__main__":
    while True:
        time.sleep(3600)
            os.waitpid(runReddit(), 0)        
            os.waitpid(runTwitterEn(), 0)        
            os.waitpid(runTwitterEs(), 0)        