dropdown_count = 0;
(function ( $ ) {

	$.fn.dropdown = function(options){
		var element = $(this);
		var opts = $.extend({}, $.fn.dropdown.defaults, options)
		
		element.each(function(){
			build($(this), opts);
		})
		
		
		$('body').on('click', '.dropdown', function(){
			//alert(3)
			if ( $(this).hasClass('animate') == false ) {
				animate($(this))
			}
		})

		$('body').on('click', '.dropdown ul li a', function(){
			setValue($(this).parents('.dropdown'), $(this).parent('li').index())
		})

		

		return {

			blue: function(){
				element.css('color', 'blue')
			}
		}
	};

	$.fn.dropdown.defaults = {
		background: "#e5e5e5",
		onOpen_background: "#fff",
		placeholder_color: "#000",
		link_color: "#000"
	}



	function build(element, opts){
		var placeholder = element.attr('data-placeholder')
		var id = element.attr('id')
		var options = element.children('option')
		var selected = false;
		var classes = "dropdown";
		var options_html = '';

		var background = opts["background"]
		var onOpen_background = opts["onOpen_background"]
		var placeholder_color = opts["placeholder_color"]
		var link_color = opts["link_color"]

		options.each(function(){
			if ( $(this).attr('selected') == "selected") {
				selected = $(this).text()
			}
			options_html += '<li><a>'+ $(this).text() +'</a></li>';
		})

		if ( selected !== false ) {
			classes += ' hasValue';
		}

		if (typeof id !== typeof undefined && id !== false) {
			id_html = id
		} else {
			id_html = 'dropdown_' + dropdown_count;
			$(element).attr('id', id_html)
		}



		

		var dropdown_html = '<div id="euler_'+ id_html +'" data-select="'+ id_html +'" class = "'+ classes +'"><div class = "bg"></div>';
			dropdown_html += '<div class = "front_face">'
				dropdown_html += '<div class = "bg"></div>'
				dropdown_html += '<div class = "content">'
					if ( selected !== false ) {
						dropdown_html += '<span class="current_value">'+ selected +'</span>';
					}
					dropdown_html += '<span class = "placeholder">'+ placeholder +'</span>'
					dropdown_html += '<i class = "icon">'+ icon() +'</i>'
				dropdown_html += '</div>'
			dropdown_html += '</div>';
			dropdown_html += '<div class = "back_face"><ul>'
				dropdown_html += options_html
			dropdown_html += '</ul></div>';
		dropdown_html += '</div>';

		$(dropdown_html).insertAfter(element)
		//$('#euler_' + id_html).css("height", $('#euler_' + id_html).outerHeight() - $('#euler_' + id_html).find('.back_face').outerHeight() )
		element.hide()


	}

	function animate(element){
		if ( $('.dropdown.animate').length > 0 ) { 
			deanimate($('.dropdown').not(element))
			var timeout = 600
		} else { 
			var timeout = 10
		}

		setTimeout(function(){
		setTimeout(function(){
			var back_face = element.find('.back_face')
			var bg = element.find('> .bg')

			bg.css({
				"height" : element.outerHeight() + back_face.outerHeight()
			})
			back_face.css({
				"margin-top" : $(element).outerHeight()
			})
			

			element.addClass('placeholder_animate')
			setTimeout(function(){
				element.addClass('placeholder_animate2')
				element.addClass('animate')
				element.addClass('animate2')
				
			}, 100)
		}, timeout)
		}, 200)
	}

	function deanimate(dropdowns){
		if (dropdowns == null ) {
			var dropdown = $('.dropdown')
		} else {
			var dropdown = dropdowns
		}
		setTimeout(function(){
			dropdown.removeClass('animate2')
			setTimeout(function(){
				dropdown.removeClass('animate')
				dropdown.children(".bg").css({
					"height" : 0
				})
				dropdown.removeClass('placeholder_animate2')
				setTimeout(function(){
					dropdown.removeClass('placeholder_animate')
				},100)
			}, 200)
		}, 400)
	}

	function setValue(euler_dropdown, value_index){
		var id = euler_dropdown.attr('data-select')
		var select = document.getElementById(id);
		var option_value = $(select).children('option').eq(value_index)
		var callback = $(select).attr('data-callback')
		$(select).val(option_value.val())
		$(euler_dropdown).find('.current_value').remove()
		$(euler_dropdown).find('.front_face .content').prepend('<span class = "current_value">'+ option_value.text() + '</span>')
		$(euler_dropdown).addClass('hasValue')

		if (typeof callback !== typeof undefined && callback !== false) {
			window[callback](option_value.val())
		}
		setTimeout(function(){
			deanimate()
		}, 100)
		
	}

	function icon(){
		return '<svg version="1.1" id="Chevron_thin_down" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve"><path d="M17.418,6.109c0.272-0.268,0.709-0.268,0.979,0c0.27,0.268,0.271,0.701,0,0.969l-7.908,7.83c-0.27,0.268-0.707,0.268-0.979,0l-7.908-7.83c-0.27-0.268-0.27-0.701,0-0.969c0.271-0.268,0.709-0.268,0.979,0L10,13.25L17.418,6.109z"/></svg>';
	}

	function change(elem){
		elem.css('color', 'green')
	}
}( jQuery ));

function hello(value){
	console.log("hello world! the selected value is " + value)
}
