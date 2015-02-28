colorApp.controller("navController", ['ColorDataStorage', '$scope', function (ColorDataStorage, $scope) {
    'use strict';

    $scope.currentData = ColorDataStorage.currentData;

}]);