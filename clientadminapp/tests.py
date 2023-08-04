from django.test import TestCase
import json
from dowellconnection import dowellconnection
# Create your tests here.
import random
import string

field1 = {}
login1 = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159",
                            "ABCDE", "fetch", field1, "update")
r = json.loads(login1)
# print(type(r))


# def find_other_organisation_with_value(data, target='Dowell_aavhan'):
#     if isinstance(data, dict):
#         for key, value in data.items():
#             if key == 'portpolio' and isinstance(value, list):
#                 for item in value:
#                     if find_other_organisation_with_value(item, target):
#                         return value
#             else:
#                 result = find_other_organisation_with_value(value, target)
#                 if result:
#                     return result
#     elif isinstance(data, list):
#         for item in data:
#             result = find_other_organisation_with_value(item, target)
#             if result:
#                 return result
#     elif data == target:
#         return True
#     return None






# result = find_other_organisation_with_value(r)
# print(result) 
def generate_random_string(length):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for i in range(length))

org_id = "63cf8114554bd6bedf7b13ce"
random_org_id = generate_random_string(len(org_id))
new_org = {
        "org_id": random_org_id,
        "org_name": "HR_Dowell Research","username":"RainaMary","member_type":"team_members","product":"Team Management","data_type":"Real_Data","operations_right":"Add/Edit","role":"Employment In Dowell UXLivingLab","security_layer":"None","portfolio_name":"Dowell_Raina","portfolio_code":"229801","portfolio_specification":"","portfolio_uni_code":"229801","portfolio_details":"","status":"enable"}

def get_other_organisation(document_name, documents,new_org):

    for document in documents:
        if document.get('document_name') == document_name:
            document['other_organisation'].append(new_org)
            print(document.get('other_organisation'))
            field = {"document_name": document_name}
            update = {"other_organisation":document.get('other_organisation')}
            login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159",
                                        "ABCDE", "update", field, update)
            return document.get('other_organisation')
    return None

get_other_organisation("RainaMary",r["data"],new_org)