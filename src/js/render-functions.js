import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const list = document.querySelector('.list');

    let lightbox = new SimpleLightbox('.gallery-item a', {
      captionDelay: 250,
      captionPosition: 'bottom',
      captionsData: 'alt',
    });

export function render(photos) {
    const markup = photos.hits.map((photo) => {
      return `<li class="gallery-item" >
    <a href= ${photo.largeImageURL}>
	<img
			class = "gallery-image"  
			src = "${photo.webformatURL}"  
			alt = "${photo.tags}"
    />
	</a>
    <ul class = "gallery-alt">
        <li class="gallery-alt-photo">Likes <p class = 'like'>${photo.likes}</p></li>
        <li class="gallery-alt-photo">Views <p class = 'like'>${photo.views}</p></li>
        <li class="gallery-alt-photo">Comments <p class = 'like'>${photo.comments}</p></li>
        <li class="gallery-alt-photo">Downloads <p class = 'like'>${photo.downloads}</p></li>
    </ul>
</li>`
    }).join('');
  list.insertAdjacentHTML("beforeend", markup);
  lightbox.refresh();
}
  export const displayErrorMessage = () => {
    iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        icon: '',
        backgroundColor: '#EF4040',
        position: 'topRight',
        progressBarColor: '#B51B1B',
        messageColor: 'white',
        close: false,
        timeout: 2000,
    });
};