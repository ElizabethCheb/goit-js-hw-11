import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox/dist/simple-lightbox.esm';
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
    lightbox = new SimpleLightbox('.gallery a', {});
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
    });
}
function showLoadingIndicator() {
  const loadingIndicator = document.createElement('div');
  loadingIndicator.className = 'loading-indicator';
  loadingIndicator.innerText = 'Loading...';
  document.body.appendChild(loadingIndicator);
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
      const imgElement = document.createElement('img');
      imgElement.src = image.webformatURL;
      imgElement.alt = image.tags;
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
  }
gallery.addEventListener('click', function (event) {
  if (event.target.tagName === 'IMG' && lightbox) {
    lightbox.open({ elements: [event.target] });
  }
});
const galleryImages = document.querySelectorAll('#gallery img');
galleryImages.forEach(image => {
  image.style.width = 'calc((100% - 32px) / 3)';
  image.style.height = 'auto';
  image.style.marginBottom = '16px';
});
const galleryLinks = document.querySelectorAll('#gallery a');
galleryLinks.forEach(link => {
  link.style.width = 'calc((100% - 32px) / 3)';
  link.style.height = 'auto';
  link.style.marginBottom = '16px';
});