from django.shortcuts import render,HttpResponse,redirect
from rest_framework.response import Response
from rest_framework.decorators import api_view
from clientadminapp.models import *
from clientadminapp.models import *
from clientadminapp.dowellconnection import dowellconnection,loginrequired
from clientadminapp.models import publiclink
import requests
import json
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_500_INTERNAL_SERVER_ERROR
import base64
from django.core import serializers
from django.http import JsonResponse
import chardet
import csv
import pandas as pd
from clientadminapp import passgen
import datetime
from datetime import timedelta
from django.core.mail import send_mail
from django.core.mail import EmailMessage
from rest_framework.views import APIView
from django.views.decorators.csrf import ensure_csrf_cookie
from cryptography.fernet import Fernet
import base64
import os
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.backends import default_backend
from clientadminapp import qrcodegen

def generate_key(password: str, salt: bytes) -> bytes:
    password_bytes = password.encode()
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=100000,
        backend=default_backend()
    )


    key = base64.urlsafe_b64encode(kdf.derive(password_bytes))
    return key

saved_salt = b'\xc1\x12\xc4\xef\xd9\xbf\xac\xc5\xdc\x8e\x02BC\xa6f\xa4'
crpassword = "uxliveadmin"
# Encrypt a message
def encrypt_message(message: str, password: str, salt: bytes) -> bytes:
    key = generate_key(password, salt)
    fernet = Fernet(key)
    return fernet.encrypt(message.encode())

# Decrypt a message
def decrypt_message(encrypted_message: bytes, password: str, salt: bytes) -> str:
    key = generate_key(password, salt)
    fernet = Fernet(key)
    return fernet.decrypt(encrypted_message).decode()

@api_view(["GET"])
def ProductsView(request):
    p=["Workflow AI", "Digital Q", "Wifi QR Code", "Chat","UX Live","Social Media Automation","Scales","Logo Scan","Legalzard","Maps","Customer Experience","Living Lab Admin","Team Management","Monitoring","Live Stream Dashboard","Sales Agent","Permutation Calculator","Customer Support Centre","Secure Repositories","Secure Data"]
    ls=[]
    for i in p:
        ls.append({"product_name":i,"logo":"","status":"enable"})
    return Response({"data":ls})
@api_view(["POST"])
def sessionView(request):

    mdata=request.data
    s=mdata["session_id"]

    # ro1=UserData.objects.all().filter(sessionid=s)
    field_n = {"session_id":s}
    l1 = dowellconnection("login","bangalore","login","company","company","1083","ABCDE","fetch",field_n,"nil")
    new = json.loads(l1)
    if len(new["data"]) < 1:
        return Response({"msg":"No user found"})
    else:
        data = new["data"][0]["user_data"]



    # if not ro1:
    #     return Response({"msg":"No user found"})
    # # return HttpResponse(f"hi{ro1}")
    # for i in ro1:
    #     r=i.alldata
    #     rj=json.loads(r)

    field= {"document_name":data["userinfo"]["username"]}
    l1=dowellconnection("login","bangalore","login","client_admin","client_admin","1159","ABCDE","fetch",field,"nil")

    l1 = json.loads(l1)
    roles = l1["data"][0]["roles"]
    # rj["roles"] = roles
    data["roles"] = roles
    # return Response({"roles":roles})
    try:
        if data:
            return Response(data)
    except:
        return Response({"msg":"your data not found in database try again with session_id"})
@api_view(["POST"])
def OrgsView(request):
    mdata=request.data
    org=mdata["org"]
    sec=mdata["scode"]
    #return Response({"msg":"ok"})
    if sec=="DoWell$0987":

        ro1=UserOrg.objects.all().filter(username=org)
        if ro1:
            for i in ro1:
                r=i.org
                rj=json.loads(r)
            return Response(rj)
        else:
            return Response({"message":"this org details not found"})
@api_view(["POST"])
def OrgView(request):
    mdata=request.data
    un=mdata["org_id"]
    ro1=UserOrg.objects.all()
    for i in ro1:
        rl=i.org
        rol=json.loads(rl)
        for ii in rol:
            try:
                if ii["_id"]==un:
                    rj=rol
            except:
                pass
    members=rj["members"]
    portl=rj["portpolio"]
    return Response({"members":members,"portfolio":portl})
@api_view(["POST"])
def PublicLinkUpdate(request):
    mdata=request.data
    qrid=mdata["qrid"]
    org=mdata["org_name"]
    product=mdata["product"]
    ro1=publiclink.objects.filter(qrcodeid=qrid,org=org)#.update(productstatus="used",product=product)
    if ro1:
        for i in ro1:
            if i.productstatus=="used":
                return Response({"message":"this link already used"})
            else:
                obj = publiclink.objects.get(qrcodeid=qrid)
                obj.productstatus= "used"
                obj.product=product
                obj.save()
                return Response({"message":"update successfully"})
    else:
        #return Response({"message":"something wrong"})
        return Response({"message":"pl check qrid"})

@api_view(["POST"])
def updateOrg(request):
    odata = request.data
    try:
        username = odata["username"]
        org_name = odata["orgname"]
        org_address = odata["orgaddress"]
        org_zip =  odata["orgzipcode"]
        org_city = odata["orgcity"]
        org_country = odata["orgcountry"]
        org_latitude = odata["orglatitude"]
        org_longitude = odata["orglongitude"]
    except:
        return Response({"msg":"error in request body"})

    field= {"document_name":username}
    l1=dowellconnection("login","bangalore","login","client_admin","client_admin","1159","ABCDE","fetch",field,"nil")
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
    field1={"document_name":username}
    update_field = {"organisations":org}
    l1=dowellconnection("login","bangalore","login","client_admin","client_admin","1159","ABCDE","update",field1,update_field)
    l1 = json.loads(l1)
    return Response({"msg":"updated successfully."})

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
            fetch = dowellconnection("login", "bangalore", "login", "prod_mem", "prod_mem", "100014001", "ABCDE", "fetch", fetch_field, "nil")
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
                    dowellconnection("login", "bangalore", "login", "prod_mem", "prod_mem", "100014001", "ABCDE", "update", field, update)
                    return Response({"message": "product updated successfully"})
            return Response({"message": "product not found"})
            return Response({"message": "Successfully Updated"})
        else:
            # Only username is present in the request body
            field = {}
            l1 = dowellconnection("login", "bangalore", "login", "prod_mem", "prod_mem", "100014001", "ABCDE", "fetch", field, "nil")
            l2 = json.loads(l1)
            #return Response({"Msg": "ok"})
            products = l2["data"]
            excluded_products = ["Digital Queue", "My Channel", "Live Stream Dashboard", "Living Lab Scales", "Customer Experience", "Dowell Link Shortener", "Dowell Survey","Wifi QR Code","User Experience Live"]
            filtered_products = [product for product in products if product.get("product_name") not in excluded_products]
            return Response({"products": filtered_products})
    else:
        # No keys are present in the request body
        return Response({"message": "Access Denied"})



class ProductListView(APIView):
    def get(self, request, *args, **kwargs):
        fetch_field = {}
        fetch = dowellconnection("login","bangalore","login","prod_mem","prod_mem","100014001","ABCDE","fetch",fetch_field,"nil")
        a = json.loads(fetch)
        # Extract the relevant information from the 'a' variable
        product_info = []
        # return Response(a, status=status.HTTP_200_OK)
        for product_data in a["data"]:
            product_info.append({
                "product_name": product_data["product_name"],
                "product_url": product_data.get("product_link", ""),
                "product_logo": product_data.get("product_logo", ""),
                "product_status": product_data.get("product_status", ""),
            })
        data = {"data":product_info}
        print(type(data))
        return Response(data, status=status.HTTP_200_OK)


@api_view(["POST"])
def GetDocumentProducts(request):
    odata = request.data
    r1 = []
    if "username" in odata.keys():
        org = odata["username"]
        print("first")
        username = odata["username"]
        field1={"document_name":org}
        login1=dowellconnection("login","bangalore","login","client_admin","client_admin","1159","ABCDE","fetch",field1,"update")
        r=json.loads(login1)
        response = r["data"][0]["products"]

        # for p in r["data"][0]["products"]:
        #     if port in p["portfolio_name"]:
        #         r1.append(p)
        return Response({"products":response})

    else:
        return Response({"message":"Please provide username in body"})

    return Response({"products":response})


@api_view(["POST"])
def portfolioview(request):
    odata = request.data
    session = odata["session_id"]
    orl = odata["org_name"]
    portf= odata["portfolio"]
    user =  odata["username"]
    product=odata["product"]
    url="https://100014.pythonanywhere.com/api/userinfo/"
    resp=requests.post(url,data={"session_id":session})
    try:
        userinfo=json.loads(resp.text)
    except:
        return Response({"msg":"updated successfully."})
    mydict={}
    mydict["userinfo"]=userinfo["userinfo"]
    # ro=UserInfo.objects.all().filter(username=user)
    # ro1=UserOrg.objects.all().filter(username=user)
    if orl==user:
        lrst=[]
        field={"document_name":user}
        login=dowellconnection("login","bangalore","login","client_admin","client_admin","1159","ABCDE","fetch",field,"nil")
        resp=json.loads(login)
        lrf=resp["data"][0]
        for lis in lrf["portpolio"]:
            if lis["portfolio_name"]==portf:
                mydict["portfolio_info"]=[lis]
            if lis["product"]==product:
                lrst.append(lis)
        mydict["portfolio_info"][0]["org_id"]=lrf["_id"]
        mydict["portfolio_info"][0]["owner_name"]=lrf["document_name"]
        mydict["portfolio_info"][0]["org_name"]=lrf["document_name"]
        mydict["selected_product"]={"product_id":1,"product_name":product,"platformpermissionproduct":[{"type":"member","operational_rights":["view","add","edit","delete"],"role":"admin"}],"platformpermissiondata":["real","learning","testing","archived"],"orgid":lrf["_id"],"orglogo":"","ownerid":"","userportfolio":lrst,"payment_status":"unpaid"}
        obj, created = UserData.objects.update_or_create(username=user,sessionid=session,defaults={'alldata': json.dumps(mydict)})
        return Response(mydict)

    field={"document_name":orl}
    login=dowellconnection("login","bangalore","login","client_admin","client_admin","1159","ABCDE","fetch",field,"nil")
    resp=json.loads(login)
    ss=resp["data"][0]
    rr=ss["other_organisation"]
    rr1=ss["organisations"]
    #return HttpResponse(f'{rr}<br><br>{rr1}')
    for iii in rr:
        if iii["org_name"]==orl:
            try:
                if iii["portfolio_name"]==portf:
                    mydict["portfolio_info"]=[iii]

                else:
                    pass
            except:
                pass
    try:
        selected_role=mydict["portfolio_info"]["role"]
    except:
        pass
    level1={}
    level2={}
    level3={}
    level4={}
    level5={}
    try:
        for items in lrf["roles"]:
            if selected_role==items["role_name"]:
                if items["level1_item"]:
                    level1["level1name"]=lrf["organisations"][0]["level1"]["level_name"]
                    level1["level1items"]=lrf["organisations"][0]["level1"]["items"]
                if items["level2_item"]:
                    level2["level1name"]=lrf["organisations"][0]["level2"]["level_name"]
                    level2["level1items"]=lrf["organisations"][0]["level2"]["items"]
                if items["level3_item"]:
                    level2["level3name"]=lrf["organisations"][0]["level3"]["level_name"]
                    level2["level3items"]=lrf["organisations"][0]["level3"]["items"]
                if items["level4_item"]:
                    level2["level4name"]=lrf["organisations"][0]["level4"]["level_name"]
                    level2["level4items"]=lrf["organisations"][0]["level4"]["items"]
                if items["level5_item"]:
                    level2["level5name"]=lrf["organisations"][0]["level5"]["level_name"]
                    level2["level5items"]=lrf["organisations"][0]["level5"]["items"]
    except:
        pass
    if "portfolio_info" not in mydict:
        #return HttpResponse(f'{rr1}')
        mydict["portfolio_info"]=[ss["portpolio"][0]]
    productport=[]
    for product2 in lrf["portpolio"]:
        if product==product2["product"]:
            productport.append(product2)

    mydict["organisations"]=[{"orgname":lrf["document_name"],"orgowner":lrf["document_name"]}]
    mydict["selected_product"]={"product_id":1,"product_name":product,"platformpermissionproduct":[{"type":"member","operational_rights":["view","add","edit","delete"],"role":"admin"}],"platformpermissiondata":["real","learning","testing","archived"],"orgid":lrf["_id"],"orglogo":"","ownerid":"","userportfolio":productport,"payment_status":"unpaid"}
    mydict["selected_portfoliolevel"]=level1
    mydict["selected_portfolioleve2"]=level2
    mydict["selected_portfolioleve3"]=level3
    mydict["selected_portfolioleve4"]=level4
    mydict["selected_portfolioleve5"]=level5
    mydict["portfolio_info"][0]["org_id"]=lrf["_id"]
    mydict["portfolio_info"][0]["owner_name"]=lrf["document_name"]
    mydict["portfolio_info"][0]["org_name"]=lrf["document_name"]
    obj, created = UserData.objects.update_or_create(username=user,sessionid=session,defaults={'alldata': json.dumps(mydict)})
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
                external_product_index = next((index for (index, d) in enumerate(external_api_data['products']) if d['product_name'] == product_name), None)

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
                                'first_name':member_username,
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
        field1 = {"_id":"6453edc48ce736847236e6ca"}

        update1 = {"products" : external_api_data["products"]}
        # dowellconnection("login","bangalore","login","prod_mem","prod_mem","100014001","ABCDE","update",field1,update1)

    # Return the updated dictionaries for each member
    return Response({"message":"Successfully Updated"})



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


    field = {"product_name":product_name}
    update = {"product_status": owners,
      "team_members_status": team_members,
      "users_status": users,
      "public_status": public}
    dowellconnection("login","bangalore","login","prod_mem","prod_mem","100014001","ABCDE","update",field,update)

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
    product_data = dowellconnection("login", "bangalore", "login", "prod_mem", "prod_mem", "100014001", "ABCDE", "fetch", field, "nil")
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

    # Get both member lists
    paid_members = product["data"][0]["paid_members"]
    unpaid_members = product["data"][0]["unpaid_members"]

    # Determining the list of members to update and the opposite list
    target_members = paid_members if payment_status == "paid" else unpaid_members
    opposite_members = unpaid_members if payment_status == "paid" else paid_members

    # Updating the member data
    for username in members:
        # Find existing member in target list
        member = next((m for m in target_members if m['owner'] == username), None)

        # If member does not exist, create new member
        if not member:
            member = {
                "username": username,
                "owner": username,
                "first_name": username,
                "org_name": username,
                "status": product_status,
                "invite_users": invite_users,
                "invite_team_members": invite_team_members,
                "invite_public": invite_public
            }
            target_members.append(member)

        # Update existing/new member
        member["status"] = product_status
        member["invite_users"] = invite_users
        member["invite_team_members"] = invite_team_members
        member["invite_public"] = invite_public

        # If member exists in the opposite list, remove it
        opposite_member = next((m for m in opposite_members if m['owner'] == username), None)
        if opposite_member:
            opposite_members.remove(opposite_member)

    # Updating the product data
    field = {"product_name": product_name}
    update = {"paid_members": paid_members, "unpaid_members": unpaid_members}
    dowellconnection("login", "bangalore", "login", "prod_mem", "prod_mem", "100014001", "ABCDE", "update", field, update)
    updated_members=[]
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
        dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE", "update", field, update)
    return Response({"message": "Successfully Updated"})


@api_view(['POST'])
def filter_portfolio(request):
    username = request.data.get('username', None)
    product = request.data.get('product', None)

    # Check if username and product are provided
    if not username or not product:
        return Response({"detail": "Fields 'username' and 'product' are required."}, status=400)

    field={"document_name":username}
    login=dowellconnection("login","bangalore","login","client_admin","client_admin","1159","ABCDE","fetch",field,"nil")
    r=json.loads(login)

    # Check if the response has data
    if "data" not in r or not r["data"]:
        return Response({"detail": "No data found for the user."}, status=404)

    portfolio=r["data"][0]["portpolio"]
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




# @api_view(['POST'])
# def settings(request):
#     if request.method == 'POST':
#         if len(request.data) == 1 and 'username' in request.data:
#             username = request.data.get('username')
#             field_c = {"document_name": username}
#             login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
#                                      "fetch", field_c, "nil")
#             resp = json.loads(login)
#             product_list = resp["data"][0]["products"]
#             admin_id = resp["data"][0]["_id"]
#             field = {"admin_id": admin_id}
#             forg = dowellconnection("login", "bangalore", "login", "login_settings", "login_settings", "1202001",
#                                     "ABCDE",
#                                     "find", field, "nil")
#             settings_res = json.loads(forg)
#             return Response(settings_res, status=HTTP_200_OK)
#         username = request.data.get("username")
#         field_c = {"document_name": username}
#         login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
#                                  "fetch", field_c, "nil")
#         resp = json.loads(login)
#         product_list = resp["data"][0]["products"]
#         admin_id = resp["data"][0]["_id"]
#         field = {"admin_id": admin_id}
#         if product_list and isinstance(product_list[0], dict):
#             # iterate over the product list
#             for item in product_list:
#                 # check if product_name matches the product
#                 if item['product_name'] == request.data.get('product'):
#                     # update the product_status
#                     item['product_status'] = request.data.get('status')
#                     break
#         update_products = {"products": product_list}
#         dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE", "update",
#                          field, update_products)
#         field_l = {"admin_id": admin_id}
#         update = {}  # start with an empty dictionary
#         if request.data.get('product'):
#             update["product_name"] = request.data.get('product')
#         if request.data.get('status'):
#             update["product_status"] = request.data.get('status')
#         if request.data.get('selected_workspace'):
#             update["default_org"] = request.data.get('selected_workspace')
#         if request.data.get('timelimit_member'):
#             update["maxtime_member"] = request.data.get('timelimit_member')
#         if request.data.get('timelimit_users'):
#             update["maxtime_user"] = request.data.get('timelimit_users')
#         if request.data.get('selected_language'):
#             update["default_language"] = request.data.get('selected_language')
#         if request.data.get('minimum_speed'):
#             update["internet_min_speed"] = request.data.get('minimum_speed')
#         if request.data.get('speed_test'):
#             update["speed_test"] = request.data.get('speed_test')
#         if request.data.get('mandatory_sections'):
#             update["mandatory_sections"] = request.data.get('mandatory_sections')
#         if request.data.get('updated_product') and request.data.get('plans'):
#             product_plan = {
#                 "product_name": request.data.get('updated_product'),
#                 "plans": request.data.get('plans')}
#             update["product_plan"] = [product_plan]
#         if request.data.get('time_limit_disconnect'):
#             update["disconn_idle"] = request.data.get('time_limit_disconnect')
#         if request.data.get('time_limit_connect'):
#             update["permit_to_connect"] = request.data.get('time_limit_connect')
#         if request.data.get('permitted_attempts'):
#             update["no_of_conn"] = request.data.get('permitted_attempts')
#         if request.data.get('admin_process') and request.data.get('operational_rights') and request.data.get(
#                 'portfolio_list'):
#             process_portfolio = {
#                 "process": request.data.get('admin_process'),
#                 "rights": request.data.get('operational_rights'),
#                 "portfolios": request.data.get('portfolio_list')
#             }
#             update["processes_to_portfolio"] = [process_portfolio]
#         if request.data.get('notifications') == "Chat":
#             method = request.data.get('methods')
#             update["chat_method"] = method
#         if request.data.get('notifications') == "UX Living Lab":
#             method = request.data.get('methods')
#             update["uxlivinglab_method"] = method
#         if request.data.get('colour_patterns'):
#             update["color_scheme"] = request.data.get('colour_patterns')
#         dowellconnection("login", "bangalore", "login", "login_settings", "login_settings", "1202001", "ABCDE",
#                          "update", field_l, update)

#         return Response(update, status=HTTP_200_OK)
@api_view(['POST'])
def settings(request):
    if request.method == 'POST':
        admin_id = request.data.get("admin_id",None)
        field = {"admin_id": admin_id}
        forg = dowellconnection("login", "bangalore", "login", "login_settings", "login_settings", "1202001", "ABCDE", "find", field, "nil")
        field_user = {"username": request.data.get("username")}
        forg_user = dowellconnection("login", "bangalore", "login", "login_settings", "login_settings", "1202001", "ABCDE", "find", field_user, "nil")
        settings_res = json.loads(forg)
        settings_user = json.loads(forg_user)
        if settings_user["data"] is None:
            field_cc = {"document_name": request.data.get("username")}
            loginn = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                     "fetch", field_cc, "nil")
            respp = json.loads(loginn)
            admin_idd = respp["data"][0]["_id"]
            with open('organisation.json') as json_file:
                data = json.load(json_file)
                data["admin_id"] = admin_idd
                data["username"] = request.data.get("username")
                data["org_name"] = request.data.get("username")
                field1 = data
                dowellconnection("login", "bangalore", "login", "login_settings", "login_settings", "1202001", "ABCDE",
                                 "insert", field1, "nil")
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
        # if request.data.get('product'):
        #     update["product_name"] = request.data.get('product')
        # if request.data.get('status'):
        #     update["product_status"] = request.data.get('status')
        if request.data.get('product') and request.data.get('status') and product_list and isinstance(product_list[0], dict):
            # converted_products_full = [{"product_name": product["product_name"], "product_status": request.data.get('status')} for product in product_list]
            for product in product_list:
                if product['product_name'] == request.data.get('product'):
                    product['product_status'] = request.data.get('status')
                    break
            new_products = {"products": product_list}
            dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE", "update",
                         field_c, new_products)
        if request.data.get('product') and request.data.get('status') and isinstance(product_list[0], str):

            products_full = [
                {
                    "product_name": "Workflow AI",
                    "product_status": "enable"
                },
                {
                    "product_name": "Living Lab Chat",
                    "product_status": "enable"
                },
                {
                    "product_name": "Digital Queue",
                    "product_status": "enable"
                },
                {
                    "product_name": "Wifi QR Code",
                    "product_status": "enable"
                },
                {
                    "product_name": "User Experience Live",
                    "product_status": "enable"
                },
                {
                    "product_name": "Social Media Automation",
                    "product_status": "enable"
                },
                {
                    "product_name": "Living Lab Scales",
                    "product_status": "enable"
                },
                {
                    "product_name": "Logo Scan",
                    "product_status": "enable"
                },
                {
                    "product_name": "Legalzard",
                    "product_status": "enable"
                },
                {
                    "product_name": "Living Lab Maps",
                    "product_status": "enable"
                },
                {
                    "product_name": "Customer Experience",
                    "product_status": "enable"
                },
                {
                    "product_name": "Living Lab Admin",
                    "product_status": "enable"
                },
                {
                    "product_name": "Living Lab Monitoring",
                    "product_status": "enable"
                },
                {
                    "product_name": "Live Stream Dashboard",
                    "product_status": "enable"
                },
                {
                    "product_name": "Sales Agent",
                    "product_status": "enable"
                },
                {
                    "product_name": "Permutation Calculator",
                    "product_status": "enable"
                },
                {
                    "product_name": "Dowell Customer Support Centre",
                    "product_status": "enable"
                },
                {
                    "product_name": "Secure Github Repository",
                    "product_status": "enable"
                },
                {
                    "product_name": "Secure Data",
                    "product_status": "enable"
                },
                {
                    "product_name": "Team Management",
                    "product_status": "enable"
                },
                {
                    "product_name": "My Channel",
                    "product_status": "enable"
                },
                {
                    "product_name": "Dowell Services",
                    "product_status": "enable"
                },
                {
                    "product_name": "Dowell Link Shortener",
                    "product_status": "enable"
                },
                {
                    "product_name": "Dowell Wallet",
                    "product_status": "enable"
                }
            ]
            for product in products_full:
                if product['product_name'] == request.data.get('product'):
                    product['product_status'] = request.data.get('status')
                    break
            new_products = {"products": products_full}
            dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE", "update",
                         field_c, new_products)

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
        if request.data.get('speed_test'):
            update["speed_test"] = request.data.get('speed_test')
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
        process_data = request.data.get('process')
        if process_data:
            processes_to_portfolio = []
            for process_item in process_data:
                process_name, process_details = process_item.popitem()
                process_portfolio = {
                    process_name: {
                        "rights": process_details.get('rights'),
                        "portfolios": process_details.get('portfolios', [])
                    }
                }
                processes_to_portfolio.append(process_portfolio)
            update["processes_to_portfolio"] = processes_to_portfolio
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
def find_public(request):
    if request.method == 'POST':
        id = request.data.get("org_id")
        product = request.data.get("product")
        field_c = {"_id": id}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "fetch", field_c, "nil")
        ##########################################
        resp = json.loads(login)
        data = resp['data']

        # Organization name
        portfolio = data[0]['portpolio']
        usernames = []

        for item in portfolio:
            # Check if the item has the required product and member_type
            if item.get('product') == product and item.get('member_type') == "public":
                # Add the usernames to the list, ensuring it's a list
                if isinstance(item.get('username'), list):
                    usernames.extend(item.get('username'))

        return Response({
            "usernames": usernames        }, status=HTTP_200_OK)



@api_view(['POST'])
def remove_public(request):
    if request.method == 'POST':
        id = request.data.get("org_id")
        username = request.data.get("username")
        sessionid = request.data.get("session_id")
        usernames_to_remove = request.data.get('usernames')
        product = request.data.get('product')
        portfolio_code = request.data.get('portfolio_code')
        # fetch = UserData.objects.filter(username=username,sessionid=sessionid)

        # for rd in fetch:
        #     lo1=rd.alldata
        #     lrf=json.loads(lo1)

        # for entry in lrf["selected_product"]["userportfolio"]:
        #     if entry['member_type'] == 'public' and entry['product'] == product and entry['portfolio_code']==portfolio_code:
        #         entry['username'] = [username for username in entry['username'] if username not in usernames_to_remove]

        # return Response(lrf["selected_product"]["userportfolio"])




        if not usernames_to_remove or not isinstance(usernames_to_remove, list):
            return Response({"error": "Invalid 'usernames' format. Expected a list."}, status=400)

        if not product or not isinstance(product, str):
            return Response({"error": "Invalid 'product' format. Expected a string."}, status=400)

        field_c = {"_id": id}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "fetch", field_c, "nil")
        ##########################################
        resp = json.loads(login)
        data = resp['data']

        # Organization name
        portfolio = data[0]['portpolio']
        usernames = []
        for entry in portfolio:
            if entry['member_type'] == 'public' and entry['product'] == product and entry['portfolio_code']==portfolio_code:
                entry['username'] = [username for username in entry['username'] if username not in usernames_to_remove]


        updated_portfolio = {"portpolio":portfolio}
        dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE", "update",
                         field_c, updated_portfolio)

        # fetch = UserData.objects.filter(username=username,sessionid=sessionid)

        field_n = {"session_id":sessionid}
        l1 = dowellconnection("login","bangalore","login","company","company","1083","ABCDE","fetch",field_n,"nil")
        userdata_n = json.loads(l1)

        # return Response({"data":userdata_n})


        # for rd in userdata_n:
        #     lo1=rd.alldata
        #     lrf=json.loads(lo1)

        for entry in userdata_n["data"][0]["user_data"]["selected_product"]["userportfolio"]:
            if entry['member_type'] == 'public' and entry['product'] == product and entry['portfolio_code']==portfolio_code:
                entry['username'] = [username for username in entry['username'] if username not in usernames_to_remove]
        # return Response({"msg":json.dumps(lrf)})
        # obj, created = UserData.objects.update_or_create(username=username,sessionid=sessionid,defaults={'alldata': json.dumps(lrf)})

        update_user = {"user_data":userdata_n}

        dowellconnection("login","bangalore","login","company","company","1083","ABCDE","update",field_n,update_user)

        # return Response({"data":userdata_n})
        return Response({
            "success": "updated"        }, status=HTTP_200_OK)



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


# @api_view(['POST'])
# def create_item(request):
#     if request.method == 'POST':
#         username = request.data.get("username")
#         level = request.data.get("level")
#         item_name = request.data.get("item_name")
#         item_code = request.data.get("item_code")
#         item_spec = request.data.get("item_spec")
#         item_unicode = request.data.get("item_unicode")
#         item_details = request.data.get("item_details")
#         item_barcode = ""
#         item_image1 = ""
#         item_image2 = ""
#         field = {"document_name": username}
#         userorg = UserOrg.objects.all().filter(username=username)
#         for i in userorg:
#             o = i.org
#             odata = json.loads(o)
#         org = odata["organisations"]
#         for i_name in org[0][level]["items"]:
#             if item_name in i_name['item_name'] or item_code in i_name['item_code']:
#                 return Response("data must be unique", status=HTTP_400_BAD_REQUEST)
#         org[0][level]["items"].append(
#             {"item_name": item_name, "item_code": item_code, "item_details": item_details,
#              "item_universal_code": item_unicode,
#              "item_specification": item_spec, "item_barcode": item_barcode, "item_image1": item_image1,
#              "item_image2": item_image2,
#              "status": "enable"})
#         update = {"organisations": org}
#         dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
#                          "update", field, update)
#         odata["organisations"] = org
#         UserOrg.objects.update_or_create(username=username, defaults={'org': json.dumps(odata)})
#         return Response("success", status=HTTP_200_OK)
@api_view(['POST'])
def create_item(request):
    if request.method != 'POST':
        return Response("Invalid request method", status=HTTP_400_BAD_REQUEST)

    try:
        username = request.data.get("username")
        level = request.data.get("level")
        item_code = request.data.get("item_code")

        userorg = UserOrg.objects.filter(username=username).first()
        if not userorg:
            return Response("User not found", status=HTTP_404_NOT_FOUND)

        odata = json.loads(userorg.org)
        org = odata["organisations"]
        field = {"document_name": username}
        for i_name in org[0][level]["items"]:
            if item_code == i_name['item_code']:
                return Response("Item code must be unique", status=HTTP_400_BAD_REQUEST)

        new_item = {
            "item_name": request.data.get("item_name"),
            "item_code": item_code,
            "item_details": request.data.get("item_details"),
            "item_universal_code": request.data.get("item_unicode"),
            "item_specification": request.data.get("item_spec"),
            "item_barcode": "",
            "item_image1": "",
            "item_image2": "",
            "status": "enable"
        }

        org[0][level]["items"].append(new_item)

        # Update the database here. Assuming 'dowellconnection' function does that.
        # Handle exceptions or errors that might occur during the update.
        update = {"organisations": org}
        dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                         "update", field, update)
        userorg.org = json.dumps(odata)
        userorg.save()
        return Response("Item created successfully", status=HTTP_201_CREATED)

    except Exception as e:
        # Log the exception here
        return Response(str(e), status=HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def get_data(request):
    if request.method == 'POST':
        username = request.data.get("username")
        field_c = {"document_name": username}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "fetch", field_c, "nil")
        try:
            session_id = request.data.get("session_id")
            # print("SESSION",session_id)
        except:
            pass

        ##########################################
        resp = json.loads(login)
        obj, created = UserOrg.objects.update_or_create(username=username,defaults={'org': json.dumps(resp["data"][0])})

        if session_id:
            url="https://100014.pythonanywhere.com/api/userinfo/"
            resp1=requests.post(url,data={"session_id":session_id})
            try:
                user=json.loads(resp1.text)
            except:
                return HttpResponse('<style>body{background-color: rgba(0,0,0, 0.4);}.close-btn {position: absolute;bottom: 12px;right: 25px;}.content {position: absolute;width: 250px;height: 200px;background: #fff;top: 0%;left: 50%;transform: translate(-50%, -50%)scale(0.1);visibility: hidden;transition: transform 0.4s, top 0.4s;}.open-popup {visibility: visible;top: 50%;transform: translate(-50%, -50%)scale(1);}.header {height: 50px;background: #efea53;overflow: hidden;text-align: center;}p {padding-top: 40px;text-align: center;}</style><div class="content open-popup" id="popup"><div class="header"><h2>Alert!</h2></div><p>Some thing went wrong pl <a href="/logout" >logout </a> <a href="/">login</a> again</p><div><button type="button" onclick="history.back();" class="close-btn">close</button></div></div>')

            # print(user["userinfo"]["username"])
            obj, created = UserInfo.objects.update_or_create(username=user["userinfo"]["username"],defaults={'userinfo': json.dumps(user["userinfo"])})
        return Response(resp)
        data = resp['data']

        return Response(
            data
            , status=HTTP_200_OK)

@api_view(['POST'])
def get_data_id(request):
    if request.method == 'POST':
        id = request.data.get("id")
        field_c = {"_id": id}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "fetch", field_c, "nil")
        ##########################################
        resp = json.loads(login)
        return Response(resp)
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

                link_string= f"?members=all&username=&owner_name={username}&org_name={presentorg}&type=public&code=masterlink&product={product}&data_type={data_type}&operations_right={op_rights}&role={role}&portfolio_name={portfolio_name}&portfolio_code={portfolio_code}&portfolio_specification={portfolio_spec}&portfolio_uni_code={portfolio_u_code}&portfolio_details={portfolio_det}&status=enable"
                encrypted = encrypt_message(link_string, crpassword,saved_salt)
                master_link = f"https://100014.pythonanywhere.com/linklogin?data={encrypted}"
                user = passgen.generate_random_password1(12)
                linkcode = passgen.generate_random_password1(16)
                qrcodegen.qrgen1(master_link, user, f"clientadmin/media/userqrcodes/{user}.png")
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
                obj, created = AllPubPortfolio.objects.update_or_create(masterlink=master_link,qrcode=f"https://100093.pythonanywhere.com/media/userqrcodes/{user}.png",product=product,defaults={'username': username})
                return Response(
                    {"success": f'{portfolio_name} successfully created',
                     "masterlink": f"your masterlink is {master_link}","qrcode": f"https://100093.pythonanywhere.com/media/userqrcodes/{user}.png"}, status=HTTP_200_OK)
            except Exception as e:
                return Response({"error": f"Error while creating public members {e}"})

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


# @api_view(['POST'])
# def create_role(request):
#     if request.method == 'POST':
#         username = request.data.get("username")
#         level1 = request.data.get('level1_item')
#         level2 = request.data.get('level2_item')
#         level3 = request.data.get('level3_item')
#         level4 = request.data.get('level4_item')
#         level5 = request.data.get('level5_item')
#         security = request.data.get('security_layer')
#         role_name = request.data.get('role_name')
#         role_code = request.data.get('role_code')
#         role_spec = request.data.get('role_spec')
#         roleucode = request.data.get('role_u_code')
#         role_det = request.data.get('role_det')
#         required_fields = [username, security, role_name, role_code]
#         for field in required_fields:
#             if field is None:
#                 return Response("Please ensure data for all required fields are present", status=HTTP_400_BAD_REQUEST)
#         response_data = {"level1_item": level1, "level2_item": level2, "level3_item": level3,
#                          "level4_item": level4, "level5_item": level5, "security_layer": security,
#                          "role_name": role_name, "role_code": role_code, "role_details": role_det,
#                          "role_uni_code": roleucode, "role_specification": role_spec, "status": "enable"}
#         userorg = UserOrg.objects.all().filter(username=username)
#         for i in userorg:
#             o = i.org
#             odata = json.loads(o)
#         roles = odata["roles"]
#         # print(roles)
#         for checkroles in roles:
#             if checkroles["role_name"] == role_name or checkroles["role_code"] == role_code:
#                 return Response("Role name and code Must Be Unique", status=HTTP_400_BAD_REQUEST)
#         odata["roles"].append(response_data)
#         rle = odata["roles"]
#         obj, created = UserOrg.objects.update_or_create(username=username, defaults={'org': json.dumps(odata)})
#         field = {"document_name": username}
#         update = {"roles": rle}
#         login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
#                                  "update", field, update)
#         # print(login)
#         return Response(f"{role_name} successfully created", status=HTTP_200_OK)


@api_view(['POST'])
def create_role(request):
    if request.method != 'POST':
        return Response("Invalid request method", status=HTTP_400_BAD_REQUEST)

    try:
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

        # Check for required fields
        required_fields = [username, security, role_name, role_code]
        for field in required_fields:
            if field is None:
                return Response("Please ensure data for all required fields are present", status=HTTP_400_BAD_REQUEST)

        # Retrieve user data
        userorg = UserOrg.objects.filter(username=username).first()
        if not userorg:
            return Response("User not found", status=HTTP_404_NOT_FOUND)

        odata = json.loads(userorg.org)
        roles = odata["roles"]

        # Check if role code is unique
        for checkroles in roles:
            if checkroles["role_code"] == role_code:
                return Response("Role code must be unique", status=HTTP_400_BAD_REQUEST)

        # Create response data
        response_data = {
            "level1_item": level1,
            "level2_item": level2,
            "level3_item": level3,
            "level4_item": level4,
            "level5_item": level5,
            "security_layer": security,
            "role_name": role_name,
            "role_code": role_code,
            "role_details": role_det,
            "role_uni_code": roleucode,
            "role_specification": role_spec,
            "status": "enable"
        }

        # Append new role data
        roles.append(response_data)

        # Update the database
        odata["roles"] = roles
        userorg.org = json.dumps(odata)
        userorg.save()

        # Assuming 'dowellconnection' function does the required update
        field = {"document_name": username}
        update = {"roles": roles}
        dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                         "update", field, update)

        return Response(f"{role_name} successfully created", status=HTTP_201_CREATED)

    except Exception as e:
        # Log the exception here
        return Response(str(e), status=HTTP_500_INTERNAL_SERVER_ERROR)

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


# @api_view(['POST'])
# def create_team_member(request):
#     if request.method == 'POST':
#         username = request.data.get("username")
#         member_name = request.data.get('member_name')
#         member_code = request.data.get('member_code')
#         member_spec = request.data.get('member_spec', "")
#         member_u_code = request.data.get('member_u_code', "")
#         member_det = request.data.get('member_det', "")
#         membername = base64.b64encode(bytes(member_name, 'utf-8')).decode()  # bytes
#         membercode = base64.b64encode(bytes(member_code, 'utf-8')).decode()
#         memberspec = base64.b64encode(bytes(member_spec, 'utf-8')).decode()
#         memberucode = base64.b64encode(bytes(member_u_code, 'utf-8')).decode()
#         memberdet = base64.b64encode(bytes(member_det, 'utf-8')).decode()
#         teammembers = base64.b64encode(bytes("team_members", 'utf-8')).decode()
#         field_c = {"document_name": username}
#         login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
#                                  "fetch", field_c, "nil")
#         resp = json.loads(login)
#         data = resp['data']
#         # orgnames = data[0]['organisations'][0]['org_name']


#         field_user = {"username": username}
#         forg_user = dowellconnection("login", "bangalore", "login", "login_settings", "login_settings", "1202001", "ABCDE", "find", field_user, "nil")
#         settings_user = json.loads(forg_user)
#         current_datetime = datetime.datetime.now()
#         if len(settings_user["data"]["maxtime_member"]) > 0:
#             current_datetime = datetime.datetime.now()

#             # Calculating the new date and time by adding 'a' hours
#             new_datetime = current_datetime + timedelta(hours=int(settings_user["data"]["maxtime_member"]))
#             link_exp = new_datetime
#         else:
#             link_exp = current_datetime + timedelta(hours=12)
#         orgnames = username
#         members_data = data[0]['members']
#         accepted_members = members_data['team_members']['accept_members']
#         pending_members = members_data['team_members']['pending_members']
#         accepted_member_codes = [member.get('member_code') for member in accepted_members]
#         pending_member_codes = [member.get('member_code') for member in pending_members]

#         orgname = base64.b64encode(bytes(orgnames, 'utf-8')).decode()
#         link = f"https://100014.pythonanywhere.com/?org={orgname}&type={teammembers}&name={membername}&code={membercode}&spec={memberspec}&u_code={memberucode}&detail={memberdet}"

#         # Check if member_code already exists in accepted or pending member codes
#         if member_code in accepted_member_codes:
#             return Response({"error": "Member code already exists."}, status=status.HTTP_400_BAD_REQUEST)
#         if member_code in pending_member_codes:
#             return Response({"error": "Member code already exists."}, status=status.HTTP_400_BAD_REQUEST)

#         userorg = UserOrg.objects.all().filter(username=username)
#         if userorg:
#             for i in userorg:
#                 o = i.org
#                 odata = json.loads(o)
#         tmembers = {"name": member_name, "member_code": member_code, "member_spec": member_spec,
#                     "member_uni_code": member_u_code, "member_details": member_det, "link": link,
#                     "status": "unused","link_exp":link_exp.isoformat()}

#         odata["members"]["team_members"]["pending_members"].append(tmembers)
#         field = {"document_name": username}
#         mem = odata["members"]
#         update = {"members": mem}
#         login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
#                                  "update", field, update)
#         obj, created = UserOrg.objects.update_or_create(username=username, defaults={'org': json.dumps(odata)})
#         response_data = {"link": link}
#         return Response(response_data, status=status.HTTP_200_OK)

@api_view(['POST'])
def create_team_member(request):
    if request.method != 'POST':
        return Response("Invalid request method", status=status.HTTP_400_BAD_REQUEST)

    try:
        username = request.data.get("username")
        member_name = request.data.get('member_name')
        member_code = request.data.get('member_code')
        member_spec = request.data.get('member_spec', "")
        member_u_code = request.data.get('member_u_code', "")
        member_det = request.data.get('member_det', "")

        # Base64 encoding for security
        membername = base64.b64encode(bytes(member_name, 'utf-8')).decode()
        membercode = base64.b64encode(bytes(member_code, 'utf-8')).decode()
        memberspec = base64.b64encode(bytes(member_spec, 'utf-8')).decode()
        memberucode = base64.b64encode(bytes(member_u_code, 'utf-8')).decode()
        memberdet = base64.b64encode(bytes(member_det, 'utf-8')).decode()
        teammembers = base64.b64encode(bytes("team_members", 'utf-8')).decode()

        # Fetching user data from Dowell connection
        field_c = {"document_name": username}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "fetch", field_c, "nil")
        resp = json.loads(login)
        data = resp['data']

        # Fetching user settings
        field_user = {"username": username}
        forg_user = dowellconnection("login", "bangalore", "login", "login_settings", "login_settings", "1202001",
                                     "ABCDE", "find", field_user, "nil")
        settings_user = json.loads(forg_user)
        current_datetime = datetime.datetime.now()
        if len(settings_user["data"]["maxtime_member"]) > 0:
            # current_datetime = datetime.datetime.now()

            # Calculating the new date and time by adding 'a' hours
            new_datetime = current_datetime + timedelta(hours=int(settings_user["data"]["maxtime_member"]))
            link_exp = new_datetime
        else:
            link_exp = current_datetime + timedelta(hours=12)

        orgnames = username
        members_data = data[0]['members']
        accepted_members = members_data['team_members']['accept_members']
        pending_members = members_data['team_members']['pending_members']
        accepted_member_codes = [member.get('member_code') for member in accepted_members]
        pending_member_codes = [member.get('member_code') for member in pending_members]

        orgname = base64.b64encode(bytes(orgnames, 'utf-8')).decode()
        link = f"https://100014.pythonanywhere.com/?org={orgname}&type={teammembers}&name={membername}&code={membercode}&spec={memberspec}&u_code={memberucode}&detail={memberdet}"

        # Check if member_code already exists in accepted or pending member codes
        if member_code in accepted_member_codes or member_code in pending_member_codes:
            return Response({"error": "Member code already exists."}, status=status.HTTP_400_BAD_REQUEST)

        # Update organization data with the new team member
        userorg = UserOrg.objects.filter(username=username).first()
        if not userorg:
            return Response("User not found", status=status.HTTP_404_NOT_FOUND)

        odata = json.loads(userorg.org)
        tmembers = {
            "name": member_name,
            "member_code": member_code,
            "member_spec": member_spec,
            "member_uni_code": member_u_code,
            "member_details": member_det,
            "link": link,
            "status": "unused",
            "link_exp": link_exp.isoformat()
        }
        odata["members"]["team_members"]["pending_members"].append(tmembers)

        # Update the database
        userorg.org = json.dumps(odata)
        userorg.save()

        # Assuming 'dowellconnection' function does the required update
        field = {"document_name": username}
        mem = odata["members"]
        update = {"members": mem}
        dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                         "update", field, update)

        response_data = {"link": link}
        return Response(response_data, status=status.HTTP_201_CREATED)

    except Exception as e:
        # Log the exception here
        return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# def calculate_link_expiry(settings_user):
#         current_datetime = datetime.datetime.now()
#         if len(settings_user["data"]["maxtime_member"]) > 0:
#             current_datetime = datetime.datetime.now()

#             # Calculating the new date and time by adding 'a' hours
#             new_datetime = current_datetime + timedelta(hours=int(settings_user["data"]["maxtime_member"]))
#             link_exp = new_datetime
#         else:
#             link_exp = current_datetime + timedelta(hours=12)
#         return link_exp
#     return None

# @api_view(['POST'])
# def create_user_member(request):
#     if request.method == 'POST':
#         username = request.data.get("username")
#         user_name = request.data.get('user_name')
#         user_code = request.data.get('user_code')
#         user_spec = request.data.get('user_spec', "")
#         user_u_code = request.data.get('user_u_code', "")
#         user_det = request.data.get('user_det', "")
#         membername = base64.b64encode(bytes(user_name, 'utf-8')).decode()  # bytes
#         membercode = base64.b64encode(bytes(user_code, 'utf-8')).decode()
#         memberspec = base64.b64encode(bytes(user_spec, 'utf-8')).decode()
#         memberucode = base64.b64encode(bytes(user_u_code, 'utf-8')).decode()
#         memberdet = base64.b64encode(bytes(user_det, 'utf-8')).decode()
#         teammembers = base64.b64encode(bytes("guest_members", 'utf-8')).decode()
#         field_c = {"document_name": username}
#         login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
#                                  "fetch", field_c, "nil")
#         resp = json.loads(login)
#         data = resp['data']
#         orgnames = ""
#         members_data = data[0]['members']
#         accepted_members = members_data['guest_members']['accept_members']
#         accepted_member_codes = [member.get('member_code') for member in accepted_members]
#         orgname1 = base64.b64encode(bytes(orgnames, 'utf-8')).decode()
#         link = f"https://100014.pythonanywhere.com/?org={orgname1}&type={teammembers}&name={membername}&code={membercode}&spec={memberspec}&u_code={memberucode}&detail={memberdet}"

#         # Check if member_code already exists in accepted or pending member codes
#         if user_code in accepted_member_codes:
#             return Response({"error": "Guest Member code already exists."}, status=status.HTTP_400_BAD_REQUEST)

#         userorg = UserOrg.objects.all().filter(username=username)
#         if userorg:
#             for i in userorg:
#                 o = i.org
#                 odata = json.loads(o)
#         gmembers = {"name": user_name, "member_code": user_code, "member_spec": user_spec,
#                     "member_uni_code": user_u_code, "member_details": user_det, "link": link,
#                     "status": "unused"}
#         odata["members"]["guest_members"]["pending_members"].append(gmembers)
#         field = {"document_name": username}
#         mem = odata["members"]
#         update = {"members": mem}
#         login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
#                                  "update", field, update)
#         obj, created = UserOrg.objects.update_or_create(username=username, defaults={'org': json.dumps(odata)})
#         response_data = {"link": link}
#         return Response(response_data, status=status.HTTP_200_OK)

@api_view(['POST'])
def create_user_member(request):
    if request.method != 'POST':
        return Response("Invalid request method", status=status.HTTP_400_BAD_REQUEST)

    try:
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

        # Fetching user data from Dowell connection
        field_c = {"document_name": username}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "fetch", field_c, "nil")
        resp = json.loads(login)
        data = resp['data']
        orgnames = ""
        members_data = data[0]['members']
        accepted_members = members_data['guest_members']['accept_members']
        accepted_member_codes = [member.get('member_code') for member in accepted_members]
        pending_members = members_data['guest_members']['pending_members']
        pending_member_codes = [member.get('member_code') for member in pending_members]


        orgname1 = base64.b64encode(bytes(orgnames, 'utf-8')).decode()

        link = f"https://100014.pythonanywhere.com/?org={orgname1}&type={teammembers}&name={membername}&code={membercode}&spec={memberspec}&u_code={memberucode}&detail={memberdet}"

        # Check if member_code already exists in accepted or pending member codes
        if user_code in accepted_member_codes or user_code in pending_member_codes:
            return Response({"error": "Guest Member code already exists."}, status=status.HTTP_400_BAD_REQUEST)

        # Update organization data with the new guest member
        userorg = UserOrg.objects.filter(username=username).first()
        if not userorg:
            return Response("User not found", status=status.HTTP_404_NOT_FOUND)

        odata = json.loads(userorg.org)
        gmembers = {
            "name": user_name,
            "member_code": user_code,
            "member_spec": user_spec,
            "member_uni_code": user_u_code,
            "member_details": user_det,
            "link": link,
            "status": "unused"
        }
        odata["members"]["guest_members"]["pending_members"].append(gmembers)

        # Update the database
        userorg.org = json.dumps(odata)
        userorg.save()

        # Assuming 'dowellconnection' function does the required update
        field = {"document_name": username}
        mem = odata["members"]
        update = {"members": mem}
        dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                         "update", field, update)

        response_data = {"link": link}
        return Response(response_data, status=status.HTTP_201_CREATED)

    except Exception as e:
        # Log the exception here
        return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def productlanding(request):
    # request data
    data = {
        "username": request.data.get("username"),
        "password": request.data.get("password"),
        "location": request.data.get("location"),
        "device": request.data.get("device"),
        "os": request.data.get("os"),
        "time": request.data.get("time"),
        "ip": request.data.get("ip"),
    }

    # make a post request to the API
    response = requests.post("https://100014.pythonanywhere.com/api/mobilelogin/", data=data)

    # check if the request was successful
    if response.status_code == 200:
        session_id = response.json().get("session_id")

        # save the session_id and other data to variables
        portfolio = request.data.get("portfolio")
        product = request.data.get("product")
        username = request.data.get("username")
        org = request.data.get("org")

        # construct the final URL
        final_url = f"https://100093.pythonanywhere.com/exportfolio?session_id={session_id}&portfolio={portfolio}&product={product}&username={username}&org={org}"

        return Response({"url": final_url}, status=200)

    # if the request was not successful, return an error message
    return Response({"error": "Unable to authenticate"}, status=400)


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

@api_view(['GET'])
def get_roles(request,client_id):
    if request.method == 'GET':
        # Get the 'username' from the POST data
        # client_id = request.data.get("client_id")

        # Create the field conditions for querying
        field_c = {"_id": client_id}

        # Make the API call using 'dowellconnection'
        try:
            login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                     "fetch", field_c, "nil")

            # Parse the API response
            resp = json.loads(login)
            data = resp['data']
        except:
            return Response({"msg":"Invalid Client ID"}, status=HTTP_400_BAD_REQUEST)
        roles = []  # Rename 'value' to a more meaningful name

        # Get the name of the first organization and add it to the list if it doesn't match the username
        roles = data[0]['roles']

        # Return the list of workspace names in the response
        return Response(roles, status=HTTP_200_OK)

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
    try:
        # s= a["data"]
        PRODUCT_URLS = {
                "Dowell Services": "https://ll05-ai-dowell.github.io/100105-DowellApiKeySystem/?session_id={session_id}&id=100093",
                "My Channel": "https://dowell-my-channel.flutterflow.app/?session_id={session_id}&id=100093",
                "Workflow AI": "https://ll04-finance-dowell.github.io/workflowai.online/#?session_id={session_id}&id=100093",
                "Digital": "https://dowell-digitalq-manager.flutterflow.app/?session_id={session_id}&id=100093",
                "Maps": "https://livinglab-maps.flutterflow.app/?session_id={session_id}&id=100093",
                "Scale": "https://ll08-mathematicalmodelling-dowell.github.io/100035-DowellScale-Function/?session_id={session_id}&id=100093",
                "Legalzard": "https://play.google.com/store/apps/details?id=com.legalzard.policies",
                "Calculator": "https://100050.pythonanywhere.com/calculator/?session_id={session_id}&id=100093",
                "Team": "https://ll07-team-dowell.github.io/Jobportal/#?session_id={session_id}&id=100093",
                "Media": "https://www.socialmediaautomation.uxlivinglab.online/?session_id={session_id}&id=100093",
                "Customer": "https://ll03-identity-dowell.github.io/100096-customer-support/#?session_id={session_id}&id=100093",
                "Chat": "https://ll03-identity-dowell.github.io/100096-DowellChat/#/living-lab-chat/?session_id={session_id}&id=100093",
                "Wifi": "https://l.ead.me/dowellwifiqrcode/?session_id={session_id}&id=100093",
                "Wallet": "https://ll04-finance-dowell.github.io/100088-dowellwallet/#/login/?session_id={session_id}&id=100093",
                "Dowell Link Shortener": "https://ll06-reports-analysis-dowell.github.io/100056-DowellQRCodeGenertor2.0/?session_id={session_id}&id=100093",
                "Secure Github Repository": "https://ll07-team-dowell.github.io/100045-SecureRepository/?session_id={session_id}&id=100093",
                "Dowell Survey":"https://dowelllabs.github.io/DoWell-Survey/"
                # Add more products as needed
            }
        if request.method == "POST" and "connect_portfolio" in request.data.get("action"):
            user = request.data.get("username")
            portf = request.data.get("portfl")
            action = request.data.get("action")
            product = request.data.get("product")
            orl = request.data.get("present_org")
            session = request.data.get("session_id")
            # print("Product passed",product)
            # if request.data.get("portfolio_name") and


            if "Dowell Services" in product:
                return Response(
                        f'https://ll05-ai-dowell.github.io/100105-DowellApiKeySystem/?session_id={session}&id=100093',status=HTTP_200_OK)


            # try:
            #     lo=UserOrg.objects.all().filter(username=orl)
            # except:
            #     return HttpResponse("User Org Not Found in Local Database")


            # if not lo.exists():
            #     user_f = orl
            #     field_c = {"document_name": user_f}
            #     login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
            #                             "fetch", field_c, "nil")

            #     ##########################################
            #     resp = json.loads(login)
            #     obj, created = UserOrg.objects.update_or_create(username=user_f,defaults={'org': json.dumps(resp["data"][0])})

            # lo=UserOrg.objects.all().filter(username=orl)


            user_f = orl
            field_c = {"document_name": user_f}
            login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                    "fetch", field_c, "nil")

            ##########################################
            resp = json.loads(login)

            # for rd in lo:
            #     lo1=rd.org
            #     lrf=json.loads(lo1)
            lrf = resp["data"][0]
            mydict={}
            # if "API" in product:
            #     return redirect(f'https://ll05-ai-dowell.github.io/100105-DowellApiKeySystem/?session_id={request.session["session_id"]}&id=100093')

            ro=UserInfo.objects.all().filter(username=user)
            # ro1=UserOrg.objects.all().filter(username=user)

            user_u = user
            field_u = {"document_name": user_u}
            login_u = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                    "fetch", field_u, "nil")

            ##########################################
            resp_u = json.loads(login_u)

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
            # try:
            #     print(s)
            # except:
            #     pass
            if orl==user:
                lrst=[]
                for lis in lrf["portpolio"]:
                    # Check if 'portfolio_code' key is not present and skip
                    if "portfolio_code" not in lis:
                        continue

                    # print(lis)
                    if lis["product"] == "all":
                        lis["product"]= product


                    if str(lis["portfolio_code"]) == portf:

                        mydict["portfolio_info"] = [lis]


                    # Assuming 'product' is always present in 'lis', or you'd need to add another check
                    if lis["product"] in product and len(lis["username"]) > 0:
                        lrst.append(lis)
                    # print(lrst)
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
                    return Response(f"Data Not Found{e}")
                mydict["selected_product"]={"product_id":1,"product_name":product,"platformpermissionproduct":[{"type":"member","operational_rights":["view","add","edit","delete"],"role":"admin"}],"platformpermissiondata":["real","learning","testing","archived"],"orgid":lrf["_id"],"orglogo":"","ownerid":"","userportfolio":lrst,"payment_status":"unpaid"}
                # return JsonResponse({"msg":mydict})
                print("USER",user)
                field_n = {"session_id":session}
                l1 = dowellconnection("login","bangalore","login","company","company","1083","ABCDE","fetch",field_n,"nil")
                userdata_n = json.loads(l1)
                if len(userdata_n["data"]) > 0:
                    update_user = {"user_data":mydict}
                    dowellconnection("login","bangalore","login","company","company","1083","ABCDE","update",field_n,update_user)
                else:
                    insert_user = {"session_id":session,"user":user,"user_data":mydict}
                    dowellconnection("login","bangalore","login","company","company","1083","ABCDE","insert",insert_user,"nil")


                # obj, created = UserData.objects.update_or_create(username=user,sessionid=session,defaults={'alldata': json.dumps(mydict)})

                # print("connecting product owner org is",product)
                # if product == "My Channel":
                #     product = "dowell_channel"
                # if "Workflow AI" in product or "workflow" in product:
                #     if s["User_type"] == "betatester":
                #         return Response(
                #             f'https://ll04-finance-dowell.github.io/100018-dowellWorkflowAi-testing/#/?session_id={session}&id=100093',status=HTTP_200_OK)
                #     else:
                #         # return redirect(f'https://ll04-finance-dowell.github.io/100018-dowellWorkflowAi-testing/?session_id={request.session["session_id"]}&id=100093')
                #         return Response(
                #             f'https://ll04-finance-dowell.github.io/workflowai.online/#?session_id={session}&id=100093',status=HTTP_200_OK)

                # elif "Digital" in product:
                #     return Response(f'https://dowell-digitalq-manager.flutterflow.app/?session_id={session}&id=100093',status=HTTP_200_OK)
                # elif "Maps" in product:
                #     return Response(f'https://livinglab-maps.flutterflow.app/?session_id={session}&id=100093',status=HTTP_200_OK)
                # elif "Scale" in product or "scales" in product:
                #     return Response(
                #         f'https://ll08-mathematicalmodelling-dowell.github.io/100035-DowellScale-Function/?session_id={session}&id=100093',status=HTTP_200_OK)
                # elif "Legalzar" in product or "Legalzard" in product:
                #     return Response(f'https://play.google.com/store/apps/details?id=com.legalzard.policies',status=HTTP_200_OK)
                # elif "Calculator" in product:
                #     return Response(
                #         f'https://100050.pythonanywhere.com/calculator/?session_id={session}&id=100093',status=HTTP_200_OK)
                # elif "Team" in product:
                #     if s["User_type"] == "betatester":
                #         return Response(
                #             f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#/?session_id={session}&id=100093',status=HTTP_200_OK)
                #     else:
                #         return Response(
                #             f'https://ll07-team-dowell.github.io/Jobportal/#?session_id={session}&id=100093',status=HTTP_200_OK)
                # elif "Media" in product:
                #     return Response(f'https://www.socialmediaautomation.uxlivinglab.online/?session_id={session}&id=100093',status=HTTP_200_OK)
                # elif "Customer" in product:
                #     return Response(
                #         f'https://ll03-identity-dowell.github.io/100096-DowellChat/#/customer-support/?session_id={session}&id=100093',status=HTTP_200_OK)
                # elif "Chat" in product:
                #     return Response(
                #         f' https://ll03-identity-dowell.github.io/100096-DowellChat/#/living-lab-chat/?session_id={session}&id=100093',status=HTTP_200_OK)
                # elif "Wifi" in product:
                #     return Response(
                #         f'https://l.ead.me/dowellwifiqrcode/?session_id={session}&id=100093',status=HTTP_200_OK)
                # elif "Wallet" in product:
                #     return Response(
                #         f'https://ll04-finance-dowell.github.io/100088-dowellwallet/#/login/?session_id={session}&id=100093',status=HTTP_200_OK)
                # elif "Shortner" in product or "shortner" in product:
                #     return Response(
                #         f'https://ll06-reports-analysis-dowell.github.io/100056-DowellQRCodeGenertor2.0/?session_id={session}&id=100093',status=HTTP_200_OK)
                # elif product == "dowell_channel":
                #         return Response(f'https://dowell-my-channel.flutterflow.app/?session_id={session}&id=100093',status=HTTP_200_OK)
                # elif "Repositories" or "Secure Repositories" in product:
                #     return Response(f'https://ll07-team-dowell.github.io/100045-SecureRepository/?session_id={session}&id=100093',status=HTTP_200_OK)
                # else:
                #     return Response(f"Redirect the URL of this {product} product not avail in database")

                if product in PRODUCT_URLS:
                    url = PRODUCT_URLS[product].format(session_id=session)
                    return Response(url, status=HTTP_200_OK)

                # Handle special cases
                # if product == "Workflow AI" and s.get("User_type") == "betatester":
                #     # Beta tester URL for Workflow AI
                #     return Response(
                #         f'https://ll04-finance-dowell.github.io/100018-dowellWorkflowAi-testing/#/?session_id={session}&id=100093',
                #         status=HTTP_200_OK
                #     )


            # for ii in ro1:
            #     pfield = ii.org
            #     # s = rofield.replace("\'", "\"")
            #     ss = json.loads(pfield)
            #     rr = ss["other_organisation"]
            #     rr1 = ss["organisations"]

            rr = resp_u["data"][0]["other_organisation"]
            rr1 = resp_u["data"][0]["organisations"]

            # print("RR",rr)
            for iii in rr:
                if "portfolio_code" not in iii:
                    continue
                if iii["org_name"] == orl:
                        try:
                            if str(iii["portfolio_code"]) == portf:
                                mydict["portfolio_info"] = [iii]

                            else:
                                pass
                        except:
                            pass


            # mydict["portfolio_info"] = [item for item in rr if item.get("portfolio_code") == portf and item.get("org_name") == orl]

            # for iii in mylist:
            #     if "org_name" in iii and iii["org_name"] == orl:
            #         if "portfolio_code" in iii:
            #             if str(iii["portfolio_code"]) == portf:
            #                 mydict["portfolio_info"] = [iii]
            #         else:
            #             # Item does not have "portfolio_code" key, so skip it
            #             continue

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
            # print("MYDICT",mydict["portfolio_info"])
            # obj, created = UserData.objects.update_or_create(username=user, sessionid=session,
            #                                                  defaults={'alldata': json.dumps(mydict)})

            field_n = {"session_id":session}
            l1 = dowellconnection("login","bangalore","login","company","company","1083","ABCDE","fetch",field_n,"nil")
            userdata_n = json.loads(l1)
            if len(userdata_n["data"]) > 0:
                update_user = {"user_data":mydict}
                dowellconnection("login","bangalore","login","company","company","1083","ABCDE","update",field_n,update_user)
            else:
                insert_user = {"session_id":session,"user":user,"user_data":mydict}
                dowellconnection("login","bangalore","login","company","company","1083","ABCDE","insert",insert_user,"nil")


            # if product == "My Channel":
            #         product = "dowell_channel"
            # print("connecting product other org is",product)
            if "Workflow AI" in product or "workflow" in product:
                if s["User_type"] == "betatester":
                    return Response(
                        f'https://ll04-finance-dowell.github.io/100018-dowellWorkflowAi-testing/#/?session_id={session}&id=100093',status=HTTP_200_OK)
                else:
                    # return redirect(f'https://ll04-finance-dowell.github.io/100018-dowellWorkflowAi-testing/?session_id={request.session["session_id"]}&id=100093')
                    return Response(
                        f'https://ll04-finance-dowell.github.io/workflowai.online/#?session_id={session}&id=100093',status=HTTP_200_OK)

            elif "Digital" in product:
                return Response(f'https://dowell-digitalq-manager.flutterflow.app/?session_id={session}&id=100093',status=HTTP_200_OK)
            elif "Maps" in product:
                return Response(f'https://livinglab-maps.flutterflow.app/?session_id={session}&id=100093',status=HTTP_200_OK)

            elif "Scale" in product or "scales" in product:
                return Response(
                    f'https://ll08-mathematicalmodelling-dowell.github.io/100035-DowellScale-Function/?session_id={session}&id=100093',status=HTTP_200_OK)
            elif "Legalzar" in product or "Legalzard" in product:
                return Response(f'https://play.google.com/store/apps/details?id=com.legalzard.policies',status=HTTP_200_OK)
            elif "Calculator" in product:
                return Response(
                    f'https://100050.pythonanywhere.com/calculator/?session_id={session}&id=100093',status=HTTP_200_OK)
            elif "Team" in product:
                # if s["User_type"] == "betatester":
                #     return Response(
                #         f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#/?session_id={session}&id=100093',status=HTTP_200_OK)
                # else:
                return Response(
                        f'https://ll07-team-dowell.github.io/Jobportal/#?session_id={session}&id=100093',status=HTTP_200_OK)
            elif "Media" in product:
                return Response(f'https://www.socialmediaautomation.uxlivinglab.online/?session_id={session}&id=100093',status=HTTP_200_OK)
            elif "Admin" in product:
                return Response(f'https://100093.pythonanywhere.com/?owner={orl}',status=HTTP_200_OK)
            elif "Customer" in product:
                return Response(
                    f'https://ll03-identity-dowell.github.io/100096-customer-support/#?session_id={session}&id=100093',status=HTTP_200_OK)
            elif "Chat" in product:
                return Response(
                    f' https://ll03-identity-dowell.github.io/100096-DowellChat/#/living-lab-chat/?session_id={session}&id=100093',status=HTTP_200_OK)
            elif "Repositories" in product:
                return Response(f'https://ll07-team-dowell.github.io/100045-SecureRepository/',status=HTTP_200_OK)
            elif "Wifi" in product:
                return Response(
                    f'https://l.ead.me/dowellwifiqrcode/?session_id={session}&id=100093',status=HTTP_200_OK)
            elif "Wallet" in product:
                return Response(
                    f'https://ll04-finance-dowell.github.io/100088-dowellwallet/#/login/?session_id={session}&id=100093',status=HTTP_200_OK)
            elif "Channel" or "My Channel" in product:
                    return Response(f'https://dowell-my-channel.flutterflow.app/?session_id={session}&id=100093',status=HTTP_200_OK)
            # elif product == "dowell_channel":
            #     return Response(f'https://dowell-my-channel.flutterflow.app/?session_id={session}&id=100093',status=HTTP_200_OK)
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
    except Exception as e:
        return Response({"msg":f"failure:{e}"},status=status.HTTP_404_NOT_FOUND)


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
                        "product_link": product_details.get("product_link", ""),  # Retrieve link from the product_details
                        "product_logo": product_details.get("product_logo", "")   # Retrieve logo from the product_details
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
        return Response({"data":response}, status=HTTP_200_OK)


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
            }, status=HTTP_200_OK)


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


@loginrequired
def MemEnDis(request):
    username = request.session["username"]
    if request.method == "POST":
        if request.POST.get('formname') == "cancelmember":
            if request.POST.get('mtype') == "guest":
                membertype = "guest_members"
            if request.POST.get('mtype') == "team":
                membertype = "team_members"
            pnamestr = request.POST.get("form_fields[invitedmemberdetails1]", None)
            df = pnamestr.replace("'", '"')
            # rf=eval(df[1:-1])
            pnamedict = json.loads(df[1:-1])
            userorg = UserOrg.objects.all().filter(username=username)
            for i in userorg:
                dataorg = i.org
                dataorg1 = json.loads(dataorg)
            lev = dataorg1["members"]
            for ir in lev[membertype]["pending_members"]:
                try:
                    if ir["name"] == pnamedict["name"]:
                        # ir["status"]="del"
                        lev[membertype]["pending_members"].remove(ir)
                    else:
                        pass
                except:
                    pass
            dataorg1["members"] = lev
            # return HttpResponse(f'{lev[membertype]["pending_members"]}')
            obj, created = UserOrg.objects.update_or_create(username=username, defaults={'org': json.dumps(dataorg1)})

            field = {"document_name": username}
            update = {"members": lev}
            login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                     "update", field, update)
            return redirect(f'https://100093.pythonanywhere.com?session_id={request.session["session_id"]}')

        elif request.POST.get('formname') == "removemember":
            if request.POST.get('mtypes') == "guest":
                membertype = "guest_members"
            if request.POST.get('mtypes') == "team":
                membertype = "team_members"
            namestr = request.POST.get("form_fields[membersearchdetails1]", None)
            dfs = namestr.replace("'", '"')
            # rf=eval(df[1:-1])
            rnamedict = json.loads(dfs[1:-1])
            userorg = UserOrg.objects.all().filter(username=username)
            for i in userorg:
                dataorg = i.org
                dataorgr = json.loads(dataorg)
            lev = dataorgr["members"]
            for ir in lev[membertype]["accept_members"]:
                try:
                    if ir["name"] == rnamedict["name"]:
                        # ir["status"]="disable"
                        lev[membertype]["accept_members"].remove(ir)
                    else:
                        pass
                except:
                    pass
            userorg1 = UserOrg.objects.all().filter(username=rnamedict["name"])
            porg = request.session["present_org"]
            for ii in userorg1:
                dataorg1 = ii.org
                dataorg2 = json.loads(dataorg1)
            levorg = dataorg2["other_organisation"]
            for irs in levorg:
                try:
                    if irs["org_name"] == porg:
                        irs["status"] = "deleted"
                        # levorg.remove(irs)
                    else:
                        pass
                except:
                    pass
            dataorgr["members"] = lev
            dataorg2["other_organisation"] = levorg
            # return HttpResponse(f'{lev} <br> <h1>next</h1> <br> {levorg}')
            obj, created = UserOrg.objects.update_or_create(username=username, defaults={'org': json.dumps(dataorgr)})
            obj, created = UserOrg.objects.update_or_create(username=rnamedict["name"],
                                                            defaults={'org': json.dumps(dataorg2)})
            field = {"document_name": username}
            update = {"members": lev}
            login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                     "update", field, update)
            field1 = {"document_name": rnamedict["name"]}
            update1 = {"other_organisation": levorg}
            login1 = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                      "update", field1, update1)
            return redirect('/')
        else:
            return HttpResponse("something wrong contact system admin")

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
        elif "Dowell Services" in product:
            return Response(f'https://ll05-ai-dowell.github.io/100105-DowellApiKeySystem/?session_id={request.session["session_id"]}&id=100093')
        try:
            notification_obj = Notification(username=user, owner=orl,
                                            notification=json.dumps(org_dict["profile_info"]),
                                            status="enable", product=product)
            notification_obj.save()
            data = {
                "username": "uxliveadmin"
            }
            return Response({"success": "Saved successfully"}, status=status.HTTP_200_OK)
        except Exception as e:

            return Response({"error": f"Error while saving{e}"}, status=status.HTTP_400_BAD_REQUEST)


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
            # print(most_recent_item.link)

            if most_recent_item:
                # print("problem public",most_recent_item)
                # links = json.loads(most_recent_item.link.replace("'", "\""))
                links = json.loads(most_recent_item.link)

                qrcodeids = [{"id": link["qrcodeid"]} for link in links]

                return JsonResponse(qrcodeids, safe=False)
            else:
                return JsonResponse([], safe=False)
        else:
            return Response({"error": "Response failed"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET", "POST"])
def public_org(request):
    if request.method == 'GET':
        # Fetch all unique usernames from publiclink objects
        unique_usernames = publiclink.objects.order_by('username').values_list('username', flat=True).distinct()
        return JsonResponse(list(unique_usernames), safe=False)

    elif request.method == 'POST':
        org = request.data.get("org")
        allpub = publiclink.objects.filter(username=org)
        try:
            most_recent_item = allpub.order_by('-id').first()
            if most_recent_item:
                links = json.loads(most_recent_item.link)
                qrcodeids = [link["qrcodeid"] for link in links]
                # Construct the response with 'public_links' key instead of 'qrcodeids'
                response_data = {
                    "public_links": qrcodeids,
                    "org": org  # Add the username
                }
                return JsonResponse(response_data, safe=False)
            else:
                # Make sure to return 'public_links' for consistency with the 'POST' response
                return JsonResponse({"public_links": [], "org": org}, safe=False)
        except Exception as e:
            # Replace print(e) with proper logging
            # logger.error(e)
            return Response({"error": "Response failed"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def file_upload(request):
    if request.method == 'POST':
        username = request.data.get("username")
        orgname = request.data.get("orgname")
        sheetname = request.data.get("sheetname")
        fieldname = request.data.get("fieldname")
        file = request.FILES.get("filename")
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

        fetch_public = publiclink.objects.filter(username="dennisrk").last()

        # Reset the file pointer to the beginning
        file.seek(0)

        if ".csv" in file.name or ".CSV" in file.name:
            if request.data.get("rowsToDelete"):
                df = pd.read_csv(file, encoding=file_encoding, sep=delimiter, skiprows=n)
            else:
                df = pd.read_csv(file, encoding=file_encoding, sep=delimiter)
        else:
            if request.data.get("rowsToDelete"):
                df = pd.read_excel(file, skiprows=n)
            else:
                df = pd.read_excel(file)
        try:
            if fieldname != "all":
                fieldnames = [v for k, v in request.data.items() if 'fieldname' in k]
                column_data = df[fieldnames]
            else:
                column_data = df.iloc
        except Exception as e:
            return Response({"error": f"No columns matching the fieldname provided, if there are empty rows in your excel file make sure to add the number of rows in the Rows to Delete field.{e}"})
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


@api_view(['POST'])
def create_public_member(request):
    if request.method == 'POST':
        username = request.data.get("username")
        public_count = request.data.get("public_count")
        present_org = request.data.get("present_org")

        if not present_org or not isinstance(present_org, str):
            return Response({"error": "Invalid present_org value"}, status=status.HTTP_400_BAD_REQUEST)

        if int(public_count) > 50000:
            return Response({"error": "Public count is more than 50000"}, status=status.HTTP_400_BAD_REQUEST)

        if public_count:
            links = []
            try:
                fetch_public = publiclink.objects.filter(username=username).last()
                # for p in fetch_public:
                newlink = fetch_public.link
                test_list = json.loads(newlink)
            except:
                test_list = []

            org = base64.b64encode(bytes(present_org, 'utf-8')).decode()
            pmembers = base64.b64encode(bytes("public_member", 'utf-8')).decode()

            for i in range(int(public_count)):
                user = passgen.generate_random_password1(12)
                linkcode = passgen.generate_random_password1(16)
                # path = f'https://100093.pythonanywhere.com/masterlink?next={org}&type={pmembers}&code={user}'
                link_string = f"?next={org}&type={pmembers}&code={user}"
                encrpted = encrypt_message(link_string, crpassword,saved_salt)
                path = f'https://100014.pythonanywhere.com/masterlink?data={encrpted}'
                test_dict = {"link": path, "linkstatus": "unused", "productstatus": "unused", "qrcodeid": user,
                             "linkcode": linkcode}
                test_list.append(test_dict)
            try:
                publiclink.objects.filter(username=request.session["present_org"]).update(link=json.dumps(test_list))
            except:
                publiclink.objects.create(dateof=datetime.datetime.now(), org=present_org,
                                          username=username, link=json.dumps(test_list))
            # response_data = {"success": "Link created successfully"}
            return Response({"success": "Link created successfully","link":path}, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": "Please provide the number of required links"})

# @api_view(['POST'])
# def create_public_member(request):
#     if request.method != 'POST':
#         return Response("Invalid request method", status=status.HTTP_400_BAD_REQUEST)

#     try:
#         username = request.data.get("username")
#         public_count = request.data.get("public_count")
#         present_org = request.data.get("present_org")

#         if not present_org or not isinstance(present_org, str):
#             return Response({"error": "Invalid present_org value"}, status=status.HTTP_400_BAD_REQUEST)

#         if int(public_count) > 50000:
#             return Response({"error": "Public count is less than 50000"}, status=status.HTTP_400_BAD_REQUEST)

#         if public_count:
#             links = []
#             try:
#                 fetch_public = publiclink.objects.filter(username=username).last()
#                 newlink = fetch_public.link
#                 test_list = json.loads(newlink)
#             except:
#                 test_list = []

#             org = base64.b64encode(bytes(present_org, 'utf-8')).decode()
#             pmembers = base64.b64encode(bytes("public_member", 'utf-8')).decode()

#             for i in range(int(public_count)):
#                 user = passgen.generate_random_password1(12)
#                 linkcode = passgen.generate_random_password1(16)
#                 path = f'https://100093.pythonanywhere.com/masterlink?next={org}&type={pmembers}&code={user}'
#                 test_dict = {"link": path, "linkstatus": "unused", "productstatus": "unused", "qrcodeid": user,
#                              "linkcode": linkcode}
#                 test_list.append(test_dict)

#             try:
#                 # Update the last public link with the new link list
#                 publiclink.objects.filter(username=username).update(link=json.dumps(test_list))
#             except:
#                 # If no existing public link, create a new one
#                 publiclink.objects.create(dateof=datetime.datetime.now(), org=present_org,
#                                           username=username, link=json.dumps(test_list))

#             return Response({"success": "Link created successfully"}, status=status.HTTP_201_CREATED)
#         else:
#             return Response({"error": "Please provide the number of required links"}, status=status.HTTP_400_BAD_REQUEST)

#     except Exception as e:
#         # Log the exception here
#         return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def get_used_unused_links(request):
    if request.method == 'POST':
        session_id = request.data.get("session_id")
        portfolio_status = request.data.get("portfolio_status")
        url = "https://100014.pythonanywhere.com/api/userinfo/"
        resp = requests.post(url, data={"session_id": session_id})
        user = json.loads(resp.text)
        allpub = publiclink.objects.all().filter(username=user["userinfo"]["username"])

        # Initialize an empty list to store filtered links
        filtered_links = []

        for l in allpub:
            if len(l.link) >= 120:
                try:
                    allpub1 = json.loads(l.link)
                    for data in allpub1:
                        if portfolio_status == "assigned":
                            if data["linkstatus"] == "unused" and "portfolio_name" in data:
                                filtered_links.append(data['qrcodeid'])
                        if portfolio_status == "unassigned":
                            if data["linkstatus"] == "unused" and "portfolio_name" not in data:
                                filtered_links.append(data['qrcodeid'])
                except:
                    pass

        return Response(filtered_links, status=HTTP_200_OK)

@api_view(['POST'])
def invite_team_member(request):
    if request.method == 'POST':
        email_body = """\
                    <table class="body-wrap" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6">
                        <tbody>
                            <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                <td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>
                                <td class="container" width="600" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto;"
                                    valign="top">
                                    <div class="content" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; max-width: 600px; display: block; margin: 0 auto; padding: 20px;">
                                        <table class="main" width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; border-radius: 3px; background-color: #fff; margin: 0; border: 1px solid #e9e9e9;"
                                            bgcolor="#fff">
                                            <tbody>
                                                <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                                    <td class="" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 16px; vertical-align: top; color: #fff; font-weight: 500; text-align: center; border-radius: 3px 3px 0 0; background-color: #38414a; margin: 0; padding: 20px;"
                                                        align="center" bgcolor="#71b6f9" valign="top">
                                                        <a href="#" style="font-size:32px;color:#fff;">DoWell UX Living Lab</a> <br>
                                                        <span style="margin-top: 10px;display: block; color:yellow">Hi ,you have been invited by <b> {{brand}} </b>  to join in <b>{{brand}}</b>.</span>
                                                    </td>
                                                </tr>
                                                <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                                    <td class="content-wrap" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 20px;" valign="top">
                                                        <table width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                                            <tbody>
                                                                <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                                                    <td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">

                                                                    </td>
                                                                </tr>
                                                                <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                                                    <td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                                                        Please click on the link below to Join.
                                                                    </td>
                                                                </tr>
                                                                <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                                                    <td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                                                        <a href="{{link}}" class="btn-primary" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; color: #FFF; text-decoration: none; line-height: 2em; font-weight: bold; text-align: center; cursor: pointer; display: inline-block; border-radius: 5px; text-transform: capitalize; background-color: #f1556c; margin: 0; border-color: #f1556c; border-style: solid; border-width: 8px 16px;">
                                                        Join</a> </td>
                                                        </tr>
                                                        <tr>
                                                        <td> {{link}} You can also copy and paste this link to browser.

                                                                    </td>
                                                                </tr>
                                                                <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                                                    <td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                                                        Thanks for choosing <b>DoWell UX Living Lab</b> .
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div class="footer" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; clear: both; color: #999; margin: 0; padding: 20px;">
                                            <table width="100%" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                                <tbody>
                                                    <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </td>
                                <td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>
                            </tr>
                        </tbody>
                    </table>
                                    <a href= "https://100087.pythonanywhere.com/privacyconsents/FB1010000000001665306290565391/?session_id=ayaquq6jdyqvaq9h6dlm9ysu3wkykfggyx0d" > Click Here if you want to read Policies </a>

                    """
        username = request.data.get('username')
        org_name = request.data.get("org_name")
        email = request.data.get('email', 'None')
        link = request.data.get('link', 'None')
        if not "Invitation Link" in link:
            if email:
                email_body = email_body.replace('{{link}}', link).replace('{{brand}}', username)
                o = org_name
                subject = f'Invitation to Join {o}'
                from_email = 'uxlivinglab@dowellresearch.sg'
                to_email = email
                send_mail(subject, "lav", from_email, [to_email], fail_silently=False, html_message=email_body)
                return Response({"msg": f"Succefully sent invitation to {email}"})
            else:
                return Response({"msg": "Enter Email"})

        else:
            return Response({"msg": "Firstly create link"})

@api_view(['GET'])
def portfolioUrl(request):
    #post portfolio and product and org , session idas url parameters

    session_c = request.GET.get("session_id")
    # return HttpResponse(f'{session_c}and{request.session["session_id"]}')
    if session_c:
        # if request.method=="POST":
            try:
                url_path=request.GET.get("redirect_url")
            except:
                pass
            portf=request.GET.get("portfolio")
            product=request.GET.get("product")

            #return HttpResponse(product)
            user=request.GET.get("username")
            orl=request.GET.get("org")
            session=session_c
            #return HttpResponse(f'{session_c} port {portf}')
            lo=UserOrg.objects.all().filter(username=orl)
            for rd in lo:
                lo1=rd.org
                lrf=json.loads(lo1)
            mydict={}

            ro=UserInfo.objects.all().filter(username=user)
            ro1=UserOrg.objects.all().filter(username=user)

            # print("product",product)

            for i in ro:
                rofield=i.userinfo
                #s = rofield.replace("\'", "\"")
                s=json.loads(rofield)
                mydict["userinfo"]=s


            for ii in ro1:
                pfield=ii.org
                #s = rofield.replace("\'", "\"")
                ss=json.loads(pfield)
                rr=ss["other_organisation"]
                rr1=ss["organisations"]
            #return HttpResponse(f'{rr}<br><br>{rr1}')
            for iii in rr:
                if iii["org_name"]==orl:
                    try:
                        if iii["portfolio_name"]==portf:
                            mydict["portfolio_info"]=[iii]

                        else:
                            pass
                    except:
                        pass
            try:
                selected_role=mydict["portfolio_info"]["role"]
            except:
                pass
            level1={}
            level2={}
            level3={}
            level4={}
            level5={}
            try:
                for items in lrf["roles"]:
                    if selected_role==items["role_name"]:
                        if items["level1_item"]:
                            level1["level1name"]=lrf["organisations"][0]["level1"]["level_name"]
                            level1["level1items"]=lrf["organisations"][0]["level1"]["items"]
                        if items["level2_item"]:
                            level2["level1name"]=lrf["organisations"][0]["level2"]["level_name"]
                            level2["level1items"]=lrf["organisations"][0]["level2"]["items"]
                        if items["level3_item"]:
                            level2["level3name"]=lrf["organisations"][0]["level3"]["level_name"]
                            level2["level3items"]=lrf["organisations"][0]["level3"]["items"]
                        if items["level4_item"]:
                            level2["level4name"]=lrf["organisations"][0]["level4"]["level_name"]
                            level2["level4items"]=lrf["organisations"][0]["level4"]["items"]
                        if items["level5_item"]:
                            level2["level5name"]=lrf["organisations"][0]["level5"]["level_name"]
                            level2["level5items"]=lrf["organisations"][0]["level5"]["items"]
            except:
                pass
            if "portfolio_info" not in mydict:
                #return HttpResponse(f'{rr1}')
                mydict["portfolio_info"]=[ss["portpolio"][0]]
            productport=[]
            for product2 in lrf["portpolio"]:
                if product==product2["product"]:
                    productport.append(product2)

            mydict["organisations"]=[{"orgname":lrf["document_name"],"orgowner":lrf["document_name"]}]
            mydict["selected_product"]={"product_id":1,"product_name":product,"platformpermissionproduct":[{"type":"member","operational_rights":["view","add","edit","delete"],"role":"admin"}],"platformpermissiondata":["real","learning","testing","archived"],"orgid":lrf["_id"],"orglogo":"","ownerid":"","userportfolio":productport,"payment_status":"unpaid"}
            mydict["selected_portfoliolevel"]=level1
            mydict["selected_portfolioleve2"]=level2
            mydict["selected_portfolioleve3"]=level3
            mydict["selected_portfolioleve4"]=level4
            mydict["selected_portfolioleve5"]=level5
            mydict["portfolio_info"][0]["org_id"]=lrf["_id"]
            mydict["portfolio_info"][0]["owner_name"]=lrf["document_name"]
            mydict["roles"] = lrf["roles"]
            mydict["portfolio_info"][0]["org_name"]=lrf["document_name"]
            # obj, created = UserData.objects.update_or_create(username=user,sessionid=session,defaults={'alldata': json.dumps(mydict)})
            field_n = {"session_id":session}
            l1 = dowellconnection("login","bangalore","login","company","company","1083","ABCDE","fetch",field_n,"nil")
            userdata_n = json.loads(l1)
            if len(userdata_n["data"]) > 0:
                update_user = {"user_data":mydict}
                dowellconnection("login","bangalore","login","company","company","1083","ABCDE","update",field_n,update_user)
            else:
                insert_user = {"session_id":session,"user":user,"user_data":mydict}
                dowellconnection("login","bangalore","login","company","company","1083","ABCDE","insert",insert_user,"nil")
            if url_path:
                    return Response(f'{url_path}?session_id={session}&id=100093')
            if "Workflow AI" in product or "workflow" in product:
                # return redirect(f'https://ll04-finance-dowell.github.io/100018-dowellWorkflowAi-testing/?session_id={request.session["session_id"]}&id=100093')
                return Response(f'https://ll04-finance-dowell.github.io/workflowai.online/#/?session_id={session}&id=100093')
            elif "Repositories" in product:
                return Response(f'https://ll07-team-dowell.github.io/100045-SecureRepository/')
            elif "Scale" in product or "scales" in product:
                return Response(f'https://100035.pythonanywhere.com/client?session_id={session}&id=100093')
            elif "Legalzar" in product or "Legalzard" in product:
                    return Response(f'https://play.google.com/store/apps/details?id=com.legalzard.policies')
            elif "Team" in product:
                    return Response(f'https://ll07-team-dowell.github.io/Jobportal/#?session_id={session}&id=100093')
            elif "Wifi" in product:
                return Response(f'https://l.ead.me/dowellwifiqrcode/?session_id={session}&id=100093')
            elif "UX" in product:
                return Response(f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={session}&id=100093')
            elif "Media" in product:
                return Response(f'https://www.socialmediaautomation.uxlivinglab.online/?session_id={session}&id=100093')
            elif "Logo" in product:
                return Response(f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={session}&id=100093')
            elif "Chat" in product:
                return Response(f'https://100096.pythonanywhere.com/living-lab-support/?session_id={session}&id=100093')
            elif "Maps" in product:
                return Response(f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={session}&id=100093')
            elif "Digital" in product:
                return Response(f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={session}&id=100093')
            elif "Experience" in product:
                return Response(f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={session}&id=100093')
            elif "Admin" in product:
                return Response(f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={session}&id=100093')
            elif "Management" in product:
                return Response(f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={session}&id=100093')
            elif "Admin" in product:
                    return Response('/')
            elif "Monitoring" in product:
                return Response(f'http://100082.pythonanywhere.com/?session_id={session}&id=100093')
            elif "Dashboard" in product:
                return Response(f'https://liveuxstoryboard.com/')
            elif "Agent" in product:
                return Response(f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={session}&id=100093')
            elif "Support" in product:
                return Response(f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={session}&id=100093')

            elif "Data" in product:
                return Response(f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={session}&id=100093')


            else:
                return HttpResponse(f"<h1 align='center'>Redirect the URL of this {product} product not avail in database<br><a href='/'>Home</a></h1>")
    else:
        return redirect("/")


class LanguageListView(APIView):
    def get(self, request, format=None):
        languages = [
                "Abkhazian", "Afar", "Afrikaans", "Akan", "Albanian", "Amharic", "Arabic",
                "Aragonese", "Armenian", "Assamese", "Avaric", "Avestan", "Aymara",
                "Azerbaijani", "Bambara", "Bashkir", "Basque", "Belarusian", "Bengali",
                "Bihari", "Bislama", "Bosnian", "Breton", "Bulgarian", "Burmese",
                "Catalan", "Central_Khmer", "Chamorro", "Chechen", "Chichewa", "Chinese",
                "Church_Slavic", "Chuvash", "Cornish", "Corsican", "Cree", "Croatian",
                "Czech", "Danish", "Divehi", "Dutch", "Dzongkha", "English", "Esperanto",
                "Estonian", "Ewe", "Faroese", "Fijian", "Finnish", "French", "Fulah",
                "Galician", "Ganda", "Georgian", "German", "Greek", "Guarani", "Gujarati",
                "Haitian", "Hausa", "Hebrew", "Herero", "Hindi", "Hiri Motu", "Hungarian",
                "Icelandic", "Ido", "Igbo", "Indonesian", "Interlingua", "Interlingue",
                "Inuktitut", "Inupiaq", "Irish", "Italian", "Japanese", "Javanese",
                "Kalaallisut", "Kannada", "Kanuri", "Kashmiri", "Kazakh", "Kikuyu",
                "Kinyarwanda", "Kirghiz", "Komi", "Kongo", "Korean", "Kuanyama",
                "Kurdish", "Lao", "Latin", "Latvian", "Limburgan", "Lingala", "Lithuanian",
                "Luba-Katanga", "Luxembourgish", "Macedonian", "Malagasy", "Malay",
                "Malayalam", "Maltese", "Manx", "Maori", "Marathi", "Marshallese",
                "Mongolian", "Nauru", "Navajo", "Ndebele, North", "Ndebele, South",
                "Ndonga", "Nepali", "Northern Sami", "Norwegian", "Norwegian Bokmål",
                "Norwegian_Nynorsk", "Occitan", "Ojibwa", "Oriya", "Oromo", "Ossetian",
                "Pali", "Pashto", "Persian", "Polish", "Portuguese", "Punjabi", "Quechua",
                "Romanian", "Romansh", "Russian", "Samoan", "Sango", "Sanskrit",
                "Sardinian", "Serbian", "Shona", "Sichuan Yi", "Sindhi", "Sinhala",
                "Slovak", "Slovenian", "Somali", "Sotho", "Southern", "Spanish", "Sundanese",
                "Swahili", "Swati", "Swedish", "Tagalog", "Tahitian", "Tajik", "Tamil",
                "Tatar", "Telugu", "Thai", "Tibetan", "Tigrinya", "Tonga", "Tsonga",
                "Tswana", "Turkish", "Turkmen", "Twi", "Uighur", "Ukrainian", "Urdu",
                "Uzbek", "Venda", "Vietnamese", "Volapük", "Walloon", "Welsh", "Western_Frisian",
                "Wolof", "Xhosa", "Yiddish", "Yoruba", "Zhuang", "Zulu"
            ]

        language_data = [{"layer": "layer1", "language": language} for language in languages]
        return Response(language_data)

    def post(self, request, format=None):
        # Check for 'getdata' action
        if request.data.get('action') == 'getgeodata' and 'username' in request.data:
            username = request.data.get('username')
            geo_location = GeoLocation.objects.filter(username=username).first()
            if geo_location:
                return Response({"geodata": geo_location.getdata})
            else:
                return Response({"error": "Username not found."}, status=status.HTTP_404_NOT_FOUND)
        if request.data.get('action') == 'getlangdata' and 'username' in request.data:
            username = request.data.get('username')
            geo_location = GeoLocation.objects.filter(username=username).first()
            if geo_location:
                return Response({"langdata": geo_location.langdata})
            else:
                return Response({"error": "Username not found."}, status=status.HTTP_404_NOT_FOUND)
        # Mandatory field check for other actions
        if 'username' not in request.data:
            return Response({"error": "Username is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Extract data from the request
        username = request.data.get('username')
        getdata = request.data.get('geodata', '')  # Default to empty string if not provided
        langdata = request.data.get('langdata', '')  # Default to empty string if not provided

        # Retrieve or create the GeoLocation object
        geo_location, created = GeoLocation.objects.get_or_create(
            username=username,
            defaults={
                'getdata': getdata,
                'langdata': langdata
            }
        )

        # If the object already exists, update the fields if they are present in the request
        if not created:
            if 'geodata' in request.data:
                geo_location.getdata = getdata
            if 'langdata' in request.data:
                geo_location.langdata = langdata
            geo_location.save()

        return Response({"message": "GeoLocation data saved successfully."})

@api_view(['POST'])
def update_org_name(request):
    if request.method != 'POST':
        return Response("Invalid request method", status=status.HTTP_400_BAD_REQUEST)

    try:
        username = request.data.get("username")
        password = request.data.get("admin_password")
        new_org_name = request.data.get('new_org_name')

        # Check the password
        if password != "uxliveadmin":
            return Response({"error": "Incorrect password"}, status=status.HTTP_401_UNAUTHORIZED)

        code_status = ""
        userorg = UserOrg.objects.filter(username=username)
        if not userorg.exists():
            return Response({"error": f"No user found with username '{username}'"}, status=status.HTTP_404_NOT_FOUND)

        dataorg = userorg.first().org
        dataorg1 = json.loads(dataorg)
        lev = dataorg1.get("organisations", [])

        org_found = any(org_data.get("org_name") == new_org_name for org_data in lev)
        if org_found:
            return Response({"error": f"Organization name is already set to '{new_org_name}'"},
                            status=status.HTTP_400_BAD_REQUEST)

        for org_data in lev:
            org_data["org_name"] = new_org_name
            code_status = "success"

        if code_status != "success":
            return Response({"error": f"No organization with name '{username}'"},
                            status=status.HTTP_404_NOT_FOUND)

        dataorg1["organisations"] = lev
        obj, created = UserOrg.objects.update_or_create(username=username, defaults={'org': json.dumps(dataorg1)})

        field = {"document_name": username}
        update = {"organisations": lev}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "update", field, update)

        return Response({"success": f"Organization name updated to '{new_org_name}'"},
                        status=status.HTTP_200_OK)

    except Exception as e:
        # Log the exception here
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GoogleTranslateAPIView(APIView):
    def post(self, request, *args, **kwargs):
        # Extract the data from the request
        text = request.data.get('text')
        target_language = request.data.get('target_language')
        # api_key = 'AIzaSyDy72jLQFTZ9TkEXjjZLoJE6mbAcjjMAuM'  # Make sure to use a secure method to store and access your API keys
        api_key = ''
        # Prepare the request to Google Translate API
        google_translate_url = "https://translation.googleapis.com/language/translate/v2"
        params = {
            'key': api_key,
            'q': text,
            'target': target_language
        }

        # Send the request to Google Translate API
        response = requests.get(google_translate_url, params=params)

        # Check if the request was successful
        if response.status_code == 200:
            # Return the data from Google Translate API
            return Response(response.json(), status=status.HTTP_200_OK)
        else:
            # Return an error if something went wrong
            return Response(response.json(), status=response.status_code)


@api_view(['POST'])
def remove_used_links(request):
    # Validate the presence of 'username' and 'public' in the request data
    if 'username' not in request.data or 'public' not in request.data:
        return Response({'error': 'Missing required fields.'}, status=status.HTTP_400_BAD_REQUEST)

    # Get the username and list of qrcodeids from the request
    username = request.data.get('username')
    qrcodeid_list = request.data.get('public', [])

    # Validate that qrcodeid_list is a list
    if not isinstance(qrcodeid_list, list):
        return Response({'error': 'Invalid data format for qrcodeids.'}, status=status.HTTP_400_BAD_REQUEST)

    # Fetch the most recent publiclink object for the given username
    try:
        plink = publiclink.objects.filter(username=username).latest('id')
    except publiclink.DoesNotExist:
        return Response({'error': 'No publiclink objects found for the given username.'}, status=status.HTTP_404_NOT_FOUND)

    # Deserialize the JSON data from the link field
    links = json.loads(plink.link)

    # Filter out the objects with qrcodeids that are in the qrcodeid_list
    filtered_links = [link for link in links if link.get('qrcodeid') not in qrcodeid_list]

    # Serialize the data back to JSON and update the object
    plink.link = json.dumps(filtered_links)
    plink.save()

    # Return a success response
    return Response({'status': 'success', 'updated_links': filtered_links}, status=status.HTTP_200_OK)

@api_view(['POST'])
def create_team_data(request):
    try:
        data = json.loads(request.body)
        username = data.get('username', '')
        owner = data.get('owner', '')
        client_admin_id = data.get('client_admin_id', '')

        # Check if 'team_name' is provided and is not empty
        if 'team_name' not in data or not data['team_name'].strip():
            return JsonResponse({"error": "The 'team_name' field is mandatory."}, status=400)

        team_name = data['team_name']  # 'team_name' is now mandatory

        # Fetch existing user data
        lookup_u = {"username": username}
        user_data = dowellconnection("login", "bangalore", "login", "browsers", "browsers", "1109", "ABCDE", "fetch", lookup_u, "nil")
        user_data = json.loads(user_data)

        if len(user_data["data"]) == 0:
            # User does not exist, create new user with one team
            my_teams = [{
                "team_name": team_name,
                "members": {
                    "team_members": [],
                    "public_members": []
                }
            }]
            response_data = {
                "username": username,
                "owner": owner,
                "client_admin_id": client_admin_id,
                "my_teams": my_teams
            }
            dowellconnection("login", "bangalore", "login", "browsers", "browsers", "1109", "ABCDE", "insert", response_data, "nil")
        else:
            # User exists, append new team to existing 'my_teams' list
            existing_teams = user_data["data"][0].get("my_teams", [])
            new_team = {
                "team_name": team_name,
                "members": {
                    "team_members": [],
                    "public_members": []
                }
            }
            existing_teams.append(new_team)
            response_data = {
                "my_teams": existing_teams
            }
            # Update user data with new team
            dowellconnection("login", "bangalore", "login", "browsers", "browsers", "1109", "ABCDE", "update", lookup_u,response_data )
        return JsonResponse(response_data, status=200)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@api_view(['POST'])
def delete_team_data(request):
    try:
        data = json.loads(request.body)
        username = data.get('username', '')
        team_name = data.get('team_name', '')

        # Fetch existing user data
        lookup_u = {"username": username}
        user_data = dowellconnection("login", "bangalore", "login", "browsers", "browsers", "1109", "ABCDE", "fetch", lookup_u, "nil")
        user_data = json.loads(user_data)

        if len(user_data["data"]) == 0:
            return JsonResponse({"error": "User not found."}, status=404)

        # Remove the team from the user's 'my_teams' list
        existing_teams = user_data["data"][0].get("my_teams", [])
        updated_teams = [team for team in existing_teams if team["team_name"] != team_name]

        # Check if the team was found and removed
        if len(updated_teams) == len(existing_teams):
            return JsonResponse({"error": "Team not found."}, status=404)

        # Update user data without the deleted team
        response_data = {
            "my_teams": updated_teams
        }
        dowellconnection("login", "bangalore", "login", "browsers", "browsers", "1109", "ABCDE", "update", lookup_u, response_data)

        return JsonResponse({"message": "Team deleted successfully."}, status=200)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@api_view(['POST'])
def remove_member_from_team(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            team_name = data.get('team_name')
            member_email = data.get('member_email')

            # Fetch existing user data
            lookup_u = {"username": username}
            user_data = dowellconnection("login", "bangalore", "login", "browsers", "browsers", "1109", "ABCDE", "fetch", lookup_u, "nil")
            user_data = json.loads(user_data)

            if len(user_data["data"]) == 0:
                return JsonResponse({"error": "User not found"}, status=404)

            # Find the team and remove the member
            team_found = False
            for team in user_data["data"][0].get("my_teams", []):
                if team["team_name"] == team_name:
                    team_found = True
                    # Remove member from both team_members and public_members, skipping strings
                    team["members"]["team_members"] = [member for member in team["members"]["team_members"] if isinstance(member, dict) and member.get("member_email") != member_email]
                    team["members"]["public_members"] = [member for member in team["members"]["public_members"] if isinstance(member, dict) and member.get("member_email") != member_email]
                    break

            if not team_found:
                return JsonResponse({"error": "Team not found"}, status=404)

            # Update user data with removed member
            response_data = {"my_teams": user_data["data"][0]["my_teams"]}
            dowellconnection("login", "bangalore", "login", "browsers", "browsers", "1109", "ABCDE", "update", lookup_u, response_data)

            return JsonResponse({"message": "Member removed successfully"}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)




@api_view(['POST'])
def add_member_to_team(request):
    if request.method == 'POST':
        try:
            field = {}
            login_response = dowellconnection("login", "bangalore", "login", "browsers", "browsers", "1109", "ABCDE", "fetch", field, "nil")
            fetched_data = json.loads(request.body)

            username_requested = fetched_data.get('username')
            team_name = fetched_data.get('team_name')
            members_to_add = fetched_data.get('members', [])
            member_type = fetched_data.get('type')

            data_structure = json.loads(login_response)

            for user_data in data_structure.get('data', []):
                if user_data.get('username') == username_requested:
                    existing_emails = set(member.get('member_email') for team in user_data.get('my_teams', []) for member in team['members'].get(member_type, []) if 'member_email' in member)
                    for team in user_data.get('my_teams', []):
                        if team['team_name'] == team_name:
                            email_set = set()
                            for member in members_to_add:
                                member_email = member.get('member_email')
                                if not member_email:
                                    return JsonResponse({"error": "Member email is required for each member."}, status=400)
                                if member_email in existing_emails:
                                    return JsonResponse({"error": f"Member with email {member_email} already exists in the team."}, status=400)
                                if member_email in email_set:
                                    return JsonResponse({"error": f"Duplicate member email {member_email} in the request."}, status=400)
                                email_set.add(member_email)
                                team['members'][member_type].append(member)

                            field1 = {"username": username_requested}
                            update_field = {"my_teams": user_data["my_teams"]}
                            dowellconnection("login", "bangalore", "login", "browsers", "browsers", "1109", "ABCDE", "update", field1, update_field)
                            return JsonResponse({"success": True, "message": "Members added successfully", "data": user_data["my_teams"]}, status=200)

                    return JsonResponse({"error": "Team not found"}, status=404)

            return JsonResponse({"error": "Username not found"}, status=404)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)


@api_view(['POST'])
def find_teams_by_member_email(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            client_admin_id = data.get('client_admin_id')
            member_email = data.get('member_email')
            field = {}
            login_response = dowellconnection("login", "bangalore", "login", "browsers", "browsers", "1109", "ABCDE", "fetch", field, "nil")
            all_data = json.loads(login_response)
            teams = []
            for record in all_data.get('data', []):
                if record.get('client_admin_id') == client_admin_id:
                    for team in record.get('my_teams', []):
                        for member_type, members in team.get('members', {}).items():
                            for member in members:
                                if isinstance(member, dict) and member.get('member_email') == member_email:
                                    teams.append({'team_name': team['team_name'], 'member_type': member_type})
                                    break

            return JsonResponse({'success': True, 'teams': teams})

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)



@api_view(['POST'])
def get_team_names_by_username(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username_requested = data.get('username')

            # Simulated data structure
            # data_structure = {
            #     'isSuccess': True,
            #     'data': [
            #         # Assuming this data structure is already loaded or fetched from somewhere
            #     ]
            # }
            field = {}
            login_response = dowellconnection("login", "bangalore", "login", "browsers", "browsers", "1109", "ABCDE", "fetch", field, "nil")
            data_structure = json.loads(login_response)

            # Find the user by username in the data structure
            teams = []
            for user_data in data_structure.get('data', []):
                if user_data.get('username') == username_requested:
                    # User found, extract team names
                    teams = [team['team_name'] for team in user_data.get('my_teams', [])]
                    break  # Exit the loop once the user is found

            if teams:
                return JsonResponse({"username": username_requested, "teams": teams}, status=200)
            else:
                return JsonResponse({"error": "Username not found or no teams associated"}, status=404)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)

@api_view(['POST'])
def get_member_names_by_team(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username_requested = data.get('username')
            team_name_requested = data.get('team_name')
            member_type_requested = data.get('member_type')  # 'team_members' or 'public_members'

            field = {}
            login_response = dowellconnection("login", "bangalore", "login", "browsers", "browsers", "1109", "ABCDE", "fetch", field, "nil")
            data_structure = json.loads(login_response)

            members = []
            user_found = False
            team_found = False

            for user_data in data_structure.get('data', []):
                if user_data.get('username') == username_requested:
                    user_found = True
                    for team in user_data.get('my_teams', []):
                        if team['team_name'] == team_name_requested:
                            team_found = True
                            if member_type_requested in ['team_members', 'public_members']:
                                members_list = team['members'].get(member_type_requested, [])
                                members = [
                                    member for member in members_list
                                    if isinstance(member, dict)
                                ]
                            break
                    break

            if not user_found:
                return JsonResponse({"error": "Username not found"}, status=404)
            elif not team_found:
                return JsonResponse({"error": "Team not found"}, status=404)
            elif not members:
                return JsonResponse({"error": "No members found for the specified member type"}, status=404)
            else:
                return JsonResponse({"username": username_requested, "team_name": team_name_requested, "member_type": member_type_requested, "members": members}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)

@api_view(['POST'])
def portfolio_reports(request):
    if request.method == 'POST':
        username = request.data.get("username")
        field_c = {"document_name": username}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "fetch", field_c, "nil")
        ##########################################
        resp = json.loads(login)
        data = resp['data'][0]['portpolio']

        return Response(
            data
            , status=HTTP_200_OK)

@api_view(['POST'])
def role_reports(request):
    if request.method == 'POST':
        username = request.data.get("username")
        field_c = {"document_name": username}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "fetch", field_c, "nil")
        ##########################################
        resp = json.loads(login)
        data = resp['data'][0]['roles']

        return Response(
            data
            , status=HTTP_200_OK)

@api_view(['POST'])
def layer_reports(request):
    if request.method == 'POST':
        username = request.data.get("username")
        field_c = {"document_name": username}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "fetch", field_c, "nil")
        ##########################################
        resp = json.loads(login)
        data = resp['data'][0]['security_layers']

        new_resp = []

        for layer, categories in data.items():
            for category, details in categories.items():
                if isinstance(details, list):
                    new_details = {detail: layer for detail in details}
                elif isinstance(details, dict):
                    new_details = {k: layer for k, v in details.items() if v}
                else:
                    continue
                new_resp.append({
                    "category": category,
                    "details": new_details
                })

        return Response(
            new_resp
            , status=HTTP_200_OK)


@api_view(['POST'])
def member_reports(request):
    if request.method == 'POST':
        username = request.data.get("username")
        field_c = {"document_name": username}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "fetch", field_c, "nil")
        ##########################################
        resp = json.loads(login)
        data = resp['data'][0]['members']

        return Response(
            data
            , status=HTTP_200_OK)


@api_view(['POST'])
def level_reports(request):
    if request.method == 'POST':
        username = request.data.get("username")
        field_c = {"document_name": username}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "fetch", field_c, "nil")
        ##########################################
        resp = json.loads(login)
        data = resp['data'][0]['organisations']

        return Response(
            data
            , status=HTTP_200_OK)
