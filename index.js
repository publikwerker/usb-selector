
document.addEventListener('DOMContentLoaded', event => {

  let device;
  const VENDOR_ID = 1999;
  let connectButton = document.getElementById('connect');

  connectButton.addEventListener('click', async() => {
    try {

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
  })
  let disconnectButton = document.getElementById('disconnect');

  disconnectButton.addEventListener('click', async() => {
    try {
      await device.close();
    } catch (err) {
      console.log(err)
    }
  });
})