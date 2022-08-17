async function suggest(value) {
  let searchBox, container;
  searchBox = document.querySelector('#search-box-input');
  container = document.querySelector('#search-box-body');
  container.innerHTML = "";
  if ((value.trim().length === 0)) {
    container.innerHTML = "";
  }else {
    container.innerHTML = ""
    result = await fetch(`${server}/suggestions/?token=${localStorage.token}&&id=${localStorage.id}&&value=${value}`);
    result = await result.json();
    if (!result.tokenExpired) {
      if (result.rows.length > 0) {
        container.innerHTML = "";
        result.rows.forEach((item, i) => {
          container.insertAdjacentHTML('afterBegin', addSugg(item));
        });
      }
      else {
        container.innerHTML = "";
      }
    }
  }
}
function addSugg(sug) {
  body = '<div class="w-100 d-flex justify-content-between align-items-center p-2 suggestion my-2">'+
    `<span>${sug}</span>`+
    '<span><i class="bi bi-search fs-4"></i></span>'+
  '</div>';
  return body;
}
