var dialog = new bootstrap.Modal('#dialog', {show:true});
var dialogContainer = document.querySelector('#dialog-container');
var validated;
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
  .forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
        console.log(1);
      }
      form.classList.add('was-validated')
    }, false)
  })
})()
  function show() {
    let box = document.getElementById('showPass');
    let pass = document.getElementById('password');
    if (box.checked == true) {
      pass.type = "text";
    }else {
      pass.type = "password";
    }
  }
  async function get(id, data) {
    let container = document.getElementById(id);
    let url = `${server}/unversal-data/?${id}=${data}`;
    response = await fetch(url);
    result = await response.json();
    if (result.rows.length > 0) {
      result.rows.forEach((item, i) => {
        option = addOptions(item.id, item.name);
        container.innerHTML += option;
      });
    }else {
      container.innerHTML = '<option selected disabled value="">لا يوجد نتائج </option>'
    }
  }
  function addOptions(id, name) {
    return `<option value="${id}">${name}</option>`;
  }
  const scrollSpy = new bootstrap.ScrollSpy(document.body, {
  target: '#list-example'
})
function doingUp(data) {
  dialog.show();
  dialogContainer.innerHTML=
  '<div class=" d-flex justify-content-center align-items-center" id="dialog-body">'
  +'  <div class="spinner-border" role="status"></div> <div class="ms-2 d-inline">تتم المعالجة</div>'
  +'</div>';
  submitData(data);
  return false;
}
async function submitData(data) {
  let url = `${server}/${data}/`;
  let form = document.getElementById(`${data}Form`);
  let formData = new FormData(form);
  response = await fetch(url, {method:'post', body: new FormData(form)})
  result = await response.json();
  runner(result);
}
function runner(result) {
  if (result.success) {
    localStorage.id = result['cookies']["id"];
    localStorage.token = result['cookies']["token"];
    location = "../home-page/#home";
  }else{
    dialogContainer.innerHTML=
    '<div id="dialog-body">'
    +result.message
    +'</div>'
    +'<div class="d-flex justify-content-center mt-3">'
      +'<a type="button" class="nav-link link-nerd" id="dialog-btn" data-bs-dismiss="modal">موافق</a>'
    +'</div>';
  }
}
window.onload = (async ()=>{
    get('university', 0)
  });
