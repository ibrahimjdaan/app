var ids = []
window.onload = (async ()=>{
    let container = document.getElementById('body');
    result = await fetch(`${server}/home/?token=${localStorage.token}&&id=${localStorage.id}&&ids=${ids}`);
    result = await result.json();
    if (!result.tokenExpired) {
      container.innerHTML = "";
      if (result.rows.length > 0) {
        result.rows.forEach((item, i) => {
          postes = addPostes(item.id, item.userImg, item.userName, item.date, item.title, item.icon, item.video);
          container.innerHTML += postes;
        });
      }else {
        container.innerHTML = `<span class="text-secondary text-center mt-5"> لا يوجد احداث</span>`;
      }
    }
  });
  async function loadMore() {
    if (!document.querySelector('.spinner')) {
      let container = document.getElementById('body');
      let spinner = '<div class="spinner mt-2 d-flex justify-content-center">';
      spinner +=      '<div class="spinner-border" role="status"></div>';
      spinner +=    '</div>';
      container.innerHTML += await spinner;
      result = await fetch(`${server}/home/?token=${localStorage.token}&&id=${localStorage.id}${ids}`);
      result = await result.json();
      if (!result.tokenExpired) {
        if (result.rows.length > 0) {
          result.rows.forEach((item, i) => {
            postes = addPostes(item.id, item.userImg, item.userName, item.date, item.title, item.icon, item.video);
            container.innerHTML += postes;
          });
        }
        else {
          container.innerHTML = `<span class="text-secondary text-center mt-5"> لا يوجد احداث</span>`;
        }
      }
      document.querySelector('.spinner').remove();
    }
  }
  function addPostes(id, userImg, userName, date, title, icon, video) {
    ids.push(`&&ids[]=${id}`);
    let post ='';
    post += `<div class="col-12 mt-5">`;
    post +=   `<div class="d-flex justify-content-between w-100">`;
    post +=     '<div class="input-group">';
    post +=       `<img class="rounded-pill border p-1" width="60" height="60" src="${server}/images/?id=${userImg}" style="border-color:#2535ae !important;">`;
    post +=       `<h2 class="text-primary ms-3 mt-3">${userName}</h2>`;
    post +=     `</div>`;
    post +=     `<div class="w-25 mt-3 mb-0 pb-0">`;
    post +=       `<p class="card-text"><small class="text-muted">${date}</small></p>`;
    post +=     '</div>';
    post +=   `</div>`;
    post +=   '<div class="mt-4 mx-4">';
    post +=     `<p>${title}</p>`;
    post +=   '</div>';
    post +=   '<div class="ratio ratio-16x9">';
    post +=     `<video poster="${server}/images/?id=${icon}" controls>`;
    post +=       `<source src="${server}/videos/?id=${video}" type="video/mp4">`;
    post +=     `</video>`;
    post +=   `</div>`;
    post +=   `<button class="btn nerd-container w-100" onclick="goto('../../../video/index.html?id=${id}');>عرض</button>`;
    post += `</div>`;
    return post;
  }
  window.onscroll = function() {myFunction()};
  function myFunction() {
    if(document.body.getBoundingClientRect().bottom - window.innerHeight <= 0){
      loadMore();
    }
  }
  document.body.addEventListener('scroll', () => {
    let windowRelativeBottom = homeContainer.getBoundingClientRect().bottom;
    if (windowRelativeBottom > homeContainer.clientHeight + 100) {
    }
    if (myDiv.offsetHeight + myDiv.scrollTop >= myDiv.scrollHeight) {
      console.log('scrolled to bottom')
    }
  })
