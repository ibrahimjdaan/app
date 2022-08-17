window.onload = (async ()=>{
    result = await fetch(`${server}/profile-info/?token=${localStorage.token}&&id=${localStorage.id}`);
    result = await result.json();
    if (!result.tokenExpired) {
      if (result.rows.length > 0) {
        result.rows.forEach((item, i) => {
          postes = addProfileInfo(item.userImg, item.userName);
        });
      }
    }
  });
  function addProfileInfo(img, name) {
    let data = `<img class="border border-2 rounded-pill" src="${server}/images/?id=${img}" width="120" height="120" alt="" style="border-color:#2535ae !important;" role="button">`
    data +=    `    <h2>${name}</h2>`
    document.querySelector('#userInfoContainer').innerHTML=data;
  }
  async function logout() {
    const dialog = new bootstrap.Modal(window.top.document.querySelector('#dialog'), {show:true});
    dialog.show();
    const dialogContainer = window.top.document.querySelector('#dialog-container');
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
      goto("../../../login/");
    }
  }
  const toastTrigger = document.getElementById('logout-alertBtn')
  const toastLiveExample = document.getElementById('logout-alert')
  if (toastTrigger) {
    toastTrigger.addEventListener('click', () => {
      document.querySelector('.position-fixed').style.display = 'flex'
      const toast = new bootstrap.Toast(toastLiveExample)
      toast.show()
    })
  }
function share() {
  const title = 'مشاركه مع الأصدقاء';
  const text = "مرحبا قم بتحميل تطبيق نيردات وشاهد افضل الدورات والمزيد.";
  const url = "https://www.nerdatjo.com/download";
  if (navigator.share !== undefined) {
      navigator
        .share({
          title,
          text,
          url
        })
        .then(() => console.log("Shared!"))
        .catch(err => console.error(err));
    } else {
      window.location = `mailto:?subject=${title}&body=${text}%0A${url}`;
    }
}
