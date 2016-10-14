(function() {
	'use strict';

	angular
		.module('list', [])
		.controller('listController', listController);

	listController.$inject = ['$scope', 'listService', '$mdDialog', 'appService'];

	function listController($scope, listService, $mdDialog, appService) {
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

		function dialogController($scope, $mdDialog, recipe, appService) {
			$scope.recipe = recipe;

			$scope.cancel = function() {
				$mdDialog.cancel();
			}

			$scope.postRecipe = function() {
				$mdDialog.cancel();
				appService.postRecipe(recipe);
			}

			$scope.deleteRecipe = function() {
				var index = vm.recipes.indexOf(recipe);
				vm.recipes.splice(index, 1);
				$mdDialog.cancel();
				appService.deleteRecipe(recipe._id.$oid);
			}

			$scope.courses = appService.courses();
		}

	}

})();
