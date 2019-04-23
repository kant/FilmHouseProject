const { ipcRenderer } = require('electron');

let dataSet = null

Vue.component('gridElement', {
  props: ['movieElem'],
  template: `
  <div>
    <div>{{ movieElem.title }}</div>
    <div>{{ movieElem.showTime }}</div>
  </div>
  `
})


var app = new Vue({
  el: '#app',
  data: {
    movieList : [
      { title : 'None', showTime: 'None' },
      { title : 'None', showTime: 'None' }
    ]
  }
})

console.log(app.movieList)

ipcRenderer.on('data-update', (event, data) => {
  console.log(data)
  dataSet = data.map(e => {
    return { title: e.API_static_MainTitle, showTime: e.API_static_Showtime }
  })
  app.movieList = dataSet
})
