import json
import tweepy
import requests
from Amazon import Amazon
from Connection import Connection
import sys
import os
import datetime, time

class StreamListener(tweepy.StreamListener):

    tweetsArray = []
    tweetsTextArray = []
    interestedTweets = []

    ntweets = 0
    counter = 0
    positive = 0
    negative = 0
    neutral = 0
    interested = ""

    def destroy_process(self):
        print('close process')
        sys.exit()

    def setData (self):
        self.interested = sys.argv[3]
        self.ntweets = sys.argv[2]

    def on_status(self, status):
        manage_tweet(self, status)
        # print("counter: " + str(self.counter) + " ntweets: " + str(self.ntweets))
        
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

    print('.')

    if len(self.tweetsTextArray) == 25 or len(self.tweetsTextArray) == self.ntweets:
        res = {}
        try:
            res = a.analyzeBatch(self.tweetsTextArray)
        except:
            print("***** Error amb amazon *****")

        for x in res["ResultList"]:
            if x["Sentiment"] == "POSITIVE":
                self.positive += 1
            elif x["Sentiment"] == "NEGATIVE":
                self.negative += 1
            elif x["Sentiment"] == "NEUTRAL":
                self.neutral += 1

            if self.interested == "POSITIVE" and x["Sentiment"] == "POSITIVE":
                self.interestedTweets.append(getTweet(self.tweetsArray[x["Index"]]))
            elif self.interested == "NEUTRAL" and x["Sentiment"] == "NEUTRAL":
                self.interestedTweets.append(getTweet(self.tweetsArray[x["Index"]]))
            elif self.interested == "NEGATIVE" and x["Sentiment"] == "NEGATIVE":
                self.interestedTweets.append(getTweet(self.tweetsArray[x["Index"]]))
        
        self.tweetsArray = []
        self.tweetsTextArray = []
    
    if str(self.counter) == str(self.ntweets):

        body = {
            "nTweetsTotal": self.ntweets,
            "nTweetsAnalys": self.counter,
            "nPositive": self.positive,
            "nNeutral": self.neutral,
            "nNegative": self.negative,
            "tweetsInterest": self.interestedTweets
        }

        print("n total neg: ")
        print(body)
        
        try:
            requests.post("http://localhost:3001/discover", data=json.dumps(body), headers= {'Content-Type': 'application/json'})
        except:
            print("***** Error fent post a la api *****")

        self.destroy_process()
      

if __name__ == '__main__':
    a = Amazon('en')

    json_file = open("credentials.json", "r")
    data = json.load(json_file)

    ACCESS_TOKEN = data['ACCESS_TOKEN']
    ACCESS_SECRET = data['ACCESS_SECRET']
    CONSUMER_KEY = data['CONSUMER_KEY']
    CONSUMER_SECRET = data['CONSUMER_SECRET']

    # Autorització
    auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
    auth.set_access_token(ACCESS_TOKEN, ACCESS_SECRET)

    api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True, compression=True)

    stream_listener = StreamListener()
    stream_listener.setData()
    stream = tweepy.Stream(auth=api.auth, listener=stream_listener)

    paraulesclau = sys.argv[1]
    for x in paraulesclau:
        x = str(x).lower()

    stream.filter(track=paraulesclau, languages=['en'])

