const { ipcRenderer } = require('electron');

let dataSet = null

Vue.component('show-times', {
  props: ['time'],
  template:`
  <ul>
    <li> {{ time }} </li>
  </ul>
  `
})

Vue.component('movie-element', {
  props: ['movie'],
  template: `
  <div class="grid-element">
    <span>{{ movie.title }}</span>
    <span>{{ movie.showTime }}</span>
    <span>{{ movie.cert }}</span>
  </div>
  `
})

var app = new Vue({
  el: '#app',
  data: {
    movieList : [
      { title : 'None', showTime: 'None', cert:"None"}
    ]
  }
})

ipcRenderer.on('data-update', (event, payload) => {
  console.log(payload)
  dataSet = payload.map(e => {
    return { title: e.API_static_MainTitle, showTime: e.API_static_Showtime, cert: e.API_static_Cert}
  })
  app.movieList = dataSet
})
