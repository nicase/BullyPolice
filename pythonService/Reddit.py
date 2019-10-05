import praw
import requests
import requests.auth

class Reddit:

    def tractar_comment (self, comment, paraulesClau):
        print(comment.body)

    def tractar_post(self, post):
        print(post.title)
        print('-------------------------------------')

    def __init__(self, tipus):
        
        r = praw.Reddit(client_id='sJ9uTn8JAn6M9A',
                     client_secret='zqATGmAb64i-nsyEEOQXhNPBa6o',
                     user_agent='python:mamuthack/1.0.0 by atmarc99')

        if tipus == 'comments':
            for comment in r.subreddit('all').stream.comments():
                self.tractar_comment(comment)
        
        if tipus == 'posts':
            for submission in r.subreddit('all').stream.submissions():
               self.tractar_post(submission)

