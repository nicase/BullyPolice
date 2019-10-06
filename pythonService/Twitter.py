import json
import tweepy
import requests
from Amazon import Amazon
from Connection import Connection

a = Amazon('en')

class Twitter:

    json_file = open("credentials.json", "r")
    data = json.load(json_file)

    ACCESS_TOKEN = data['ACCESS_TOKEN']
    ACCESS_SECRET = data['ACCESS_SECRET']
    CONSUMER_KEY = data['CONSUMER_KEY']
    CONSUMER_SECRET = data['CONSUMER_SECRET']

    def __init__(self, paraulesclau, l):
        
        #inicialitzem classes
        a = Amazon(l)
        # Autorització
        auth = tweepy.OAuthHandler(self.CONSUMER_KEY, self.CONSUMER_SECRET)
        auth.set_access_token(self.ACCESS_TOKEN, self.ACCESS_SECRET)
        
        api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True, compression=True)

        stream_listener = StreamListener()
        stream_listener.setLang(l)
        stream = tweepy.Stream(auth=api.auth, listener=stream_listener)
        stream.filter(track=paraulesclau, languages=[l])
        
class StreamListener(tweepy.StreamListener):

    language = ""

    def setLang(self, l):
        self.language = l

    def on_status(self, status):
        manage_tweet(self, status)

      
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

def manage_tweet(self, tweet):
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
        confidence = 0
        try:
            sentiment = a.analyze(tweet.text)
            confidence = sentiment['SentimentScore']['Negative']
            '''
            print("---------------------------------------------")
            print(sentiment['Sentiment'])
            print(sentiment['SentimentScore']['Negative'])
            print(getText(tweet.text))
            '''
        except:
            print("******************** Error amb amazon ********************")


        profileData = {
            "platform": "tw",
            "language": self.language,
	        "name": str(tweet.user.screen_name),
	        "link": "https://twitter.com/" + str(tweet.user.screen_name)
        }

        bullyData = {
            "platform": "tw",
	        "language": self.language,
	        "user": None,
	        "data": getText(tweet),
            "index": confidence,
            "link": "https://twitter.com/" + str(tweet.user.screen_name) + "/status/" + str(tweet.id)
        }
        
        print('.')
        print(getText(tweet))
        try:
            if confidence > 0.95:
                
                res = Connection().getProfile(str(tweet.user.screen_name))
                if len(res.text) == 2:      
                    print(getText(tweet))
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
            print("******************** Error fent post al backend ********************")
