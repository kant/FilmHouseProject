// Require ipcRenderer
"use strict"
const { ipcRenderer } = require('electron');

var slideIndex = 0;
showSlides();
function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  // dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 4000); // Change image every 10 seconds
}

const slide_html = "<divclass=\"mySlidesfade\"><divclass=\"numbertext\">1/3</div><divclass=\"master-container\"><articleclass=\"parent-container\"><divclass=\"content-wrapper\"><divclass=\"image-wrapper\"><imgsrc=\"https://www.filmhousecinema.com/sites/filmhousecinema.com/files/styles/extra_large/public/shows/2019/TheAftermath02.jpg\"></div><divclass=\"text-wrapper\"><ulclass=\"data-display\"><ul></div></div></article></div></div>"

function RenderNewMovie(data) {
  console.log(slide_html)
  var container = document.querySelector('.slideshow-container')
  data.map(e => {
    container.append(slide_html)
    var display = document.querySelector('.data-display')
    for(i of e) {
      var node = document.createElement("LI");
      node.innerHTML = i
    }
  })
}

ipcRenderer.on('data-update', (event, data) => {
  console.log(data)
  for(var i = 0; i < data.length; i++) {
    RenderNewMovie(data)
  }
})
