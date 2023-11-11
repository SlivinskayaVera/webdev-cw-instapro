import { user, getToken } from "../index.js";
import { getUsersPosts } from "../api.js";
import { renderPosts } from './posts-page-component.js'

export function renderUserPage({ appEl, user }) {
    let token = getToken();
  
    getUsersPosts({ token, id: user._id })
      .then((userData) => {
        return userData.posts;
      })
      .then((posts) => {
        renderHTML(posts, appEl);
      });
  
}

const renderHTML = (posts, appEl) => {

    const postsUser = renderPosts({ posts });

    const appHtml = `
    <div class="page-container">
    <div class="header-container">
        <div class="page-header">
            <h1 class="logo">instapro</h1>
            <button class="header-button add-or-login-button">
                <div title="Добавить пост" class="add-post-sign"></div>
            </button>
            <button title="vera123" class="header-button logout-button">Выйти</button>
        </div>
    </div>
    <div class="posts-user-header">
        <img src="${user.imageUrl}" class="posts-user-header__user-image">
        <p class="posts-user-header__user-name">${user.name}</p>
    </div>
    <ul class="posts">${postsUser}</ul>
    <br>
    </div>`;

  return appEl.innerHTML = appHtml;
};


