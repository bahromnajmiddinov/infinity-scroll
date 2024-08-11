const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let imagesArray = [];

// Unsplash API endpoint
let count = 5; // Number of images to fetch
const apiKey = 'YOUR_API_KEY';
const unsplashEndpoint = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images have loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
    }
}

// Display fetched images
function displayImages(images) {
    imagesLoaded = 0;
    totalImages = images.length;
    images.forEach(image => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        item.href = image.links.html;
        item.target = '_blank';
        
        // Create <img> element for the image
        const img = document.createElement('img');
        img.src = image.urls.regular;
        img.alt = image.alt_description;
        img.title = image.alt_description;

        // Event Listener, when each image is finished loading
        img.addEventListener('load', imageLoaded);

        // Append <img> to <a>
        item.appendChild(img);
        
        // Append <a> to the image container
        imageContainer.appendChild(item);
    });
}

// Fetch images from Unsplash API
async function fetchImages() {
    try {
        const response = await fetch(unsplashEndpoint);
        imagesArray = await response.json();
        displayImages(imagesArray);
    } catch (error) {
        console.error('Error fetching images:', error.message);
        return;
    }
}

// Check to see if the user has scrolled to the bottom of the page, and fetch images
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        fetchImages();
    }
});

// On page load, fetch images
fetchImages();
