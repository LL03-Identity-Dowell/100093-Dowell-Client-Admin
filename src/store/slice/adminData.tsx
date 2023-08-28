import { createSlice } from "@reduxjs/toolkit";

const adminDataSlice = createSlice({
	name: "adminData",
	initialState: {
		data: [
			{
				_id: "",
				document_name: "",
				Username: "",
				profile_info: {
					first_name: "",
					last_name: "",
					profile_img: "",
					email: "",
					phonecode: "",
					phone: "",
				},
				organisations: [
					{
						org_name: "",
						level1: {
							level_name: "",
							items: [
								{
									item_name: "",
									item_code: "",
									item_details: "",
									item_universal_code: "",
									item_specification: "",
									item_barcode: "",
									item_image1: "",
									item_image2: "",
									status: "",
								},
							],
							roles: [],
						},
						level2: {
							level_name: "",
							items: [
								{
									item_name: "",
									item_code: "",
									item_details: "",
									item_universal_code: "",
									item_specification: "",
									item_barcode: "",
									item_image1: "",
									item_image2: "",
									status: "",
								},
							],
							roles: [],
						},
						level3: {
							level_name: "",
							items: [
								{
									item_name: "",
									item_code: "",
									item_details: "",
									item_universal_code: "",
									item_specification: "",
									item_barcode: "",
									item_image1: "",
									item_image2: "",
									status: "",
								},
							],
							roles: [],
						},
						level4: {
							level_name: "",
							items: [
								{
									item_name: "",
									item_code: "",
									item_details: "",
									item_universal_code: "",
									item_specification: "",
									item_barcode: "",
									item_image1: "",
									item_image2: "",
									status: "",
								},
							],
							roles: [],
						},
						level5: {
							level_name: "",
							items: [
								{
									item_name: "",
									item_code: "",
									item_details: "",
									item_universal_code: "",
									item_specification: "",
									item_barcode: "",
									item_image1: "",
									item_image2: "",
									status: "",
								},
							],
							roles: [],
						},
					},
				],
				products: [],
				members: {
					team_members: {
						accept_members: [
							{
								name: "",
								member_code: "",
								member_spec: "",
								member_uni_code: "",
								member_details: "",
								status: "",
								first_name: "",
								last_name: "",
								email: "",
								alias: "",
								portfolio_name: "",
							},
						],
						pending_members: [
							{
								name: "",
								member_code: "",
								member_spec: "",
								member_uni_code: "",
								member_details: "",
								link: "",
								status: "",
							},
						],
					},
					guest_members: {
						accept_members: [
							{
								name: "",
								member_code: "",
								member_spec: "",
								member_uni_code: "",
								member_details: "",
								link: "",
								status: "",
								first_name: "",
								last_name: "",
							},
						],
						pending_members: [
							{
								name: "",
								member_code: "",
								member_spec: "",
								member_uni_code: "",
								member_details: "",
								link: "",
								status: "",
							},
						],
					},
					public_members: {
						accept_members: [
							{
								name: "",
								member_code: "",
								member_spec: "",
								member_uni_code: "",
								member_details: "",
								link: "",
								status: "",
								first_name: "",
								last_name: "",
							},
						],
						pending_members: [
							{
								name: [],
								portfolio_name: "",
								product: "",
								status: "",
								link: "",
							},
						],
					},
				},
				portpolio: [
					{
						username: [],
						member_type: "",
						product: "",
						data_type: "",
						operations_right: "",
						role: "",
						security_layer: "",
						portfolio_name: "",
						portfolio_code: "",
						portfolio_specification: "",
						portfolio_uni_code: "",
						portfolio_details: "",
						status: "",
					},
				],
				security_layers: {
					layer1: {
						devices: [],
						os: [],
						browsers: [],
						connection_type: [],
						location: {
							IN: [],
							AUS: [],
						},
					},
					layer2: {
						devices: [],
						os: [],
						browsers: [],
						connection_type: [],
						location: {
							IN: [],
							AUS: [],
						},
					},
					layer3: {
						devices: [],
						os: [],
						browsers: [],
						connection_type: [],
						location: {
							IN: [],
							AUS: [],
						},
					},
					layer4: {
						devices: [],
						os: [],
						browsers: [],
						connection_type: [],
						location: {
							IN: [],
							AUS: [],
						},
					},
					layer5: {
						devices: [],
						os: [],
						browsers: [],
						connection_type: [],
						location: {
							IN: [],
							AUS: [],
						},
					},
					layer6: {
						devices: [],
						os: [],
						browsers: [],
						connection_type: [],
						location: {
							IN: [],
							AUS: [],
						},
					},
				},
				other_organisation: [
					{
						org_name: "",
						portfolio: [],
					},
				],
				roles: [
					{
						level1_item: "",
						level2_item: "",
						level3_item: "",
						level4_item: "",
						level5_item: "",
						security_layer: "",
						role_name: "",
						role_code: "",
						role_details: null,
						role_uni_code: null,
						role_specification: null,
						status: "",
					},
				],
				item_barcode: "",
				item_code: null,
				item_details: null,
				item_image1: "",
				item_image2: "",
				item_name: null,
				item_specification: null,
				item_universal_code: null,
				status: "",
			},
		],
	},
	reducers: {
		getAdminData(_state, action) {
			return action.payload;
		},
	},
});

export default adminDataSlice.reducer;

export const { getAdminData } = adminDataSlice.actions;
