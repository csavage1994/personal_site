var clicked = false;
var submitted = false;
var captchaStyles;
var display;
var popInterval;
$(function() {
  // initial page load goodies
  setTimeout(function() {
    setupIntro();
    $('.sticky-header').removeClass('delayed');
  }, 500)
  setTimeout(function() {
    if ($('.diamond.visible').length === 0) {
      $('#progress-intro > span.underlined > span').addClass('visible');
      $('#progress-intro > span').addClass('visible');
    }
  }, 100);
  $(window).scroll(function(){
    $(".parallax").css("opacity", 1 - $(window).scrollTop() / 575);
  });
  $(".parallax").css("opacity", 1 - $(window).scrollTop() / 450);

  // popshow stuff
  display = new PopShow('.sticky-header', 'black', 10, 10, 20, 150);
  display.init();

  var services = ['Collaborative', 'Open-minded', 'Reliable', 'Fast', 'Confident', 'Creative', 'Flexible', 'Communicative', 'Dedicated'];
  var slideIndex = 0;
  var $slider = $('.fader');
  var slideDistance = ($slider.height() / 2) + 'px';
  setInterval(function() {
    $slider.animate({bottom: slideDistance, opacity: 0}, function() {
      $slider
        .css({bottom: ('-' + slideDistance)})
        .text(services[slideIndex])
        .animate({bottom: '0px', opacity: 1})

      slideIndex++;
      if (slideIndex > services.length - 1) {
        slideIndex = 0;
      }
    })
  }, 3000)

  waypoints();
  siteNavSetup();

  $('.submit').on('click', function(e) {
    e.preventDefault();
    if (!submitted) {
      validateForm();
    }
  })
})

function siteNavSetup() {
  $('.diamond').on('click', function() {
    var location = $(this).data().location;
    var offset = ( location === '#mission') ? -55 : 0;
    // prevents waypoint functions from being triggered until scrolling is finished
    if (clicked === true || $(this).hasClass('visible')) { return; }
    clicked = true;

    $('.diamond.visible').parent().find('.underlined').removeClass('visible');
    $('.diamond.visible').parent().find('.underline').removeClass('visible');
    $('.diamond.visible').removeClass('visible');

    $(this).parent().find('.underlined > .underline').toggleClass('visible');
    $(this).toggleClass('visible');

    if ($.browser.mobile) {
      $(this).parent().find('.underlined').toggleClass('visible');
    }

    $('html, body').animate({
      scrollTop: ($(location).offset().top + offset)
    }, 500, function() {
      clicked = false;
    });
  })

  $('.diamond').on('mouseenter mouseleave', function() {
    if ($(this).hasClass('visible') || $.browser.mobile) { return; }
    $(this).parent().find('.underlined').toggleClass('visible');
  })
}

function waypoints() {
  var $listItems = $('.underlined, .underline, .diamond');

  $('#mission').waypoint(function(direction) {
    $('#fade-up').toggleClass('fade-up')
    $('.sticky-header').toggleClass('show');
    pop(display);
  }, {
    offset: '55%'
  })

  $('#mission').waypoint(function(direction) {
    $listItems.toggleClass('light-bg');
    updateNav('mission', direction);
  }, {
    offset: '150px'
  })

  $('#experience').waypoint(function(direction) {
    updateNav('experience', direction);
    pop(display);
    $listItems.toggleClass('light-bg');
  }, {
    offset: '150px'
  })

  // $('#experience').waypoint(function() {
  //   $listItems.toggleClass('light-bg');
  // }, {
  //   offset: '150px'
  // })

  $('#tech').waypoint(function(direction) {
    updateNav('tech', direction);
    pop(display);
  }, {
    offset: '45%'
  })

  $('#services').waypoint(function(direction) {
    updateNav('services', direction);
    pop(display);
  }, {
    offset: '45%'
  })

  $('#contact').waypoint(function(direction) {
    pop(display);
    $listItems.toggleClass('light-bg');
    updateNav('contact', direction);

    if (direction === 'down') {
      var $captcha = $('#captcha-styles');
      captchaStyles = $captcha[0].outerHTML;
      $captcha.remove();
    } else {
      $('body').append(captchaStyles);
    }

  }, {
    offset: '250px'
  })

  function updateNav(selector, direction) {
    var sections = ['intro', 'mission', 'experience', 'tech', 'services', 'contact'];

    if (clicked) { return };

    if (direction === 'down') {
      $('.diamond.visible').parent().find('.underlined').removeClass('visible');
      $('.diamond.visible').parent().find('.underline').removeClass('visible');
      $('.diamond.visible').removeClass('visible');

      $('#progress-' + selector + ' > .underlined').addClass('visible');
      $('#progress-' + selector + ' > .underlined > .underline').addClass('visible');
      $('#progress-' + selector + ' > .diamond').addClass('visible');
    } else {
      var prev = sections[sections.indexOf(selector) - 1]

      $('#progress-' + selector + ' > .underlined').removeClass('visible');
      $('#progress-' + selector + ' > .underlined > .underline').removeClass('visible');
      $('#progress-' + selector + ' > .diamond').removeClass('visible');

      $('#progress-' + prev + ' > .underlined').addClass('visible');
      $('#progress-' + prev + ' > .underlined > .underline').addClass('visible');
      $('#progress-' + prev + ' > .diamond').addClass('visible');
    }
  }
}

function setupIntro() {
  $('.opaque').addClass('show');
  setTimeout(function() {
    var logo = $('.persp')
    var boundingBox = logo[0].getBoundingClientRect();
    var logoHorizCenter = (boundingBox.width / 2) + boundingBox.left;
    var logoVertCenter = (boundingBox.height / 2) + boundingBox.top;

    if ($.browser.mobile) { return; }
    $('.train-bg, .site-progress').on('mousemove', animateHeader)

    $('.train-bg, .site-progress').on('mouseenter', function() {
      boundingBox = $('.persp')[0].getBoundingClientRect();
      logoHorizCenter = (boundingBox.width / 2) + boundingBox.left;
      logoVertCenter = (boundingBox.height / 2) + boundingBox.top;
      $('.train-bg, .site-progress').on('mousemove', animateHeader)
    })
    
    $('.train-bg, .site-progress').on('mouseleave', function(e) {
      $('.train-bg').off('mousemove');
      $('.mousemove_rotate').removeAttr('style');
    })

    function animateHeader(e) {
      var rotate_X = (e.pageX - logoHorizCenter) / 10;
      var rotate_Y = (e.pageY - logoVertCenter) / -10;
  
      if (rotate_X > 20) { rotate_X = 20 }
      if (rotate_X < -20) { rotate_X = -20 }
  
      if (rotate_Y > 20) { rotate_Y = 20 }
      if (rotate_Y < -20) { rotate_Y = -20 }
      
      $('.mousemove_rotate').css('transform', 'rotateX(' + rotate_Y + 'deg) rotateY(' + (rotate_X) + 'deg)')
    }
  }, 500)
}

function formSubmit(data) {
  var $name = $('#name')
  var $email = $('#email');
  var $message = $('#message');

  var body = {
    from: $name.val(),
    email: $email.val(),
    message: $message.val(),
    verify: data,
  };

  submitted = true;

  $('.form-container > span').removeClass('form-error')
  $('.form-container > span').text('Submit Successful!')

  $('.narrow').addClass('success')
  $('.narrow').text('Submit Successful!')

  $('#name, #email, #message').val('');

  $.post('/verify', body, function(res) {
    
  })
}

function validateForm() {
  var $name = $('#name');
  var $email = $('#email');
  var $message = $('#message');
  var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var valid = true;
  var errors = [];

  $name.removeClass('required');
  $message.removeClass('required');
  $email.removeClass('required');

  if ($('.form-error').text().length) {
    $('.form-error').text('');
  }

  if ($name.val().length <= 0) {
    $name.toggleClass('required');
    valid = false;
    errors.push('Name');
  }

  if (!emailRegex.exec($email.val())) {
    $email.toggleClass('required');
    valid = false;
    errors.push('Email');
  }

  if ($message.val() <= 0) {
    $message.toggleClass('required');
    valid = false;
    errors.push('Message');
  }

  if (!valid) {
    var $formError = $('.form-error');
    if (errors.length === 1) {
      $formError.text(errors[0] + ' is required')
    } else {
      var errorString = '';
      errors.forEach(function(err, i) {
        if (i === errors.length - 1) {
          errorString += 'and ' + err + ' ';
        } else if (i === errors.length - 2 && errors.length === 2) {
          errorString += err + ' ';
        } else {
          errorString += err + ', ';
        }
      })
      errorString += 'are required';
      $formError.text(errorString);
    }
    if ($formError.hasClass('hidden')) {
      $formError.removeClass('hidden')
    }
    return;
  }
  // form was successfully validated
  grecaptcha.reset();
  grecaptcha.execute();
}

function pop(display) {
  var opts = [1,2,3,4,5,6,7,8,9,10]; // add randomness
  var count = 0;
  clearInterval(popInterval);

  popInterval = setInterval(function() {
    var rand = Math.floor(Math.random() * 11);
    var mag = Math.random() * 100;
    display.ping({
      mag: mag,
      type: opts[rand],
      waveThreshold: 200,
      maxWaves: 7,
    });
    count++;
    if (count > 5) {
      clearInterval(popInterval);
    }
  }, 100);
}

class PopShow {
	constructor(element, backgroundColor, minRadius, maxWaves, maxFeedCount, timeBetweenWaves) {
		this.selected = element;
		this._backgroundColor = backgroundColor;
		this._colors = {};
		this._focused = true;
		this._minRadius = minRadius;
		this._maxWaves = maxWaves;
		this._feedItemCount = 0;
		this._maxFeedCount = maxFeedCount;
		this._feedInteracting = false;
		this._drawerOpen = true;
		this._feedItemDispatching = false;
    this._timeBetweenWaves = timeBetweenWaves;
	}
  
	_appendDisplay() {
		this._vis = d3.select(this.selected)
			.append('svg')
			.classed('popshow', true);
	}

	ping(opts, replay) {

		if(!this._focused) { return; }

		const boundingBox = this._vis.node().getBoundingClientRect();
		const rawWaves = Math.ceil((opts.mag / opts.waveThreshold) * opts.maxWaves);
		const waves = (rawWaves > this._maxWaves) ? this._maxWaves : rawWaves;
		const x = (Math.random() * boundingBox.width);
		const y = (Math.random() * boundingBox.height);

		let color;

		if(this._colors[opts.type]) {
			color = this._colors[opts.type];
		} else if(opts.color) {
			color = opts.color;
			this._colors[opts.type] = opts.color;
		} else {
			color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
			this._colors[opts.type] = color;
		}

		for(let i = 1; i <= waves; i++) {

			setTimeout(function() {
				const circ = this._vis
					.append('circle')
					circ.attr('cx', x)
					.attr('cy', y)
					.attr('r', '1')
					.attr('fill', 'transparent')
					.style('stroke', color)
					.style('stroke-width', '1px')
					.transition()
					.duration(2500)
					.tween('attr:r', function() {
						const _self = this;
						const i = d3.easeQuadOut;
						return function(t){
							const r = ( _self._minRadius + (i(t) * opts.mag ) );
							circ.attr('r', r);
							if(t < 0.10) {
								circ.style('opacity', (t * 10));
							} else if(t >= 0.5 && t <= 0.82) {
								circ.style('opacity', (-1 * 10 / 3 * t) + (8 / 3)); // function for (0.5, 1) -> (0.8, 0)
							}
						};
					}.bind(this))
					.on('end', function() {
						d3.select(this).remove();
					})
			}.bind(this), (i * this._timeBetweenWaves));

		}
	}

	init() {
		document.addEventListener('visibilitychange', function() {
			this._focused = !this._focused;
		})
		this._appendDisplay();
	}
}

var recaptchaCallback = function () {
  grecaptcha.render('captcha', {
      sitekey: '6LfoxzwUAAAAANJ48P9ePg_d09kov2b1t6n-ACLN',
      callback: formSubmit
  });
}