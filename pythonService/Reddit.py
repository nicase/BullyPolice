import praw
import requests
import requests.auth
from Amazon import Amazon

a = Amazon('en')

class Reddit:

    def tractar_comment (self, comment, paraulesClau):
        self.tractar_text(comment.author.name, text)

    def tractar_text(self, author, text):
        descartar = True
        
        try:
            res = a.analyze(text)
            print('.')
            if res['SentimentScore']['Negative'] > 0.95:
                descartar = False
                print(text)
                print("------------------------------------")
        except:
            print('************* Error fent la petició *************')

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
        
        if confidence > 0.95:
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

    def tractar_post(self, post, paraulesClau):
        print(post.title)
        print('-------------------------------------')


    def __init__(self, tipus, paraulesClau):
        r = praw.Reddit(client_id='sJ9uTn8JAn6M9A',
                     client_secret='zqATGmAb64i-nsyEEOQXhNPBa6o',
                     user_agent='python:mamuthack/1.0.0 by atmarc99')

        if tipus == 'comments':
            for comment in r.subreddit('all').stream.comments():
                self.tractar_comment(comment, paraulesClau)
        
        if tipus == 'posts':
            for submission in r.subreddit('all').stream.submissions():
               self.tractar_post(submission, paraulesClau)

