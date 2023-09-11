

function getRandomNumber(min, max) {
    // Math.random() generates a random number between 0 (inclusive) and 1 (exclusive)
    // We multiply it by (max - min) to get a number between 0 (inclusive) and (max - min) (exclusive)
    // Then we add min to the result to get a number between min (inclusive) and max (exclusive)
    return Math.floor(Math.random() * (max - min)) + min;
}

function fetchAndDisplay(searchQuery) {
    fetch(`http://localhost:3000/pixabay?search=${encodeURIComponent(searchQuery)}`)
    .then((response) => response.json())
    .then((data) => {
        
        const imageGallery = document.getElementById('imageGallery');
        imageGallery.innerHTML = "";

        if (data.hits.length === 0) {
            const noHitsText = document.createElement('p');
            noHitsText.textContent = "No hits";
            notHitsText.classList.add("no-hits-text");
            imageGallery.append(noHitsText);
        }else {
            data.hits.forEach(hit => {

                // Create an image element for each image URL
                const linkElement = document.createElement('a');
                linkElement.href = hit.pageURL;
                linkElement.target = "_blank";

                const imgElement = document.createElement('img');
                imgElement.classList.add("gallery-image");
                imgElement.src = hit.webformatURL;
                imgElement.alt = hit.tags;

                linkElement.appendChild(imgElement);

                const imageGallery = document.getElementById('imageGallery')
    
                // Append the image to the gallery container
                imageGallery.appendChild(linkElement);
            });
        }
        
        // Handle the data from the backend (which is the data from Pixabay API)
    })
    .catch((error) => {
        console.error("Error fetching data from the backend:", error);
    });
}

document.getElementById('popupNav').addEventListener('click', function() {
    
})

document.getElementById('searchBtn').addEventListener('click', function () {

    const searchQuery = document.getElementById("searchInput").value;
    // This can be obtained from the user input
    console.log('search clicked');
    fetchAndDisplay(searchQuery);
});

document.addEventListener('keypress', function(event){
    if (event.key === 'Enter') {
        const searchQuery = document.getElementById('searchInput').value;
        console.log('search button key pressed!');
        fetchAndDisplay(searchQuery);
    }
})


document.getElementById('refreshBtn').addEventListener('click', function () {
    let random = getRandomNumber(0,4);
    console.log(random);
    let searches = ['coding python', 'coding javascript', 'coding website', 'hacking', 'computers', 'programming office', 'game design'];
    let searchInputText = document.getElementById("searchInput");
    searchInputText.placeholder = "";
    searchInputText.placeholder = searches[random];
    console.log(searches[random]);
    console.log('refresh clicked');
    fetchAndDisplay(searches[random]);
    //showImages(searches[random]);
});


