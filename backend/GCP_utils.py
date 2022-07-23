from google.cloud import texttospeech, speech, storage

class GCP_utils:
    def __init__(self):
        self.storage_client = storage.Client.from_service_account_json('anytalk-gcp-cred.json')

    def convert_t2s(self):
        pass

    def convert_s2t(self):
        pass

    def upload_file(self, path_to_file):
        print("buckets = {}".format(list(self.storage_client.list_buckets())))
        bucket = self.storage_client.get_bucket("anytalk-mp3s")
        blob = bucket.blob("mp3s/testfile.mp3")
        blob.upload_from_filename(path_to_file)
        return blob.public_url

    def file_exists(self, path_to_file):
        bucket = self.storage_client.get_bucket("anytalk-mp3s")
        return bucket.blob(path_to_file).exists()