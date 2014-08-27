


angular.module('app', ['wines', 'ngMockE2E', 'ngRoute'])
.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
})
.run(function ($rootScope, $location, $httpBackend) {
    

    var regionsJSON = [{ "$id": "1", "regionId": 1, "areaName": "Willamette Valley", "country": "Oregon", "price": 198.25 },
                { "$id": "2", "regionId": 2, "areaName": "Burgundy", "country": "France", "price": 85.14 },
                { "$id": "3", "regionId": 3, "areaName": "Sonoma County", "country": "California", "price": 102.12 }];

    var regionJSON = { "$id": "1", "regionId": 1, "areaName": "Willamette Valley", "country": "Oregon",
                "vintages" : [{"vintageId": 4, "year":"2014", "parkerScore": "NA", "degreeDays": 3000, "status": "Growing"},
                              {"vintageId": 3, "year":"2013", "parkerScore": "NA", "degreeDays": 3200, "status": "Unreleased"},
                              {"vintageId": 1, "year":"2010", "parkerScore": "NA", "degreeDays": 3200, "status": "Prime"}
                ]

                };

    var vintageJSON = { "$id": "1", "vintageId": 1, "vintageName": "2010 Willamette Valley", "country": "Oregon", "year": "2010",
                "days" : [{"date":"3/1/2014", "high": 60, "low": 40, "degreeDays": 0},
                          {"date":"3/2/2014", "high": 62, "low": 40, "degreeDays": 1},
                          {"date":"3/3/2014", "high": 64, "low": 40, "degreeDays": 2},
                          {"date":"3/4/2014", "high": 64, "low": 40, "degreeDays": 2},
                          {"date":"3/5/2014", "high": 70, "low": 40, "degreeDays": 5}
                ]

                };
	

    //console.log(JSON);


    $httpBackend.whenGET('/api/Regions').respond(regionsJSON);
    $httpBackend.whenGET('/api/Regions/1').respond(regionJSON);
    $httpBackend.whenGET('/api/Vintages/1').respond(vintageJSON);


    $httpBackend.whenGET(/app/).passThrough();
    $httpBackend.whenGET(/js/).passThrough();
    $httpBackend.whenGET(/api/).passThrough();
    $httpBackend.whenPOST(/api/).passThrough();
});






  // .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  // }])
