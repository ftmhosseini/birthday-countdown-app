import { showBirthdayPage } from './birthday.js';
import { showSignOut } from '../app.js';

export function showLoginForm() {
    const container = document.querySelector('.form');

    container.innerHTML = `
        <form id="login-form">
            <input id="email" type="email" class="form-control mb-2" placeholder="Email">
            <input id="password" type="password" class="form-control mb-2" placeholder="Password">
            <button class="btn btn-dark w-100">Login</button>
            <p id="message" class="text-danger mt-2"></p>
        </form>
    `;

    document.getElementById('login-form')
        .addEventListener('submit', async (e) => {
            console.log('button is clicked');

            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const message = document.getElementById('message');

            if (!email || !password) {
                message.textContent = 'You have to fill the form';
                return; // ⛔ stop here
            }
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            console.log(res);
            const data = await res.json();
            console.log(data);

            // message.textContent =
            //     res.ok ? 'Login successful' : data.message;
            if (res.ok) {
                // ✅ DOB COMES FROM BACKEND (recommended)
                showSignOut(); 
                console.log(data.date_of_birth);
                console.log(res.body);
                
                
                showBirthdayPage(data.date_of_birth);
                // example fallback:
                // showBirthdayPage('1999-08-25');
            } else {
                message.textContent = data.message;
            }
        });
}
