// Module
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// Routes
weatherApp.config(function ($routeProvider) {
	
	$routeProvider
	.when('/', {
		templateUrl: 'city_search.html',
		controller: 'citySearchCtrl'
	})
	.when('/forecast', {
		templateUrl: 'forecast_display.html',
		controller: 'forecastDisplayCtrl'
	})
	
});

// Services
weatherApp.service('cityService', function() {
	
	this.city = "Cork";
});

// Controllers
weatherApp.controller('citySearchCtrl', ['$scope', 'cityService', function ($scope, cityService) {
	
	$scope.city = cityService.city;
	
	$scope.$watch('city', function() {
		cityService.city = $scope.city;
	});
	
}]);

weatherApp.controller('forecastDisplayCtrl', ['$scope', '$resource', 'cityService', function ($scope, $resource, cityService) {
	
	$scope.city = cityService.city;
	
	$scope.weatherAPI = $resource("https://api.openweathermap.org/data/2.5/forecast/", {
		callback: "JSON_CALLBACK" 
	}, { get: { method: "JSONP" }});
	
	$scope.weatherResult = $scope.weatherAPI.get({
		q: $scope.city,
		appid: 'e2dfb9ff5721b59ad7f2a5779f7764b6'
	});
	
	$scope.convertToFahrenheit = function(degK) {
		return Math.round((1.8 * (degK - 273)) + 32);
	}
	
	$scope.convertToCelsius = function(degK) {
		return Math.round(degK - 273);
	}
	
	console.log($scope);
	
}]);