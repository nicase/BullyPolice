import praw
import requests
import requests.auth
from Amazon import Amazon
from Connection import Connection
import json

a = Amazon('en')

class Reddit:

    def tractar_comment (self, comment, paraulesClau):
        self.tractar_text(comment.author.name, comment.body)

    def tractar_text(self, author, text):
        descartar = True
        confidence = 0
        try:
            res = a.analyze(text)
            print('.')
            confidence = res['SentimentScore']['Negative'] 
            if confidence > 0.95:
                descartar = False
                print(text)
                print("------------------------------------")
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
            "index": confidence
        }
        
        try:
            if not descartar:
                res = Connection().getProfile(str(author))
                if len(res.text) == 2:      
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
                print(res)
        except:
            print('************* Error fent la petició a connection *************')

    def __init__(self, tipus, paraulesClau):
        r = praw.Reddit(client_id='sJ9uTn8JAn6M9A',
                     client_secret='zqATGmAb64i-nsyEEOQXhNPBa6o',
                     user_agent='python:mamuthack/1.0.0 by atmarc99')

        for comment in r.subreddit('all').stream.comments():
            self.tractar_comment(comment, paraulesClau)