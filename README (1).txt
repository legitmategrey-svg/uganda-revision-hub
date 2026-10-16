Uganda Revision Hub — Firebase library + admin upgrade

Files
- index.html: current homepage updated to load published resources from Firestore and retain its existing design.
- admin.html: new Firebase-authenticated resource manager (add/edit/delete, publish/unpublish, starter import).
- firebase-config.js: Firebase web app client configuration.
- styles.css: original stylesheet plus admin-specific responsive styles.
- firestore.rules.txt: security rules for published public reads and admin-only writes.

Important steps before using:
1. Upload/replace index.html and styles.css in the repository.
2. Add admin.html and firebase-config.js to the repository root.
3. In Firebase Console → Firestore Database → Rules, replace the rules with the contents of firestore.rules.txt and publish.
4. Test admin.html after deployment. Sign in with the authorized Firebase account whose UID is configured in the page and rules.
5. In admin.html, use “Import starter library” once to copy the current homepage starter list into Firestore, then add/edit/delete resources.

Important: rules are the real protection for database writes. The UID in the frontend is only a UI check; never loosen Firestore rules to allow public writes. Firebase web config is intended to be public, but API key restrictions and authorized domains should still be reviewed in Firebase Console.

This code uses the existing Firebase project configuration and assumes the existing sign-in/sign-up pages use the same Firebase project. Static PDF files must already exist in the repository at the paths entered into the resource manager.
