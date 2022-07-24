const BACKEND_URL = 'https://1603-2620-101-f000-740-8000-00-1e4b.ngrok.io';

export async function getSpeechFromText(req_body) {
  try {
    const response = await fetch(BACKEND_URL + '/text_to_speech/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req_body),
    });
    const json = await response.json();
    console.log(json);
    return json.speech_path;
  } catch (error) {
    console.error(error);
  }
}
