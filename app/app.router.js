(function() {
	'use strict';

	angular.module('app')
		.config(function($stateProvider, $urlRouterProvider) {
			$urlRouterProvider.otherwise('/list');
			$stateProvider
				.state('list', {
					url: '/list',
					templateUrl: 'app/components/list/listView.html'
				})
				.state('add', {
					url: '/add',
					templateUrl: 'app/components/add/addView.html',
					controller: 'addController',
					controllerAs: 'vm'
				});
		});
})();
