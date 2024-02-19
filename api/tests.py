from django.test import TestCase
from dowellconnection import dowellconnection
import json
import datetime
# Create your tests here.


field1 = {"username":"michael"}
field = {}
print(datetime.datetime.now())
# login1 = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159",
#                             "ABCDE", "fetch", field1, "nil")
login1 = dowellconnection("login","bangalore","login","browsers","browsers","1109","ABCDE","fetch",field,"nil")

print(datetime.datetime.now())

# r = json.loads(login1)
r = json.loads(login1)
print(r)
print(len(r))

# portfolio = r['data'][0]['portpolio']

# usernames = ["DySdjkj5Eo6d","FTy9k5G3fLIN","MR6hzClG3K6N","6jI1jb7MlaU5","y7w5tgAbt9ov","caMcVvjYIpFX","TpZ0CW0yYZx3","oo2dUkgP33Ql","Pqg0L94rgGR1","elQPO4vg6WNK","DlV9ELvyiuhQ","lnf0yfZAJUcP","bWapvLS2FppY","vB6PfMNWotx1","i3162FjLsNfx","IMTY7HA60rey","lq2vRu5B4IpF","Nrb4cmi1qDKN","ETAgwgBBxi59","i6IAtTErVCOw","YV8hwULNzIvT","HnfZqvIGbdPt","YrNF3EEuZoZB","fkxml82mwoCr","k6CFWNx86wMe","qm3gKnns6kzr","SyehtnayDjMg","mOjpIZkwdmoE","AbtkCpIWCN72","MeZULxsENxMX","6kuZ8y4i0LKu","DP6rVjWNTyAq","C71egJd8roDI","1ojNEl8Ikfh5","oXbQXnD93ObL","uaRbfDy0VeWV","IGfoeBuGiUxf","hmBITU9Tg9p4","2q8dCSC5HWBI","SSYvfLxxz5uL","eVjNGupfVhWM","n1zYWZcA8Tv5","S1MCcIGKehJz","KqQX1q8EJoSQ","WFy0FXDo3SzW","047vKA5LPURS","wXAQKa1MPzDH","5irugMrmcj2v","idGcWJZDLkgR","y2ZFC6Z1gGyw","FeDiJ4GTz0HV","fA8Q4UrNA9Rg","8233NpkwcVpu","Ev9SjV7zUA23","i7CupPQkK6Ko","6fXk0LqXVWnP","GukXujpFo6T8","Qph6RKxUNFLh"]
# for entry in portfolio:
#     if entry['member_type'] == 'public' and entry['product'] == "Workflow AI" and entry['portfolio_code']== "300":
#         entry['username'] = usernames

# # odata = r["data"][0]["members"]
# # odata["public_members"]["pending_members"] = []
# update = {"portpolio":portfolio}
# # print(r["data"][0]["members"]["public_members"]["pending_members"])
# login2 = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159",
#                             "ABCDE", "update", field1, update)



# field_n = {"session_id": "hcx2t5pfnjldk9qozc2utdvhyuyr2jd0"}
# # field_n = {"username":"Jazz3655"}

# l1 = dowellconnection("login","bangalore","login","company","company","1083","ABCDE","fetch",field_n,"nil")
# print(l1)