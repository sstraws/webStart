/*
* 我们的自定义js
* @Author: straws
* @Date:   2016-11-06 10:56:34
* @Last Modified by:   straws
* @Last Modified time: 2016-11-06 17:51:08
*/

'use strict';
$(function() {

  function resize() {
    // 屏幕宽度
    var windowWidth = $(window).width();
    // 是否为小于768的屏幕
    var smallScreen = windowWidth < 768;
    // 轮播图板块适应
    var $itemImages = $('#main_ad .item-image');
    $itemImages.each(function(i, item) {
      var $item = $(item);
      //获取data-*中的对应的图片地址
      var imgSrc = $item.data(smallScreen ? 'image-small' : 'image-large');
      //获取对应图片的alt
      var imgAlt = $item.data('image-alt');
      //当小图时候用img来
      if(smallScreen){
        $item.html('<img src="' + imgSrc + '" alt="' + imgAlt + '"/>');
      }else{
        $item.empty();
        $item.css('backgroundImage', 'url(' + imgSrc + ')');
      }
    });

    // tab栏宽度适应
    var $tabs = $('.nav-tabs');
    $tabs.each(function(i, item) {
      var $tab = $(this);
      var width = 20;
      //$tab.children() --> 所有li
      $tab.children().each(function(ci, citem) {
        width += $(citem).width();
      }); 
      //$tab.parent() --> touch_sroll。由于在container设置会被覆盖
      //当屏幕缩放的很小的时候，外边框会小于width():
      if (width > $tab.parent().width()) {
        $tab.css('width', width);
        $tab.parent().css("overflow-x" , "scroll");
      } else {
        $tab.css('width', 'auto');
        $tabs.parent().css('overflow-x', 'hidden');
      }
    });
  }

  var OFFSET = 50;
  // 轮播图触摸
   /*$('.carousel').each(function(i, item){
    var startX, endX;
    // 这里用原生的addEventListener是为了避免使用jQuery中的event对象引起的不同
    //方法一  js 原生
   item.addEventListener('touchstart', function(e) {
      startX = e.touches[0].clientX;
      e.preventDefault();
    });
    item.addEventListener('touchmove', function(e) {
      endX = e.touches[0].clientX;
      e.preventDefault();
    });
    item.addEventListener('touchend', function(e) {
      var offsetX = endX - startX;
      if (offsetX > OFFSET) {
        // 上一张
        $(this).carousel('prev');
      } else if (offsetX < -OFFSET) {
        // 上一张
        $(this).carousel('next');
      }
      e.preventDefault();
    });
  });*/
  
 //方式二 jQuery
  var $carousel = $("section.carousel");
  var startX,endX;
  $carousel.on("touchstart",function(e){
      startX = e.originalEvent.touches[0].clientX;
      e.preventDefault();//阻止默认行为很重要。
   });

   $carousel.on("touchmove",function(e){
      endX = e.originalEvent.touches[0].clientX;
      e.preventDefault();
   });
   
   $carousel.on("touchend",function(e){
     var offsetX = Math.abs(endX - startX);
     console.log(offsetX);
     if (offsetX > OFFSET){
       console.log(endX > startX ? "prev" : "next")
       var direction = endX > startX ? 'next' : 'prev';
       $(this).carousel(direction);
     }
  });

  $(window).on('resize', resize).trigger('resize');

  // 提示框效果
  $('[data-toggle="tooltip"]').tooltip();

  // 新闻点击切换
  $('.news-nav a').on("click mouseenter",function(e) {
    $('.news-title').text($(this).data('title'));
  });

  //固定滚动条
  /*$(document).on("scroll",function(){ 
    var topbar_h = $("#header .topbar").height();
    if($(document).scrollTop() > topbar_h)
      $("#header nav").addClass("navbar-fixed-top").removeClass("navbar-static-top");
    else if($(document).scrollTop() == 0)
      $("#header nav").addClass("navbar-static-top").removeClass("navbar-fixed-top");
  });
*/
  //给panel添加yangsh
/*  $("#investing .panel-product").on({"click" : function(){
    $(this).addClass("active")}});
 $("#investing .panel-product").on({"mouseleave" : function(){
    $(this).removeClass("active")}});*/

    //激活模块框
    // $("#header .register").click(function(){
      // $('.login_form').modal('show');
      $('.login_form').modal({ show: false,keyboard: true,backdrop: true});
    // });
});
