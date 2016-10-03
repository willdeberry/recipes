(function() {
	'use strict';

	angular
		.module('list', [])
		.controller('listController', listController);

	listController.$inject = ['$scope', 'listService', '$mdDialog'];

	function listController($scope, listService, $mdDialog) {
		var vm = this;
		vm.recipes = {};

		listService.getRecipes().then(function(response) {
			vm.recipes = response.data.message;
		});

		vm.showAll = function(recipe) {
			$mdDialog.show({
				locals: {recipe: recipe},
				controller: recipeController,
				clickOutsideToClose: true,
				templateUrl: 'app/components/list/recipeView.html'
			});
		}

		function recipeController($scope, $mdDialog, recipe) {
			$scope.recipe = recipe;

			$scope.cancel = function() {
				$mdDialog.cancel();
			};
		}

	}

})();
