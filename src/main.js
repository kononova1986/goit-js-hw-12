import { onSearch } from './js/pixabay-api';
import { render, displayErrorMessage, displayEndResultsMessage, displayMessageInput} from "./js/render-functions";

const inputElement = document.querySelector('.input');
const form = document.querySelector('.form');
const list = document.querySelector('.list');
const btnMore = document.querySelector('.btn-more');
const loader = document.querySelector('.loader');

loader.style.display = 'none';

inputElement.addEventListener('input', (event) => {
    event.target.style.border = '1px solid #4E75FF';
});
inputElement.addEventListener('blur', (event) => {
    event.target.style.border = '1px solid #808080';
});

let page = 1;
let per_page = 15;
let searchQuery = "";
let totalPages = 0;


form.addEventListener('submit', async (event) => {
    event.preventDefault();
    list.innerHTML = '';
    
    loader.style.display = 'block';
    btnMore.style.display = 'none';
    page = 1;

    searchQuery = inputElement.value.trim();

if (searchQuery ==="") {
    displayMessageInput();
    loader.style.display = 'none';
    return;
    }
    try {
        const photo = await onSearch(searchQuery, page, per_page);
    if ( photo.totalHits === 0) {
        displayErrorMessage();
        btnMore.style.display = 'none';
        return;
    } else {
        render(photo);
        inputElement.value = "";
        btnMore.style.display = 'block';
        
        if (photo.totalHits < per_page) {
        displayEndResultsMessage()
        btnMore.style.display = 'none';
        } 
        }
        console.log("🚀 ~ form.addEventListener ~ photo:", photo)
    } catch (error) {
        console.error(error);
    }
    finally {
        loader.style.display = 'none';
    }
});

const smoothScrollOnLoadMore = () => {
const elem = document.querySelector('.list');
let rect = elem.getBoundingClientRect().height;
const scrollHeight = rect * 2;

window.scrollBy({
    top: scrollHeight,
    left: 0,
    behavior: 'smooth',
});
};

btnMore.addEventListener('click', async (event) => {
    page +=1;
    try {
        const photoMore = await onSearch(searchQuery, page, per_page);
        render(photoMore);
        smoothScrollOnLoadMore();
        totalPages = Math.ceil(photoMore.totalHits / per_page);
    if (page === totalPages) {
    btnMore.style.display = 'none';
        } 
} catch (error) {
    console.log(error);
    }
});



