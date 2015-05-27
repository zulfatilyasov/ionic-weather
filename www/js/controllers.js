angular.module('starter.controllers', [])

.controller('AppCtrl', function($rootScope) {
    $rootScope.settings = {
        wind: true,
        pressure: true,
        huminity: true
    };
})

.controller('HomeCtrl', function($http, $scope) {
    vm = this;
    $scope.$watch('vm.location', function(newValue, oldValue, scope) {
        var place = newValue;
        if (place && place.geometry) {
            var lat = place.geometry.location.lat();
            var lng = place.geometry.location.lng();
            url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lng;
            $http.get(url)
                .then(function(resp) {
                    if (!resp || !resp.data || !resp.data.main) {
                        return;
                    }
                    vm.temp = (resp.data.main.temp - 273.15).toFixed(1);
                    vm.humidity = resp.data.main.humidity;
                    vm.pressure = resp.data.main.pressure;
                    vm.windSpeed = resp.data.wind.speed;
                    vm.locationName = place.formatted_address;
                });
        }
    });
});
