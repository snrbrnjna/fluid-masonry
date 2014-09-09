# Fluid Masonry

A cascading grid layout library extending [masonry](http:\\masonry.desandro.com) (by david desandro) by filling up the container in its full width.  

By specifying a minimum column width, the library tries to place as many columns with the given minimum width in its container as possible.

``` js
$('#container').fluidMasonry({
  minColumnWidth: 120,
  itemSelector: '.item'
});
```

This can be very usefull for fullwidth image galleries as you know that your images can get a maximum width of twice the ``minColumnWidth`` - for a single columns layout.

You can use element sizing for ``minColumnWidth`` in the same way you use it for the other options - except: __only absolute sizes__ make sense for this option.

For further documentation see the [docs for masonry](http://masonry.desandro.com).


## Install

Download packaged source file

+ [fluid-masonry.pkgd.js](dist/fluid-masonry.pkgd.js)
+ [fluid-masonry.pkgd.min.js](dist/fluid-masonry.pkgd.min.js)

### Bower

Install with [Bower :bird:](http://bower.io) `bower install fluid-masonry`.


## License

modified [MIT license](/license.md).
