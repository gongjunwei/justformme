(function($) {
    $.fn.extend({
        Togglenews: function(options) {
            return this.each(function() {
                new Togglenews(this, options);
            })
        },
        Slide: function(options) {
            return this.each(function() {
                new Slide(this, options);
            })
        },
        NavIt: function(options) {
            return this.each(function() {
                new navIt(this, options);
            })
        },
        TimeAxis: function(options) {
            return this.each(function() {
                new timeAxis(this, options);
            })
        },
        Accordion: function(options) {
            return this.each(function() {
                new accordion(this, options);
            })
        }
    })
    $.accordion = {
        defaults: {

        }
    }
    accordion = function(el, options) {
        var self = this;
        self.el = $(el);
        var settings = $.extend({}, $.accordion.defaults, options || {});
        $.extend(self, {
            create: function() {
                self.el.list = self.el.find('.problem-list');
                self.showdiv(0);
            },
            init: function() {
                self.create();
                self.el.list.click(function() {
                    var divnow = $(this).index();
                    self.hidediv();
                    self.showdiv(divnow);
                })

            },
            showdiv: function(nub) {
                self.el.list.each(function(ind, ele) {
                    if (ind == nub) {
                        $(this).find('.problem-top').css({
                            borderBottom: '1px solid #E5E5E5'
                        });
                        $(this).find('.problem-bot-left').css({
                            display: 'block'
                        });
                        $(this).find('.problem-bot-right').css({
                            display: 'block'
                        });
                        $(this).find('.problem-bot').css({
                            display: 'block'
                        });
                        $(this).find('.ui-icon').removeClass().addClass('ui-icon-triangele-e ui-icon');
                    } else {
                        $(this).find('.problem-top').css({
                            borderBottom: 'none'
                        });
                        $(this).find('.problem-bot-left').css({
                            display: 'none'
                        });
                        $(this).find('.problem-bot-right').css({
                            display: 'none'
                        });
                        $(this).find('.problem-bot').css({
                            display: 'none'
                        });
                        $(this).find('.ui-icon').removeClass().addClass('ui-icon-triangele-s ui-icon');
                    }
                })
            },
            hidediv: function() {
                self.el.list.each(function(ind, ele) {
                    $(this).find('.problem-top').css({
                        borderBottom: 'none'
                    });
                    $(this).find('.problem-bot-left').css({
                        display: 'none'
                    });
                    $(this).find('.problem-bot-right').css({
                        display: 'none'
                    });
                    $(this).find('.problem-bot').css({
                        display: 'none'
                    });
                    $(this).find('.ui-icon').removeClass().addClass('ui-icon-triangele-s ui-icon');
                })
            }
        })
        self.init();
    }
    $.timeAxis = {
        defaults: {

        }
    }

    timeAxis = function(el, options) {
        var obj = this;
        obj.el = $(el);
        var settings = $.extend({}, $.timeAxis.defaults, options || {});
        var toggle = new contentToggle();
        $.extend(obj, {
            create: function() {
                obj.contentPoint = obj.el.find('.ui-content-point');
                obj.contentPoint.children('li').each(function(pointind,pointele){
                    if(pointind==2){
                     $(pointele).addClass('Selected');
                    }else{
                    $(pointele).addClass('no-Selected');
                    }
                });
                obj.alPrev = obj.el.find('.al-prev');
                obj.alNext = obj.el.find('.al-next');
                
                obj.pastSub = obj.el.find('.past-sub');
                obj.title = obj.el.find('.title');
                obj.pointer = obj.el.find('.Selected');
                obj.pointer.index = obj.pointer.index();
                obj.page = 0;
                obj.i = 5;
                obj.contentPoint.width = obj.i * 99;
                obj.page_count = Math.ceil(obj.contentPoint.find("li").length / obj.i);
                obj.arrangement();
                obj.pointer.position = obj.pointer.position();
                
                obj.contentPoint.children('li').each(function() {
                    $(this).live('click', function() {
                         obj.pointer.index=$(this).index();
                        obj.showpoint($(this).index());
                    
                        var oldpage = obj.page;
                        if (oldpage > $(this).index() / 5) {
                          
                            obj.page = Math.ceil($(this).index() / 5);
                        } else {
                           
                            obj.page = parseInt($(this).index() / 5);
                        }

                      
                    })

                })
                obj.alNext.each(function(event) {
                    $(this).click(function(event) {
                      
                            if(obj.pointer.index<obj.contentPoint.find("li").length-1){
                               
                              obj.pointer.index++;
                               obj.pointer.indexnow = obj.pointer.index;
                               obj.showpoint(obj.pointer.indexnow);
                            }else{
                               obj.showpoint(obj.contentPoint.find("li").length-1); 
                            }
                            
                          
                        event.preventDefault();
                        return false;
                    })
                })
                obj.alPrev.each(function() {
                    $(this).click(function(event) {
                        if(obj.pointer.index>0){
                              obj.pointer.index--;
                               obj.pointer.indexnow = obj.pointer.index;
                               obj.showpoint(obj.pointer.indexnow);
                            }else{
                               obj.showpoint(0);
                            }
                      
                        event.preventDefault();
                        return false;
                    })


                })
                obj.showpoint(obj.contentPoint.find("li").length-1);
            },
            init: function() {
                obj.create();
            },
            arrangement: function() {
                obj.contentPoint.children('li').each(function(ind, sel) {
                    $(this).css({
                        left: ind * 99 + 'px'
                    })
                })
            },
            showpoint: function(nub) {
                obj.contentPoint.children('li').removeClass();
                obj.contentPoint.children('li').eq(nub).addClass('Selected').siblings().addClass('no-Selected');
                obj.pointer.index = nub;
                var left = obj.contentPoint.children('li').eq(nub).position().left;
                obj.contentPoint.animate({
                    left: obj.pointer.position.left + 56 - left + 'px'
                }, 500,function(){
                    toggle.showpast(nub);
                });
                
            },
            showpage: function(nub) {
                obj.page = nub;
                //obj.contentPoint.animate({left:-obj.page*obj.contentPoint.width+64+'px'},1000); 
                var pointnow = obj.page * 5 + 2;
                if (obj.pastSub.children('div').length > pointnow) {
                    obj.showpoint(obj.page * 5 + 2);
                } else {
                    //alert(obj.pastSub.children('div').length)
                    obj.showpoint(obj.pastSub.children('div').length - 1);
                    //obj.page++;
                }

            },
            shownextpage: function() {

            },
            showprevpage: function() {

            }
        })
        obj.init();

        function contentToggle() {
            var _this = this;
            this.showpast = function(nub) {
                //alert(nub);
                obj.pastSub.children('div').each(function(ind, sel) {
                    //alert(ind);
                    if (ind != nub) {
                        $(this).css('display', 'none');
                        obj.title.children().eq(ind).css('display', 'none');
                    } else {
                        $(this).css('display', 'block');
                        obj.title.children().eq($(this).index()).css('display', 'block');
                    }

                })

            }

        };

    }

    $.navIt = {
        defaults: {

        }
    }

    navIt = function(el, options) {
        var obj = this;
        obj.el = el;
        var settings = $.extend({}, $.navIt.defaults, options || {});

        $.extend(obj, {
            create: function() {
                obj.navgroup = $(obj.el).children('li');

                obj.currentmouseover();
            },
            init: function() {
                obj.create();

                obj.navgroup.each(function(ind, ele) {

                    $(this).mouseenter(function() {
                        obj.hidecontent();
                        var a = $(this).children('a');
                        var ul = $(this).children('ul').length > 0 ? $(this).children('ul') : null;
                        var number = $(this).index();
                        obj.setposition(obj.navgroup[number], ul);
                        obj.showcontent(a, ul, number);

                    }).mouseleave(function() {
                        obj.hidecontent();
                        obj.reductionclass()
                    })
                })
            },
            showcontent: function(anode, ulnode, number) {
                if (ulnode) {
                    switch (number) {
                    case 0:
                        anode.removeClass();
                        anode.addClass('mouseover-index');
                        break;
                    case 1:
                        anode.removeClass();
                        anode.addClass('mouseover-Platform');
                        break;
                    case 2:
                        anode.removeClass();
                        anode.addClass('mouseover-phone');
                        break;
                    case 3:
                        anode.removeClass();
                        anode.addClass('mouseover-Support');
                        break;
                    case 4:
                        anode.removeClass();
                        anode.addClass('mouseover-Rom');
                        break;
                    case 5:
                        anode.removeClass();
                        anode.addClass('mouseover-Developer');
                        break;
                    }

                    ulnode.css({
                        display: 'block',
                        width: $('body').width() + 106 - $(obj.navgroup[number]).offset().left + 'px',
                        overflow: 'hidden'
                    });


                }
            },
            hidecontent: function() {
                obj.navgroup.each(function() {
                    $(this).children('ul').css('display', 'none');
                    $(this).children('a').removeClass().addClass('nav-index-on');
                })
            },
            setposition: function(node, ulnode) {
                var offset = $(node).offset();
                if (ulnode) {
                    ulnode.css('padding-left', offset.left - 106 + 'px');
                }

            },
            currentmouseover: function() {
                obj.navgroup.each(function(ind, ele) {
                    if (/mouse/g.test($(this).children('a').attr('class'))) {
                        obj.currentclass = $(this).children('a').attr('class');
                        //alert(ind);
                        obj.currentind = ind;
                    }
                })
            },
            reductionclass: function() {
                obj.navgroup.each(function(ind, ele) {

                    if (ind == obj.currentind) {

                        $(this).children('a').removeClass().addClass(obj.currentclass);
                    }
                })
            }
        })

        obj.init();
    }

    $.Slide = {
        defaults: {

        }
    };

    Slide = function(el, options) {
        var obj = this;
        obj.el = $(el);

        var settings = $.extend({}, $.Slide.defaults, options || {});
        var link = new Create(el, settings);
        $.extend(obj, {
            create: function() {
                var obj = this;
                obj.select = 0;
                obj.stage = $(".stage", el);

                obj.wheels = $(".stage li", el);
                obj.lastest = obj.wheels.length - 1;
                if ($(".ui-slide-ctrl a", el).length != 0) {
                    $(".ui-slide-ctrl a", el).click(function(e) {

                        var index = $(".ui-slide-ctrl a", el).index(this);
                        obj.showImage(index);


                    })
                }
                obj.showImage(0);
            },
            init: function() {
                var obj = this;

                obj.timer = setTimeout(function() {
                    obj.nextImage();
                }, 7000);
                //obj.showImage(2);
            },
            showImage: function(select) {


                var obj = this;
                clearTimeout(obj.timer);
                //alert(select);
                obj.wheels.eq(obj.lastest).fadeOut('slow');
                obj.wheels.eq(select).fadeIn('slow');
                link.showpoint(select);
                obj.select = obj.lastest = select;
                obj.init();

            },
            nextImage: function() {
                var obj = this;
                //alert(obj.select);
                obj.showImage(obj.select + 1 == obj.wheels.length ? 0 : obj.select + 1);


            },
            prevImage: function() {
                var obj = this;
                obj.showImage(obj.select - 1 == obj.wheels.length ? obj.wheels.length - 1 : obj.select - 1);


            }
        });
        obj.create();
    }

    Create = function(el, settings) {
        var obj = this;
        var Temp = '';
        obj.el = $(el);

        obj.nodewrap = $('<div class="ui-slide-ctrl"><div class="ui-slide-left"><div class="ui-slide-right"></div></div></div>');
        //alert(obj.node[0].innerHTML);
        obj.node = obj.nodewrap.find('.ui-slide-right');
        obj.node.html('');
        obj.wheels = $(".stage li", el);
        obj.wheels.each(function(ind, Ele) {
            Temp += '<a>' + (ind + 1) + '</a>';
        });
        obj.node.html(Temp);
        obj.el.append(obj.nodewrap);
        $("a", obj.node).attr("class", "offselect");
        $.extend(obj, {
            hide: function() {
                obj.nodewrap.hide();
            },
            showpoint: function(select) {
                obj.nodewrap.show();
                $("a", obj.node).each(function(ind, Ele) {
                    ind = settings.Replacebg ? '' : ind;
                    $(this).removeClass().attr("class", 'offselect' + ind);
                })
                var selectclass = settings.Replacebg ? '' : select;
                $("a", obj.node).eq(select).removeClass().attr("class", 'onselect' + selectclass);

            }

        });

        obj.hide();
    }

    $.Togglenews = {
        defaults: {
            Mode: true
        }
    };
    Togglenews = function(el, options) {

        var obj = this;
        obj.el = $(el);
        var settings = $.extend({}, $.Togglenews.defaults, options || {});
        $.extend(obj, {
            create: function() {
                var obj = this;
                obj.tab = obj.el.children(".ui-tab");
                obj.sub = obj.el.children(".ui-sub");
                obj.tablis = obj.tab.children(".litab");
                obj.subDivs = obj.sub.children("div");
                obj.init();
            },
            init: function() {
                var obj = this;
                obj.show(0);
                    obj.tablis.click(function(event) {
                        var index = obj.tablis.index(this);


                        obj.show(index);
                        event.preventDefault();
                    })
            },
            show: function(ind) {
                obj.ind = ind;
                obj.hide(ind);
                obj.subDivs.eq(ind).show();
                obj.tablis.eq(ind).addClass('select');
            },
            hide: function(index) {
               
                obj.tablis.eq(index).siblings().removeClass('select');
                obj.subDivs.eq(index).siblings().hide();
            }
        })
        obj.create();

    }



    $(function() {
        $('.TimeAxis').TimeAxis({});
        $('.nav-group').NavIt({});
        $('.ui-slide').Slide({
            Replacebg: true
        });
        $('.list-content').Togglenews({});
        $('.leftsideBar').Togglenews({});
        $('.problem-content').Accordion({});
        $('.all-content').Accordion({});
        $('.details-news').hover(
            function() {
                $(this).removeClass();
                $(this).addClass("details-news-on details-news");
            }, function() {
                $(this).removeClass();
                $(this).addClass("details-news-off details-news");
            })



        $('.details-Platform').hover(function() {
            $(this).removeClass();
            $(this).addClass("details-Platform-on details-Platform");
        }, function() {
            $(this).removeClass();
            $(this).addClass("details-Platform-off details-Platform");
        })

        $('.ROMAbbs').hover(function() {
            $(this).removeClass();
            $(this).addClass("details-ROMAbbs-on ROMAbbs");
        }, function() {
            $(this).removeClass();
            $(this).addClass("details-ROMAbbs-off ROMAbbs");
        })

        $('.wireLess_click').toggle(function() {
            $('.wireLess_btn').children('ul').show();
        }, function() {
            $('.wireLess_btn').children('ul').hide();
        })



        $('.list-content .list-item').hover(function() {
            $(this).find('.attribute-white').css({
                'display': 'none'
            }).end().find('.attribute-wrap').css({
                'display': 'block'
            });
        }, function() {
            $(this).find('.attribute-white').css({
                'display': 'block'
            }).end().find('.attribute-wrap').css({
                'display': 'none'
            });
        })

        $('.list-item-wrap .list-item').hover(function() {
            $(this).addClass('list-item-over');
        }, function() {
            $(this).removeClass('list-item-over');
        })
    })



})(jQuery);