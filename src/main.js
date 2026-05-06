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

// Initialize state: Hide dashboard explicitly
dashboard.style.display = 'none';

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nameInput = document.getElementById('username').value.toLowerCase().trim();
    const passInput = document.getElementById('password').value;
    const pinInput = document.getElementById('pin').value;

    if (nameInput === VALID_NAME && passInput === VALID_PASS && pinInput === VALID_PIN) {
        showSuccess('Verification Successful. Loading Main Site Metrics...');
        setTimeout(() => {
            enterDashboard();
        }, 1200);
    } else {
        showError('Verification Failed. Check credentials.');
    }
});

logoutBtn.addEventListener('click', () => {
    location.reload();
});

function enterDashboard() {
    loginScreen.style.display = 'none';
    dashboard.style.display = 'block';
    document.body.classList.add('logged-in');
    
    // Smooth entrance
    dashboard.style.opacity = '0';
    dashboard.style.transform = 'translateY(30px)';
    
    requestAnimationFrame(() => {
        dashboard.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        dashboard.style.opacity = '1';
        dashboard.style.transform = 'translateY(0)';
    });

    // Animate stats
    animateValue('player-count', 0, 1428, 2000);
    animateValue('active-matches', 0, 84, 2500);
}

function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    if (!obj) return;
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function showError(msg) {
    loginMessage.textContent = msg;
    loginMessage.className = 'message error';
    
    const card = loginForm.parentElement;
    card.style.animation = 'none';
    card.offsetHeight;
    card.style.animation = 'shake 0.5s ease-in-out';
}

function showSuccess(msg) {
    loginMessage.textContent = msg;
    loginMessage.className = 'message success';
}

// Add shake animation
const style = document.createElement('style');
style.textContent = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-15px); }
    40% { transform: translateX(15px); }
    60% { transform: translateX(-10px); }
    80% { transform: translateX(10px); }
}
`;
document.head.appendChild(style);
