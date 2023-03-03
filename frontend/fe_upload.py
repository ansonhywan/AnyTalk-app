from flask import Flask, request
import os
import json
import subprocess
from google.cloud import storage
from datetime import datetime

storage_client = storage.Client.from_service_account_json('gcp_creds.json')
app = Flask(__name__)

def upload_file(bucket_name, path_to_file):
    bucket = storage_client.get_bucket(bucket_name)
    blob = bucket.blob(path_to_file)
    blob.upload_from_filename(path_to_file)
    os.remove(path_to_file)
    blob.make_public()
    return blob.public_url

def convert_audio(speech_dir, target_dir):
    subprocess.call(['ffmpeg', '-i', speech_dir, '-ar', '16000', '-ac', '1', target_dir])

def fe_upload(path_to_file):
    bucket_name = "anytalk-mp3s"
    new_file_path = datetime.now().strftime("%Y-%m-%d-%H-%M-%S") + ".flac"
    convert_audio(path_to_file, new_file_path)
    print("uploading {}".format(new_file_path))
    return upload_file(bucket_name, new_file_path)

@app.route('/upload_audio/', methods=["GET", "POST"])
def upload_audio():
    path = request.json.get("local_path")
    if path == None: return json.dumps({"error": "must specify m4a path"})
    public_url = fe_upload(path)
    return json.dumps({
        "remote_path": public_url.split("/")[-1]
    })

if __name__ == "__main__":
    app.run(port=7645, debug=True)