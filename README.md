# Email Capture and Redirect Site

A simple, modern single-page website that collects user emails and redirects them to a specified URL. Hosted on GitHub Pages with Firebase Firestore for database storage.

## Features

- Clean, modern UI with responsive design
- Client-side email validation
- Loading states during submission
- Error handling with user-friendly messages
- Automatic redirect after successful submission
- Free hosting on GitHub Pages
- Free database storage with Firebase Firestore

## Setup Instructions

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and create a new project
3. Once created, click on the project settings (gear icon)
4. Scroll down to "Your apps" section and click the web icon (`</>`)
5. Register your app with a nickname (e.g., "Email Capture Site")
6. Copy the Firebase configuration object

### 2. Configure Firebase in the Project

1. Open `script.js`
2. Replace the `firebaseConfig` object with your Firebase configuration:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### 3. Set Up Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Start in **test mode** (for development) or **production mode** (with security rules)
4. Choose a location for your database (select the closest to your users)
5. Click "Enable"

### 4. Configure Firestore Security Rules (Important!)

For production use, update your Firestore security rules to only allow writes:

1. Go to Firestore Database → Rules
2. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /emails/{document=**} {
      // Allow anyone to write emails (for public form)
      allow write: if request.resource.data.email is string && 
                      request.resource.data.email.matches('.*@.*\\..*');
      // Prevent reads (optional - for privacy)
      allow read: if false;
    }
  }
}
```

3. Click "Publish"

### 5. Deploy to GitHub Pages

1. Create a new repository on GitHub
2. Clone the repository to your local machine
3. Copy all project files to the repository folder
4. Commit and push the files:

```bash
git add .
git commit -m "Initial commit: Email capture site"
git push origin main
```

5. Go to your repository on GitHub
6. Click "Settings" → "Pages"
7. Under "Source", select "Deploy from a branch"
8. Choose "main" branch and "/ (root)" folder
9. Click "Save"
10. Your site will be available at: `https://YOUR_USERNAME.github.io/REPOSITORY_NAME/`

## File Structure

```
.
├── index.html      # Main HTML page with form
├── style.css       # Styling and responsive design
├── script.js       # Form handling and Firebase integration
├── README.md       # This file
└── .gitignore      # Git ignore file
```

## Customization

### Change Redirect URL

Edit the `REDIRECT_URL` constant in `script.js`:

```javascript
const REDIRECT_URL = "https://your-redirect-url.com";
```

### Modify Styling

Edit `style.css` to change colors, fonts, spacing, etc. The current design uses a purple gradient theme.

### Change Collection Name

If you want to store emails in a different Firestore collection, edit the collection name in `script.js`:

```javascript
await db.collection('your-collection-name').add(emailData);
```

## Firebase Free Tier Limits

- **Storage**: 1 GB
- **Reads**: 50,000/day
- **Writes**: 20,000/day

This should be more than sufficient for most use cases.

## Troubleshooting

### "Database configuration error"
- Make sure you've replaced all Firebase config values in `script.js`
- Verify your Firebase project is active and Firestore is enabled

### Emails not saving
- Check browser console for errors
- Verify Firestore security rules allow writes
- Ensure Firestore database is created and active

### Redirect not working
- Check that the redirect URL is correct in `script.js`
- Some browsers may block redirects - check browser console

## License

Free to use and modify as needed.

