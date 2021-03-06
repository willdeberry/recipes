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
			deleteRecipe: function(id) {
				return $http({
					method: 'DELETE',
					url: '/rp/recipes?id=' + id
				});
			},
			courses: function() {
				return ['Breakfast', 'Appetizer', 'Lunch', 'Dinner', 'Dessert'];
			}
		}
	}
})();
