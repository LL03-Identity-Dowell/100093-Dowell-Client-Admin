import base64
import csv

import chardet as chardet
from django.shortcuts import render, HttpResponse, redirect
from rest_framework.response import Response
from rest_framework.decorators import api_view
from clientadminapp.models import UserData, UserOrg, UserInfo, Notification, ExcelData
from clientadminapp.dowellconnection import dowellconnection, loginrequired
from clientadminapp.models import publiclink
import requests
import json
from . import passgen
from rest_framework import status
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
import pandas as pd


@api_view(["GET"])
def ProductsView(request):
    p = ["Workflow AI", "Digital Q", "Wifi QR Code", "Chat", "UX Live", "Social Media Automation", "Scales",
         "Logo Scan", "Legalzard", "Maps", "Customer Experience", "Living Lab Admin", "Team Management", "Monitoring",
         "Live Stream Dashboard", "Sales Agent", "Permutation Calculator", "Customer Support Centre",
         "Secure Repositories", "Secure Data"]
    ls = []
    for i in p:
        ls.append({"product_name": i, "logo": "", "status": "enable"})
    return Response({"data": ls})


@api_view(["POST"])
def sessionView(request):
    mdata = request.data
    s = mdata["session_id"]
    ro1 = UserData.objects.all().filter(sessionid=s)
    # return HttpResponse(f"hi{ro1}")
    for i in ro1:
        r = i.alldata
        rj = json.loads(r)
    try:
        if rj:
            return Response(rj)
    except:
        return Response({"msg": "your data not found in database try again with session_id"})


@api_view(["POST"])
def OrgsView(request):
    mdata = request.data
    org = mdata["org"]
    sec = mdata["scode"]
    # return Response({"msg":"ok"})
    if sec == "DoWell$0987":

        ro1 = UserOrg.objects.all().filter(username=org)
        if ro1:
            for i in ro1:
                r = i.org
                rj = json.loads(r)
            return Response(rj)
        else:
            return Response({"message": "this org details not found"})


@api_view(["POST"])
def OrgView(request):
    mdata = request.data
    un = mdata["org_id"]
    ro1 = UserOrg.objects.all()
    for i in ro1:
        rl = i.org
        rol = json.loads(rl)
        for ii in rol:
            try:
                if ii["_id"] == un:
                    rj = rol
            except:
                pass
    members = rj["members"]
    portl = rj["portpolio"]
    return Response({"members": members, "portfolio": portl})


@api_view(["POST"])
def PublicLinkUpdate(request):
    mdata = request.data
    qrid = mdata["qrid"]
    org = mdata["org_name"]
    product = mdata["product"]
    ro1 = publiclink.objects.filter(qrcodeid=qrid, org=org)  # .update(productstatus="used",product=product)
    if ro1:
        for i in ro1:
            if i.productstatus == "used":
                return Response({"message": "this link already used"})
            else:
                obj = publiclink.objects.get(qrcodeid=qrid)
                obj.productstatus = "used"
                obj.product = product
                obj.save()
                return Response({"message": "update successfully"})
    else:
        # return Response({"message":"something wrong"})
        return Response({"message": "pl check qrid"})


@api_view(["POST"])
def updateOrg(request):
    odata = request.data
    try:
        username = odata["username"]
        org_name = odata["orgname"]
        org_address = odata["orgaddress"]
        org_zip = odata["orgzipcode"]
        org_city = odata["orgcity"]
        org_country = odata["orgcountry"]
        org_latitude = odata["orglatitude"]
        org_longitude = odata["orglongitude"]
    except:
        return Response({"msg": "error in request body"})

    field = {"document_name": username}
    l1 = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE", "fetch",
                          field, "nil")
    l1 = json.loads(l1)
    org = []
    organisation = l1["data"][0]["organisations"][0]
    organisation["org_name"] = org_name
    organisation["org_address"] = org_address
    organisation["org_zip"] = org_zip
    organisation["org_city"] = org_city
    organisation["org_country"] = org_country
    organisation["org_latitude"] = org_latitude
    organisation["org_longitude"] = org_longitude
    org.append(organisation)
    field1 = {"document_name": username}
    update_field = {"organisations": org}
    l1 = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE", "update",
                          field1, update_field)
    l1 = json.loads(l1)
    return Response({"msg": "updated successfully."})


# @api_view(["POST"])
# def getProduct(request):
#     username = request.data.get("username")
#     if username == "uxliveadmin":
#         field= {}
#         l1=product=dowellconnection("login","bangalore","login","prod_mem","prod_mem","100014001","ABCDE","fetch",field,"nil")
#         l1 = json.loads(l1)
#         products = l1["data"][0]["products"]
#         return Response({"products":products})
#     else:
#         return Response({"message":"Access Denied"})

@api_view(["POST"])
def getProduct(request):
    username = request.data.get("username")
    if username:
        if all(key in request.data for key in ["product", "owners", "team members", "users", "public"]):
            # All required keys are present in the request body
            product_name = request.data["product"]
            fetch_field = {}
            fetch = dowellconnection("login", "bangalore", "login", "prod_mem", "prod_mem", "100014001", "ABCDE",
                                     "fetch", fetch_field, "nil")
            a = json.loads(fetch)
            # return Response({"message": a})
            for product in a["data"][0]["products"]:
                if product["product_name"] == product_name:
                    product.update({
                        "owners": request.data["owners"],
                        "team members": request.data["team members"],
                        "users": request.data["users"],
                        "public": request.data["public"]
                    })
                    field = {"_id": "6453edc48ce736847236e6ca"}
                    update = {"products": a["data"][0]["products"]}
                    dowellconnection("login", "bangalore", "login", "prod_mem", "prod_mem", "100014001", "ABCDE",
                                     "update", field, update)
                    return Response({"message": "product updated successfully"})
            # return Response({"message": "product not found"})

            return Response({"message": "Successfully Updated"})
        else:
            # Only username is present in the request body
            field = {}
            l1 = product = dowellconnection("login", "bangalore", "login", "prod_mem", "prod_mem", "100014001", "ABCDE",
                                            "fetch", field, "nil")
            l2 = json.loads(l1)
            # return Response({"Msg":"ok"})
            products = l2["data"]
            return Response({"products": products})
    else:
        # No keys are present in the request body
        return Response({"message": "Access Denied"})


@api_view(["POST"])
def GetDocumentProducts(request):
    odata = request.data
    r1 = []
    if "username" in odata.keys():
        org = odata["username"]
        print("first")
        username = odata["username"]
        field1 = {"document_name": org}
        login1 = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                  "fetch", field1, "update")
        r = json.loads(login1)
        response = r["data"][0]["products"]

        # for p in r["data"][0]["products"]:
        #     if port in p["portfolio_name"]:
        #         r1.append(p)
        return Response({"products": response})

    else:
        return Response({"message": "Please provide username in body"})

    return Response({"products": response})


@api_view(["POST"])
def portfolioview(request):
    odata = request.data
    session = odata["ses sion_id"]
    orl = odata["org_name"]
    portf = odata["portfolio"]
    user = odata["username"]
    product = odata["product"]
    url = "https://100014.pythonanywhere.com/api/userinfo/"
    resp = requests.post(url, data={"session_id": session})
    try:
        userinfo = json.loads(resp.text)
    except:
        return Response({"msg": "updated successfully."})
    mydict = {}
    mydict["userinfo"] = userinfo["userinfo"]
    # ro=UserInfo.objects.all().filter(username=user)
    # ro1=UserOrg.objects.all().filter(username=user)
    if orl == user:
        lrst = []
        field = {"document_name": user}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "fetch", field, "nil")
        resp = json.loads(login)
        lrf = resp["data"][0]
        for lis in lrf["portpolio"]:
            if lis["portfolio_name"] == portf:
                mydict["portfolio_info"] = [lis]
            if lis["product"] == product:
                lrst.append(lis)
        mydict["portfolio_info"][0]["org_id"] = lrf["_id"]
        mydict["portfolio_info"][0]["owner_name"] = lrf["document_name"]
        mydict["portfolio_info"][0]["org_name"] = lrf["document_name"]
        mydict["selected_product"] = {"product_id": 1, "product_name": product, "platformpermissionproduct": [
            {"type": "member", "operational_rights": ["view", "add", "edit", "delete"], "role": "admin"}],
                                      "platformpermissiondata": ["real", "learning", "testing", "archived"],
                                      "orgid": lrf["_id"], "orglogo": "", "ownerid": "", "userportfolio": lrst,
                                      "payment_status": "unpaid"}
        obj, created = UserData.objects.update_or_create(username=user, sessionid=session,
                                                         defaults={'alldata': json.dumps(mydict)})
        return Response(mydict)

    field = {"document_name": orl}
    login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE", "fetch",
                             field, "nil")
    resp = json.loads(login)
    ss = resp["data"][0]
    rr = ss["other_organisation"]
    rr1 = ss["organisations"]
    # return HttpResponse(f'{rr}<br><br>{rr1}')
    for iii in rr:
        if iii["org_name"] == orl:
            try:
                if iii["portfolio_name"] == portf:
                    mydict["portfolio_info"] = [iii]

                else:
                    pass
            except:
                pass
    try:
        selected_role = mydict["portfolio_info"]["role"]
    except:
        pass
    level1 = {}
    level2 = {}
    level3 = {}
    level4 = {}
    level5 = {}
    try:
        for items in lrf["roles"]:
            if selected_role == items["role_name"]:
                if items["level1_item"]:
                    level1["level1name"] = lrf["organisations"][0]["level1"]["level_name"]
                    level1["level1items"] = lrf["organisations"][0]["level1"]["items"]
                if items["level2_item"]:
                    level2["level1name"] = lrf["organisations"][0]["level2"]["level_name"]
                    level2["level1items"] = lrf["organisations"][0]["level2"]["items"]
                if items["level3_item"]:
                    level2["level3name"] = lrf["organisations"][0]["level3"]["level_name"]
                    level2["level3items"] = lrf["organisations"][0]["level3"]["items"]
                if items["level4_item"]:
                    level2["level4name"] = lrf["organisations"][0]["level4"]["level_name"]
                    level2["level4items"] = lrf["organisations"][0]["level4"]["items"]
                if items["level5_item"]:
                    level2["level5name"] = lrf["organisations"][0]["level5"]["level_name"]
                    level2["level5items"] = lrf["organisations"][0]["level5"]["items"]
    except:
        pass
    if "portfolio_info" not in mydict:
        # return HttpResponse(f'{rr1}')
        mydict["portfolio_info"] = [ss["portpolio"][0]]
    productport = []
    for product2 in lrf["portpolio"]:
        if product == product2["product"]:
            productport.append(product2)

    mydict["organisations"] = [{"orgname": lrf["document_name"], "orgowner": lrf["document_name"]}]
    mydict["selected_product"] = {"product_id": 1, "product_name": product, "platformpermissionproduct": [
        {"type": "member", "operational_rights": ["view", "add", "edit", "delete"], "role": "admin"}],
                                  "platformpermissiondata": ["real", "learning", "testing", "archived"],
                                  "orgid": lrf["_id"], "orglogo": "", "ownerid": "", "userportfolio": productport,
                                  "payment_status": "unpaid"}
    mydict["selected_portfoliolevel"] = level1
    mydict["selected_portfolioleve2"] = level2
    mydict["selected_portfolioleve3"] = level3
    mydict["selected_portfolioleve4"] = level4
    mydict["selected_portfolioleve5"] = level5
    mydict["portfolio_info"][0]["org_id"] = lrf["_id"]
    mydict["portfolio_info"][0]["owner_name"] = lrf["document_name"]
    mydict["portfolio_info"][0]["org_name"] = lrf["document_name"]
    obj, created = UserData.objects.update_or_create(username=user, sessionid=session,
                                                     defaults={'alldata': json.dumps(mydict)})
    return Response(mydict)


@api_view(['POST'])
def update_products_client_admin(request):
    # List of allowed products
    allowed_products = [
        "Workflow AI",
        "Digital Queue",
        "Wifi QR Code",
        "Living Lab Chat",
        "User Experience Live",
        "Social Media Automation",
        "Living Lab Scales",
        "Logo Scan",
        "Legalzard",
        "Living Lab Maps",
        "Customer Experience",
        "Living Lab Admin",
        "Team Management",
        "Living Lab Monitoring",
        "Live Stream Dashboard",
        "Sales Agent",
        "Permutation Calculator",
        "Dowell Customer Support Centre",
        "Secure Repositories",
        "Secure Data"
    ]

    # Get the members list from the request body
    members = request.data.get('members', [])

    # Initialize a list to store the updated dictionaries for each member
    updated_members = []

    for member in members:
        field = {"document_name": member}
        login = dowellconnection(
            "login", "bangalore", "login", "client_admin", "client_admin",
            "1159", "ABCDE", "fetch", field, "nil"
        )
        resp = json.loads(login)
        a = resp["data"][0]

        # Get the product data from the request body
        product_name = request.data.get('product', None)
        if product_name not in allowed_products:
            return Response({"error": "Invalid product name"}, status=status.HTTP_400_BAD_REQUEST)

        external_api_url = "http://100093.pythonanywhere.com/api/getproducts/"
        external_api_payload = {"username": "uxliveadmin"}
        external_api_response = requests.post(external_api_url, json=external_api_payload)
        external_api_data = external_api_response.json()
        if product_name:
            # Validate the keys
            valid_keys = [
                'product_name', 'payment_status', 'product_status',
                'invite_users', 'invite_team_members', 'invite_public',
                'product_url', 'product_logo'
            ]

            # Filter out non-dictionary elements from 'a['products']'
            a['products'] = [p for p in a['products'] if isinstance(p, dict)]

            # Find the existing product in 'a' with the same 'product_name'
            existing_product = next(
                (p for p in a['products'] if p['product_name'] == product_name), None
            )

            if not existing_product:
                # Create a new product with the given 'product_name'
                new_product = {key: None for key in valid_keys}
                new_product['product_name'] = product_name

                # Add the new product to 'a'
                a['products'].append(new_product)
                existing_product = new_product

            # Update the existing product with the request data
            for key in valid_keys:
                if key in request.data:
                    existing_product[key] = request.data[key]
            external_product = next(
                (p for p in external_api_data['products'] if p['product_name'] == product_name), None
            )

            if external_product:
                payment_status = request.data.get('payment_status', None)
                product_status = request.data.get('product_status', None)
                invite_users = request.data.get('invite_users', "")
                invite_team_members = request.data.get('invite_team_members', "")
                invite_public = request.data.get('invite_public', "")
                # external_product.update(
                #     {
                #         'invite_users': invite_users,
                #         'invite_team_members': invite_team_members,
                #         'invite_public': invite_public,
                #     }
                # )
                if payment_status == "paid":
                    member_list = external_product['paid_members']
                elif payment_status == "unpaid":
                    member_list = external_product['unpaid_members']
                elif payment_status == "all":
                    member_list = external_product['members']


                else:
                    member_list = None

                # Find the index of the product you're updating
                external_product_index = next((index for (index, d) in enumerate(external_api_data['products']) if
                                               d['product_name'] == product_name), None)

                if member_list is not None:
                    for member in member_list:
                        if member['username'] in members:
                            member['status'] = product_status
                            # Update each member with new invitation fields
                            member.update(
                                {
                                    'invite_users': invite_users,
                                    'invite_team_members': invite_team_members,
                                    'invite_public': invite_public,
                                }
                            )

                    # Check if members from the request are in the member_list
                    for member_username in members:
                        if not any(member['username'] == member_username for member in member_list):
                            # If member not in the member_list, add it
                            member_data = {
                                'username': member_username,
                                'owner': member_username,
                                'first_name': member_username,
                                'status': product_status,
                                'invite_users': invite_users,
                                'invite_team_members': invite_team_members,
                                'invite_public': invite_public,
                            }
                            member_list.append(member_data)

        # Remove any strings present in the list "products"
        a['products'] = [product for product in a['products'] if isinstance(product, dict)]
        print(member_list)
        # Add the updated dictionary to the updated_members list
        updated_members.append(a)
        field = {"document_name": member}
        update = {"products": updated_members[0]["products"]}
        # dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE", "update", field, update)
        field1 = {"_id": "6453edc48ce736847236e6ca"}

        update1 = {"products": external_api_data["products"]}
        # dowellconnection("login","bangalore","login","prod_mem","prod_mem","100014001","ABCDE","update",field1,update1)

    # Return the updated dictionaries for each member
    return Response({"message": "Successfully Updated"})


@api_view(['POST'])
def product_control_platform_admin(request):
    # Extract required parameters from the request data
    product_name = request.data.get('product')
    owners = request.data.get('owners')
    team_members = request.data.get('team_members')
    users = request.data.get('users')
    public = request.data.get('public')

    # Validate the required parameters
    if not product_name or owners is None or team_members is None or users is None or public is None:
        return Response({'message': 'Missing required parameters'}, status=status.HTTP_400_BAD_REQUEST)

    field = {"product_name": product_name}
    update = {"product_status": owners,
              "team_members_status": team_members,
              "users_status": users,
              "public_status": public}
    dowellconnection("login", "bangalore", "login", "prod_mem", "prod_mem", "100014001", "ABCDE", "update", field,
                     update)

    # dowellconnection("login","bangalore","login","prod_mem","prod_mem","100014001","ABCDE","update",field,update)
    return Response({'message': f'Product {product_name} updated successfully'}, status=status.HTTP_200_OK)

    # else:
    #     # If the other API returned an error, return an error
    #     return Response({'message': 'Error retrieving products'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def MemberControl(request):
    # Extracting the request data
    members = request.data.get('members', [])
    product_name = request.data.get('product', None)
    payment_status = request.data.get('payment_status', None)
    product_status = request.data.get('product_status', None)
    invite_users = request.data.get('invite_users', "")
    invite_team_members = request.data.get('invite_team_members', "")
    invite_public = request.data.get('invite_public', "")

    # Fetching the product data
    field = {"product_name": product_name}
    product_data = dowellconnection("login", "bangalore", "login", "prod_mem", "prod_mem", "100014001", "ABCDE",
                                    "fetch", field, "nil")
    product = json.loads(product_data)

    # Determining the list of members to update
    if payment_status == "all":
        for member in product["data"][0]["paid_members"]:
            if member["owner"] in members:
                member["status"] = product_status
                member["invite_users"] = invite_users
                member["invite_team_members"] = invite_team_members
                member["invite_public"] = invite_public
    member_list_name = "paid_members" if payment_status == "paid" else "unpaid_members"

    my_members = product["data"][0][member_list_name]

    # Updating the member data
    for member in my_members:
        if member["owner"] in members:
            member["status"] = product_status
            member["invite_users"] = invite_users
            member["invite_team_members"] = invite_team_members
            member["invite_public"] = invite_public

    # Updating the product data
    field = {"product_name": product_name}
    update = {member_list_name: my_members}
    dowellconnection("login", "bangalore", "login", "prod_mem", "prod_mem", "100014001", "ABCDE", "update", field,
                     update)
    updated_members = []
    for member in members:
        field = {"document_name": member}
        login = dowellconnection(
            "login", "bangalore", "login", "client_admin", "client_admin",
            "1159", "ABCDE", "fetch", field, "nil"
        )
        resp = json.loads(login)
        a = resp["data"][0]

        # Get the product data from the request body
        product_name = request.data.get('product', None)

        if product_name:
            # Validate the keys
            valid_keys = [
                'product', 'payment_status', 'product_status',
                'invite_users', 'invite_team_members', 'invite_public',
                'product_url', 'product_logo'
            ]

            # Filter out non-dictionary elements from 'a['products']'
            a['products'] = [p for p in a['products'] if isinstance(p, dict)]

            # Find the existing product in 'a' with the same 'product_name'
            existing_product = next(
                (p for p in a['products'] if p['product_name'] == product_name), None
            )

            if not existing_product:
                # Create a new product with the given 'product_name'
                new_product = {key: None for key in valid_keys}
                new_product['product_name'] = product_name

                # Add the new product to 'a'
                a['products'].append(new_product)
                existing_product = new_product

            # Update the existing product with the request data
            for key in valid_keys:
                if key in request.data:
                    existing_product[key] = request.data[key]
        a['products'] = [product for product in a['products'] if isinstance(product, dict)]
        # Add the updated dictionary to the updated_members list
        updated_members.append(a)
        field = {"document_name": member}
        update = {"products": updated_members[0]["products"]}
        # return Response(update)
        dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE", "update",
                         field, update)
    return Response({"message": "Successfully Updated"})


@api_view(['POST'])
def filter_portfolio(request):
    username = request.data.get('username', None)
    product = request.data.get('product', None)

    # Check if username and product are provided
    if not username or not product:
        return Response({"detail": "Fields 'username' and 'product' are required."}, status=400)

    field = {"document_name": username}
    login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE", "fetch",
                             field, "nil")
    r = json.loads(login)

    # Check if the response has data
    if "data" not in r or not r["data"]:
        return Response({"detail": "No data found for the user."}, status=404)

    portfolio = r["data"][0]["portpolio"]
    org_name = r["data"][0]["organisations"][0]["org_name"]

    filtered_portfolio = [
        {**entry, 'org_name': org_name}
        for entry in portfolio
        if username in entry["username"] or "owner" in entry["username"] and product == entry["product"]
    ]

    # Fetching other_organisations and filtering it
    other_organisations = r["data"][0]["other_organisation"]
    filtered_other_organisations = [
        org for org in other_organisations
        if org.get("status") == "enable" and org.get("username") == username and org.get("product") == product
    ]

    return Response(filtered_portfolio + filtered_other_organisations)


@api_view(['POST'])
def settings(request):
    if request.method == 'POST':
        if len(request.data) == 1 and 'username' in request.data:
            username = request.data.get('username')
            field_c = {"document_name": username}
            login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                     "fetch", field_c, "nil")
            resp = json.loads(login)
            product_list = resp["data"][0]["products"]
            admin_id = resp["data"][0]["_id"]
            field = {"admin_id": admin_id}
            forg = dowellconnection("login", "bangalore", "login", "login_settings", "login_settings", "1202001",
                                    "ABCDE",
                                    "find", field, "nil")
            settings_res = json.loads(forg)
            return Response(settings_res, status=HTTP_200_OK)
        username = request.data.get("username")
        field_c = {"document_name": username}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "fetch", field_c, "nil")
        resp = json.loads(login)
        product_list = resp["data"][0]["products"]
        admin_id = resp["data"][0]["_id"]
        field = {"admin_id": admin_id}

        if product_list and isinstance(product_list[0], dict):
            # iterate over the product list
            for item in product_list:
                # check if product_name matches the product
                if item['product_name'] == request.data.get('product'):
                    # update the product_status
                    item['product_status'] = request.data.get('status')
                    break
        update_products = {"products": product_list}
        dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE", "update",
                         field, update_products)
        field_l = {"admin_id": admin_id}
        update = {}  # start with an empty dictionary

        if request.data.get('selected_workspace'):
            update["default_org"] = request.data.get('selected_workspace')
        if request.data.get('timelimit_member'):
            update["maxtime_member"] = request.data.get('timelimit_member')
        if request.data.get('timelimit_users'):
            update["maxtime_user"] = request.data.get('timelimit_users')
        if request.data.get('selected_language'):
            update["default_language"] = request.data.get('selected_language')
        if request.data.get('minimum_speed'):
            update["internet_min_speed"] = request.data.get('minimum_speed')
        if request.data.get('mandatory_sections'):
            update["mandatory_sections"] = request.data.get('mandatory_sections')
        if request.data.get('updated_product') and request.data.get('plans'):
            product_plan = {
                "product_name": request.data.get('updated_product'),
                "plans": request.data.get('plans')}
            update["product_plan"] = [product_plan]
        if request.data.get('time_limit_disconnect'):
            update["disconn_idle"] = request.data.get('time_limit_disconnect')
        if request.data.get('time_limit_connect'):
            update["permit_to_connect"] = request.data.get('time_limit_connect')
        if request.data.get('permitted_attempts'):
            update["no_of_conn"] = request.data.get('permitted_attempts')
        if request.data.get('admin_process') and request.data.get('operational_rights') and request.data.get(
                'portfolio_list'):
            process_portfolio = {
                "process": request.data.get('admin_process'),
                "rights": request.data.get('operational_rights'),
                "portfolios": request.data.get('portfolio_list')
            }
            update["processes_to_portfolio"] = [process_portfolio]
        if request.data.get('notifications') == "Chat":
            method = request.data.get('methods')
            update["chat_method"] = method
        if request.data.get('notifications') == "UX Living Lab":
            method = request.data.get('methods')
            update["uxlivinglab_method"] = method
        if request.data.get('colour_patterns'):
            update["color_scheme"] = request.data.get('colour_patterns')
        dowellconnection("login", "bangalore", "login", "login_settings", "login_settings", "1202001", "ABCDE",
                         "update", field_l, update)

        return Response(update, status=HTTP_200_OK)


@api_view(['POST'])
def workspace_name(request):
    if request.method == 'POST':
        username = request.data.get("username")
        field_c = {"document_name": username}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "fetch", field_c, "nil")
        ##########################################
        resp = json.loads(login)
        data = resp['data']

        # Organization name
        workspace_name = data[0]['organisations'][0]['org_name']

        # Other organization names
        other_workspace_names = [org['org_name'] for org in data[0]['other_organisation']]

        return Response({
            "workspace_name": workspace_name,
            "other_workspace_names": other_workspace_names
        }, status=HTTP_200_OK)


@api_view(['POST'])
def item_name(request):
    if request.method == 'POST':
        username = request.data.get("username")
        level = request.data.get('level')
        item_status = request.data.get('status')
        field_c = {"document_name": username}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "fetch", field_c, "nil")
        ##########################################

        resp = json.loads(login)

        item_names = [item["item_name"] for item in resp["data"][0]["organisations"][0][level]["items"] if
                      item["status"] == item_status]

        return Response({
            "item_names": item_names
        }, status=HTTP_200_OK)


@api_view(['POST'])
def create_item(request):
    if request.method == 'POST':
        username = request.data.get("username")
        level = request.data.get("level")
        item_name = request.data.get("item_name")
        item_code = request.data.get("item_code")
        item_spec = request.data.get("item_spec")
        item_unicode = request.data.get("item_unicode")
        item_details = request.data.get("item_details")
        item_barcode = request.data.get("item_barcode")
        item_image1 = request.data.get("item_image1")
        item_image2 = request.data.get("item_image2")
        field = {"document_name": username}
        userorg = UserOrg.objects.all().filter(username=username)
        for i in userorg:
            o = i.org
            odata = json.loads(o)
        org = odata["organisations"]
        for i_name in org[0][level]["items"]:
            if item_code in i_name['item_code']:
                return Response({"error": "Item Code must be unique"}, status=HTTP_400_BAD_REQUEST)
        org[0][level]["items"].append(
            {"item_name": item_name, "item_code": item_code, "item_details": item_details,
             "item_universal_code": item_unicode,
             "item_specification": item_spec, "item_barcode": item_barcode, "item_image1": item_image1,
             "item_image2": item_image2,
             "status": "enable"})
        update = {"organisations": org}
        dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                         "update", field, update)
        odata["organisations"] = org
        UserOrg.objects.update_or_create(username=username, defaults={'org': json.dumps(odata)})
        return Response({"success": "Item created successfully"}, status=HTTP_200_OK)


@api_view(['POST'])
def get_data(request):
    if request.method == 'POST':
        username = request.data.get("username")
        field_c = {"document_name": username}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "fetch", field_c, "nil")
        ##########################################
        resp = json.loads(login)
        data = resp['data']

        return Response(
            data
            , status=HTTP_200_OK)


@api_view(['POST'])
def create_portfolio(request):
    if request.method == 'POST':
        username = request.data.get("username")
        presentorg = request.data.get("presentorg")
        member_type = request.data.get('member_type')
        member = request.data.get('member')
        product = request.data.get('product')
        data_type = request.data.get('data_type')
        op_rights = request.data.get('op_rights')
        role = request.data.get('role')
        portfolio_name = request.data.get('portfolio_name')
        portfolio_code = request.data.get('portfolio_code')
        portfolio_spec = request.data.get('portfolio_spec')
        portfolio_u_code = request.data.get('portfolio_u_code')
        portfolio_det = request.data.get('portfolio_det')
        try:
            user_org = UserOrg.objects.get(username=username)
            org_dict = json.loads(user_org.org)
            for portfolio in org_dict.get('portpolio', []):
                if 'portfolio_code' in portfolio and portfolio['portfolio_code'] == portfolio_code:
                    return JsonResponse({"resp": "Portfolio code already exists for this user.Try something else."})
            # If no match is found, continue processing the form...
        except UserOrg.DoesNotExist:
            return JsonResponse({"error": "User does not exist."}, status=404)
        lsmem = eval(member)
        response_data = {"username": lsmem, "member_type": member_type, "product": product, "data_type": data_type,
                         "operations_right": op_rights, "role": role, "security_layer": "None",
                         "portfolio_name": portfolio_name, "portfolio_code": portfolio_code,
                         "portfolio_specification": portfolio_spec, "portfolio_uni_code": portfolio_u_code,
                         "portfolio_details": portfolio_det, "status": "enable"}
        userorg = UserOrg.objects.all().filter(username=username)
        for i in userorg:
            o = i.org
            odata = json.loads(o)
        ortname = odata["document_name"]
        orgid = odata["_id"]
        portls = odata["portpolio"]
        for portcheck in portls:
            if portcheck["portfolio_name"] == portfolio:
                return JsonResponse({"resp": f'{portfolio_name} already exist'})

        odata["portpolio"].append(response_data)

        # return JsonResponse({"resp":f'{portls} successfully created'})
        if "owner" or "team_member" in member_type:
            typemem = "team_members"
        elif "user" in member_type:
            typemem = "guest_members"
        if member_type == "public":
            try:
                orl = publiclink.objects.all().filter(username=username)
                for l in orl:
                    link_o = l.link
                # return JsonResponse({"resp" : link_o })
                link_o = json.loads(link_o)
                for i in link_o:

                    if i["qrcodeid"] in lsmem:
                        i["portfolio_name"] = portfolio_name
                orl.update(link=json.dumps(link_o))
                for mem in lsmem:
                    odata["members"]["public_members"]["pending_members"].append(
                        {"name": mem, "portfolio_name": portfolio_name, "product": product, "status": "unused",
                         "link": f"https://100014.pythonanywhere.com/?members=all&username=&owner_name{username}=&org_name={presentorg}&type=public&code=masterlink&product={product}&data_type={data_type}&operations_right={op_rights}&role={role}&portfolio_name={portfolio_name}&portfolio_code={portfolio_code}&portfolio_specification={portfolio_spec}&portfolio_uni_code={portfolio_u_code}&portfolio_details={portfolio_det}&status=enable"})

                master_link = f"https://100014.pythonanywhere.com/?members=all&username=&owner_name{username}=&org_name={presentorg}&type=public&code=masterlink&product={product}&data_type={data_type}&operations_right={op_rights}&role={role}&portfolio_name={portfolio_name}&portfolio_code={portfolio_code}&portfolio_specification={portfolio_spec}&portfolio_uni_code={portfolio_u_code}&portfolio_details={portfolio_det}&status=enable"
                memberpublic = odata["members"]
                obj, created = UserOrg.objects.update_or_create(username=username, defaults={'org': json.dumps(odata)})
                odata_port = odata["portpolio"]
                odata_port.append(
                    {"username": lsmem, "member_type": member_type, "product": product, "data_type": data_type,
                     "operations_right": op_rights, "role": role, "portfolio_name": portfolio_name,
                     "portfolio_code": portfolio_code, "portfolio_specification": portfolio_spec,
                     "portfolio_uni_code": portfolio_u_code, "portfolio_details": portfolio_det, "status": "enable"})

                field = {"document_name": username}
                update = {"portpolio": odata_port, "members": memberpublic}
                login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                         "update", field, update)
                # return JsonResponse({"resp":f"{memberpublic}"})

                return Response(
                    {"success": f'{portfolio_name} successfully created',
                     "masterlink": f"your masterlink is {master_link}"}, status=HTTP_200_OK)
            except:
                return Response({"error": "Error while creating public members"})

        for imem in odata["members"][typemem]["accept_members"]:
            if imem["name"] in lsmem:
                imem["portfolio_name"] = "created"

        field = {"document_name": username}
        obj, created = UserOrg.objects.update_or_create(username=username, defaults={'org': json.dumps(odata)})
        update = {"portpolio": odata["portpolio"], "members": odata["members"]}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "update", field, update)

        for li in lsmem:
            field1 = {"document_name": li}
            login1 = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                      "fetch", field1, "update")
            r = json.loads(login1)
            try:
                lo = r["data"][0]["other_organisation"]

                lo.append({"org_id": orgid, "org_name": ortname, "username": li, "member_type": member_type,
                           "product": product, "data_type": data_type, "operations_right": op_rights, "role": role,
                           "security_layer": "None", "portfolio_name": portfolio_name, "portfolio_code": portfolio_code,
                           "portfolio_specification": portfolio_spec, "portfolio_uni_code": portfolio_u_code,
                           "portfolio_details": portfolio_det, "status": "enable"})

                field2 = {"document_name": li}
                update = {"other_organisation": lo}
                login2 = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159",
                                          "ABCDE", "update", field2, update)
            except:
                pass
        return Response({"success": f'{portfolio_name} successfully created'}, status=HTTP_200_OK)


@api_view(['POST'])
def create_role(request):
    if request.method == 'POST':
        username = request.data.get("username")
        level1 = request.data.get('level1_item')
        level2 = request.data.get('level2_item')
        level3 = request.data.get('level3_item')
        level4 = request.data.get('level4_item')
        level5 = request.data.get('level5_item')
        security = request.data.get('security_layer')
        role_name = request.data.get('role_name')
        role_code = request.data.get('role_code')
        role_spec = request.data.get('role_spec')
        roleucode = request.data.get('role_u_code')
        role_det = request.data.get('role_det')
        required_fields = [username, security, role_name, role_code]
        for field in required_fields:
            if field is None:
                return Response({"error": "Please ensure data for all required fields are present"},
                                status=HTTP_400_BAD_REQUEST)
        response_data = {"level1_item": level1, "level2_item": level2, "level3_item": level3,
                         "level4_item": level4, "level5_item": level5, "security_layer": security,
                         "role_name": role_name, "role_code": role_code, "role_details": role_det,
                         "role_uni_code": roleucode, "role_specification": role_spec, "status": "enable"}
        userorg = UserOrg.objects.all().filter(username=username)
        for i in userorg:
            o = i.org
            odata = json.loads(o)
        roles = odata["roles"]
        print(roles)
        for checkroles in roles:
            if checkroles["role_code"] == role_code:
                return Response({"error": "Role code Must Be Unique"}, status=HTTP_400_BAD_REQUEST)
        odata["roles"].append(response_data)
        rle = odata["roles"]
        obj, created = UserOrg.objects.update_or_create(username=username, defaults={'org': json.dumps(odata)})
        field = {"document_name": username}
        update = {"roles": rle}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "update", field, update)
        print(login)
        return Response({"success": f"{role_name} successfully created"}, status=HTTP_200_OK)


@api_view(['POST'])
def get_layer_data(request):
    if request.method == 'POST':
        username = request.data.get("username")
        category = request.data.get('category')
        field_c = {"document_name": username}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "fetch", field_c, "nil")
        ##########################################
        resp = json.loads(login)
        try:
            security_layers = resp["data"][0]["security_layers"]
        except:
            return Response({"error": "Please check the layer and category to ensure data is correct"},
                            status=HTTP_200_OK)

        result = {}
        for layer_number, layer_data in security_layers.items():
            category_data = layer_data[category]
            for data in category_data:
                result[data] = layer_number

        return Response(result, status=HTTP_200_OK)


@api_view(['POST'])
def update_role_status(request):
    if request.method == 'POST':
        username = request.data.get("username")
        role_code = request.data.get('role_code')
        role_status = request.data.get('role_status')
        code_status = ""  ####################### code_status is used to monitor the status of the code
        userorg = UserOrg.objects.all().filter(username=username)
        for i in userorg:
            dataorg = i.org
            dataorg1 = json.loads(dataorg)
        rot = dataorg1["roles"]
        for ir in rot:
            if ir["role_code"] == role_code:
                ir["status"] = role_status
                code_status = "success"
        if code_status != "success":
            return Response({"error": f"No role with code {role_code}"}, status=HTTP_400_BAD_REQUEST)
        dataorg1["roles"] = rot
        obj, created = UserOrg.objects.update_or_create(username=username, defaults={'org': json.dumps(dataorg1)})

        field = {"document_name": username}
        update = {"roles": rot}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "update", field, update)

        return Response({"success": f"Role with code '{role_code}' has been {role_status}d"}, status=status.HTTP_200_OK)


@api_view(['POST'])
def update_portfolio_status(request):
    if request.method == 'POST':
        username = request.data.get("username")
        portfolio_code = request.data.get('portfolio_code')
        portfolio_status = request.data.get('portfolio_status')
        code_status = ""  ####################### code_status is used to monitor the status of the code
        userorg = UserOrg.objects.all().filter(username=username)
        for i in userorg:
            dataorg = i.org
            dataorg1 = json.loads(dataorg)
        rot = dataorg1["portpolio"]
        for ir in rot:
            if ir["portfolio_code"] == portfolio_code:
                ir["status"] = portfolio_status
                code_status = "success"
        if code_status != "success":
            return Response({"error": f"No portfolio with code {portfolio_code}"}, status=HTTP_400_BAD_REQUEST)
        dataorg1["portpolio"] = rot
        obj, created = UserOrg.objects.update_or_create(username=username, defaults={'org': json.dumps(dataorg1)})
        field = {"document_name": username}
        update = {"portpolio": rot}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "update", field, update)
        return Response({"success": f"Portfolio with code '{portfolio_code}' has been {portfolio_status}d"},
                        status=status.HTTP_200_OK)


@api_view(['POST'])
def update_item_status(request):
    if request.method == 'POST':
        username = request.data.get("username")
        item_level = request.data.get('item_level')
        item_code = request.data.get('item_code')
        item_status = request.data.get('item_status')
        code_status = ""  ####################### code_status is used to monitor the status of the code
        userorg = UserOrg.objects.all().filter(username=username)
        for i in userorg:
            dataorg = i.org
            dataorg1 = json.loads(dataorg)
        lev = dataorg1["organisations"]

        for ir in lev[0][item_level]["items"]:
            if ir["item_code"] == item_code:
                ir["status"] = item_status
                code_status = "success"
        if code_status != "success":
            return Response({"error": f"No item with code {item_code}"},
                            status=HTTP_400_BAD_REQUEST)
        dataorg1["organisations"] = lev
        obj, created = UserOrg.objects.update_or_create(username=username, defaults={'org': json.dumps(dataorg1)})

        field = {"document_name": username}
        update = {"organisations": lev}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "update", field, update)
        return Response({"success": f"Item with code '{item_code}' has been {item_status}d"}, status=status.HTTP_200_OK)


@api_view(['POST'])
def save_device_layers(request):
    if request.method == 'POST':
        username = request.data.get("username")
        category = request.data.get('category')
        data = request.data.get('data')
        field = {"document_name": username}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "fetch", field, "update")
        r = json.loads(login)
        categories = ["layers", "browsers", "devices", "os", "connection_type", "login_type", "password_strength",
                      "id_verification"]
        layers = r["data"][0]["security_layers"]
        devices = ["Laptop/Desk top", "Mobile Phone", "Tablet / Ipad", "Others not listed above"]
        os = ["Windows", "Mac OS", "Linux", "Android", "IOS", "Others not listed above"]
        browsers = ["Chrome", "Safari", "Bing", "Firefox", "Edge", "Opera", "Others not listed above"]
        layers_list = ["layer1", "layer2", "layer3", "layer4", "layer5", "layer6"]
        connection_type = ["Mobile Data", "Office Wifi/Secured Wifi", "Public Wifi", "Others not listed above"]
        login_type = ["User Name & Password", "Face ID", "Voice ID", "Biometric ID", "Video ID",
                      "Others not listed above"]
        password_strength = ["Minimum 8 characters", "Minimum 10 characters", "Minimum 12 characters",
                             "Minimum 16 characters", "Others not listed above"]
        id_verification = ["Verified ID", "ID not verified", "Phone number verified", "Phone number not verified",
                           "Email verified", "Email not verified", "Others not listed above"]
        if category not in categories:
            return Response({"error": f"{category} is not a valid category"}, status=status.HTTP_400_BAD_REQUEST)
        for key, value in data.items():
            if category == 'browsers' and key not in browsers:
                return Response({"error": f"{key} is not an accepted browser type"}, status=status.HTTP_400_BAD_REQUEST)
            elif category == 'devices' and key not in devices:
                return Response({"error": f"{key} is not an accepted device type"}, status=status.HTTP_400_BAD_REQUEST)
            elif category == 'os' and key not in os:
                return Response({"error": f"{key} is not an accepted os type"}, status=status.HTTP_400_BAD_REQUEST)
            elif category == 'connection_type' and key not in connection_type:
                return Response({"error": f"{key} is not an accepted internet connection type"},
                                status=status.HTTP_400_BAD_REQUEST)
            elif category == 'login_type' and key not in login_type:
                return Response({"error": f"{key} is not an accepted login type"}, status=status.HTTP_400_BAD_REQUEST)
            elif category == 'password_strength' and key not in password_strength:
                return Response({"error": f"{key} is not an password strength type"},
                                status=status.HTTP_400_BAD_REQUEST)
            elif category == 'id_verification' and key not in id_verification:
                return Response({"error": f"{key} is not an accepted verification status type"},
                                status=status.HTTP_400_BAD_REQUEST)
        for layer in layers_list:
            layers[layer][category].clear()
        for key, value in data.items():
            layers[value][category].append(key)
        update = {"security_layers": layers}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "update", field, update)

        return Response(data, status=status.HTTP_200_OK)


@api_view(['POST'])
def get_all_details(request):
    if request.method == 'POST':
        username = request.data.get("username")
        if username == "uxliveadmin":
            field_c = {}
            login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                     "fetch", field_c, "nil")
        else:
            return Response(status=status.HTTP_200_OK)
        resp = json.loads(login)
        data = resp['data']
        user_data = []
        for user in data:
            user_dict = {
                "username": user['document_name'],
                "owner_name": user['profile_info']['first_name'],
                "first_name": user['profile_info']['first_name'],
                "last_name": user['profile_info']['last_name'],
                "org_name": user['organisations'][0]['org_name'] if user['organisations'] else ""
            }
            user_data.append(user_dict)
        return Response(user_data, status=status.HTTP_200_OK)


@api_view(['POST'])
def create_team_member(request):
    if request.method == 'POST':
        username = request.data.get("username")
        member_name = request.data.get('member_name')
        member_code = request.data.get('member_code')
        member_spec = request.data.get('member_spec', "")
        member_u_code = request.data.get('member_u_code', "")
        member_det = request.data.get('member_det', "")
        membername = base64.b64encode(bytes(member_name, 'utf-8')).decode()  # bytes
        membercode = base64.b64encode(bytes(member_code, 'utf-8')).decode()
        memberspec = base64.b64encode(bytes(member_spec, 'utf-8')).decode()
        memberucode = base64.b64encode(bytes(member_u_code, 'utf-8')).decode()
        memberdet = base64.b64encode(bytes(member_det, 'utf-8')).decode()
        teammembers = base64.b64encode(bytes("team_members", 'utf-8')).decode()
        field_c = {"document_name": username}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "fetch", field_c, "nil")
        resp = json.loads(login)
        data = resp['data']
        # orgnames = data[0]['organisations'][0]['org_name']
        orgnames = ""
        members_data = data[0]['members']
        accepted_members = members_data['team_members']['accept_members']
        accepted_member_codes = [member.get('member_code') for member in accepted_members]
        orgname = base64.b64encode(bytes(orgnames, 'utf-8')).decode()
        link = f"https://100014.pythonanywhere.com/?org={orgname}&type={teammembers}&name={membername}&code={membercode}&spec={memberspec}&u_code={memberucode}&detail={memberdet}"

        # Check if member_code already exists in accepted or pending member codes
        if member_code in accepted_member_codes:
            return Response({"error": "Member code already exists."}, status=status.HTTP_400_BAD_REQUEST)

        userorg = UserOrg.objects.all().filter(username=username)
        if userorg:
            for i in userorg:
                o = i.org
                odata = json.loads(o)
        tmembers = {"name": member_name, "member_code": member_code, "member_spec": member_spec,
                    "member_uni_code": member_u_code, "member_details": member_det, "link": link,
                    "status": "unused"}
        odata["members"]["team_members"]["accept_members"].append(tmembers)
        field = {"document_name": username}
        mem = odata["members"]
        update = {"members": mem}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "update", field, update)
        obj, created = UserOrg.objects.update_or_create(username=username, defaults={'org': json.dumps(odata)})
        response_data = {"link": link}
        return Response(response_data, status=status.HTTP_200_OK)


@api_view(['POST'])
def create_user_member(request):
    if request.method == 'POST':
        username = request.data.get("username")
        user_name = request.data.get('user_name')
        user_code = request.data.get('user_code')
        user_spec = request.data.get('user_spec', "")
        user_u_code = request.data.get('user_u_code', "")
        user_det = request.data.get('user_det', "")
        membername = base64.b64encode(bytes(user_name, 'utf-8')).decode()  # bytes
        membercode = base64.b64encode(bytes(user_code, 'utf-8')).decode()
        memberspec = base64.b64encode(bytes(user_spec, 'utf-8')).decode()
        memberucode = base64.b64encode(bytes(user_u_code, 'utf-8')).decode()
        memberdet = base64.b64encode(bytes(user_det, 'utf-8')).decode()
        teammembers = base64.b64encode(bytes("guest_members", 'utf-8')).decode()
        field_c = {"document_name": username}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "fetch", field_c, "nil")
        resp = json.loads(login)
        data = resp['data']
        orgnames = ""
        members_data = data[0]['members']
        accepted_members = members_data['guest_members']['accept_members']
        accepted_member_codes = [member.get('member_code') for member in accepted_members]
        orgname1 = base64.b64encode(bytes(orgnames, 'utf-8')).decode()
        link = f"https://100014.pythonanywhere.com/?org={orgname1}&type={teammembers}&name={membername}&code={membercode}&spec={memberspec}&u_code={memberucode}&detail={memberdet}"

        # Check if member_code already exists in accepted or pending member codes
        if user_code in accepted_member_codes:
            return Response({"error": "Guest Member code already exists."}, status=status.HTTP_400_BAD_REQUEST)

        userorg = UserOrg.objects.all().filter(username=username)
        if userorg:
            for i in userorg:
                o = i.org
                odata = json.loads(o)
        gmembers = {"name": user_name, "member_code": user_code, "member_spec": user_spec,
                    "member_uni_code": user_u_code, "member_details": user_det, "link": link,
                    "status": "unused"}
        odata["members"]["guest_members"]["pending_members"].append(gmembers)
        field = {"document_name": username}
        mem = odata["members"]
        update = {"members": mem}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "update", field, update)
        obj, created = UserOrg.objects.update_or_create(username=username, defaults={'org': json.dumps(odata)})
        response_data = {"link": link}
        return Response(response_data, status=status.HTTP_200_OK)


@api_view(['POST'])
def get_workspaces(request):
    if request.method == 'POST':
        # Get the 'username' from the POST data
        username = request.data.get("username")

        # Create the field conditions for querying
        field_c = {"document_name": username}

        # Make the API call using 'dowellconnection'
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "fetch", field_c, "nil")

        # Parse the API response
        resp = json.loads(login)
        data = resp['data']
        workspace_names = []  # Rename 'value' to a more meaningful name

        # Get the name of the first organization and add it to the list if it doesn't match the username
        org_name = data[0]['organisations'][0]['org_name']
        if org_name != username:
            workspace_names.append(org_name)

        # Loop through other organizations and add their names to the list if not already present and if they don't match the username
        for org in data[0]['other_organisation']:
            if org['org_name'] not in workspace_names and org['org_name'] != username:
                workspace_names.append(org['org_name'])

        # Return the list of workspace names in the response
        return Response(workspace_names, status=HTTP_200_OK)


@api_view(['POST'])
def get_last_login(request):
    if request.method == 'POST':
        username = request.data.get("username")
        url_lastlogin = "https://100014.pythonanywhere.com/api/lastlogins/"
        data = {"username": username}
        response_login = requests.post(url_lastlogin, json=data)
        if response_login.status_code == 200:
            last_login_times = response_login.json()["data"]["LastloginTimes"]
        else:
            last_login_times = None
        return Response(
            last_login_times
            , status=HTTP_200_OK)


@api_view(['POST'])
def connect_portfolio(request):
    if request.method == "POST" and "connect_portfolio" in request.data.get("action"):
        user = request.data.get("username")
        portf = request.data.get("portfl")
        action = request.data.get("action")
        product = request.data.get("product")
        orl = request.data.get("present_org")
        session = request.data.get("session_id")

        try:
            lo=UserOrg.objects.all().filter(username=orl)
        except:
            return HttpResponse("User Org Not Found in Local Database")
        for rd in lo:
            lo1=rd.org
            lrf=json.loads(lo1)
        mydict={}
        # if "API" in product:
        #     return redirect(f'https://ll05-ai-dowell.github.io/100105-DowellApiKeySystem/?session_id={request.session["session_id"]}&id=100093')

        ro=UserInfo.objects.all().filter(username=user)
        ro1=UserOrg.objects.all().filter(username=user)
        # user_orgn = UserOrg.objects.get(username=user)
        # org_dict = json.loads(user_orgn.org)
        # # return HttpResponse(org_dict["profile_info"])
        # try:
        #     # Iterate over the 'portpolio' list in the data
        #     for portfolio in org_dict['portpolio']:
        #         if portfolio['portfolio_name'] == portf:
        #             status = portfolio['status']
        #             notification_obj = Notification(username=user, owner=orl,
        #                     notification=json.dumps(org_dict["profile_info"]),
        #                     status=status)
        #             notification_obj.save()
        # # return HttpResponse(lrf)
        # except:
        #     pass

        for i in ro:
            rofield=i.userinfo
            #s = rofield.replace("\'", "\"")
            s=json.loads(rofield)
            mydict["userinfo"]=s

        if orl==user:
            lrst=[]
            for lis in lrf["portpolio"]:
                if lis["portfolio_name"]==portf:
                    mydict["portfolio_info"]=[lis]
                # if lis["product"]==product:
                if lis["product"] in product:
                    lrst.append(lis)
                # else:
                #     return HttpResponse(f"<h1 align='center'>Data Not Found<br><a href='/'>Home</a></h1>")
            try:
                if lrf["organisations"][0]["org_img"]:
                    mydict["userinfo"]["org_img"] = lrf["organisations"][0]["org_img"]
            except:
                    mydict["userinfo"]["org_img"] = "https://100093.pythonanywhere.com/static/clientadmin/img/logomissing.png"

            try:
                mydict["portfolio_info"][0]["org_id"]=lrf["_id"]
                mydict["portfolio_info"][0]["owner_name"]=lrf["document_name"]
                mydict["portfolio_info"][0]["org_name"]=lrf["document_name"]
            except Exception as e:
                return Response(f"Data Not Found{e} {lrf}")
            mydict["selected_product"]={"product_id":1,"product_name":product,"platformpermissionproduct":[{"type":"member","operational_rights":["view","add","edit","delete"],"role":"admin"}],"platformpermissiondata":["real","learning","testing","archived"],"orgid":lrf["_id"],"orglogo":"","ownerid":"","userportfolio":lrst,"payment_status":"unpaid"}
            # return JsonResponse({"msg":mydict})
            obj, created = UserData.objects.update_or_create(username=user,sessionid=session,defaults={'alldata': json.dumps(mydict)})
            if "Workflow AI" in product or "workflow" in product:
                if s["User_type"] == "betatester":
                    return Response(
                        f'https://ll04-finance-dowell.github.io/100018-dowellWorkflowAi-testing/#/?session_id={session}&id=100093')
                else:
                    # return redirect(f'https://ll04-finance-dowell.github.io/100018-dowellWorkflowAi-testing/?session_id={request.session["session_id"]}&id=100093')
                    return Response(
                        f'https://ll04-finance-dowell.github.io/workflowai.online/#?session_id={session}&id=100093')

            elif "Scale" in product or "scales" in product:
                return Response(
                    f'https://100035.pythonanywhere.com/client?session_id={session}&id=100093')
            elif "Legalzar" in product or "Legalzard" in product:
                return Response(f'https://play.google.com/store/apps/details?id=com.legalzard.policies')
            elif "Calculator" in product:
                return Response(
                    f'https://100050.pythonanywhere.com/calculator/?session_id={session}&id=100093')
            elif "Team" in product:
                if s["User_type"] == "betatester":
                    return Response(
                        f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#/?session_id={session}&id=100093')
                else:
                    return Response(
                        f'https://ll07-team-dowell.github.io/Jobportal/#?session_id={session}&id=100093')
            elif "Media" in product:
                return Response(f'https://100007.pythonanywhere.com/')
            elif "Customer" in product:
                return Response(
                    f'https://100096.pythonanywhere.com/customer-support/?session_id={session}&id=100093')
            elif "Chat" in product:
                return Response(
                    f'https://100096.pythonanywhere.com/living-lab-support/?session_id={session}&id=100093')
            elif "Repositories" in product:
                return Response(f'https://ll07-team-dowell.github.io/100045-SecureRepository/')
            elif "Wifi" in product:
                return Response(
                    f'https://l.ead.me/dowellwifiqrcode/?session_id={session}&id=100093')
            else:
                return Response(f"Redirect the URL of this {product} product not avail in database")

        for ii in ro1:
            pfield = ii.org
            # s = rofield.replace("\'", "\"")
            ss = json.loads(pfield)
            rr = ss["other_organisation"]
            rr1 = ss["organisations"]

        for iii in rr:
            if iii["org_name"] == orl:
                try:
                    if iii["portfolio_name"] == portf:
                        mydict["portfolio_info"] = [iii]

                    else:
                        pass
                except:
                    pass
        try:
            selected_role = mydict["portfolio_info"]["role"]
        except:
            pass
        level1 = {}
        level2 = {}
        level3 = {}
        level4 = {}
        level5 = {}
        try:
            for items in lrf["roles"]:
                if selected_role == items["role_name"]:
                    if items["level1_item"]:
                        level1["level1name"] = lrf["organisations"][0]["level1"]["level_name"]
                        level1["level1items"] = lrf["organisations"][0]["level1"]["items"]
                    if items["level2_item"]:
                        level2["level1name"] = lrf["organisations"][0]["level2"]["level_name"]
                        level2["level1items"] = lrf["organisations"][0]["level2"]["items"]
                    if items["level3_item"]:
                        level2["level3name"] = lrf["organisations"][0]["level3"]["level_name"]
                        level2["level3items"] = lrf["organisations"][0]["level3"]["items"]
                    if items["level4_item"]:
                        level2["level4name"] = lrf["organisations"][0]["level4"]["level_name"]
                        level2["level4items"] = lrf["organisations"][0]["level4"]["items"]
                    if items["level5_item"]:
                        level2["level5name"] = lrf["organisations"][0]["level5"]["level_name"]
                        level2["level5items"] = lrf["organisations"][0]["level5"]["items"]
        except:
            pass
        if "portfolio_info" not in mydict:
            # return HttpResponse(f'{rr1}')
            mydict["portfolio_info"] = [ss["portpolio"][0]]
        productport = []
        for product2 in lrf["portpolio"]:
            if product == product2["product"]:
                productport.append(product2)

        mydict["organisations"] = [{"orgname": lrf["document_name"], "orgowner": lrf["document_name"]}]
        mydict["selected_product"] = {"product_id": 1, "product_name": product, "platformpermissionproduct": [
            {"type": "member", "operational_rights": ["view", "add", "edit", "delete"], "role": "admin"}],
                                      "platformpermissiondata": ["real", "learning", "testing", "archived"],
                                      "orgid": lrf["_id"], "orglogo": "", "ownerid": "", "userportfolio": productport,
                                      "payment_status": "unpaid"}
        mydict["selected_portfoliolevel"] = level1
        mydict["selected_portfolioleve2"] = level2
        mydict["selected_portfolioleve3"] = level3
        mydict["selected_portfolioleve4"] = level4
        mydict["selected_portfolioleve5"] = level5
        mydict["portfolio_info"][0]["org_id"] = lrf["_id"]
        mydict["portfolio_info"][0]["owner_name"] = lrf["document_name"]
        mydict["portfolio_info"][0]["org_name"] = lrf["document_name"]
        obj, created = UserData.objects.update_or_create(username=user, sessionid=session,
                                                         defaults={'alldata': json.dumps(mydict)})

        if "Workflow AI" in product or "workflow" in product:
            if s["User_type"] == "betatester":
                return Response(
                    f'https://ll04-finance-dowell.github.io/100018-dowellWorkflowAi-testing/#/?session_id={session}&id=100093')
            else:
                # return redirect(f'https://ll04-finance-dowell.github.io/100018-dowellWorkflowAi-testing/?session_id={request.session["session_id"]}&id=100093')
                return Response(
                    f'https://ll04-finance-dowell.github.io/workflowai.online/#?session_id={session}&id=100093')
            # return redirect(f'https://ll04-finance-dowell.github.io/100018-dowellWorkflowAi-testing/?session_id={request.session["session_id"]}&id=100093')
            # return redirect(f'https://ll04-finance-dowell.github.io/100018-dowellWorkflowAi-testing/#/?session_id={request.session["session_id"]}&id=100093')
        elif "Scale" in product or "scales" in product:
            return Response(
                f'https://100035.pythonanywhere.com/client?session_id={session}&id=100093')
        elif "Legalzar" in product or "Legalzard" in product:
            return Response(f'https://play.google.com/store/apps/details?id=com.legalzard.policies')
        elif "Team" in product:
            return Response(
                f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#/?session_id={session}&id=100093')
        elif "Media" in product:
            return Response(f'https://100007.pythonanywhere.com/')
        elif "Customer" in product:
            return Response(
                f'https://100096.pythonanywhere.com/customer-support/?session_id={session}&id=100093')
        elif "Repositories" in product:
            return Response(f'https://ll07-team-dowell.github.io/100045-SecureRepository/')
        elif "Chat" in product:
            return Response(
                f'https://100096.pythonanywhere.com/living-lab-support/?session_id={session}&id=100093')
        else:
            return Response(f"Redirect the URL of this {product} product not avail in database")
    if request.method == "POST" and "request_portfolio" in request.POST:
        user = request.data.get("username")
        orl = request.data.get("present_org")
        product = request.data.get("product")
        user_orgn = UserOrg.objects.get(username=user)
        org_dict = json.loads(user_orgn.org)

        try:
            # Iterate over the 'portpolio' list in the data
            notification_obj = Notification(username=user, owner=orl,
                                            notification=json.dumps(org_dict["profile_info"]),
                                            status="enable", product=product)
            notification_obj.save()
        except:
            pass


@api_view(['POST'])
def update_level_name(request):
    if request.method == 'POST':
        username = request.data.get("username")
        level = request.data.get("level")
        level_name = request.data.get("level_name")
        ls = []

        field_c = {"document_name": username}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "fetch", field_c, "nil")

        resp = json.loads(login)
        data = resp['data']

        for org in data[0]['organisations']:
            if level in org:
                break
            else:
                return Response({
                    "error": "Invalid level provided."
                }, status=HTTP_400_BAD_REQUEST)

        ls.append(level_name)
        r = level

        userorg = UserOrg.objects.all().filter(username=username)
        if userorg:
            for i in userorg:
                o = i.org
                odata = json.loads(o)
            odata["organisations"][0][r]["level_name"] = ls[0]
            org = odata["organisations"]
            obj, created = UserOrg.objects.update_or_create(username=username,
                                                            defaults={'org': json.dumps(odata)})

            field = {"document_name": username}
            update = {"organisations": org}
            login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                     "update", field, update)

            return Response({
                "success": f"name successfully changed to {level_name}"
            }, status=HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def otherorg(request):
    if request.method == 'POST':
        username = request.data.get("username")
        org_name = request.data.get("org_name")
        field_c = {"document_name": username}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "fetch", field_c, "nil")

        ##########################################
        resp = json.loads(login)
        other_organisations = resp['data'][0]['other_organisation']
        aggregated_data = {}
        # # Filter the data based on org_name, status, and member_type
        # filtered_data = [
        #     entry for entry in other_organisations
        #     if entry.get('org_name') == org_name
        #       and entry.get('status') == 'enable'
        #       and entry.get('member_type') == 'team_member' or entry.get('member_type') == 'team_members'
        # ]

        # for entry in filtered_data:
        #     product_name = entry["product"]
        #     getProductData = getProductDetails(product_name)  # Call the function to get product details
        #     print('here')
        #     entry["product_link"] = getProductData.get("product_link", "")
        #     entry["product_logo"] = getProductData.get("product_logo", "")

        # return Response(
        #     filtered_data,
        #     status=HTTP_200_OK
        # )
        for entry in other_organisations:
            # Check if org_name matches the filter and if status is "enable"
            if entry.get("status") == "enable" and entry.get("org_name") == org_name:

                # Construct a unique key based on the product
                key = entry.get("product", "")

                # Fetch product details using the provided function
                product_details = getProductDetails(key)

                # If this product hasn't been seen before, initialize its structure
                if key not in aggregated_data:
                    aggregated_data[key] = {
                        "org_id": entry.get("org_id", ""),
                        "org_name": entry.get("org_name", ""),
                        "username": entry.get("username", ""),
                        "member_type": entry.get("member_type", ""),
                        "product": entry.get("product", ""),
                        "portfolios": [],
                        "product_link": product_details.get("product_link", ""),
                        # Retrieve link from the product_details
                        "product_logo": product_details.get("product_logo", "")
                        # Retrieve logo from the product_details
                    }

                # Create a portfolio entry from the current data
                portfolio = {
                    "data_type": entry.get("data_type", ""),
                    "operations_right": entry.get("operations_right", ""),
                    "role": entry.get("role", ""),
                    "security_layer": entry.get("security_layer", ""),
                    "portfolio_name": entry.get("portfolio_name", ""),
                    "portfolio_code": entry.get("portfolio_code", ""),
                    "portfolio_specification": entry.get("portfolio_specification", ""),
                    "portfolio_uni_code": entry.get("portfolio_uni_code", ""),
                    "portfolio_details": entry.get("portfolio_details", ""),
                    "status": entry.get("status", "")
                }

                aggregated_data[key]["portfolios"].append(portfolio)

        # Convert the aggregated data dictionary to a list format
        response = list(aggregated_data.values())
        return Response({"data": response}, status=HTTP_200_OK)


def getProductDetails(product_name):
    field = {}
    l1 = product = dowellconnection("login", "bangalore", "login", "prod_mem", "prod_mem", "100014001", "ABCDE",
                                    "fetch", field, "nil")
    l2 = json.loads(l1)

    for product in l2["data"]:
        if product["product_name"] == product_name:
            return {
                "product_link": product.get("product_link", ""),
                "product_logo": product.get("product_logo", "")
            }

    return {}


@api_view(['POST'])
def MemEnDis(request):
    if request.method == 'POST':
        username = request.data.get("username")
        action = request.data.get("action")
        rnamedict = request.data.get("selected_member")
        porg = request.data.get("present_org")
        membertype = request.data.get("member_type")

        if action == "remove_member":
            try:
                userorg = UserOrg.objects.all().filter(username=username)
                for i in userorg:
                    dataorg = i.org
                    dataorgr = json.loads(dataorg)
                lev = dataorgr["members"]
                for ir in lev[membertype]["accept_members"]:
                    try:
                        if ir["name"] == rnamedict:
                            # ir["status"]="disable"
                            lev[membertype]["accept_members"].remove(ir)
                        else:
                            pass
                    except:
                        pass
                UserOrg.objects.all()
                print(userorg)
                userorg1 = UserOrg.objects.all().filter(username=f"{rnamedict}")
                print(userorg1)
                for ii in userorg1:
                    dataorg1 = ii.org
                    dataorg2 = json.loads(dataorg1)
                levorg = dataorg2["other_organisation"]
                for irs in levorg:
                    try:
                        if irs["org_name"] == porg:
                            irs["status"] = "deleted"
                        else:
                            pass
                    except:
                        pass
                dataorgr["members"] = lev
                dataorg2["other_organisation"] = levorg
                obj, created = UserOrg.objects.update_or_create(username=username,
                                                                defaults={'org': json.dumps(dataorgr)})
                obj, created = UserOrg.objects.update_or_create(username=rnamedict,
                                                                defaults={'org': json.dumps(dataorg2)})
                field = {"document_name": username}
                update = {"members": lev}
                login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                         "update", field, update)
                field1 = {"document_name": rnamedict}
                update1 = {"other_organisation": levorg}
                login1 = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159",
                                          "ABCDE",
                                          "update", field1, update1)
                return Response({"success": "Member removed successfully"}, status=HTTP_200_OK)
            except:
                return Response({"error": "Error while removing member"}, status=HTTP_400_BAD_REQUEST)

        elif action == "cancel_member":
            try:
                userorg = UserOrg.objects.all().filter(username=username)
                for i in userorg:
                    dataorg = i.org
                    dataorg1 = json.loads(dataorg)
                lev = dataorg1["members"]
                for ir in lev[membertype]["pending_members"]:
                    try:
                        if ir["name"] == rnamedict:
                            # ir["status"]="disable"
                            lev[membertype]["pending_members"].remove(ir)
                        else:
                            pass
                    except:
                        pass
                dataorg1["members"] = lev
                obj, created = UserOrg.objects.update_or_create(username=username,
                                                                defaults={'org': json.dumps(dataorg1)})

                field = {"document_name": username}
                update = {"members": lev}
                login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                         "update", field, update)
                return Response({"success": "Member invitation cancelled successfully"}, status=HTTP_200_OK)
            except:
                return Response({"error": "Error while processing request"}, status=HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def create_test_team_member(request):
    if request.method == 'POST':
        username = request.data.get("username")
        member_name = request.data.get('member_name')
        member_code = request.data.get('member_code')
        member_spec = request.data.get('member_spec', "")
        member_u_code = request.data.get('member_u_code', "")
        member_det = request.data.get('member_det', "")
        membername = base64.b64encode(bytes(member_name, 'utf-8')).decode()  # bytes
        membercode = base64.b64encode(bytes(member_code, 'utf-8')).decode()
        memberspec = base64.b64encode(bytes(member_spec, 'utf-8')).decode()
        memberucode = base64.b64encode(bytes(member_u_code, 'utf-8')).decode()
        memberdet = base64.b64encode(bytes(member_det, 'utf-8')).decode()
        teammembers = base64.b64encode(bytes("team_members", 'utf-8')).decode()
        field_c = {"document_name": username}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "fetch", field_c, "nil")
        resp = json.loads(login)
        data = resp['data']
        # orgnames = data[0]['organisations'][0]['org_name']
        orgnames = ""
        members_data = data[0]['members']
        accepted_members = members_data['team_members']['accept_members']
        accepted_member_codes = [member.get('member_code') for member in accepted_members]
        orgname = base64.b64encode(bytes(orgnames, 'utf-8')).decode()
        link = f"https://100014.pythonanywhere.com/?org={orgname}&type={teammembers}&name={membername}&code={membercode}&spec={memberspec}&u_code={memberucode}&detail={memberdet}"

        # Check if member_code already exists in accepted or pending member codes
        if member_code in accepted_member_codes:
            return Response({"error": "Member code already exists."}, status=status.HTTP_400_BAD_REQUEST)

        userorg = UserOrg.objects.all().filter(username=username)
        if userorg:
            for i in userorg:
                o = i.org
                odata = json.loads(o)
        tmembers = {"name": member_name, "member_code": member_code, "member_spec": member_spec,
                    "member_uni_code": member_u_code, "member_details": member_det, "status": "enable",
                    "first_name": "", "portfolio_name": "created"}
        odata["members"]["team_members"]["accept_members"].append(tmembers)
        field = {"document_name": username}
        mem = odata["members"]
        update = {"members": mem}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "update", field, update)
        obj, created = UserOrg.objects.update_or_create(username=username, defaults={'org': json.dumps(odata)})
        response_data = {"link": link}
        return Response(response_data, status=status.HTTP_200_OK)


@api_view(['POST'])
def request_portfolio(request):
    if request.method == "POST":
        context = {}
        user = request.data.get("username")
        orl = request.data.get("present_org")
        product = request.data.get("product")
        user_orgn = UserOrg.objects.get(username=user)
        org_dict = json.loads(user_orgn.org)
        if "API" in product:
            return Response(
                f'https://ll05-ai-dowell.github.io/100105-DowellApiKeySystem/?session_id={request.session["session_id"]}&id=100093',
                status=status.HTTP_200_OK)
        try:
            notification_obj = Notification(username=user, owner=orl,
                                            notification=json.dumps(org_dict["profile_info"]),
                                            status="enable", product=product)
            notification_obj.save()
            data = {
                "username": "uxliveadmin"
            }
            return Response({"success": "Saved successfully"}, status=status.HTTP_200_OK)
        except:
            return Response({"error": "Error while saving"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def fetch_notifications(request):
    if request.method == "POST":
        present_org = request.data.get("present_org")
        if present_org:
            notifications = Notification.objects.filter(owner=present_org, status="enable")
            notification_list = []
            for notification in notifications:
                notification_dict = {
                    "username": notification.username,
                    "product": notification.product,
                }
                notification_list.append(notification_dict)

            all_notifications = {
                "notifications": notification_list,
            }
            return Response(all_notifications)
        else:
            return Response({"error": "No present_org found in session"})


@api_view(['POST'])
def dismiss_notifications(request):
    if request.method == 'POST':
        username = request.data.get('username')
        product = request.data.get('product')

        try:
            notification = Notification.objects.filter(username=username, product=product, status='enable').first()
            if notification:
                notification.status = 'disabled'
                notification.save()
                return Response({"success": "Notification disabled"}, status=HTTP_200_OK)
            else:
                return Response({"success": "Notification not found or already disabled"}, status=HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(str(e), status=500)


@api_view(['POST'])
def settings_data(request):
    if request.method == 'POST':
        try:
            admin_id = request.data.get("admin_id")
            field_m = {"admin_id": admin_id}
            data = dowellconnection("login", "bangalore", "login", "login_settings", "login_settings", "1202001",
                                    "ABCDE",
                                    "fetch", field_m, "update")
            parsed_data = json.loads(data)
            return Response(parsed_data, status=HTTP_200_OK)
        except:
            return Response({"error": "Please check admin id data"}, status=HTTP_400_BAD_REQUEST)


from django.http import JsonResponse


@api_view(["POST"])
def public_user(request):
    if request.method == 'POST':
        context = {}
        session_id = request.data.get("session_id")
        url = "https://100014.pythonanywhere.com/api/userinfo/"
        resp = requests.post(url, data={"session_id": session_id})
        user = json.loads(resp.text)
        allpub = publiclink.objects.all().filter(username=user["userinfo"]["username"])

        if resp.status_code == 200:
            most_recent_item = allpub.order_by('-id').first()

            if most_recent_item:
                links = json.loads(most_recent_item.link)

                qrcodeids = [{"id": link["qrcodeid"]} for link in links]

                return JsonResponse(qrcodeids, safe=False)
            else:
                return JsonResponse([], safe=False)
        else:
            return Response({"error": "Response failed"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def file_upload(request):
    if request.method == 'POST':
        username = request.data.get("username")
        orgname = request.data.get("orgname")
        sheetname = request.data.get("sheetname")
        fieldname = request.data.get("fieldname")
        file = request.FILES.get("file")
        print("frew")
        print(file)
        f = file.name
        rows_to_delete = request.data.get("rows")
        if rows_to_delete:
            n = int(rows_to_delete)
        file_content = file.read()
        result = chardet.detect(file_content)
        file_encoding = result['encoding']
        file.seek(0)
        file_content = file.read().decode(file_encoding)
        sniffer = csv.Sniffer()
        delimiter = sniffer.sniff(file_content).delimiter

        # Reset the file pointer to the beginning
        file.seek(0)

        if ".csv" in file.name or ".CSV" in file.name:
            if request.POST.get("rowsToDelete"):
                df = pd.read_csv(file, encoding=file_encoding, sep=delimiter, skiprows=n)
            else:
                df = pd.read_csv(file, encoding=file_encoding, sep=delimiter)
        else:
            if request.POST.get("rowsToDelete"):
                df = pd.read_excel(file, skiprows=n)
            else:
                df = pd.read_excel(file)
        try:
            if fieldname != "all":
                fieldnames = [v for k, v in request.POST.items() if 'fieldname' in k]
                column_data = df[fieldnames]
            else:
                column_data = df.iloc
        except Exception as e:
            return Response({
                                "error": f"No columns matching the fieldname provided, if there are empty rows in your excel file make sure to add the number of rows in the Rows to Delete field.{e}"})
            # Drop rows containing NaN values
        column_data = column_data.dropna()
        data = str(column_data.to_dict(orient='records'))
        table_html = column_data.to_html(classes="table table-striped")
        datalink = passgen.generate_random_password1(20)

        try:
            obj = ExcelData.objects.get(username=username, filename=f)
            obj.data = data
            obj.datalink = datalink
            obj.save()
        except ExcelData.DoesNotExist:
            obj = ExcelData.objects.create(username=username, data=data, datalink=datalink, filename=f)

        return Response({"table_html": table_html, "datalink": datalink})
