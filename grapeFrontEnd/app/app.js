


angular.module('app', ['markets', 'ngMockE2E', 'ngRoute'])
.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
})
.run(function ($rootScope, $location, $httpBackend) {
    

    var marketsJSON = [{ "$id": "1", "marketId": 1, "symbol": "SPY", "name": "Spyder S&P 500", "price": 198.25 },
                { "$id": "2", "marketId": 2, "symbol": "IWM", "name": "Russell 2k", "price": 85.14 },
                { "$id": "3", "marketId": 3, "symbol": "QQQ", "name": "Nasdaq 100", "price": 102.12 }];

    var marketJSON = { "$id": "1", "marketId": 1, "symbol": "SPY", "name": "Spyder S&P 500", "price": 198.25, 
                "days" : [{"date":"05/01/2014", "high": 198.34, "low": 198.04, "open": 198.10, "close": 198.14, "gap": "Open", "candle": "Stick Up", "trend": "Up"},
                          {"date":"05/02/2014", "high": 199.94, "low": 198.94, "open": 199.10, "close": 199.84, "gap": "Filled", "candle": "Doji", "trend": "Up"}
                ]

                };
	

    //console.log(JSON);


    $httpBackend.whenGET('/api/Markets/TopTen').respond(marketsJSON);
    $httpBackend.whenGET('/api/Markets/1').respond(marketJSON);


    $httpBackend.whenGET(/app/).passThrough();
    $httpBackend.whenGET(/js/).passThrough();
    $httpBackend.whenGET(/api/).passThrough();
    $httpBackend.whenPOST(/api/).passThrough();
});






  // .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  // }])
