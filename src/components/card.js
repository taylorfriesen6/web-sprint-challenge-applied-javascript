import axios from "axios";

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //

  const card = document.createElement('div');
  card.classList.add('card');

  const headline = document.createElement('div');
  headline.classList.add('headline');
  headline.textContent = article.headline;
  card.append(headline);

  const author = document.createElement('div');
  author.classList.add('author');
  card.append(author);

  const imgContainer = document.createElement('div');
  imgContainer.classList.add('img-container');
  author.append(imgContainer);

  const authorImage = document.createElement('img');
  authorImage.setAttribute('src', article.authorPhoto);
  imgContainer.append(authorImage);

  const authorName = document.createElement('span');
  authorName.textContent = article.authorName;
  author.append(authorName);

  card.addEventListener('click', _ => console.log(article.headline));

  return card;
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `https://lambda-times-api.herokuapp.com/articles`
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  axios.get('https://lambda-times-api.herokuapp.com/articles').then(res => {
    const target = document.querySelector(selector);
    for (const topic in res.data.articles) {
      res.data.articles[topic].forEach(article => {
        target.append(Card(article));
      });
    }
  });

}

export { Card, cardAppender }
