// Require ipcRenderer
const { ipcRenderer } = require('electron');

ipcRenderer.on('update-from-mainWindow', (event, data) => {
  console.log(data)
  document.getElementById('DisplayData').innerHTML = data.API_static_Showtime + data.API_static_ParentBookingID + data.API_static_Showtime
})
