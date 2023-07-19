from django.shortcuts import render, HttpResponse, redirect
from rest_framework.response import Response
from rest_framework.decorators import api_view
from clientadminapp.models import UserData, UserOrg
from clientadminapp.dowellconnection import dowellconnection, loginrequired
from clientadminapp.models import publiclink
import requests
import json
from rest_framework import status
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST


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
    session = odata["session_id"]
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
        required_fields = [username, member_type, member, product, data_type, op_rights, role, portfolio_name,
                           portfolio_code]
        for field in required_fields:
            if field is None:
                return Response({"error": "Please ensure data for all required fields are present"},
                                status=HTTP_400_BAD_REQUEST)
        member = eval(member)
        response_data = {"username": member, "member_type": member_type, "product": product,
                         "data_type": data_type, "operations_right": op_rights, "role": role,
                         "security_layer": "None", "portfolio_name": portfolio_name,
                         "portfolio_code": portfolio_code, "portfolio_specification": portfolio_spec,
                         "portfolio_uni_code": portfolio_u_code, "portfolio_details": portfolio_det,
                         "status": "enable"}
        userorg = UserOrg.objects.all().filter(username=username)
        for i in userorg:
            o = i.org
            odata = json.loads(o)
        ortname = odata["document_name"]
        orgid = odata["_id"]
        portls = odata["portpolio"]
        for portcheck in portls:
            if portcheck["portfolio_code"] == portfolio_code:
                return Response({"error": "Portfolio Code Must Be Unique"}, status=HTTP_400_BAD_REQUEST)
        odata["portpolio"].append(response_data)
        if "owner" or "team_member" in member_type:
            typemem = "team_members"
        elif "user" in member_type:
            typemem = "guest_members"
        if member_type == "public":
            for ir in member:
                orl = publiclink.objects.all().filter(username=username, qrcodeid=ir)
                try:
                    r = orl[0].link
                except:
                    r = "no link"
                odata["members"]["public_members"]["pending_members"].append(
                    {"name": member, "portfolio_name": portfolio_name, "product": product, "status": "unused",
                     "link": r})
                memberpublic = odata["members"]
                obj, created = UserOrg.objects.update_or_create(username=username,
                                                                defaults={'org': json.dumps(odata)})
                orl.update(portfolio=portfolio_name)
                field = {"document_name": username}
                update = {"portpolio": odata["portpolio"], "members": memberpublic}
                login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159",
                                         "ABCDE", "update", field, update)
            return Response({"success": f"{portfolio_name} successfully created"}, status=HTTP_200_OK)
        for imem in odata["members"][typemem]["accept_members"]:
            if imem["name"] in member:
                imem["portfolio_name"] = "created"

        field = {"document_name": username}
        obj, created = UserOrg.objects.update_or_create(username=username, defaults={'org': json.dumps(odata)})
        update = {"portpolio": odata["portpolio"], "members": odata["members"]}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "update", field, update)

        for li in member:
            field1 = {"document_name": li}
            login1 = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159",
                                      "ABCDE", "fetch", field1, "update")
            r = json.loads(login1)
            try:
                lo = r["data"][0]["other_organisation"]

                lo.append({"org_id": orgid, "org_name": ortname, "username": li, "member_type": member_type,
                           "product": product, "data_type": data_type, "operations_right": op_rights,
                           "role": role, "security_layer": "None", "portfolio_name": portfolio_name,
                           "portfolio_code": portfolio_code, "portfolio_specification": portfolio_spec,
                           "portfolio_uni_code": portfolio_u_code, "portfolio_details": portfolio_det,
                           "status": "enable"})

                field2 = {"document_name": li}
                update = {"other_organisation": lo}
                login2 = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159",
                                          "ABCDE", "update", field2, update)
            except:
                pass
        return Response({"success": f"{portfolio_name} successfully created"}, status=HTTP_200_OK)


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

        result = []
        for layer_number, layer_data in security_layers.items():
            category_data = layer_data[category]
            for data in category_data:
                result.append({category: data, "layer": layer_number})

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
        data = eval(data)
        field = {"document_name": username}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "fetch", field, "update")
        r = json.loads(login)
        layers = r["data"][0]["security_layers"]
        for item in data:
            for key, value in item.items():
                if value not in layers[key][category]:
                    layers[key][category].append(value)
                elif value in layers[key][category]:
                    return Response({"error": f"{value} already exists in {key}"}, status=status.HTTP_400_BAD_REQUEST)

        update = {"security_layers": layers}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "update", field, update)

        return Response({"success": f"{category} has been updated successfully"}, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_all_details(request):
    field_c = {}
    login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                             "fetch", field_c, "nil")
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