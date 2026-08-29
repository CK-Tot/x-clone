import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
const inputBox = document.getElementById('input-box');
const inputFile = document.getElementById('file-input');
const imgPreview = document.querySelector('.img-preview');
const tweetFeed = document.querySelector('.tweet-feed');
import { xData } from "../data/data.js";


// Get the img file and append it
 inputFile.addEventListener('change', imageUpload);

 function imageUpload()
 {
    const file = inputFile.files[0];

    const imgLink = URL.createObjectURL(file);

    imgPreview.innerHTML = `
        <img src="${imgLink}" alt="Uploaded img">
    `
 }



 /**
  * <div class="tweet-content">
                <div class="inner-container">
                    <div class="tweet-header">
                        <div class="img-container">
                        <img src="images/profile-pic.jpg" alt="user handle" class="feed-pic">
                    </div>
                    <div class="user-info">
                        <h3 class="user-name">CkThaEngineer<i class="fa-solid fa-circle-check"></i></h3>
                        <span class="user-handle">@ckthaengineer</span>
                    </div>
                    </div>
                    
                    <div class="tweet-txt-info">
                        <p class="tweet-text">Hello world 🌎 🙌🏾</p>
                    </div>

                    <div class="tweet-interactions">
                        <span class="tweet-comment">
                            <i class="fa-regular fa-comment"></i>
                            12
                        </span>
                        <span class="tweet-rewteet">
                           <i class="fa-solid fa-retweet"></i>
                            3
                        </span>
                        <span class="tweet-like">
                            <i class="fa-solid  fa-heart" ></i>
                            12
                        </span>
                    </div>
                    
                </div>
            </div>
  * 
  * 
  */



function render()
{
    tweetFeed.innerHTML = "";

    const feed = xData.map(tweet => {
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
                <div class="inner-container">
                    <div class="tweet-header">
                        <div class="img-container">
                        <img src="${tweet.profilePic}" alt="user handle" class="feed-pic">
                    </div>
                    <div class="user-info">
                        <h3 class="user-name">${tweet.userName}<i class="fa-solid fa-circle-check"></i></h3>
                        <span class="user-handle">${tweet.handle}</span>
                    </div>
                    </div>
                    
                    <div class="tweet-txt-info">
                        <p class="tweet-text">${tweet.tweetTxt}</p>
                        ${imgHtml}
                    </div>

                    <div class="tweet-interactions">
                        <span class="tweet-comment">
                            <i class="fa-regular fa-comment"></i>
                           ${tweet.replies.length}
                        </span>
                        <span class="tweet-rewteet">
                           <i class="fa-solid fa-retweet"></i>
                           ${tweet.retweets}
                        </span>
                        <span class="tweet-like">
                            <i class="fa-solid  fa-heart" ></i>
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