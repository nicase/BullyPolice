import praw
import requests
import requests.auth
from Amazon import Amazon
from Connection import Connection
import json
import os

a = Amazon('en')

class Reddit:

    counter = 0
    ntweets = 25

    def tractar_comment (self, comment, paraulesClau):
        author = comment.author.name
        text = comment.body

        descartar = True
        confidence = 0
        print('.')
        try:
            res = a.analyze(text)
            confidence = res['SentimentScore']['Negative'] 
            if confidence > 0.95:
                descartar = False
        except:
            print('************* Error fent la petició a amazon *************')

        '''
        textSplit = text.split(' ')
        if not descartar:
            for p in textSplit:
                if p in paraulesClau:
                    descartar = False
        '''
        
        profileData = {
            "platform": "rd",
	        "name": str(author),
	        "link": "https://www.reddit.com/user/" + str(author)
        }

        bullyData = {
            "platform": "rd",
	        "language": "en",
	        "user": None,
	        "data": text,
            "index": confidence,
            "link": "https://www.reddit.com" + comment.permalink
        }

        try:
            if not descartar:
                self.counter += 1
                res = Connection().getProfile(str(author))
                if len(res.text) == 2:   
                    print(text)
                    profileData = json.dumps(profileData)
                    res = Connection().newProfile(profileData)
                    res = json.loads(res.text)
                    bullyData["user"]=res["id"]
                    bullyData = json.dumps(bullyData)
                    res = Connection().newBully(bullyData)
                else:
                    res = json.loads(res.text)
                    bullyData["user"]=res["id"]
                    bullyData = json.dumps(bullyData)
                    res = Connection().newBully(bullyData)
        except:
            print('************* Error fent la petició a connection *************')

    def __init__(self, tipus, paraulesClau):
        r = praw.Reddit(client_id='sJ9uTn8JAn6M9A',
                     client_secret='zqATGmAb64i-nsyEEOQXhNPBa6o',
                     user_agent='python:mamuthack/1.0.0 by atmarc99')

        for comment in r.subreddit('all').stream.comments():
            if self.counter < self.ntweets:
                self.tractar_comment(comment, paraulesClau)
            else:
                os.exit()