console.log("Index is Connected.");

function loadCategories() {
    //1. Fetch the Data........
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")

        //2. Convert promise to json
        .then(res => res.json())
        //3. Send data to displayCategories() function
        .then(data => displayCategories(data.categories));
}

function loadVideos() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then(response => response.json())
        .then(data => displayVideos(data.videos))
}

function displayCategories(categories) {
    // Get the Container
    const categoryContainer = document.getElementById("category-container");

    // Loop operation on Array of Object
    for (let cat of categories) {

        // Create Element
        const categoryDiv = document.createElement("div");

        categoryDiv.innerHTML = `
        <button class="btn btn-sm hover:bg-[rgb(255,31,61)] hover:text-white">${cat.category}</button>
        `;

        // Append the Element
        categoryContainer.append(categoryDiv)
    }
}


const displayVideos = (videos) => {
    const videoContainer = document.getElementById("video-container");

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
                        <img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt="">
                    </p>
                    <p class="text-sm text-gray-400">${video.others.views} Views</p>
                </div>
            </div>
        </div>
        `;
        videoContainer.append(videoCard);
    });


}

loadCategories()
loadVideos()