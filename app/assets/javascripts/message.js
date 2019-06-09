$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var body = message.body? `${ message.body }` : "";
    var img = message.image ? `<img class='image', alt="Bg", src= ${ message.image } >` : "";
    var html = `<div class="message" data-id= "${message.id}">
                  <div class="message-info">
                    <p class="messenger-name"> 
                      ${message.user_name}
                    </p>
                    <p class="post-date">
                      ${message.date}
                    </p>
                  </div>
                  <p class="main-post-message">
                    ${body}
                  </p>
                  <p class="main-post-image">    
                    ${img}
                  </p>
               </div>`
    return html;
  }
  function scrollBottom(){
   $('.content-main').animate({scrollTop:$('.content-main')[0].scrollHeight});
  }
  $('#new_input').on('submit', function(e){
    e.preventDefault();
    var message = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
  })
  .done(function(data){
    var html = buildHTML(data);
    $('.content-main').append(html);
    $('form')[0].reset();
    scrollBottom()
  })
  .fail(function(data){
    alert('エラーが発生したためメッセージは送信できませんでした。');
  })
  .always(function(data){
    $('.send-button').prop('disabled', false);
  })
})
var reloadMessages = function() {
  var last_message_id = $('.content-main').children().last().data('id');
  var reload_url = window.location.href
    reload_url_pattern = '/messages';
    api_url = reload_url.replace(reload_url_pattern, '/api/messages');
  $.ajax({
    url: api_url,
    type: 'get',
    dataType: 'json',
    data: {id: last_message_id}
  })
  .done(function(messages) {
    var insertHTML = '';
    messages.forEach(function(message) {
      insertHTML += buildHTML(message);
      scrollBottom()
    });
    
    $('.content-main').append(insertHTML);
  })
  .fail(function() {
    alert('自動更新に失敗しました');
  });
};
setInterval(reloadMessages, 5000);
})