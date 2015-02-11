colorApp.controller("generateColors", ['ColorGeneratorService', 'ColorConverterService', '$log', '$scope', function (ColorGeneratorService, ColorConverterService, $log, $scope) {
    'use strict';

    $scope.defaultColor = "#33001e";
    $scope.generated = [{
        hexColor: "#F5DEB3",
        color: "black"
    }];
    $scope.backgroundIndex = 0;

    $scope.generateRandom = function(size, initColor) {
        var generateSize = size ? size : 10;
        var previous = initColor ? ColorConverterService.hexToRgb(initColor) : ColorGeneratorService.generateRandomColor(null);

        for (var i = 0; i < generateSize; i++) {
            var color = ColorGeneratorService.generateRandomColor(previous);
            var hexColor = ColorConverterService.rgbToHex(color.red, color.green, color.blue);

            var colorItem = {
                hexColor: hexColor,
                color: ColorGeneratorService.generateFontColor(hexColor.substring(1, hexColor.length))
            };

            if ($scope.generated.indexOf(colorItem) == -1)
                $scope.generated.push(colorItem);

            previous = color;
        }

    };

    $scope.generateRandom(20, $scope.defaultColor);
    $scope.setBackgroundColor = function(index) {
        if (index < 0 || index >= $scope.generated.length) return;
        $scope.backgroundIndex = index;
    };

}]);