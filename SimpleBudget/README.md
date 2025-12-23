# SimpleBudget 💰

Aplikacja do śledzenia wydatków i przychodów.

## 🚀 Deployment

**Hosting:** GitHub Pages  
**Baza danych:** Firebase Firestore

## 📋 Instrukcja

### 1. Utwórz repo na GitHub (nazwa: `simplebudget`)

### 2. Włącz GitHub Pages:
- Settings → Pages → Source: **GitHub Actions**

### 3. Dodaj 6 secrets w GitHub (Settings → Secrets → Actions):
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

### 4. Wypchnij kod:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TWOJA-NAZWA/simplebudget.git
git push -u origin main
```

### 5. Aplikacja będzie na:
**https://TWOJA-NAZWA.github.io/simplebudget/**

## 🔥 Firebase Firestore

1. Utwórz projekt: https://console.firebase.google.com/
2. Firestore Database → test mode
3. Reguły:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /transactions/{document=**} {
      allow read, write: if true;
    }
  }
}
```
