colorApp.controller("generateColors", ['ColorGeneratorService', 'ColorConverterService', '$log', '$scope', function (ColorGeneratorService, ColorConverterService, $log, $scope) {
    'use strict';

    $scope.generated = [];
    $scope.generatedColorSize = 100;

    $scope.init = function (initColor) {

        var previous = initColor ? ColorConverterService.hexToRgb(initColor) : ColorGeneratorService.generateRandomColor(null);

        for (var i = 0; i < $scope.generatedColorSize; i++) {
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

    $scope.init('#33001e');

}]);