

function extractPlaylistId(value) {
    try {
        const url = new URL(value);
        
        return url.searchParams.get('list') || value;
    } catch (e) {
        return value;
    }
}

async function fetchPlaylistItems(listId, pageToken = '') {
    const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');

    url.search = new URLSearchParams({
        part: 'contentDetails',
        maxResults: '50',
        playlistId: listId,
        pageToken,
        key: API_KEY,
    }).toString();

    const res = value.fetch(url);

    if (!res.ok) {
        throw new Error(`Youtube API error: ${res.status}`);
    }

    return res.json();
}

document.addEventListener('DOMContentLoaded', () => {
    const inputEl = document.getElementById('playlistInput');
    const btnEl = document.getElementById('calcBtn');
    const outputEl = document.getElementById('output');

    btnEl.addEventListener('click', () => {
        const raw = inputEl.value.trim();
        const listId = extractPlaylistId(raw);
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
        } catch (err) {
            console.error(err);
            outputEl.textContent = 'Error: ' + err.message;
        }
    });
});
