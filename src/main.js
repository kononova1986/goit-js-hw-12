
import { onSearch, onSearchMore, page } from './js/pixabay-api';
import { render, displayErrorMessage } from "./js/render-functions";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector('.form');
const list = document.querySelector('.list');
const btnMore = document.querySelector('.btn-more');
const loader = document.querySelector('.loader');
loader.style.display = 'none';
const inputElement = document.querySelector('.input');
inputElement.addEventListener('input', (event) => {
    event.target.style.border = '1px solid #4E75FF';
});

inputElement.addEventListener('blur', (event) => {
    event.target.style.border = '1px solid #808080';
});
inputElement.addEventListener('input', (event) => {
inputElement.value = event.target.value;
})


form.addEventListener('submit', async (event) => {
    list.innerHTML = '';
    loader.style.display = 'block';
    event.preventDefault();
    const photo = await onSearch(inputElement.value, page);
    console.log("🚀 ~ form.addEventListener ~ photo:", photo);
    try {
    if (inputElement.value.trim() === '' || photo.totalHits === 0) {
        displayErrorMessage();
        loader.style.display = 'none';
        btnMore.style.display = 'none';
    } else {
        render(photo);
            btnMore.style.display = 'block';
            loader.style.display = 'none';
        }
    } catch (error) {
        console.error(error);
    }
});


btnMore.addEventListener('click', async (event) => {
  event.preventDefault();
  const photoMore = await onSearchMore(inputElement.value, page);
  console.log("🚀 ~ btnMore.addEventListener ~ page_first:", page)
  console.log("🚀 ~ btnMore.addEventListener ~ photoMore:", photoMore)
    try {
        render(photoMore);
    if (photoMore.hits.length >= photoMore.totalPages) {
      iziToast.error({
          message: "We're sorry, but you've reached the end of search results.",
          icon: '',
          backgroundColor: '#EF4040'
      });
      btnMore.style.display = 'none';
        } 
  } catch (error) {
    console.log(error);
  }
});


