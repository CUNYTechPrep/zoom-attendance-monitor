# Google Drive Client

This folder contains the standalone Google Drive client for uploading class recordings to Google Drive.

## How it works

- Uses a **Service Account** to authenticate with Google Drive. Will change to use OAuth later 
- Uploads specified files into a shared Drive folder where the Service Account has Editor access.

## Files

- `driveClient.js` — Script to upload files.
- `serviceAccount.json` — Service Account key (**excluded from version control**).
- `sampleVid.mp4` — Example video file used for testing. NOT included in the commit.
- `package.json` and `package-lock.json` — Node.js dependencies (isolated to this folder).
## Setup

Install dependencies:

```bash
cd google-drive
npm install
```
## Usage

1. Place the video you want to upload into this folder.
2. Update `driveClient.js` with:
    - The filename (currently `sampleVid.mp4`).
    - The target Drive folder ID.
3. Run:

    ```bash
    node driveClient.js
    ```

## Notes

- Do **not** commit `serviceAccount.json` or video files.
- The Google Drive API must be enabled in the Google Cloud project.
