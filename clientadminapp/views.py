from django.shortcuts import render, HttpResponse, redirect
from .models import UserInfo, UserPortfolio, UserOrg, Urls, UserData, publiclink, Devices, OperatingSystems, Browsers, \
    InternetConnection, LoginType, PasswordStrength, IdVerification
from .dowellconnection import dowellconnection, loginrequired, importdata
from django.views.decorators.csrf import csrf_exempt
import json
from django.core.mail import send_mail
from django.core.mail import EmailMessage
from . import passgen
import base64
from django.core.files.storage import default_storage
from django.template import Context, Template
from django.http import JsonResponse
from PIL import Image
import requests
import datetime
from django.views.decorators.clickjacking import (
    xframe_options_exempt, xframe_options_deny, xframe_options_sameorigin,
)
from django.utils.decorators import method_decorator
import pandas as pd
from dotenv import load_dotenv
import os
from .models import *
import chardet
import csv


load_dotenv()

environmentURL = os.getenv("environmentURL")

print(environmentURL)

@csrf_exempt
def is_ajax(request):
    return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'


def Home1(request):
    context = {}
    url_id = request.GET.get('session_id', None)

    if url_id is not None:
        request.session["session_id"] = url_id
        return redirect("/")
    else:
        return redirect(f"https://100014.pythonanywhere.com/?redirect_url={environmentURL}/home")


def Home(request):
    session_id = request.session.get("session_id")
    if session_id:
        url = "https://100014.pythonanywhere.com/api/userinfo/"
        resp = requests.post(url, data={"session_id": session_id})
        try:
            user = json.loads(resp.text)
        except:
            return HttpResponse('<style>...</style><div class="content open-popup" id="popup">...</div>')

        username = user["userinfo"]["username"]
        context = {"login": user["userinfo"]}

        UserInfo.objects.update_or_create(username=username, defaults={'userinfo': json.dumps(user["userinfo"])})

        field = {"document_name": username}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "fetch", field, "nil")
        r = json.loads(login)
        UserOrg.objects.update_or_create(username=username, defaults={'org': json.dumps(r["data"][0])})

        datalav = r["data"][0]
        print(datalav)
        context.update({"datalav": datalav})
        request.session.update({"username": username, "orgname": datalav["organisations"][0]["org_name"],
                                "present_org": datalav["organisations"][0]["org_name"]})

        lori = [datalav["organisations"][0]["org_name"]] + [l["org_name"] for l in datalav["other_organisation"]]
        member = set(i["name"] for i in datalav["members"]["team_members"]["accept_members"])
        gmember = set(i["name"] for i in datalav["members"]["guest_members"]["accept_members"])
        pmember = set(i["name"] for i in datalav["members"]["public_members"]["accept_members"])
        tmem = [ii for a in datalav["portpolio"] if "team" in a["member_type"] for ii in
                (a["username"] if isinstance(a["username"], list) else [a["username"]]) if ii in member]
        tmemp = [ii for a in datalav["portpolio"] if "team" in a["member_type"] for ii in
                 (a["username"] if isinstance(a["username"], list) else [a["username"]]) if ii not in member]
        gmem = [a["username"] for a in datalav["portpolio"] if "guest" in a["member_type"] if a["username"] in gmember]
        gmemp = [a["username"] for a in datalav["portpolio"] if "guest" in a["member_type"] if
                 a["username"] not in gmember]
        pmem = [a["username"] for a in datalav["portpolio"] if isinstance(a, dict) and isinstance(a["username"], str) and "public" in a["member_type"] and a["username"] in pmember]                
        pmemp = [a["username"] for a in datalav["portpolio"] if isinstance(a, dict) and isinstance(a["username"], str) and "public" in a["member_type"] and a["username"] not in pmember]


        context.update({
            "col": lori,
            "tmem": tmem,
            "tmemp": [elem for elem in tmemp if elem not in member],
            "gmem": gmem,
            "gmemp": [elem for elem in gmemp if elem not in gmember],
            "pmem": pmem,
            "pmemp": [elem for elem in pmemp if elem not in pmember],
        })

        allpub = publiclink.objects.filter(username=username)
        context.update({
            "public": allpub,
            "importdata": importdata(),
            "public1": [count.qrcodeid for count in allpub if count.portfolio],
            "public2": [count.qrcodeid for count in allpub if not count.portfolio],
            "session_id": session_id,
        })

        url_lastlogin = "https://100014.pythonanywhere.com/api/lastlogins/"
        data = {"username": username}
        response_login = requests.post(url_lastlogin, json=data)

        last_login_times = response_login.json()["data"][
            "LastloginTimes"] if response_login.status_code == 200 else None
        context["last_login_times"] = last_login_times
        # fetch notifications for owner from users
        notifications = fetch_notifications(request)
        # return HttpResponse(notifications)
        context["notifications"] = notifications
        # Updated context variables from the first code
        context["username"] = username
        context["user_email"] = user["userinfo"]["email"]
        context["user_info"] = user["userinfo"]
        context["user_org"] = r["data"][0]
        request.session["document_id"] = r["data"][0]["_id"]
        context["notifications"] = notifications
        try:
            policy_status_obj = PolicyStatus.objects.get(username=request.session.get("username"))
            policy_status = policy_status_obj.policies_status
        except PolicyStatus.DoesNotExist:
            policy_status = 'not_checked'
        context["policies_status"] = policy_status
        return render(request, "index.html", context)
    else:
        return redirect("home")


def otherorg1(request):
    if request.session.get("username"):
        username = request.session['username']
        # if request.method == "POST": ###This Line is commented as method is GET not POST
        org = request.POST.get("org")
        user_org = UserOrg.objects.filter(username=username)
        for it in user_org:
            data13 = json.loads(it.org)
        if request.session["username"] == org:
            return redirect("/")
        else:
            user_info = UserInfo.objects.filter(username=username)
            for i in user_info:
                data = json.loads(i.userinfo)
            request.session["present_org"] = org
            context = {
                "img": data13["profile_info"]["profile_img"],
                "time": data["dowell_time"],
                "location": data["city"],
            }
            user_org = UserOrg.objects.filter(username=username)
            for i in user_org:
                dataorg1 = json.loads(i.org)
            context["datalav"] = dataorg1
            context["first"] = dataorg1["profile_info"]["first_name"]
            context["last"] = dataorg1["profile_info"]["last_name"]
            ors = []
            for lsr in dataorg1["organisations"]:
                ors.append(lsr["org_name"])
            for lst in dataorg1["other_organisation"]:
                ors.append(lst["org_name"])
            co = []
            po = []
            othero = []
            for i in dataorg1["other_organisation"]:
                if i["org_name"] == org:
                    try:
                        co.append(i["product"])
                        if i["portfolio_name"] and "enable" in i["status"]:
                            othero.append(i)
                        else:
                            po.append(i["portfolio_name"])
                    except:
                        pass
            context["othero"] = othero
            context["aiport"] = [*set(po)]
            context["myorg"] = [*set(ors)]
            context["products"] = [*set(co)]
            return render(request, "editother.html", context)
    else:
        return render(request, "editother.html")



def otherorg(request):
    if request.session.get("username"):
        username = request.session['username']
        # if request.method == "POST": ###This Line is commented as method is GET not POST
        context = {}
        lsimg = []
        org = request.POST.get("org")
        user_org = UserOrg.objects.all().filter(username=username)
        for it in user_org:
            data12 = it.org
            data13 = json.loads(data12)
        if request.session["username"] == org:
            request.session["present_org"] = org
            return redirect("/")
        else:
            userorg = UserInfo.objects.all().filter(username=username)
            for i in userorg:
                data1 = i.userinfo
                data = json.loads(data1)
            # return HttpResponse(f'{data}')
            request.session["present_org"] = org

            # return HttpResponse(request.session["present_org"])
            context["img"] = data13["profile_info"]["profile_img"]

            context["time"] = data["dowell_time"]
            context["location"] = data["city"]
            userorg = UserOrg.objects.all().filter(username=username)
            for i in userorg:
                dataorg = i.org
                dataorg1 = json.loads(dataorg)
            context["datalav"] = dataorg1
            ors = []
            context["first"] = dataorg1["profile_info"]["first_name"]
            context["last"] = dataorg1["profile_info"]["last_name"]
            for lsr in dataorg1["organisations"]:
                ors.append(lsr["org_name"])
            for lst in dataorg1["other_organisation"]:
                ors.append(lst["org_name"])
            co = []
            po = []
            othero = []
            for i in dataorg1["other_organisation"]:
                if i["org_name"] == org:
                    try:
                        co.append(i["product"])
                        if i["portfolio_name"] and "enable" in i["status"]:
                            othero.append(i)
                        else:
                            po.append(i["portfolio_name"])
                    except:
                        pass

            publiclinks = UserOrg.objects.all().filter(username=org)
            print(publiclinks)

            temp = []
            for ii in publiclinks:
                publicorg = ii.org
                # print(publicorg)
                publicorg1 = json.loads(publicorg)
                for jj in publicorg1["portpolio"]:
                    if jj["member_type"] == "public":
                        temp.append(jj)
            url_lastlogin = "https://100014.pythonanywhere.com/api/lastlogins/"

            # Define the data to be sent in the POST request
            data = {
                "username": org
            }

            # Make the POST request
            response_login = requests.post(url_lastlogin, json=data)

            # Check if the request was successful
            if response_login.status_code == 200:
                # Extract the LastloginTimes data from the response
                last_login_times = response_login.json()["data"]["LastloginTimes"]

                print("Last login times:", last_login_times)
            else:
                print(f"POST request failed with status code {response_login.status_code}.")
            context["last_login_times"] = last_login_times
            context["othero"] = othero
            context["aiport"] = [*set(po)]
            context["myorg"] = [*set(ors)]
            context["products"] = [*set(co)]
            context["public"] = temp

            return render(request, "editother.html", context)


@csrf_exempt
def portfolio(request):
    lrf = {}
    if request.session.get("session_id"):
        if request.method=="POST" and "connect_portfolio" in request.POST:
            portf=request.POST["portfl"]
            product=request.POST["product"]
            #return HttpResponse(portf)
            user=request.session["username"]
            orl=request.session["present_org"]
            session=request.session["session_id"]
            try:
                lo=UserOrg.objects.all().filter(username=orl)
            except:
                return HttpResponse("User Org Not Found in Local Database")
            for rd in lo:
                lo1=rd.org
                lrf=json.loads(lo1)
            mydict={}

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
                    return HttpResponse(f"<h1 align='center'>Data Not Found<br><a href='/'>Home</a></h1>{e} {mydict}")
                mydict["selected_product"]={"product_id":1,"product_name":product,"platformpermissionproduct":[{"type":"member","operational_rights":["view","add","edit","delete"],"role":"admin"}],"platformpermissiondata":["real","learning","testing","archived"],"orgid":lrf["_id"],"orglogo":"","ownerid":"","userportfolio":lrst,"payment_status":"unpaid"}
                obj, created = UserData.objects.update_or_create(username=user,sessionid=session,defaults={'alldata': json.dumps(mydict)})
                if "Workflow AI" in product or "workflow" in product:
                    if s["User_type"]=="betatester":
                        return redirect(f'https://ll04-finance-dowell.github.io/100018-dowellWorkflowAi-testing/#/?session_id={request.session["session_id"]}&id=100093')
                    else:
                # return redirect(f'https://ll04-finance-dowell.github.io/100018-dowellWorkflowAi-testing/?session_id={request.session["session_id"]}&id=100093')
                        return redirect(f'https://ll04-finance-dowell.github.io/workflowai.online/#?session_id={request.session["session_id"]}&id=100093')

                elif "Scale" in product or "scales" in product:
                    return redirect(f'https://100035.pythonanywhere.com/client?session_id={request.session["session_id"]}&id=100093')
                elif "Legalzar" in product or "Legalzard" in product:
                    return redirect(f'https://play.google.com/store/apps/details?id=com.legalzard.policies')
                elif "Calculator" in product:
                    return redirect(f'https://100050.pythonanywhere.com/calculator/?session_id={request.session["session_id"]}&id=100093')
                elif "Team" in product:
                    if s["User_type"]=="betatester":
                        return redirect(f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#/?session_id={request.session["session_id"]}&id=100093')
                    else:
                        return redirect(f'https://ll07-team-dowell.github.io/Jobportal/#?session_id={request.session["session_id"]}&id=100093')
                elif "Media" in product:
                    return redirect(f'https://100007.pythonanywhere.com/')
                elif "Customer" in product:
                    return redirect(f'https://100096.pythonanywhere.com/customer-support/?session_id={request.session["session_id"]}&id=100093')
                elif "Chat" in product:
                    return redirect(f'https://100096.pythonanywhere.com/living-lab-support/?session_id={request.session["session_id"]}&id=100093')
                elif "Repositories" in product:
                    return redirect(f'https://ll07-team-dowell.github.io/100045-SecureRepository/')
                elif "Wifi" in product:
                    return redirect(f'https://l.ead.me/dowellwifiqrcode/?session_id={request.session["session_id"]}&id=100093')
                else:
                    return HttpResponse(f"<h1 align='center'>Redirect the URL of this {product} product not avail in database<br><a href='/'>Home</a></h1>")
            for ii in ro1:
                pfield=ii.org
                #s = rofield.replace("\'", "\"")
                ss=json.loads(pfield)
                rr=ss["other_organisation"]
                rr1=ss["organisations"]

            for iii in rr:
                if iii["org_name"]==request.session["present_org"]:
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

            if "Workflow AI" in product or "workflow" in product:
                if s["User_type"]=="betatester":
                    return redirect(f'https://ll04-finance-dowell.github.io/100018-dowellWorkflowAi-testing/#/?session_id={request.session["session_id"]}&id=100093')
                else:
            # return redirect(f'https://ll04-finance-dowell.github.io/100018-dowellWorkflowAi-testing/?session_id={request.session["session_id"]}&id=100093')
                    return redirect(f'https://ll04-finance-dowell.github.io/workflowai.online/#?session_id={request.session["session_id"]}&id=100093')
                # return redirect(f'https://ll04-finance-dowell.github.io/100018-dowellWorkflowAi-testing/?session_id={request.session["session_id"]}&id=100093')
                #return redirect(f'https://ll04-finance-dowell.github.io/100018-dowellWorkflowAi-testing/#/?session_id={request.session["session_id"]}&id=100093')
            elif "Scale" in product or "scales" in product:
                return redirect(f'https://100035.pythonanywhere.com/client?session_id={request.session["session_id"]}&id=100093')
            elif "Legalzar" in product or "Legalzard" in product:
                    return redirect(f'https://play.google.com/store/apps/details?id=com.legalzard.policies')
            elif "Team" in product:
                    return redirect(f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#/?session_id={request.session["session_id"]}&id=100093')
            elif "Media" in product:
                return redirect(f'https://100007.pythonanywhere.com/')
            elif "Customer" in product:
                return redirect(f'https://100096.pythonanywhere.com/customer-support/?session_id={request.session["session_id"]}&id=100093')
            elif "Repositories" in product:
                return redirect(f'https://ll07-team-dowell.github.io/100045-SecureRepository/')
            elif "Chat" in product:
                return redirect(f'https://100096.pythonanywhere.com/living-lab-support/?session_id={request.session["session_id"]}&id=100093')
            else:
                return HttpResponse(f"<h1 align='center'>Redirect the URL of this {product} product not avail in database<br><a href='/'>Home</a></h1>")
        if request.method == "POST"  and "request_portfolio" in request.POST:
            user=request.session["username"]
            orl=request.session["present_org"]
            product=request.POST["product"]
            user_orgn = UserOrg.objects.get(username=user)
            org_dict = json.loads(user_orgn.org)

            # return HttpResponse(org_dict["profile_info"])
            try:
                # Iterate over the 'portpolio' list in the data
                notification_obj = Notification(username=user, owner=orl,
                        notification=json.dumps(org_dict["profile_info"]),
                        status="enable",product=product)
                notification_obj.save()
                return redirect("/")
            # return HttpResponse(lrf)
            except:
                return redirect("/")
                pass


    else:
        return redirect("/")


def Refresh(request):
    if request.session.get("session_id"):
        username = request.session["username"]
        field = {"document_name": username}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "fetch", field, "update")
        r = json.loads(login)
        # pi=r["data"][0]["profile_info"]
        # o=r["data"][0]["organisations"]
        # p=r["data"][0]["products"]
        # pf=r["data"][0]["portpolio"]
        # m=r["data"][0]["members"]
        # s=r["data"][0]["security_layers"]
        # oo=r["data"][0]["other_organisation"]
        # role=r["data"][0]["roles"]
        obj, created = UserOrg.objects.update_or_create(username=username, defaults={'org': json.dumps(r["data"][0])})
        # return HttpResponse(f'{pi} <br> {o} <br> {p} <br> {m} <br> {s} <br> {oo} <br> {role}')
        # ProfileInfo,Organisation,Products,Members,Portfolio,SecurtiyLayers,OtherOrg,MyRoles

        # obj1, created1 = ProfileInfo.objects.update_or_create(username=username,defaults={'profile_info': json.dumps(pi)})
        # obj2, created2 = Organisation.objects.update_or_create(username=username,defaults={'organisation': json.dumps(o)})
        # obj3, created3 = Products.objects.update_or_create(username=username,defaults={'products': json.dumps(p)})
        # obj4, created4 = Members.objects.update_or_create(username=username,defaults={'members': json.dumps(m)})
        # obj5, created5 = Portfolio.objects.update_or_create(username=username,defaults={'portfolio': json.dumps(pf)})
        # obj6, created6 = SecurtiyLayers.objects.update_or_create(username=username,defaults={'layers': json.dumps(s)})
        # obj7, created7 = OtherOrg.objects.update_or_create(username=username,defaults={'otherorg': json.dumps(oo)})
        # obj8, created8 = MyRoles.objects.update_or_create(username=username,defaults={'roles': json.dumps(role)})
        # return redirect(f'/new?session_id={request.session["session_id"]}')
        return redirect('/')
    else:
        return redirect("/")


def RefreshOther(request):
    org = request.GET.get('org', 'lol')
    username = request.session["username"]
    field = {"document_name": username}
    login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE", "fetch",
                             field, "update")
    r = json.loads(login)
    # pi=r["data"][0]["profile_info"]
    # o=r["data"][0]["organisations"]
    # p=r["data"][0]["products"]
    # pf=r["data"][0]["portpolio"]
    # m=r["data"][0]["members"]
    # s=r["data"][0]["security_layers"]
    # oo=r["data"][0]["other_organisation"]
    # role=r["data"][0]["roles"]
    obj, created = UserOrg.objects.update_or_create(username=username, defaults={'org': json.dumps(r["data"][0])})
    # return HttpResponse(f'{pi} <br> {o} <br> {p} <br> {m} <br> {s} <br> {oo} <br> {role}')
    # ProfileInfo,Organisation,Products,Members,Portfolio,SecurtiyLayers,OtherOrg,MyRoles

    # obj1, created1 = ProfileInfo.objects.update_or_create(username=username,defaults={'profile_info': json.dumps(pi)})
    # obj2, created2 = Organisation.objects.update_or_create(username=username,defaults={'organisation': json.dumps(o)})
    # obj3, created3 = Products.objects.update_or_create(username=username,defaults={'products': json.dumps(p)})
    # obj4, created4 = Members.objects.update_or_create(username=username,defaults={'members': json.dumps(m)})
    # obj5, created5 = Portfolio.objects.update_or_create(username=username,defaults={'portfolio': json.dumps(pf)})
    # obj6, created6 = SecurtiyLayers.objects.update_or_create(username=username,defaults={'layers': json.dumps(s)})
    # obj7, created7 = OtherOrg.objects.update_or_create(username=username,defaults={'otherorg': json.dumps(oo)})
    # obj8, created8 = MyRoles.objects.update_or_create(username=username,defaults={'roles': json.dumps(role)})
    # return redirect(f'/new?session_id={request.session["session_id"]}')
    username = request.session['username']
    context = {}
    lsimg = []
    print("hi", org, username)
    user_org = UserOrg.objects.all().filter(username=username)
    for it in user_org:
        data12 = it.org
        data13 = json.loads(data12)
    if request.session["username"] == org:
        return redirect(f"/?session_id={request.session['session_id']}")
    else:
        userorg = UserInfo.objects.all().filter(username=username)
        for i in userorg:
            data1 = i.userinfo
            data = json.loads(data1)
        # return HttpResponse(f'{data}')
        request.session["present_org"] = org
        # return HttpResponse(request.session["present_org"])
        context["img"] = data13["profile_info"]["profile_img"]

        context["time"] = data["dowell_time"]
        context["location"] = data["city"]
        userorg = UserOrg.objects.all().filter(username=username)
        for i in userorg:
            dataorg = i.org
            dataorg1 = json.loads(dataorg)
        context["datalav"] = dataorg1
        ors = []
        context["first"] = dataorg1["profile_info"]["first_name"]
        context["last"] = dataorg1["profile_info"]["last_name"]
        for lsr in dataorg1["organisations"]:
            ors.append(lsr["org_name"])
        for lst in dataorg1["other_organisation"]:
            ors.append(lst["org_name"])
        co = []
        po = []
        othero = []
        for i in dataorg1["other_organisation"]:
            if i["org_name"] == org:
                try:
                    co.append(i["product"])
                    if i["portfolio_name"] and "enable" in i["status"]:
                        othero.append(i)
                    else:
                        po.append(i["portfolio_name"])
                except:
                    pass
        # userorg1=UserOrg.objects.all().filter(username=org)
        # for i in userorg1:
        #     datap=i.org
        #     datapro=json.loads(datap)
        # for ii in datapro["portpolio"]:
        #     if username in ii["username"]:
        #         co.append(ii["product"])
        # for i in userorg1:
        #     datap=i.org
        #     datapro=json.loads(datap)
        # for ii in dataorg1["other_organisation"]:
        #     if org in ii["org_name"]:
        #         ro=ii["portfolio"]
        context["othero"] = othero
        context["aiport"] = [*set(po)]
        context["myorg"] = [*set(ors)]
        context["products"] = [*set(co)]
        return render(request, "new/editother.html", context)


@loginrequired
def PortfolioAdd(request):
    if request.session.get("session_id"):
        username = request.session["username"]
        if is_ajax(request=request):
            if request.POST.get('form') == "portfolio1":
                member_type = request.POST.get('member_type')
                member = request.POST.get('member')
                product = request.POST.get('product')
                data_type = request.POST.get('data_type')
                op_rights = request.POST.get('op_rights')
                role = request.POST.get('role')
                portfolio_name = request.POST.get('portfolio_name')
                portfolio_code = request.POST.get('portfolio_code')
                portfolio_spec = request.POST.get('portfolio_spec')
                portfolio_u_code = request.POST.get('portfolio_u_code')
                portfolio_det = request.POST.get('portfolio_det')
                lsmem = json.loads(member)
                response_data = {"username": lsmem, "member_type": member_type, "product": product,
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
                    if portcheck["portfolio_name"] == portfolio:
                        return JsonResponse({"resp": f'{portfolio_name} already exist'})

                odata["portpolio"].append(response_data)

                # return JsonResponse({"resp":f'{portls} successfully created'})
                if "owner" or "team_member" in member_type:
                    typemem = "team_members"
                elif "user" in member_type:
                    typemem = "guest_members"
                if member_type == "public":
                    for ir in lsmem:
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
                    return JsonResponse({"resp": f'{portfolio_name} successfully created'})
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
                return JsonResponse({"resp": f'{portfolio_name} successfully created'})
    else:
        return redirect("/")


@loginrequired
def AddRoles(request):
    if request.session.get("session_id"):
        username = request.session["username"]
        if is_ajax(request=request):
            if request.POST.get('form') == "role1":
                level1 = request.POST.get('itemlevel1')
                level2 = request.POST.get('itemlevel2')
                level3 = request.POST.get('itemlevel3')
                level4 = request.POST.get('itemlevel4')
                level5 = request.POST.get('itemlevel5')
                security = request.POST.get('selectlayerforroles')
                role_name = request.POST.get('role_name')
                role_code = request.POST.get('role_code')
                role_spec = request.POST.get('role_spec')
                roleucode = request.POST.get('role_u_code')
                role_det = request.POST.get('role_det')
                response_data = {"level1_item": level1, "level2_item": level2, "level3_item": level3,
                                 "level4_item": level4, "level5_item": level5, "security_layer": security,
                                 "role_name": role_name, "role_code": role_code, "role_details": role_det,
                                 "role_uni_code": roleucode, "role_specification": role_spec, "status": "enable"}

                userorg = UserOrg.objects.all().filter(username=username)
                for i in userorg:
                    o = i.org
                    odata = json.loads(o)
                roles = odata["roles"]
                for checkroles in roles:
                    if checkroles["role_name"] == role_name:
                        return JsonResponse({"resp": f'{role_name} already exist'})
                odata["roles"].append(response_data)
                rle = odata["roles"]
                obj, created = UserOrg.objects.update_or_create(username=username, defaults={'org': json.dumps(odata)})
                # return HttpResponse(f'{roles}')
                field = {"document_name": username}
                update = {"roles": rle}
                login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                         "update", field, update)
                return JsonResponse({"resp": f'{role_name} successfully created'})
    else:
        return redirect("/")


@loginrequired
def Levels(request):
    if request.session.get("session_id"):
        # level1="raju"
        r = ""
        ls = []
        # try:
        level = request.POST.keys()
        if "level_name1" in level:
            level1 = request.POST["level_name1"]
            ls.append(level1)
            r = "level1"
        if "level_name2" in level:
            level2 = request.POST["level_name2"]
            ls.append(level2)
            r = "level2"
        if "level_name3" in level:
            level3 = request.POST["level_name3"]
            ls.append(level3)
            r = "level3"
        if "level_name4" in level:
            level4 = request.POST["level_name4"]
            ls.append(level4)
            r = "level4"
        if "level_name5" in level:
            level5 = request.POST["level_name5"]
            ls.append(level5)
            r = "level5"

        userorg = UserOrg.objects.all().filter(username=request.session["username"])
        if userorg:
            for i in userorg:
                o = i.org
                odata = json.loads(o)
            odata["organisations"][0][r]["level_name"] = ls[0]
            org = odata["organisations"]
            # return HttpResponse(f'{org} is list')
            obj, created = UserOrg.objects.update_or_create(username=request.session["username"],
                                                            defaults={'org': json.dumps(odata)})
            # org[0][r]["level_name"]=ls[0]

            field = {"document_name": request.session["username"]}
            update = {"organisations": org}
            login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                     "update", field, update)
            return redirect(f'/?session_id={request.session["session_id"]}')
        else:
            return HttpResponse("no values")
        # except:
        pass
    else:
        return redirect("/")


@loginrequired
def Items(request):
    # level1="raju"
    r = ""
    ls = []
    imageurl = ""
    barurl = ""
    imageurl1 = ""
    # try:
    level = request.POST.keys()
    if "form_fields[item_name1]" in level:
        level1 = request.POST["form_fields[item_name1]"]
        ls.append(level1)
        itemcode = request.POST["form_fields[item_code1]"]
        itemdet = request.POST["form_fields[item_det1]"]
        itemuni = request.POST["form_fields[item_u_code1]"]
        itemspec = request.POST["form_fields[item_spec1]"]
        itembar = request.FILES.get("form_fields[barcodeitem1]", None)
        try:
            file_name = default_storage.save(f'itemimages/{itembar.name}', itembar)
            barurl = default_storage.url(file_name)
        except:
            pass
        itemimage1 = request.FILES.get("form_fields[image1item1]", None)
        try:
            file_name1 = default_storage.save(f'itemimages/{itemimage1.name}', itemimage1)
            imageurl = default_storage.url(file_name1)
        except:
            pass
        itemimage2 = request.FILES.get("form_fields[image2item1]", None)
        try:

            file_name2 = default_storage.save(f'itemimages/{itemimage2.name}', itemimage2)
            imageurl1 = default_storage.url(file_name2)
        except:
            pass
        r = "level1"
    if "form_fields[item_name2]" in level:
        level1 = request.POST["form_fields[item_name2]"]
        ls.append(level1)
        itemcode = request.POST["form_fields[item_code2]"]
        itemdet = request.POST["form_fields[item_det2]"]
        itemuni = request.POST["form_fields[item_u_code2]"]
        itemspec = request.POST["form_fields[item_spec2]"]
        itembar = request.FILES.get("form_fields[barcodeitem2]", None)
        try:
            file_name = default_storage.save(f'itemimages/{itembar.name}', itembar)
            barurl = default_storage.url(file_name)
        except:
            pass
        itemimage1 = request.FILES.get("form_fields[image1item2]", None)
        try:
            file_name1 = default_storage.save(f'itemimages/{itemimage1.name}', itemimage1)
            imageurl = default_storage.url(file_name1)
        except:
            pass
        itemimage2 = request.FILES.get("form_fields[image2item2]", None)
        try:

            file_name2 = default_storage.save(f'itemimages/{itemimage2.name}', itemimage2)
            imageurl1 = default_storage.url(file_name2)
        except:
            pass
        r = "level2"
    if "form_fields[item_name3]" in level:
        level1 = request.POST["form_fields[item_name3]"]
        ls.append(level1)
        itemcode = request.POST["form_fields[item_code3]"]
        itemdet = request.POST["form_fields[item_det3]"]
        itemuni = request.POST["form_fields[item_u_code3]"]
        itemspec = request.POST["form_fields[item_spec3]"]
        itembar = request.FILES.get("form_fields[barcodeitem3]", None)
        try:
            file_name = default_storage.save(f'itemimages/{itembar.name}', itembar)
            barurl = default_storage.url(file_name)
        except:
            pass
        itemimage1 = request.FILES.get("form_fields[image1item3]", None)
        try:
            file_name1 = default_storage.save(f'itemimages/{itemimage1.name}', itemimage1)
            imageurl = default_storage.url(file_name1)
        except:
            pass
        itemimage2 = request.FILES.get("form_fields[image2item3]", None)
        try:

            file_name2 = default_storage.save(f'itemimages/{itemimage2.name}', itemimage2)
            imageurl1 = default_storage.url(file_name2)
        except:
            pass
        r = "level3"
    if "form_fields[item_name4]" in level:
        level1 = request.POST["form_fields[item_name4]"]
        ls.append(level1)
        itemcode = request.POST["form_fields[item_code4]"]
        itemdet = request.POST["form_fields[item_det4]"]
        itemuni = request.POST["form_fields[item_u_code4]"]
        itemspec = request.POST["form_fields[item_spec4]"]
        itembar = request.FILES.get("form_fields[barcodeitem4]", None)
        try:
            file_name = default_storage.save(f'itemimages/{itembar.name}', itembar)
            barurl = default_storage.url(file_name)
        except:
            pass
        itemimage1 = request.FILES.get("form_fields[image1item4]", None)
        try:
            file_name1 = default_storage.save(f'itemimages/{itemimage1.name}', itemimage1)
            imageurl = default_storage.url(file_name1)
        except:
            pass
        itemimage2 = request.FILES.get("form_fields[image2item4]", None)
        try:

            file_name2 = default_storage.save(f'itemimages/{itemimage2.name}', itemimage2)
            imageurl1 = default_storage.url(file_name2)
        except:
            pass
        r = "level4"
    if "form_fields[item_name5]" in level:
        level1 = request.POST["form_fields[item_name5]"]
        ls.append(level1)
        itemcode = request.POST["form_fields[item_code5]"]
        itemdet = request.POST["form_fields[item_det5]"]
        itemuni = request.POST["form_fields[item_u_code5]"]
        itemspec = request.POST["form_fields[item_spec5]"]
        itembar = request.FILES.get("form_fields[barcodeitem5]", None)
        try:
            file_name = default_storage.save(f'itemimages/{itembar.name}', itembar)
            barurl = default_storage.url(file_name)
        except:
            pass
        itemimage1 = request.FILES.get("form_fields[image1item5]", None)
        try:
            file_name1 = default_storage.save(f'itemimages/{itemimage1.name}', itemimage1)
            imageurl = default_storage.url(file_name1)
        except:
            pass
        itemimage2 = request.FILES.get("form_fields[image2item5]", None)
        try:

            file_name2 = default_storage.save(f'itemimages/{itemimage2.name}', itemimage2)
            imageurl1 = default_storage.url(file_name2)
        except:
            pass
        r = "level5"
    userorg = UserOrg.objects.all().filter(username=request.session["username"])
    # if userorg:
    #     for i in userorg:
    #         o=i.org
    #         odata=json.loads(o)
    #     org=odata["organisations"]
    #     try:
    #         if ls[0] in org[0][r]["items"]:
    #             return HttpResponse('<style>body{background-color: rgba(0,0,0, 0.4);}.close-btn {position: absolute;bottom: 12px;right: 25px;}.content {position: absolute;width: 250px;height: 200px;background: #fff;top: 0%;left: 50%;transform: translate(-50%, -50%)scale(0.1);visibility: hidden;transition: transform 0.4s, top 0.4s;}.open-popup {visibility: visible;top: 50%;transform: translate(-50%, -50%)scale(1);}.header {height: 50px;background: #efea53;overflow: hidden;text-align: center;}p {padding-top: 40px;text-align: center;}</style><div class="content open-popup" id="popup"><div class="header"><h2>Alert!</h2></div><p>Item name <b> ' + ls[0] + '</b> <br> already exists..</p><div><button type="button" onclick="history.back();" class="close-btn">close</button></div></div>')
    #     except:
    #         pass
    if userorg:
        for i in userorg:
            o = i.org
            odata = json.loads(o)
        org = odata["organisations"]
        # return HttpResponse(f'{org[0][r]["items"]} <br /> )
        # try:
        for i_name in org[0][r]["items"]:
            # return HttpResponse(l[)
            try:
                if ls[0] in i_name["item_name"]:
                    return HttpResponse(
                        '<style>body{background-color: rgba(0,0,0, 0.4);}.close-btn {position: absolute;bottom: 12px;right: 25px;}.content {position: absolute;width: 250px;height: 200px;background: #fff;top: 0%;left: 50%;transform: translate(-50%, -50%)scale(0.1);visibility: hidden;transition: transform 0.4s, top 0.4s;}.open-popup {visibility: visible;top: 50%;transform: translate(-50%, -50%)scale(1);}.header {height: 50px;background: #efea53;overflow: hidden;text-align: center;}p {padding-top: 40px;text-align: center;}</style><div class="content open-popup" id="popup"><div class="header"><h2>Alert!</h2></div><p>Item name <b> ' +
                        ls[
                            0] + '</b> <br> already exists..</p><div><button type="button" onclick="history.back();" class="close-btn">close</button></div></div>')
            except:
                pass
        org[0][r]["items"].append(
            {"item_name": ls[0], "item_code": itemcode, "item_details": itemdet, "item_universal_code": itemuni,
             "item_specification": itemspec, "item_barcode": barurl, "item_image1": imageurl, "item_image2": imageurl1,
             "status": "enable"})
        # return HttpResponse(f'{org}')
        field = {"document_name": request.session["username"]}
        update = {"organisations": org}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "update", field, update)
        odata["organisations"] = org
        obj, created = UserOrg.objects.update_or_create(username=request.session["username"],
                                                        defaults={'org': json.dumps(odata)})
        return redirect('/')
    else:
        return HttpResponse("no values")


@loginrequired
def edititems(request):
    r = ""
    ls = []
    # try:
    level = request.POST.keys()
    if "item_name1" and "edit_item1" in level:
        level1 = request.POST["item_name1"]
        editl = request.POST["edit_item1"]
        ls.append(level1)
        ls.append(editl)
        r = "level1"
    if "item_name2" and "edit_item2" in level:
        level2 = request.POST["item_name2"]
        edit2 = request.POST["edit_item2"]
        ls.append(level2)
        ls.append(edit2)
        r = "level2"
    if "item_name3" and "edit_item3" in level:
        level3 = request.POST["item_name3"]
        edit3 = request.POST["edit_item3"]
        ls.append(level3)
        ls.append(edit3)
        r = "level3"
    if "item_name4" and "edit_item4" in level:
        level4 = request.POST["item_name4"]
        edit4 = request.POST["edit_item4"]
        ls.append(level4)
        ls.append(edit4)
        r = "level4"
    if "item_name5" and "edit_item5" in level:
        level5 = request.POST["item_name5"]
        edit5 = request.POST["edit_item5"]
        ls.append(level5)
        ls.append(edit5)
        r = "level5"
    userorg = UserOrg.objects.all().filter(username=request.session["username"])
    if userorg:
        for i in userorg:
            o = i.org
            odata = json.loads(o)
        org = odata["organisations"]
        if ls[1] in org[0][r]["items"]:
            return HttpResponse(
                '<style>body{background-color: rgba(0,0,0, 0.4);}.close-btn {position: absolute;bottom: 12px;right: 25px;}.content {position: absolute;width: 250px;height: 200px;background: #fff;top: 0%;left: 50%;transform: translate(-50%, -50%)scale(0.1);visibility: hidden;transition: transform 0.4s, top 0.4s;}.open-popup {visibility: visible;top: 50%;transform: translate(-50%, -50%)scale(1);}.header {height: 50px;background: #efea53;overflow: hidden;text-align: center;}p {padding-top: 40px;text-align: center;}</style><div class="content open-popup" id="popup"><div class="header"><h2>Alert!</h2></div><p>Item name <b> ' +
                ls[
                    0] + '</b> <br> already exists..</p><div><button type="button" onclick="history.back();" class="close-btn">close</button></div></div>')

        else:

            org[0][r]["items"] = [item.replace(ls[0], ls[1]) for item in org[0][r]["items"]]
            # return HttpResponse(f"old : {org1} <br> new :{org}")
            field = {"document_name": request.session["username"]}
            update = {"organisations": org}
            login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                     "update", field, update)
            return redirect('/')
    else:
        return HttpResponse("no values")


@loginrequired
def Members(request):
    if request.session.get("username"):
        username = request.session["username"]
        orgnames = request.session['orgname']
        if is_ajax(request=request):
            if request.POST.get('form') == "team_member1":
                member_name = request.POST.get('member_name')
                member_code = request.POST.get('member_code')
                member_spec = request.POST.get('member_spec')
                member_u_code = request.POST.get('member_u_code', 'None')
                member_det = request.POST.get('member_det', 'None')
                membername = base64.b64encode(bytes(member_name, 'utf-8')).decode()  # bytes
                membercode = base64.b64encode(bytes(member_code, 'utf-8')).decode()
                memberspec = base64.b64encode(bytes(member_spec, 'utf-8')).decode()
                memberucode = base64.b64encode(bytes(member_u_code, 'utf-8')).decode()
                memberdet = base64.b64encode(bytes(member_det, 'utf-8')).decode()
                teammembers = base64.b64encode(bytes("team_members", 'utf-8')).decode()
                orgname = base64.b64encode(bytes(orgnames, 'utf-8')).decode()
                link = f"https://100014.pythonanywhere.com/?org={orgname}&type={teammembers}&name={membername}&code={membercode}&spec={memberspec}&u_code={memberucode}&detail={memberdet}"
                userorg = UserOrg.objects.all().filter(username=username)
                if userorg:
                    for i in userorg:
                        o = i.org
                        odata = json.loads(o)
                tmembers = {"name": member_name, "member_code": member_code, "member_spec": member_spec,
                            "member_uni_code": member_u_code, "member_details": member_det, "link": link,
                            "status": "unused"}
                odata["members"]["team_members"]["pending_members"].append(tmembers)
                field = {"document_name": username}
                mem = odata["members"]
                update = {"members": mem}
                login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                         "update", field, update)
                obj, created = UserOrg.objects.update_or_create(username=username, defaults={'org': json.dumps(odata)})

                response_data = {"link": link}
                # print(response_data["link"])
                return JsonResponse(response_data)
            elif request.POST.get('form') == "guest_member1":
                user_name = request.POST.get('user_name')
                user_code = request.POST.get('user_code')
                user_spec = request.POST.get('user_spec')
                user_u_code = request.POST.get('user_u_code', 'None')
                user_det = request.POST.get('user_det', 'None')
                membername = base64.b64encode(bytes(user_name, 'utf-8')).decode()  # bytes
                membercode = base64.b64encode(bytes(user_code, 'utf-8')).decode()
                memberspec = base64.b64encode(bytes(user_spec, 'utf-8')).decode()
                memberucode = base64.b64encode(bytes(user_u_code, 'utf-8')).decode()
                memberdet = base64.b64encode(bytes(user_det, 'utf-8')).decode()
                teammembers = base64.b64encode(bytes("guest_members", 'utf-8')).decode()
                orgname1 = base64.b64encode(bytes(orgnames, 'utf-8')).decode()
                link = f"https://100014.pythonanywhere.com/?org={orgname1}&type={teammembers}&name={membername}&code={membercode}&spec={memberspec}&u_code={memberucode}&detail={memberdet}"
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
                # print(response_data["link"])
                return JsonResponse(response_data)
            elif request.POST.get('form') == "lavimember":
                public_name = request.POST.get('public_name', None)
                autopublic = request.POST.get('autopublic', None)
                if int(public_name) > 2000:
                    response_data = {"public_name": "Pl provide below less than 2000", "autopublic": "t"}
                    return JsonResponse(response_data)
                if public_name:
                    links = []

                    org = base64.b64encode(bytes(request.session["present_org"], 'utf-8')).decode()
                    pmembers = base64.b64encode(bytes("public_member", 'utf-8')).decode()
                    for i in range(int(public_name)):
                        user = passgen.generate_random_password1(12)
                        linkcode = passgen.generate_random_password1(16)
                        path = f'https://100093.pythonanywhere.com/invitesocial?next={org}&type={pmembers}&code={user}'
                        qrcodegen.qrgen1(path, user, f"clientadmin/media/userqrcodes/{user}.png")
                        links.append(path)
                        publiclink.objects.create(dateof=datetime.datetime.now(), org=request.session["present_org"],
                                                  username=request.session["username"], link=path, linkstatus="unused",
                                                  productstatus="unused", qrcodeid=user,
                                                  qrpath=f'https://100093.pythonanywhere.com/media/userqrcodes/{user}.png',
                                                  linkcode=linkcode)
                    response_data = {"public_name": "Successfully create", "autopublic": "d"}
                    # print(response_data["link"])
                    return JsonResponse(response_data)
                else:
                    return JsonResponse({"public_name": "Pl provide a number", "autopublic": "fsaf"})
    else:
        return redirect("/")


@loginrequired
def InviteMembers(request):
    if request.session.get("username"):
        if is_ajax(request=request):
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
            if request.POST.get('form') == "temailsent":
                email = request.POST.get('email', 'None')
                link = request.POST.get('link', 'None')
                if not "Invitation Link" in link:
                    if email:
                        email_body = email_body.replace('{{link}}', link).replace('{{brand}}',
                                                                                  request.session["username"])
                        o = request.session["orgname"]
                        subject = f'Invitation to Join {o}'
                        from_email = 'uxlivinglab@dowellresearch.sg'
                        to_email = email
                        send_mail(subject, "lav", from_email, [to_email], fail_silently=False, html_message=email_body)
                        return JsonResponse({"msg": f"Succefully sent invitation to {email}"})
                    else:
                        return JsonResponse({"msg": "Enter Email"})

                else:
                    return JsonResponse({"msg": "Firstly create link"})

            if request.POST.get('form') == "gemailsent":
                email1 = request.POST.get('email1', 'None')
                link1 = request.POST.get('link1', 'None')
                if not "Invitation Link" in link1:
                    if email1:

                        email_body = email_body.replace('{{link}}', link1).replace('{{brand}}',
                                                                                   request.session["username"])
                        o = request.session["orgname"]
                        subject1 = f'Invitation to Join {o}'
                        from_email1 = 'uxlivinglab@dowellresearch.sg'
                        to_email1 = email1
                        send_mail(subject1, "lav", from_email1, [to_email1], fail_silently=False,
                                  html_message=email_body)
                        return JsonResponse({"msg": f"Succefully sent invitation to {email1}"})
                    else:
                        return JsonResponse({"msg": "Enter Email"})

                else:
                    return JsonResponse({"msg": "Firstly create link"})
    else:
        return redirect("/")


@loginrequired
def Settings(request):
    context = {}
    username = request.session["username"]
    user_org = UserOrg.objects.all().filter(username=username)
    for it in user_org:
        data12 = it.org
        datalav = json.loads(data12)
    context["datalav"] = datalav

    admin_id = request.session.get("document_id")
    field = {"admin_id": admin_id}
    forg = dowellconnection("login", "bangalore", "login", "login_settings", "login_settings", "1202001", "ABCDE",
                            "find", field, "nil")
    settings_res = json.loads(forg)
    context["settings"] = settings_res["data"]
    if settings_res["data"] is None:
        with open('organisation.json') as json_file:
            data = json.load(json_file)
            data["admin_id"]=request.session["document_id"]
            data["username"]=request.session["username"]
            data["org_name"]=request.session["orgname"]
            # data["last_name"]=user["userinfo"]["last_name"]
            field1=data
            # return HttpResponse(f'{field1}')
            dowellconnection("login","bangalore","login","login_settings","login_settings","1202001","ABCDE","insert",field1,"nil")
            field={"admin_id":admin_id}
            forg=dowellconnection("login","bangalore","login","login_settings","login_settings","1202001","ABCDE","find",field,"nil")
            settings_res=json.loads(forg)
            context["settings"]=settings_res["data"]
    if request.method == 'POST':
        selected_workspace = request.POST.get('workspace', '')
        status = request.POST.get('form_fields[enablediable]', '')
        product = request.POST.get('product', '')
        timelimit_member = request.POST.get('form_fields[timelimitmember]', '')
        timelimit_users = request.POST.get('form_fields[timelimitusers]', '')
        selected_language = request.POST.get('form_fields[selectlanguagedefault]')
        minimum_speed = request.POST.get('form_fields[minimumspeed]')
        speed_test = request.POST.get('form_fields[speedtestperday]')
        updated_product = request.POST.get('form_fields[allproducts]')
        plans = request.POST.get('form_fields[productplans]')
        time_limit_disconnect = request.POST.get('form_fields[timelimitdisconnect]')
        time_limit_connect = request.POST.get('form_fields[timelimitconnect]')
        permitted_attempts = request.POST.get('form_fields[permittedattempts]')
        notifications = request.POST.get('form_fields[notifyoptions]')
        methods = request.POST.getlist('form_fields[notifyoptions1][]')
        colour_patterns = request.POST.get('form_fields[colourpatterns]')
        operational_rights = request.POST.get('form_fields[operationalrights]')
        admin_process = request.POST.get('form_fields[adminprocess]')
        portfolio_list = request.POST.getlist('form_fields[portflioset][]')
        mandatory_sections = request.POST.getlist('form_fields[sections][]')
        admin_id = request.session.get("document_id")
        username = request.session["username"]
        field_c = {"document_name": username}
        login = dowellconnection(
            "login", "bangalore", "login", "client_admin", "client_admin",
            "1159", "ABCDE", "fetch", field_c, "nil")
        resp = json.loads(login)
        product_list = resp["data"][0]["products"]
        # check if the first item in product_list is a dictionary
        if product_list and isinstance(product_list[0], dict):
            # iterate over the product list
            for item in product_list:
                # check if product_name matches the product
                if item['product_name'] == product:
                    # update the product_status
                    item['product_status'] = status
                    break
        update_products = {"products": product_list}
        dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE", "update", field, update_products)
        field_l={"admin_id":admin_id}
        update = {}  # start with an empty dictionary

        if selected_workspace:
            update["default_org"] = selected_workspace
        if timelimit_member:
            update["maxtime_member"] = timelimit_member
        if timelimit_users:
            update["maxtime_user"] = timelimit_users
        if selected_language:
            update["default_language"] = selected_language
        if minimum_speed:
            update["internet_min_speed"] = minimum_speed
        if updated_product and plans:  # assuming both fields are required for a valid product_plan
            update["product_plan"] = [{"product_name": updated_product, "plans": plans}]
        if time_limit_disconnect:
            update["disconn_idle"] = time_limit_disconnect
        if time_limit_connect:
            update["permit_to_connect"] = time_limit_connect
        if permitted_attempts:
            update["no_of_conn"] = permitted_attempts
        if admin_process and operational_rights and portfolio_list:  # assuming all fields are required for a valid processes_to_portfolio
            update["processes_to_portfolio"] = [{"process": admin_process, "rights": operational_rights, "portfolios": portfolio_list}]
        # if methods:
        #     update["chat_method"] = methods
        if colour_patterns:
            update["color_scheme"] = colour_patterns
        if mandatory_sections:
            update["mandatory_sections"] = mandatory_sections
        if notifications == "Chat":
            update["chat_method"] = methods
        if notifications == "UX Living Lab":
            update["uxlivinglab_method"] = methods
        print(update)
        # update={
        #     # "admin_id": admin_id,
        #     # "username": username,
        #     "default_org": selected_workspace,
        #     "maxtime_member": timelimit_member,
        #     "maxtime_user": timelimit_users,
        #     "default_language": selected_language,
        #     "internet_min_speed": minimum_speed,
        #     "product_plan": [{"product_name": updated_product, "plans": plans}],
        #     "disconn_idle": time_limit_disconnect,
        #     "permit_to_connect": time_limit_connect,
        #     "no_of_conn": permitted_attempts,
        #     "processes_to_portfolio": [{"process": admin_process, "rights": operational_rights, "portfolios": portfolio_list}],
        #     "chat_method": methods,
        #     "color_scheme": colour_patterns
        # }
        status = dowellconnection("login","bangalore","login","login_settings","login_settings","1202001","ABCDE","update",field_l,update)
        print(status)

    return render(request, "settings.html", context)


def InviteLink(request):
    context = {}
    spec1 = ""
    uni_code = ""
    detail1 = ""
    url_id = request.GET.get('session_id', None)
    try:
        orgs = base64.b64decode(request.GET.get('org', None).encode('utf-8')).decode()
        type1 = base64.b64decode(request.GET.get('type', None).encode('utf-8')).decode()
        name1 = base64.b64decode(request.GET.get('name', None).encode('utf-8')).decode()
        u_code = base64.b64decode(request.GET.get('code', None).encode('utf-8')).decode()
        spec1 = base64.b64decode(request.GET.get('spec', None).encode('utf-8')).decode()
        uni_code = base64.b64decode(request.GET.get('u_code', None).encode('utf-8')).decode()
        detail1 = base64.b64decode(request.GET.get('detail', None).encode('utf-8')).decode()
    except:
        pass

    if url_id is not None:
        url = "https://100014.pythonanywhere.com/api/userinfo/"
        resp = requests.post(url, data={"session_id": url_id})
        try:
            user = json.loads(resp.text)

        except:
            return HttpResponse(
                '<style>body{background-color: rgba(0,0,0, 0.4);}.close-btn {position: absolute;bottom: 12px;right: 25px;}.content {position: absolute;width: 250px;height: 200px;background: #fff;top: 0%;left: 50%;transform: translate(-50%, -50%)scale(0.1);visibility: hidden;transition: transform 0.4s, top 0.4s;}.open-popup {visibility: visible;top: 50%;transform: translate(-50%, -50%)scale(1);}.header {height: 50px;background: #efea53;overflow: hidden;text-align: center;}p {padding-top: 40px;text-align: center;}</style><div class="content open-popup" id="popup"><div class="header"><h2>Alert!</h2></div><p>Some thing went wrong pl <a href="/logout" >logout </a> <a href="/">login</a> again</p><div><button type="button" onclick="history.back();" class="close-btn">close</button></div></div>')
        userorg = UserOrg.objects.all().filter(username=user["userinfo"]["username"])
        # return HttpResponse(f'{userorg}')
        if userorg:
            for rd in userorg:
                lo1 = rd.org
                datalav = json.loads(lo1)
        else:
            field = {"document_name": user["userinfo"]["username"]}
            login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                     "fetch", field, "update")
            r = json.loads(login)
            obj, created = UserOrg.objects.update_or_create(username=user["userinfo"]["username"],
                                                            defaults={'org': json.dumps(r["data"][0])})
            datalav = r["data"][0]
        for its in datalav["members"][type1]["pending_members"]:
            try:
                if its["name"] == name1:
                    return HttpResponse(
                        f'<script>alert("You already used <br> go to home page");window.location.href = "https://100093.pythonanywhere.com?session_id={url_id}";</script>')
            except:
                pass
        user_org = {"org_name": orgs, "portfolio": []}

        if orgs:
            username = user["userinfo"]["username"]
            alias = ""
            if username == name1:
                usern = username
            else:
                try:
                    usern = username
                    alias = name1
                except:
                    pass
            updatem = {"name": usern, "member_code": u_code, "member_spec": spec1, "member_uni_code": uni_code,
                       "member_details": detail1, "status": "enable",
                       "first_name": datalav["profile_info"]["first_name"],
                       "last_name": datalav["profile_info"]["last_name"], "email": user["userinfo"]["email"],
                       "alias": alias}

            owner = UserOrg.objects.all().filter(username=orgs)
            if owner:
                for i in owner:
                    o = i.org
                    odata = json.loads(o)
                mem = odata["members"]

                for checkusr in mem[type1]["accept_members"]:
                    try:
                        if checkusr["name"] == usern:
                            return HttpResponse(
                                f'<script>alert("You already exist in {orgs} organisation <br> go to home page");window.location.href = "https://100093.pythonanywhere.com?session_id={url_id}";</script>')
                    except:
                        pass
                other_org = []
                for imem in mem[type1]["pending_members"]:
                    try:
                        if imem["name"] == name1:
                            imem["status"] = "used"
                    except:
                        pass
                mem[type1]["accept_members"].append(updatem)

                other_org = datalav["other_organisation"]
                other_org.append(user_org)
                # return HttpResponse(f'{other_org}')
                field = {"document_name": orgs}
                update = {"members": mem}
                login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                         "update", field, update)
                field1 = {"document_name": username}
                update1 = {"other_organisation": other_org}
                login1 = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159",
                                          "ABCDE", "update", field1, update1)
                odata["members"] = mem
                obj, created = UserOrg.objects.update_or_create(username=orgs, defaults={'org': json.dumps(odata)})
                datalav["other_organisation"] = other_org
                obj, created = UserOrg.objects.update_or_create(username=username,
                                                                defaults={'org': json.dumps(datalav)})
                return redirect('/')
            else:
                return HttpResponse("its not working")
                # field={"document_name":user["userinfo"]["username"]}
                # login=dowellconnection("login","bangalore","login","client_admin","client_admin","1159","ABCDE","fetch",field,"update")
                # r=json.loads(login)

                # obj, created = UserOrg.objects.update_or_create(username=user["userinfo"]["username"],defaults={'org': json.dumps(r["data"][0])})
        else:
            return redirect('home')

    else:
        return redirect(f"https://100014.pythonanywhere.com/?redirect_url={environmentURL}/home")


@loginrequired
def StatusChange(request):
    context = {}
    username = request.session["username"]
    if request.method == "POST":
        if request.POST.get('formname') == "portfolio":
            status = request.POST.get("form_fields[selectenabledisable]", None)
            pnamer = request.POST.get("form_fields[enabledportfolios]", None)
            pnamee = request.POST.get("form_fields[disabledportfolios]", None)
            if "Select" in status:
                return HttpResponse("<script>alert('choose portfolio');history.back();</script>")
            elif status == "disable" and "Select" not in pnamer:
                pname = pnamer
            elif status == "enable" and "Select" not in pnamee:
                pname = pnamee
            else:
                pname = 'check'
            if pname is None or "Select" in pname:
                return HttpResponse("<script>alert('choose portfolio');history.back();</script>")

            if pname is not None and "Select" not in status:
                userorg = UserOrg.objects.all().filter(username=username)
                for i in userorg:
                    dataorg = i.org
                    dataorg1 = json.loads(dataorg)
                rot = dataorg1["portpolio"]
                for ir in rot:
                    if ir["portfolio_name"] == pname:
                        membertype = ir["member_type"]
                        username1 = ir["username"]
                        ir["status"] = status
                dataorg1["portpolio"] = rot
                # return HttpResponse(username1)
                obj, created = UserOrg.objects.update_or_create(username=username,
                                                                defaults={'org': json.dumps(dataorg1)})
                field = {"document_name": username}
                update = {"portpolio": rot}
                login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                         "update", field, update)
                try:
                    if "public" in membertype:
                        return redirect(f'/?session_id={request.session["session_id"]}')
                except:
                    pass
                if type(username1) is list:
                    for name in username1:
                        field1 = {"document_name": name}
                        login1 = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159",
                                                  "ABCDE", "fetch", field1, "update")
                        r = json.loads(login1)
                        forlocal = r["data"][0]
                        lo = r["data"][0]["other_organisation"]
                        raj = "raj"
                        for irm in lo:
                            try:
                                if irm["portfolio_name"] == pname:
                                    irm["status"] = status
                                    raj = "raju"
                            except:
                                pass
                        if raj == "raju":
                            field = {"document_name": name}
                            update = {"other_organisation": lo}
                            forlocal["other_organisation"] = lo
                            obj, created = UserOrg.objects.update_or_create(username=name,
                                                                            defaults={'org': json.dumps(forlocal)})
                            login2 = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin",
                                                      "1159", "ABCDE", "update", field, update)
                            return redirect('/')
                        else:
                            return HttpResponse(
                                '<style>body{background-color: rgba(0,0,0, 0.4);}.close-btn {position: absolute;bottom: 12px;right: 25px;}.content {position: absolute;width: 250px;height: 200px;background: #fff;top: 0%;left: 50%;transform: translate(-50%, -50%)scale(0.1);visibility: hidden;transition: transform 0.4s, top 0.4s;}.open-popup {visibility: visible;top: 50%;transform: translate(-50%, -50%)scale(1);}.header {height: 50px;background: #efea53;overflow: hidden;text-align: center;}p {padding-top: 40px;text-align: center;}</style><div class="content open-popup" id="popup"><div class="header"><h2>Alert!</h2></div><p>Something wrong try again<br> ..</p><div><button type="button" onclick="history.back();" class="close-btn">close</button></div></div>')

                else:
                    field1 = {"document_name": username1}
                    login1 = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159",
                                              "ABCDE", "fetch", field1, "update")
                    r = json.loads(login1)
                    forlocal = r["data"][0]
                    lo = r["data"][0]["other_organisation"]
                    raj = "raj"
                    for irm in lo:
                        try:
                            if irm["portfolio_name"] == pname:
                                irm["status"] = status
                                raj = "raju"
                        except:
                            pass
                    if raj == "raju":
                        field = {"document_name": username1}
                        update = {"other_organisation": lo}
                        forlocal["other_organisation"] = lo
                        obj, created = UserOrg.objects.update_or_create(username=username1,
                                                                        defaults={'org': json.dumps(forlocal)})
                        login2 = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159",
                                                  "ABCDE", "update", field, update)
                        return redirect('/')
                    else:
                        return HttpResponse(
                            '<style>body{background-color: rgba(0,0,0, 0.4);}.close-btn {position: absolute;bottom: 12px;right: 25px;}.content {position: absolute;width: 250px;height: 200px;background: #fff;top: 0%;left: 50%;transform: translate(-50%, -50%)scale(0.1);visibility: hidden;transition: transform 0.4s, top 0.4s;}.open-popup {visibility: visible;top: 50%;transform: translate(-50%, -50%)scale(1);}.header {height: 50px;background: #efea53;overflow: hidden;text-align: center;}p {padding-top: 40px;text-align: center;}</style><div class="content open-popup" id="popup"><div class="header"><h2>Alert!</h2></div><p>Something wrong try again<br> ..</p><div><button type="button" onclick="history.back();" class="close-btn">close</button></div></div>')

        else:
            return HttpResponse(f'{status},{pname} is check')


@loginrequired
def En_dis(request):
    username = request.session["username"]
    if request.method == "POST":
        if request.POST.get('formname') == "roles":
            status = request.POST.get("form_fields[enabledisablerole]", None)

            if status == "enable":
                role = request.POST.get("form_fields[rolessearchresultdisabled]", None)
                if "select" in role:
                    return HttpResponse(
                        '<style>body{background-color: rgba(0,0,0, 0.4);}.close-btn {position: absolute;bottom: 12px;right: 25px;}.content {position: absolute;width: 250px;height: 200px;background: #fff;top: 0%;left: 50%;transform: translate(-50%, -50%)scale(0.1);visibility: hidden;transition: transform 0.4s, top 0.4s;}.open-popup {visibility: visible;top: 50%;transform: translate(-50%, -50%)scale(1);}.header {height: 50px;background: #efea53;overflow: hidden;text-align: center;}p {padding-top: 40px;text-align: center;}</style><div class="content open-popup" id="popup"><div class="header"><h2>Alert!</h2></div><p>Select the role you want disable<br> ..</p><div><button type="button" onclick="history.back();" class="close-btn">close</button></div></div>')
            elif status == "disable":
                role = request.POST.get("form_fields[rolessearchresultenabled]", None)
                if "select" in role:
                    return HttpResponse(
                        '<style>body{background-color: rgba(0,0,0, 0.4);}.close-btn {position: absolute;bottom: 12px;right: 25px;}.content {position: absolute;width: 250px;height: 200px;background: #fff;top: 0%;left: 50%;transform: translate(-50%, -50%)scale(0.1);visibility: hidden;transition: transform 0.4s, top 0.4s;}.open-popup {visibility: visible;top: 50%;transform: translate(-50%, -50%)scale(1);}.header {height: 50px;background: #efea53;overflow: hidden;text-align: center;}p {padding-top: 40px;text-align: center;}</style><div class="content open-popup" id="popup"><div class="header"><h2>Alert!</h2></div><p>Select the role you want enable<br> ..</p><div><button type="button" onclick="history.back();" class="close-btn">close</button></div></div>')
            else:
                return HttpResponse("something wrong contact system admin")
            userorg = UserOrg.objects.all().filter(username=username)
            for i in userorg:
                dataorg = i.org
                dataorg1 = json.loads(dataorg)
            rot = dataorg1["roles"]
            for ir in rot:
                if ir["role_name"] == role:
                    ir["status"] = status
            dataorg1["roles"] = rot
            obj, created = UserOrg.objects.update_or_create(username=username, defaults={'org': json.dumps(dataorg1)})

            field = {"document_name": username}
            update = {"roles": rot}
            login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                     "update", field, update)
            return redirect('/')
        elif request.POST.get('formname') == "levels":
            if request.POST.get('level') == "level1":
                level = "level1"
                status = request.POST.get("form_fields[enabledisableitemlevel1]", None)
                if status == "enable":
                    itemname = request.POST.get("form_fields[itemlevel1ssearchresultdisabled]", None)
                    if "select" in itemname:
                        return HttpResponse(
                            '<style>body{background-color: rgba(0,0,0, 0.4);}.close-btn {position: absolute;bottom: 12px;right: 25px;}.content {position: absolute;width: 250px;height: 200px;background: #fff;top: 0%;left: 50%;transform: translate(-50%, -50%)scale(0.1);visibility: hidden;transition: transform 0.4s, top 0.4s;}.open-popup {visibility: visible;top: 50%;transform: translate(-50%, -50%)scale(1);}.header {height: 50px;background: #efea53;overflow: hidden;text-align: center;}p {padding-top: 40px;text-align: center;}</style><div class="content open-popup" id="popup"><div class="header"><h2>Alert!</h2></div><p>Select the Item you want disable<br> ..</p><div><button type="button" onclick="history.back();" class="close-btn">close</button></div></div>')

                elif status == "disable":
                    itemname = request.POST.get("form_fields[itemlevel1searchresultenabled]", None)
                    if "select" in itemname:
                        return HttpResponse(
                            '<style>body{background-color: rgba(0,0,0, 0.4);}.close-btn {position: absolute;bottom: 12px;right: 25px;}.content {position: absolute;width: 250px;height: 200px;background: #fff;top: 0%;left: 50%;transform: translate(-50%, -50%)scale(0.1);visibility: hidden;transition: transform 0.4s, top 0.4s;}.open-popup {visibility: visible;top: 50%;transform: translate(-50%, -50%)scale(1);}.header {height: 50px;background: #efea53;overflow: hidden;text-align: center;}p {padding-top: 40px;text-align: center;}</style><div class="content open-popup" id="popup"><div class="header"><h2>Alert!</h2></div><p>Select the Item you want enable<br> ..</p><div><button type="button" onclick="history.back();" class="close-btn">close</button></div></div>')
                else:
                    return HttpResponse("something wrong contact system admin")
            if request.POST.get('level') == "level2":
                level = "level2"
                status = request.POST.get("form_fields[enabledisableitemlevel2]", None)
                if status == "enable":
                    itemname = request.POST.get("form_fields[itemlevel2ssearchresultdisabled]", None)
                    if "select" in itemname:
                        return HttpResponse(
                            '<style>body{background-color: rgba(0,0,0, 0.4);}.close-btn {position: absolute;bottom: 12px;right: 25px;}.content {position: absolute;width: 250px;height: 200px;background: #fff;top: 0%;left: 50%;transform: translate(-50%, -50%)scale(0.1);visibility: hidden;transition: transform 0.4s, top 0.4s;}.open-popup {visibility: visible;top: 50%;transform: translate(-50%, -50%)scale(1);}.header {height: 50px;background: #efea53;overflow: hidden;text-align: center;}p {padding-top: 40px;text-align: center;}</style><div class="content open-popup" id="popup"><div class="header"><h2>Alert!</h2></div><p>Select the Item you want disable<br> ..</p><div><button type="button" onclick="history.back();" class="close-btn">close</button></div></div>')

                elif status == "disable":
                    itemname = request.POST.get("form_fields[itemlevel2searchresultenabled]", None)
                    if "select" in itemname:
                        return HttpResponse(
                            '<style>body{background-color: rgba(0,0,0, 0.4);}.close-btn {position: absolute;bottom: 12px;right: 25px;}.content {position: absolute;width: 250px;height: 200px;background: #fff;top: 0%;left: 50%;transform: translate(-50%, -50%)scale(0.1);visibility: hidden;transition: transform 0.4s, top 0.4s;}.open-popup {visibility: visible;top: 50%;transform: translate(-50%, -50%)scale(1);}.header {height: 50px;background: #efea53;overflow: hidden;text-align: center;}p {padding-top: 40px;text-align: center;}</style><div class="content open-popup" id="popup"><div class="header"><h2>Alert!</h2></div><p>Select the Item you want enable<br> ..</p><div><button type="button" onclick="history.back();" class="close-btn">close</button></div></div>')
                else:
                    return HttpResponse("something wrong contact system admin")
            if request.POST.get('level') == "level3":
                level = "level3"
                status = request.POST.get("form_fields[enabledisableitemlevel3]", None)
                if status == "enable":
                    itemname = request.POST.get("form_fields[itemlevel3ssearchresultdisabled]", None)
                    if "select" in itemname:
                        return HttpResponse(
                            '<style>body{background-color: rgba(0,0,0, 0.4);}.close-btn {position: absolute;bottom: 12px;right: 25px;}.content {position: absolute;width: 250px;height: 200px;background: #fff;top: 0%;left: 50%;transform: translate(-50%, -50%)scale(0.1);visibility: hidden;transition: transform 0.4s, top 0.4s;}.open-popup {visibility: visible;top: 50%;transform: translate(-50%, -50%)scale(1);}.header {height: 50px;background: #efea53;overflow: hidden;text-align: center;}p {padding-top: 40px;text-align: center;}</style><div class="content open-popup" id="popup"><div class="header"><h2>Alert!</h2></div><p>Select the Item you want disable<br> ..</p><div><button type="button" onclick="history.back();" class="close-btn">close</button></div></div>')

                elif status == "disable":
                    itemname = request.POST.get("form_fields[itemlevel3searchresultenabled]", None)
                    if "select" in itemname:
                        return HttpResponse(
                            '<style>body{background-color: rgba(0,0,0, 0.4);}.close-btn {position: absolute;bottom: 12px;right: 25px;}.content {position: absolute;width: 250px;height: 200px;background: #fff;top: 0%;left: 50%;transform: translate(-50%, -50%)scale(0.1);visibility: hidden;transition: transform 0.4s, top 0.4s;}.open-popup {visibility: visible;top: 50%;transform: translate(-50%, -50%)scale(1);}.header {height: 50px;background: #efea53;overflow: hidden;text-align: center;}p {padding-top: 40px;text-align: center;}</style><div class="content open-popup" id="popup"><div class="header"><h2>Alert!</h2></div><p>Select the Item you want enable<br> ..</p><div><button type="button" onclick="history.back();" class="close-btn">close</button></div></div>')
                else:
                    return HttpResponse("something wrong contact system admin")
            if request.POST.get('level') == "level4":
                level = "level4"
                status = request.POST.get("form_fields[enabledisableitemlevel4]", None)
                if status == "enable":
                    itemname = request.POST.get("form_fields[itemlevel4ssearchresultdisabled]", None)
                    if "select" in itemname:
                        return HttpResponse(
                            '<style>body{background-color: rgba(0,0,0, 0.4);}.close-btn {position: absolute;bottom: 12px;right: 25px;}.content {position: absolute;width: 250px;height: 200px;background: #fff;top: 0%;left: 50%;transform: translate(-50%, -50%)scale(0.1);visibility: hidden;transition: transform 0.4s, top 0.4s;}.open-popup {visibility: visible;top: 50%;transform: translate(-50%, -50%)scale(1);}.header {height: 50px;background: #efea53;overflow: hidden;text-align: center;}p {padding-top: 40px;text-align: center;}</style><div class="content open-popup" id="popup"><div class="header"><h2>Alert!</h2></div><p>Select the Item you want disable<br> ..</p><div><button type="button" onclick="history.back();" class="close-btn">close</button></div></div>')

                elif status == "disable":
                    itemname = request.POST.get("form_fields[itemlevel4searchresultenabled]", None)
                    if "select" in itemname:
                        return HttpResponse(
                            '<style>body{background-color: rgba(0,0,0, 0.4);}.close-btn {position: absolute;bottom: 12px;right: 25px;}.content {position: absolute;width: 250px;height: 200px;background: #fff;top: 0%;left: 50%;transform: translate(-50%, -50%)scale(0.1);visibility: hidden;transition: transform 0.4s, top 0.4s;}.open-popup {visibility: visible;top: 50%;transform: translate(-50%, -50%)scale(1);}.header {height: 50px;background: #efea53;overflow: hidden;text-align: center;}p {padding-top: 40px;text-align: center;}</style><div class="content open-popup" id="popup"><div class="header"><h2>Alert!</h2></div><p>Select the Item you want enable<br> ..</p><div><button type="button" onclick="history.back();" class="close-btn">close</button></div></div>')
                else:
                    return HttpResponse("something wrong contact system admin")
            if request.POST.get('level') == "level5":
                level = "level5"
                status = request.POST.get("form_fields[enabledisableitemlevel5]", None)
                if status == "enable":
                    itemname = request.POST.get("form_fields[itemlevel5ssearchresultdisabled]", None)
                    if "select" in itemname:
                        return HttpResponse(
                            '<style>body{background-color: rgba(0,0,0, 0.4);}.close-btn {position: absolute;bottom: 12px;right: 25px;}.content {position: absolute;width: 250px;height: 200px;background: #fff;top: 0%;left: 50%;transform: translate(-50%, -50%)scale(0.1);visibility: hidden;transition: transform 0.4s, top 0.4s;}.open-popup {visibility: visible;top: 50%;transform: translate(-50%, -50%)scale(1);}.header {height: 50px;background: #efea53;overflow: hidden;text-align: center;}p {padding-top: 40px;text-align: center;}</style><div class="content open-popup" id="popup"><div class="header"><h2>Alert!</h2></div><p>Select the Item you want disable<br> ..</p><div><button type="button" onclick="history.back();" class="close-btn">close</button></div></div>')

                elif status == "disable":
                    itemname = request.POST.get("form_fields[itemlevel5searchresultenabled]", None)
                    if "select" in itemname:
                        return HttpResponse(
                            '<style>body{background-color: rgba(0,0,0, 0.4);}.close-btn {position: absolute;bottom: 12px;right: 25px;}.content {position: absolute;width: 250px;height: 200px;background: #fff;top: 0%;left: 50%;transform: translate(-50%, -50%)scale(0.1);visibility: hidden;transition: transform 0.4s, top 0.4s;}.open-popup {visibility: visible;top: 50%;transform: translate(-50%, -50%)scale(1);}.header {height: 50px;background: #efea53;overflow: hidden;text-align: center;}p {padding-top: 40px;text-align: center;}</style><div class="content open-popup" id="popup"><div class="header"><h2>Alert!</h2></div><p>Select the Item you want enable<br> ..</p><div><button type="button" onclick="history.back();" class="close-btn">close</button></div></div>')
                else:
                    return HttpResponse("something wrong contact system admin")
            userorg = UserOrg.objects.all().filter(username=username)
            for i in userorg:
                dataorg = i.org
                dataorg1 = json.loads(dataorg)

            lev = dataorg1["organisations"]

            for ir in lev[0][level]["items"]:
                try:
                    if ir["item_name"] == itemname:
                        ir["status"] = status
                except:
                    pass
            dataorg1["organisations"] = lev
            # return HttpResponse(f'{lev}')
            obj, created = UserOrg.objects.update_or_create(username=username, defaults={'org': json.dumps(dataorg1)})

            field = {"document_name": username}
            update = {"organisations": lev}
            login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                     "update", field, update)
            return redirect('/')
        else:
            return HttpResponse("something wrong contact system admin")


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


def custom_page_not_found_view(request, exception):
    context = {}
    context["number"] = 4
    context["number1"] = 4
    context["text"] = "Oops, the page you're looking is not found"
    return render(request, "errors/404.html", context)


def custom_error_view(request, exception=None):
    context = {}
    context["number"] = 5
    context["number1"] = 0
    context[
        "text"] = "Oops, Something Wrong! do the following steps <br> <ul style='color:white;font-size:26px;'><li><a style='color:white;font-weight:bold' href='/logout'>Sign out</a> and Sign In again ...</li><li>Contact system administrator</li></ul>"
    return render(request, "errors/404.html", context)


def custom_permission_denied_view(request, exception=None):
    context = {}
    context["number"] = 5
    context["number1"] = 3
    return render(request, "errors/404.html", context)


def custom_bad_request_view(request, exception=None):
    context = {}
    context["number"] = 4
    context["number1"] = 0
    return render(request, "errors/404.html", {})


def speedcheck(request):
    return render(request, "speedcheck.html")


def Logout(request):
    d = request.session.get("session_id")
    # return HttpResponse(d)
    # equest.session.modified = True
    if d:
        try:
            del request.session["username"]
            del request.session["present_org"]
            del request.session["orgname"]
            del request.session["session_id"]
            return redirect("https://100014.pythonanywhere.com/sign-out")
        except:
            return redirect("https://100014.pythonanywhere.com/sign-out")
    else:
        return redirect("https://100014.pythonanywhere.com/sign-out")


@csrf_exempt
def portfolioUrl(request):
    # post portfolio and product and org , session idas url parameters
    if request.session["session_id"]:
        session_c = request.session["session_id"]
    else:
        session_c = request.GET.get("session_id")
    # return HttpResponse(f'{session_c}and{request.session["session_id"]}')
    if session_c:
        # if request.method=="POST":
        portf = request.GET.get("portfolio")
        product = request.GET.get("product")

        # return HttpResponse(product)
        user = request.GET.get("username")
        orl = request.GET.get("org")
        session = request.session["session_id"]
        # return HttpResponse(f'{session_c} port {portf}')
        lo = UserOrg.objects.all().filter(username=orl)
        for rd in lo:
            lo1 = rd.org
            lrf = json.loads(lo1)
        mydict = {}

        ro = UserInfo.objects.all().filter(username=user)
        ro1 = UserOrg.objects.all().filter(username=user)

        for i in ro:
            rofield = i.userinfo
            # s = rofield.replace("\'", "\"")
            s = json.loads(rofield)
            mydict["userinfo"] = s

        if orl == user:
            lrst = []
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
            if "Workflow AI" in product or "workflow" in product:
                # return redirect(f'https://ll04-finance-dowell.github.io/100018-dowellWorkflowAi-testing/?session_id={request.session["session_id"]}&id=100093')
                return redirect(
                    f'https://ll04-finance-dowell.github.io/100018-dowellWorkflowAi-testing/#/?session_id={request.session["session_id"]}&id=100093')

            elif "Scale" in product or "scales" in product:
                return redirect(
                    f'https://100035.pythonanywhere.com/client?session_id={request.session["session_id"]}&id=100093')
            elif "Legalzar" in product or "Legalzard" in product:
                return redirect(f'https://play.google.com/store/apps/details?id=com.legalzard.policies')
            elif "Calculator" in product:
                return redirect(
                    f'https://100050.pythonanywhere.com/calculator/?session_id={request.session["session_id"]}&id=100093')
            elif "Team" in product:
                return redirect(
                    f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={request.session["session_id"]}&id=100093')
            elif "Wifi" in product:
                return redirect(
                    f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={request.session["session_id"]}&id=100093')
            elif "UX" in product:
                return redirect(
                    f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={request.session["session_id"]}&id=100093')
            elif "Media" in product:
                return redirect(f'https://100007.pythonanywhere.com/')
            elif "Logo" in product:
                return redirect(
                    f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={request.session["session_id"]}&id=100093')
            elif "Chat" in product:
                return redirect(
                    f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={request.session["session_id"]}&id=100093')
            elif "Maps" in product:
                return redirect(
                    f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={request.session["session_id"]}&id=100093')
            elif "Digital" in product:
                return redirect(
                    f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={request.session["session_id"]}&id=100093')
            elif "Experience" in product:
                return redirect(
                    f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={request.session["session_id"]}&id=100093')
            elif "Admin" in product:
                return redirect(
                    f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={request.session["session_id"]}&id=100093')
            elif "Management" in product:
                return redirect(
                    f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={request.session["session_id"]}&id=100093')
            elif "Monitoring" in product:
                return redirect(
                    f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={request.session["session_id"]}&id=100093')
            elif "Dashboard" in product:
                return redirect(
                    f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={request.session["session_id"]}&id=100093')
            elif "Agent" in product:
                return redirect(
                    f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={request.session["session_id"]}&id=100093')
            elif "Support" in product:
                return redirect(
                    f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={request.session["session_id"]}&id=100093')
            elif "Repositories" in product:
                return redirect(f'https://ll07-team-dowell.github.io/100045-SecureRepository/')
            elif "Data" in product:
                return redirect(
                    f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={request.session["session_id"]}&id=100093')


            else:
                return HttpResponse(
                    f"<h1 align='center'>Redirect the URL of this {product} product not avail in database<br><a href='/'>Home</a></h1>")

        for ii in ro1:
            pfield = ii.org
            # s = rofield.replace("\'", "\"")
            ss = json.loads(pfield)
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

        if "Workflow AI" in product or "workflow" in product:
            # return redirect(f'https://ll04-finance-dowell.github.io/100018-dowellWorkflowAi-testing/?session_id={request.session["session_id"]}&id=100093')
            return redirect(
                f'https://ll04-finance-dowell.github.io/100018-dowellWorkflowAi-testing/#/?session_id={request.session["session_id"]}&id=100093')
        elif "Scale" in product or "scales" in product:
            return redirect(
                f'https://100035.pythonanywhere.com/client?session_id={request.session["session_id"]}&id=100093')
        elif "Legalzar" in product or "Legalzard" in product:
            return redirect(f'https://play.google.com/store/apps/details?id=com.legalzard.policies')
        elif "Team" in product:
            return redirect(
                f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#/?session_id={request.session["session_id"]}&id=100093')
        elif "Wifi" in product:
            return redirect(
                f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={request.session["session_id"]}&id=100093')
        elif "UX" in product:
            return redirect(
                f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={request.session["session_id"]}&id=100093')
        elif "Media" in product:
            return redirect(f'https://100007.pythonanywhere.com/')
        elif "Logo" in product:
            return redirect(
                f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={request.session["session_id"]}&id=100093')
        elif "Chat" in product:
            return redirect(
                f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={request.session["session_id"]}&id=100093')
        elif "Maps" in product:
            return redirect(
                f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={request.session["session_id"]}&id=100093')
        elif "Digital" in product:
            return redirect(
                f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={request.session["session_id"]}&id=100093')
        elif "Experience" in product:
            return redirect(
                f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={request.session["session_id"]}&id=100093')
        elif "Admin" in product:
            return redirect(
                f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={request.session["session_id"]}&id=100093')
        elif "Management" in product:
            return redirect(
                f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={request.session["session_id"]}&id=100093')
        elif "Monitoring" in product:
            return redirect(
                f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={request.session["session_id"]}&id=100093')
        elif "Dashboard" in product:
            return redirect(
                f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={request.session["session_id"]}&id=100093')
        elif "Agent" in product:
            return redirect(
                f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={request.session["session_id"]}&id=100093')
        elif "Support" in product:
            return redirect(
                f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={request.session["session_id"]}&id=100093')
        elif "Repositories" in product:
            return redirect(
                f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={request.session["session_id"]}&id=100093')
        elif "Data" in product:
            return redirect(
                f'https://ll07-team-dowell.github.io/100098-DowellJobPortal/#?session_id={request.session["session_id"]}&id=100093')

        else:
            return HttpResponse(
                f"<h1 align='center'>Redirect the URL of this {product} product not avail in database<br><a href='/'>Home</a></h1>")
    else:
        return redirect("/")


def Layers(request):
    if request.method == "POST" and "devicelayersetbtn" in request.POST:
        username = request.session['username']
        dict = {"laptop": request.POST.get('form_fields[laptoplayer]'),
                "phone": request.POST.get('form_fields[phonelayer]'),
                "tablet": request.POST.get('form_fields[tabletlayer]'),
                "others": request.POST.get('form_fields[otherdevicelayer]')}
        # print(username)
        obj, created = Devices.objects.update_or_create(username=username, defaults={'data': json.dumps(dict)})
    if request.method == "POST" and "oslayersetbtn" in request.POST:
        username = request.session['username']
        dict = {"windows": request.POST.get('form_fields[windowslayer]'),
                "macos": request.POST.get('form_fields[maclayer]'),
                "linux": request.POST.get('form_fields[linuxlayer]'),
                "android": request.POST.get('form_fields[androidlayer]'),
                "ios": request.POST.get('form_fields[iossecuritylayer]'),
                "others": request.POST.get('form_fields[otherslayeros]')}
        # print(username)
        obj, created = OperatingSystems.objects.update_or_create(username=username, defaults={'data': json.dumps(dict)})
    if request.method == "POST" and "browserlayersetbtn" in request.POST:
        username = request.session['username']
        dict = {"chrome": request.POST.get('form_fields[chromelayer]'),
                "safari": request.POST.get('form_fields[safarilayer]'),
                "bing": request.POST.get('form_fields[binglayer]'),
                "firefox": request.POST.get('form_fields[firefoxlayer]'),
                "edge": request.POST.get('form_fields[edgelayer]'),
                "opera": request.POST.get('form_fields[operalayer]'),
                "others": request.POST.get('form_fields[otherslayerbrowser]')}
        # print(username)
        obj, created = Browsers.objects.update_or_create(username=username, defaults={'data': json.dumps(dict)})
    if request.method == "POST" and "internetlayersetbtn" in request.POST:
        username = request.session['username']
        dict = {"mobiledata": request.POST.get('form_fields[mobiledatalayer]'),
                "officewifi": request.POST.get('form_fields[securedwifilayer]'),
                "publicwifi": request.POST.get('form_fields[publicwifilayer]'),
                "others": request.POST.get('form_fields[otherslayerinternet]')}
        # print(username)
        obj, created = InternetConnection.objects.update_or_create(username=username,
                                                                   defaults={'data': json.dumps(dict)})
    if request.method == "POST" and "passwordlayersetbtn" in request.POST:
        username = request.session['username']
        dict = {"chars8": request.POST.get('form_fields[password8loginlayer]'),
                "chars10": request.POST.get('form_fields[password10loginlayer]'),
                "chars12": request.POST.get('form_fields[password12loginayer]'),
                "chars16": request.POST.get('form_fields[password16loginlayer]'),
                "others": request.POST.get('form_fields[otherslayerpassword]')}
        # print(username)
        obj, created = PasswordStrength.objects.update_or_create(username=username, defaults={'data': json.dumps(dict)})
    if request.method == "POST" and "logintypelayersetbtn" in request.POST:
        username = request.session['username']
        dict = {"userpass": request.POST.get('form_fields[textloginlayer]'),
                "faceid": request.POST.get('form_fields[faceidloginlayer]'),
                "voiceid": request.POST.get('form_fields[voiceidloginayer]'),
                "biometric": request.POST.get('form_fields[biometricloginlayer]'),
                "videoid": request.POST.get('form_fields[videoIDlayer]'),
                "others": request.POST.get('form_fields[otherslayerlogintype]')}
        # print(username)
        obj, created = LoginType.objects.update_or_create(username=username, defaults={'data': json.dumps(dict)})
    if request.method == "POST" and "verifiedIDlayersetbtn" in request.POST:
        username = request.session['username']
        dict = {"verifiedid": request.POST.get('form_fields[verifiedIDlayer]'),
                "notverifiedid": request.POST.get('form_fields[notverifiedIDlayer]'),
                "phoneverified": request.POST.get('form_fields[verifiedphonelayer]'),
                "phonenotverified": request.POST.get('form_fields[notverifiedphonelayer]'),
                "verifiedemail": request.POST.get('form_fields[verifiedemaillayer]'),
                "notverifiedemail": request.POST.get('form_fields[notverifiedemaillayer]'),
                "others": request.POST.get('form_fields[otherslayerverifiedID]')}
        # print(username)
        obj, created = IdVerification.objects.update_or_create(username=username, defaults={'data': json.dumps(dict)})

    return redirect(f'/?session_id={request.session["session_id"]}')


def GeoSetting(request):
    if request.method == "POST" and "geosetting" in request.POST:
        print(request.POST.get("AUS"))

    return redirect(f'/?session_id={request.session["session_id"]}')


def get_device_layers(request):
    if request.method == 'POST':
        username = request.session["username"]
        data = json.loads(request.body)
        result = data.get('result')
        result1 = json.loads(result)
        # print(type(result))
        # print(result["Mobile Phone"])
        field = {"document_name": username}
        login = dowellconnection("login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE",
                                 "fetch", field, "update")
        r = json.loads(login)
        layers = r["data"][0]["security_layers"]
        for layer in layers:
            layers[layer]['login_type'] = []
            layers[layer]['password_strength'] = []
            layers[layer]['id_verification'] = []

        for k, v in result1.items():
            layer_num = v.split()[-1]
            if "devicelayersetbtn" in data["submitBtnName"]:
                if k not in layers[f"layer{layer_num}"]['devices']:
                    layers[f"layer{layer_num}"]['devices'].append(k)
            elif "oslayersetbtn" in data["submitBtnName"]:
                if k not in layers[f"layer{layer_num}"]['os']:
                    layers[f"layer{layer_num}"]['os'].append(k)
            elif "browserlayersetbtn" in data["submitBtnName"]:
                if k not in layers[f"layer{layer_num}"]['browsers']:
                    layers[f"layer{layer_num}"]['browsers'].append(k)
            elif "internetlayersetbtn" in data["submitBtnName"]:
                if k not in layers[f"layer{layer_num}"]['connection_type']:
                    layers[f"layer{layer_num}"]['connection_type'].append(k)
            elif "logintypelayersetbtn" in data["submitBtnName"]:
                if k not in layers[f"layer{layer_num}"]['login_type']:
                    layers[f"layer{layer_num}"]['login_type'].append(k)
            elif "passwordlayersetbtn" in data["submitBtnName"]:
                if k not in layers[f"layer{layer_num}"]['password_strength']:
                    layers[f"layer{layer_num}"]['password_strength'].append(k)
            elif "verifiedIDlayersetbtn" in data["submitBtnName"]:
                if k not in layers[f"layer{layer_num}"]['id_verification']:
                    layers[f"layer{layer_num}"]['id_verification'].append(k)

        update = {"security_layers": layers}

        # login=dowellconnection("login","bangalore","login","client_admin","client_admin","1159","ABCDE","update",field,update)

        print(layers)
        # for k in r["data"][0]["security_layers"]:
        #     print(type(k))

        # if "Layer 1" in result:
        #     i["layer1"]["devices"].append("Layer 1")
        # elif "Layer 2" in result:
        #     i["devices"].append("Layer 2")
        # elif "Layer 3" in result:
        #     i["devices"].append("Layer 3")
        # elif "Layer 4" in result:
        #     i["devices"].append("Layer 4")
        # if "Layer 5" in result:
        #     print(type(i))
        # i["layer5"]["devices"].append(result1["Layer 5"])

        # elif "Layer 6" in result:
        #     i["devices"].append("Layer 6")

        # print(r["data"][0]["security_layers"])
        # {"Laptop/Desk top":"Layer 6","Mobile Phone":"Layer 4","Tablet / Ipad":"Layer 5","Others not listed above":"Layer 5"}
        # do something with the result object
        return JsonResponse({'success': True})


@method_decorator(xframe_options_exempt, name='dispatch')
@csrf_exempt
def fileupload(request):
    username = request.session["username"]
    orgname = request.session['orgname']
    # sheetname= request.POST.get("sheetname")
    if request.method == "POST":
        if request.POST.get("submitData"):
            username = request.session["username"]
            orgname = request.session['orgname']
            sheetname = request.POST.get("sheetname")
            # orgname = request.POST.get("orgname")
            # teammembers = request.POST.get("teammembers")
            # membername = request.POST.get("membername")
            # membercode = request.POST.get("membercode")
            # memberspec = request.POST.get("memberspec")
            # memberucode = request.POST.get("memberucode")
            # memberdet = request.POST.get("memberdet")
            # url = f"https://100014.pythonanywhere.com/?org={orgname}&name={sheetname}"

            return JsonResponse({'url': url})
        else:
            print("heretoo")
            fieldname = request.POST.get("fieldname")
            file = request.FILES.get('uploadfile')
            f = file.name
            # if not ".xls" in f or ".xlsx" in f or ".XLS" in f or ".XLSX" in f or ".csv" in f or ".CSV" in f:
            #     return JsonResponse({"column":"dfd", "table_html":"fgf","datalink":f"This {f} not a csv or excel file pl upload only csv or xlsx"})
            # return JsonResponse({"column":"dfd", "table_html":"fgf","datalink":f"Copy this link : {file.name}"})
            sheetname = request.POST.get("sheetname")

            print(fieldname)
            if request.POST.get("rowsToDelete"):
                n = int(request.POST.get("rowsToDelete"))
                if ".csv" in file.name or ".CSV" in file.name:
                    df = pd.read_csv(file, skiprows=n)
                    print(df)
                else:
                    df = pd.read_excel(file, skiprows=n)
            else:
                if ".csv" in file.name or ".CSV" in file.name:
                    df = pd.read_csv(file)
                    print(df)
                else:
                    df = pd.read_excel(file)
            try:
                if fieldname != "all":
                    fieldnames = [v for k, v in request.POST.items() if 'fieldname' in k]
                    column_data = df[fieldnames]
                    print(column_data)

                else:
                    column_data = df.iloc
            except Exception as e:
                return JsonResponse({
                                        "error": f"No columns matching the fieldname provided, if there are empty rows in your excel file make sure to add the number of rows in the Rows to Delete field.{e}"})
            # Get the number of rows to delete from the HTML form input

            # Delete the first n rows from the DataFrame
            # column_data = column_data.drop(column_data.index[:rows_to_delete])
            data = str(column_data.to_dict(orient='records'))
            table_html = column_data.to_html(classes="table table-striped")
            print(table_html)
            datalink = passgen.generate_random_password1(20)
            obj, created = ExcelData.objects.update_or_create(username=username,
                                                              defaults={'data': data, 'datalink': datalink})
            # Return a JSON response with the HTML table
            return JsonResponse(
                {"column": column_data.to_dict(), "table_html": table_html, "datalink": f"Copy this link : {datalink}"})
    return render(request, "new/fileupload.html")


@method_decorator(xframe_options_exempt, name='dispatch')
@csrf_exempt
def importusers(request):
    org = request.session['present_org']
    print("test")
    if request.POST.get("submitlinkData"):
        print("test1")
        datalink = request.POST.get("linkdata")
        print("hey", datalink)
        if ExcelData.objects.filter(datalink=datalink).exists():
            link = f"https://100014.pythonanywhere.com/?org={org}&type=common&name=common&code=common&spec=common&u_code=common&detail=common"
            return JsonResponse({"userlink": link, "datalink": datalink})
        else:
            return JsonResponse({"userlink": "something wrong pl try again", "datalink": ""})

        # print(checkdata)
        # if checkdata is not None:
        #     link=f"https://100014.pythonanywhere.com/?org={org}&type=common&name=common&code=common&spec=common&u_code=common&detail=common"
        #     return JsonResponse({"userlink":link,"datalink":datalink})
        # else:
        #     return JsonResponse({"userlink":"something wrong pl try again","datalink":""})
    if request.POST.get("savelinkData"):
        print("qrcode hit")
        link = request.POST.get("invitelink")
        datalink = request.POST.get("datalink")
        try:
            ExcelData.objects.filter(datalink=datalink).update(userlink=link)
        except:
            return JsonResponse({"msg": "something wrong pl try again"})
        qrcodegen.addurltoqrcode(link, f"clientadmin/media/bulkqrcode/{datalink}.png")
        img = f"https://www.pythonanywhere.com/user/100093/files/home/100093/clientadmin/media/bulkqrcode/{datalink}.png"
        return JsonResponse({"userlink": "successfully created QRCode", "img": img, "filename": f"{datalink}.png"})
        # add qr code function


def CheckHome(request):
    return render(request, "home.html")


def add_product(request):
    username = request.session["username"]
    if request.method == "POST":
        logo = request.FILES.get("productLogo", None)
        product_name = request.POST.get('productName')
        product_status = request.POST.get('productStatus')
        product_link = request.POST.get('productLink')
        try:
            logo_name = default_storage.save(f'productlogos/{logo.name}', logo)
            logourl = default_storage.url(logo_name)
            fetch_field = {}
            fetch = dowellconnection("login", "bangalore", "login", "prod_mem", "prod_mem", "100014001", "ABCDE",
                                     "fetch", fetch_field, "nil")
            fetch = json.loads(fetch)
            data = fetch["data"][0]["products"]
            members = []
            products = {
                # 'username' : username,
                'product_name': product_name,
                'product_logo': logourl,
                'product_status': product_status,
                'product_link': product_link,
                'members': members,
                'payment_status': 'unpaid',
            }
            # products = [
            #     {
            #         "product_name": "Workflow AI",
            #         "product_logo": "/media/productlogos/Sample_jJosa0v.png",
            #         "product_status": "enable",
            #         "product_link": f"https://ll04-finance-dowell.github.io/workflowai.online/#?session_id={request.session['session_id']}&id=100093",
            #         "members": members,
            #         "payment_status": "unpaid"
            #     },
            #     {
            #         "product_name": "Living Lab Chat",
            #         "product_logo": "/media/productlogos/Livinglab-chat-1.png",
            #         "product_status": "enable",
            #         "product_link": f"https://100096.pythonanywhere.com/living-lab-support/?session_id={request.session['session_id']}&id=100093",
            #         "members": members,
            #         "payment_status": "unpaid"
            #     }
            #     ]
            data.append(products)
            # data = products
            field = {"_id": "6453edc48ce736847236e6ca"}
            update = {"products": data}
            add = dowellconnection("login", "bangalore", "login", "prod_mem", "prod_mem", "100014001", "ABCDE",
                                   "update", field, update)
        except:
            pass

    return render(request, "new/add_product.html")


def update_product(request):
    # url="http://100093.pythonanywhere.com/api/getproducts/"
    # resp=requests.post(url,data={"username":"uxliveadmin"})
    # data = resp.json()['products']
    fetch_field = {}
    fetch = dowellconnection("login","bangalore","login","prod_mem","prod_mem","100014001","ABCDE","fetch",fetch_field,"nil")
    aa = json.loads(fetch)
    if request.method=="POST":
        product_name = request.POST.get("product")
        selected_members = request.POST.getlist('members')
        fetch_field = {"product_name":product_name}
        fetch = dowellconnection("login","bangalore","login","prod_mem","prod_mem","100014001","ABCDE","fetch",fetch_field,"nil")
        a = json.loads(fetch)
        # return Response({"message": a})
        if product_name and selected_members:
            mem_list = a["data"][0]["unpaid_members"]
            for i in selected_members:
                dict_t = {"username":i,"owner":i,"org_name":i,"status":"",'invite_users': "",
                                    'invite_team_members': "",
                                    'invite_public': ""}
                mem_list.append(dict_t)
            print(mem_list)
            field = {"product_name":product_name}
            update = {"unpaid_members": mem_list}
            dowellconnection("login","bangalore","login","prod_mem","prod_mem","100014001","ABCDE","update",field,update)

        # Pass the data to the template as a context variable
    context = {'products': aa["data"]}
    return render(request,"product_update_form.html",context)


def update_payment(request):
    return render(request, "payment_update_form.html")


def fetch_notifications(request):
    present_org = request.session.get("present_org", None)
    if present_org:
        notifications = Notification.objects.filter(owner=present_org)
        return notifications
    else:
        # No present_org found in session
        return None

def dismiss_notification(request, notification_id):
    if request.method == 'POST':
        notification = Notification.objects.get(id=notification_id)
        notification.status = "disable"
        notification.save()
    return redirect("/")