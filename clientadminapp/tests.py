from django.test import TestCase
import json
from dowellconnection import dowellconnection
# Create your tests here.

# field1 = {}
# login1 = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159",
#                             "ABCDE", "fetch", field1, "update")
# r = json.loads(login1)
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