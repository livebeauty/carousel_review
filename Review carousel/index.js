document.addEventListener("DOMContentLoaded", function(){

    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentIndex = 0;
    const apiUrl = `https://randomuser.me/api/`;

    async function fetchReview() {
        try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const reviewBox = data.results.map((user) =>({
          name:`${user.name.title} ${user.name.first} ${user.name.last}`,
          profile: `${user.picture.large}`,
          review: `${user.name.first} ${user.name.last} did a great job on this project. I'm really impressed!`,
        }))
         displayReviews(reviewBox)
        } catch (error) {
           console.log('Error fetching reviews:',error); 
        }
    }

    function displayReviews(review) {
        const carouselInner = document.getElementById("carousel-inner")
        carouselInner.innerHTML = ``

        review.forEach((data) => {
            const reviewCard = document.createElement('div');
            reviewCard.classList.add('review-card');

            reviewCard.innerHTML =
        `<img src="${data.profile}" alt="${data.name}">
          <h3>${data.name}</h3>
          <p>${data.review}</p>
      `;
      carouselInner.appendChild(reviewCard);

        });
    }

    function nextReview() {
        currentIndex = (currentIndex + 1) 
        fetchReview();
      }
     
      function prevReview() {
        currentIndex = (currentIndex - 1 )
        fetchReview();
      }
      
      prevBtn.addEventListener('click', prevReview);
      nextBtn.addEventListener('click', nextReview);

    fetchReview()
  
})