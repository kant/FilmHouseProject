// Require ipcRenderer
const { ipcRenderer } = require('electron');

document.getElementById('UpdateScreen1').addEventListener('click', () => {
  ipcRenderer.send('UpdateScreen1')
})

document.getElementById('UpdateScreen2').addEventListener('click', () => {
  console.log('UpdateScreen2')
  ipcRenderer.send('UpdateScreen2')
})
