var server;
server = "https://nerdatjo.com/";
function goto(url) {
  window.top.location = url;
}
async function checkToken() {
  if (localStorage.id && localStorage.token) {
    let id = localStorage.id;let token = localStorage.token;
    let  result =  await fetch(`${server}/check-token/?token=${token}&&id=${id}`);
    console.log(`${server}/check-token/?token=${token}&&id=${id}`);
    result = await result.json();
    return !result.tokenExpired;
  }else {
    return false;
  }
}
