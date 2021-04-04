 
function t121_setHeight(recid){
    var rec = $('#rec' + recid);
    var div=$("#youtubeiframe"+recid);
    var height=div.width() * 0.5625;
    div.height(height);
    div.parent().height(height);
    
    var videoLazy = rec.find('.t-video-lazyload');
    var iframeLazy = videoLazy.find('iframe');
    if (videoLazy != undefined) {
        var heightLazy = videoLazy.width() * 0.5625;
        videoLazy.height(heightLazy);
        iframeLazy.height(heightLazy);
    }
} 
function t228_highlight(){
  var url=window.location.href;
  var pathname=window.location.pathname;
  if(url.substr(url.length - 1) == "/"){ url = url.slice(0,-1); }
  if(pathname.substr(pathname.length - 1) == "/"){ pathname = pathname.slice(0,-1); }
  if(pathname.charAt(0) == "/"){ pathname = pathname.slice(1); }
  if(pathname == ""){ pathname = "/"; }
  $(".t228__list_item a[href='"+url+"']").addClass("t-active");
  $(".t228__list_item a[href='"+url+"/']").addClass("t-active");
  $(".t228__list_item a[href='"+pathname+"']").addClass("t-active");
  $(".t228__list_item a[href='/"+pathname+"']").addClass("t-active");
  $(".t228__list_item a[href='"+pathname+"/']").addClass("t-active");
  $(".t228__list_item a[href='/"+pathname+"/']").addClass("t-active");
}

function t228_checkAnchorLinks(recid) {
    if ($(window).width() >= 960) {
        var t228_navLinks = $("#rec" + recid + " .t228__list_item a:not(.tooltipstered)[href*='#']");
        if (t228_navLinks.length > 0) {
            setTimeout(function(){
              t228_catchScroll(t228_navLinks);
            }, 500);
        }
    }
}

function t228_catchScroll(t228_navLinks) {
    var t228_clickedSectionId = null,
        t228_sections = new Array(),
        t228_sectionIdTonavigationLink = [],
        t228_interval = 100,
        t228_lastCall, t228_timeoutId;
    t228_navLinks = $(t228_navLinks.get().reverse());
    t228_navLinks.each(function() {
        var t228_cursection = t228_getSectionByHref($(this));
        if (typeof t228_cursection.attr("id") != "undefined") {
            t228_sections.push(t228_cursection);
        }
        t228_sectionIdTonavigationLink[t228_cursection.attr("id")] = $(this);
    });
		t228_updateSectionsOffsets(t228_sections);
    t228_sections.sort(function(a, b) {
      return b.attr("data-offset-top") - a.attr("data-offset-top");
    });
		$(window).bind('resize', t_throttle(function(){t228_updateSectionsOffsets(t228_sections);}, 200));
		$('.t228').bind('displayChanged',function(){t228_updateSectionsOffsets(t228_sections);});
		setInterval(function(){t228_updateSectionsOffsets(t228_sections);},5000);
    t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId);

    t228_navLinks.click(function() {
        var t228_clickedSection = t228_getSectionByHref($(this));
        if (!$(this).hasClass("tooltipstered") && typeof t228_clickedSection.attr("id") != "undefined") {
            t228_navLinks.removeClass('t-active');
            $(this).addClass('t-active');
            t228_clickedSectionId = t228_getSectionByHref($(this)).attr("id");
        }
    });
    $(window).scroll(function() {
        var t228_now = new Date().getTime();
        if (t228_lastCall && t228_now < (t228_lastCall + t228_interval)) {
            clearTimeout(t228_timeoutId);
            t228_timeoutId = setTimeout(function() {
                t228_lastCall = t228_now;
                t228_clickedSectionId = t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId);
            }, t228_interval - (t228_now - t228_lastCall));
        } else {
            t228_lastCall = t228_now;
            t228_clickedSectionId = t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId);
        }
    });
}


function t228_updateSectionsOffsets(sections){
	$(sections).each(function(){
		var t228_curSection = $(this);
		t228_curSection.attr("data-offset-top",t228_curSection.offset().top);
	});
}

function t228_getSectionByHref(curlink) {
      var t228_curLinkValue = curlink.attr('href').replace(/\s+/g, '').replace(/.*#/, '');
      if (curlink.is('[href*="#rec"]')) {
          return $(".r[id='" + t228_curLinkValue + "']");
      } else {
          return $(".r[data-record-type='215']").has("a[name='" + t228_curLinkValue + "']");
      }
  }

function t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId) {
    var t228_scrollPosition = $(window).scrollTop(),
        t228_valueToReturn = t228_clickedSectionId;
    /*if first section is not at the page top (under first blocks)*/
    if (t228_sections.length != 0 && t228_clickedSectionId == null && t228_sections[t228_sections.length-1].attr("data-offset-top") > (t228_scrollPosition + 300)){
      t228_navLinks.removeClass('t-active');
      return null;
    }

    $(t228_sections).each(function(e) {
        var t228_curSection = $(this),
            t228_sectionTop = t228_curSection.attr("data-offset-top"),
            t228_id = t228_curSection.attr('id'),
            t228_navLink = t228_sectionIdTonavigationLink[t228_id];
        if (((t228_scrollPosition + 300) >= t228_sectionTop) || (t228_sections[0].attr("id") == t228_id && t228_scrollPosition >= $(document).height() - $(window).height())) {
            if (t228_clickedSectionId == null && !t228_navLink.hasClass('t-active')) {
                t228_navLinks.removeClass('t-active');
                t228_navLink.addClass('t-active');
                t228_valueToReturn = null;
            } else {
                if (t228_clickedSectionId != null && t228_id == t228_clickedSectionId) {
                    t228_valueToReturn = null;
                }
            }
            return false;
        }
    });
    return t228_valueToReturn;
}

function t228_setPath(){
}

function t228_setWidth(recid){
  var window_width=$(window).width();
  if(window_width>980){
    $(".t228").each(function() {
      var el=$(this);
      var left_exist=el.find('.t228__leftcontainer').length;
      var left_w=el.find('.t228__leftcontainer').outerWidth(true);
      var max_w=left_w;
      var right_exist=el.find('.t228__rightcontainer').length;
      var right_w=el.find('.t228__rightcontainer').outerWidth(true);
	  var items_align=el.attr('data-menu-items-align');
      if(left_w<right_w)max_w=right_w;
      max_w=Math.ceil(max_w);
      var center_w=0;
      el.find('.t228__centercontainer').find('li').each(function() {
        center_w+=$(this).outerWidth(true);
      });
      var padd_w=40;
      var maincontainer_width=el.find(".t228__maincontainer").outerWidth();
      if(maincontainer_width-max_w*2-padd_w*2>center_w+20){
          //if(left_exist>0 && right_exist>0){
		  if(items_align=="center" || typeof items_align==="undefined"){
            el.find(".t228__leftside").css("min-width",max_w+"px");
            el.find(".t228__rightside").css("min-width",max_w+"px");
            el.find(".t228__list").removeClass("t228__list_hidden");
          }
       }else{
          el.find(".t228__leftside").css("min-width","");
          el.find(".t228__rightside").css("min-width","");  
          
      }
    });
  }
}

function t228_setBg(recid){
  var window_width=$(window).width();
  if(window_width>980){
    $(".t228").each(function() {
      var el=$(this);
      if(el.attr('data-bgcolor-setbyscript')=="yes"){
        var bgcolor=el.attr("data-bgcolor-rgba");
        el.css("background-color",bgcolor);
      }
      });
      }else{
        $(".t228").each(function() {
          var el=$(this);
          var bgcolor=el.attr("data-bgcolor-hex");
          el.css("background-color",bgcolor);
          el.attr("data-bgcolor-setbyscript","yes");
      });
  }
}

function t228_appearMenu(recid) {
      var window_width=$(window).width();
      if(window_width>980){
           $(".t228").each(function() {
                  var el=$(this);
                  var appearoffset=el.attr("data-appearoffset");
                  if(appearoffset!=""){
                          if(appearoffset.indexOf('vh') > -1){
                              appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)));
                          }

                          appearoffset=parseInt(appearoffset, 10);

                          if ($(window).scrollTop() >= appearoffset) {
                            if(el.css('visibility') == 'hidden'){
                                el.finish();
                                el.css("top","-50px");  
                                el.css("visibility","visible");
                                var topoffset = el.data('top-offset');
                                if (topoffset && parseInt(topoffset) > 0) {
                                    el.animate({"opacity": "1","top": topoffset+"px"}, 200,function() {
                                    });
                                    
                                } else {
                                    el.animate({"opacity": "1","top": "0px"}, 200,function() {
                                    });
                                }
                            }
                          }else{
                            el.stop();
                            el.css("visibility","hidden");
							el.css("opacity","0");	
                          }
                  }
           });
      }

}

function t228_changebgopacitymenu(recid) {
  var window_width=$(window).width();
  if(window_width>980){
    $(".t228").each(function() {
      var el=$(this);
      var bgcolor=el.attr("data-bgcolor-rgba");
      var bgcolor_afterscroll=el.attr("data-bgcolor-rgba-afterscroll");
      var bgopacityone=el.attr("data-bgopacity");
      var bgopacitytwo=el.attr("data-bgopacity-two");
      var menushadow=el.attr("data-menushadow");
      if(menushadow=='100'){
        var menushadowvalue=menushadow;
      }else{
        var menushadowvalue='0.'+menushadow;
      }
      if ($(window).scrollTop() > 20) {
        el.css("background-color",bgcolor_afterscroll);
        if(bgopacitytwo=='0' || (typeof menushadow == "undefined" && menushadow == false)){
          el.css("box-shadow","none");
        }else{
          el.css("box-shadow","0px 1px 3px rgba(0,0,0,"+ menushadowvalue +")");
        }
      }else{
        el.css("background-color",bgcolor);
        if(bgopacityone=='0.0' || (typeof menushadow == "undefined" && menushadow == false)){
          el.css("box-shadow","none");
        }else{
          el.css("box-shadow","0px 1px 3px rgba(0,0,0,"+ menushadowvalue +")");
        }
      }
    });
  }
}

function t228_createMobileMenu(recid){
  var window_width=$(window).width(),
      el=$("#rec"+recid),
      menu=el.find(".t228"),
      burger=el.find(".t228__mobile");
  burger.click(function(e){
    menu.fadeToggle(300);
    $(this).toggleClass("t228_opened")
  })
  $(window).bind('resize', t_throttle(function(){
    window_width=$(window).width();
    if(window_width>980){
      menu.fadeIn(0);
    }
  }, 200));
}
 
function t270_scroll(hash, offset) {
    var $root = $('html, body');
    var target = "";
    try {
        target = $(hash);
    } catch(event) {
        console.log("Exception t270: " + event.message);
        return true;
    }
    if (target.length == 0) {
        target = $('a[name="' + hash.substr(1) + '"]');
        if (target.length == 0) {
            return true;
        }
    }
    $root.animate({
        scrollTop: target.offset().top - offset
    }, 500, function() {
        if(history.pushState) {
            history.pushState(null, null, hash);
        } else {
            window.location.hash = hash;
        }
    });
    return true;
} 
function t381_appearMenu(recid) {
    var window_width=$(window).width();
    if(window_width>980){
         $(".t381").each(function() {
                var el=$(this);
                var appearoffset=el.attr("data-appearoffset");
                var hideoffset=el.attr("data-hideoffset");
                if(appearoffset!=""){
                        if(appearoffset.indexOf('vh') > -1){
                            appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)));
                        }

                        appearoffset=parseInt(appearoffset, 10);

                        if ($(window).scrollTop() >= appearoffset) {
                          if(el.css('visibility') == 'hidden'){
                              el.finish();
                              el.css("visibility","visible");
                              el.animate({"opacity": "1"}, 300,function() {
                              });       
                          }
                        }else{
                          el.stop();
                          el.css("visibility","hidden");
                        }
                }

                if(hideoffset!=""){
                        if(hideoffset.indexOf('vh') > -1){
                            hideoffset = Math.floor((window.innerHeight * (parseInt(hideoffset) / 100)));
                        }

                        hideoffset=parseInt(hideoffset, 10);

                        if ($(window).scrollTop()+$(window).height() >= $(document).height() - hideoffset) {
                          if(el.css('visibility') != 'hidden'){
                              el.finish();
                              el.css("visibility","hidden");
                          }
                        }else{
                          if (appearoffset!="") {
                              if($(window).scrollTop() >= appearoffset){
                                el.stop();
                                el.css("visibility","visible");
                              }
                          }else{
                              el.stop();
                              el.css("visibility","visible");
                          }
                        }
                }
         });
    }
}

 
function t390_initPopup(recid) {
  $('#rec'+recid).attr('data-animationappear','off');
  $('#rec'+recid).css('opacity','1');
  var el=$('#rec'+recid).find('.t-popup'),
      hook=el.attr('data-tooltip-hook'),
      analitics=el.attr('data-track-popup');
  if(hook!==''){
    $('.r').on('click', 'a[href="' + hook + '"]', function(e) {
      t390_showPopup(recid);
      t390_resizePopup(recid);
      e.preventDefault();
      if(window.lazy=='y'){t_lazyload_update();}
      if (analitics > '') {
        var virtTitle = hook;
        if (virtTitle.substring(0,7) == '#popup:') {
            virtTitle = virtTitle.substring(7);
        }
        Tilda.sendEventToStatistics(analitics, virtTitle);
      }
    });
  }
}

function t390_showPopup(recid){
  var el=$('#rec'+recid),
      popup = el.find('.t-popup');

  popup.css('display', 'block');
  setTimeout(function() {
    popup.find('.t-popup__container').addClass('t-popup__container-animated');
    popup.addClass('t-popup_show');
  }, 50);

  $('body').addClass('t-body_popupshowed');
  
  el.find('.t-popup').mousedown(function(e){
    var windowWidth = $(window).width();
    var maxScrollBarWidth = 17;
    var windowWithoutScrollBar = windowWidth - maxScrollBarWidth;
    if(e.clientX > windowWithoutScrollBar) {
        return;
    }
    if (e.target == this) {
      t390_closePopup(recid);
    }
  });

  el.find('.t-popup__close').click(function(e){
    t390_closePopup(recid);
  });

  el.find('a[href*=#]').click(function(e){
    var url = $(this).attr('href');
    if (!url || url.substring(0,7) != '#price:') {
      t390_closePopup(recid);
      if (!url || url.substring(0,7) == '#popup:') {
        setTimeout(function() {
          $('body').addClass('t-body_popupshowed');
        }, 300);
      }
    }
  });

  $(document).keydown(function(e) {
    if (e.keyCode == 27) { t390_closePopup(recid); }
  });
}

function t390_closePopup(recid){
  $('body').removeClass('t-body_popupshowed');
  $('#rec' + recid + ' .t-popup').removeClass('t-popup_show');
  setTimeout(function() {
    $('.t-popup').not('.t-popup_show').css('display', 'none');
  }, 300);
}

function t390_resizePopup(recid){
  var el = $("#rec"+recid),
      div = el.find(".t-popup__container").height(),
      win = $(window).height() - 120,
      popup = el.find(".t-popup__container");
  if (div > win ) {
    popup.addClass('t-popup__container-static');
  } else {
    popup.removeClass('t-popup__container-static');
  }
}
/* deprecated */
function t390_sendPopupEventToStatistics(popupname) {
  var virtPage = '/tilda/popup/';
  var virtTitle = 'Popup: ';
  if (popupname.substring(0,7) == '#popup:') {
      popupname = popupname.substring(7);
  }
    
  virtPage += popupname;
  virtTitle += popupname;
  if (window.Tilda && typeof Tilda.sendEventToStatistics == 'function') {
    Tilda.sendEventToStatistics(virtPage, virtTitle, '', 0);
  } else {
    if(ga) {
      if (window.mainTracker != 'tilda') {
        ga('send', {'hitType':'pageview', 'page':virtPage,'title':virtTitle});
      }
    }
  
    if (window.mainMetrika > '' && window[window.mainMetrika]) {
      window[window.mainMetrika].hit(virtPage, {title: virtTitle,referer: window.location.href});
    }
  }
} 

function t396_init(recid){var data='';var res=t396_detectResolution();t396_initTNobj();t396_switchResolution(res);t396_updateTNobj();t396_artboard_build(data,recid);window.tn_window_width=$(window).width();$( window ).resize(function () {tn_console('>>>> t396: Window on Resize event >>>>');t396_waitForFinalEvent(function(){if($isMobile){var ww=$(window).width();if(ww!=window.tn_window_width){t396_doResize(recid);}}else{t396_doResize(recid);}}, 500, 'resizeruniqueid'+recid);});$(window).on("orientationchange",function(){tn_console('>>>> t396: Orient change event >>>>');t396_waitForFinalEvent(function(){t396_doResize(recid);}, 600, 'orientationuniqueid'+recid);});$( window ).load(function() {var ab=$('#rec'+recid).find('.t396__artboard');t396_allelems__renderView(ab);});var rec = $('#rec' + recid);if (rec.attr('data-connect-with-tab') == 'yes') {rec.find('.t396').bind('displayChanged', function() {var ab = rec.find('.t396__artboard');t396_allelems__renderView(ab);});}}function t396_doResize(recid){var ww=$(window).width();window.tn_window_width=ww;var res=t396_detectResolution();var ab=$('#rec'+recid).find('.t396__artboard');t396_switchResolution(res);t396_updateTNobj();t396_ab__renderView(ab);t396_allelems__renderView(ab);}function t396_detectResolution(){var ww=$(window).width();var res;res=1200;if(ww<1200){res=960;}if(ww<960){res=640;}if(ww<640){res=480;}if(ww<480){res=320;}return(res);}function t396_initTNobj(){tn_console('func: initTNobj');window.tn={};window.tn.canvas_min_sizes = ["320","480","640","960","1200"];window.tn.canvas_max_sizes = ["480","640","960","1200",""];window.tn.ab_fields = ["height","width","bgcolor","bgimg","bgattachment","bgposition","filteropacity","filtercolor","filteropacity2","filtercolor2","height_vh","valign"];}function t396_updateTNobj(){tn_console('func: updateTNobj');if(typeof window.zero_window_width_hook!='undefined' && window.zero_window_width_hook=='allrecords' && $('#allrecords').length){window.tn.window_width = parseInt($('#allrecords').width());}else{window.tn.window_width = parseInt($(window).width());}/* window.tn.window_width = parseInt($(window).width()); */window.tn.window_height = parseInt($(window).height());if(window.tn.curResolution==1200){window.tn.canvas_min_width = 1200;window.tn.canvas_max_width = window.tn.window_width;}if(window.tn.curResolution==960){window.tn.canvas_min_width = 960;window.tn.canvas_max_width = 1200;}if(window.tn.curResolution==640){window.tn.canvas_min_width = 640;window.tn.canvas_max_width = 960;}if(window.tn.curResolution==480){window.tn.canvas_min_width = 480;window.tn.canvas_max_width = 640;}if(window.tn.curResolution==320){window.tn.canvas_min_width = 320;window.tn.canvas_max_width = 480;}window.tn.grid_width = window.tn.canvas_min_width;window.tn.grid_offset_left = parseFloat( (window.tn.window_width-window.tn.grid_width)/2 );}var t396_waitForFinalEvent = (function () {var timers = {};return function (callback, ms, uniqueId) {if (!uniqueId) {uniqueId = "Don't call this twice without a uniqueId";}if (timers[uniqueId]) {clearTimeout (timers[uniqueId]);}timers[uniqueId] = setTimeout(callback, ms);};})();function t396_switchResolution(res,resmax){tn_console('func: switchResolution');if(typeof resmax=='undefined'){if(res==1200)resmax='';if(res==960)resmax=1200;if(res==640)resmax=960;if(res==480)resmax=640;if(res==320)resmax=480;}window.tn.curResolution=res;window.tn.curResolution_max=resmax;}function t396_artboard_build(data,recid){tn_console('func: t396_artboard_build. Recid:'+recid);tn_console(data);/* set style to artboard */var ab=$('#rec'+recid).find('.t396__artboard');t396_ab__renderView(ab);/* create elements */ab.find('.tn-elem').each(function() {var item=$(this);if(item.attr('data-elem-type')=='text'){t396_addText(ab,item);}if(item.attr('data-elem-type')=='image'){t396_addImage(ab,item);}if(item.attr('data-elem-type')=='shape'){t396_addShape(ab,item);}if(item.attr('data-elem-type')=='button'){t396_addButton(ab,item);}if(item.attr('data-elem-type')=='video'){t396_addVideo(ab,item);}if(item.attr('data-elem-type')=='html'){t396_addHtml(ab,item);}if(item.attr('data-elem-type')=='tooltip'){t396_addTooltip(ab,item);}if(item.attr('data-elem-type')=='form'){t396_addForm(ab,item);}if(item.attr('data-elem-type')=='gallery'){t396_addGallery(ab,item);}});$('#rec'+recid).find('.t396__artboard').removeClass('rendering').addClass('rendered');if(ab.attr('data-artboard-ovrflw')=='visible'){$('#allrecords').css('overflow','hidden');}if($isMobile){$('#rec'+recid).append('<style>@media only screen and (min-width:1366px) and (orientation:landscape) and (-webkit-min-device-pixel-ratio:2) {.t396__carrier {background-attachment:scroll!important;}}</style>');}}function t396_ab__renderView(ab){var fields = window.tn.ab_fields;for ( var i = 0; i < fields.length; i++ ) {t396_ab__renderViewOneField(ab,fields[i]);}var ab_min_height=t396_ab__getFieldValue(ab,'height');var ab_max_height=t396_ab__getHeight(ab);var offset_top=0;if(ab_min_height==ab_max_height){offset_top=0;}else{var ab_valign=t396_ab__getFieldValue(ab,'valign');if(ab_valign=='top'){offset_top=0;}else if(ab_valign=='center'){offset_top=parseFloat( (ab_max_height-ab_min_height)/2 ).toFixed(1);}else if(ab_valign=='bottom'){offset_top=parseFloat( (ab_max_height-ab_min_height) ).toFixed(1);}else if(ab_valign=='stretch'){offset_top=0;ab_min_height=ab_max_height;}else{offset_top=0;}}ab.attr('data-artboard-proxy-min-offset-top',offset_top);ab.attr('data-artboard-proxy-min-height',ab_min_height);ab.attr('data-artboard-proxy-max-height',ab_max_height);}function t396_addText(ab,el){tn_console('func: addText');/* add data atributes */var fields_str='top,left,width,container,axisx,axisy,widthunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_addImage(ab,el){tn_console('func: addImage');/* add data atributes */var fields_str='img,width,filewidth,fileheight,top,left,container,axisx,axisy,widthunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);el.find('img').on("load", function() {t396_elem__renderViewOneField(el,'top');if(typeof $(this).attr('src')!='undefined' && $(this).attr('src')!=''){setTimeout( function() { t396_elem__renderViewOneField(el,'top');} , 2000);} }).each(function() {if(this.complete) $(this).load();}); el.find('img').on('tuwidget_done', function(e, file) { t396_elem__renderViewOneField(el,'top');});}function t396_addShape(ab,el){tn_console('func: addShape');/* add data atributes */var fields_str='width,height,top,left,';fields_str+='container,axisx,axisy,widthunits,heightunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_addButton(ab,el){tn_console('func: addButton');/* add data atributes */var fields_str='top,left,width,height,container,axisx,axisy,caption,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);return(el);}function t396_addVideo(ab,el){tn_console('func: addVideo');/* add data atributes */var fields_str='width,height,top,left,';fields_str+='container,axisx,axisy,widthunits,heightunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);var viel=el.find('.tn-atom__videoiframe');var viatel=el.find('.tn-atom');viatel.css('background-color','#000');var vihascover=viatel.attr('data-atom-video-has-cover');if(typeof vihascover=='undefined'){vihascover='';}if(vihascover=='y'){viatel.click(function() {var viifel=viel.find('iframe');if(viifel.length){var foo=viifel.attr('data-original');viifel.attr('src',foo);}viatel.css('background-image','none');viatel.find('.tn-atom__video-play-link').css('display','none');});}var autoplay=t396_elem__getFieldValue(el,'autoplay');var showinfo=t396_elem__getFieldValue(el,'showinfo');var loop=t396_elem__getFieldValue(el,'loop');var mute=t396_elem__getFieldValue(el,'mute');var startsec=t396_elem__getFieldValue(el,'startsec');var endsec=t396_elem__getFieldValue(el,'endsec');var tmode=$('#allrecords').attr('data-tilda-mode');var url='';var viyid=viel.attr('data-youtubeid');if(typeof viyid!='undefined' && viyid!=''){ url='//www.youtube.com/embed/'; url+=viyid+'?rel=0&fmt=18&html5=1'; url+='&showinfo='+(showinfo=='y'?'1':'0'); if(loop=='y'){url+='&loop=1&playlist='+viyid;} if(startsec>0){url+='&start='+startsec;} if(endsec>0){url+='&end='+endsec;} if(mute=='y'){url+='&mute=1';} if(vihascover=='y'){ url+='&autoplay=1'; viel.html('<iframe id="youtubeiframe" width="100%" height="100%" data-original="'+url+'" frameborder="0" allowfullscreen data-flag-inst="y"></iframe>'); }else{ if(typeof tmode!='undefined' && tmode=='edit'){}else{ if(autoplay=='y'){url+='&autoplay=1';} } if(window.lazy=='y'){ viel.html('<iframe id="youtubeiframe" class="t-iframe" width="100%" height="100%" data-original="'+url+'" frameborder="0" allowfullscreen data-flag-inst="lazy"></iframe>'); el.append('<script>lazyload_iframe = new LazyLoad({elements_selector: ".t-iframe"});</script>'); }else{ viel.html('<iframe id="youtubeiframe" width="100%" height="100%" src="'+url+'" frameborder="0" allowfullscreen data-flag-inst="y"></iframe>'); } }}var vivid=viel.attr('data-vimeoid');if(typeof vivid!='undefined' && vivid>0){url='//player.vimeo.com/video/';url+=vivid+'?color=ffffff&badge=0';if(showinfo=='y'){url+='&title=1&byline=1&portrait=1';}else{url+='&title=0&byline=0&portrait=0';}if(loop=='y'){url+='&loop=1';}if(mute=='y'){url+='&muted=1';}if(vihascover=='y'){url+='&autoplay=1';viel.html('<iframe data-original="'+url+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');}else{if(typeof tmode!='undefined' && tmode=='edit'){}else{if(autoplay=='y'){url+='&autoplay=1';}}if(window.lazy=='y'){viel.html('<iframe class="t-iframe" data-original="'+url+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');el.append('<script>lazyload_iframe = new LazyLoad({elements_selector: ".t-iframe"});</script>');}else{viel.html('<iframe src="'+url+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');}}}}function t396_addHtml(ab,el){tn_console('func: addHtml');/* add data atributes */var fields_str='width,height,top,left,';fields_str+='container,axisx,axisy,widthunits,heightunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_addTooltip(ab, el) {tn_console('func: addTooltip');var fields_str = 'width,height,top,left,';fields_str += 'container,axisx,axisy,widthunits,heightunits,leftunits,topunits,tipposition';var fields = fields_str.split(',');el.attr('data-fields', fields_str);t396_elem__renderView(el);var pinEl = el.find('.tn-atom__pin');var tipEl = el.find('.tn-atom__tip');var tipopen = el.attr('data-field-tipopen-value');if (isMobile || (typeof tipopen!='undefined' && tipopen=='click')) {t396_setUpTooltip_mobile(el,pinEl,tipEl);} else {t396_setUpTooltip_desktop(el,pinEl,tipEl);}setTimeout(function() {$('.tn-atom__tip-img').each(function() {var foo = $(this).attr('data-tipimg-original');if (typeof foo != 'undefined' && foo != '') {$(this).attr('src', foo);}})}, 3000);}function t396_addForm(ab,el){tn_console('func: addForm');/* add data atributes */var fields_str='width,top,left,';fields_str+='inputs,container,axisx,axisy,widthunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_addGallery(ab,el){tn_console('func: addForm');/* add data atributes */var fields_str='width,height,top,left,';fields_str+='imgs,container,axisx,axisy,widthunits,heightunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_elem__setFieldValue(el,prop,val,flag_render,flag_updateui,res){if(res=='')res=window.tn.curResolution;if(res<1200 && prop!='zindex'){el.attr('data-field-'+prop+'-res-'+res+'-value',val);}else{el.attr('data-field-'+prop+'-value',val);}if(flag_render=='render')elem__renderViewOneField(el,prop);if(flag_updateui=='updateui')panelSettings__updateUi(el,prop,val);}function t396_elem__getFieldValue(el,prop){var res=window.tn.curResolution;var r;if(res<1200){if(res==960){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}if(res==640){r=el.attr('data-field-'+prop+'-res-640-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}}if(res==480){r=el.attr('data-field-'+prop+'-res-480-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-640-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}}}if(res==320){r=el.attr('data-field-'+prop+'-res-320-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-480-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-640-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}}}}}else{r=el.attr('data-field-'+prop+'-value');}return(r);}function t396_elem__renderView(el){tn_console('func: elem__renderView');var fields=el.attr('data-fields');if(! fields) {return false;}fields = fields.split(',');/* set to element value of every fieldvia css */for ( var i = 0; i < fields.length; i++ ) {t396_elem__renderViewOneField(el,fields[i]);}}function t396_elem__renderViewOneField(el,field){var value=t396_elem__getFieldValue(el,field);if(field=='left'){value = t396_elem__convertPosition__Local__toAbsolute(el,field,value);el.css('left',parseFloat(value).toFixed(1)+'px');}if(field=='top'){value = t396_elem__convertPosition__Local__toAbsolute(el,field,value);el.css('top',parseFloat(value).toFixed(1)+'px');}if(field=='width'){value = t396_elem__getWidth(el,value);el.css('width',parseFloat(value).toFixed(1)+'px');var eltype=el.attr('data-elem-type');if(eltype=='tooltip'){var pinSvgIcon = el.find('.tn-atom__pin-icon');/*add width to svg nearest parent to fix InternerExplorer problem*/if (pinSvgIcon.length > 0) {var pinSize = parseFloat(value).toFixed(1) + 'px';pinSvgIcon.css({'width': pinSize, 'height': pinSize});}el.css('height',parseInt(value).toFixed(1)+'px');}if(eltype=='gallery') {var borderWidth = t396_elem__getFieldValue(el, 'borderwidth');var borderStyle = t396_elem__getFieldValue(el, 'borderstyle');if (borderStyle=='none' || typeof borderStyle=='undefined' || typeof borderWidth=='undefined' || borderWidth=='') borderWidth=0;value = value*1 - borderWidth*2;el.css('width', parseFloat(value).toFixed(1)+'px');el.find('.t-slds__main').css('width', parseFloat(value).toFixed(1)+'px');el.find('.tn-atom__slds-img').css('width', parseFloat(value).toFixed(1)+'px');}}if(field=='height'){var eltype = el.attr('data-elem-type');if (eltype == 'tooltip') {return;}value=t396_elem__getHeight(el,value);el.css('height', parseFloat(value).toFixed(1)+'px');if (eltype === 'gallery') {var borderWidth = t396_elem__getFieldValue(el, 'borderwidth');var borderStyle = t396_elem__getFieldValue(el, 'borderstyle');if (borderStyle=='none' || typeof borderStyle=='undefined' || typeof borderWidth=='undefined' || borderWidth=='') borderWidth=0;value = value*1 - borderWidth*2;el.css('height',parseFloat(value).toFixed(1)+'px');el.find('.tn-atom__slds-img').css('height', parseFloat(value).toFixed(1) + 'px');el.find('.t-slds__main').css('height', parseFloat(value).toFixed(1) + 'px');}}if(field=='container'){t396_elem__renderViewOneField(el,'left');t396_elem__renderViewOneField(el,'top');}if(field=='width' || field=='height' || field=='fontsize' || field=='fontfamily' || field=='letterspacing' || field=='fontweight' || field=='img'){t396_elem__renderViewOneField(el,'left');t396_elem__renderViewOneField(el,'top');}if(field=='inputs'){value=el.find('.tn-atom__inputs-textarea').val();try {t_zeroForms__renderForm(el,value);} catch (err) {}}}function t396_elem__convertPosition__Local__toAbsolute(el,field,value){value = parseInt(value);if(field=='left'){var el_container,offset_left,el_container_width,el_width;var container=t396_elem__getFieldValue(el,'container');if(container=='grid'){el_container = 'grid';offset_left = window.tn.grid_offset_left;el_container_width = window.tn.grid_width;}else{el_container = 'window';offset_left = 0;el_container_width = window.tn.window_width;}/* fluid or not*/var el_leftunits=t396_elem__getFieldValue(el,'leftunits');if(el_leftunits=='%'){value = t396_roundFloat( el_container_width * value/100 );}value = offset_left + value;var el_axisx=t396_elem__getFieldValue(el,'axisx');if(el_axisx=='center'){el_width = t396_elem__getWidth(el);value = el_container_width/2 - el_width/2 + value;}if(el_axisx=='right'){el_width = t396_elem__getWidth(el);value = el_container_width - el_width + value;}}if(field=='top'){var ab=el.parent();var el_container,offset_top,el_container_height,el_height;var container=t396_elem__getFieldValue(el,'container');if(container=='grid'){el_container = 'grid';offset_top = parseFloat( ab.attr('data-artboard-proxy-min-offset-top') );el_container_height = parseFloat( ab.attr('data-artboard-proxy-min-height') );}else{el_container = 'window';offset_top = 0;el_container_height = parseFloat( ab.attr('data-artboard-proxy-max-height') );}/* fluid or not*/var el_topunits=t396_elem__getFieldValue(el,'topunits');if(el_topunits=='%'){value = ( el_container_height * (value/100) );}value = offset_top + value;var el_axisy=t396_elem__getFieldValue(el,'axisy');if(el_axisy=='center'){/* var el_height=parseFloat(el.innerHeight()); */el_height=t396_elem__getHeight(el);value = el_container_height/2 - el_height/2 + value;}if(el_axisy=='bottom'){/* var el_height=parseFloat(el.innerHeight()); */el_height=t396_elem__getHeight(el);value = el_container_height - el_height + value;} }return(value);}function t396_ab__setFieldValue(ab,prop,val,res){/* tn_console('func: ab__setFieldValue '+prop+'='+val);*/if(res=='')res=window.tn.curResolution;if(res<1200){ab.attr('data-artboard-'+prop+'-res-'+res,val);}else{ab.attr('data-artboard-'+prop,val);}}function t396_ab__getFieldValue(ab,prop){var res=window.tn.curResolution;var r;if(res<1200){if(res==960){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}if(res==640){r=ab.attr('data-artboard-'+prop+'-res-640');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}}if(res==480){r=ab.attr('data-artboard-'+prop+'-res-480');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-640');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}}}if(res==320){r=ab.attr('data-artboard-'+prop+'-res-320');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-480');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-640');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}}}}}else{r=ab.attr('data-artboard-'+prop);}return(r);}function t396_ab__renderViewOneField(ab,field){var value=t396_ab__getFieldValue(ab,field);}function t396_allelems__renderView(ab){tn_console('func: allelems__renderView: abid:'+ab.attr('data-artboard-recid'));ab.find(".tn-elem").each(function() {t396_elem__renderView($(this));});}function t396_ab__filterUpdate(ab){var filter=ab.find('.t396__filter');var c1=filter.attr('data-filtercolor-rgb');var c2=filter.attr('data-filtercolor2-rgb');var o1=filter.attr('data-filteropacity');var o2=filter.attr('data-filteropacity2');if((typeof c2=='undefined' || c2=='') && (typeof c1!='undefined' && c1!='')){filter.css("background-color", "rgba("+c1+","+o1+")");}else if((typeof c1=='undefined' || c1=='') && (typeof c2!='undefined' && c2!='')){filter.css("background-color", "rgba("+c2+","+o2+")");}else if(typeof c1!='undefined' && typeof c2!='undefined' && c1!='' && c2!=''){filter.css({background: "-webkit-gradient(linear, left top, left bottom, from(rgba("+c1+","+o1+")), to(rgba("+c2+","+o2+")) )" });}else{filter.css("background-color", 'transparent');}}function t396_ab__getHeight(ab, ab_height){if(typeof ab_height=='undefined')ab_height=t396_ab__getFieldValue(ab,'height');ab_height=parseFloat(ab_height);/* get Artboard height (fluid or px) */var ab_height_vh=t396_ab__getFieldValue(ab,'height_vh');if(ab_height_vh!=''){ab_height_vh=parseFloat(ab_height_vh);if(isNaN(ab_height_vh)===false){var ab_height_vh_px=parseFloat( window.tn.window_height * parseFloat(ab_height_vh/100) );if( ab_height < ab_height_vh_px ){ab_height=ab_height_vh_px;}}} return(ab_height);} function t396_hex2rgb(hexStr){/*note: hexStr should be #rrggbb */var hex = parseInt(hexStr.substring(1), 16);var r = (hex & 0xff0000) >> 16;var g = (hex & 0x00ff00) >> 8;var b = hex & 0x0000ff;return [r, g, b];}String.prototype.t396_replaceAll = function(search, replacement) {var target = this;return target.replace(new RegExp(search, 'g'), replacement);};function t396_elem__getWidth(el,value){if(typeof value=='undefined')value=parseFloat( t396_elem__getFieldValue(el,'width') );var el_widthunits=t396_elem__getFieldValue(el,'widthunits');if(el_widthunits=='%'){var el_container=t396_elem__getFieldValue(el,'container');if(el_container=='window'){value=parseFloat( window.tn.window_width * parseFloat( parseInt(value)/100 ) );}else{value=parseFloat( window.tn.grid_width * parseFloat( parseInt(value)/100 ) );}}return(value);}function t396_elem__getHeight(el,value){if(typeof value=='undefined')value=t396_elem__getFieldValue(el,'height');value=parseFloat(value);if(el.attr('data-elem-type')=='shape' || el.attr('data-elem-type')=='video' || el.attr('data-elem-type')=='html' || el.attr('data-elem-type')=='gallery'){var el_heightunits=t396_elem__getFieldValue(el,'heightunits');if(el_heightunits=='%'){var ab=el.parent();var ab_min_height=parseFloat( ab.attr('data-artboard-proxy-min-height') );var ab_max_height=parseFloat( ab.attr('data-artboard-proxy-max-height') );var el_container=t396_elem__getFieldValue(el,'container');if(el_container=='window'){value=parseFloat( ab_max_height * parseFloat( value/100 ) );}else{value=parseFloat( ab_min_height * parseFloat( value/100 ) );}}}else if(el.attr('data-elem-type')=='button'){value = value;}else{value =parseFloat(el.innerHeight());}return(value);}function t396_roundFloat(n){n = Math.round(n * 100) / 100;return(n);}function tn_console(str){if(window.tn_comments==1)console.log(str);}function t396_setUpTooltip_desktop(el, pinEl, tipEl) {var timer;pinEl.mouseover(function() {/*if any other tooltip is waiting its timeout to be hided — hide it*/$('.tn-atom__tip_visible').each(function(){var thisTipEl = $(this).parents('.t396__elem');if (thisTipEl.attr('data-elem-id') != el.attr('data-elem-id')) {t396_hideTooltip(thisTipEl, $(this));}});clearTimeout(timer);if (tipEl.css('display') == 'block') {return;}t396_showTooltip(el, tipEl);});pinEl.mouseout(function() {timer = setTimeout(function() {t396_hideTooltip(el, tipEl);}, 300);})}function t396_setUpTooltip_mobile(el,pinEl,tipEl) {pinEl.on('click', function(e) {if (tipEl.css('display') == 'block' && $(e.target).hasClass("tn-atom__pin")) {t396_hideTooltip(el,tipEl);} else {t396_showTooltip(el,tipEl);}});var id = el.attr("data-elem-id");$(document).click(function(e) {var isInsideTooltip = ($(e.target).hasClass("tn-atom__pin") || $(e.target).parents(".tn-atom__pin").length > 0);if (isInsideTooltip) {var clickedPinId = $(e.target).parents(".t396__elem").attr("data-elem-id");if (clickedPinId == id) {return;}}t396_hideTooltip(el,tipEl);})}function t396_hideTooltip(el, tipEl) {tipEl.css('display', '');tipEl.css({"left": "","transform": "","right": ""});tipEl.removeClass('tn-atom__tip_visible');el.css('z-index', '');}function t396_showTooltip(el, tipEl) {var pos = el.attr("data-field-tipposition-value");if (typeof pos == 'undefined' || pos == '') {pos = 'top';};var elSize = el.height();var elTop = el.offset().top;var elBottom = elTop + elSize;var elLeft = el.offset().left;var elRight = el.offset().left + elSize;var winTop = $(window).scrollTop();var winWidth = $(window).width();var winBottom = winTop + $(window).height();var tipElHeight = tipEl.outerHeight();var tipElWidth = tipEl.outerWidth();var padd=15;if (pos == 'right' || pos == 'left') {var tipElRight = elRight + padd + tipElWidth;var tipElLeft = elLeft - padd - tipElWidth;if ((pos == 'right' && tipElRight > winWidth) || (pos == 'left' && tipElLeft < 0)) {pos = 'top';}}if (pos == 'top' || pos == 'bottom') {var tipElRight = elRight + (tipElWidth / 2 - elSize / 2);var tipElLeft = elLeft - (tipElWidth / 2 - elSize / 2);if (tipElRight > winWidth) {var rightOffset = -(winWidth - elRight - padd);tipEl.css({"left": "auto","transform": "none","right": rightOffset + "px"});}if (tipElLeft < 0) {var leftOffset = -(elLeft - padd);tipEl.css({"left": leftOffset + "px","transform": "none"});}}if (pos == 'top') {var tipElTop = elTop - padd - tipElHeight;if (winTop > tipElTop) {pos = 'bottom';}}if (pos == 'bottom') {var tipElBottom = elBottom + padd + tipElHeight;if (winBottom < tipElBottom) {pos = 'top';}}tipEl.attr('data-tip-pos', pos);tipEl.css('display', 'block');tipEl.addClass('tn-atom__tip_visible');el.css('z-index', '1000');}function t396_hex2rgba(hexStr, opacity){var hex = parseInt(hexStr.substring(1), 16);var r = (hex & 0xff0000) >> 16;var g = (hex & 0x00ff00) >> 8;var b = hex & 0x0000ff;return [r, g, b, parseFloat(opacity)];} 
 
function t397_init(recid) {
    var el = $('#rec' + recid);
    el.find('.t397__tab').click(function() {
        el.find('.t397__tab').removeClass('t397__tab_active');
        $(this).addClass('t397__tab_active');
        t397_alltabs_updateContent(recid);
        t397_updateSelect(recid);
        $('.t230, .t670, .t347, .t346, .t519, .t774, .t764, .t744, .t349, .t650, .t604, .t117, .t517, .t609, .t351, .t353, .t341, .t404, .t385, .t386, .t412, .t268, .t425, .t409, .t384, .t279, .t428, .t418, .t433, .t121, .t478, .t498, .t552, .t544, .t554, .t545, .t486, .t570, .t422, .t601, .t228, .t229, .t456, .t592, .t520, .t599, .t422, .t504, .t688, .t675, .t132, .t616, .t686, .t778, .t615, .t433, .t598, .t762, .t538, .t226, .t698, .t760, .t511, .t799, .t780, .t827, .t740, .t480, .t827, .t829, .t605, .t726, .t728, .t822, .t798, .t801, .t694, .t842, .t843, .t849, .t850, .t851, .t856, .t858, .t859, .t860, .t396, .t518, .t738, .t532, .t431, .t700, .t223, .t539, .t577, .t754, .t776, .t-feed, .t-store, .t477, .t923, .t902, .t734').trigger('displayChanged');
        setTimeout(function() {
            $('.t351, .t353, .t341, .t404, .t385, .t386, .t412, .t268, .t425, .t409, .t384, .t279, .t428, .t433, .t545, .t422, .t410, .t829, .t396, .t738').trigger('displayChanged')
        }, 50);
        t397_startUpdateLazyLoad($(this));
        if (window.lazy == 'y') {
            t_lazyload_update()
        }
    });
    t397_alltabs_updateContent(recid);
    t397_updateContentBySelect(recid);
    $('.t397').bind('displayChanged',function(){
        t397_alltabs_updateContent(recid);
        t397_updateContentBySelect(recid);
    });
    var bgcolor = el.css("background-color");
    var bgcolor_target = el.find(".t397__select, .t397__firefoxfix");
    bgcolor_target.css("background-color", bgcolor)
}

function t397_alltabs_updateContent(recid){
    var el = $('#rec' + recid);
    el.find(".t397__tab").each(function(i) {
        var rec_ids = $(this).attr('data-tab-rec-ids').split(',');
        rec_ids.forEach(function(rec_id, i, arr) {
            var rec_el = $('#rec' + rec_id);
            rec_el.attr('data-connect-with-tab', 'yes');
            rec_el.attr('data-animationappear', 'off');
            rec_el.addClass('t379__off')
        })
    });    
    el.find(".t397__tab_active").each(function(i) {
        if ($(this).is(":visible") || el.find(".t397__select").is(":visible")) {
            var rec_ids = $(this).attr('data-tab-rec-ids').split(',');
            rec_ids.forEach(function(rec_id, i, arr) {
                var rec_el = $('#rec' + rec_id);
                rec_el.removeClass('t379__off');
                rec_el.css('opacity', '')
            })
        }
    });
}

function t397_updateContentBySelect(recid) {
    var el = $('#rec' + recid);
    el.find(".t397__select").change(function() {
        var select_val = el.find(".t397__select").val();
        var tab_index = el.find(".t397__tab[data-tab-rec-ids='" + select_val + "']");
        tab_index.trigger('click')
    })
}

function t397_updateSelect(recid) {
    var el = $('#rec' + recid);
    var current_tab = el.find(".t397__tab_active").attr('data-tab-rec-ids');
    var el_select = el.find(".t397__select");
    el_select.val(current_tab)
}

function t397_startUpdateLazyLoad($this) {
    var rec_ids = $this.attr('data-tab-rec-ids').split(',');
    rec_ids.forEach(function(rec_id, i, arr) {
	  var rec_el=$('#rec'+rec_id);

      var video = rec_el.find('.t-video-lazyload');
      if (video.length > 0) {
          t397_updateVideoLazyLoad(video);
      }
	});
}

function t397_updateVideoLazyLoad(video) {
    setTimeout(function() {
        video.each(function() {
            var div = $(this);

            if (!div.hasClass('t-video__isload')) {

                var height = div.attr('data-videolazy-height') ? $(this).attr('data-videolazy-height') : '100%';
                if (height.indexOf('vh') != -1) {
                    height = '100%';
                }

                var videoId = div.attr('data-videolazy-id').trim();
                var blockId = div.attr('data-blocklazy-id') || '';
                if (typeof div.attr('data-videolazy-two-id') != 'undefined') {
                  var videoTwoId = '_' + div.attr('data-videolazy-two-id') + '_';
                } else {
                  var videoTwoId = '';
                }

                if (div.attr('data-videolazy-type') == 'youtube') {
                    div.find('iframe').remove();
                    div.prepend('<iframe id="youtubeiframe' + videoTwoId + blockId + '" width="100%" height="' + height + '" src="//www.youtube.com/embed/' + videoId + '?rel=0&fmt=18&html5=1&showinfo=0" frameborder="0" allowfullscreen></iframe>');
                }
            }

            div.addClass('t-video__isload');
        });
    }, 0);
}
 
function t456_setListMagin(recid,imglogo){
	if($(window).width()>980){		
        var t456__menu = $('#rec'+recid+' .t456');        
        var t456__leftpart=t456__menu.find('.t456__leftwrapper');
        var t456__listpart=t456__menu.find('.t456__list');		
		if (imglogo){
			t456__listpart.css("margin-right",t456__leftpart.width());
		} else {
			t456__listpart.css("margin-right",t456__leftpart.width()+30);        
		}		        
	}
}

function t456_highlight(){
  var url=window.location.href;
  var pathname=window.location.pathname;
  if(url.substr(url.length - 1) == "/"){ url = url.slice(0,-1); }
  if(pathname.substr(pathname.length - 1) == "/"){ pathname = pathname.slice(0,-1); }
  if(pathname.charAt(0) == "/"){ pathname = pathname.slice(1); }
  if(pathname == ""){ pathname = "/"; }
  $(".t456__list_item a[href='"+url+"']").addClass("t-active");
  $(".t456__list_item a[href='"+url+"/']").addClass("t-active");
  $(".t456__list_item a[href='"+pathname+"']").addClass("t-active");
  $(".t456__list_item a[href='/"+pathname+"']").addClass("t-active");
  $(".t456__list_item a[href='"+pathname+"/']").addClass("t-active");
  $(".t456__list_item a[href='/"+pathname+"/']").addClass("t-active");
}


function t456_checkAnchorLinks(recid) {
    if ($(window).width() >= 960) {
        var t456_navLinks = $("#rec" + recid + " .t456__list_item a:not(.tooltipstered)[href*='#']");
        if (t456_navLinks.length > 0) {
            t456_catchScroll(t456_navLinks);
        }
    }
}

function t456_catchScroll(t456_navLinks) {
    var t456_clickedSectionId = null,
        t456_sections = new Array(),
        t456_sectionIdTonavigationLink = [],
        t456_interval = 100,
        t456_lastCall, t456_timeoutId;
    t456_navLinks = $(t456_navLinks.get().reverse());
    t456_navLinks.each(function() {
        var t456_cursection = t456_getSectionByHref($(this));
        if (typeof t456_cursection.attr("id") != "undefined") {
            t456_sections.push(t456_cursection);
        }
        t456_sectionIdTonavigationLink[t456_cursection.attr("id")] = $(this);
    });

		$(window).bind('resize', t_throttle(function(){t456_updateSectionsOffsets(t456_sections);}, 200));
		$('.t456').bind('displayChanged',function(){t456_updateSectionsOffsets(t456_sections);});
		setInterval(function(){t456_updateSectionsOffsets(t456_sections);},5000);
    setTimeout(function(){
			t456_updateSectionsOffsets(t456_sections);
			t456_highlightNavLinks(t456_navLinks, t456_sections, t456_sectionIdTonavigationLink, t456_clickedSectionId);
		},1000);

    t456_navLinks.click(function() {
        if (!$(this).hasClass("tooltipstered")) {
            t456_navLinks.removeClass('t-active');
            t456_sectionIdTonavigationLink[t456_getSectionByHref($(this)).attr("id")].addClass('t-active');
            t456_clickedSectionId = t456_getSectionByHref($(this)).attr("id");
        }
    });
    $(window).scroll(function() {
        var t456_now = new Date().getTime();
        if (t456_lastCall && t456_now < (t456_lastCall + t456_interval)) {
            clearTimeout(t456_timeoutId);
            t456_timeoutId = setTimeout(function() {
                t456_lastCall = t456_now;
                t456_clickedSectionId = t456_highlightNavLinks(t456_navLinks, t456_sections, t456_sectionIdTonavigationLink, t456_clickedSectionId);
            }, t456_interval - (t456_now - t456_lastCall));
        } else {
            t456_lastCall = t456_now;
            t456_clickedSectionId = t456_highlightNavLinks(t456_navLinks, t456_sections, t456_sectionIdTonavigationLink, t456_clickedSectionId);
        }
    });
}


function t456_updateSectionsOffsets(sections){
	$(sections).each(function(){
		var t456_curSection = $(this);
		t456_curSection.attr("data-offset-top",t456_curSection.offset().top);
	});
}


function t456_getSectionByHref(curlink) {
    var t456_curLinkValue = curlink.attr("href").replace(/\s+/g, '');
    if (curlink.is('[href*="#rec"]')) {
        return $(".r[id='" + t456_curLinkValue.substring(1) + "']");
    } else {
        return $(".r[data-record-type='215']").has("a[name='" + t456_curLinkValue.substring(1) + "']");
    }
}

function t456_highlightNavLinks(t456_navLinks, t456_sections, t456_sectionIdTonavigationLink, t456_clickedSectionId) {
    var t456_scrollPosition = $(window).scrollTop(),
        t456_valueToReturn = t456_clickedSectionId;
    /*if first section is not at the page top (under first blocks)*/
    if (t456_sections.length != 0 && t456_clickedSectionId == null && t456_sections[t456_sections.length-1].attr("data-offset-top") > (t456_scrollPosition + 300)){
      t456_navLinks.removeClass('t-active');
      return null;
    }

    $(t456_sections).each(function(e) {
        var t456_curSection = $(this),
            t456_sectionTop = t456_curSection.attr("data-offset-top"),
            t456_id = t456_curSection.attr('id'),
            t456_navLink = t456_sectionIdTonavigationLink[t456_id];
        if (((t456_scrollPosition + 300) >= t456_sectionTop) || (t456_sections[0].attr("id") == t456_id && t456_scrollPosition >= $(document).height() - $(window).height())) {
            if (t456_clickedSectionId == null && !t456_navLink.hasClass('t-active')) {
                t456_navLinks.removeClass('t-active');
                t456_navLink.addClass('t-active');
                t456_valueToReturn = null;
            } else {
                if (t456_clickedSectionId != null && t456_id == t456_clickedSectionId) {
                    t456_valueToReturn = null;
                }
            }
            return false;
        }
    });
    return t456_valueToReturn;
}

function t456_setPath(){
}

function t456_setBg(recid){
  var window_width=$(window).width();
  if(window_width>980){
    $(".t456").each(function() {
      var el=$(this);
      if(el.attr('data-bgcolor-setbyscript')=="yes"){
        var bgcolor=el.attr("data-bgcolor-rgba");
        el.css("background-color",bgcolor);
      }
      });
      }else{
        $(".t456").each(function() {
          var el=$(this);
          var bgcolor=el.attr("data-bgcolor-hex");
          el.css("background-color",bgcolor);
          el.attr("data-bgcolor-setbyscript","yes");
      });
  }
}

function t456_appearMenu(recid) {
      var window_width=$(window).width();
      if(window_width>980){
           $(".t456").each(function() {
                  var el=$(this);
                  var appearoffset=el.attr("data-appearoffset");
                  if(appearoffset!=""){
                          if(appearoffset.indexOf('vh') > -1){
                              appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)));
                          }

                          appearoffset=parseInt(appearoffset, 10);

                          if ($(window).scrollTop() >= appearoffset) {
                            if(el.css('visibility') == 'hidden'){
                                el.finish();
                                el.css("top","-50px");
                                el.css("visibility","visible");
                                el.animate({"opacity": "1","top": "0px"}, 200,function() {
                                });
                            }
                          }else{
                            el.stop();
                            el.css("visibility","hidden");
                          }
                  }
           });
      }

}

function t456_changebgopacitymenu(recid) {
  var window_width=$(window).width();
  if(window_width>980){
    $(".t456").each(function() {
      var el=$(this);
      var bgcolor=el.attr("data-bgcolor-rgba");
      var bgcolor_afterscroll=el.attr("data-bgcolor-rgba-afterscroll");
      var bgopacityone=el.attr("data-bgopacity");
      var bgopacitytwo=el.attr("data-bgopacity-two");
      var menushadow=el.attr("data-menushadow");
      if(menushadow=='100'){
        var menushadowvalue=menushadow;
      }else{
        var menushadowvalue='0.'+menushadow;
      }
      if ($(window).scrollTop() > 20) {
        el.css("background-color",bgcolor_afterscroll);
        if(bgopacitytwo=='0' || menushadow==' '){
          el.css("box-shadow","none");
        }else{
          el.css("box-shadow","0px 1px 3px rgba(0,0,0,"+ menushadowvalue +")");
        }
      }else{
        el.css("background-color",bgcolor);
        if(bgopacityone=='0.0' || menushadow==' '){
          el.css("box-shadow","none");
        }else{
          el.css("box-shadow","0px 1px 3px rgba(0,0,0,"+ menushadowvalue +")");
        }
      }
    });
  }
}

function t456_createMobileMenu(recid){
  var window_width=$(window).width(),
      el=$("#rec"+recid),
      menu=el.find(".t456"),
      burger=el.find(".t456__mobile");
  burger.click(function(e){
    menu.fadeToggle(300);
    $(this).toggleClass("t456_opened")
  });
  $(window).bind('resize', t_throttle(function(){
    window_width=$(window).width();
    if(window_width>980){
      menu.fadeIn(0);
    }
  }, 200));
} 
function t527_setHeight(recid) {
  var t527__el=$("#rec"+recid),
      t527__image = t527__el.find(".t527__bgimg:first"),
      t527__width = t527__image.attr("data-image-width"),
      t527__height = t527__image.attr("data-image-height"),
      t527__ratio = t527__height/t527__width,
      t527__padding = t527__ratio*100;	  
  $("#rec"+recid+" .t527__bgimg").css("padding-bottom",t527__padding+"%");  
} 
function t690_onSuccess(t690_form){
	var t690_inputsWrapper = t690_form.find('.t-form__inputsbox');
    var t690_inputsHeight = t690_inputsWrapper.height();
    var t690_inputsOffset = t690_inputsWrapper.offset().top;
    var t690_inputsBottom = t690_inputsHeight + t690_inputsOffset;
	var t690_targetOffset = t690_form.find('.t-form__successbox').offset().top;

    if ($(window).width()>960) {
        var t690_target = t690_targetOffset - 200;
    }	else {
        var t690_target = t690_targetOffset - 100;
    }

    if (t690_targetOffset > $(window).scrollTop() || ($(document).height() - t690_inputsBottom) < ($(window).height()-100)) {
        t690_inputsWrapper.addClass('t690__inputsbox_hidden');
		setTimeout(function(){
			if ($(window).height() > $('.t-body').height()) {$('.t-tildalabel').animate({ opacity:0 }, 50);}
		}, 300);                                                                                                                           
    } else {
        $('html, body').animate({ scrollTop: t690_target}, 400);
        setTimeout(function(){t690_inputsWrapper.addClass('t690__inputsbox_hidden');}, 400);
    }
                                                                                                                           
	var successurl = t690_form.data('success-url');
    if(successurl && successurl.length > 0) {
        setTimeout(function(){
            window.location.href= successurl;
        },500);
    }
                                                                                                                           
} 
function t696_onSuccess(t696_form){
	var t696_inputsWrapper = t696_form.find('.t-form__inputsbox');
    var t696_inputsHeight = t696_inputsWrapper.height();
    var t696_inputsOffset = t696_inputsWrapper.offset().top;
    var t696_inputsBottom = t696_inputsHeight + t696_inputsOffset;
	var t696_targetOffset = t696_form.find('.t-form__successbox').offset().top;

    if ($(window).width()>960) {
        var t696_target = t696_targetOffset - 200;
    }	else {
        var t696_target = t696_targetOffset - 100;
    }

    if (t696_targetOffset > $(window).scrollTop() || ($(document).height() - t696_inputsBottom) < ($(window).height() - 100)) {
        t696_inputsWrapper.addClass('t696__inputsbox_hidden');
		setTimeout(function(){
			if ($(window).height() > $('.t-body').height()) {$('.t-tildalabel').animate({ opacity:0 }, 50);}
		}, 300);		
    } else {
        $('html, body').animate({ scrollTop: t696_target}, 400);
        setTimeout(function(){t696_inputsWrapper.addClass('t696__inputsbox_hidden');}, 400);
    }

	var successurl = t696_form.data('success-url');
    if(successurl && successurl.length > 0) {
        setTimeout(function(){
            window.location.href= successurl;
        },500);
    }

} 
function t702_initPopup(recid){
  $('#rec'+recid).attr('data-animationappear','off');
  $('#rec'+recid).css('opacity','1');
  var el=$('#rec'+recid).find('.t-popup'),
      hook=el.attr('data-tooltip-hook'),
      analitics=el.attr('data-track-popup');
  if(hook!==''){
    $('.r').on('click', 'a[href="' + hook + '"]', function(e) {
      t702_showPopup(recid);
      t702_resizePopup(recid);
      e.preventDefault();
      if(window.lazy=='y'){t_lazyload_update();}
      if (analitics > '') {
        var virtTitle = hook;
        if (virtTitle.substring(0,7) == '#popup:') {
            virtTitle = virtTitle.substring(7);
        }
        Tilda.sendEventToStatistics(analitics, virtTitle);
      }
    });
  }
}

function t702_onSuccess(t702_form){
	var t702_inputsWrapper = t702_form.find('.t-form__inputsbox');
    var t702_inputsHeight = t702_inputsWrapper.height();
    var t702_inputsOffset = t702_inputsWrapper.offset().top;
    var t702_inputsBottom = t702_inputsHeight + t702_inputsOffset;
	var t702_targetOffset = t702_form.find('.t-form__successbox').offset().top;

    if ($(window).width()>960) {
        var t702_target = t702_targetOffset - 200;
    }	else {
        var t702_target = t702_targetOffset - 100;
    }

    if (t702_targetOffset > $(window).scrollTop() || ($(document).height() - t702_inputsBottom) < ($(window).height() - 100)) {
        t702_inputsWrapper.addClass('t702__inputsbox_hidden');
		setTimeout(function(){
			if ($(window).height() > $('.t-body').height()) {$('.t-tildalabel').animate({ opacity:0 }, 50);}
		}, 300);
    } else {
        $('html, body').animate({ scrollTop: t702_target}, 400);
        setTimeout(function(){t702_inputsWrapper.addClass('t702__inputsbox_hidden');}, 400);
    }

	var successurl = t702_form.data('success-url');
    if(successurl && successurl.length > 0) {
        setTimeout(function(){
            window.location.href= successurl;
        },500);
    }

}


function t702_lockScroll(){
  var body = $("body");
	if (!body.hasClass('t-body_scroll-locked')) {
		var bodyScrollTop = (typeof window.pageYOffset !== 'undefined') ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
		body.addClass('t-body_scroll-locked');
		body.css("top","-"+bodyScrollTop+"px");
    body.attr("data-popup-scrolltop",bodyScrollTop);
	}
}

function t702_unlockScroll(){
  var body = $("body");
	if (body.hasClass('t-body_scroll-locked')) {
    var bodyScrollTop = $("body").attr("data-popup-scrolltop");
		body.removeClass('t-body_scroll-locked');
		body.css("top","");
    body.removeAttr("data-popup-scrolltop")
		window.scrollTo(0, bodyScrollTop);
	}
}


function t702_showPopup(recid){
  var el=$('#rec'+recid),
      popup = el.find('.t-popup');

  popup.css('display', 'block');
  el.find('.t-range').trigger('popupOpened');
  if(window.lazy=='y'){t_lazyload_update();}
  setTimeout(function() {
    popup.find('.t-popup__container').addClass('t-popup__container-animated');
    popup.addClass('t-popup_show');
  }, 50);

  $('body').addClass('t-body_popupshowed t702__body_popupshowed');
  /*fix IOS11 cursor bug + general IOS background scroll*/
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream) {
    setTimeout(function() {
      t702_lockScroll();
    }, 500);
  }
  el.find('.t-popup').mousedown(function(e){
    var windowWidth = $(window).width();
    var maxScrollBarWidth = 17;
    var windowWithoutScrollBar = windowWidth - maxScrollBarWidth;
    if(e.clientX > windowWithoutScrollBar) {
        return;
    }  
    if (e.target == this) { t702_closePopup(recid); }
  });

  el.find('.t-popup__close').click(function(e){
    t702_closePopup(recid);
  });

  el.find('a[href*="#"]').click(function(e){
    var url = $(this).attr('href');
    if (!url || url.substring(0,7) != '#price:') {
      t702_closePopup(recid);
      if (!url || url.substring(0,7) == '#popup:') {
        setTimeout(function() {
          $('body').addClass('t-body_popupshowed');
        }, 300);
      }
    }
  });

  $(document).keydown(function(e) {
    if (e.keyCode == 27) { t702_closePopup(recid); }
  });
}

function t702_closePopup(recid){
    $('body').removeClass('t-body_popupshowed t702__body_popupshowed');
    $('#rec' + recid + ' .t-popup').removeClass('t-popup_show');
  /*fix IOS11 cursor bug + general IOS background scroll*/
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream) {
    t702_unlockScroll();
  }  
  setTimeout(function() {
    $('.t-popup').not('.t-popup_show').css('display', 'none');
  }, 300);
}

function t702_resizePopup(recid){
  var el = $("#rec"+recid),
      div = el.find(".t-popup__container").height(),
      win = $(window).height() - 120,
      popup = el.find(".t-popup__container");
  if (div > win ) {
    popup.addClass('t-popup__container-static');
  } else {
    popup.removeClass('t-popup__container-static');
  }
}
/* deprecated */
function t702_sendPopupEventToStatistics(popupname) {
  var virtPage = '/tilda/popup/';
  var virtTitle = 'Popup: ';
  if (popupname.substring(0,7) == '#popup:') {
      popupname = popupname.substring(7);
  }

  virtPage += popupname;
  virtTitle += popupname;
  if (window.Tilda && typeof Tilda.sendEventToStatistics == 'function') {
    Tilda.sendEventToStatistics(virtPage, virtTitle, '', 0);
  } else {
    if(ga) {
      if (window.mainTracker != 'tilda') {
        ga('send', {'hitType':'pageview', 'page':virtPage,'title':virtTitle});
      }
    }

    if (window.mainMetrika > '' && window[window.mainMetrika]) {
      window[window.mainMetrika].hit(virtPage, {title: virtTitle,referer: window.location.href});
    }
  }
} 
function t706_onSuccessCallback(t706_form){
 /*if (typeof localStorage === 'object') {
	try {
	  localStorage.removeItem("tcart");
	} catch (e) {
	  console.log('Your web browser does not support localStorage.');
	}
 }		
 delete window.tcart;
 tcart__loadLocalObj();*/
 $( ".t706__cartwin-products" ).slideUp( 10, function() {	
 });
 $( ".t706__cartwin-bottom" ).slideUp( 10, function() {	
 });
 $( ".t706 .t-form__inputsbox" ).slideUp( 700, function() {	
 });
 /*window.tcart_success='yes';*/
 try {
	/*fix IOS11 cursor bug + general IOS background scroll*/
	tcart__unlockScroll();
 } catch (e) {}
} 
function t724_init(recid) {
    try {
        localStorage.setItem('localStorageTest', 1);
        localStorage.removeItem('localStorageTest');
    } catch (e) { return; }
    if (window.$isMobile) { return; }
    var el = $('#rec'+recid).find('.t724__opener');
    var name = el.attr('data-cookie-name');
    var time = el.attr('data-cookie-time')*24*60*60*1000;
    var html = document.documentElement;
    var lstorage = sessionStorage.getItem(name);
    $('html').on('mouseleave', function(e){
        if (e.clientY > 10) { return; }
        var curDate = Math.floor(Date.now());
        if (time==0){
            lstorage = sessionStorage.getItem(name);
        } else {
            lstorage = localStorage.getItem(name);
        }
        if (((lstorage==null || typeof lstorage=='undefined') && !el.hasClass('t724__opener_activated')) || (lstorage<(curDate-time) && time>0)) {
            el.trigger('click');
            el.addClass('t724__opener_activated');
            if (time==0){ sessionStorage.setItem(name, curDate); }
            if (time>0) { localStorage.setItem(name, curDate); }
        }
    });

}
 
function t744_init(recid){
  t_sldsInit(recid);

  setTimeout(function(){
    t_prod__init(recid);
    t744__hoverZoom_init(recid);
  }, 500);

  $('#rec'+recid).find('.t744').bind('displayChanged',function(){
      t744_updateSlider(recid);
  });
}

function t744__hoverZoom_init(recid) {
    if(isMobile) {
        return;
    }
    var rec = $('#rec'+recid);
    try {
        if (rec.find('[data-hover-zoom]')[0]) {
            if (!jQuery.cachedZoomScript) {
                jQuery.cachedZoomScript = function(url) {
                    var options = {
                        dataType: 'script',
                        cache: true,
                        url: url
                    };
                    return jQuery.ajax(options);
                };
            }
            $.cachedZoomScript(
                'https://static.tildacdn.com/js/tilda-hover-zoom-1.0.min.js'
            ).done(function(script, textStatus) {
                if (textStatus == 'success') {
                    setTimeout(function() {
                        t_hoverZoom_init(recid, ".t-slds__container");
                    }, 500);
                } else {
                    console.log('Upload script error: ' + textStatus);
                }
            });
        }
    } catch (e) {
        console.log('Zoom image init error: ' + e.message);
    } 
}

function t744_updateSlider(recid){
  var el=$('#rec'+recid);
  t_slds_SliderWidth(recid);
  sliderWrapper = el.find('.t-slds__items-wrapper');
  sliderWidth = el.find('.t-slds__container').width();
  pos = parseFloat(sliderWrapper.attr('data-slider-pos'));
  sliderWrapper.css({
      transform: 'translate3d(-' + (sliderWidth * pos) + 'px, 0, 0)'
  });
  t_slds_UpdateSliderHeight(recid);
  t_slds_UpdateSliderArrowsHeight(recid);
} 
function t750_init(recid){
  t_sldsInit(recid);

  setTimeout(function(){
    t_prod__init(recid);
    t750_initPopup(recid);
  }, 500);
}

function t750_initPopup(recid){
  $('#rec'+recid).attr('data-animationappear','off');
  $('#rec'+recid).css('opacity','1');
  var el=$('#rec'+recid).find('.t-popup'),
      hook=el.attr('data-tooltip-hook'),
      analitics=el.attr('data-track-popup');
  if(hook!==''){
    $('.r').on('click', 'a[href="' + hook + '"]', function(e) {
      t750_showPopup(recid);
      e.preventDefault();
      if(window.lazy=='y'){t_lazyload_update();}
      if (analitics > '') {
        var virtTitle = hook;
        if (virtTitle.substring(0,7) == '#popup:') {
            virtTitle = virtTitle.substring(7);
        }
        Tilda.sendEventToStatistics(analitics, virtTitle);
      }

    });
  }
}

function t750_showPopup(recid){
  var el=$('#rec'+recid),
      popup = el.find('.t-popup'),
      sliderWrapper = el.find('.t-slds__items-wrapper'),
      sliderWidth = el.find('.t-slds__container').width(),
      pos = parseFloat(sliderWrapper.attr('data-slider-pos'));

  popup.css('display', 'block');
  setTimeout(function() {
    popup.find('.t-popup__container').addClass('t-popup__container-animated');
    popup.addClass('t-popup_show');
    t_slds_SliderWidth(recid);
    sliderWrapper = el.find('.t-slds__items-wrapper');
    sliderWidth = el.find('.t-slds__container').width();
    pos = parseFloat(sliderWrapper.attr('data-slider-pos'));
    sliderWrapper.css({
        transform: 'translate3d(-' + (sliderWidth * pos) + 'px, 0, 0)'
    });
    t_slds_UpdateSliderHeight(recid);
    t_slds_UpdateSliderArrowsHeight(recid);
    if(window.lazy=='y'){t_lazyload_update();}
  }, 50);

  $('body').addClass('t-body_popupshowed');

  el.find('.t-popup').mousedown(function(e){
    var windowWidth = $(window).width();
    var maxScrollBarWidth = 17;
    var windowWithoutScrollBar = windowWidth - maxScrollBarWidth;
    if(e.clientX > windowWithoutScrollBar) {
        return;
    }
    if (e.target == this) {
      t750_closePopup();
    }
  });

  el.find('.t-popup__close, .t750__close-text').click(function(e){
    t750_closePopup();
  });

  $(document).keydown(function(e) {
    if (e.keyCode == 27) {
      t750_closePopup();
    }
  });
}

function t750_closePopup(){
  $('body').removeClass('t-body_popupshowed');
  $('.t-popup').removeClass('t-popup_show');
  setTimeout(function() {
    $('.t-popup').not('.t-popup_show').css('display', 'none');
  }, 300);
}
/*deprecated*/
function t750_sendPopupEventToStatistics(popupname) {
  var virtPage = '/tilda/popup/';
  var virtTitle = 'Popup: ';
  if (popupname.substring(0,7) == '#popup:') {
      popupname = popupname.substring(7);
  }

  virtPage += popupname;
  virtTitle += popupname;

  if(ga) {
    if (window.mainTracker != 'tilda') {
      ga('send', {'hitType':'pageview', 'page':virtPage,'title':virtTitle});
    }
  }

  if (window.mainMetrika > '' && window[window.mainMetrika]) {
    window[window.mainMetrika].hit(virtPage, {title: virtTitle,referer: window.location.href});
  }
}
 
function t774_init(recid){
  t774_unifyHeights(recid);

  $(window).bind('resize', t_throttle(function(){t774_unifyHeights(recid)}, 200));

  $(".t774").bind("displayChanged",function(){
    t774_unifyHeights(recid);
  });
  
    $(window).load(function() {
        t774_unifyHeights(recid);
    });  
    
    setTimeout(function(){
      t774__updateLazyLoad(recid);
    }, 500);    
}


function t774__updateLazyLoad(recid) {
  var scrollContainer = $("#rec"+recid+" .t774__container_mobile-flex");
  var curMode = $(".t-records").attr("data-tilda-mode");
  if (scrollContainer.length && curMode!="edit" && curMode!="preview" && window.lazy === "y") {
    scrollContainer.bind('scroll', t_throttle(function() {
        t_lazyload_update();
    }, 500));
  }
}


function t774_unifyHeights(recid){
    var t774_el = $('#rec'+recid),
        t774_blocksPerRow = t774_el.find(".t774__container").attr("data-blocks-per-row"),
        t774_cols = t774_el.find(".t774__content"),
		t774_mobScroll = t774_el.find(".t774__scroll-icon-wrapper").length;

	if($(window).width()<=480 && t774_mobScroll==0){
		t774_cols.css("height","auto");
		return;
	}

   	var t774_perRow = +t774_blocksPerRow;	
	if ($(window).width()<=960 && t774_mobScroll>0) {var t774_perRow = t774_cols.length;}
	else { if ($(window).width()<=960) {var t774_perRow = 2;} }

	for( var i = 0; i < t774_cols.length; i +=t774_perRow ){
		var t774_maxHeight = 0,
			t774_row = t774_cols.slice(i, i + t774_perRow);		
		t774_row.each(function(){
          var t774_curText = $(this).find(".t774__textwrapper"),
              t774_curBtns = $(this).find(".t774__btn-wrapper, .t774__btntext-wrapper"),
              t774_itemHeight = t774_curText.outerHeight() + t774_curBtns.outerHeight();		  
          if ( t774_itemHeight > t774_maxHeight ) { t774_maxHeight = t774_itemHeight; }
		});
		t774_row.css( "height", t774_maxHeight );
	}
} 
function t830_init(recid){
  var rec = $('#rec' + recid);
  var allrecords = $("#allrecords");
  var el = rec.find('.t830');
  var panel = rec.find('.t830__panel');
  var overlay = rec.find('.t830m__overlay');
  var menu = rec.find('.t830m');
  var submenu = rec.find('.t830m__submenu');
  var burger = rec.find('.t830__side .t830__burger');
  var menuItem = rec.find('.t830m__list-title a');
  var submenuItem = rec.find('.t830m__submenu-item a');

  if ($(window).width() > 1259) {
    $('.t-body').prepend(rec);
    allrecords.addClass('t830__allrecords');
    $('.t-tildalabel').addClass('t830__t-tildalabel');
  }

  t830_initMenu(rec, menu, burger);
  t830_removePadding(rec, allrecords);
  t830_calcCol(rec, menu, allrecords);
  t830_menuHighlight();
  t830_submenuHighlight();
  t830_openSubmenu(rec);
  t830_hoverShowMenu(rec, menu, panel, overlay, burger);

  $(window).resize(function() {
    t830_calcCol(rec, menu, allrecords);
    t830_removePadding(rec, allrecords);

    if (menu.hasClass('t830m_close') && $(window).width() > 1499) {
      overlay.removeClass('t830m__menu_show');
    }
  });

  if (submenu.hasClass('t830m__submenu_close')) {
    t830_toggleMenu(rec, submenu);
  }

  if ($(window).width() > 1259) {
    t830_scrollSideMenu(rec);
  }

  menuItem.click(function() {
    if (window.location.hash.length != 0) {
      menuItem.removeClass('t-active');
      $(this).addClass('t-active');
    }
  });

  submenuItem.click(function() {
    if (window.location.hash.length != 0) {
      submenuItem.removeClass('t-active');
      $(this).addClass('t-active');
    }
  });

  t830_checkAnchorLinks(recid);

}


function t830_calcCol(rec, menu, allrecords) {
  if ($(window).width() > 1259 && !menu.hasClass('t830m_open')) {
    allrecords.addClass('t830__allrecords_padd');
    $('.t-tildalabel').addClass('t830__t-tildalabel_padd');
  }

  if ($(window).width() > 1259 && menu.hasClass('t830m_open')) {
    allrecords.addClass('t830__allrecords_padd-small');
    $('.t-tildalabel').addClass('t830__t-tildalabel_padd-small');
  }
}


function t830_toggleMenu(rec, submenu) {
  var listTitle = rec.find('.t830m__list-title_toggle');
  var submenu;
  var textTitle;

  listTitle.click(function() {
    submenu = $(this).next();
    textTitle = $(this).find('.t830m__list-title-text');
    submenu.slideToggle('slow');

    textTitle.toggleClass('t830m__list-title-text_opacity');
    textTitle.toggleClass('t-menu__link-item');
  });
}


function t830_openSubmenu(rec) {
  var submenuItem = rec.find('.t830m__submenu-item a.t-active');
  submenuItem.parents('.t830m__submenu').css('display', 'block');
}


function t830_hoverShowMenu(rec, menu, panel, overlay, burger) {
  if ($(window).width() > 1259 && panel.hasClass('t830__panel_hover')) {
    panel.mouseenter(function(e) {
      menu.addClass('t830m__menu_show');
      burger.addClass('t830__burger_open');
      overlay.addClass('t830m__overlay_hover');
    });

    menu.mouseleave(function() {
      menu.removeClass('t830m__menu_show');
      burger.removeClass('t830__burger_open');
    });

    overlay.mouseenter(function() {
      menu.removeClass('t830m__menu_show');
      burger.removeClass('t830__burger_open');
      overlay.removeClass('t830m__overlay_hover');
    })

    menu.find('a').on('click', function() {
      menu.removeClass('t830m__menu_show');
      burger.removeClass('t830__burger_open');
    });

    burger.click(function() {
      if (burger.hasClass('t830__burger_open')) {
        t830_closeMenu(rec, menu);
        burger.removeClass('t830__burger_open');
      } else {
        menu.addClass('t830m__menu_show');
        burger.addClass('t830__burger_open');
        overlay.addClass('t830m__overlay_hover');
      }
    });
  }
}


function t830_showMenu(rec, menu, burger) {
  var panel = rec.find('.t830__panel');

  $('body').addClass('t830__body_menushowed');
  rec.find('.t830m').addClass('t830m__menu_show');
  rec.find('.t830m__overlay').addClass('t830m__menu_show');

  rec.find('.t830m__overlay, .t830m__close, a[href*=#]').click(function(){
    if ($(this).is('.tooltipstered, .t794__tm-link')) { return; }
    t830_closeMenu(rec, menu);
    burger.removeClass('t830__burger_open');
  });

  panel.addClass('t830__panel_close');

  $(document).keydown(function(e) {
    if (e.keyCode == 27) {
      if ($('.t-site-search-popup__background').length === 0) {
        $('body').removeClass('t830__body_menushowed');
        $('.t830m').removeClass('t830m__menu_show');
        burger.removeClass('t830__burger_open');
        $('.t830m__overlay').removeClass('t830m__menu_show');
      }
    }
  });
}


function t830_closeMenu(rec, menu) {
  var panel = rec.find('.t830__panel');

  if (menu.hasClass('t830m_open') && $(window).width() < 1500) {
    panel.removeClass('t830__panel_close');
  }

  $('body').removeClass('t830__body_menushowed');
  $('.t830m').removeClass('t830m__menu_show');
  $('.t830m__overlay').removeClass('t830m__menu_show');
}


function t830_initMenu(rec, menu, burger) {
  var obj = rec.find('.t830__menu__content');
  var panel = rec.find('.t830__panel');
  var menu = rec.find('.t830m');

  if (panel.hasClass('t830__panel_click') || (panel.hasClass('t830__panel_hover') && $(window).width() <= 1259)) {
    obj.click(function(e) {
      if (menu.hasClass('t830m__menu_show')) {
        burger.removeClass('t830__burger_open');
        t830_closeMenu(rec, menu);
      } else {
        burger.addClass('t830__burger_open');
        t830_showMenu(rec, menu, burger);
      }

      e.preventDefault();
    });
  }

  $('.t830').bind('clickedAnchorInTooltipMenu',function(){
    t830_closeMenu(rec, menu);
  });
}


function t830_menuHighlight() {
  var url = window.location.href;
  var pathname = window.location.pathname;
  if (url.substr(url.length - 1) == '/') { url = url.slice(0,-1); }
  if (pathname.substr(pathname.length - 1) == "/") { pathname = pathname.slice(0,-1); }
  if (pathname.charAt(0) == '/') { pathname = pathname.slice(1); }
  if (pathname == '') { pathname = '/'; }
  $(".t830m__list-title a[href='" + url + "']").addClass('t-active');
  $(".t830m__list-title a[href='" + url + "/']").addClass('t-active');
  $(".t830m__list-title a[href='" + pathname + "']").addClass('t-active');
  $(".t830m__list-title a[href='/" + pathname + "']").addClass('t-active');
  $(".t830m__list-title a[href='" + pathname + "/']").addClass('t-active');
  $(".t830m__list-title a[href='/" + pathname + "/']").addClass('t-active');
}


function t830_submenuHighlight() {
  var url = window.location.href;
  var pathname = window.location.pathname;
  if (url.substr(url.length - 1) == '/') { url = url.slice(0,-1); }
  if (pathname.substr(pathname.length - 1) == '/') { pathname = pathname.slice(0,-1); }
  if (pathname.charAt(0) == '/') { pathname = pathname.slice(1); }
  if (pathname == '') { pathname = "/"; }
  $(".t830m__submenu-item a[href='" + url + "']").addClass('t-active');
  $(".t830m__submenu-item a[href='" + url + "/']").addClass('t-active');
  $(".t830m__submenu-item a[href='" + pathname + "']").addClass('t-active');
  $(".t830m__submenu-item a[href='/" + pathname + "']").addClass('t-active');
  $(".t830m__submenu-item a[href='" + pathname + "/']").addClass('t-active');
  $(".t830m__submenu-item a[href='/" + pathname + "/']").addClass('t-active');
}


function t830_scrollSideMenu(rec) {
  var container = rec.find('.t830m__container');

  container.on('scroll wheel DOMMouseScroll mousewheel', function(e) {
    var searchResultContainer = rec.find('.t-site-search-dm');

    if (searchResultContainer.length == 0 ) {
      t830_stopScroll(this, e);
    }
  });
}


function t830_stopScroll(block, eventScroll) {
  var $this = $(block);
  var scrollTop = block.scrollTop;
  var scrollHeight = block.scrollHeight;
  var height = $this.height();
  var delta = (eventScroll.type == 'DOMMouseScroll' ? eventScroll.originalEvent.detail * -40 : eventScroll.originalEvent.wheelDelta);
  var up = delta > 0;

  var prevent = function() {
    eventScroll.stopPropagation();
    eventScroll.preventDefault();
    eventScroll.returnValue = false;
    return false;
  }
  if (!up && -delta > scrollHeight - height - scrollTop) {
    $this.scrollTop(scrollHeight);
    return prevent();
  } else if (up && delta > scrollTop) {
    $this.scrollTop(0);
    return prevent();
  }
}


function t830_removePadding(rec, allrecords) {
  if (rec.css('display') == 'none') {
    allrecords.css('padding-left', 0);
    $('.t-tildalabel').css('padding-left', 0);
  }
}


function t830_checkAnchorLinks(recid) {
  if ($(window).width() >= 960) {
    var submenuNavLinks = $("#rec" + recid + " .t830m__list a:not(.tooltipstered)[href*='#']");

    if (submenuNavLinks.length > 0) {
      setTimeout(function() {
        t830_catchScroll(submenuNavLinks, recid);
      }, 500);
    }
  }
}


function t830_catchScroll(navLinks, recid) {
  var rec = $('#rec' + recid);
  var clickedSectionId = null;
  var sections = new Array();
  var sectionIdTonavigationLink = [];
  var interval = 100;
  var lastCall;
  var timeoutId;
  var navLinks = $(navLinks.get().reverse());

  navLinks.each(function() {
    var cursection = t830_getSectionByHref($(this));
    if (typeof cursection.attr('id') != 'undefined') {
      sections.push(cursection);
    }
    sectionIdTonavigationLink[cursection.attr('id')] = $(this);
  });
  t830_updateSectionsOffsets(sections);

  sections.sort(function(a, b) {
    return b.attr('data-offset-top') - a.attr('data-offset-top');
  });

  $(window).bind('resize', t_throttle(function() {t830_updateSectionsOffsets(sections);}, 200));
  $('.t830').bind('displayChanged',function() {t830_updateSectionsOffsets(sections);});
  setInterval(function() {t830_updateSectionsOffsets(sections);}, 5000);
  t830_highlightNavLinks(navLinks, sections, sectionIdTonavigationLink, clickedSectionId);

  navLinks.click(function() {
    var clickedSection = t830_getSectionByHref($(this));
    if (!$(this).hasClass('tooltipstered') && typeof clickedSection.attr('id') != 'undefined') {
      navLinks.removeClass('t-active');
      $(this).addClass('t-active');
      clickedSectionId = t830_getSectionByHref($(this)).attr("id");
    }
  });

  $(window).scroll(function() {
    var now = new Date().getTime();
    if (lastCall && now < (lastCall + interval)) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(function() {
        lastCall = now;
        clickedSectionId = t830_highlightNavLinks(navLinks, sections, sectionIdTonavigationLink, clickedSectionId);
      }, interval - (now - lastCall));
    } else {
      lastCall = now;
      clickedSectionId = t830_highlightNavLinks(navLinks, sections, sectionIdTonavigationLink, clickedSectionId);
    }
  });
}


function t830_getSectionByHref(curlink) {
  var curLinkValue = curlink.attr('href').replace(/\s+/g, '');
  if (curLinkValue[0]=='/') { curLinkValue = curLinkValue.substring(1); }
  if (curlink.is('[href*="#rec"]')) {
    return $(".r[id='" + curLinkValue.substring(1) + "']");
  } else {
    return $(".r[data-record-type='215']").has("a[name='" + curLinkValue.substring(1) + "']");
  }
}


function t830_highlightNavLinks(navLinks, sections, sectionIdTonavigationLink, clickedSectionId) {
  var scrollPosition = $(window).scrollTop();
  var valueToReturn = clickedSectionId;
  if (sections.length != 0 && clickedSectionId == null && sections[sections.length-1].attr('data-offset-top') > (scrollPosition + 300)){
    navLinks.removeClass('t-active');
    return null;
  }

  $(sections).each(function(e) {
    var curSection = $(this);
    var sectionTop = curSection.attr('data-offset-top');
    var id = curSection.attr('id');
    var navLink = sectionIdTonavigationLink[id];

    if (((scrollPosition + 300) >= sectionTop) || (sections[0].attr("id") == id && scrollPosition >= $(document).height() - $(window).height())) {
      if (clickedSectionId == null && !navLink.hasClass('t-active')) {
        navLinks.removeClass('t-active');
        navLink.addClass('t-active');
        valueToReturn = null;
      } else {
        if (clickedSectionId != null && id == clickedSectionId) {
          valueToReturn = null;
        }
      }
      return false;
    }
  });

  return valueToReturn;
}


function t830_updateSectionsOffsets(sections) {
  $(sections).each(function() {
    var curSection = $(this);
    curSection.attr('data-offset-top', curSection.offset().top);
  });
}
 
function t865_init(recid) {
	var rec = $('#rec' + recid);

	t865__initFB(rec);
	t865_setFBWidth(rec);
	
	t865__initVK(rec);

	$(window).bind('resize', t_throttle(function() {
		if (typeof window.noAdaptive!="undefined" && window.noAdaptive==true && $isMobile){return;}
		t865_setFBWidth(rec);
	}, 100));

	$('.t865').bind('displayChanged',function(){
		t865_setFBWidth(rec);
	});
}


function t865_setFBWidth(rec) {
	setTimeout(function() {
		var fb = rec.find('.fb-comments');
		var colFB = fb.parents('.t865__fb');
		var width = colFB.width();
		fb.find('.fb_ltr').css('width', width);
		fb.find('span').css('width', width);
	}, 500);
}


function t865__initFB(rec) {
	var FBWidgetId = rec.find('.t865__fb').attr('data-comments-fb');
	var pageurl;
	rec.find('.t865__fb').removeAttr('data-comments-fb');
	try {
	    pageurl = "" + window.location;
	    pageurl = pageurl.split('?')[0];
	    pageurl = pageurl.split('#')[0];
	} catch (e) {
	    pageurl = window.location;
	}
	rec.find('.t865__fb .fb-comments').attr('data-href', pageurl);

	if (rec.find('.t865').hasClass('t865__publish') && FBWidgetId !== undefined) {
		(function(d, s, id) {
		  var js, fjs = d.getElementsByTagName(s)[0];
		  if (d.getElementById(id)) return;
		  js = d.createElement(s); js.id = id;
		  js.src = 'https://connect.facebook.net/' + t865_setLanguage(rec) + '/sdk.js#xfbml=1&version=v3.1&appId=' + FBWidgetId + '&autoLogAppEvents=1';
		  fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	}
}


function t865__initVK(rec) {
	var VKWidgetId = rec.find('.t865__vk').attr('data-comments-vk');
	rec.find('.t865__vk').removeAttr('data-comments-vk');

	if (rec.find('.t865').hasClass('t865__publish') && VKWidgetId !== undefined) {
			VK.init({apiId: VKWidgetId, onlyWidgets: true});
			VK.Widgets.Comments("vk_comments", {limit: 10, attach: "*"});
	}
}


function t865_setLanguage(rec) {
  var lang = rec.find('.t865__fb').attr('data-fb-comments-local');
  if (typeof lang != 'undefined') {
    switch (lang) {
      case 'en':
        return 'en_US';
        break;

      case 'ru':
        return 'ru_RU';
        break;

      case 'az':
        return 'az_AZ';
        break;

      case 'ca':
        return 'ca_ES';
        break;

      case 'es':
        return 'es_ES';
        break;

      case 'cs':
        return 'cs_CZ';
        break;

      case 'da':
        return 'da_DK';
        break;

      case 'de':
        return 'de_DE';
        break;

      case 'et':
        return 'et_EE';
        break;

      case 'fr':
        return 'fr_FR';
        break;

      case 'he':
        return 'he_IL';
        break;

      case 'it':
        return 'it_IT';
        break;

      case 'ja':
        return 'ja_JP';
        break;

      case 'lv':
        return 'lv_LV';
        break;

      case 'nb':
        return 'nb_NO';
        break;

      case 'nl':
        return 'nl_NL';
        break;

      case 'pl':
        return 'pl_PL';
        break;

      case 'pt':
        return 'pt_PT';
        break;

      case 'sv':
        return 'sv_SE';
        break;

      case 'tr':
        return 'tr_TR';
        break;

      case 'zhTW':
        return 'zh_TW';
        break;

      case 'zhB':
        return 'zh_CN';
        break;

      default:
        return 'ru_RU';
        break;
    }
  } else {
    return 'ru_RU';
  }
}

