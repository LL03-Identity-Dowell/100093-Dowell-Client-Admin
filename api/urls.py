from django.urls import path
from .views import sessionView, OrgView, OrgsView, ProductsView, PublicLinkUpdate, updateOrg, portfolioview, getProduct, \
    GetDocumentProducts, update_products_client_admin, product_control_platform_admin, MemberControl, filter_portfolio, \
    settings, workspace_name, item_name, create_item, get_data, create_portfolio

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
    path('clientadmin-products/',MemberControl,name="clientadmin-products"),
    path('update-products-platform/',product_control_platform_admin,name="update-products-platform"),
    path('get-portfolio/', filter_portfolio, name='get-portfolio'),
    path('settings/', settings, name='settings'),
    path('workspace_name/', workspace_name, name='workspace_name'),
    path('item_name/', item_name, name='item_name'),
    path('create_item/', create_item, name='create_item'),
    path('get_data/', get_data, name='get_data'),
    path('create_portfolio/', create_portfolio, name='create_portfolio'),

]