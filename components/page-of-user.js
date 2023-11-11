import { user, getToken } from "../index.js";
import { getUsersPosts } from "../api.js";
import { renderPosts } from './posts-page-component.js';
import { renderHeaderComponent } from "./header-component.js";
import { initButtonLikeListeners } from "../components/like-post.js"


export function renderUserPage({ appEl, data }) {
    let token = getToken();
  
    getUsersPosts({ token, id: data.userId })
      .then((userData) => {
        return userData.posts;
      })
      .then((posts) => {
        renderHTML(posts, appEl, token);
      });
  
}

const renderHTML = (posts, appEl, token) => {

    const postsUser = renderPosts({ posts });

    const appHtml = `
    <div class="page-container">
        <div class="header-container"></div>
        <div class="posts-user-header">
            <img src="${user.imageUrl}" class="posts-user-header__user-image">
            <p class="posts-user-header__user-name">${user.name}</p>
        </div>
        <ul class="posts">${postsUser}</ul>
        <br>
        </div>
    </div>`;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
        element: document.querySelector(".header-container"),
      });

    initButtonLikeListeners({ token, posts });
};


