// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 14, 39, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Initialize EmailJS
// To set up EmailJS:
// 1. Go to https://www.emailjs.com/ and create a free account
// 2. Create an email service (Gmail, Outlook, etc.)
// 3. Create an email template with variables: {{from_name}}, {{from_email}}, {{message}}
// 4. Get your Public Key, Service ID, and Template ID
// 5. Replace the values below with your actual IDs

(function() {
    // Replace "YOUR_PUBLIC_KEY" with your EmailJS public key from dashboard
    if (typeof emailjs !== 'undefined') {
        emailjs.init("YOUR_PUBLIC_KEY");
    }
})();

// Form Submission
const contactForm = document.querySelector('.contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        formStatus.style.display = 'block';
        formStatus.style.color = 'var(--text-secondary)';
        formStatus.textContent = 'Sending your message...';
        
        // EmailJS service parameters
        // Replace these with your actual EmailJS IDs from your dashboard
        const serviceID = 'YOUR_SERVICE_ID'; // e.g., 'service_xxxxx'
        const templateID = 'YOUR_TEMPLATE_ID'; // e.g., 'template_xxxxx'
        
        const templateParams = {
            from_name: name,
            from_email: email,
            message: message,
            to_email: 'richardabela@gmail.com'
        };
        
        // Check if EmailJS is configured
        if (serviceID === 'YOUR_SERVICE_ID' || templateID === 'YOUR_TEMPLATE_ID') {
            // Fallback: Use mailto if EmailJS is not configured
            const mailtoLink = `mailto:richardabela@gmail.com?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent('From: ' + email + '\n\nMessage:\n' + message)}`;
            window.location.href = mailtoLink;
            
            formStatus.style.color = 'var(--accent-color)';
            formStatus.textContent = 'Opening your email client...';
            formStatus.style.display = 'block';
            
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            return;
        }
        
        try {
            // Send email using EmailJS
            await emailjs.send(serviceID, templateID, templateParams);
            
            // Success message
            formStatus.className = 'success';
            formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
            formStatus.style.display = 'block';
            
            // Reset form
            contactForm.reset();
            
            // Hide status message after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
                formStatus.className = '';
            }, 5000);
            
        } catch (error) {
            // Error message
            formStatus.className = 'error';
            formStatus.textContent = '✗ Failed to send message. Please try again or email me directly at richardabela@gmail.com';
            formStatus.style.display = 'block';
            console.error('EmailJS Error:', error);
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    });
}

// Add active class to nav links based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Lightbox Functionality
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxCounter = document.getElementById('lightbox-counter');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const screenshotItems = document.querySelectorAll('.screenshot-item');

let currentImageIndex = 0;
let allImages = [];
let filteredImages = [];
let currentProject = '';

// Collect all images from screenshot items with project info
screenshotItems.forEach((item, index) => {
    const img = item.querySelector('img');
    if (img) {
        // Check if item has multiple images in data-images attribute
        const imagesData = item.getAttribute('data-images');
        if (imagesData) {
            try {
                const imagesArray = JSON.parse(imagesData);
                imagesArray.forEach((imageData, imgIndex) => {
                    allImages.push({
                        src: imageData.src,
                        title: imageData.title,
                        project: item.getAttribute('data-project') || '',
                        originalIndex: index,
                        isMainImage: imgIndex === 0
                    });
                });
            } catch (e) {
                console.error('Error parsing data-images:', e);
                // Fallback to single image
                allImages.push({
                    src: item.getAttribute('data-src') || img.src,
                    title: item.getAttribute('data-title') || img.alt,
                    project: item.getAttribute('data-project') || '',
                    originalIndex: index
                });
            }
        } else {
            // Single image item
            allImages.push({
                src: item.getAttribute('data-src') || img.src,
                title: item.getAttribute('data-title') || img.alt,
                project: item.getAttribute('data-project') || '',
                originalIndex: index
            });
        }
    }
});

// Open lightbox with project filtering
function openLightbox(index) {
    const clickedItem = screenshotItems[index];
    currentProject = clickedItem.getAttribute('data-project') || '';
    
    // Check if this item has multiple images
    const imagesData = clickedItem.getAttribute('data-images');
    if (imagesData) {
        try {
            const imagesArray = JSON.parse(imagesData);
            filteredImages = imagesArray.map(imageData => ({
                src: imageData.src,
                title: imageData.title,
                project: currentProject
            }));
            currentImageIndex = 0; // Start with first image
        } catch (e) {
            console.error('Error parsing data-images:', e);
            // Fallback to project filtering
            filteredImages = allImages.filter(img => img.project === currentProject);
            const clickedImage = allImages.find(img => img.originalIndex === index);
            currentImageIndex = filteredImages.findIndex(img => 
                img.src === clickedImage.src && img.title === clickedImage.title
            );
            if (currentImageIndex === -1) {
                currentImageIndex = 0;
            }
        }
    } else {
        // Filter images by project
        filteredImages = allImages.filter(img => img.project === currentProject);
        
        // Find the index of clicked image in filtered array
        const clickedImage = allImages.find(img => img.originalIndex === index);
        currentImageIndex = filteredImages.findIndex(img => 
            img.src === clickedImage.src && img.title === clickedImage.title
        );
        
        // If not found, default to 0
        if (currentImageIndex === -1) {
            currentImageIndex = 0;
        }
    }
    
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    // Reset filtered images when closed
    filteredImages = [];
    currentProject = '';
}

// Update lightbox content
function updateLightbox() {
    if (filteredImages.length > 0 && filteredImages[currentImageIndex]) {
        lightboxImage.src = filteredImages[currentImageIndex].src;
        lightboxTitle.textContent = filteredImages[currentImageIndex].title;
        lightboxCounter.textContent = `${currentImageIndex + 1} / ${filteredImages.length}`;
    }
}

// Navigate to previous image (only within current project)
function prevImage() {
    if (filteredImages.length > 0) {
        currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
        updateLightbox();
    }
}

// Navigate to next image (only within current project)
function nextImage() {
    if (filteredImages.length > 0) {
        currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
        updateLightbox();
    }
}

// Event listeners for screenshot items
screenshotItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        openLightbox(index);
    });
});

// Close lightbox events
if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Navigation events
if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        prevImage();
    });
}

if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        nextImage();
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;

    switch(e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            prevImage();
            break;
        case 'ArrowRight':
            nextImage();
            break;
    }
});

// Prevent lightbox content clicks from closing
if (lightboxImage) {
    lightboxImage.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

const lightboxContent = document.querySelector('.lightbox-content');
if (lightboxContent) {
    lightboxContent.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}
