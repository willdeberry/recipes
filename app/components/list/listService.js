(function() {
	'use strict';

	angular
		.module('list')
		.service('listService', listService);

	listService.$inject = ['$http'];

	function listService($http) {
		return {
			getRecipes: function() {
				return $http({
					method: 'GET',
					url: '/rp/recipes'
				});
			}
		}
	}
})();
