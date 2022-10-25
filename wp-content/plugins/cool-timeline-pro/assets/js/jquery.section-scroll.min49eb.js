!function($){"use strict";$.fn.sectionScroll=function(options){var $container=this,$window=$(window),$section_number=1,f_lastId,lastId,settings=$.extend({bulletsClass:"section-bullets",sectionsClass:"scrollable-section",scrollDuration:1e3,titles:!0,topOffset:0,easing:"",id:"",position:"left"},options),tm_id=settings.id+"-navi",cont_cls="",$sections2=$("#"+settings.id).find("."+settings.sectionsClass),$sections=$("."+settings.sectionsClass);"left"==settings.position||"right"==settings.position?cont_cls="ctl-bullets-container":"bottom"==settings.position&&(cont_cls="ctl-footer-bullets-container");var $bullets=$('<div id="'+tm_id+'" class="'+cont_cls+'"><ul class="'+settings.bulletsClass+'"></ul></div>').prependTo($container).find("ul"),bullets_html="";$sections2.each(function(){var $this=$(this),title=$this.data("section-title")||"",cls="";$this.attr("id","scrollto-section-"+tm_id+"-"+title),cls=$this.data("cls");var bullet_title=settings.titles?"<span>"+title+"</span>":"";bullets_html+='<li class="year-'+title+" "+cls+' "><a title="'+title+'" href="#scrollto-section-'+tm_id+"-"+title+'">'+bullet_title+"</a></li>",$section_number++});var $bullets_items=$(bullets_html).appendTo($bullets),scrollItems=$bullets_items.map(function(){var item=$($(this).find("a").attr("href"));if(item[0])return item});return $bullets_items.on("click",function(e){var href=$(this).find("a").attr("href"),offsetTop="#"===href?0:$(href).offset().top;$("html, body").stop().animate({scrollTop:offsetTop-settings.topOffset},settings.scrollDuration,settings.easing,function(){$container.trigger("scrolled-to-section").stop()}),e.preventDefault()}),$window.on("scroll",function(){var fromTop=$window.scrollTop()+$window.height()/2.5,cur=scrollItems.map(function(){if($(this).offset().top<fromTop)return this}),id=(cur=cur.length>0?cur[cur.length-1]:[])[0]?cur[0].id:"";if(lastId!==id){$sections2.removeClass("active-section"),$(cur).addClass("active-section"),$bullets_items.removeClass("active").find('a[href="#'+id+'"]').parent().addClass("active");var ele=$bullets_items.find('a[href="#'+id+'"]').parent();if($(ele).position()){var topPos=parseInt($(ele).position().top);topPos&&null!=topPos&&$("."+cont_cls).stop().animate({scrollTop:topPos},1e3)}lastId=id,$.fn.sectionScroll.activeSection=cur,$container.trigger("section-reached")}}),$(function(){$window.scroll()}),$container}}(jQuery);