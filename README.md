# Setup

1. Clone this repo
2. Setup & install react native environment: https://reactnative.dev/docs/environment-setup
3. Install backend dependancies:
    1. `cd backend`
    2. `pip3 install -r frontend/api/requirements.txt`
4. Install `ffmpeg` system library
    1. `brew install ffmpeg`
5. Startup backend server
   1. `cd backend`
   2. `./run.sh`
6. Startup `fe_upload` server
   1. `cd frontend`
   2. `python3 fe_upload.py`
7. In a separate terminal start Metro from the `frontend` folder by running `npx react-native start`
8. In a separate terminal run `npx react-native run-ios` from the `frontend` folder to run the AnyTalk App

### Common Errors when trying `npx react-native run-ios`

1. error Failed to load configuration of your project.
- run `npm install --force` in root of project

2. error Failed to build iOS project. ran "xcodebuild" command but it exited with error code 65
 - cd into `frontend/ios` folder
- run `pod install`

3. Some other error we don't remember
- XCode > Preferences > Locations > Click the dropdown next to "Command Line Tools" and select the same version the mac should prompt for password or fingerprint

4. Invalid `Podfile` file: cannot load such file -- /myPath/node_modules/react-native/scripts/react_native_pods
- `cd frontend`
- run `npm audit fix`
- `cd ios`
- run `pod install`
