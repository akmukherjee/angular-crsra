(function () {
'use strict';


	
	angular.module('ShoppingListCheckOff', [])
	.controller('ToBuyController',ToBuyController)
	.controller('AlreadyBoughtController',AlreadyBoughtController)
	.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	ToBuyController.$inject = ['ShoppingListCheckOffService'];

	function ToBuyController(ShoppingListCheckOffService){

		var toBuyCtrlr = this;
		toBuyCtrlr.toBuyItems = ShoppingListCheckOffService.getToBuyItems();
		//toBuyCtrlr.errorMsg = "";
		toBuyCtrlr.errorMsg="Everything is bought!";
		toBuyCtrlr.buyItem = function(itemIndex){
			ShoppingListCheckOffService.buyItem(itemIndex);
		};
	
	
	
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

function AlreadyBoughtController(ShoppingListCheckOffService){
	var alreadyBoughtCtrlr = this;
	alreadyBoughtCtrlr.errorMsg = "Nothing bought yet.";
	alreadyBoughtCtrlr.boughtItems = ShoppingListCheckOffService.getBoughtItems();
	
	
}

	function ShoppingListCheckOffService () {
		  var service = this;

		  // List of shopping items
		  var toBuyList =[{name:'Cookies', quantity:'10'},
		  				  {name: 'Chips', quantity:'5'}, 
		  				  {name: 'Chicken Wings', quantity: '5'},
		  				  {name: 'Ice Cream', quantity: '2'},
		  				  {name: 'Soft Drinks', quantity: '10'}];

		  var alreadyBoughtList =[];

		// Add Item to the Bought List and remove from toBuyList
		  service.buyItem = function(itemIndex){
		  	alreadyBoughtList.push(toBuyList[itemIndex]);
		  	toBuyList.splice(itemIndex,1);
		  }

		  service.getBoughtItems = function(){
		  	return alreadyBoughtList;
		  }
		 
		 service.getToBuyItems = function(){
		 	return toBuyList;
		 }

	}
})();