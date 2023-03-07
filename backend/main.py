from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import json
import datetime
from GCP_utils import GCP_utils

app = Flask(__name__)
gcp_controller = GCP_utils()
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///AnyTalk.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# ----------------- Database -----------------

db = SQLAlchemy(app)


class Messages(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text)
    type = db.Column(db.Text)
    time = db.Column(db.Text)

    def __init__(self, text, type=None, time=None):
        self.text = text
        self.type = type
        self.time = time

    def to_dict(self):
        return {"id": self.id, "text": self.text, "type": self.type, "message_time": self.time}


# set up application context
with app.app_context():
    db.create_all()


@app.route("/messages/", methods=["POST"])
def create_message():
    return save_message(
        text=request.get_json().get("text"),
        type=request.get_json().get("type"),
        time=datetime.datetime.now().strftime("%I:%M %p, %B %d"),
    )


@app.route("/messages/", methods=["GET"])
def get_all_messages():
    return jsonify(list(map(lambda x: x.to_dict(), Messages.query.all())))


@app.route("/messages/", methods=["DELETE"])
def clear_all_messages():
    db.session.query(Messages).delete()
    db.session.commit()
    return jsonify("deleted"), 204


# ----------------- API routing -----------------


@app.route("/text_to_speech/", methods=["GET", "POST"])
def text_to_speech():
    text = request.json.get("text")
    is_prompt = request.json.get("is_prompt")
    message_time = datetime.datetime.now().strftime("%I:%M %p, %B %d")
    if text == None:
        return json.dumps(
            {"error": "must specify text in body", "message_time": message_time}
        )
    save_message(
        text=text, type="text" if not is_prompt else "prompt", time=message_time
    )

    local_path = gcp_controller.convert_t2s(text)
    remote_path = gcp_controller.upload_file(local_path)
    return json.dumps(
        {"speech_path": remote_path, "error": None, "message_time": message_time}
    )


@app.route("/speech_to_text/", methods=["GET", "POST"])
def speech_to_text():
    speech_path = request.json.get("speech_path")
    print("{}{}".format(50 * "=", speech_path))
    message_time = datetime.datetime.now().strftime("%I:%M %p, %B %d")
    if speech_path == None:
        return json.dumps(
            {"error": "must specify speech path in body", "message_time": message_time}
        )
    if not speech_path.endswith(".flac"):
        return json.dumps(
            {"error": "speech file must end with .flac", "message_time": message_time}
        )
    try:
        text = gcp_controller.convert_s2t(speech_path)
    except Exception as e:
        print(f"ERROR {str(e)}")
        return json.dumps({"error": str(e), "message_time": message_time})

    save_message(text=text, type="speech", time=message_time)
    return json.dumps({"text": text, "error": None, "message_time": message_time})


@app.route("/")
def main():
    return "this is anytalk backend \n"


# ----------------- Extras -----------------


def save_message(
    text,
    type,
    time,
):
    if text == "" or None:
        return jsonify("", 400)
    new_message = Messages(text, type, time)
    db.session.add(new_message)
    print(f"saving message: {new_message.to_dict()}")
    db.session.commit()
    return jsonify(new_message.to_dict()), 201
