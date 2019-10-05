import json
import requests
import boto3

class Amazon:
    
    def __init__(self, l):
        self.comprehend = boto3.client(service_name='comprehend', region_name='eu-west-2',
        aws_access_key_id = "AKIATMHAIAC4HQQQVMP5",
        aws_secret_access_key = "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")
        
        self.lang = l

    def analyze (self, text):
        sentiment = self.comprehend.detect_sentiment(Text=text, LanguageCode=self.lang)
        return sentiment