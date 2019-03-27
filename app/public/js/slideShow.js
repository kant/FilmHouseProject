// Require ipcRenderer
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
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 4000); // Change image every 10 seconds
}

ipcRenderer.on('update-from-mainWindow', (event, data) => {
  var titles = document.getElementsByClassName("title")
  var hour = document.getElementsByClassName("hour")
  var cert = document.getElementsByClassName("cert")
  console.log(data)
  for(var i = 0; i < data.length; i++) {
    if(i < titles.length) {
      console.log(titles[i])
      titles[i].innerHTML = data[i].info.API_static_MainTitle
      hour[i].innerHTML = data[i].data.API_static_Showtime      
      cert[i].innerHTML = data[i].info.API_static_Cert
    }
  }
})
