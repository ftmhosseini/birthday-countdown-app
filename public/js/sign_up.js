export function showSignupForm() {

    console.log("Signup form initialized");
    const container = document.querySelector('.form');

    container.innerHTML = `
        <form id="sign-up-form">
            <select id="database" name="database" class="form-control mb-2">
                <option value="" disabled selected>Select Database</option>
                <option value="mysql">MySQL</option>
                <option value="firebase">Firebase</option>
            </select>
            <input id="name" type="name" class="form-control mb-2" placeholder="Name">
            <input id="email" type="email" class="form-control mb-2" placeholder="Email">
            <input id="password" type="password" class="form-control mb-2" placeholder="Password">
            <input id="confirm-password" type="password" class="form-control mb-2" placeholder="Confirm Password">
            <input id="dob" type="date" class="form-control mb-2" placeholder="Date of birth">
            <button class="btn btn-dark w-100">Create Account</button>
            <p id="message" class="text-danger mt-2"></p>
        </form>
    `;

    document.getElementById('sign-up-form')
        .addEventListener('submit', async (e) => {

            console.log('button is clicked');
            e.preventDefault();


            const db = document.getElementById('database').value;
            const name = document.getElementById('name').value;
            const dob = document.getElementById('dob').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const message = document.getElementById('message');
            if (confirmPassword !== password) {
                message.textContent = 'your password and confirm password have to be same';
                return;
            } else if (!email || !password || !dob || !name || !db) {
                message.textContent = 'You have to fill the form';
                return; // ⛔ stop here
            }
            message.textContent = '';

            try {
                const res = await fetch('/api/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ db, name, email, password, dob })
                });
                
                const data = await res.json();
                console.log(`data in sign up page is ${data}`);

                if (res.ok) {

                    message.textContent = 'Account created successfully! Redirecting...';

                    // Redirect to login after 2 seconds
                    setTimeout(() => {
                        window.location.reload(); // Or showLoginForm()
                    }, 4000);
                } else {
                    console.log(res.status);
                    
                    if (res.status === 409) {
                        message.textContent = "This email is already registered. Try logging in!";
                    } else if (res.status === 404) {
                        message.textContent = "Server endpoint not found. Check your URL.";
                    } else {
                        message.textContent = data.message || "Signup failed.";
                    }
                }

            } catch (error) {
                
                console.error(`${error}`);
                message.textContent = `Cannot connect to server. ${error}`;
            }

        });

}