// Mobile Menu Toggle
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');

        if (navLinks.classList.contains('active')) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = '#0a192f';
            navLinks.style.padding = '20px';
        } else {
            navLinks.style.display = 'none';
        }
    });
}

// Scroll animation
const revealElements = document.querySelectorAll('.reveal, .service-card, .why-item');

const scrollReveal = () => {
    const triggerBottom = window.innerHeight / 5 * 4;

    revealElements.forEach(el => {
        const elTop = el.getBoundingClientRect().top;

        if (elTop < triggerBottom) {
            el.classList.add('active');
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }
    });
};

revealElements.forEach(el => {
    el.style.transition = "all 0.8s ease-out";
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
});

window.addEventListener('scroll', scrollReveal);
window.addEventListener('load', scrollReveal);

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
// --- Service Detail Content ---
const serviceDetails = {
    "Solar System Services": "We offer high-efficiency solar panel installations, net metering support, and complete inverter maintenance to reduce your electricity bills to zero.",
    "Motor & Pump Services": "Our experts handle industrial and domestic water pump repairs, motor rewinding, and new installations with high-quality components.",
    "AC Services": "Stay cool with our professional AC services including deep chemical washing, gas charging (R32/R410), and circuit repair for all brands.",
    "CCTV Camera Services": "Secure your property with 4K resolution cameras, mobile-app integration for remote viewing, and professional DVR/NVR configuration.",
    "Home Appliance Repair": "Fast and reliable repair for washing machines, refrigerators, and microwaves using genuine spare parts."
};

// --- Modal Logic ---
const modal = document.getElementById("serviceModal");
const modalBody = document.getElementById("modalBody");
const closeBtn = document.querySelector(".close-modal");

document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        // Get the title from the card
        const title = button.closest('.card-content').querySelector('h3').innerText;
        const description = serviceDetails[title] || "Detailed information for this service is coming soon.";

        // Inject content and show modal
        modalBody.innerHTML = `<h2>${title}</h2><p style="color: #333; margin-top: 15px; line-height: 1.6;">${description}</p>`;
        modal.style.display = "flex"; // Changed to flex to center it
    });
});

// Close button logic
if(closeBtn) {
    closeBtn.onclick = () => modal.style.display = "none";
}

// Close when clicking outside the box
window.onclick = (event) => {
    if (event.target == modal) modal.style.display = "none";
};
// Backend fetch (ONLY ONE VERSION)
async function loadServices() {
    try {
        const response = await fetch("http://localhost:5000/api/content");

        const data = await response.json();

        renderServices(data.services);

    } catch (error) {
        console.log("Backend not running or API error", error);
    }
}

function renderServices(services) {
    const servicesGrid = document.querySelector(".services-grid");
    if (!servicesGrid) return;

    servicesGrid.innerHTML = services.map(s => `
        <div class="service-card">
            <div class="card-img">
                <img src="${s.img}" alt="${s.title}">
            </div>
            <div class="card-content">
                <h3>${s.title}</h3>
                <p>${s.desc}</p>
                <a href="#" class="read-more">Read More</a>
            </div>
        </div>
    `).join("");
}

loadServices();