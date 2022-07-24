export async function onStartRecord(audioRecorderPlayer) {
  console.log('onStartRecord');
  const result = await audioRecorderPlayer.startRecorder();
  audioRecorderPlayer.addRecordBackListener(e => {
    console.log('Recording . . . ', e.currentPosition);
    return result;
  });
  return result;
}

export async function onStopRecord(audioRecorderPlayer) {
  console.log('onStopRecord');
  const result = await audioRecorderPlayer.stopRecorder();
  audioRecorderPlayer.removeRecordBackListener();
  // console.log(result);
}

export async function onStartPlay(audioRecorderPlayer) {
  console.log('onStartPlay');
  const msg = await audioRecorderPlayer.startPlayer();
  // console.log(msg);
}

export async function onPausePlay(audioRecorderPlayer) {
  await audioRecorderPlayer.pausePlayer();
}

export async function onStopPlay(audioRecorderPlayer) {
  console.log('onStopPlay');
  audioRecorderPlayer.stopPlayer();
  audioRecorderPlayer.removePlayBackListener();
}
