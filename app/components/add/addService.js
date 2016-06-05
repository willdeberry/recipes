(function() {
	'use strict';

	angular
		.module('add')
		.service('addService', addService);

	addService.$inject = ['$http'];

	function addService($http) {
		return {
			postRecipe: function(recipe) {
				return $http({
					method: 'POST',
					url: '/rp/recipes',
					headers: {'Content-Type': 'application/json'},
					data: recipe
				});
			}
		}
	}
})();
