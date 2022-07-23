# Imports the Google Cloud client library
from google.cloud import speech
import os
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'anytalk-gcp-cred.json'


# Instantiates a client
client = speech.SpeechClient()

# The name of the audio file to transcribe
gcs_uri = "gs://anytalk-mp3s/mp3s/tony_2.flac"

audio = speech.RecognitionAudio(uri=gcs_uri)

config = speech.RecognitionConfig(
    encoding=speech.RecognitionConfig.AudioEncoding.FLAC,
    sample_rate_hertz=16000,
    language_code="en-US",
)

# Detects speech in the audio file
response = client.recognize(config=config, audio=audio)

for result in response.results:
    print(result)
    print("Transcript: {}".format(result.alternatives[0].transcript))