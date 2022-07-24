from google.cloud import texttospeech, speech, storage
from datetime import datetime
import subprocess
import os

class GCP_utils:
    '''
    Utility object to interact with GCP Cloud ServicesAPI
    '''
    def __init__(self):
        self.t2s_client = texttospeech.TextToSpeechClient()
        self.s2t_client = speech.SpeechClient()
        self.storage_client = storage.Client.from_service_account_json('anytalk-gcp-cred.json')

    def convert_t2s(self, text, gender="male"):
        synthesis_input = texttospeech.SynthesisInput(text=text)
        voice_name = "en-US-Wavenet-D" if gender == 'male' else "en-US-Wavenet-E"
        voice_config = texttospeech.VoiceSelectionParams(language_code="en-US",
                                                         name=voice_name)
        audio_config = texttospeech.AudioConfig(audio_encoding=texttospeech.AudioEncoding.MP3)
        response = self.t2s_client.synthesize_speech(input=synthesis_input, 
                                                     voice=voice_config, 
                                                     audio_config=audio_config)
        timestr = datetime.now().strftime("%Y%m%d-%H%M%S")
        mp3_dir = timestr + '.mp3'
        with open(mp3_dir, "wb") as speech_mp3:
            speech_mp3.write(response.audio_content)
        return mp3_dir

    def convert_s2t(self, speech_uri):
        audio = speech.RecognitionAudio(uri=speech_uri)
        config = speech.RecognitionConfig(
            encoding=speech.RecognitionConfig.AudioEncoding.FLAC,
            sample_rate_hertz=16000,
            language_code="en-US",
        )
        response = self.s2t_client.recognize(config=config, audio=audio)
        return response.results[0].alternatives[0].transcript

    def convert_to_audio(self, speech_dir, target_dir):
        subprocess.call(['ffmpeg', '-i', speech_dir, '-ar', '16000', target_dir])

    def upload_file(self, path_to_file):
        print("buckets = {}".format(list(self.storage_client.list_buckets())))
        bucket = self.storage_client.get_bucket("anytalk-mp3s")
        blob = bucket.blob(path_to_file)
        blob.upload_from_filename(path_to_file)
        os.remove(path_to_file)
        blob.make_public()
        return blob.public_url

    def file_exists(self, path_to_file):
        bucket = self.storage_client.get_bucket("anytalk-mp3s")
        return bucket.blob(path_to_file).exists()