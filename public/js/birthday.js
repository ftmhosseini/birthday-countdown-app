import { loadCarousel } from "./carousel.js";
export async function showBirthdayPage(user) {
    console.log(`user in birth is ${user}`);
    console.log(`user in birth is ${typeof user}`);

    console.log('🎂 Birthday page loaded:', user.date_of_birth);

    const form = document.querySelector('.form');
    const carousel = document.getElementById('carousel');

    if (!form || !carousel) {
        console.error('❌ Missing .form or #carousel');
        return;
    }

    if (!user.date_of_birth) {
        form.innerHTML = `<p class="text-danger">Birthday not available</p>`;
        return;
    }


    const today = new Date();
    const dob = new Date(user.date_of_birth);

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
    let quote = { text: "", author: "" };
    if (isBirthday) {
        carousel.style.display = 'block';

        carousel.innerHTML = await loadBirthCarousel()
        quote = await loadQuote();
    } else {
        carousel.style.display = 'none';

    }
    form.innerHTML = `
    <div class="card p-4 text-center">
      <h1>${isBirthday ? `🎉 Happy Birthday, ${user.username}` : `${daysLeft} DAYS LEFT `}</h1>
      
        ${isBirthday ? `<p class="fs-4">${quote.text}</p><h6 class="fs-4">${quote.author}</h6>` : '<h3>UNTIL YOUR BIRTHDAY!</h3>'}
    </div>
  `;
  /*
<button id="back-home" class="btn btn-secondary mt-3">Back Home</button>

    document.getElementById('back-home')
        .addEventListener('click', () => {
            form.innerHTML = '';
            carousel.style.display = 'block';
            loadCarousel();
        });*/

}


async function loadBirthCarousel() {

    try {
        // mysql
        const res = await fetch('/api/carousel');


        if (!res.ok) {
            throw new Error('API error');
        }

        const images = await res.json();

        console.log(images);
        // ✅ show message if no images
        if (!images || images.length === 0) {
            return `
        <p style="text-align:center">No carousel images</p>
      `;
        } else {

            return `
            <div class="carousel-inner">
                ${images.filter(img=>img.image_des==='birthday').map((img, index) => `
                    
                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                        <img src="${img.image_url}" class="d-block w-100" alt='${img.image_info}'>
                    </div>
                `).join('')}
            </div>
        `;
        }
    } catch (err) {
        console.error('Carousel error:', err);
    }
}
async function loadQuote() {
    try {
        const res = await fetch('/api/quote');

        if (!res.ok) throw new Error("Could not fetch quote");

        const data = await res.json();
        return data; // This returns { text: "...", author: "..." }
    } catch (error) {
        console.error("Frontend Quote Error:", error);
        // Return a fallback quote so the app doesn't break
        return { text: "Have a wonderful birthday!", author: "Management" };
    }
}