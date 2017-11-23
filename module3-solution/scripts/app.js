(function () {

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
	var ddo = {
		
		templateUrl: 'foundItems.html',
		scope: {
			found: '<',
			onRemove: '&',
			
		}
	};
	return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController (MenuSearchService) {
	var ctrl = this;
	ctrl.searchTerm = '';
	

	ctrl.searchItem = function () {

		if (ctrl.searchTerm !== '') {
			var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
			promise.then(function(result) {
				ctrl.found = result;
				
			})
			.catch(function(error) {
			console.log(error);
			});
		}
		
	};


	ctrl.remove = function (itemIndex) {
		return MenuSearchService.removeItem(itemIndex);
	}

}

MenuSearchService.$inject = ['$http'];
function MenuSearchService ($http, searchTerm) {
	var service = this;
	var foundItems = [];
	

	service.getMatchedMenuItems = function (searchTerm) {
		
		searchTerm = searchTerm.trim().toLowerCase();
		var API_BASE_PATH = "https://davids-restaurant.herokuapp.com";
		return $http ({
			method: "GET",
			url: (API_BASE_PATH+"/menu_items.json")
		})
		.then(function(response) {
			foundItems = [];
			for(var i=0; i<response.data.menu_items.length; i++) {
				
				if (response.data.menu_items[i].description.toLowerCase().indexOf(searchTerm) !== -1) {
					foundItems.push(response.data.menu_items[i]);
				}
				
			}
			return foundItems;

		}).catch(function(errorResponse) {
			console.log(errorResponse);
		});		
	};

	service.removeItem = function (itemIndex) {
		foundItems.splice(itemIndex, 1);
		return foundItems;
	};


}

})();