import os
import shutil

src_root = "/Users/somenathmondal/Desktop/Podcast Related"
dest_root = "/Users/somenathmondal/Documents/GitHub/PersonalProjects/iit-podcast/public"
dest_thumbs = os.path.join(dest_root, "thumbnails")

# Create dest directories if they don't exist
os.makedirs(dest_thumbs, exist_ok=True)

# List of root assets to copy from root Episodes
root_assets = [
    "Episodes/Illu.jpg",
    "Episodes/My_Pic.png",
    "Episodes/SimpleBG_with chalkboard.png",
    "Episodes/Simple Neon Stand Up Comedy Show Youtube Thumbnail.jpg"
]

print("--- Copying Root Shared Assets ---")
for asset_rel in root_assets:
    src_path = os.path.join(src_root, asset_rel)
    filename = os.path.basename(asset_rel)
    dest_path = os.path.join(dest_root, filename)
    if os.path.exists(src_path):
        shutil.copy2(src_path, dest_path)
        print(f"Copied root asset: {filename}")
    else:
        print(f"Warning: Root asset not found: {src_path}")

# Copy the 3K high-res Channel Thumbnail
channel_pic_src = "/Users/somenathmondal/Desktop/Podcast Related/Channel_Pics/IIT_Podcast_Thumbnail_3K.jpg"
channel_pic_dest = os.path.join(dest_root, "IIT_Podcast_Thumbnail_3K.jpg")
if os.path.exists(channel_pic_src):
    shutil.copy2(channel_pic_src, channel_pic_dest)
    print("Copied high-res 3K Channel Thumbnail!")
else:
    # Try alternate path just in case
    alt_src = "/Users/somenathmondal/Desktop/Podcast Related/Channel_Pics/IIT_Podcast_Thumbnail_3K.jpg"
    if os.path.exists(alt_src):
        shutil.copy2(alt_src, channel_pic_dest)
        print("Copied high-res 3K Channel Thumbnail (alt path)!")
    else:
        print("Warning: 3K Channel Thumbnail not found at either path.")

# Mapping of episode folders to their best thumbnails
episode_thumbnails = {
    # Season 1
    "Episodes/Season1/Ep00-ProfSuman": "Thumbnail.png",
    "Episodes/Season1/Ep00-ProfSuman2": "Thumbnail.png",
    "Episodes/Season1/Ep01-Arpit": "Thumbnail_16Oct.png",
    "Episodes/Season1/Ep02-Dheeraj": "Thumbnail_Oct16.png",
    "Episodes/Season1/Ep03-Nikhil": "THUMBNAIL_OCT16.png",
    "Episodes/Season1/Ep04-KV": "Thumbnail_Oct16.png",
    "Episodes/Season1/Ep05-Ankur": "Thumbnail_Oct17.png",
    "Episodes/Season1/Ep06-Jayanta": "THUMBNAIL_OCT17.png",
    "Episodes/Season1/Ep07-Pranali": "Thumbnail_Oct17.png",
    "Episodes/Season1/Ep08-Bagathi": "Thumbnail_2.png",
    "Episodes/Season1/Ep09-Charu": "THUMBNAIL_OCT17.png",
    "Episodes/Season1/Ep10-Sanghamitra": "Thumbnail_Sangha.png",
    "Episodes/Season1/Ep11-Akash": "Thumbnail_Final.png",
    "Episodes/Season1/Ep12-Gupthaji": "Thumbnail_Nov14.png",
    "Episodes/Season1/Ep13-Goundla": "THUMBNAIL.png",
    "Episodes/Season1/Ep14-Shrrinesh": "THUMBNAIL.png",
    "Episodes/Season1/Ep15-Prakhar": "THUMBNAIL.png",
    "Episodes/Season1/Ep16-Sai": "Thumbnail_12Jan.png",
    "Episodes/Season1/Ep17-Arijit": "Thumbnail_July4.png",
    "Episodes/Season1/Ep18-Pragya": "Thumbnail.png",
    "Episodes/Season1/Ep19-SoumiAbhisek": "Thumbnail.png",
    "Episodes/Season1/Ep20-SaumAditi": "Thumbnail_IITvHarvard.png",
    "Episodes/Season1/Ep20-Subham": "Thumbnail.png",
    "Episodes/Season1/Ep21-DK": "Thumbnail.png",
    "Episodes/Season1/Ep22-Amarjeet": "Thumbnail.png",
    "Episodes/Season1/Ep23-Anushree": "Thumbnail.png",
    "Episodes/Season1/Ep24-Shashwat": "Thumbnail.png",
    # Season 2
    "Episodes/Season2/Ep25-Imbesat": "Thumbnail.png",
    "Episodes/Season2/Ep26-Peter": "Thumbnail.png",
}

print("\n--- Copying Episode Thumbnails ---")
for folder_rel, thumb_name in episode_thumbnails.items():
    src_dir = os.path.join(src_root, folder_rel)
    src_path = os.path.join(src_dir, thumb_name)
    
    # Extract clean folder name (e.g. Ep00-ProfSuman)
    folder_name = os.path.basename(folder_rel)
    
    # Destination filename (e.g. Ep00-ProfSuman.png)
    ext = os.path.splitext(thumb_name)[1].lower()
    dest_filename = f"{folder_name}{ext}"
    dest_path = os.path.join(dest_thumbs, dest_filename)
    
    if os.path.exists(src_path):
        shutil.copy2(src_path, dest_path)
        print(f"Copied: {folder_name} -> {dest_filename}")
    else:
        # Retry with case-insensitive search if needed
        found = False
        if os.path.exists(src_dir):
            for file in os.listdir(src_dir):
                if file.lower() == thumb_name.lower():
                    shutil.copy2(os.path.join(src_dir, file), dest_path)
                    print(f"Copied (case-retry): {folder_name} -> {dest_filename}")
                    found = True
                    break
        if not found:
            print(f"Warning: Thumbnail not found for {folder_name} ({thumb_name})")

print("\nAsset copying script finished!")
