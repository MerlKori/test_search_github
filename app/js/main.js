$(document).ready(function() {
 var btn =  $('#search__btn');
 var userName = $('#nickname');

 function searchUser(){
 	var nickname = userName.val();
  userName.val("");
  $.ajax({
     url: 'https://api.github.com/users/' + nickname,
     success: function(data){
     $('.user__block').remove();
     $('.error__message').remove();
     $('<div class="user__block"> <div class="user__avatar" style="background-image:url(' + data.avatar_url + ')" > </div> <div class="user__nickname">' + data.login + '</div> <a href="' + data.html_url + '" class="userPage__link" target="_blank"> Go to user page </a> </div>').appendTo('.user__data');
     },
     error: function(){
     	$('.user__block').remove();
     	$('.error__message').remove();
     	$('<h2 class="error__message"> User not found </h2>').appendTo('.user__data');
     } 
 	 });
 }

 btn.click(function(){
   	searchUser();
 });

userName.on('keydown', function(e) {
    if (e.which == 13) {
        e.preventDefault();
        searchUser();
    }
 });

});