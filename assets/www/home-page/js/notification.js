var up = 0;
async function updateNotification() {
  let container = document.getElementById('notfc-body');
  let btn = document.getElementById('not-btn');
  result = await fetch(`${server}/notifications/?token=${localStorage.token}&&id=${localStorage.id}&&up=${up}`);
  result = await result.json();
  if (!result.tokenExpired) {
    if (up != result.up) {
      if (result.rows.length > 0) {
        result.rows.forEach((item, i) => {
          notfc = addNotfc(item.id, item.img, item.body, item.date, item.href, item.seen);
          container.insertAdjacentHTML('afterBegin', notfc);
        });
        notfc = document.querySelectorAll('.not-read-notfc').length;
        if (notfc > 99) {
          notfc = '99+';
        }
        btn.innerHTML = `<span class="position-absolute  start-0 translate-middle badge rounded-pill bg-danger" style="top: 30%!important;">${notfc}</span>`;
      }
        up = result.up;
      }
    }
  }
async function getNotification() {
  let container = document.getElementById('notfc-body');
  let btn = document.getElementById('not-btn');
  container.innerHTML = "";
  result = await fetch(`${server}/notifications/?token=${localStorage.token}&&id=${localStorage.id}&&up=${up}`);
  result = await result.json();
  if (!result.tokenExpired) {
    if (result.rows.length > 0) {
      result.rows.forEach((item, i) => {
        notfc = addNotfc(item.id, item.img, item.body, item.date, item.href, item.seen);
        container.insertAdjacentHTML('afterBegin', notfc);
      });
      notfc = document.querySelectorAll('.not-read-notfc').length;
      if (notfc > 99) {
        notfc = '99+';
      }
      btn.innerHTML = `<span class="position-absolute start-0 translate-middle badge rounded-pill bg-danger" style="top: 30%!important;">${notfc}</span>`;
    }
    else {
      container.innerHTML = `<span class="text-secondary text-center mt-5"> لا يوجد إشعارات</span>`;
    }
    up = result.up;
    }
  }
function addNotfc(id, img, body, date, href, seen) {
  let notfc = "";
  let html = "";
  if (!seen) {
    notfc = "not-";
  }
  html += `<div class="w-100 border-bottom mt-2 p-2 ${notfc}read-notfc" onclick="goto('${href}')">`;
  html +=  '<div class="d-flex justify-content-between align-items-center">';
  html +=    `<img class="rounded-pill" src="${server}/images/?id=${img}" width="55" height="55" alt="">`;
  html +=    `<p class="mt-3 ms-2">${body}</p>`;
  html +=  '</div>';
  html +=  `<p class="card-text text-end"><small class="text-muted">${date}</small></p>`;
  html +='</div>';
  return html;
}
window.onload = ( async ()=>{
  await getNotification();
  setInterval(updateNotification, 300);
});
