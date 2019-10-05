import json
import requests
import boto3

class Amazon:
    
    def __init__(self, l):
        self.comprehend = boto3.client(service_name='comprehend', region_name='eu-west-2')
        self.lang = l

    def analyze (self, text):
        sentiment = self.comprehend.detect_sentiment(Text=text, LanguageCode=self.lang)
        return sentiment