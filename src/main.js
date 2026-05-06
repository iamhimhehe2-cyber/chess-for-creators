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

// Ensure dashboard is hidden initially
if (dashboard) dashboard.style.display = 'none';

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        // CRITICAL: Prevent form submission and page reload
        e.preventDefault();
        e.stopPropagation();
        
        const nameInput = document.getElementById('username').value.toLowerCase().trim();
        const passInput = document.getElementById('password').value;
        const pinInput = document.getElementById('pin').value;

        console.log('Attempting login...');

        if (nameInput === VALID_NAME && passInput === VALID_PASS && pinInput === VALID_PIN) {
            showSuccess('ACCESS GRANTED');
            setTimeout(() => {
                enterDashboard();
            }, 800);
        } else {
            showError('IDENTITY NOT VERIFIED');
        }
        
        return false;
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        location.reload();
    });
}

function enterDashboard() {
    if (!loginScreen || !dashboard) return;
    
    loginScreen.style.display = 'none';
    dashboard.style.display = 'block';
    document.body.classList.add('logged-in');
    
    // Smooth entrance
    dashboard.style.opacity = '0';
    dashboard.style.transform = 'translateY(50px)';
    
    requestAnimationFrame(() => {
        dashboard.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
        dashboard.style.opacity = '1';
        dashboard.style.transform = 'translateY(0)';
    });

    // Animate stats
    animateValue('player-count', 0, 1428, 2500);
    animateValue('active-matches', 0, 84, 3000);
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
    
    const card = document.querySelector('.glass-card');
    if (card) {
        card.style.animation = 'none';
        card.offsetHeight;
        card.style.animation = 'shake 0.5s ease-in-out';
    }
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
    20% { transform: translateX(-20px); }
    40% { transform: translateX(20px); }
    60% { transform: translateX(-15px); }
    80% { transform: translateX(15px); }
}
`;
document.head.appendChild(style);

console.log('Creator Studio Logic Ready.');
