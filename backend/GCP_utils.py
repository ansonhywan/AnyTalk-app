from google.cloud import texttospeech, speech, storage

class GCP_utils:
    def __init__(self):
        self.storage_client = storage.Client.from_service_account_json(
            'creds.json')

    def convert_t2s(self):
        pass

    def convert_s2t(self):
        pass

    def upload_file(self):
        print(buckets = list(self.storage_client.list_buckets()))
        bucket = storage_client.get_bucket(bucket_name)
        blob = bucket.blob(blob_name)
        blob.upload_from_filename(path_to_file)
        return blob.public_url 