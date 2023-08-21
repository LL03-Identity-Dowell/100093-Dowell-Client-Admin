from django.urls import path
from .views import sessionView, OrgView, OrgsView, ProductsView, PublicLinkUpdate, updateOrg, portfolioview, getProduct, \
    GetDocumentProducts, update_products_client_admin, product_control_platform_admin, MemberControl, filter_portfolio, \
    settings, workspace_name, item_name, create_item, get_data, create_portfolio, create_role, get_layer_data, \
    update_role_status, update_portfolio_status, update_item_status, save_device_layers, get_all_details, \
    create_team_member, create_user_member, get_workspaces, get_last_login, connect_portfolio, otherorg, \
    update_level_name, MemEnDis, create_test_team_member

urlpatterns = [
    path('userinfo/', sessionView, name="userinfo"),
    path('members/', OrgView, name="members"),
    path('orgs/', OrgsView, name="orgs"),
    path('public/', PublicLinkUpdate, name="public"),
    path('products/', ProductsView, name="products"),
    path('updateorg/', updateOrg, name="updateorg"),
    path('mobileapi/', portfolioview, name="mobileapi"),
    path('getproducts/', getProduct, name="getproducts"),
    path('getdocumentproducts/', GetDocumentProducts, name="getdocumentproducts"),
    path('clientadmin-products/', MemberControl, name="clientadmin-products"),
    path('update-products-platform/', product_control_platform_admin, name="update-products-platform"),
    path('get-portfolio/', filter_portfolio, name='get-portfolio'),
    path('settings/', settings, name='settings'),
    path('workspace_name/', workspace_name, name='workspace_name'),
    path('item_name/', item_name, name='item_name'),
    path('create_item/', create_item, name='create_item'),
    path('get_data/', get_data, name='get_data'),
    path('create_portfolio/', create_portfolio, name='create_portfolio'),
    path('create_role/', create_role, name='role'),
    path('get_layer_data/', get_layer_data, name='get_layer_data'),
    path('update_role_status/', update_role_status, name='update_role_status'),
    path('update_portfolio_status/', update_portfolio_status, name='update_portfolio_status'),
    path('update_item_status/', update_item_status, name='update_item_status'),
    path('save_device_layers/', save_device_layers, name='save_device_layers'),
    path('get_all_details/', get_all_details, name='get_all_details'),
    path('create_team_member/', create_team_member, name='create_team_member'),
    path('create_user_member/', create_user_member, name='create_user_member'),
    path('get_workspaces/', get_workspaces, name='get_workspaces'),
    path('get_last_login/', get_last_login, name='get_last_login'),
    path('connect_portfolio/', connect_portfolio, name='connect_portfolio'),
    path('otherorg/', otherorg, name='otherorg'),
    path('update_level_name/', update_level_name, name='update_level_name'),
    path('MemEnDis/', MemEnDis, name='MemEnDis'),
    path('create_test_team_member/', create_test_team_member, name='create_test_team_member'),
]
