UGANDA REVISION HUB — STUDY NOTES BATCH 1

UPLOAD THESE FILES TO THE ROOT OF YOUR EXISTING GITHUB PAGES REPOSITORY:
- index.html (updated homepage links to Study Notes)
- styles.css (homepage styling plus notes entry-card styling)
- notes.html (online notes page; requires a signed-in Firebase Authentication user)
- notes.css (notes page styling)
- notes.js (lesson selector, questions, answers, print-to-PDF, editable personal notes)
- notes-data.json (starter lesson content)
- p1-starter-notes.pdf through p7-starter-notes.pdf
- s1-starter-notes.pdf through s6-starter-notes.pdf
- uganda-revision-hub-starter-notes-batch1.pdf (combined PDF for all 26 lessons)

The ZIP also includes a notes-pdf/ folder containing duplicate copies of the 13 class PDFs for organisation; you do not need to upload that folder because the website's download buttons use the PDFs in the repository root.

KEEP your existing website files, including signin.html, signup.html, download.html, p7.html, s4.html, s6.html, privacy.html and other assets. Do not upload the ZIP itself as the homepage.

HOW TO TEST:
1. Upload/replace index.html and styles.css.
2. Upload notes.html, notes.css, notes.js, notes-data.json, all 13 class PDFs, and the combined PDF to the repository root.
3. Commit changes on the main branch.
4. Open the website and sign in, then tap Study notes. Choose a class and subject.
5. Tap “Download class PDF” for the class PDF, or “Print / Save this lesson as PDF” for one lesson.

IMPORTANT SECURITY NOTE:
The page checks Firebase Authentication before showing the lesson interface, but the lesson data JSON and PDFs are static files in a public GitHub Pages repository. This is a sign-in gate, not strong content protection: a technically skilled visitor could access the files directly. To enforce account-only access, the lesson content and PDFs must be moved to Firebase Firestore/Storage with restrictive authenticated-user security rules. Do not store passwords or sensitive information in the personal notes box; personal notes currently save in the local browser only and do not sync between devices.

CONTENT SCOPE:
Batch 1 includes 26 starter lessons across P1–P7 and S1–S6 (two lessons for each class). This is not yet the complete set of all curriculum topics. Further batches should be added class-by-class and subject-by-subject and checked against the current NCDC syllabus and teacher guidance.
