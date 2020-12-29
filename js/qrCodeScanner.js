$(document).on('pageinit', '#qr-scanner', function () {
  console.log("im here");
  const qrcode = window.qrcode;

  var video = document.createElement("video");
  var canvasElement = document.getElementById("qr-canvas");
  var canvas = canvasElement.getContext("2d");

  const qrResult = document.getElementById("qr-result");
  var outputData = document.getElementById("outputData");
  //   var btnScanQR = document.getElementById("btn-scan-qr");

  let scanning = false;

  qrcode.callback = res => {
    if (res) {
      outputData.innerText = res;
      scanning = false;

      video.srcObject.getTracks().forEach(track => {
        track.stop();
      });

      qrResult.hidden = false;
      canvasElement.hidden = true;
      //   btnScanQR.hidden = false;
    }
  };


  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function (stream) {
      scanning = true;
      qrResult.hidden = true;
      // btnScanQR.hidden = true;
      canvasElement.hidden = false;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    });


  function tick() {
    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

    scanning && requestAnimationFrame(tick);
  }

  function scan() {
    try {
      qrcode.decode();
    } catch (e) {
      setTimeout(scan, 300);
    }
  }
});