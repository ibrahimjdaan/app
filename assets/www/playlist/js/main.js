var playlist = 3;
var comments = [];
var videos = 0;
var spinner = '<div class="spinner mt-2 d-flex justify-content-center"> <div class="spinner-border" role="status"></div></div>';
var params = new URLSearchParams(window.location.search);
if (params.has('id')) {
    if (params.get('id') != '') {
      playlist = params.get('id');
    }
}
async function getPlaylistInfo() {
  let container = document.getElementById('playlist-body');
  result = await fetch(`${server}/playlist/?token=${localStorage.token}&&id=${localStorage.id}&&playlist=${playlist}`);
  result = await result.json();
  console.log(`${server}/playlist/?token=${localStorage.token}&&id=${localStorage.id}&&playlist=${playlist}`);
  if (result.success) {
    if (!result.tokenExpired) {
      addInfo(result.id, result.title, result.nerd, result.description, result.icon, result.course, result.date, result.doctor, result.name, result.uid, result.userImg, result.raters, result.rating, result.stars1, result.stars2, result.stars3, result.stars4, result.stars5, result.subscripers , result.subscriped, result.price, result.rated);
    }
  }else {
    container.innerHTML = `<span class="text-secondary text-center mt-5"> القائمة غير موجودة</span>`;
  }
}
function addInfo(id, title, nerd, description, icon, course, date, doctor, name, uid, userImg, raters, rating, stars1, stars2, stars3, stars4, stars5, subscripers, subscriped, price, rated) {
  let container = document.getElementById('playlist-info');
  let body = stars = "";
  for (i=1; i <= 5; i++){
    if (rating >= i){
      svg =  'bi-star-fill';
    }
    else if (rating > -1 + i){
      svg =  'bi-star-half';
    }
    else{
      svg =  'bi-star';
    }
    stars += `<i class="bi fs-3 text-warning ${svg}"></i>`;
  }
  //body += `<img class="w-100 h-100" src="${server}/images/?id=${icon}">`;
  body += `<h1 class="text-center mt-5">${title}</h1>`;
  body += '<div class="border-bottom">';
  body +=   `<p>${description}</p>`;
  body += '</div>';
  body += `<div class="d-flex justify-content-between mt-5">`;
  if (subscriped){
    body +=   `<button class="btn btn-nerd"> مشترك ✔</button>`;
  }else {
    body +=   '<button class="btn nerd-container" data-bs-toggle="modal" data-bs-target="#modal"> <i class="bi bi-bookmark-plus fs-5"></i>  حجز مقعد</button>';
  }
  body += `<span class="p-2"><b>${subscripers}</b></span>`;
  body += '</div>';
  body += `<div class="d-flex justify-content-between mt-4 mb-5">`;
  if (subscriped){
    if (!rated){
      rateModal();
      body += '<button class="btn btn-outline-success border-0" data-bs-toggle="modal" data-bs-target="#modal"><i class="bi fs-3 bi-plus"></i>تقييم</button>';
    }else {
      body += '<button class="btn btn-success border">تم التقييم</button>';
    }
  }else {
    subModal(price);
  }
  body += '<div class="rating">';
  body +=   '<div dir="ltr">';
  body +=     `<span class="dropdown-toggle" id="rate" role="button" data-bs-toggle="dropdown" aria-expanded="false" dir="rtl"> ${raters} تقيمات </span>`;
  body +=     '<div class="dropdown-menu w-100" aria-labelledby="rate">';
  body +=       '<div class="dropdown-item h-100">';
  body +=         '<div class="w-100 d-flex justify-content-between">';
  body +=           '<span>خمس نجوم</span>';
  body +=           `<span>${stars5}</span>`;
  body +=         '</div>';
  body +=         '<div class="progress mt-3">';
  body +=           `<div class="progress-bar progress-bar-striped bg-success" role="progressbar" style="width: ${((stars5 / raters) * 100)}%" aria-valuenow="${((stars5 / raters) * 100)}" aria-valuemin="0" aria-valuemax="100"></div>`;
  body +=         '</div>';
  body +=         '<div class="w-100 d-flex justify-content-between">';
  body +=           '<span>أربع نجوم</span>';
  body +=           `<span>${stars4}</span>`;
  body +=         '</div>';
  body +=         '<div class="progress mt-3">';
  body +=           `<div class="progress-bar progress-bar-striped" role="progressbar" style="width: ${((stars4 / raters) * 100)}%" aria-valuenow="${((stars4 / raters) * 100)}" aria-valuemin="0" aria-valuemax="100"></div>`;
  body +=         '</div>';
  body +=         '<div class="w-100 d-flex justify-content-between">';
  body +=           '<span>ثلاث نجوم</span>';
  body +=           `<span>${stars3}'</span>`;
  body +=         '</div>';
  body +=         '<div class="progress mt-3">';
  body +=           `<div class="progress-bar progress-bar-striped bg-info" role="progressbar" style="width: ${((stars3 / raters) * 100)}%" aria-valuenow="${((stars3 / raters) * 100)}" aria-valuemin="0" aria-valuemax="100"></div>`;
  body +=         '</div>';
  body +=         '<div class="w-100 d-flex justify-content-between">';
  body +=           '<span>نجماتان</span>';
  body +=           `<span>${stars2}</span>`;
  body +=         '</div>';
  body +=         '<div class="progress mt-3">';
  body +=             `<div class="progress-bar progress-bar-striped bg-warning" role="progressbar" style="width: ${((stars2 / raters) * 100)}%" aria-valuenow="${((stars2 / raters) * 100)}" aria-valuemin="0" aria-valuemax="100"></div>`;
  body +=         '</div>';
  body +=         '<div class="w-100 d-flex justify-content-between">';
  body +=           '<span>نجمة</span>';
  body +=           `<span>${stars1}</span>`;
  body +=         '</div>';
  body +=         '<div class="progress mt-3">';
  body +=           `<div class="progress-bar progress-bar-striped bg-danger" role="progressbar" style="width: ${((stars1 / raters) * 100)}%" aria-valuenow="${((stars1 / raters) * 100)}" aria-valuemin="0" aria-valuemax="100"></div>`;
  body +=         '</div>';
  body +=       '</div>';
  body +=     '</div>';
  body +=     '<div class=" d-inline stars">';
  body +=        stars;
  body +=     '</div>';
  body +=   '</div>';
  body += '</div>';
  body += '</div>';
  body += `<div class="mt-2 align-items-center p-2 border bg-light d-flex justify-content-between" role="button" onclick="location = '../profile?id=${uid}'">`;
  body +=   `<img class="rounded-pill" width="60" height="60" src="${server}/images/?id=${userImg}">`;
  body +=   `<h3 class="text-primary"> ${name} </h3>`;
  body += '</div>';
  container.innerHTML = body;
}
async function getPlaylistVideos() {
  let container = document.getElementById('playlist-videos');
  let loadBtn = `<div class="w-100 d-flex justify-content-center" id="load-videos"><button class="btn nerd-container" onclick="getPlaylistVideos();">تحميل المزيد</button></div>`;
  if (document.querySelector('#load-videos')) {
    document.querySelector('#load-videos').remove();
  }
  container.innerHTML += spinner;
  result = await fetch(`${server}/playlist-videos/?token=${localStorage.token}&&id=${localStorage.id}&&playlist=${playlist}&&loaded=${videos}`);
  result = await result.json();
  if (!result.tokenExpired) {
    container.querySelector('.spinner').remove()
    if (result.rows.length > 0) {
      result.rows.forEach((item, i) => {
        video = addVideos(item.id, item.title, item.description, item.image, item.date, item.watched, item.length);
        container.innerHTML += video;
      });
      if (result.rows.length > 9) {
        container.innerHTML += loadBtn;
      }
    }else {
      if (videos = 0) {
        container.innerHTML += `<span class="text-secondary text-center mt-5"> لا يوجد مقاطع</span>`;
      }
    }
  }
}
 function addVideos(id, title, description, image, date, watched, length) {
   videos = id;
   let body = "";
   let watchedPercentage = (watched / length) * 100;
   body +=`<div class="col-xs-12 col-md-6">`;
   body +=`  <div class="card mt-4 border-0" role="button" onclick="location='../video?id=${id}'">`;
   body +=`    <div class="d-flex justify-content-between p-3">`;
   body +=`      <div class="w-50">`;
   body +=`        <div class="card-body">`;
   body +=`          <h6 class="card-title">${title}</h6>`;
   body +=`          <p class="card-text"><small class="text-muted">${date}</small></p>`;
   body +=`        </div>`;
   body +=`      </div>`;
   body +=`      <div class="position-relative;" dir="ltr">`;
   body +=`        <img src="${server}/images/?id=${image}" width="200" height="100" class="w-100">`;
   if (watchedPercentage) {
     body +=`        <div class="progress rounded-0" style="height:5px; width:100%;">`;
     body +=`          <div class="progress-bar bg-nerd rounded-0" role="progressbar" style="width: 50%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>`;
     body +=`        </div>`;
   }
   body +=`        <div class="bg-dark position-absolute fs-7 text-light top-50 ms-3" style="">${length}</div>`;
   body +=`      </div>`;
   body +=`    </div>`;
   body +=`  </div>`;
   body +=`</div>`;
   return body;
 }
 async function getPlaylistComments() {
   let container = document.getElementById('playlist-comments');
   let loadBtn = `<div class="w-100 d-flex justify-content-center" id="load-comments"><button class="btn nerd-container" onclick="getPlaylistComments();">تحميل المزيد</button></div>`;
   if (document.querySelector('#load-comments')) {
     document.querySelector('#load-comments').remove();
   }
   container.innerHTML += spinner;
   result = await fetch(`${server}/playlist-comments/?token=${localStorage.token}&&id=${localStorage.id}&&playlist=${playlist}&&loaded=${comments}`);
   result = await result.json();
   if (!result.tokenExpired) {
     container.querySelector('.spinner').remove()
     if (result.rows.length > 0) {
       result.rows.forEach((item, i) => {
         comment = addComments(item.id, item.userImg, item.userName, item.rating, item.date, item.review);
         container.innerHTML += comment;
       });
       if (result.rows.length > 9) {
         container.innerHTML += loadBtn;
       }
     }else {
       if (comments.length = 0) {
         container.innerHTML += `<span class="text-secondary text-center mt-5"> لا يوجد تعليقات</span>`;
       }
     }
   }
 }
 function addComments(id, userImg, userName, rating, date, review) {
   comments.push(`&&loaded[]=${id}`);
   let body = stars = "";
   for (i=1; i <= 5; i++){
     if (rating >= i){
       svg =  'bi-star-fill';
     }
     else if (rating > -1 + i){
       svg =  'bi-star-half';
     }
     else{
       svg =  'bi-star';
     }
     stars += `<i class="bi fs-3 text-warning ${svg}"></i>`;
   }
     body +=`<div class="d-flex border-boto">`;
     body +=   `<div class="flex-shrink-0">`;
     body +=`     <img src="${server}/images/?id=${userImg}" width="45" height="45">`;
     body +=`   </div>`;
     body +=`   <div class="flex-grow-1 ms-3 border-bottom border-2 p-1">`;
     body += `    <h3> <a class="link-primary nav-link">${userName}</a> </h3>`;
     body +='     <div class="d-inline stars" dir="ltr">';
     body +=       stars;
     body +=`     </div>`;
     body +=`     <p class="card-text">${review}</p>`;
     body +=`     <p class="card-text"><small class="text-muted">${date}</small></p>`;
     body +=`   </div>`;
     body += `</div>`;
     body += '</div>';
   return body;
 }
 function rateModal() {
   let modal = document.getElementById('modal');
   let modalTilte = document.getElementById('modalLabel');
   let modalBody = document.querySelector('.modal-body');
   let modalFooter = document.querySelector('.modal-footer');
   modalTilte.innerHTML = "تقييم الدورة";
   body = "";
   body += '<strong>تقييم</strong>';
   body += '<div dir="rtl">';
   body += '   <label class="rating-label">';
   body += '     <input class="rating" id="rating" min="1" max="5" oninput="this.style.setProperty(\'--value\', this.value)" step="1" type="range" value="1" >';
   body += '  </label>';
   body += '</div>';
   body += '<div class="mt-2">';
   body += '  <strong>التعليق</strong>';
   body += '  <textarea class="form-control mt-1" id="review" required></textarea>';
   body += '</div>';
   modalBody.innerHTML = body;
   modalFooter.innerHTML = '<button class="btn btn-success" onclick="this.disabled=true;rate();">تقييم</button>';
 }
 function subModal(price) {
   let modal = document.getElementById('modal');
   let modalTilte = document.getElementById('modalLabel');
   let modalBody = document.querySelector('.modal-body');
   let modalFooter = document.querySelector('.modal-footer');
   modalTilte.innerHTML = "اشتراك في الدوره";
    body = '<h6 class="text-danger text-center"></h6>';
   body = '<h3 class="text-success text-center">هل تود المتابعة ؟</h3>';
   body += `<p class="display-6 text-center">سوف يتم خصم مبلغ وقدره <span class="text-success">${price}</span> دنانير  مقابل اشتراكك في الدورة  </p>`;
   modalBody.innerHTML = body;
   modalFooter.innerHTML = '<button class="btn btn-primary" onclick="this.disabled=true;subscripe();">اشتراك</button>';
 }
 async function subscripe() {
   let modalBody = document.querySelector('.modal-body');
   result = await fetch(`${server}/subscripe-playlist/?token=${localStorage.token}&&id=${localStorage.id}&&playlist=${playlist}`);
   console.log(`${server}/subscripe-playlist/?token=${localStorage.token}&&id=${localStorage.id}&&playlist=${playlist}`);
   result = await result.json();
   if (!result.tokenExpired) {
     if (result.success) {
       window.location.reload()
     }else {
       modalBody.innerHTML += '<div class="alert alert-danger"> ليس لديك رصيد كافي <a class="alert-link" href="../home-page/#money"> يمكنك الشحن من هنا</a></div>';
     }
   }
 }
 async function rate() {
   let rating = document.getElementById('rating').value;
   let review = document.getElementById('review').value;
   result = await fetch(`${server}/rate-playlist/?token=${localStorage.token}&&id=${localStorage.id}&&playlist=${playlist}&&review=${review}&&rating=${rating}`);
   result = await result.json();
   if (!result.tokenExpired) {
     if (result.success) {
       window.location.reload()
     }
   }
 }
getPlaylistInfo();
getPlaylistVideos();
getPlaylistComments();
