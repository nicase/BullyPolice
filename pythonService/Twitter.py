import json
import tweepy
import requests
from Amazon import Amazon
from Connection import Connection

#inicialitzem classes
a = Amazon('es')

class Twitter:
    
    ACCESS_TOKEN = '1144234221281693696-sX4DUACdnW1jKQH0GauBSmK4sAwisA'
    ACCESS_SECRET = 'BjaocHJIKIUymY9vAyMCmuuLD8lVnDsAuZG9aHEzSSD6x'
    CONSUMER_KEY = 'bPn0ZD9PGHgV5mTMnfHBGLDtX'
    CONSUMER_SECRET = 'e03zkx2SZIl0vyZrBn0Pp0gaUCW1xWjQ84vnmwW2KerXEwn8Ye'

    def __init__(self, paraulesclau):

        # Autorització
        auth = tweepy.OAuthHandler(self.CONSUMER_KEY, self.CONSUMER_SECRET)
        auth.set_access_token(self.ACCESS_TOKEN, self.ACCESS_SECRET)
        
        api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True, compression=True)

        stream_listener = StreamListener()
        stream = tweepy.Stream(auth=api.auth, listener=stream_listener)
        stream.filter(track=paraulesclau, languages=["es"])
        
class StreamListener(tweepy.StreamListener):

  def on_status(self, status):
    manage_tweet(status)
      
  def on_error(self, status_code):
    if status_code == 420:
      return False

def getText(tweet):
    text = ""
 
    if hasattr(tweet, "retweeted_status"): # Check if Retweet
        try:
            text = tweet.retweeted_status.extended_tweet["full_text"]
        except AttributeError:
            text = tweet.retweeted_status.text
    else:
        try:
            text = tweet.extended_tweet["full_text"]
        except AttributeError:
            text = tweet.text
    
    return text

def manage_tweet(tweet):
    filtre = ['soy', 'http', 'www', 'bit.ly']
    
    text = getText(tweet).lower()           
    
    # si el tweet te un link el descartem
    descartat = False

    textSplit = text.split(' ')

    for p in textSplit:
        for f in filtre:
            if p.startswith(f):
                descartat = True

    if not descartat and tweet.text[:2] != "RT":
        sentiment = a.analyze(tweet.text)
        confidence = sentiment['SentimentScore']['Negative']
        '''
        print("---------------------------------------------")
        print(sentiment['Sentiment'])
        print(sentiment['SentimentScore']['Negative'])
        print(getText(tweet.text))
        '''
        
        profileData = {
            "platform": "tw",
	        "name": str(tweet.user.screen_name),
	        "link": "https://twitter.com/" + str(tweet.user.screen_name)
        }

        bullyData = {
            "platform": "tw",
	        "language": "es",
	        "user": None,
	        "data": getText(tweet),
            "index": confidence,
            "link": "https://twitter.com/" + str(tweet.user.screen_name) + "/status/" + str(tweet.id)
        }
        
        if confidence > 0.95:
            res = Connection().getProfile(str(tweet.user.screen_name))
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