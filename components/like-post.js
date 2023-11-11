import { setLike, setDislike } from "../api.js";
import { POSTS_PAGE } from "../routes.js";
import { goToPage } from "../index.js";

export const initButtonLikeListeners = ({ token, posts }) => {
  const buttonsLikeElement = document.querySelectorAll(".like-button");

  for (const buttonLikeElement of buttonsLikeElement) {
    buttonLikeElement.addEventListener("click", (event) => {
      event.stopPropagation();

      if (!token) return;
      console.log('object');

      let index = buttonLikeElement.dataset.index;
      const post = posts[index];
      console.log(post.isLiked);
      const id = post.id;

      if (post.isLiked === true) {
        setDislike({ id, token }).then(() => {
          goToPage(POSTS_PAGE);
        });
      } else {
        setLike({ id, token }).then(() => {
          goToPage(POSTS_PAGE);
        });
      }
    });
  }
};
