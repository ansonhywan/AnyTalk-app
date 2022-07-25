const BACKEND_URL = 'https://5951-2620-101-f000-740-8000-00-1e4b.ngrok.io';
const FE_UPLOAD_URL = 'http://127.0.0.1:7645/';

export async function uploadAudioToBucket(req_body) {
  try {
    const response = await fetch(FE_UPLOAD_URL + '/upload_audio/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req_body),
    });
    const json = await response.json();
    console.log('uploadAudioToBucket');
    console.log(json);
    return json.remote_path;
  } catch (error) {
    console.error(error);
  }
}

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
    console.log('getSpeechFromText');
    console.log(json);
    return json.speech_path;
  } catch (error) {
    console.error(error);
  }
}

export async function getTextFromSpeech(req_body) {
  try {
    const response = await fetch(BACKEND_URL + '/speech_to_text/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req_body),
    });
    const json = await response.json();
    console.log('getTextFromSpeech');
    console.log(json);
    return json.text;
  } catch (error) {
    console.error(error);
  }
}
