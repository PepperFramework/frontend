const webm9MimeCodec = 'video/webm;codecs="vp9"'
const segmentLimit = 20000
const videoSource = document.getElementById('video-stream-source')

const connection = new signalR.HubConnectionBuilder()
    .withUrl('/stream')
    .build()

let mediaRecorder = null
connection.start().then(() => {
    const subject = new signalR.Subject()
    connection.send('SendVideoData', subject)

    async function handleDataAvailable(event) {
        const ab = await event.data.arrayBuffer()
        const bytes = new Uint8Array(ab)
        const ab64 = base64js.fromByteArray(bytes)

        if (ab64.length <= segmentLimit) {
            subject.next({ index: 0, part: ab64 })
        } else {
            for (let i = 0, ii = 0; i < ab64.length; i += segmentLimit, ii++) {
                subject.next({ index: ii, part: ab64.substr(i, segmentLimit) })
            }
        }
    }

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(function(stream) {
            videoSource.srcObject = stream
            videoSource.play()
            mediaRecorder = new MediaRecorder(stream, { mimeType: webm9MimeCodec })
            mediaRecorder.ondataavailable = handleDataAvailable
            mediaRecorder.start()
            setInterval(() => mediaRecorder.requestData(), 40)
        })
})