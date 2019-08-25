
document.addEventListener('DOMContentLoaded', event => {
  let button = document.getElementById('connect');

  button.addEventListener('click', async() => {
    let device;
    const VENDOR_ID = 1999;
    
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

      console.log('open')
      await device.open()
      console.log('opened:', device)

      await navigator.usb.getDevices()
      .then(devices => {
        console.log("Total devices: " + devices.length);
        devices.forEach(eachDevice => {
          console.log("Product name: " + eachDevice.productName + ", serial number " + eachDevice.serialNumber);
        });
      });

    } catch (error) {
      console.log(error)
    }
	  await device.close()
  })
})