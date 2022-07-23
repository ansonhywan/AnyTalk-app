from flask import Flask
import json

from GCP_utils import GCP_utils

app = Flask(__name__)

@app.route('/text_to_speech/')
def text_to_speech():
	return json.dumps({
		"text": None,
		"speech_path": "gs://anytalk-bucket/grandpa1hp.mp3",
		"error": None
	})

@app.route('/speech_to_text/')
def speech_to_text():

	return json.dumps({
		"text": "grampa 1hp",
		"speech_path": None,
		"error": None
	})

@app.route('/')
def main():
	return "this is anytalk backend \n"
