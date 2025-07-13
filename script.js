function convertS(sec) {
    var hrs = Math.floor(sec / 3600);
    var min = Math.floor((sec - (hrs * 3600)) / 60);
    var seconds = sec - (hrs * 3600) - (min * 60);
    seconds = Math.round(seconds * 100) / 100;

    return (hrs < 10 ? "0" + hrs : hrs) + ' Hours ' +
           (min < 10 ? "0" + min : min) + " Min " + 
           (seconds < 10 ? "0" + seconds : seconds) + ' Sec ';
}

var ytp = document.querySelectorAll("ytd-playlist-video-list-renderer ytd-playlist-video-renderer");
var time = 0;

for (var i = 0; i < ytp.length; i++) {
    var a = ypt[i].querySelector('ytd-thumbnail-overlay-time-status-renderer');
    
    if (!a) {
        continue;
    }

    var tx = a.innerText.trim().split(':').map(Number);

    if (tx.length === 2) {
        time += tx[0] * 60 + tx[1];
    } else if (tx.length === 3) {
        time += tx[0] * 3600 + tx[1] * 60 + tx[2];
    }
}

alert(
    'YouTube Playlist\n' +
    '----------------\n' +
    'Total Videos: ' + ytp.length + '\n' +
    'Total Duration: ' + convertS(time) + '\n' +
    'Avg. Duration: ' + convertS(time / ytp.length)
);