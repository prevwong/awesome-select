dropdown_count = 0;
(function ( $ ) {

	$(document).mouseup(function (e)
		{
		    var dropdown = $(".dropdown");

		    if (!dropdown.is(e.target) // if the target of the click isn't the container...
		        && dropdown.has(e.target).length === 0) // ... nor a descendant of the container
		    {
		        deanimate()
		    }
		});
		

	$.fn.dropdown = function(options){
		var element = $(this);
		var opts = $.extend({}, $.fn.dropdown.defaults, options)
		
		element.each(function(){
			dropdown_count += 1
			build($(this), opts);
		})
		

		this.on('click', function(){

			animate(getDropdownElement($(this)));
		})

		this.on('change', function(){
			setValue(this);
		})

		console.log(element.attr('id'))
	

		return {

			blue: function(){
				element.css('color', 'blue')
			}
		}
	};

	$.fn.dropdown.defaults = {
		background: "#e5e5e5",
		active_background: "#fff",
		placeholder_color: "#000",
		placeholder_active_color: "#000",
		option_color: "#000",
		vertical_padding: "20px",
		horizontal_padding: "40px"
	}


	function getDropdownElement(select){
		return $('.dropdown[data-select="' + select.attr('id') + '"]')
	}

	function build(element, opts){
		var placeholder = element.attr('data-placeholder')
		var id = element.attr('id')
		var options = element.children('option')
		var selected = false;
		var classes = "dropdown";
		var options_html = '';

		var background = opts["background"]
		var active_background = opts["active_background"]
		var placeholder_color = opts["placeholder_color"]
		var placeholder_active_color = opts["placeholder_active_color"]
		var option_color = opts["option_color"]
		var vertical_padding = opts["vertical_padding"]
		var horizontal_padding = opts["horizontal_padding"]

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



		var dropdown_html = '<div id="euler_'+ id_html +'" data-select="'+ id_html +'" class = "'+ classes +'"><div style="background:'+ active_background +'" class = "bg"></div>';
			dropdown_html += '<div style="padding:'+ vertical_padding +' '+ horizontal_padding +'" class = "front_face">'
				dropdown_html += '<div style="background:'+ background +'" class = "bg"></div>'
				dropdown_html += '<div data-inactive-color="'+ placeholder_active_color +'" style="color:'+ placeholder_color +'" class = "content">'
					if ( selected !== false ) {
						dropdown_html += '<span class="current_value">'+ selected +'</span>';
					}
					dropdown_html += '<span class = "placeholder">'+ placeholder +'</span>'
					dropdown_html += '<i class = "icon">'+ icon(placeholder_color) +'</i>'
				dropdown_html += '</div>'
			dropdown_html += '</div>';
			dropdown_html += '<div style="padding:'+ vertical_padding +' '+ horizontal_padding +'" class = "back_face"><ul style="color:'+ option_color +'">'
				dropdown_html += options_html
			dropdown_html += '</ul></div>';
		dropdown_html += '</div>';

		$(dropdown_html).insertAfter(element)
		//$('#euler_' + id_html).css("height", $('#euler_' + id_html).outerHeight() - $('#euler_' + id_html).find('.back_face').outerHeight() )
		element.hide()


	}

	function animate(element){
		if ( element.hasClass('animating') == false ) {
			element.addClass('animating')
		if ( $('.dropdown.animate').length > 0 ) { 
			deanimate($('.dropdown').not(element))
			var timeout = 600
		} else { 
			var timeout = 100
		}
		
		setTimeout(function(){
			var back_face = element.find('.back_face')
			back_face.show()

			
			var bg = element.find('> .bg')

			bg.css({
				"height" : element.outerHeight() + back_face.outerHeight()
			})
			back_face.css({
				"margin-top" : $(element).outerHeight()
			})
			
			
			element.addClass('placeholder_animate')
			setTimeout(function(){
				switchPlaceholderColor(element)
				if ( back_face.outerHeight() == 200 ) {
					back_face.addClass('overflow')
				}
				element.addClass('placeholder_animate2')
				element.addClass('animate')
				element.addClass('animate2')
				element.removeClass('animating')
				
			}, 100)
		}, timeout)
		}
	}

	function deanimate(dropdowns){
		if (dropdowns == null ) {
			var dropdown = $('.dropdown')
		} else {
			var dropdown = dropdowns
		}
			$(dropdown).each(function(){
				var element = $(this);
				if ( element.hasClass('animate') ) { 
				setTimeout(function(){
					element.removeClass('animate2')
					setTimeout(function(){
						element.find('.back_face').hide()

						element.removeClass('animate')
						switchPlaceholderColor(element)
						element.children(".bg").css({
							"height" : 0
						})
						element.removeClass('placeholder_animate2')
						setTimeout(function(){
							element.removeClass('placeholder_animate')
						},100)
					}, 200)
				}, 400)
				}
			})
	}

	function switchPlaceholderColor(element) {
		var placeholder_inactive_color = element.find('.front_face .content').attr('data-inactive-color')
		var placeholder_normal_color = element.find('.front_face .content').css('color')
		element.find('.front_face .content').attr('data-inactive-color', placeholder_normal_color)
		element.find('.front_face .content').css('color', placeholder_inactive_color)
		element.find('.front_face .icon svg').css('fill', placeholder_inactive_color)
						
	}
	function setValue(select){
		var val = $(select).val()
		var euler_dropdown = getDropdownElement($(select))
		var option_value = $(select).children('option[value="'+ val +'"]').eq(0)
		var callback = $(select).attr('data-callback')

		$(euler_dropdown).find('.current_value').remove()
		$(euler_dropdown).find('.front_face .content').prepend('<span class = "current_value">'+ option_value.text() + '</span>')
		$(euler_dropdown).addClass('hasValue')

		if (typeof callback !== typeof undefined && callback !== false) {
			window[callback](option_value.val())
		}
		setTimeout(function(){
			deanimate()
		}, 200)
		
	}

	function icon(color){
		return '<svg style="fill:'+ color +'" version="1.1" id="Chevron_thin_down" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve"><path d="M17.418,6.109c0.272-0.268,0.709-0.268,0.979,0c0.27,0.268,0.271,0.701,0,0.969l-7.908,7.83c-0.27,0.268-0.707,0.268-0.979,0l-7.908-7.83c-0.27-0.268-0.27-0.701,0-0.969c0.271-0.268,0.709-0.268,0.979,0L10,13.25L17.418,6.109z"/></svg>';
	}

	function change(elem){
		elem.css('color', 'green')
	}
}( jQuery ));

function hello(value){
	console.log("hello world! the selected value is " + value)
}


$(document).ready(function(){
	$('body').on('click', '.dropdown', function(){
		if ( $(this).hasClass('animate') == false )  {
			$('select#' + $(this).attr('id').replace('euler_', '')).trigger('click')
		}
	
	})
	$('body').on('click', '.dropdown ul li a', function(){
		var dropdown = $(this).parents('.dropdown')
		var value_index = $(this).parent('li').index()
		
		var id = dropdown.attr('data-select')
		var select = $('select#' + id)
		var option_value = $(select).children('option').eq(value_index)
		var callback = $(select).attr('data-callback')
		$(select).val(option_value.val())
		$(select).trigger('change')
	})
})