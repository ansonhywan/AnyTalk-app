import os
from sys import argv
from google.cloud import storage

def upload_file(storage_client, bucket_name, path_to_file):
    bucket = storage_client.get_bucket(bucket_name)
    blob = bucket.blob(path_to_file)
    blob.upload_from_filename(path_to_file)
    # os.remove(path_to_file)
    blob.make_public()
    print(blob.public_url)

if __name__ == "__main__":
    if len(argv) != 2: 
        print("usage: python3 fe_upload <file_path>")
        exit()
    storage_client = storage.Client.from_service_account_json('gcp_creds.json')
    bucket_name = "anytalk-mp3s"
    path_to_file = argv[1]
    upload_file(storage_client, bucket_name, path_to_file)