ThinDOM: a thin DOM wrapper
---------------------------

Inspired by jQuery, this simple library lets you create DOM elements really fast, with
significantly more expressiveness than native DOM methods.

![How fast? Super fast.](http://i.imgur.com/nFw39JP.png)

## Usage
A full example is on [jsfiddle](http://jsfiddle.net/rRFgz/11/).

<code>
var captionDOM = new ThinDOM('div').attr('class', 'caption')
	.append(new ThinDOM('div').attr('class', 'votes')
			.append(new ThinDOM('a').attr({'class': 'up', 'href': '#'}))
			.append(new ThinDOM('a').attr({'class': 'down', 'href': '#'})))
	.append(new ThinDOM('div').attr('class', 'meta')
			.append(new ThinDOM('span').text(author + ' - '))
			.append(new ThinDOM('span').text(points + ' point' + plural)))
	.append(new ThinDOM('p').html(body)).get();
</code>
