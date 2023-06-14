import json
import requests
from django.shortcuts import redirect

url = 'http://100002.pythonanywhere.com/'


def dowellconnection(cluster, platform, database, collection, document, team_member_ID, function_ID, command, field,
                     update_field):
    data = json.dumps({
        "cluster": cluster,
        "platform": platform,
        "database": database,
        "collection": collection,
        "document": document,
        "team_member_ID": team_member_ID,
        "function_ID": function_ID,
        "command": command,
        "field": field,
        "update_field": update_field
    })
    headers = {'content-type': 'application/json'}
    response = requests.request('POST', url, headers=headers, data=data)
    return response.text
    if command == "fetch":
        response_data = response.json()
        return str(response_data[0])
    else:
        return response.text


def loginrequired(view_func):
    def wrapper_func(request, *args, **kwargs):
        useranme = request.session.get('username')
        if useranme is None:
            return redirect('/new')
        return view_func(request, *args, **kwargs)

    return wrapper_func


# pfm={"platformcode":"FB"}
# pfm_response=dowellconnection("mstr","bangalore","mysql","platform_master","pfm_master","97654321","ABCDE","fetch",pfm,"nil")
# print(pfm_response)

# searchstring="ObjectId"+"("+"'"+"6139bd4969b0c91866e40551"+"'"+")"
# payload = json.dumps({
#   "cluster": "login",
#   "database": "login",
#   "collection": "registration",
#   "document": "registration",
#   "team_member_ID": "10004545",
#   "command": "fetch",
#   "function_ID": "ABCDE",
#   "field": {
#     "Username":"Admin"
#   },
#   "update_field":"nil",
#   "platform": "bangalore"
# })
# headers = {
#   'Content-Type': 'application/json'
# }

# response = requests.request("POST", url, headers=headers, data=payload)
# print(response.text)

def importdata():
    url = "http://uxlivinglab.pythonanywhere.com/"
    # url = 'http://127.0.0.1:8000/'

    payload = {
        "cluster": "undefined",

        "database": "1BO2JxN8t3yCuxb5sxQxZk3rQ7qw2cztvp78S-xRMDNg",

        "collection": "index1",

        "document": "index1",

        "team_member_ID": "1182",

        "function_ID": "ABCDE",

        "command": "fetch",  # 'fetch_db_names' for getting the database nmaes

        "field": {},
        "update_field": {
            "order_nos": 21
        },
        "platform": "bangalore"
    }
    headers = {
        'Content-Type': 'application/json'
    }

    response = requests.post(url, headers=headers, json=payload)
    response = json.loads(response.text)
    return response
