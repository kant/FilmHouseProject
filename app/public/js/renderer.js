// Require ipcRenderer
const { ipcRenderer } = require('electron');

let Payload = {
  'value' : 'alpha'
}

document.getElementById('CreateScreen2').addEventListener('click', () => { 
	console.log("test")
  ipcRenderer.send('CreateScreen2')
})

// document.getElementById("FetchButton").addEventListener("click", () => {
//   ipcRenderer.send('update-from-mainWindow')
// })
