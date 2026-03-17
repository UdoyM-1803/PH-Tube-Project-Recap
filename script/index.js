console.log("Index is connected")

function loadCategories() {
    //1. Fetch the Data........
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")

        //2. Convert promise to json
        .then(res => res.json())
        //3. Send data to displayCategories() function
        .then(data => displayCategories(data.categories));
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

loadCategories()