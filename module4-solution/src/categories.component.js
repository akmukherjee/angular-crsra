(function () {
'use strict';

angular.module('MenuApp')
.component('categoriesList', {
  templateUrl: 'src/templates/categories.template.html',
  bindings: {
    categories: '<'
  }
});

})();