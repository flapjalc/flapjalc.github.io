(function($){

// Creating the sweetPages jQuery plugin:
$.fn.sweetPages = function(userOpts){
	
	// If no options were passed, create an empty opts object
	var opts = {};
	opts.perPage = 3;
	opts.changeHeight = false;
	opts.centerPaginator = true;
	opts.paginatorContainer = "div";
	opts.onFinishPage = null;
	opts.onFinishPagination = null;
	opts.onStartPage = null;
	opts.onBeforeChangePage = null;
	opts.onAfterChangePage = null;
	opts.next = ""; //class or id to set the action of next page
	opts.prev = ""; //class or id to set the action of prev page
	opts.pageContainer = "";
	opts.hidePageContainerIfDisabled = false;
	opts.vertical = false;
	opts.showNumbers = true;

	opts = jQuery.extend(opts, userOpts);
	// The plugin works best for unordered lists, althugh ols would do just as well:
	var ul = this;
	var li = ul.find('li');
	
	
	function defaultOnAfterChangePage(page, ul)
	{
		ul.find(".swPage").removeClass("currenPage").removeClass("otherPage");
		ul.find(".swPage").each(function()
		{
			if($(this).index() == page)
			{
				$(this).addClass("currenPage");
			}
			else
			{
				$(this).addClass("otherPage");
			}
		});
	}
	
	function defaultOnBeforeChangePage(page, ul)
	{
		ul.find(".swPage").removeClass("currenPage").removeClass("otherPage");
	}
	
	function showOtherPageSweet(page, ul)
	{
		ul.find(".otherPage").each(function()
		{
			$(this).css("visibility", "visible");
		});
		defaultOnBeforeChangePage(page, ul);
	}
	
	function hideOtherPageSweet(page, ul)
	{
		defaultOnAfterChangePage(page, ul);
		ul.find(".otherPage").each(function()
		{
			$(this).css("visibility", "hidden");
		});
	}
	
	//Por defecto
	if(opts.onAfterChangePage == null )
	{
		opts.onAfterChangePage = defaultOnAfterChangePage;
	}
	//Primero muestra y luego por defecto
	else if(opts.onAfterChangePage == "auto")
	{
		opts.onAfterChangePage = hideOtherPageSweet;
	}
	
	if(opts.onFinishPagination == null)
	{
		opts.onFinishPagination = function()
		{
			ul.find(".swPage:eq(0)").addClass("currenPage");
			ul.find(".swPage:gt(0)").addClass("otherPage");
		};
	}
	
	//Por defecto
	if(opts.onBeforeChangePage == null)
	{
		opts.onBeforeChangePage = defaultOnBeforeChangePage;
	}
	//Primero muestra y luego por defecto
	else if(opts.onBeforeChangePage == "auto")
	{
		opts.onBeforeChangePage = showOtherPageSweet;
	}
	
	li.each(function(){
		// Calculating the height of each li element, and storing it with the data method:
		var el = $(this);
		el.data('height',el.outerHeight(true));
	});
	
	// Calculating the total number of pages:
	var pagesNumber = Math.ceil(li.length/opts.perPage);

	this.pagesNumber = function()
	{
		return pagesNumber;
	}

	// If the pages are less than two, do nothing:
	if(pagesNumber<2)
	{
		if(opts.onStartPage != null)
		{
			opts.onStartPage($(this));
		}
		if(opts.onFinishPage != null)
		{
			opts.onFinishPage($(this));
		}
		if(opts.hidePageContainerIfDisabled && opts.pageContainer != "")
		{
			$(opts.pageContainer).hide();
		}
		return this;
	}

	// Creating the controls div:
	var swControls = $('<'+opts.paginatorContainer+' class="swControls" />');
	
	for(var i=0;i<pagesNumber;i++)
	{
		// Slice a portion of the lis, and wrap it in a swPage div:
		li.slice(i*opts.perPage,(i+1)*opts.perPage).wrapAll('<div class="swPage" />');
		
		if(opts.showNumbers)
		{
			// Adding a link to the swControls div:
			swControls.append('<a href="" class="swShowPage swShowPage_'+(i+1)+'">'+(i+1)+'</a>');
		}
	}

	ul.append(swControls);
	
	var maxHeight = 0;
	var totalWidth = 0;
	var totalHeight = 0;
	
	var swPage = ul.find('.swPage');
	swPage.each(function(){

		if(opts.onStartPage != null)
		{
			opts.onStartPage($(this));
		}
		
		// Looping through all the newly created pages:
		
		var elem = $(this);

		var tmpHeight = 0;
		elem.find('li').each(function(){tmpHeight+=$(this).data('height');});

		totalHeight+=tmpHeight;

		if(tmpHeight>maxHeight)
			maxHeight = tmpHeight;

		totalWidth+=elem.outerWidth();
		
		if(!opts.vertical)
		{
			elem.css('float','left').width(ul.width());
		}
		/*else
		{
			elem.height(ul.height());
		}*/
		
		if(opts.onFinishPage != null)
		{
			opts.onFinishPage($(this));
		}
	});
	
	if(opts.onFinishPagination != null)
	{
		opts.onFinishPagination($(this));
	}
	
	swPage.wrapAll('<div class="swSlider" />');
	
	// Setting the height of the ul to the height of the tallest page:
	if (opts.changeHeight)
		ul.height(maxHeight);
	
	var swSlider = ul.find('.swSlider');
	if(!opts.vertical)
	{
		swSlider.append('<div class="clear" />').width(totalWidth);
	}
	else
	{
		swSlider.append('<div class="clear" />').height(totalHeight);
	}

	var currentPage = 0;	

	function linkPage(e)
	{
		// If one of the control links is clicked, slide the swSlider div 
		// (which contains all the pages) and mark it as active:

		$(this).addClass('active').siblings().removeClass('active');
		currentPage = parseInt($(this).text())-1;
		changePage(currentPage);
		e.preventDefault();
	}
	
	function changePage(page)
	{
		opts.onBeforeChangePage(page, ul);
		if(!opts.vertical)
		{
			swSlider.stop().animate({'margin-left':-(page)*ul.width()},'slow', 'linear', function(){opts.onAfterChangePage(page, ul)});
		}
		else
		{
			swSlider.stop().animate({'margin-top':-(page)*ul.height()},'slow', 'linear', function(){opts.onAfterChangePage(page, ul)});
		}
	}
	
	this.prevPage = function(e)
	{
		if(currentPage > 0)
		{
			currentPage = currentPage-1;
			changePage(currentPage);
			$(".swShowPage_"+(currentPage+1)).addClass('active').siblings().removeClass('active');
		}
		e.preventDefault();
	}
	
	this.nextPage = function(e)
	{
		if(currentPage < pagesNumber-1)
		{
			currentPage = currentPage+1;
			changePage(currentPage);
			$(".swShowPage_"+(currentPage+1)).addClass('active').siblings().removeClass('active');
		}
		e.preventDefault();
	}

	var hyperLinks = ul.find('a.swShowPage');
	hyperLinks.click(linkPage);
	
	if(opts.next!="")
	{
		$(opts.next).click(function(event){ul.nextPage(event)});
	}

	if(opts.prev!="")
	{
		$(opts.prev).click(function(event){ul.prevPage(event)});
	}
	
	
	// Mark the first link as active the first time this code runs:
	hyperLinks.eq(0).addClass('active');
	
	if(opts.centerPaginator)
	{
		// Center the control div:
		swControls.css({
			'left':'50%',
			'margin-left':-swControls.width()/2
		});
	}

	var controls;
	if(opts.pageContainer != "")
	{
		controls = ul.find('.swControls').detach();
		controls.appendTo(opts.pageContainer);
	}

	this.getControl = function()
	{
		return control;
	}
	
	return this;
	
	

	
}
/*
function changePage(page)
{
	console.log(page);
}
	 $.fn.extend(
	 { 
		aaa: function(page) {return changePage(page)}
	  }); 
*/
})(jQuery);