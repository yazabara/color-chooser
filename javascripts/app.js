'use strict';

var settings = {
    firebaseUrl: 'https://blinding-inferno-9356.firebaseio.com/'
};

var colorApp = angular.module('colorApp', ['ngRoute', 'firebase'], function () {

    console.log('qwe');
}).constant('FIRE_BASE_URL', settings.firebaseUrl);