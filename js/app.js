const clientId = "bykJW0a54YSJtu1poDL1xcXV5IAwFjoa-2ospv4YoV0";

document.addEventListener('DOMContentLoaded', generateLatestImages);
document.getElementById('search-form').addEventListener('submit', generateSearch);

// generates recent images on load;
function generateLatestImages(){
    let urlR= `https://api.unsplash.com/photos/random?client_id=${clientId}`; 
    let url = `https://api.unsplash.com/photos?page=1&per_page=30&client_id=${clientId}`;

    async function getRandomPhoto(urlR){
        const randomResponse = await fetch(urlR);
        const randomPhoto = await randomResponse.json();
        
        return{
            randomPhoto
        }
    }
    getRandomPhoto(urlR)        
        .then(randomPhoto =>{
            console.log(randomPhoto.randomPhoto)
            const randomDiv = document.getElementById('home-sliding');
            const randomBg = document.createElement('img');
            randomBg.classList.add('img-fluid', 'w-100');
            randomBg.src = `${randomPhoto.randomPhoto.urls.regular}`;
            randomBg.style.position = "center";
            randomDiv.appendChild(randomBg);

        })
        .catch(error => {
            console.log("Random :" + error)
        });

    async function getPhotos(url){
        const response = await fetch(url);
        const photos = await response.json();

        return{
            photos
        }
    }    
    getPhotos(url)
        .then(photos => {
            //console.log(photos.photos);
            photos.photos.forEach(photo =>{
                let photoList = `
                    <div id="search-images" class="col-lg-4 col-md-4 col-sm-6 ap">
                        <div class="h_gallery_item">
                            <img src="${photo.urls.regular}" style="max-height: 400px; width: 100%; position: center;">
                            <a class="light" href="${photo.links.download}"></a>
                            <div class="hover">
                                <a href="#"><h6 class="text-capitalize">${photo.alt_description}</h6></a>
                                <a class="light" href="${photo.urls.regular}" target="_blank"><i class="fa fa-expand"></i></a>
                            </div>
                        </div>
                    </div>                
                `;
                $('#photo-list').append(photoList);

            })
        })
        .catch(error => {
            console.log(error)
        });
}



function generateSearch(e){
    e.preventDefault();    
    const searchParameter = document.getElementById('search').value;

    let url = "https://api.unsplash.com/search/photos?per_page=30&client_id=" + clientId + "&query=" + searchParameter;

    // make fetch request
    async function getSearch(url){
        const response = await fetch(url);
        const images = await response.json();

        return{
            images
        }
    }
    
    getSearch(url)
    .then(images =>{
        console.log(images.images.results)
        images.images.results.forEach(image =>{
            let result= `
                    <div id="search-images" class="col-lg-3 col-md-4 col-sm-6 ap">
        				<div class="h_gallery_item">
                            <img src="${image.urls.small}" style="max-height: 300px; width: 100%; position: center;">
                            <a class="light" href="${image.links.download}"></a>
        					<div class="hover">
        						<a href="#"><h6 class="text-capitalize text-white">${image.alt_description}</h6></a>
                                <a class="light" href="${image.urls.regular}" target="_blank"><i class="fa fa-expand"></i></a>
        					</div>
        				</div>
                    </div>
                    
             `;
            $("#images").append(result);
        })
    })
    .catch(function(error){
        console.log(error)
    });

}

