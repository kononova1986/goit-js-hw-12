import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function onSearch(searchValue, page, per_page) {
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

