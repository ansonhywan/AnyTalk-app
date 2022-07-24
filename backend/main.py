from flask import Flask, request
import json

from GCP_utils import GCP_utils

app = Flask(__name__)
gcp_controller = GCP_utils()

@app.route('/text_to_speech/')
def text_to_speech():
	text = request.json.get("text")
	if text == None: return json.dumps({"error": "must specify text in body"})

	local_path = gcp_controller.convert_t2s(text)
	remote_path = gcp_controller.upload_file(local_path)

	return json.dumps({
		"speech_path": remote_path,
		"error": None
	})

@app.route('/speech_to_text/')
def speech_to_text():
	speech_path = request.json.get("speech_path")
	if speech_path == None: return json.dumps({"error": "must specify speech path in body"})

	try:
		text = gcp_controller.convert_s2t(speech_path)
	except Exception as e:
		return json.dumps({"error": e.__class__})

	return json.dumps({
		"text": text,
		"error": None
	})

@app.route('/')
def main():
	return "this is anytalk backend \n"
