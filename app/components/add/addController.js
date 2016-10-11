(function() {
	'use strict';

	angular
		.module('add', ['angular-media-preview', 'naif.base64'] )
		.controller('addController', addController);

	addController.$inject = ['$scope', 'addService'];

	function addController($scope, addService) {
		var vm = this;
		vm.courses = ['breakfast', 'appetizer', 'lunch', 'dinner', 'dessert'];
		vm.measurements = ['tsp', 'tbsp', 'cup', 'fl oz', 'pt', 'qt', 'gal', 'oz', 'lb', 'drops', 'pinch', 'large', 'medium', 'small', 'thick', 'thin'];
		vm.image = null;
		vm.recipe = {};
		vm.recipe.name = null;
		vm.recipe.course = null;
		vm.recipe.description = null;
		vm.recipe.calories = null;
		vm.recipe.servings = null;
		vm.recipe.instructions = null;
		vm.recipe.ingredients = null;
		vm.recipe.rating = null;
		vm.recipe.image = [];

		vm.saveRecipe = function() {
			addService.postRecipe(vm.recipe).then(function(response) {
				vm.recipe = {};
				var imageDiv = angular.element( document.querySelector( '#previewContainer' ) );
				imageDiv.empty();
				$scope.addRecipe.$setPristine(true);
				$scope.addRecipe.$setUntouched(true);
			});
		}
	}
})();
