import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from 'izitoast';

let lightbox;
const apiKey = '41856148-e541297002e84807a45dae6d1';
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const gallery = document.getElementById('gallery');
let errorMessageElement = document.getElementById('error-message');

lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  widthRatio: 0.9,
  heightRatio: 0.9,
  scaleImageToRatio: true,
});

document.addEventListener('keydown', handleKeyPress);
searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const searchQuery = searchInput.value.trim();
  fetchData(searchQuery, apiKey);
});

function handleKeyPress(event) {
  if (event.key === 'Escape' && lightbox && lightbox.visible) {
    lightbox.close();
  }
}

async function fetchData(searchQuery, apiKey) {
  const url = new URL('https://pixabay.com/api/');
  const params = {
    key: apiKey,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true
  };
  url.search = new URLSearchParams(params).toString();
  showLoadingIndicator();

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    hideLoadingIndicator();
    clearGallery();

    if (data.hits.length === 0) {
      displayNoResultsMessage();
    } else {
      displayImages(data.hits);
      initializeLightbox(); // Оновлено: ініціалізувати lightbox після додавання зображень
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    hideLoadingIndicator();
    displayErrorMessage('An error occurred while fetching data. Please try again.');
  }
}

function showLoadingIndicator() {
  const loadingIndicator = createLoadingIndicator();
  document.body.appendChild(loadingIndicator);
}

function createLoadingIndicator() {
  const loadingIndicator = document.createElement('div');
  loadingIndicator.className = 'loading-indicator';
  loadingIndicator.innerText = 'Loading...';
  return loadingIndicator;
}

function hideLoadingIndicator() {
  const loadingIndicator = document.querySelector('.loading-indicator');
  if (loadingIndicator) {
    loadingIndicator.remove();
  }
}

function clearGallery() {
  gallery.innerHTML = '';
}

function displayNoResultsMessage() {
  iziToast.error({
    title: '',
    message: 'Sorry, there are no images matching your search query. Please, try again!',
    position: 'topRight',
    timeout: 5000,
  });
}

function displayErrorMessage(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
    timeout: 5000,
  });

  errorMessageElement.textContent = message;
}

function displayImages(images) {
  const fragment = document.createDocumentFragment();
  images.forEach(image => {
    const linkElement = document.createElement('a');
    linkElement.href = image.largeImageURL;
    linkElement.classList.add('gallery-link');

    const imgElement = document.createElement('img');
    imgElement.src = image.webformatURL;
    imgElement.alt = image.tags;
    imgElement.style.width = '100%';

    linkElement.appendChild(imgElement);
    fragment.appendChild(linkElement);
  });
  gallery.appendChild(fragment);
}

function initializeLightbox() {
  lightbox.refresh();
}

gallery.addEventListener('click', function (event) {
  if (event.target.tagName === 'IMG' && lightbox) {
    const galleryImages = document.querySelectorAll('.gallery img');
    const imageIndex = Array.from(galleryImages).indexOf(event.target);
    const originalImageUrl = galleryImages[imageIndex].parentNode.href;
    lightbox.open([{
      src: originalImageUrl,
      title: galleryImages[imageIndex].alt
    }]);
    lightbox.on('show.simplelightbox', function () {
      const lightboxImage = lightbox.element().find('.sl-image img');
      lightboxImage.css({
        width: '100%',
        'max-width': 'none',
        'max-height': 'none'
      });
    });
  }
});
