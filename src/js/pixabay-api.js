import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export let per_page = 3;
export let page = 1;
export let totalPages = 0;

export async function onSearch(searchValue,page) {
  const searchParam = new URLSearchParams({
    key: '43777991-fc34414997ff3024de4420c7b',
    image_type: 'photo',
    q: searchValue,
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: per_page,
    
  });
  const response = await axios(`?${searchParam}`);
  return response.data;
}

  

export async function onSearchMore(searchValue, page) {
  page = +1;
  console.log("🚀 ~ onSearchMore ~ page:", page)
  const results = await onSearch(searchValue, page);
  page = +1; 
  try {
    const { totalHits, hits } = results;
    totalPages = Math.ceil(totalHits / per_page);
    return { hits, totalPages };
  } catch (error) {
    console.error(error);
  }
}
