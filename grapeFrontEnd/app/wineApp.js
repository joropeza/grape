
'use strict'
google.load("visualization", "1", {
                packages: ["corechart"]
            });

angular.module('wines', ['ngCookies','ngRoute', 'LocalStorageModule'])

.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.
                when('/', {templateUrl: 'app/routes/home.tpl.html',   controller: "HomeController"}).
                when('/regions/:id', {templateUrl: 'app/routes/regionDetails.tpl.html',   controller: "regionController"}).
                when('/vintages/:id', {templateUrl: 'app/routes/vintageDetails.tpl.html',   controller: "vintageController"}).
                when("/login", {
                    controller: "loginController",
                    templateUrl: "/app/routes/login.tpl.html"
                }).
 
                when("/signup", {
                    controller: "signupController",
                    templateUrl: "/app/routes/signup.tpl.html"
                }).
                otherwise({redirectTo: '/'});
}])

.controller('HomeController', ['$scope' ,'wineService', function ($scope, $wineService) {

	$scope.message = "Vintagely";
    $wineService.regions().then(function (response) {
        
            $scope.regions = response;

    });
	
}])

.controller('regionController', ['$scope' , '$routeParams', 'wineService', function ($scope, $routeParams, $wineService) {

    $wineService.regionDetails($routeParams.id).then(function (response) {
            $scope.message = response.areaName;
    
            $scope.region = response;

            var chartData = [];

            chartData.push(['Year','Degree Days'])

            $scope.region.vintages.forEach(function(entry) {
                
                var year = [entry.year,entry.degreeDays];
                chartData.push(year);
                console.log(year);

            });
            
           
  var data = google.visualization.arrayToDataTable(chartData);
    

  var options = {
    width: 'auto',
    pointSize: 7,
    lineWidth: 1,
    height: '200',
    backgroundColor: 'transparent',
    colors: [$blue, $red, $green, $yellow],
    tooltip: {
      textStyle: {
        color: '#666666',
        fontSize: 11
      },
      showColorCode: true
    },
    legend: {
      textStyle: {
        color: 'black',
        fontSize: 12
      }
    },
    chartArea: {
      left: 40,
      top: 10,
      height: "80%"
    }
  };

  var chart = new google.visualization.AreaChart(document.getElementById('candlestick_chart'));
  chart.draw(data, options);
  

    });
    
}])

.controller('vintageController', ['$scope' , '$routeParams', 'wineService', function ($scope, $routeParams, $wineService) {

    $wineService.vintageDetails($routeParams.id).then(function (response) {
            $scope.message = response.vintageName;
    
            $scope.vintage = response;

            var chartData = [];

            chartData.push(['Date','Degree Days'])

            $scope.vintage.days.forEach(function(entry) {
                
                var day = [entry.date,entry.degreeDays];
                chartData.push(day);
                console.log(day);

            });
            
           
  var data = google.visualization.arrayToDataTable(chartData);
    

  var options = {
    width: 'auto',
    pointSize: 7,
    lineWidth: 1,
    height: '200',
    backgroundColor: 'transparent',
    colors: [$blue, $red, $green, $yellow],
    tooltip: {
      textStyle: {
        color: '#666666',
        fontSize: 11
      },
      showColorCode: true
    },
    legend: {
      textStyle: {
        color: 'black',
        fontSize: 12
      }
    },
    chartArea: {
      left: 40,
      top: 10,
      height: "80%"
    }
  };

  var chart = new google.visualization.AreaChart(document.getElementById('candlestick_chart'));
  chart.draw(data, options);
  

    });
    
}])

.service('wineService', ['$http', '$location', function ($http, $location) {

	var myService = {
		regions: function () {
            // $http returns a promise, which has a then function, which also returns a promise


            //var promise = $http.get('/Api/Videos/Enhancements?GUID=c0890c91-8e0d-45ec-9e92-8648761b1238.mp4').then(function (response) {
            	var promise = $http.get('/api/Regions').then(function (response) {

                // The then function here is an opportunity to modify the response
                console.log(response);
                // The return value gets picked up by the then in the controller.
                return response.data;
              });
            // Return the promise to the controller
            return promise;
          },
         
        regionDetails: function (id) {
            // $http returns a promise, which has a then function, which also returns a promise


            //var promise = $http.get('/Api/Videos/Enhancements?GUID=c0890c91-8e0d-45ec-9e92-8648761b1238.mp4').then(function (response) {
                var promise = $http.get('/api/Regions/' + id).then(function (response) {

                // The then function here is an opportunity to modify the response
                console.log(response);
                // The return value gets picked up by the then in the controller.
                return response.data;
              });
            // Return the promise to the controller
            return promise;
          },
        
        vintageDetails: function (id) {
            // $http returns a promise, which has a then function, which also returns a promise


            //var promise = $http.get('/Api/Videos/Enhancements?GUID=c0890c91-8e0d-45ec-9e92-8648761b1238.mp4').then(function (response) {
                var promise = $http.get('/api/Vintages/' + id).then(function (response) {

                // The then function here is an opportunity to modify the response
                console.log(response);
                // The return value gets picked up by the then in the controller.
                return response.data;
              });
            // Return the promise to the controller
            return promise;
          }
        }

        return myService;
 }])

.controller('signupController', ['$scope', '$location', '$timeout', 'authService', function ($scope, $location, $timeout, authService) {
 
    $scope.savedSuccessfully = false;
    $scope.message = "";
 
    $scope.registration = {
        userName: "",
        password: "",
        confirmPassword: ""
    };
 
    $scope.signUp = function () {
 
        authService.saveRegistration($scope.registration).then(function (response) {
 
            $scope.savedSuccessfully = true;
            $scope.message = "User has been registered successfully, you will be redicted to login page in 2 seconds.";
            startTimer();
 
        },
         function (response) {
             var errors = [];
             for (var key in response.data.modelState) {
                 for (var i = 0; i < response.data.modelState[key].length; i++) {
                     errors.push(response.data.modelState[key][i]);
                 }
             }
             $scope.message = "Failed to register user due to:" + errors.join(' ');
         });
    };
 
    var startTimer = function () {
        var timer = $timeout(function () {
            $timeout.cancel(timer);
            $location.path('/login');
        }, 2000);
    }
 
}])

.factory('authService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {
 
    var serviceBase = '/';
    var authServiceFactory = {};
 
    var _authentication = {
        isAuth: false,
        userName : ""
    };
 
    var _saveRegistration = function (registration) {
 
        _logOut();
 
        return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
            return response;
        });
 
    };
 
    var _login = function (loginData) {
 
        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;
 
        var deferred = $q.defer();
 
        $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
 
            localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });
 
            _authentication.isAuth = true;
            _authentication.userName = loginData.userName;
 
            deferred.resolve(response);
 
        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });
 
        return deferred.promise;
 
    };
 
    var _logOut = function () {
 
        localStorageService.remove('authorizationData');
 
        _authentication.isAuth = false;
        _authentication.userName = "";
 
    };
 
    var _fillAuthData = function () {
 
        var authData = localStorageService.get('authorizationData');
        if (authData)
        {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
        }
 
    }
 
    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;
 
    return authServiceFactory;
}])

.factory('authInterceptorService', ['$q', '$location', 'localStorageService', function ($q, $location, localStorageService) {
 
    var authInterceptorServiceFactory = {};
 
    var _request = function (config) {
 
        config.headers = config.headers || {};
 
        var authData = localStorageService.get('authorizationData');
        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.token;
        }
 
        return config;
    }
 
    var _responseError = function (rejection) {
        if (rejection.status === 401) {
            $location.path('/login');
        }
        return $q.reject(rejection);
    }
 
    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;
 
    return authInterceptorServiceFactory;
}]);




