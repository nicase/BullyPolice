# Nakima Push microservice

	
## Dev env

#### Docker:

        docker-compose up -d
        docker-compose down
        docker-compose logs -f

#### Run on local

Execute:

	npm run dev:local

or:

	npm run dev


## Endpoints

The collection of endpoints can be found in the next Postman link:

https://www.getpostman.com/collections/7576b63bb8c0ee2e94d3


## FCM Config

Config the firebase-service-account.json with this format:

    {
        "type": "service_account",
        "project_id": "<PROJECT_ID>",
        "private_key_id": "<PRIVATE_KEY_ID>",
        "private_key": "<PRIVATE_KEY>",
        "client_email": "<CLIENT_EMAIL>",
        "client_id": "<CLIENT_ID>",
        "auth_uri": "<AUTH_URI>",
        "token_uri": "<TOKEN_URI>",
        "auth_provider_x509_cert_url": "<PROVIDER_CERT_URL>",
        "client_x509_cert_url": "<CLIENT_CERT_URL>"
    }
    
This json file can also be generated from the firebase console
adding a new app to the firebase account (in 'Settings/General' section) 

For more info about how to configure the firebase admin sdk refer to:
https://firebase.google.com/docs/admin/setup


## APN Config

It is still a mistery how to configure APN account.
No man has ever crossed that line. May the gods be with you.
