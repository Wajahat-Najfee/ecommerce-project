import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyBwMeMX5SBt3LJSOMpVP8TPY8VUNaTTlvk",
    authDomain: "first-project-smits.firebaseapp.com",
    projectId: "first-project-smits",
    storageBucket: "first-project-smits.appspot.com",
    messagingSenderId: "300490841752",
    appId: "1:300490841752:web:194e1ec3261942e9047aed"
};

const app = initializeApp(firebaseConfig);
console.log("Firebase Initialized:", app);

const auth = getAuth(app);

// DOM Elements
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');
const welcomeMessage = document.getElementById('welcome-message');
const userInfoDiv = document.getElementById('user-info');
const authFormsDiv = document.getElementById('auth-forms');
const signupErrorMessage = document.getElementById('signup-error-message');
const loginErrorMessage = document.getElementById('error-message');

// Sign Up Handler
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('User signed up:', userCredential.user);
            signupErrorMessage.textContent = "Sign-up successful!";
            signupErrorMessage.style.color = "green";
            signupForm.reset();
        })
        .catch((error) => {
            console.error('Error during sign up:', error);
            signupErrorMessage.textContent = error.message;
            signupErrorMessage.style.color = "red";
        });
});

// Login Handler
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('User logged in:', userCredential.user);
            loginErrorMessage.textContent = "Login successful!";
            loginErrorMessage.style.color = "green";
            loginForm.reset();
        })
        .catch((error) => {
            console.error('Error during login:', error);
            loginErrorMessage.textContent = error.message;
            loginErrorMessage.style.color = "red";
        });
});

// Logout Handler
logoutBtn.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            console.log('User signed out');
        })
        .catch((error) => {
            console.error('Error during sign out:', error);
            alert(error.message);
        });
});

// Listen for Authentication State Changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        welcomeMessage.textContent = `Welcome, ${user.email}`;
        userInfoDiv.style.display = 'block';
        authFormsDiv.style.display = 'none';
    } else {
        // User is signed out
        welcomeMessage.textContent = '';
        userInfoDiv.style.display = 'none';
        authFormsDiv.style.display = 'block';
    }
});
