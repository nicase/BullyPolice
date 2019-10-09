import requests

class Connection:

  def __init__ (self):
    self.URL = 'http://localhost:3001'
  
  def newProfile(self, info):
    return requests.post(self.URL + '/profile', data=info, headers={'Content-type': 'application/json'})

  def getProfile(self, info):
    return requests.get(self.URL + '/profile?name=' + info)

  def newBully(self, info):
    return requests.post(self.URL + '/bully', data=info, headers={'Content-type': 'application/json'})