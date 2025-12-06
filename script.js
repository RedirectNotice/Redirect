// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBtEmJ6Hg4uN_o6UnIuQy114rSszZBsTRw",
    authDomain: "mailcap.firebaseapp.com",
    projectId: "mailcap",
    storageBucket: "mailcap.firebasestorage.app",
    messagingSenderId: "682289412978",
    appId: "1:682289412978:web:42de5c48bec0427692fbeb"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Redirect URL
const REDIRECT_URL = "https://mega.nz/folder/ngJDhA5B#WLOm7yiqpmi7SE1jwOdPOA";

// DOM elements
const emailForm = document.getElementById('emailForm');
const emailInput = document.getElementById('emailInput');
const submitBtn = document.getElementById('submitBtn');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');

// Hide messages
function hideMessages() {
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
}

// Show error message
function showError(message) {
    hideMessages();
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

// Show success message
function showSuccess(message) {
    hideMessages();
    successMessage.textContent = message;
    successMessage.style.display = 'block';
}

// Set loading state
function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    if (isLoading) {
        btnText.style.display = 'none';
        btnLoader.style.display = 'flex';
    } else {
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
    }
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Save email to Firestore
async function saveEmail(email) {
    try {
        const emailData = {
            email: email.toLowerCase().trim(),
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            userAgent: navigator.userAgent,
            referrer: document.referrer || 'direct'
        };

        await db.collection('emails').add(emailData);
        return true;
    } catch (error) {
        console.error('Error saving email:', error);
        throw error;
    }
}

// Handle form submission
emailForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    hideMessages();
    
    const email = emailInput.value.trim();
    
    // Validate email
    if (!email) {
        showError('Please enter your email address');
        emailInput.focus();
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        emailInput.focus();
        return;
    }
    
    // Set loading state
    setLoading(true);
    
    try {
        // Save email to database
        await saveEmail(email);
        
        // Show success message briefly
        showSuccess('Email saved successfully! Redirecting...');
        
        // Redirect after a short delay
        setTimeout(() => {
            window.location.href = REDIRECT_URL;
        }, 1000);
        
    } catch (error) {
        console.error('Submission error:', error);
        setLoading(false);
        
        // Check if it's a configuration error
        if (error.message && error.message.includes('apiKey')) {
            showError('Database configuration error. Please check Firebase setup.');
        } else {
            showError('Failed to save email. Please try again.');
        }
    }
});

// Clear error message when user starts typing
emailInput.addEventListener('input', () => {
    if (errorMessage.style.display === 'block') {
        hideMessages();
    }
});

