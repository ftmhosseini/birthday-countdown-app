import { loadCarousel } from './carousel.js';

export function showBirthdayPage(userDob) {
    console.log('🎂 Birthday page loaded:', userDob);

    const form = document.querySelector('.form');
    const carousel = document.getElementById('carousel');

    if (!form || !carousel) {
        console.error('❌ Missing .form or #carousel');
        return;
    }

    if (!userDob) {
        form.innerHTML = `<p class="text-danger">Birthday not available</p>`;
        return;
    }

    carousel.style.display = 'none';

    const today = new Date();
    const dob = new Date(userDob);

    if (isNaN(dob.getTime())) {
        form.innerHTML = `<p class="text-danger">Invalid birthday</p>`;
        return;
    }

    const nextBirthday = new Date(
        today.getFullYear(),
        dob.getMonth(),
        dob.getDate()
    );

    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const daysLeft = Math.ceil(
        (nextBirthday - today) / (1000 * 60 * 60 * 24)
    );

    const isBirthday =
        dob.getDate() === today.getDate() &&
        dob.getMonth() === today.getMonth();

    form.innerHTML = `
    <div class="card p-4 text-center">
      <h2>${isBirthday ? '🎉 Happy Birthday!' : '🎂 Birthday Countdown'}</h2>
      <p class="fs-4">
        ${isBirthday ? 'Today is your special day!' : `${daysLeft} days left`}
      </p>
      <button id="back-home" class="btn btn-dark mt-3">Back to Home</button>
    </div>
  `;

    document.getElementById('back-home')
        .addEventListener('click', () => {
            form.innerHTML = '';
            carousel.style.display = 'block';
            loadCarousel();
        });

    if (isBirthday) {
        carousel.style.display = 'block';
        loadCarousel('birthday');
    }
}
