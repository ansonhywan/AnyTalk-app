export FLASK_APP=main.py
export FLASK_DEBUG=1
export GOOGLE_APPLICATION_CREDENTIALS='anytalk-gcp-cred.json'
python3 -m flask run --port 5050
