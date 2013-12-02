$(document).ready(function() {
    $(".banner").backstretch($('.banner').attr('data-src'), {
        duration: 4000
    });    
    $('span.loading').hover(function(){
        $(this).find('i').addClass('fa-spin')
    }, function(){
        $(this).find('i').removeClass('fa-spin')
    });
});