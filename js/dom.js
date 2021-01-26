const nav = document.querySelector('.navigation');
const sticky = nav.offsetTop;

window.onscroll = function(){addSticky()};

window.scrollTop();

function addSticky(){
    if (window.scrollY >= 30) {
        nav.classList.add("sticky")
      } else {
        nav.classList.remove("sticky");
      }
}