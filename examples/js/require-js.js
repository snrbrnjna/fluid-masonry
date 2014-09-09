/*global requirejs: false*/

// -------------------------- pkgd -------------------------- //

/*
requirejs( [ '../../dist/masonry.pkgd' ], function( Masonry ) {
  new Masonry( document.querySelector('#basic') );
});
// */

// -------------------------- bower -------------------------- //

/*
requirejs.config({
  baseUrl: '../bower_components'
});

requirejs( [ '../masonry' ], function( Masonry ) {
  new Masonry( document.querySelector('#basic') );
});
// */

// -------------------------- pkgd & jQuery -------------------------- //

 /*
requirejs.config({
  paths: {
    jquery: '../../bower_components/jquery/dist/jquery.min'
  }
});

requirejs( [ 'require', 'jquery', '../../dist/fluid-masonry.pkgd' ],
  function( require, $, FluidMasonry ) {
    require( [
      '../../bower_components/jquery-bridget/jquery.bridget',
      '../../bower_components/imagesloaded/imagesloaded'
    ],
    function() {
      $.bridget( 'fluidMasonry', FluidMasonry );
      var $container = $('.photos').imagesLoaded(function() {
        $container.fluidMasonry({
          minColumnWidth: '.grid-sizer',
          gutter: '.gutter-sizer',
          itemSelector: '.photo'
        });
      });
    }
  );
});
 */

// -------------------------- bower & jQuery -------------------------- //

// /*
requirejs.config({
  baseUrl: '../bower_components',
  paths: {
    jquery: 'jquery/dist/jquery.min'
  }
});

requirejs( [
    'jquery',
    '../fluid-masonry',
    'jquery-bridget/jquery.bridget',
    'imagesloaded/imagesloaded'
  ],
  function( $, FluidMasonry )  {
    $.bridget( 'fluidMasonry', FluidMasonry );
    var $container = $('.photos').imagesLoaded(function() {
      $container.fluidMasonry({
        minColumnWidth: '.grid-sizer',
        gutter: '.gutter-sizer',
        itemSelector: '.photo',
        // isFitWidth: true
      });
    });
  }
);
// */
