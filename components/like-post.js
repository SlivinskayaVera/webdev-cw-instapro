import { setLike, setDislike } from "../api.js";
import { POSTS_PAGE, USER_POSTS_PAGE } from "../routes.js";
import { goToPage } from "../index.js";

export const initButtonLikeListeners = ({ token, posts, flagPosts }) => {
  const buttonsLikeElement = document.querySelectorAll(".like-button");

  for (const buttonLikeElement of buttonsLikeElement) {
    buttonLikeElement.addEventListener("click", (event) => {
      event.stopPropagation();

      if (!token) return;

      let index = buttonLikeElement.dataset.index;
      let data = buttonLikeElement.dataset.userId;

      const post = posts[index];
      const id = post.id;

      if (post.isLiked === true) {
        setDislike({ id, token }).then(() => {
          flagPosts
            ? goToPage(USER_POSTS_PAGE, {
                userId: data,
              })
            : goToPage(POSTS_PAGE);
        });
      } else {
        setLike({ id, token }).then(() => {
          flagPosts ? goToPage(USER_POSTS_PAGE, {
            userId: data,
          }) : goToPage(POSTS_PAGE);
        });
      }
    });
  }
};
