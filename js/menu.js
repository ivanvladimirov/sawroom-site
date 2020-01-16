$(document).on("scroll",function(){
    if($(document).scrollTop()>10){
        $("header").addClass("scroll");
    } else{
        $("header").removeClass("scroll");
    }
});

$('nav').click (function(){
    $(this).toggleClass('active');
    $('#menu').toggleClass('open');
    $('.language').toggle();
});

(function($){
    $(window).on("load",function(){
        $("a[rel='m_PageScroll2id']").mPageScroll2id();
    });
})(jQuery);