# ----------------- ADD MESSAGE -----------------
curl -X POST -H "Content-Type: application/json" -d '{"text":"hello there", "type":"speech"}' 127.0.0.1:5050/messages/

# ----------------- GET ALL MESSAGES -----------------
curl -X GET http://127.0.0.1:5050/messages/

# ----------------- DELETE ALL MESSAGES -----------------
curl -X DELETE http://127.0.0.1:5050/messages/
