function copyer() {
  let copyText = document.getElementById("card");
  let btn = document.getElementById('copy');
  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */
  btn.classList.remove("btn-outline-primary");
  btn.classList.add("btn-success");
  btn.innerHTML = "تم النسخ"
  /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText.value);
  let alert = setInterval(()=>{
    btn.classList.add("btn-outline-primary");
    btn.classList.remove("btn-success");
    btn.innerHTML = "نسخ";
    clearInterval(alert);
  },3000)

}
window.onload = (async ()=>{
  let payment_loader = document.getElementById('payment_loader')
  result = await fetch(`${server}/payment/?token=${localStorage.token}&&id=${localStorage.id}`);
  console.log(`${server}/payment/?token=${localStorage.token}&&id=${localStorage.id}`);
  result = await result.json();
  if (!result.tokenExpired) {
    document.getElementById('balance').textContent = result.data;
    payment_loader.remove();
  }
  document.getElementById('card').value = localStorage.id;
  new QRCode(document.getElementById('qrcode'), localStorage.id);
})
