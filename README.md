# Setup

1. Clone this repo
2. Setup & install react native environment: https://reactnative.dev/docs/environment-setup
3. Install backend dependancies:
   1. `cd backend`
   2. `pip3 install -r requirements.txt`
4. Setup the Database with `python3 setup_database.py`
5. Install `ffmpeg` system library
   1. `brew install ffmpeg`
6. Startup backend server
   1. `cd backend`
   2. `./run.sh`
7. Startup `fe_upload` server
   1. From root folder run: `python3 fe_upload.py`
8. In a separate terminal start Metro by running `npx react-native start`
9. In a separate terminal run `npx react-native run-ios` to run the AnyTalk App

### Common Errors when trying `npx react-native run-ios`

1. error Failed to load configuration of your project.

- run `npm install --force` in root of project

2. error Failed to build iOS project. ran "xcodebuild" command but it exited with error code 65

- cd into `ios` folder
- run `pod install`

3. Some other error we don't remember

- XCode > Preferences > Locations > Click the dropdown next to "Command Line Tools" and select the same version the mac should prompt for password or fingerprint
