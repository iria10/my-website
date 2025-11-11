window.onload = function () {
 var nav = document.getElementById('nav-wrapper');
 var hamburger = document.getElementById('js-hamburger');
var blackBg = document.getElementById('js-black-bg');

// nullチェックを追加して、要素が存在しない場合のエラーを防ぎます
if (hamburger) {
    hamburger.addEventListener('click', function () {
 nav.classList.toggle('open');
   });
}

if (blackBg) {
    blackBg.addEventListener('click', function () {
nav.classList.remove('open');
    });
}

 // 追記：SPナビゲーションのリンクをクリックしたらメニューを閉じる
var spNavLinks = document.querySelectorAll('.sp-nav ul li a');
 spNavLinks.forEach(function(link) {
 link.addEventListener('click', function() {
                // navがnullでないことを確認
                if (nav) {
     nav.classList.remove('open');
                }
 });
 });
};