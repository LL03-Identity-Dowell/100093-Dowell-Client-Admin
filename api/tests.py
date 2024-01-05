from django.test import TestCase
from dowellconnection import dowellconnection
import json
# Create your tests here.


field1 = {"document_name":"uxlivinglabtest"}
login1 = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159",
                            "ABCDE", "fetch", field1, "nil")
r = json.loads(login1)
odata = r["data"][0]["members"]
odata["public_members"]["pending_members"] = []
update = {"members":odata}
print(r["data"][0]["members"]["public_members"]["pending_members"])
# login2 = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159",
#                             "ABCDE", "update", field1, update)