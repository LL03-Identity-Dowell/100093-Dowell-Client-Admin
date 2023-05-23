from rest_framework.response import Response
import json
import requests
from clientadminapp.dowellconnection import dowellconnection
from clientadminapp.models import UserData, UserOrg
from clientadminapp.models import publiclink
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


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
    ro1=UserData.objects.all().filter(sessionid=s)
    #return HttpResponse(f"hi{ro1}")
    for i in ro1:
        r=i.alldata
        rj=json.loads(r)
    return Response(rj)
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
            fetch = dowellconnection("login","bangalore","login","prod_mem","prod_mem","100014001","ABCDE","fetch",fetch_field,"nil")
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
                    field = {"_id":"6453edc48ce736847236e6ca"}
                    update = {"products" : a["data"][0]["products"]}
                    dowellconnection("login","bangalore","login","prod_mem","prod_mem","100014001","ABCDE","update",field,update)
                    return Response({"message": "product updated successfully"})
            return Response({"message": "product not found"})


            return Response({"message": "Successfully Updated"})
        else:
            # Only username is present in the request body
            field = {}
            l1 = product = dowellconnection("login", "bangalore", "login", "prod_mem", "prod_mem", "100014001", "ABCDE", "fetch", field, "nil")
            l1 = json.loads(l1)
            products = l1["data"][0]["products"]
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
                external_product.update(
                    {
                        'invite_users': invite_users,
                        'invite_team_members': invite_team_members,
                        'invite_public': invite_public,
                    }
                )
                if payment_status == "paid":
                    member_list = external_product['paid_members']
                elif payment_status == "unpaid":
                    member_list = external_product['unpaid_members']
                else:
                    member_list = None

                if member_list is not None:
                    for member in member_list:

                        if member['username'] in members:
                            member['status'] = product_status
        # Remove any strings present in the list "products"
        a['products'] = [product for product in a['products'] if isinstance(product, dict)]

        # Add the updated dictionary to the updated_members list
        updated_members.append(a)
        field = {"document_name": member}
        update = {"products": updated_members[0]["products"]}
        dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE", "update", field, update)
        field1 = {"_id":"6453edc48ce736847236e6ca"}
        update1 = {"products" : external_api_data["products"]}
        dowellconnection("login","bangalore","login","prod_mem","prod_mem","100014001","ABCDE","update",field1,update1)

    # Return the updated dictionaries for each member
    return Response({"message":"Successfully Updated"})

