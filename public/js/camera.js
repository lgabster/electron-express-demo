((win, ns, undefined) => {

	var videoStartBtn = document.querySelector('[data-component~="video-start"]')
	var videoPauseBtn = document.querySelector('[data-component~="video-pause"]')
	var videoStopBtn = document.querySelector('[data-component~="video-stop"]')
	var snapshotBtn = document.querySelector('[data-component~="take-photo"]')
	var video = document.querySelector('[data-component~="camera"]')
	var canvas = document.querySelector('[data-component~="photo"]')
	var context = canvas.getContext("2d")

	var mediaOptions = {
	    video: true, 
	    //audio: true
	}

	snapshotBtn.addEventListener("click", () => {
	    context.drawImage(video, 0, 0, 320, 240);
	})

	videoStartBtn.addEventListener('click', (event) => {
	    navigator.webkitGetUserMedia(mediaOptions, 
	        (localMediaStream) => {
	            video.src = window.URL.createObjectURL(localMediaStream)
	            video.play()
	            videoStopBtn.addEventListener('click', (event) => {
	                localMediaStream.getVideoTracks().forEach(function (track) {
	                    track.stop();
	                });
	                videoStartBtn.disabled = false
	                videoPauseBtn.disabled = true
	                videoStopBtn.disabled = true
	            })
	            videoStartBtn.disabled = true
	            videoPauseBtn.disabled = false
	            videoStopBtn.disabled = false
	        }, 
	        (e) => {
	            console.log('Reeeejected!', e)
	        }
	    )
	})

	videoPauseBtn.addEventListener('click', (event) => {
	    if (video.src) {
	        video.paused ? video.play() : video.pause()
	    }

	})

})(window, 'electron')
