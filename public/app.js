console.log('✅ app.js loaded');
import { loadCarousel } from './js/carousel.js';
import { showLoginForm } from './js/login.js';
import { showSignupForm } from './js/sign_up.js';
export function showAuthLinks() {
  const nav = document.querySelector('.navbar-nav');

  nav.innerHTML = `
    <li class="nav-item">
        <a href="#" id="login-link" class="nav-link">Login</a>
     </li>
      <li class="nav-item">
         <a href="#" id="signup-link" class="nav-link">Sign Up</a>
     </li>
  `;
  const loginLink = document.getElementById('login-link');
  const signupLink = document.getElementById('signup-link');
loginLink.addEventListener('click', (e) => {
    e.preventDefault();               // ✅ stop page jump
    carousel.style.display = 'none';  // ✅ hide carousel
    showLoginForm();                  // ✅ load login
  });

  signupLink.addEventListener('click', (e) => {
    e.preventDefault();               // ✅ stop page jump
    carousel.style.display = 'none';  // ✅ hide carousel
    showSignupForm();                 // ✅ load signup
  });
}

export function showSignOut() {
  const nav = document.querySelector('.navbar-nav');

  nav.innerHTML = `
    <li class="nav-item">
      <a href="#" id="signout-link" class="nav-link">Sign Out</a>
    </li>
  `;

  document.getElementById('signout-link')
    .addEventListener('click', (e) => {
      e.preventDefault();
      signOut();
    });
}

function signOut() {
  // optional: clear session / localStorage
  localStorage.clear();

  showAuthLinks();

  // go back to home
  document.querySelector('.form').innerHTML = '';
  document.getElementById('carousel').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
  // showAuthLinks();

  const carousel = document.getElementById('carousel');

  // 👈 show carousel on home load
  loadCarousel();
  showAuthLinks();

  

});
