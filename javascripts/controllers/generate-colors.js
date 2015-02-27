colorApp.controller("generateColors", ['ColorGeneratorService', 'ColorConverterService', 'ColorValidatorService', '$log', '$scope', function (ColorGeneratorService, ColorConverterService, ColorValidatorService, $log, $scope) {
    'use strict';

    $scope.defaultColor = "#33001e";
    $scope.generated = [{
        background: "#F5DEB3",
        backgroundInput: "#F5DEB3",
        color: "black"
    }];
    $scope.backgroundIndex = 0;

    $scope.generateRandom = function(size, initColor) {
        var generateSize = size ? size : 10;
        var previous = initColor ? ColorConverterService.hexToRgb(initColor) : ColorGeneratorService.generateRandomColor(null);

        for (var i = 0; i < generateSize; i++) {
            var color = ColorGeneratorService.generateRandomColor(previous);
            var background = ColorConverterService.rgbToHex(color.red, color.green, color.blue);

            var colorItem = {
                background: background,
                backgroundInput: background,
                color: ColorGeneratorService.generateFontColor(background.substring(1, background.length))
            };

            if ($scope.generated.indexOf(colorItem) == -1)
                $scope.generated.push(colorItem);

            previous = color;
        }
    };

    $scope.generateRandom(10, $scope.defaultColor);
    $scope.setBackgroundColor = function(index) {
        if (index < 0 || index >= $scope.generated.length) return;
        $scope.backgroundIndex = index;
    };

    $scope.colorChange = function(colorItem) {
        if(ColorValidatorService.validateColour(colorItem.backgroundInput)) {
            colorItem.background = colorItem.backgroundInput;
            colorItem.color = ColorGeneratorService.generateFontColor(colorItem.background.substring(1, colorItem.background.length));
        }
        console.log(colorItem);
    };

}]);