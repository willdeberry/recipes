(function() {
	'use strict';

	angular
		.module('app')
		.service('appService', appService);

	appService.$inject = ['$http'];

	function appService($http) {
		return {
			postRecipe: function(recipe) {
				return $http({
					method: 'POST',
					url: '/rp/recipes',
					headers: {'Content-Type': 'application/json'},
					data: recipe
				});
			},
			courses: function() {
				return ['breakfast', 'appetizer', 'lunch', 'dinner', 'dessert'];
			}
		}
	}
})();
