colorApp.controller("generateColors", ['ColorGeneratorService', 'ColorConverterService', '$log', '$scope', function (ColorGeneratorService, ColorConverterService, $log, $scope) {
    'use strict';

    $scope.generated = [];
    $scope.backgroundColor = 'wheat';

    $scope.addColors = function(size, initColor) {
        var generateSize = size ? size : 10;
        var previous = initColor ? ColorConverterService.hexToRgb(initColor) : ColorGeneratorService.generateRandomColor(null);

        for (var i = 0; i < generateSize; i++) {
            var color = ColorGeneratorService.generateRandomColor(previous);
            var hexColor = ColorConverterService.rgbToHex(color.red, color.green, color.blue);

            var colorItem = {
                background: hexColor,
                color: ColorGeneratorService.generateFontColor(hexColor.substring(1, hexColor.length))
            };

            if ($scope.generated.indexOf(colorItem) == -1)
                $scope.generated.push(colorItem);

            previous = color;
        }

    };

    $scope.addColors(50,'#33001e');
    $scope.setBackgroundColor = function(newColor) {
        $log.log(newColor);
        if (!newColor) return;
        $scope.backgroundColor = newColor;
    };

}]);