var app = angular.module('app', []);

app.config(function($routeProvider) {
	$routeProvider.when('/login', {
		templateUrl: 'login.html',
		controller: 'LoginController'
	});

	$routeProvider.when('/home', {
		templateUrl: 'home.html',
		controller: 'HomeController'
	});

	$routeProvider.otherwise({
		redirectTo: '/login'
	});
});

app.factory('AuthenticationService', ['$location', function($location) {
	return {
		login: function(credentials) {
			if(credentials.username === 'ralph') {
				$location.path('/home');
			}
		},
		logout: function() {
			$location.path('/login');
		}
	};
}]);

app.controller('LoginController', function($scope, AuthenticationService) {

	$scope.credentials = {
		username: '',
		password: ''
	};

	$scope.login = function() {
		AuthenticationService.login($scope.credentials);
	};

});

app.controller('HomeController', function($scope, AuthenticationService) {

	$scope.title = 'Fans';

	$scope.message = 'There is a new message in your inbox';

	$scope.logout = function() {
		AuthenticationService.logout();
	};
});

// camel case title
app.directive('showsMessageWhenHovered', function() {
	return {
		restrict: "A", // A = attribute, C = class name, E = element, M = HTML comment
		link: function(scope, element, attributes) {
			var originalMessage = scope.message;
			element.bind('mouseover', function() {
				scope.message = attributes.message;
				scope.$apply();
			});
			element.bind('mouseout', function() {
				scope.message = originalMessage;
				scope.$apply();
			});
		}
	}
});
