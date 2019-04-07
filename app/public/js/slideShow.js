const { ipcRenderer } = require('electron');

const refreshRate = 3000;
let dataSet = null
let refreshIntervalId

ipcRenderer.on('data-update', (event, data) => {
  if(refreshIntervalId != null) clearInterval(refreshIntervalId)
  dataSet = data.map(e => {
    return { title: e.API_static_MainTitle }
  })
  refreshIntervalId = movieRender(dataSet)
  console.log(dataSet)
})

Vue.component('movieElement', {
  props: ['movieTitle'],
 template: '<span id="movie-display">{{ movieTitle }}</span>'
})

var app = new Vue({
  el: '#app',
  data: {    
    movie : {
      title : 'None'
    }
  }
})


function movieRender(data) {
  var index = 0
  return setInterval(() => {
    app.movie.title = data[index].title
    index++
    if(index >= data.length) index = 0;
  }, refreshRate);
}
