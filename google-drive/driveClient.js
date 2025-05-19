const fs = require('fs');
const { google } = require('googleapis');

// Path to the Service Account JSON
const SERVICE_ACCOUNT_FILE = './serviceAccount.json';

// The ID of the folder you shared with the service account
const FOLDER_ID = '1IKllOwMnIPk0BLSw04TCymbAH9Tomgw0';

// Authenticate using Service Account
const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_FILE,
    scopes: ['https://www.googleapis.com/auth/drive.file'],
});

async function uploadFile() {
    const drive = google.drive({ version: 'v3', auth: await auth.getClient() });

    const fileMetadata = {
        name: 'test_upload.mp4', // Change this to your actual filename
        parents: [FOLDER_ID],   // Upload into the shared folder
    };
    const media = {
        mimeType: 'video/mp4',
        body: fs.createReadStream('./sampleVid.mp4'), // Change to your file path
    };

    drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id',
    }, (err, file) => {
        if (err) {
            console.error('Error uploading file:', err);
        } else {
            console.log('File uploaded. File ID:', file.data.id);
        }
    });
}

uploadFile();
