import requests

API_KEY = "1b834e07-c68b-4bf6-96dd-ab7cdc62f07f"
BASE_URL = "https://datacube.uxlivinglab.online/db_api/"

def check_collection_exists(db_name, coll_name):
    url = f"{BASE_URL}get_data/"
    data = {
        "api_key": API_KEY,
        "db_name": db_name,
        "coll_name": coll_name,
        "operation": "fetch",
        "limit": 1,
        "offset": 0
    }
    response = requests.post(url, json=data)
    return response.json().get("success") is True

def get_collection_data(db_name, coll_name, limit=10):
    url = f"{BASE_URL}get_data/"
    data = {
        "api_key": API_KEY,
        "db_name": db_name,
        "coll_name": coll_name,
        "operation": "fetch",
        "limit": limit,
        "offset": 0
    }
    response = requests.post(url, json=data)
    return response.json().get("data", [])

def insert_into_collection(db_name, coll_name, data_to_insert):
    url = f"{BASE_URL}crud/"
    data = {
        "api_key": API_KEY,
        "db_name": db_name,
        "coll_name": coll_name,
        "operation": "insert",
        "data": data_to_insert
    }
    response = requests.post(url, json=data)
    return response.status_code == 200
