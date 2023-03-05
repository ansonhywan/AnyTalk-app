import os
import requests

cmds = set([
    't2s',
    's2t'
])

html_str = """
<!DOCTYPE html>
<html>
<body>

<audio controls>
  <source src="{}" type="audio/mpeg">
</audio>

</body>
</html>
"""

while 1:
    cmd = input()
    if cmd == "exit": break
    cmd_list = cmd.split(' ')
    if cmd_list[0] not in cmds:
        print("invalid command!")
        continue
    
    if cmd_list[0] == 't2s':
        response = requests.get(
            "http://127.0.0.1:5050/text_to_speech",
            json={
                "text": " ".join(cmd_list[1:])
            }
        )
        speech_url = (response.json()["speech_path"])
        os.system("open {}".format(speech_url))

    if cmd_list[0] == 's2t':
        print("work in progress...")
