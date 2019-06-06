$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var body = message.body? `${ message.body }` : "";
    var img = message.image ? `<img class='image', alt='Bg', src= ${ message.image } >` : "";
    var html = `<div class="message">
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
})