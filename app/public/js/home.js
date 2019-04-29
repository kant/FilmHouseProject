const { ipcRenderer } = require('electron');

document.getElementById('UpdateScreen1').addEventListener('click', () => {
  console.log('UpdateScreen1')
  ipcRenderer.send('UpdateScreen1')
})

document.getElementById('UpdateScreen2').addEventListener('click', () => {
  console.log('UpdateScreen2')
  ipcRenderer.send('UpdateScreen2', app.options)
})

document.getElementById('FetchData').addEventListener('click', () => {
  console.log('FetchData')
  ipcRenderer.send('FetchData')
})

Vue.component('option-panel', {
  props: ['param'],
  template:`
  <div class="option-panel">
    <h3>Options:</h3>
    <div class="option-grid">
      <span> Refresh rate :</span>
      <input v-model="param.refreshRate">
    </div>
  </div>
  `
})

var app = new Vue({
  el: '#app',
  data: {
    options: {
      refreshRate : 5000,
    }
  }
})
