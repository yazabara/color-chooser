colorApp.controller("backgroundColor", ['ColorConverterService', '$log', '$scope', function (ColorConverterService, $log, $scope) {
    var hsl =  ColorConverterService.rgbToHsl(123, 123, 123);
    $log.log("color hsl: " + hsl);
    var rgb = ColorConverterService.hslToRgb(hsl[0],hsl[1],hsl[2]);
    $log.log("color rgb: " + rgb);

    $scope.backgroundColor = "rgb("+rgb+")";
}]);