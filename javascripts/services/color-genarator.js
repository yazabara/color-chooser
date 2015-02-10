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