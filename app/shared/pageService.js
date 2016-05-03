(function() {
	'use strict';

	angular.module('app')
		.service('pageService', ['$q', pageService]);

	function pageService($q) {
		var pages = [
			{
				name: 'Add Recipe',
				icon: 'add_box',
				url: 'app/components/add/addView.html',
				description: 'Add a new recipe'
			},
			{
				name: 'All Recipes',
				icon: 'list',
				url: 'app/components/list/listView.html',
				description: 'List of all the recipes'
			}
		]

		return {
			loadAllPages: function() {
				return $q.when(pages);
			}
		}
	}
})();
