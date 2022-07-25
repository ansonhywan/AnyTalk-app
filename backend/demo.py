import os
from google.cloud import texttospeech, speech, storage
from GCP_utils import GCP_utils
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'anytalk-gcp-cred.json'

# user1 = deaf
# user2 = blind

gcp_controller = GCP_utils()

# T2S: user1 to user2

# retrieve user1 text input from FE
text = "temp hardcoded for now"

# BE translates text to speech, outputs mp3.
local_path = gcp_controller.convert_t2s(text)

# upload .mp3 file to bucket
remote_path = gcp_controller.upload_file(local_path)

print(local_path)
print(remote_path)


# S2T: user2 to user1

# retrieve user1 message from bucket, translate to text
received_msg = gcp_controller.convert_s2t(remote_path)

print(received_msg)