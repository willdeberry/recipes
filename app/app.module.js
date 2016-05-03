(function() {
	'use strict';

	angular
		.module('app', ['ngMaterial', 'ui.router', 'add'] )
		.config(function($mdThemingProvider) {
			$mdThemingProvider.theme('default')
				.primaryPalette('teal')
				.accentPalette('amber');
		})

})();
