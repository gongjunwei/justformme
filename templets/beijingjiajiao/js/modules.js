(function($){

function Tabs(options){
	this.tabs = options.tabs;
	this.contents = options.contents;
	this.init();
}
$.extend(Tabs.prototype, {
	init: function(){		
		this.bindEvent();
		this.fireByIndex(0);
	},
	bindEvent: function(){
		var self = this;
		$(this.tabs).each(function (idx, item){
			$(item).mouseenter(function(){
				self.fireByIndex(idx);
			});
		});
	},
	fireByIndex: function(idx){
		var self = this;
		$(this.tabs).each(function (i, item){
			if(i == idx){
				$(this).addClass('current');
				$(self.contents[i]).show();
			}else{
				$(this).removeClass('current');
				$(self.contents[i]).hide();
			}
		});
	}
});

$.fn.tabs = function(contents){
	new Tabs({
		tabs: this,
		contents: contents
	});
	return this;
}


function SlideShow (list, content){
	this.list = list;
	this.content = content;
	this.length = list.data.length;
	this.renderHTML();
}
SlideShow.minwidth = 1000;
$.extend(SlideShow.prototype, {
	renderHTML: function (){
		var data = this.list.data;
		var obj = this;
		var listHTML = [], barHTML = [];
		$.each(data, function(idx, item){
			if(item && item.id){
				listHTML.push('<li id = '+item.id+'>'+ (item.href ? ('<a id="link'+idx+'" href="' + item.href + '"></a>') : '') + '</li>');
				barHTML.push('<li><span id="icon'+idx+'">'+(idx+1)+'</span></li>');
			}
			else if(item &&item.href){
				listHTML.push('<li >'+ '<a id="link'+idx+'" href="' + item.href + '"></a>'+ '</li>');
				barHTML.push('<li><span id="icon'+idx+'">'+(idx+1)+'</span></li>');
			}else{
				listHTML.push('<li ></li>');
				barHTML.push('<li><span id="icon'+idx+'">'+(idx+1)+'</span></li>');
			}
			
		});
		$('<div class="m-silde-list"><ul>'+listHTML.join('')+'</ul></div>').css({
				width: this.list.width,
				height: this.list.height
			}).appendTo(this.content);
        
		if(data.length > 1){
			var self = this;
			this.bar = $('<div class="m-silde-bar"><ul>'+barHTML.join('')+'</ul></div>').appendTo(this.content);
			this.setBarPosition();
			$(window).resize(function(){
				self.setBarPosition();
			});
			$(this.bar).find('li').each(function(idx, item){
				$(item).click(function(){
					self.slideToByIndex(idx);
				});
			});

			this.autoSlide();
		}

		this.slideToByIndex(0);
	},
	autoSlide: function(){
		var hover = false, timer = null, self = this;
		$(this.content).find(".m-silde-list").mouseenter(function(){
			hover = true;
		}).mouseleave(function(){
			hover = false;
		});
		timer = setInterval(function (){
			if(!hover && self.showTime && (+new Date() - self.showTime) > 5000){
				var next = self.current + 1;
				self.slideToByIndex(next >= self.length ? 0 : next);
			}
		}, 50);
	},
	setBarPosition: function(){
		var pageWidth = $('.m-page-wrapper').width();
		var diff = pageWidth - SlideShow.minwidth;
		$(this.bar).css({
			right: (diff > 0 ? diff/2 : 0) + 20
		})
	},
	slideToByIndex: function(index){
		this.markIndex(index);
		var data = this.list.data;
		if(data[index].loaded !== undefined && data[index].loaded){
			this.showImage(index);
		}else{
			this.loadImage(index);
		}
	},
	markIndex: function(index){
		this.current = index;
		$(this.content).find('.m-silde-bar li').each(function(idx, item){
			if(idx == index){
				$(item).addClass("current");
			}else{
				$(item).removeClass("current");
			}
		});
		var self = this;
		$(this.content).find('.m-silde-list li').each(function(idx, item){
			if(idx == index){
				$(item).fadeIn();
				// $(item).css({
				// 	width:1440,
				// 	left:1440
				// }).animate({left:0},"slow")
			}else{
				$(item).fadeOut();
				// $(item).css({
				// 	width:1440,
				// 	left:0
				// }).animate({left:-1440},"slow")
			}
		});
	},
	loadImage: function(index){
		var self = this;
		var img = new Image();
		img.onload = function(){
			self.list.data[index].loaded = true;
			 self.showImage(index, true);

			  setTimeout(function(){
				
			  },2000)
		}
		img.src = this.list.data[index].image;
	},
	showImage: function(index, loaded){
		var self = this;
		if(loaded){
			if(this.current == index){			
				$(this.content).find('.m-silde-list li').eq(index).css({
					backgroundImage: 'url('+self.list.data[index].image+')',
					backgroundRepeat:'no-repeat',
					backgroundColor:self.list.data[index].color,
					opacity:0
				}).animate({opacity:1});
			}else{
				$(this.content).find('.m-silde-list li').eq(index).css({
					backgroundImage: 'url('+self.list.data[index].image+')',
					backgroundColor:self.list.data[index].color
				});
			}
		}
		this.showTime = + new Date();
	}
});
$.fn.slideShow = function (list){
	new SlideShow(list, this);
	return this;
}

})(jQuery);