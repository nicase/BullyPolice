import json
import requests
import boto3

class Amazon:
    
    def __init__(self, l):
    
        json_file = open("credentials.json", "r")
        data = json.load(json_file)

        self.comprehend = boto3.client(service_name='comprehend', region_name='eu-west-2',
        aws_access_key_id=data['aws_access_key_id'], aws_secret_access_key=data['aws_secret_access_key'])
        
        self.lang = l

    def analyze (self, text):
        sentiment = self.comprehend.detect_sentiment(Text=text, LanguageCode=self.lang)
        return sentiment

    def analyzeBatch (self, arrayTweets):
        sentiment = self.comprehend.batch_detect_sentiment(TextList=arrayTweets, 
        LanguageCode=self.lang)
        return sentiment
