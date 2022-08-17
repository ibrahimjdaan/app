window.onload = (async ()=>{
    let container = document.getElementById('body');
    result = await fetch(`${server}/subscriptions/?token=${localStorage.token}&&id=${localStorage.id}`);
    result = await result.json();
    if (!result.tokenExpired) {
      container.innerHTML = "";
      if (result.rows.length > 0) {
        result.rows.forEach((item, i) => {
          playlist = addPlaylist(item.id, item.title, item.description, item.lastupdate, item.icon);
          container.innerHTML += playlist;
        });
      }else {
        container.innerHTML += `<span class="text-secondary text-center mt-5"> لا يوجد أشتراكات</span>`;
      }
    }
  });
  function addPlaylist(id, title, description, lastupdate, icon) {
    let playlist = `<div class="col-12 col-md-6 mt-5" role="button" id="1" onclick="goto('../../../playlist/?id=${id}')">`;
    playlist +=  '<div class="card mb-3">';
    playlist +=    '<div class="row g-0">';
    playlist +=      '<div class="col-6">';
    playlist +=        '<div class="card-body">';
    playlist +=          `<h5 class="card-title">${title}</h5>`;
    playlist +=          `<p class="card-text">${description}</p>`;
    playlist +=          `<p class="card-text"><small class="text-muted">آخر تحديث ${lastupdate} </small></p>`;
    playlist +=        '</div>';
    playlist +=      '</div>';
    playlist +=      '<div class="col-6">';
    playlist +=        `<img src="${server}/images/?id=${icon}" class="img-fluid rounded-end">`;
    playlist +=      '</div>';
    playlist +=    '</div>';
    playlist +=  '</div>';
    playlist +='</div>';
    return playlist;
  }
