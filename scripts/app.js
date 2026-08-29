import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
const inputBox = document.getElementById('input-box');
const inputFile = document.getElementById('file-input');
const imgPreview = document.querySelector('.img-preview');
const tweetFeed = document.querySelector('.tweet-feed');
import { xData } from "../data/data.js";


// Get the img file and append it
 inputFile.addEventListener('change', imageUpload);


//  Image Upload Function
 function imageUpload()
 {
    const file = inputFile.files[0];

    const imgLink = URL.createObjectURL(file);

    imgPreview.innerHTML = `
        <img src="${imgLink}" alt="Uploaded img">
    `
 }

// Render Function
function render()
{
    tweetFeed.innerHTML = "";

    const feed = xData.map(tweet => {
        let retweetColor = '';
        let likeColor = '';

        if (tweet.isRetweeted)
        {
            retweetColor = 'retweet'
        }

        if (tweet.isLiked)
        {
            likeColor = 'liked';
        }

        let imgHtml = ``;

        if (tweet.tweetImg)
        {
            imgHtml = `
                <img 
                    src="${tweet.tweetImg}" 
                    class="tweet-img" 
                    alt="tweet image"
                >
            `
        }


       return `
            <div class="tweet-content">
                <div class="inner-container" data-timeLineTweet="${tweet}">
                    <div class="tweet-header">
                        <div class="img-container">
                        <img src="${tweet.profilePic}" alt="user handle" class="feed-pic">
                    </div>
                    <div class="user-info">
                        <h3 class="user-name">${tweet.userName}</h3>
                        <span class="user-handle">${tweet.handle}</span>
                    </div>
                    </div>
                    
                    <div class="tweet-txt-info">
                        <p class="tweet-text">${tweet.tweetTxt}</p>
                        ${imgHtml}
                    </div>

                    <div class="tweet-interactions">
                        <span class="tweet-comment">
                            <i class="fa-regular fa-comment" data-reply="${tweet.uuid}"></i>
                           ${tweet.replies.length}
                        </span>
                        <span class="tweet-rewteet">
                           <i class="fa-solid ${retweetColor} fa-retweet"  data-retweet="${tweet.uuid}"></i>
                           ${tweet.retweets}
                        </span>
                        <span class="tweet-like">
                            <i class="fa-solid ${likeColor}  fa-heart" data-like="${tweet.uuid}"></i>
                            ${tweet.likes}
                        </span>
                    </div>
                    
                </div>
                <div class>
                <p>replise test</p>
                </div>
            </div>
        
        
        `
    }).join(" ");

    tweetFeed.innerHTML = feed;
}

render();

// Event Listener
document.addEventListener('click', (e) => {
    e.preventDefault();
    const liked = e.target.dataset.like;
    const retweeted = e.target.dataset.retweet;
    if (liked)
    {
        HandleLikeClicks(liked);
    }else if (retweeted)
    {
        HandleRetweetClicks(retweeted);
    }
});


// Handle like functionality.
function HandleLikeClicks(likeId)
{
    const matchedLike = xData.filter(tweet => tweet.uuid === likeId)[0];

    matchedLike.isLiked = !matchedLike.isLiked;

    if (matchedLike.isLiked)
    {
        matchedLike.likes++;
    } else {
        matchedLike.likes--;
    }
    render();

}

// Handle retweet Funcionality
function HandleRetweetClicks(retweetId)
{
    const matchedRetweet = xData.filter(tweet => tweet.uuid === retweetId)[0];

    matchedRetweet.isRetweeted = !matchedRetweet.isRetweeted;

    if (matchedRetweet.isRetweeted)
    {
        matchedRetweet.retweets++
    } else {
        matchedRetweet.retweets--
    }

    render();
}