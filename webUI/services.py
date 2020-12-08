import json
import time
import requests

url = "http://127.0.0.1:8001/add/3.json"

def get_Info():
    while True:
        try:
            r = requests.get(url)
            info: dict = r.json()
        except json.decoder.JSONDecodeError:
            time.sleep(0.5)
            continue
        break

    info_list = []
    for value in info.values():
        info_list.append(value)
    return info_list
