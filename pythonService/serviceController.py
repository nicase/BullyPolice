import os
import subprocess
import time, datetime

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
        now = datetime.datetime.now()
        if now.hour%2 == 0 and now.minute == 0:
            print("Run Reddit")
            os.waitpid(runReddit(), 0)        
            print("Run TwitterEn")
            os.waitpid(runTwitterEn(), 0)        
            # print("Run TwitterEs")
            # os.waitpid(runTwitterEs(), 0)        
            time.sleep(60)