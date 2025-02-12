const url = new URL(location.href);
const movieId = url.searchParams.get("id");
const movietitle = url.searchParams.get("title");

const APILINK = "http://localhost:8000/api/v1/reviews";

const reviewsContainer = document.querySelector("#reviewsContainer");
const title = document.querySelector("#title");

title.innerHTML = movietitle;

returnRewiews(APILINK);

function returnRewiews(url) {
  fetch(url + "/movie/" + movieId)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let HTML = ``;
      data.forEach((review) => {
        HTML += `
        <div class="review" id="${review._id}">
            <p id="reviewUser"><strong>👤 User: </strong>${review.user}</p>
            <p id="reviewText"><strong>Review: </strong>${review.review}</p>
        </div>
      `;
      });
      reviewsContainer.innerHTML = HTML;
    });
}

