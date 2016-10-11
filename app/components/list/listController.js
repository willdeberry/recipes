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

		vm.show = function(recipe) {
			$mdDialog.show({
				locals: {recipe: recipe},
				controller: dialogController,
				clickOutsideToClose: true,
				templateUrl: 'app/components/list/recipeView.html'
			});
		}

		vm.edit = function(recipe) {
			$mdDialog.show({
				locals: {recipe: recipe},
				controller: dialogController,
				clickOutsideToClose: true,
				templateUrl: 'app/components/list/editView.html'
			});
		}

		function dialogController($scope, $mdDialog, recipe) {
			$scope.recipe = recipe;

			$scope.cancel = function() {
				$mdDialog.cancel();
			};
		}

	}

})();
