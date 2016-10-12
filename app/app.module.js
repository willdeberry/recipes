(function() {
	'use strict';

	angular
		.module('app', ['ngMaterial', 'ui.router', 'add', 'list'] )
		.config(function($mdThemingProvider) {
			$mdThemingProvider.theme('default')
				.primaryPalette('teal')
				.accentPalette('amber');
		})
		.controller('appController', appController);

	appController.$inject = ['$scope', '$location', 'appService'];

	function appController($scope, $location, appService) {
		var vm = this;
		vm.selectedIndex = 0;

		$scope.$watch('vm.selectedIndex', function(current, old) {
			switch (current) {
				case 0:
					$location.url('/list');
					break;
				case 1:
					$location.url('/add');
					break;
			}
		});
	}
})();
