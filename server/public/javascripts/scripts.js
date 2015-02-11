var settings = {
    firebaseUrl: 'https://blinding-inferno-9356.firebaseio.com/'
};

var colorApp = angular.module('colorApp', [], function () {
    'use strict';

}).constant('FIRE_BASE_URL', settings.firebaseUrl);
/**
 * Information from http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
 */
colorApp.factory('ColorConverterService', ['$log', function ($log) {
    'use strict';

    var rgbWhite = {
        red:255,
        green: 255,
        blue: 255
    };

    /**
     * Converts an RGB color value to HSL. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
     * Assumes r, g, and b are contained in the set [0, 255] and
     * returns h, s, and l in the set [0, 1].
     *
     * @param   r       The red color value
     * @param   g       The green color value
     * @param   b       The blue color value
     * @return  Array   The HSL representation
     */
    function rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;

        if (max == min) {
            h = s = 0; // achromatic
        } else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }

        return [h, s, l];
    }

    /**
     * Converts an HSL color value to RGB. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
     * Assumes h, s, and l are contained in the set [0, 1] and
     * returns r, g, and b in the set [0, 255].
     *
     * @param  h       The hue
     * @param  s       The saturation
     * @param  l       The lightness
     * @return Array   The RGB representation
     */
    function hslToRgb(h, s, l) {
        var r, g, b;

        if (s == 0) {
            r = g = b = l; // achromatic
        } else {
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = _hue2rgb(p, q, h + 1 / 3);
            g = _hue2rgb(p, q, h);
            b = _hue2rgb(p, q, h - 1 / 3);
        }

        return [r * 255, g * 255, b * 255];
    }

    function _hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    }

    /**
     * Converts an RGB color value to HSV. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
     * Assumes r, g, and b are contained in the set [0, 255] and
     * returns h, s, and v in the set [0, 1].
     *
     * @param   r       The red color value
     * @param   g       The green color value
     * @param   b       The blue color value
     * @return  Array   The HSV representation
     */
    function rgbToHsv(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, v = max;

        var d = max - min;
        s = max == 0 ? 0 : d / max;

        if (max == min) {
            h = 0; // achromatic
        } else {
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }

        return [h, s, v];
    }

    /**
     * Converts an HSV color value to RGB. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
     * Assumes h, s, and v are contained in the set [0, 1] and
     * returns r, g, and b in the set [0, 255].
     *
     * @param   h       The hue
     * @param   s       The saturation
     * @param   v       The value
     * @return  Array   The RGB representation
     */
    function hsvToRgb(h, s, v) {
        var r, g, b;

        var i = Math.floor(h * 6);
        var f = h * 6 - i;
        var p = v * (1 - s);
        var q = v * (1 - f * s);
        var t = v * (1 - (1 - f) * s);

        switch (i % 6) {
            case 0:
                r = v;
                g = t;
                b = p;
                break;
            case 1:
                r = q;
                g = v;
                b = p;
                break;
            case 2:
                r = p;
                g = v;
                b = t;
                break;
            case 3:
                r = p;
                g = q;
                b = v;
                break;
            case 4:
                r = t;
                g = p;
                b = v;
                break;
            case 5:
                r = v;
                g = p;
                b = q;
                break;
        }

        return [r * 255, g * 255, b * 255];
    }

    function rgbToHex(r, g, b) {
        return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
    }

    function byte2Hex(n) {
        var nybHexString = "0123456789ABCDEF";
        return String(nybHexString.substr((n >> 4) & 0x0F, 1)) + nybHexString.substr(n & 0x0F, 1);
    }

    function hexToRgb(hex) {
        if (!hex) return rgbWhite;

        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            red: parseInt(result[1], 16),
            green: parseInt(result[2], 16),
            blue: parseInt(result[3], 16)
        } : rgbWhite;
    }

    return {
        hsvToRgb: hsvToRgb,
        rgbToHsv: rgbToHsv,
        hslToRgb: hslToRgb,
        rgbToHsl: rgbToHsl,
        rgbToHex: rgbToHex,
        hexToRgb: hexToRgb
    }

}]);
/**
 * Information from http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
 */
colorApp.factory('ColorGeneratorService', ['$log', function ($log) {
    'use strict';

    function generateRandomColor(mix) {
        var red = nextColorNumber();
        var green = nextColorNumber();
        var blue = nextColorNumber();

        // mix the color
        if (mix) {
            red = (red + mix.red) / 2;
            green = (green + mix.green) / 2;
            blue = (blue + mix.blue) / 2;
        }

        return {
            red: red,
            green: green,
            blue: blue
        };
    }

    //generateFontColor
    function getContrast50(hexcolor){
        return (parseInt(hexcolor, 16) > 0xffffff/2) ? 'black':'white';
    }

    //generateFontColor
    function getContrastYIQ(hexcolor){
        var r = parseInt(hexcolor.substr(0,2),16);
        var g = parseInt(hexcolor.substr(2,2),16);
        var b = parseInt(hexcolor.substr(4,2),16);
        var yiq = ((r*299)+(g*587)+(b*114))/1000;
        return (yiq >= 128) ? 'black' : 'white';
    }

    /**
     * method maks number [0,256]
     * @returns {number}
     */
    function nextColorNumber() {
        return Math.random() * 256;
    }

    return {
        generateRandomColor: generateRandomColor,
        generateFontColor: getContrastYIQ
    }

}]);
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