from django.urls import path
from .views import sessionView,OrgView,OrgsView,ProductsView,PublicLinkUpdate,updateOrg,portfolioview,getProduct,GetDocumentProducts,update_products_client_admin
urlpatterns = [
    path('userinfo/', sessionView,name="userinfo"),
    path('members/', OrgView,name="members"),
    path('orgs/', OrgsView,name="orgs"),
    path('public/', PublicLinkUpdate,name="public"),
    path('products/', ProductsView,name="products"),
    path('updateorg/',updateOrg,name="updateorg"),
    path('mobileapi/',portfolioview,name="mobileapi"),
    path('getproducts/',getProduct,name="getproducts"),
    path('getdocumentproducts/',GetDocumentProducts,name="getdocumentproducts"),
    path('clientadmin-products/',update_products_client_admin,name="clientadmin-products"),



]