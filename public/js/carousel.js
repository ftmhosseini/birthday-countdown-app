export async function loadCarousel() {
    const carousel = document.getElementById('carousel');

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
            carousel.innerHTML = `
        <p style="text-align:center">No carousel images</p>
      `;
            return;
        } else {

            carousel.innerHTML = `
            <div class="carousel-inner">
                ${images.map((img, index) => `
                    ${img[0]} ${index}
                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                        <img src="${img.image_url}" class="d-block w-100" alt='${img.image_info}'>
                    </div>
                `).join('')}
            </div>
        `;
        }
        console.log(carousel);


    } catch (err) {
        console.error('Carousel error:', err);
    }
}
