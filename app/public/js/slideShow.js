const { ipcRenderer } = require('electron');

const refreshRate = 4000;
let dataSet = null
let refreshIntervalId

ipcRenderer.on('data-update', (event, data) => {
  if(refreshIntervalId != null) clearInterval(refreshIntervalId)
  console.log(data)
 dataSet = data.map(e => {
   return { title: e.API_static_MainTitle, showTime: e.API_static_Showtime }
 })
 refreshIntervalId = movieRender(dataSet)
 console.log(dataSet)
})

Vue.component('movieElement', {
  props: ['movieElem'],
 template: '<li>{{ movieElem }}</li>'
})

var app = new Vue({
  el: '#app',
  data: {
    show: false,
    movie : {
      title : 'None',
      showTime: 'None'
    }
  }
})


function movieRender(data) {
  var index = 0
  return setInterval(() => {
    toggleShow()
    app.movie = data[index]
    index++
    if(index >= data.length) index = 0;
    setTimeout(() => { toggleShow() }, refreshRate*0.75);
  }, refreshRate);
}

function toggleShow() {
  app.show = !app.show
}
