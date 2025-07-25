function extractPlaylistId(value) {
    try {
        const url = new URL(value);
        
        return url.searchParams.get('list') || value;
    } catch (e) {
        return value;
    }
}

async function fetchPlaylistItems(listId, pageToken = '') {
    console.log('fetchPlaylistItems:', { listId, pageToken });

    const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');

    url.search = new URLSearchParams({
        part: 'contentDetails',
        maxResults: '50',
        playlistId: listId,
        pageToken,
        key: API_KEY,
    }).toString();

    console.log('Request URL:', url.toString());

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Youtube API error: ${res.status}`);
    }

    return res.json();
}

function parseISO8601Duration(iso) {
    const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

    if (!match) {
        return 0;
    }

    const hours   = parseInt(match[1] || 0, 10);
    const minutes = parseInt(match[2] || 0, 10);
    const seconds = parseInt(match[3] || 0, 10);
    return hours * 3600 + minutes * 60 + seconds;
}

async function fetchVideoDurations(videoIds) {
    const url = new URL('https://www.googleapis.com/youtube/v3/videos');

    url.search = new URLSearchParams({
        part: 'contentDetails',
        id: videoIds.join(','),
        key: API_KEY,
    }).toString();

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`YouTube API error: ${res.status}`);
    }

    const data = await res.json();
    return data.items.map(item => item.contentDetails.duration);
}

document.addEventListener('DOMContentLoaded', () => {
    const inputEl = document.getElementById('playlistInput');
    const btnEl = document.getElementById('calcBtn');
    const outputEl = document.getElementById('output');

    btnEl.addEventListener('click', async () => {
        const raw = inputEl.value.trim();
        const listId = extractPlaylistId(raw);

        console.log('Extracted listId:', listId);


        outputEl.textContent = 'Fetching Playlist..';

        try {
            let allVideoIds = [];
            let nextPage = '';

            do {
                const { items, nextPageToken } = await fetchPlaylistItems(listId, nextPage);
                const ids = items.map(i => i.contentDetails.videoId);

                allVideoIds = allVideoIds.concat(ids);
                nextPage = nextPageToken || '';
            } while (nextPage);

            let totalSeconds = 0;

            for (let i = 0; i < allVideoIds.length; i += 50) {
                const batch = allVideoIds.slice(i, i + 50);
                const duration = await fetchVideoDurations(batch);

                duration.forEach(iso => {
                    totalSeconds += parseISO8601Duration(iso);
                });
            }

            const hours = Math.floor(totalSeconds / 3600);
            const mins = Math.floor((totalSeconds % 3600) / 60);
            const secs = totalSeconds % 60;

            const formatted = 
                (hours > 0 ? hours + ':' : '') +
                String(mins).padStart(hours > 0 ? 2 : 1, '0') + ':' +
                String(secs).padStart(2, '0');

            outputEl.style.display = "block";
            outputEl.textContent =
                `Playlist has ${allVideoIds.length} videos — total duration: ${formatted}`;
            console.log(`Total duration: ${formatted}`);
        } catch (err) {
            console.error(err);

            outputEl.textContent = 'Error: ' + err.message;
        }
    });
});
