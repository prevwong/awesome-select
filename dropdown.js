(function ( $ ) {

	$.fn.dropdown = function(options){
		var element = this;
		
		var options = $(this).children('option');
		build(element);
		$('body').on('click', '.dropdown', function(){
			animate($(this));
		})

		$(document).mouseup(function (e)
		{
		    var dropdown = $(".dropdown");

		    if (!dropdown.is(e.target) // if the target of the click isn't the container...
		        && dropdown.has(e.target).length === 0) // ... nor a descendant of the container
		    {
		       deanimate()
		    }
		});

		return {

			blue: function(){
				element.css('color', 'blue')
			}
		}
	};

	function build(element){
		var placeholder = element.attr('data-placeholder')

		var options = element.children('option')
		var selected = false;
		var classes = "dropdown";
		var options_html = '';
		options.each(function(){
			if ( $(this).attr('selected') == "selected") {
				selected = true
			}
			options_html += '<li><a>'+ $(this).text() +'</a></li>';
		})

		if ( selected == true ) {
			classes += ' hasValue';
		}

		var dropdown_html = '<div class = "dropdown"><div class = "bg"></div>';
			dropdown_html += '<div class = "front_face">'
				dropdown_html += '<span class = "placeholder=">'+ placeholder +'</span>'
			dropdown_html += '</div>';
			dropdown_html += '<div class = "back_face"><ul>'
				dropdown_html += options_html
			dropdown_html += '</ul></div>';
		dropdown_html += '</div>';

		$(dropdown_html).insertAfter(element)
		element.hide()
		
	}

	function animate(element){
		element.addClass('placeholder_animate')
		setTimeout(function(){
			element.addClass('placeholder_animate2')
			element.addClass('animate')
			element.addClass('animate2')
			
		}, 100)
		
	}

	function deanimate(){
		$('.dropdown').removeClass('animate2')
		setTimeout(function(){
		$('.dropdown').removeClass('animate')
		$('.dropdown').removeClass('placeholder_animate2')
			setTimeout(function(){
				$('.dropdown').removeClass('placeholder_animate')
			},100)
		}, 200)
	}

	function change(elem){
		elem.css('color', 'green')
	}
}( jQuery ));

