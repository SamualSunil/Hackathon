const VideoCardContainer = document.querySelector('.video-container')

let api = "AIzaSyCUMHorCoxjU5BM3AF6zMC6f1cU1SzrhwU";
let video = "https://www.googleapis.com/youtube/v3/videos?";
let channel = "https://www.googleapis.com/youtube/v3/channels?";

fetch(video + new URLSearchParams({
    key: api,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'IN'
}))
.then(res => res.json())
.then(data => {
    data.items.forEach(item => {
        getChannelIcon(item);
    })
})
.catch(err => console.log(err));
const getChannelIcon = (video_data) => {
    fetch(channel + new URLSearchParams({
        key: api,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
.then(res => res.json())
.then(data => {
    video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
    makeVideoCard(video_data);
    })
}

const makeVideoCard = (data =>{
    VideoCardContainer.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
    <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
    <div class="content">
        <img src="${data.channelThumbnail}" class="channel-icon" alt="">
        <div class="info">
            <h4 class="title">${data.snippet.title}</h4>
            <p class="channel-name">${data.snippet.channelTitle}</p>
        </div>
    </div>
    </div>`
})

const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
let searchLink = "https://www.youtube.com/results?search_query="

searchBtn.addEventListener('click', () => {
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;

    }
} )