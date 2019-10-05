import json
import tweepy
import requests

class Twitter:
    
    ACCESS_TOKEN = '1144234221281693696-sX4DUACdnW1jKQH0GauBSmK4sAwisA'
    ACCESS_SECRET = 'BjaocHJIKIUymY9vAyMCmuuLD8lVnDsAuZG9aHEzSSD6x'
    CONSUMER_KEY = 'bPn0ZD9PGHgV5mTMnfHBGLDtX'
    CONSUMER_SECRET = 'e03zkx2SZIl0vyZrBn0Pp0gaUCW1xWjQ84vnmwW2KerXEwn8Ye'

    def __init__(self):
        # Autorització
        auth = tweepy.OAuthHandler(self.CONSUMER_KEY, self.CONSUMER_SECRET)
        auth.set_access_token(self.ACCESS_TOKEN, self.ACCESS_SECRET)
        
        api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True, compression=True)
        
        paraulesclau = ['hola']

        stream_listener = StreamListener()
        stream = tweepy.Stream(auth=api.auth, listener=stream_listener)
        stream.filter(track=paraulesclau, languages=["es"])
        
class StreamListener(tweepy.StreamListener):

  def on_status(self, status):
    manage_tweet(status)
      
  def on_error(self, status_code):
    if status_code == 420:
      return False

def manage_tweet(tweet):
    print(tweet.id)