(function($){

	$(document).ready(function() {

	var slidePanel = $('#slidePanel'),
		 slidePanelToogle = $('#slidePanel_toogle_id');
	slidePanelToogle.on('click', function() {
		slidePanel.slideToggle(500, 'linear');
		slidePanelToogle.toggleClass('slideOut');
	});

	var disappearingPostBtnsDelete = $('.disappearing_post_btn_delete');
	disappearingPostBtnsDelete.on('click', function() {
		var disappearingPost = $(this).off('click').parent().parent();
		disappearingPost.animate({
			opacity: '0', height: 'toggle'
		}, 300, 'linear');	
	});

	$('#chainableEffects_startBtn_id').on('click', function() {
		var effectBox = $('#chainableEffects_effectBox_id');
		var rightPos = effectBox.parent().width() - 1.5 * effectBox.width();

		effectBox
			.animate({left: rightPos, opacity: '0.5'}, 500, 'linear')
			.animate({width: 50, height: 50, top: 150}, 500, 'linear')
			.animate({width: 100, height: 100, left: 0, opacity: 1}, 500, 'linear')
			.animate({top: 50}, 300, 'linear')
			.slideUp(300, 'linear')
			.slideDown(300, 'linear');

		return false;
	});

	var accordeonPostContents = $('.accordeon_post_content');	
	accordeonPostContents.hide();
	accordeonPostContents.eq(0).show();
	$('.accordeon_post_title').on('click', function() {
		var postContent = $(this).next();
		if (postContent.is(':hidden') === true) {
			collapseAll(accordeonPostContents, 500);
		}			
		postContent.slideToggle(500, 'linear');
	});

	var links = $('.animatedHover_link');
	links.each(function(index, element) {
		var $element = $(element);
		$element.next().text($element.attr('title'));
	});
	links.hover(
		function() {

			$(this).next().css('display', 'block')
				.animate({opacity: 1, top: -80}, 400, 'linear');
		},
		function() {
			var hover = $(this).next();
			hover.animate({opacity: 0, top: -100}, 200, 'linear',
				function() {hover.css('display', 'none')});
		}
	);
	

	var collapsablePanelsPostContents = $('.collapsablePanels_post_content'),
		 collapseAllLink = $('#collapseAll_id'),
		 showAllMessageLink = $('#showAllMessage_id'),
		 collapsablePanelsPosts = $('.collapsablePanels_post'),
		 visiblePostContents = 1,
		 totalPosts = collapsablePanelsPosts.length,
		 minShowPosts = 5,
		 visiblePosts = (totalPosts > minShowPosts ? minShowPosts : totalPosts);

	collapsablePanelsPostContents.hide();
	collapsablePanelsPostContents.eq(0).show();

	$('.collapsablePanels_post_title').on('click', function() {
		var item = $(this).next();		
		if (item.is(':hidden'))
			++visiblePostContents;
		else
			--visiblePostContents;
		if (visiblePostContents > 0)
			collapseAllLink.addClass('clickable');
		else
			collapseAllLink.removeClass('clickable');
		item.slideToggle(300, 'linear');

	});

	collapseAllLink.on('click', function() {
		if (visiblePostContents > 0) {
			visiblePostContents = 0;
			collapseAllLink.removeClass('clickable');
			collapseAll(collapsablePanelsPostContents, 300);
		}
		return false;
	});

	if (totalPosts > minShowPosts) {

		var postsToCollapse = collapsablePanelsPosts.toArray().filter(
			function(item, i) {
				return i >= minShowPosts;
			});

		postsToCollapse.forEach(function(item) {
			$(item).hide();
		});

		showAllMessageLink.addClass('clickable').html(
			'Show all message (' + collapsablePanelsPosts.length + ')');

		showAllMessageLink.on('click', function() {
			if (visiblePosts === minShowPosts) {
				visiblePosts = totalPosts;
				showAllMessageLink.html(
					'Show ' + minShowPosts + ' only');			
			}
			else {
				visiblePosts = minShowPosts;
				showAllMessageLink.html(
					'Show all message (' + collapsablePanelsPosts.length + ')');
			}
			postsToCollapse.forEach(function(item) {
				$(item).slideToggle(300, 'linear');
			});
			return false;
		});
	}	
	
	var imgThumbs = $('#thumbsList_id li'),
		 imgView = $('#imageView_id'),
		 imgNumber = $('#imageNumber');

	imgThumbs.on('click', function() {
		var $this = $(this);
		imgThumbs.removeClass('active');
		$(this).addClass('active');
		var imgSrc = $this.children('img').attr('src');
		imgView.attr('src', imgSrc.replace("thumb", "lg"));
		imgNumber.text(imgSrc.substr(7, 1));
	});


	function collapseAll(objects, speed) {
		objects.slideUp(speed, 'linear');
	}

	}); // document.ready

}(jQuery));