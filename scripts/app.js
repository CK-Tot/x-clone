
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import { xData } from "../data/data.js";


/* =========================
   DOM ELEMENTS
========================= */

const inputBox = document.getElementById('input-box');
const inputFile = document.getElementById('file-input');
const imgPreview = document.querySelector('.img-preview');
const tweetFeed = document.querySelector('.tweet-feed');

/* =========================
   IMAGE UPLOAD
========================= */

// Get the image file and append it
inputFile.addEventListener('change', imageUpload);


/* =========================
   EVENT LISTENERS
========================= */

document.addEventListener('click', (e) => {
    const liked = e.target.dataset.like;
    const retweeted = e.target.dataset.retweet;
    
    if (liked) {
        HandleLikeClicks(liked);

    } else if (retweeted) {
        HandleRetweetClicks(retweeted);
    }else if (e.target.id === 'post')
    {
        HandleTweets()
    }
});


// Image Upload Function
function imageUpload()
{
    const file = inputFile.files[0];
    const imgLink = URL.createObjectURL(file);

    if(!file) return;

    imgPreview.innerHTML = `
        <img src="${imgLink}">
    `;
    return imgLink;
}


/* =========================
   RENDER FUNCTION
========================= */

function render() {
    tweetFeed.innerHTML = "";

    const feed = xData.map(tweet => {
        let retweetColor = '';
        let likeColor = '';

        let replyHtml = '';

       if (tweet.replies.length > 0)
       {
            tweet.replies.forEach(reply => {
                replyHtml += `
                
                
                `
            })
       }

        // Retweet color
        if (tweet.isRetweeted) {
            retweetColor = 'retweet';
        }


        // Like color
        if (tweet.isLiked) {
            likeColor = 'liked';
        }


        // Tweet image
        let imgHtml = ``;

        if (tweet.tweetImg) {
            imgHtml = `
                <img 
                    src="${tweet.tweetImg}" 
                    class="tweet-img" 
                    alt="tweet image"
                >
            `;
        }


        return `
            <div class="tweet-content">

                <div 
                    class="inner-container" 
                    data-timeLineTweet="${tweet.uuid}"
                >

                    <div class="tweet-header">

                        <div class="img-container">
                            <img 
                                src="${tweet.profilePic}" 
                                alt="user handle" 
                                class="feed-pic"
                            >
                        </div>

                        <div class="user-info">
                            <h3 class="user-name">${tweet.userName}</h3>
                            <span class="user-handle">${tweet.handle}</span>
                        </div>

                    </div>


                    <div class="tweet-txt-info">
                        <p class="tweet-text">${tweet.tweetTxt}</p>
                        ${tweet.tweetImg ? imgHtml : ''}
                    </div>


                    <div class="tweet-interactions">

                        <span class="tweet-comment">
                            <i 
                                class="fa-regular fa-comment" 
                                data-reply="${tweet.uuid}"
                            ></i>
                            ${tweet.replies.length}
                        </span>

                        <span class="tweet-rewteet ${retweetColor}">
                            <i 
                                class="fa-solid fa-retweet"  
                                data-retweet="${tweet.uuid}"
                            ></i>
                            ${tweet.retweets}
                        </span>

                        <span class="tweet-like ${likeColor}">
                            <i 
                                class="fa-solid fa-heart" 
                                data-like="${tweet.uuid}"
                            ></i>
                            ${tweet.likes}
                        </span>

                    </div>

                </div>


                <!-- Reply Container -->
                <div 
                    class="hidden replies-container" 
                    id="replies-${tweet.uuid}"
                >

                    ${replyHtml}
                    
                </div>

            </div>
        `;
    }).join(" ");

    tweetFeed.innerHTML = feed;
}


render();




/* =========================
   LIKE FUNCTIONALITY
========================= */

function HandleLikeClicks(likeId) {
    const matchedLike = xData.filter(
        tweet => tweet.uuid === likeId
    )[0];


    matchedLike.isLiked = !matchedLike.isLiked;


    if (matchedLike.isLiked) {
        matchedLike.likes++;

    } else {
        matchedLike.likes--;
    }


    render();
}


/* =========================
   Tweet FUNCTIONALITY
========================= */


function HandleTweets()
{
    const input = inputBox.value;
    const file = inputFile.files[0];
    let img = ''

    if (input.trim() === '' && !file) return;

    if (file)
    {
        img = URL.createObjectURL(file)
    }


    xData.unshift({
        handle: '@ckthaengineer',
        userName: 'CK Tot',
        profilePic: 'images/profile-pic.jpg',
        likes: 0,
        retweets: 0,
        tweetTxt: input,
        tweetImg: img,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: uuidv4()
    });
    render();
    inputBox.value = '';
    imgPreview.innerHTML = '';
    inputFile.value = ''

}

/* =========================
   RETWEET FUNCTIONALITY
========================= */

function HandleRetweetClicks(retweetId) {
    const matchedRetweet = xData.filter(
        tweet => tweet.uuid === retweetId
    )[0];


    matchedRetweet.isRetweeted = !matchedRetweet.isRetweeted;


    if (matchedRetweet.isRetweeted) {
        matchedRetweet.retweets++;

    } else {
        matchedRetweet.retweets--;
    }


    render();
}

/**
 * 
 * 
                    <!-- Reply Input -->
                    <div class="input-container">

                        <div class="input-content">

                            <div class="img-container">
                                <img 
                                    src="images/profile-pic.jpg" 
                                    alt="Profile picture" 
                                    class="profile-pic"
                                >
                            </div>


                            <div class="tweet-image-box">

                                <textarea 
                                    name="input-box" 
                                    class="reply-input" 
                                    id="reply-input-${reply.uuid}" 
                                    placeholder="Post your reply"
                                ></textarea>

                                <div class="img-preview"></div>

                            </div>

                        </div>


                        <!-- Reply Icons and Button -->
                        <div class="input-icons">

                            <div class="icons">

                                <input 
                                    type="file" 
                                    class="reply-file-input" 
                                    id="reply-file-input-${reply.uuid}" 
                                    accept="image/*"
                                >

                                <label for="reply-file-input-${reply.uuid}">
                                    <i class="fa-regular fa-images"></i>
                                </label>

                                <a href="#" class="emoji-icons">
                                    <i class="fa-regular fa-face-smile"></i>
                                </a>

                                <a href="#">
                                    <i class="fa-solid fa-location-dot"></i>
                                </a>

                                <a href="#">
                                    <i class="fa-solid fa-flag"></i>
                                </a>

                            </div>


                            <div class="btn-container">
                                <button 
                                    class="post-btn" 
                                    id="reply-btn-${reply.uuid}"
                                >
                                    Reply
                                </button>
                            </div>

                        </div>

                    </div>


                    <!-- Test Reply -->
                    <div class="tweet-reply">

                        <div class="reply-inner">

                            <div class="reply-header">
                                <img 
                                    class="profile-pic" 
                                    src="${reply.profilePic}"
                                >
                            </div>

                            <div class="user-info">
                                <h3 class="user-name">${reply.userName}</h3>
                                <span class="handle">${reply.handle}</span>
                            </div>

                        </div>

                        <p>${reply.replyTxt}</p>

                    </div>


                    <!-- Reply Interactions -->
                    <div class="tweet-interactions">

                        <span class="tweet-comment">
                            <i 
                                class="fa-regular fa-comment" 
                                data-reply-threads="${reply.uuid}"
                            ></i>
                            ${reply.replies.length}
                        </span>

                        <span class="tweet-rewteet ${retweetColor}">
                            <i 
                                class="fa-solid fa-retweet"  
                                data-retweet-reply="${reply.uuid}"
                            ></i>
                            ${reply.retweets}
                        </span>

                        <span class="tweet-like ${likeColor}">
                            <i 
                                class="fa-solid fa-heart" 
                                data-like-reply="${reply.uuid}"
                            ></i>
                            ${reply.likes}
                        </span>

                    </div>
 * 
 * 
 * 
 */