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
    vm.measure = 'cel';

    var getCelsius = function(f) {
        return (f - 32) * 5 / 9;
    };

    var getFahrenheit = function(c) {
        return c * 9 / 5 + 32;
    };

    vm.setMeasure = function(unit) {
        if (!unit || vm.measure === unit)
            return;
        vm.measure = unit;
        var newTemp = unit === 'cel' ? getCelsius(vm.temp) : getFahrenheit(vm.temp);
        vm.temp = parseFloat(newTemp.toFixed(1));
    };

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
                    var temperature = parseFloat((resp.data.main.temp - 273.15).toFixed(1));
                    vm.temp = temperature;
                    vm.humidity = resp.data.main.humidity;
                    vm.pressure = resp.data.main.pressure;
                    vm.windSpeed = resp.data.wind.speed;
                    vm.locationName = place.formatted_address;
                });
        }
    });
});
