import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
let lightbox;
const apiKey = '41856148-e541297002e84807a45dae6d1';
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const gallery = document.getElementById('gallery');
searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const searchQuery = searchInput.value.trim();
  fetchData(searchQuery, apiKey);
});
document.addEventListener('DOMContentLoaded', function () {
  lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    widthRatio: 0.9,
    heightRatio: 0.9,
    scaleImageToRatio: true,
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && lightbox && lightbox.visible) {
      lightbox.close();
    }
  });
});
function fetchData(searchQuery, apiKey) {
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`;
  showLoadingIndicator();
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      hideLoadingIndicator();
      clearGallery();
      if (data.hits.length === 0) {
        displayNoResultsMessage();
        return;
      }
      displayImages(data.hits);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      hideLoadingIndicator();
      displayErrorMessage('An error occurred while fetching data. Please try again.');
    });
}
function showLoadingIndicator() {
  const loadingIndicator = document.querySelector('.loading-indicator');
  if (!loadingIndicator) {
    const newLoadingIndicator = document.createElement('div');
    newLoadingIndicator.className = 'loading-indicator';
    newLoadingIndicator.innerText = 'Loading...';
    document.body.appendChild(newLoadingIndicator);
  }
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
  const toastContainer = document.createElement('div');
  toastContainer.className = 'toast-container';
  const decorativeIcon = document.createElement('span');
  decorativeIcon.className = 'decorative-icon';
  decorativeIcon.innerHTML = '&#9737;';
  const errorMessage = document.createElement('p');
  errorMessage.innerText = 'Sorry, there are no images matching your search query. Please, try again!';
  const closeButton = document.createElement('span');
  closeButton.className = 'close-button';
  closeButton.innerHTML = '&times;';
  toastContainer.appendChild(decorativeIcon);
  toastContainer.appendChild(errorMessage);
  toastContainer.appendChild(closeButton);
  document.body.appendChild(toastContainer);
  closeButton.addEventListener('click', () => {
    toastContainer.remove();
  });
}
function displayImages(images) {
  const fragment = document.createDocumentFragment();
  images.forEach(image => {
    const linkElement = document.createElement('a');
    linkElement.href = image.webformatURL;
    linkElement.classList.add('gallery-link');
    const imgElement = document.createElement('img');
    imgElement.src = image.webformatURL;
    imgElement.alt = image.tags;
    imgElement.style.width = '1112px';
    imgElement.style.height = '640px';
    linkElement.style.width = 'calc((100% - 32px) / 3)';
    linkElement.style.height = 'auto';
    imgElement.style.width = '100%';
    imgElement.style.height = '100%';
    linkElement.style.marginBottom = '16px';
    linkElement.style.display = 'block';
    linkElement.appendChild(imgElement);
    fragment.appendChild(linkElement);
  });
  gallery.appendChild(fragment);
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
        width: '1112px',
        height: '640px',
        'max-width': 'none',
        'max-height': 'none'
      });
    });
  }
});
