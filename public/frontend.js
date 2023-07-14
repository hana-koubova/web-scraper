const back = document.getElementById('back-but');
const next = document.getElementById('next-but');
const container = document.getElementById('data-container');
const pageNums = document.getElementById('for-page-nums');

//pagination
const pagination = document.getElementById('pagination');

let start = 0;
let end = 20;

loadData();
back.disabled = true;

function nextPage() {
  back.disabled = false;
  start = start + 20;
  console.log(start)
  end = end + 20;
  if (end >= 500) {
    next.disabled = true;
  } else {
    next.disabled = false;
  }
  deleteData();
  loadData();
  pageNumsProduce(localMaxNumber, localListingsPerPage, end);
}

function backPage() {
  start = start - 20;
  end = end - 20;
  if (start === 0) {
    back.disabled = true;
  } else {
    back.disabled = false;
  }
  deleteData();
  loadData();
  pageNumsProduce(localMaxNumber, localListingsPerPage, end);
}


function loadData() {

fetch('/scraped-data')
  .then(response => response.json())
  .then(data => {
    

    data.slice(start, end).forEach(item => {
      const div = document.createElement('div');
      div.classList.add('data-item');

      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.title;
      img.classList.add('data-image');

      const title = document.createElement('p');
      title.textContent = item.title;
      title.classList.add('data-title');

      div.appendChild(img);
      div.appendChild(title);
      container.appendChild(div);
    });
  })
  .catch(error => {
    console.log('Error:', error.message);
  });

}

function deleteData() {
  container.replaceChildren();
}

const localMaxNumber = 500;
const localListingsPerPage = 20;

function pageNumsProduce(maxNumber, listingsPerPage, endNum) {
  let numberOfPages = maxNumber / listingsPerPage;
  let currentPage = endNum / listingsPerPage;
  pagination.innerHTML = `Page ${currentPage} from total of ${numberOfPages} pages`
}

pageNumsProduce(localMaxNumber, localListingsPerPage, end);
  
next.addEventListener('click', nextPage);
back.addEventListener('click', backPage);