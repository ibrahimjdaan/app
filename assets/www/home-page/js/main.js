var id = (window.location.hash).replace("#","");
if (window.location.hash) {
  btn = document.getElementById(`${id}-tab`);
  container = document.getElementById(id);
  btn.classList.add("active");
  container.classList.add("showed");
}
function active(id) {
  btn = document.getElementById(`${id}-tab`);
  activeBtn = document.querySelector('.active');
  container = document.getElementById(id);
  activeContainer = document.querySelector('.showed');
  if (activeContainer.id != id) {
    btn.classList.add("active");
    activeBtn.classList.remove("active");
    activeContainer.classList.remove("showed");
    container.classList.add("showed");
    window.location.hash = id;
  }
}
async function logout() {
  const dialog = new bootstrap.Modal('#dialog', {show:true});
  dialog.show();
  const dialogContainer = document.querySelector('#dialog-container');
  dialogContainer.innerHTML=
  '<div class=" d-flex justify-content-center align-items-center" id="dialog-body">'
  +'  <div class="spinner-border" role="status"></div> <div class="ms-2 d-inline">جار تسجيل الخروج</div>'
  +'</div>'
  let id = localStorage.id;let token = localStorage.token;
  let  result =  await fetch(`${server}/logout/?token=${token}&&id=${id}`);
  result = await result.json();
  if (result.success) {
    delete localStorage.id;
    delete localStorage.token;
    location = "../login/";
  }
}
async function check_login() {
  if (!(await checkToken())) {
    const dialog = new bootstrap.Modal('#dialog', {show:true});
    dialog.show();
    const dialogContainer = document.querySelector('#dialog-container');
    dialogContainer.innerHTML=
    '<div class="" id="dialog-body">'
    +'  انتهت صلاحسه الجلسه'
    +'</div>'
    +'<div class="d-flex justify-content-center">'
    +'<a type="button" class="nav-link link-nerd" id="dialog-btn" data-bs-dismiss="modal" onclick="logout()">موافق</a>'
    +'</div>';
  }
}
check_login();
