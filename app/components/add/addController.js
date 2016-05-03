(function() {
	'use strict';

	angular
		.module('add', ['base64', 'angular-media-preview', 'naif.base64'] )
		.controller('addController', [
				'$scope',
				'$base64',
				'addService',
				addController
		]);


	function addController($scope, $base64, addService) {
		var vm = this;
		vm.courses = ['breakfast', 'appetizer', 'lunch', 'dinner', 'dessert'];
		vm.measurements = ['tsp', 'tbsp', 'cup', 'fl oz', 'pt', 'qt', 'gal', 'oz', 'lb'];
		vm.image = null;
		vm.recipe = {};
		vm.recipe.name = null;
		vm.recipe.course = null;
		vm.recipe.description = null;
		vm.recipe.calories = null;
		vm.recipe.servings = null;
		vm.recipe.instructions = [];
		vm.recipe.ingredients = [];
		vm.recipe.rating = null;
		vm.recipe.image = [];

		vm.saveRecipe = function() {
			addService.postRecipe(vm.recipe).then(function(response) {
				vm.recipe = {};
				var imageDiv = angular.element( document.querySelector( '#previewContainer' ) );
				imageDiv.empty();
				$scope.instruction = '';
				$scope.ingredient = '';
				$scope.addRecipe.$setPristine(true);
				$scope.addRecipe.$setUntouched(true);
			});
		}

		vm.updateIngredients = function(ingredient) {
			vm.recipe.ingredients.push({
				'name': ingredient.name,
				'amount': ingredient.amount,
				'measurement': ingredient.measurement
			});
			$scope.ingredient.amount = '';
			$scope.ingredient.measurement = '';
			$scope.ingredient.name = '';
		}

		vm.updateList = function(name, item) {
			vm.recipe[name].push(item);
			$scope.instruction = '';
		}
	}

})();
