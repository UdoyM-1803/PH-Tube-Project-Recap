console.log("Index is Connected.");

const showLoader = () => {
    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("video-container").classList.add("hidden");
}

const hideLoader = () => {
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("video-container").classList.remove("hidden");
}

function removeActiveClass() {
    const activeButtons = document.getElementsByClassName("active");

    // Created a loop to remove active class from others button except the buttons clicked. 
    for (let btn of activeButtons) {
        btn.classList.remove("active");
    }
}

function loadCategories() {
    //1. Fetch the Data........
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")

        //2. Convert promise to json
        .then(res => res.json())
        //3. Send data to displayCategories() function
        .then(data => displayCategories(data.categories));
}

// For searching videos we just added the searchText to the link and if there is no searchText (i mean empty string) then it will show all the videos. It is also works for "All" button.
function loadVideos(searchText = "") {
    showLoader();
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(response => response.json())
        .then(data => {

            // When All button will be clicked then active class will be removed from others button but active class will be added to All button. 
            removeActiveClass();
            document.getElementById("btn-all").classList.add("active");
            displayVideos(data.videos)
        })
}

const loadCategoryVideos = (id) => {
    showLoader();
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActiveClass();

            const clickedButton = document.getElementById(`btn-${id}`);

            // Active class added to the Categories so that we can understood that which category we have in.
            clickedButton.classList.add("active");
            console.log(clickedButton);
            displayVideos(data.category);
        })
}

const loadVideoDetails = (videoID) => {
    console.log(videoID);
    // Load Video Details when "Show Details" button is clicked.
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoID}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayVideoDetails(data.video));
}

const displayVideoDetails = (videoDetails) => {
    console.log(videoDetails);
    document.getElementById("video_details").showModal();

    // Showing details to modals...
    const detailsContainer = document.getElementById("details-container");

    detailsContainer.innerHTML = `
    <div class="card bg-base-100 image-full shadow-sm">
        <figure>
            <img src="${videoDetails.thumbnail}"
                alt="Shoes" />
        </figure>
        <div class="card-body">
            <h2 class="card-title text-yellow-300 font-serif">${videoDetails.title}</h2>
            <p class="text-amber-300">${videoDetails.description}</p>
            <h2 class="text-stone-300 font-medium text-right">Written by ${videoDetails.authors[0].profile_name}</h2>
        </div>
    </div>
    `
}

function displayCategories(categories) {
    // Get the Container
    const categoryContainer = document.getElementById("category-container");

    // Loop operation on Array of Object
    for (let cat of categories) {

        // Create Element
        const categoryDiv = document.createElement("div");

        categoryDiv.innerHTML = `
        <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[rgb(255,31,61)] hover:text-white">${cat.category}</button>
        `;

        // Append the Element
        categoryContainer.append(categoryDiv)
    }
}

const displayVideos = (videos) => {
    const videoContainer = document.getElementById("video-container");

    videoContainer.innerHTML = "";

    // If there is no content in specific category, then show it....
    if (videos.length == 0) {
        videoContainer.innerHTML = `
            <div class="col-span-full flex flex-col text-center justify-center items-center py-20">
                <img class="w-[120px]" src="Resources/Icon.png" alt="">
                <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
            </div>
        `;
        hideLoader();
        return;
    }

    videos.forEach(video => {
        const videoCard = document.createElement("div");

        videoCard.innerHTML = `
        <div class="card bg-base-100">
            <figure class="relative">
                <img class="w-full h-[180px] " src="${video.thumbnail}" alt="Shoes" />
                <span class="absolute bottom-2 right-2 rounded text-white bg-black px-2">3hrs 56 min ago</span>
            </figure>
            <div class="flex gap-3 px-0 py-5">
                <div class="profile">
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
                            <img src="${video.authors[0].profile_picture}" />
                        </div>
                    </div>
                </div>
                <div class="intro">
                    <h2 class="text-sm font-semibold">${video.title}</h2>
                    <p class="text-sm text-gray-400 flex gap-1">
                        ${video.authors[0].profile_name}
                        ${video.authors[0].verified == true ?  `<img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt="">`: ``}
                    </p>
                    <p class="text-sm text-gray-400">${video.others.views} Views</p>
                </div>
            </div>
            <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block">Show Details</button>
        </div>
        `;
        videoContainer.append(videoCard);
    });
    hideLoader();
}

document.getElementById('search-input').addEventListener("keyup", (e) => {
    const input = e.target.value;
    loadVideos(input)
})

loadCategories()