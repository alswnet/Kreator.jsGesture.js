define(['jquery', 'htmlEntites'], function($, htmlEntites) {
	var myModule = {
		// wrap the selected text in apropriate tags // makes words in bold/italic/underline
		_format : function (tag, span) {
			var target = getSelectionTarget();
			if(!target) return;
			var html = null;
			if (typeof window.getSelection != "undefined") {
				var sel = window.getSelection();
				if (sel.rangeCount) {
					var container = document.createElement("div");
					for (var i = 0, len = sel.rangeCount; i < len; ++i) {
						container.appendChild(sel.getRangeAt(i).cloneContents());
					}
					html = container.innerHTML;
				}
			} else if (typeof document.selection != "undefined") {
				if (document.selection.type == "Text") {
					html = document.selection.createRange().htmlText;
				}
			}
			if(html) {
				var value = '<'+tag+'>' + html + '</'+tag+'>';
				return target.innerHTML.replace(html, value);
			} else {
				return false;
			}
		},
		getSelectionTarget : function () {
			var target=null;

			if(window.getSelection) {
				target=window.getSelection().getRangeAt(0).commonAncestorContainer;
				return((target.nodeType===1)?target:target.parentNode);
			}
			
			else if(document.selection) {
				target=document.selection.createRange().parentElement();
			}

			return target;
		},
		format: function(tag, span) {
			var s = window.getSelection()
			, newstring = ''
			, find = s.toString().toLowerCase() // get the selection
			, string = span.html()
			, stringcpy = string;
			
			if (tag.match(/<.h?.>/gi)) {
				string = this.removeHeadings(string);
			}

			var sel;
			if (window.getSelection) {
				sel = window.getSelection();
				if (sel.rangeCount) {
					sel = sel.getRangeAt(0);
				}
			} else if (document.selection) {
				sel = document.selection.createRange();
			}
			
			if(!find.trim()) {
				console.log('nothing selected');
				return; // if nothing is selected
			}

			var t = '<'+tag+'>';
			string = string.replace(t, '');
			t = '</'+tag+'>';
			newstring += '<'+ tag +'>' + find + '</'+ tag +'>'; // wrap in apropriate tag
		
			if (string.match('href')) {
				return string.replace('>' + find + '<', '>' + newstring + '<');
			}
			
			return string.replace(find, newstring);
		},
		removeHeadings: function(string) {
			return string.replace(/<.h?.>/gi, '');
		},
		insertHiperlink: function(that, span) {
				var s = window.getSelection()
				, newstring = ''
				, find = s.toString();
			
			if(!$('input', that).length)
				$('<input type="text">')
					.attr('value', $('a', span).attr('href'))
					.appendTo(that)
					.on('keyup', function(e){
					var code = (e.keyCode ? e.keyCode : e.which);
					if(code == 13) {
						
						newstring += '<a href="http://'+$(this).val()+'">';
						newstring += find;
						newstring += '</a>';
						
						var re = new RegExp(find,"gi");
						console.log(re);
						var string = span.html().replace(re, newstring);
						console.log(string);
						$(this).remove();
						span.html(string);
					}
				}).focus();
		},
		// wrap the span in various tags
		paragraph: function(tag, span) {
			var content = this.removeHeadings(span.html());
			span.html('<' +tag + '>' + content + '</' + tag + '>');
		},
		formatCode: function($s) {
			// a quick example of paste-code-and-automatically-format-it
			// highlightAuto returns an object if the pasted code is recognised
			if(!$s) return;
			$s.html($s.html().replace(/(<([^>]+)>)/ig,""));
			var result = hljs.highlightAuto($s.html());
			if(result.keyword_count > 2) {
				// more than 2 because words like `if` can be interpreted as code
				$s.replaceWith('<pre contentEditable><code contentEditable>'+result.value+'</code></pre>');
				var $code = $('code', this.getCurrentSlide());
				$code.on('click', function(e){
					e.stopPropagation();
				});
				var content = $code.html();
				$code.html(htmlEntites(content));
			}
		},
		// align the text
		align: function(tag, span) {
			if(!span) return;
			var align = $('.alignment', span);
			if(align.length) { // if a class to align the element exists
				if(tag === 'center') { // if we want to center just remove the outer div
					span.html(align.html());
				} else { // just replace the class
					align.removeClass();
					align.addClass('alignment pull-' + tag);
				}
			// no previous alignment so just add the apropriate class
			} else span.html('<div class="alignment pull-' +tag + '">' + span.html() + '</div>');
		},
		checkLineBreaks: function(span) {
			if(!span) return false;
			var count = span.html().match(/(<div>)?<br>|(<div>)+/gi);
			if(count && count.length) {
				return true;
			} else {
				return false;
			}
		},
		trim: function(string) {
			console.log(string);
			return string.replace(/<div><br><\/div>/gi, '<br>');
		},
		tryToCreateList: function(span) {
			// we check the selected span for line breaks
			var response = this.checkLineBreaks(span);
			if(response) {
				// if we find any we turn those into a list
				var trim = this.trim(span.html());
				var html = '<li>' + trim.replace('<div>', '</li><li>');
				html = html.replace(/<div>/gi, '<li>')
							.replace(/<\/div>/gi, '</li>');
				span.html(html);
				return true; // we created a list
			} else {
				return false; // no list
			}
		}
	};

	return myModule;
		
});