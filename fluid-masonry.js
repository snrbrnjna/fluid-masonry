/*!
 * Fluid Masonry v1.0.0
 * extends the cascading grid layout library of
 * http://masonry.desandro.com by filling up the container in its full width.
 * MIT License
 */

( function( window ) {

'use strict';

// -------------------------- helpers -------------------------- //

var indexOf = Array.prototype.indexOf ?
  function( items, value ) {
    return items.indexOf( value );
  } :
  function ( items, value ) {
    for ( var i=0, len = items.length; i < len; i++ ) {
      var item = items[i];
      if ( item === value ) {
        return i;
      }
    }
    return -1;
  };

// -------------------------- masonryDefinition -------------------------- //

// used for AMD definition and requires
function fluidMasonryDefinition( Outlayer, Masonry ) {

  var FluidMasonry = Outlayer.create('fluidMasonry');

  // Override original measureColumns method of masonry
  FluidMasonry.prototype.measureColumns = function() {
    // my fluid stuff here
    // get the minColumnWidth
    this._getMeasurement( 'minColumnWidth', 'outerWidth' );
    this.minColumnWidth += this.gutter;

    // get container width
    this.getContainerWidth();

    // how many columns?
    this.cols = Math.floor( ( this.containerWidth + this.gutter ) / this.minColumnWidth );
    this.cols = Math.max( this.cols, 1 );

    // do we have more (or even less [=> restWidth negativ]) space?
    var restWidth = this.containerWidth + this.gutter - this.cols*this.minColumnWidth;
    var restWidthPerColumn = restWidth/this.cols;

    // what to do with the rounding error?
    // we add it on the left and right side of the container - unless we serve isFitWidth
    var roundingError = (restWidthPerColumn - Math.floor(restWidthPerColumn))*this.cols;
    this.centeringOffset = this.options.isFitWidth ? 0 : Math.round(roundingError/2);

    this.columnWidth = this.minColumnWidth + Math.floor(restWidthPerColumn);
    this.columnWidthInner = this.columnWidth - this.gutter;
  };

  // Calculate and set width of every item, then do the masonry layout pos math.
  // You can span a item over more columns with the data-columns attribute.
  FluidMasonry.prototype._getItemLayoutPosition = function( item ) {
    // calculate width of each item element
    var width = this.columnWidthInner;
    // check if element should span more than one column
    var colSpan = item.element.getAttribute('data-columns');
    if (colSpan > 1) {
      colSpan = Math.min(colSpan, this.cols);
      width = width*colSpan + (colSpan-1)*this.gutter;
    } else {
      colSpan = 1;
    }
    // set width of element
    item.element.style.width = width + 'px';

    /* the rest of the method is robbed and not overridden from the original 
       masonry method _getItemLayoutPosition for performance reasons. cause else 
       the colspan is calculated twice for every item */

    // calculate item size
    item.getSize();

    var colGroup = this._getColGroup( colSpan );
    // get the minimum Y value from the columns
    var minimumY = Math.min.apply( Math, colGroup );
    var shortColIndex = indexOf( colGroup, minimumY );

    // position the brick
    var position = {
      x: this.columnWidth * shortColIndex + this.centeringOffset,
      y: minimumY
    };

    // apply setHeight to necessary columns
    var setHeight = minimumY + item.size.outerHeight;
    var setSpan = this.cols + 1 - colGroup.length;
    for ( var i = 0; i < setSpan; i++ ) {
      this.colYs[ shortColIndex + i ] = setHeight;
    }

    return position;
  };

  FluidMasonry.prototype._resetLayout = Masonry.prototype._resetLayout;
  FluidMasonry.prototype.getContainerWidth = Masonry.prototype.getContainerWidth;
  FluidMasonry.prototype._getColGroup = Masonry.prototype._getColGroup;
  FluidMasonry.prototype._manageStamp = Masonry.prototype._manageStamp;
  FluidMasonry.prototype._getContainerSize = Masonry.prototype._getContainerSize;
  FluidMasonry.prototype._getContainerFitWidth = Masonry.prototype._getContainerFitWidth;
  FluidMasonry.prototype.needsResizeLayout = Masonry.prototype.needsResizeLayout;

  return FluidMasonry;
}

// -------------------------- transport -------------------------- //

if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( [
      'outlayer/outlayer',
      'masonry/masonry'
    ],
    fluidMasonryDefinition );
} else {
  // browser global
  window.FluidMasonry = fluidMasonryDefinition(
    window.Outlayer,
    window.Masonry
  );
}

})( window );
