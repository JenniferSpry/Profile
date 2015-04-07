(function() {
  'use strict';
  
  angular.module('crafts', [
    'wu.masonry',
    'bootstrapLightbox'
  ]).config(function(LightboxProvider) {
    LightboxProvider.getImageUrl = function(data) {
      return '../files/img/crafts/750x/' + data.imageFileName;
    };
    LightboxProvider.getImageCaption = function(data) {
      return 'insert description';
    };
    LightboxProvider.templateUrl = 'js/crafts/lightbox-template.html';
  });

})();
