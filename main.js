/* API */
const topStoriesAPI = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";

/* MAIN FUNCTIONS */
function getListStories() {
  fetch(topStoriesAPI)
    .then((res) => res.json())
    .then((data) => {
      for (i = 0; i < 100; i++) {
        let storyID = data[i];
        let singleStoryAPI = `https://hacker-news.firebaseio.com/v0/item/${storyID}.json?print=pretty`;
        hitSingleStoryAPI(singleStoryAPI);
      }
    });
}

function hitSingleStoryAPI(API) {
  fetch(API)
    .then((res) => res.json())
    .then((data) => {
      const body = document.querySelector("#body");

      const parent = document.createElement("div");
      parent.className = "parent";

      const child = document.createElement("div");
      child.className = "child";

      parent.appendChild(child);
      body.appendChild(parent);

      const storyTitle = data.title;
      const storyURL = data.url;
      const storyScore = data.score;
      const storyAuthor = data.by;
      const storyComments = data.descendants;
      const displayInfo = `Story by: ${storyAuthor}  |  Score: ${storyScore}  |  Comments: ${storyComments}`;
      parent.innerHTML = `<a href=\"${storyURL}\" target=\"_blank\">${storyTitle}</a>`;
      parent.innerHTML += `<p style='color:black;'font-size50px';> ${displayInfo} </p>`;
    });
}

/* ON PAGE LOAD */
getListStories();
