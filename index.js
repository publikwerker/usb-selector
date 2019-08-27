
document.addEventListener('DOMContentLoaded', event => {

  let device;
  const VENDOR_ID = 1999;
  let connectButton = document.getElementById('connect');
  let disconnectButton = document.getElementById('disconnect');
  let recordButton = document.getElementById('record');
  let stopButton = document.getElementById('stop');

  connectButton.addEventListener('click', async() => {
    try {
      connectButton.disabled = true;
      disconnectButton.disabled = false;
      recordButton.disabled = false;
      stopButton.disabled = true;

      const connectedDevices = await navigator.usb.getDevices();
      console.log("Total devices: " + connectedDevices.length);
      connectedDevices.forEach(eachDevice => {
        console.log("Product name: " + eachDevice.productName + ", serial number " + eachDevice.serialNumber);
      });

      device = await navigator.usb.requestDevice({
        filters: [{
          vendorId: VENDOR_ID
        }]
      })

      console.log('open');
      await device.open();
      console.log('opened:', device);

    } catch (error) {
      console.log(error);
    }
    if (!device){
      return document.getElementById('status-block').innerHTML='No devices to choose from.';
    }
  });

  recordButton.addEventListener('click', async() => {
    connectButton.disabled = true;
    disconnectButton.disabled = true;
    recordButton.disabled = true;
    stopButton.disabled = false;
    try {
      
    } catch (err) {
      console.log(err)
    }
  });

  stopButton.addEventListener('click', async() => {
    connectButton.disabled = true;
    disconnectButton.disabled = false;
    recordButton.disabled = false;
    stopButton.disabled = true;
    try {
      
    } catch (err) {
      console.log(err)
    }
  });

  disconnectButton.addEventListener('click', async() => {
    connectButton.disabled = false;
    disconnectButton.disabled = true;
    recordButton.disabled = true;
    stopButton.disabled = true;
    try {
      await device.close();
    } catch (err) {
      console.log(err)
    }
  });
})