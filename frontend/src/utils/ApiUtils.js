const BACKEND_URL = 'http://127.0.0.1:5050/';
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
    return json;
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
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function getPrevMessages() {
  try {
    const response = await fetch(BACKEND_URL + '/messages/', {
      method: 'GET',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    });
    const json = await response.json();
    console.log('getPrevMessages');
    console.log(json);

    // Convert JSON to an array of messages
    let messages = []
    json.forEach(message => {
      messages.push(message);
    });

    return messages;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteMessages() {
  try {
    await fetch(BACKEND_URL + '/messages/', {
      method: 'DELETE',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    });
    console.log('deleteMessages');
  } catch (error) {
    console.error(error);
  }
}