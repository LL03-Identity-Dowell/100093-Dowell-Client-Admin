from django.urls import path
from .views import *
urlpatterns = [
    path('userinfo/', sessionView,name="userinfo"),
    path('members/', OrgView,name="members"),
    path('orgs/', OrgsView,name="orgs"),
    path('public/', PublicLinkUpdate,name="public"),
    path('products/', ProductsView,name="products"),
    path('updateorg/',updateOrg,name="updateorg"),
    path('mobileapi/',portfolioview,name="mobileapi"),
    path('getproducts/',getProduct,name="getproducts"),
    path('listproducts/', ProductListView.as_view(), name='product-list'),
    path('getdocumentproducts/',GetDocumentProducts,name="getdocumentproducts"),
    path('clientadmin-products/',MemberControl,name="clientadmin-products"),
    path('update-products-platform/',product_control_platform_admin,name="update-products-platform"),
    path('get-portfolio/', filter_portfolio, name='get-portfolio'),
    path('product_landing/', productlanding, name='product_landing'),
    path('settings/', settings, name='settings'),
    path('settings/<int:admin_id>/', settings, name='settings_with_admin_id'),
    path('workspace_name/', workspace_name, name='workspace_name'),
    path('item_name/', item_name, name='item_name'),
    path('create_item/', create_item, name='create_item'),
    path('get_data/', get_data, name='get_data'),
    path('get_data_id/', get_data_id, name='get_data'),
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
    path('create_public_member/', create_public_member, name='create_public_member'),
    path('get_workspaces/', get_workspaces, name='get_workspaces'),
    path('get_last_login/', get_last_login, name='get_last_login'),
    path('connect_portfolio/', connect_portfolio, name='connect_portfolio'),
    path('otherorg/', otherorg, name='otherorg'),
    path('update_level_name/', update_level_name, name='update_level_name'),
    path('MemEnDis/', MemEnDis, name='MemEnDis'),
    path('create_test_team_member/', create_test_team_member, name='create_test_team_member'),
    path('request_portfolio/', request_portfolio, name='request_portfolio'),
    path('fetch_notifications/', fetch_notifications, name='fetch_notifications'),
    path('dismiss_notifications/', dismiss_notifications, name='dismiss_notifications'),
    path('settings_data/', settings_data, name='settings_data'),
    path('public_user/', public_user, name='public_user'),
    path('get_public_from_org/', public_org, name='public_org'),
    path('file_upload/', file_upload, name='file_upload'),
    path('get_used_unused_links/', get_used_unused_links, name='get_used_unused_links'),
    path('invite_team_member/', invite_team_member, name='invite_team_member'),
    path('get_roles/<str:client_id>', get_roles, name='get_roles'),
    path('exportfolio', portfolioUrl, name='exportfolio'),
    path('languages/', LanguageListView.as_view(), name='language-list'),
    path('update_org_name/', update_org_name, name='update_org_name'),
    path('translate/', GoogleTranslateAPIView.as_view(), name='translate_api'),
    path('get_public_usernames/', find_public, name='get_public_usernames'),
    path('remove_public_usernames/', remove_public, name='remove_public_usernames'),
    path('remove_used_public/', remove_used_links, name='remove_used_links'),
    path('create_team_data/', create_team_data, name='create_team_data'),
    path('add_member_to_team/', add_member_to_team, name='add_member_to_team'),
    path('get_team_names_by_username/', get_team_names_by_username, name='get_team_names_by_username'),
    path('get_member_names_by_team/', get_member_names_by_team, name='get_member_names_by_team'),
    path('find_teams_by_member_email/', find_teams_by_member_email, name='find_teams_by_member_email'),
    path('portfolio_reports/', portfolio_reports, name='portfolio_reports'),
    path('role_reports/', role_reports, name='role_reports'),
    path('layer_reports/', layer_reports, name='layer_reports'),
    path('member_reports/', member_reports, name='member_reports'),


]