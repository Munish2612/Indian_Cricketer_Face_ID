import os
import time
from duckduckgo_search import DDGS
import requests

# List of Indian Cricketers
PLAYERS = [
    "Virat Kohli face",
    "Rohit Sharma face",
    "Jasprit Bumrah face",
    "Hardik Pandya face",
    "KL Rahul face",
    "Shubman Gill face",
    "Ravindra Jadeja face",
    "Mohammed Shami face"
]

RAW_DIR = "../dataset/raw"
MAX_IMAGES_PER_PLAYER = 20

def create_dirs():
    if not os.path.exists(RAW_DIR):
        os.makedirs(RAW_DIR)
    for player in PLAYERS:
        player_name = player.replace(" face", "").replace(" ", "_")
        player_dir = os.path.join(RAW_DIR, player_name)
        if not os.path.exists(player_dir):
            os.makedirs(player_dir)

def download_image(url, save_path):
    try:
        response = requests.get(url, timeout=5)
        if response.status_code == 200:
            with open(save_path, 'wb') as f:
                f.write(response.content)
            return True
    except Exception as e:
        print(f"Failed to download {url}: {e}")
    return False

def collect_data():
    create_dirs()
    
    with DDGS() as ddgs:
        for player in PLAYERS:
            player_name = player.replace(" face", "").replace(" ", "_")
            print(f"Collecting images for {player_name}...")
            
            results = ddgs.images(
                keywords=player,
                region="wt-wt",
                safesearch="moderate",
                size="Medium",
                max_results=MAX_IMAGES_PER_PLAYER * 2 # Request more in case some fail
            )
            
            count = 0
            for idx, r in enumerate(results):
                if count >= MAX_IMAGES_PER_PLAYER:
                    break
                
                image_url = r['image']
                ext = image_url.split('.')[-1][:4]
                if ext.lower() not in ['jpg', 'jpeg', 'png']:
                    ext = 'jpg'
                    
                save_path = os.path.join(RAW_DIR, player_name, f"{player_name}_{count}.{ext}")
                
                if download_image(image_url, save_path):
                    count += 1
                    print(f"Downloaded {count}/{MAX_IMAGES_PER_PLAYER} for {player_name}")
                
                time.sleep(1) # Be respectful to servers

if __name__ == "__main__":
    print("Starting Data Collection...")
    collect_data()
    print("Data Collection Complete!")
    print("NOTE: Please manually review the downloaded images in dataset/raw and delete any incorrect or highly obscured faces.")
