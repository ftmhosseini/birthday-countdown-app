import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


export function showSignupForm() {

    console.log("Signup form initialized");
    const container = document.querySelector('.form');

    container.innerHTML = `
        <form id="sign-up-form">
            <input id="name" type="name" class="form-control mb-2" placeholder="Name">
            <input id="email" type="email" class="form-control mb-2" placeholder="Email">
            <input id="password" type="password" class="form-control mb-2" placeholder="Password">
            <input id="dob" type="date" class="form-control mb-2" placeholder="Date of birth">
            <button class="btn btn-dark w-100">Create Account</button>
            <p id="message" class="text-danger mt-2"></p>
        </form>
    `;

    document.getElementById('sign-up-form')
        .addEventListener('submit', async (e) => {
            
            console.log('button is clicked');
            e.preventDefault();


            const name = document.getElementById('name').value;
            const dob = document.getElementById('dob').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const message = document.getElementById('message');
            if (!email || !password || !dob || !name) {
                message.textContent = 'You have to fill the form';
                return; // ⛔ stop here
            }else{
                 message.textContent = '';
            }
            
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, dob })
            });
            // console.log(auth, name, email, password, dob);
            
            // const res = await createUserWithEmailAndPassword(auth, name, email, password, dob );

            if (res.ok) {
                // ✅ NAVIGATE TO HOME
                const data = await res.json();;
                message.textContent = 'you successfully created an account';
            } else {
                console.log(res);
                console.log(res.message);
                message.textContent = `${res.statusText}: maybe you have account with this email`;
            }

        });

}