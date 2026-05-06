import './style.css'

const loginForm = document.getElementById('login-form');
const loginScreen = document.getElementById('login-screen');
const dashboard = document.getElementById('dashboard');
const loginMessage = document.getElementById('login-message');
const logoutBtn = document.getElementById('logout-btn');

// Credentials from User Request
const VALID_NAME = 'elroi macharm';
const VALID_PASS = 'dontcheatinchess';
const VALID_PIN = 'eloi is goat';

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nameInput = document.getElementById('username').value.toLowerCase().trim();
    const passInput = document.getElementById('password').value;
    const pinInput = document.getElementById('pin').value;

    if (nameInput === VALID_NAME && passInput === VALID_PASS && pinInput === VALID_PIN) {
        showSuccess('Access Granted. Entering Studio...');
        setTimeout(() => {
            enterDashboard();
        }, 1500);
    } else {
        showError('Invalid credentials. Please try again.');
    }
});

logoutBtn.addEventListener('click', () => {
    location.reload(); // Simple logout
});

function enterDashboard() {
    loginScreen.style.display = 'none';
    dashboard.style.display = 'block';
    document.body.classList.add('logged-in');
    
    // Trigger animations for dashboard elements
    const cards = document.querySelectorAll('.stat-card, .glass-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}

function showError(msg) {
    loginMessage.textContent = msg;
    loginMessage.className = 'message error';
    
    // Shake animation
    const card = loginForm.parentElement;
    card.style.animation = 'none';
    card.offsetHeight; // trigger reflow
    card.style.animation = 'shake 0.5s ease-in-out';
}

function showSuccess(msg) {
    loginMessage.textContent = msg;
    loginMessage.className = 'message success';
}

// Add shake animation to CSS dynamically or via style.css
const style = document.createElement('style');
style.textContent = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
}
`;
document.head.appendChild(style);

// Check if already logged in (optional persistence)
// For this demo, we'll just start at login.
console.log('Chess for Creators logic initialized.');
