from django.test import TestCase
import json
from dowellconnection import dowellconnection
# Create your tests here.
import random
import string

def generate_random_string(length):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for i in range(length))

with open("ids.txt", "r") as f:
    ids = [line.strip() for line in f]

# ids = ["63cf8114554bd6bedf7b13ce"]
    # print(ids)
for id in ids:


    field1 = {"_id":id}
    login1 = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159",
                                "ABCDE", "fetch", field1, "update")
    r = json.loads(login1)

    var1 = r["data"][0]["portpolio"]
    org_id = r["data"][0]["_id"]
    org_name = r["data"][0]["organisations"][0]["org_name"]
    username = r["data"][0]["document_name"]
    port_code = generate_random_string(6)

    default =   {
            "org_id":org_id,
            "org_name":org_name,
            "username": [username],
            "member_type": "owner",
            "product": "all",
            "data_type": "Real_data",
            "operations_right": "Add/Edit",
            "role": "owner",
            "security_layer": "None",
            "portfolio_name": "default",
            "portfolio_code": port_code,
            "portfolio_specification": "",
            "portfolio_uni_code": "default",
            "portfolio_details": "",
            "status": "enable"
            }

    var1.append(default)
    field2 = {"_id":id}
    update2 = {"portpolio":var1}
    vv = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159",
                                "ABCDE", "update", field1, update2)
