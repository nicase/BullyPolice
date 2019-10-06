import json
import tweepy
import requests
from Amazon import Amazon
from Connection import Connection

a = Amazon('en')

class Hashtag:

    json_file = open("credentials.json", "r")
    data = json.load(json_file)

    ACCESS_TOKEN = data['ACCESS_TOKEN']
    ACCESS_SECRET = data['ACCESS_SECRET']
    CONSUMER_KEY = data['CONSUMER_KEY']
    CONSUMER_SECRET = data['CONSUMER_SECRET']

    def __init__(self, d):
        
        #inicialitzem classes
        a = Amazon('en')
        # Autorització
        auth = tweepy.OAuthHandler(self.CONSUMER_KEY, self.CONSUMER_SECRET)
        auth.set_access_token(self.ACCESS_TOKEN, self.ACCESS_SECRET)
        
        api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True, compression=True)

        stream_listener = StreamListener()
        stream_listener.setData(d)
        stream = tweepy.Stream(auth=api.auth, listener=stream_listener)
        stream.filter(track=d["discover"], languages=['en'])
        
class StreamListener(tweepy.StreamListener):

    tweetsArray = []
    tweetsTextArray = []

    ntweets = 0
    counter = 0
    positive = 0
    negative = 0
    neutral = 0
    interested = ""

    def setData (self, varData):
        self.interested = varData["interested"]
        self.ntweets = varData["ntweets"]

    def on_status(self, status):
        manage_tweet(self, status)
        if self.counter == self.ntweets:
            return False

        
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

def getTweet (tweet):
    body = {
        "user": tweet.user.screen_name,
        "data": getText(tweet),
        "link": "https://twitter.com/" + str(tweet.user.screen_name) + "/status/" + str(tweet.id)
    }
    return body

def manage_tweet(self, tweet):
    
    text = getText(tweet).lower()

    self.tweetsTextArray.append(text)
    self.tweetsArray.append(tweet)

    self.counter += 1

    if len(self.tweetsTextArray) == 25:
        res = {}
        try:
            res = a.analyzeBatch(self.tweetsTextArray)
        except:
            print("***** Error amb amazon *****")

        interestedTweets = []

        for x in res["ResultList"]:
            if x["Sentiment"] == "POSITIVE":
                self.positive += 1
            elif x["Sentiment"] == "NEGATIVE":
                self.negative += 1
            elif x["Sentiment"] == "NEUTRAL":
                self.neutral += 1

            print(self.negative)

            if self.interested == "POSITIVE" and x["Sentiment"] == "POSITIVE":
                interestedTweets.append(getTweet(self.tweetsArray[x["Index"]]))
            elif self.interested == "NEUTRAL" and x["Sentiment"] == "NEUTRAL":
                interestedTweets.append(getTweet(self.tweetsArray[x["Index"]]))
            elif self.interested == "NEGATIVE" and x["Sentiment"] == "NEGATIVE":
                interestedTweets.append(getTweet(self.tweetsArray[x["Index"]]))

        body = {
            "nTweetsTotal": self.ntweets,
            "nTweetsAnalys": self.counter,
            "nPositive": self.positive,
            "nNeutral": self.neutral,
            "nNegative": self.negative,
            "tweetsInterest": interestedTweets
        }

        self.tweetsArray = []
        self.tweetsTextArray = []
        
        print("n total neg: ")
        print(body)


        '''
        try:
            requests.post("http://localhost:3001/discover", data=body, headers= {'Content-Type': 'application/json'})
        except:
            print("***** Error fent post a la api *****")
        '''