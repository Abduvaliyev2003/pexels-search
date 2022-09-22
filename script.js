let input = document.querySelector('.input');
let formBtn = document.querySelector('.formBtn');
let header = document.querySelector('.header');
let backTop = document.querySelector('.back-top')
let APP_KEY = "563492ad6f91700001000001213035245634427484b7846b2586ff37";
let searshValue = '';
let search = false;
let verticall = 0;
let topValue = 250;
window.addEventListener("scroll", (e) => {
    let windowScroll = document.documentElement.scrollTop;
    if (windowScroll > verticall){
        header.style.top = '-70px';
    } else {
        header.style.top = '0';
    }
    console.log(windowScroll + '1') 
    verticall = windowScroll;
    console.log(verticall + '2');
    if (windowScroll > topValue){
         backTop.style.bottom = "100px"
    } else{
        backTop.style.bottom = "150%"
    }
})

backTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})
async  function defaultImg() {
    const data = await fetch(`https://api.pexels.com/v1/curated`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: APP_KEY,
        }
    })
    const response = await data.json();
  
    resaltImg(response)
}


function resaltImg(response) {
    response.photos.forEach(img => {
        let item = document.createElement('div');
        let imglink = img.src.medium
        console.log(img)
        item.innerHTML = `
          <a href="${ imglink } class="item" target"_blank" >
          <img src="${imglink}">
          </a>
          <h3>${img.photographer}</h3>
        `
        document.querySelector('.content').appendChild(item)
    })
  
}



async  function searchImg(query) {
    const data = await fetch(`https://api.pexels.com/v1/search?query=${query}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: APP_KEY,
        }
    })
    const response = await data.json();

    resaltImg(response)
}
input.addEventListener('input', (event) => {
    event.preventDefault();
    searshValue = event.target.value;
    
})

formBtn.addEventListener('click', () => {
    if (input.value == "") {
       document.querySelector('.alert').innerHTML = "please write a input"
    } else {
        document.querySelector('.alert').innerHTML = "";
        clear()
        searchImg(searshValue)
    }
})

function clear() {
    document.querySelector('.content').innerHTML = '';
}
defaultImg()



