colorApp.controller("generateColorsController", ['ColorGeneratorService', 'ColorConverterService', 'ColorValidatorService', 'ColorDataStorage', '$scope', function (ColorGeneratorService, ColorConverterService, ColorValidatorService, ColorDataStorage, $scope) {
    'use strict';

    $scope.currentData = ColorDataStorage.currentData;

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

            if ($scope.currentData.randomColors.indexOf(colorItem) == -1)
                $scope.currentData.randomColors.push(colorItem);

            previous = color;
        }
    };

    $scope.generateRandom(50);
    $scope.setBackgroundColor = function(index) {
        if (index < 0 || index >= $scope.currentData.randomColors.length) return;
        $scope.currentData.randomIndex = index;
    };

    $scope.colorChange = function(colorItem) {
        if(ColorValidatorService.validateColour(colorItem.backgroundInput)) {
            colorItem.background = colorItem.backgroundInput;
            colorItem.color = ColorGeneratorService.generateFontColor(colorItem.background.substring(1, colorItem.background.length));
        }
    };

}]);