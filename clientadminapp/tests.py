from django.test import TestCase
import json
from dowellconnection import dowellconnection
# Create your tests here.
import random
import string

# field1 = {}
# login1 = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159",
#                             "ABCDE", "fetch", field1, "update")
# r = json.loads(login1)
# print(r["data"])
# print((len(r["data"])))


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
        "org_name": "HR_Dowell Research","username":"ayeshakhalil432","member_type":"team_members","product":"Team Management","data_type":"Real_Data","operations_right":"Add/Edit","role":"Flutter Flow Developers ","security_layer":"None","portfolio_name":"Dowell Ayesha","portfolio_code":"748473","portfolio_specification":"","portfolio_uni_code":"748473","portfolio_details":"","status":"enable"}

def get_other_organisation(document_name, documents,new_org):

    for document in documents:
        if document.get('document_name') == document_name:
            document['other_organisation'].append(new_org)
            print(document.get('other_organisation'))
            field = {"document_name": document_name}
            update = {"other_organisation":document.get('other_organisation')}
            # login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159",
            #                             "ABCDE", "update", field, update)
            return document.get('other_organisation')
    return None

# get_other_organisation("ayeshakhalil432",r["data"],new_org)

product =     {
      "product_name": "Dowell Wallet",
      "product_logo": "https://100093.pythonanywhere.com/media/productlogos/Livinglab.png",
      "product_link": "https://ll04-finance-dowell.github.io/100088-dowellwallet/#/login",
      "product_status": "none",
      "team_members_status": "enable",
      "users_status": "disable",
      "public_status": "disable",
      "paid_members": [],
      "unpaid_members": []
    }

# f = {}
# l1 = dowellconnection("login", "bangalore", "login", "prod_mem", "prod_mem", "100014001",
#                             "ABCDE", "fetch", f, "update")
dowellconnection("login", "bangalore", "login", "prod_mem", "prod_mem", "100014001", "ABCDE",
                            "insert", product, "nil")
# # print(json.loads(l1))
# l1= json.loads(l1)
# l1["data"].append(product)
# print(l1)

# # l2 = dowellconnection("login", "bangalore", "login", "prod_mem", "prod_mem", "100014001",
# #                             "ABCDE", "fetch", f, "update")


# dowellconnection("login", "bangalore", "login", "prod_mem", "prod_mem", "100014001", "ABCDE",
#                             "insert", product, "nil")



# def find_username_position(lst):
#     """
#     Find the index position of dictionaries that have a key named "username" 
#     with a value of "Aderonke" in a given list of dictionaries.

#     Args:
#     - lst (list): A list of dictionaries to search.

#     Returns:
#     - None
#     """
#     for index, dictionary in enumerate(lst):
#         if dictionary.get("username") == "Aderonke":
#             print(f"Found 'Aderonke' at index position: {index}")


# find_username_position(r["data"][0]["portpolio"])


# file_name = "ids.txt"

# # Extracting the _id and saving to the file
# with open(file_name, "w") as f:
#     for entry in r["data"]:
#         if "_id" in entry:
#             f.write(entry["_id"] + "\n")

# print(f"IDs have been saved to {file_name}")

# port_code = generate_random_string(6)

# default =   {
#         "org_id":"642ae6478f6fd9e0cc884769",
#         "org_name":"Testing_400413",
#           "username": "Testing_400413",
#           "member_type": "owner",
#           "product": "all",
#           "data_type": "Real_data",
#           "operations_right": "Add/Edit",
#           "role": "owner",
#           "security_layer": "None",
#           "portfolio_name": "default",
#           "portfolio_code": port_code,
#           "portfolio_specification": "",
#           "portfolio_uni_code": "default",
#           "portfolio_details": "",
#           "status": "enable"
#         }


# # Extract IDs from ids.txt
# with open("ids.txt", "r") as f:
#     ids = [line.strip() for line in f]

# # Check each dictionary in data. If its _id matches an id from ids.txt, append the default dictionary to its portpolio
# for entry in r["data"]:
#     if entry["_id"] in ids:
#         entry["portpolio"].append(default)


