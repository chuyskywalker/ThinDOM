ThinDOM: a thin DOM wrapper
---------------------------

Inspired by jQuery, this simple library lets you create DOM elements really fast, with
significantly more expressiveness than native DOM methods.

![How fast? Super fast.](http://i.imgur.com/nFw39JP.png)

## Usage


<pre><code>
var captionDOM = ThinDOM('div').attr('class', 'caption')
	.append(ThinDOM('div').attr('class', 'votes')
			.append(ThinDOM('a').attr({'class': 'up', 'href': '#'}))
			.append(ThinDOM('a').attr({'class': 'down', 'href': '#'})))
	.append(ThinDOM('div').attr('class', 'meta')
			.append(ThinDOM('span').text(author + ' - '))
			.append(ThinDOM('span').text(points + ' point' + plural)))
	.append(ThinDOM('p').html(body)).get();
</code></pre>
