const { ipcRenderer } = require('electron');

let refreshRate = 5000;
let dataSet = null
let refreshIntervalId

Vue.component('movieElement', {
  props: ['movieElem'],
  template: '<li>{{ movieElem }}</li>'
})

var app = new Vue({
  el: '#app',
  data: {
    show: true,
    movie : {
      title : 'None',
      showTime: 'None'
    }
  }
})

ipcRenderer.on('data-update', (event, payload) => {
  console.log(payload)
  if(refreshIntervalId != null) clearInterval(refreshIntervalId)
  dataSet = payload.data.map(e => {
    return { title: e.API_static_MainTitle, showTime: e.API_static_Showtime }
  })
  refreshIntervalId = movieRender(dataSet)
  refreshRate = payload.option.refreshRate  
})

function movieRender(data) {
  var index = 0
  return setInterval(() => {
    app.movie = data[index]
    index++
    if(index >= data.length) index = 0;
    toggleShow()
    setTimeout(() => { toggleShow() }, refreshRate*0.10);
  }, refreshRate + refreshRate*0.10);
}

function toggleShow() {
  app.show = !app.show
}
