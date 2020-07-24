// NiceScroll

$(function() {  
    $("body").niceScroll({
		cursorwidth:"12px",
		zindex:4,
		cursorborder:"none",
		cursorborderradius:"0",
		cursorcolor: "#303030",
		scrollspeed:50,
		mousescrollstep:50,
		hidecursordelay:200,
	});
});

// Header Schrinking

function resizeHeaderOnScroll() {
  const distanceY = window.pageYOffset || document.documentElement.scrollTop,
  shrinkOn = 100,
  headerEl = document.getElementById('header');
  
  if (distanceY > shrinkOn) {
    headerEl.classList.add("smaller");
  } else {
    headerEl.classList.remove("smaller");
  }
}

window.addEventListener('scroll', resizeHeaderOnScroll);

// Scrolling each section

// Changing active class while scrolling
var sections = $('section')
  , nav = $('navbar')
  , nav_height = nav.outerHeight();

$(window).on('scroll', function () {
  var cur_pos = $(this).scrollTop();
  
  sections.each(function() {
    var top = $(this).offset().top - nav_height,
        bottom = top + $(this).outerHeight();
    
    if (cur_pos >= top && cur_pos <= bottom) {
      nav.find('a').removeClass('active');
      sections.removeClass('active');
      
      $(this).addClass('active');
      nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
    }
  });
});

nav.find('a').on('click', function () {
  var $el = $(this)
    , id = $el.attr('href');
  
  $('html, body').animate({
    scrollTop: $(id).offset().top - nav_height
  }, 500);
  
  return false;
});

// Form 

function onFocus(input) {
	var label = input.nextElementSibling;
	var span = input.nextElementSibling.nextElementSibling;
	// Move the ribbon
	span.style.width = "100%";
	span.style.left = "0";
	// Move the label
	label.style.top = "-10px";
	label.style.fontSize = "14px";
	label.style.color = "#3598D9";
}

function onBlur(input) {
	var label = input.nextElementSibling;
	var span = input.nextElementSibling.nextElementSibling;
	// Return the ribbon
	span.style.width = "0";
	span.style.left = "50%";
	// Return the lable ONLY IF the input is empty
	if (input.value == "") {
		label.style.top = "15px";
		label.style.fontSize = "16px";
		label.style.color = "#999";
	}
}

// Scroll To Top

$(function () {  
	var scrollButton = $('#scrollTop');
	  	scrollButton.click(function() {
		$('html,body').animate({ 
		  scrollTop : 0 
		}, 1500);
	  });
	});
