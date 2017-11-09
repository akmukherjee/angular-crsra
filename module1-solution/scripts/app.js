(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchController', LunchController);

LunchController.$inject=['$scope', '$filter']

function LunchController($scope, $filter){
	$scope.lunchmenu="";
	$scope.message = "";
	$scope.customStyle = {};

	$scope.displayMessage = function (){
		 var comma = ',';
		 var MESSAGE_EMPTY = "Please enter data first";
		 var MESSAGE_ENJOY = "Enjoy!"
		 var MESSAGE_TOOMUCH = "Too Much!";

		 if($scope.lunchmenu==""){
		 	$scope.message = MESSAGE_EMPTY;
		 	$scope.customStyle.style = {"color":"red"};
		 	return;
		 }
		 $scope.customStyle.style = {"color":"green"};
		 var lunchMenuStrings = $scope.lunchmenu.split(comma);
		 if(lunchMenuStrings.length <=3){
		 	$scope.message = MESSAGE_ENJOY;

		 }else{
		 	$scope.message = MESSAGE_TOOMUCH;
		 }
	}


};

})();