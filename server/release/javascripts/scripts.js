"use strict";var settings={firebaseUrl:"https://blinding-inferno-9356.firebaseio.com/"},colorApp=angular.module("colorApp",["$log"],function(){}).constant("FIRE_BASE_URL",settings.firebaseUrl);colorApp.factory("ColorConverterService",["$log",function(){function a(a,b,c){a/=255,b/=255,c/=255;var d,e,f=Math.max(a,b,c),g=Math.min(a,b,c),h=(f+g)/2;if(f==g)d=e=0;else{var i=f-g;switch(e=h>.5?i/(2-f-g):i/(f+g),f){case a:d=(b-c)/i+(c>b?6:0);break;case b:d=(c-a)/i+2;break;case c:d=(a-b)/i+4}d/=6}return[d,e,h]}function b(a,b,d){var e,f,g;if(0==b)e=f=g=d;else{var h=.5>d?d*(1+b):d+b-d*b,i=2*d-h;e=c(i,h,a+1/3),f=c(i,h,a),g=c(i,h,a-1/3)}return[255*e,255*f,255*g]}function c(a,b,c){return 0>c&&(c+=1),c>1&&(c-=1),1/6>c?a+6*(b-a)*c:.5>c?b:2/3>c?a+(b-a)*(2/3-c)*6:a}function d(a,b,c){a/=255,b/=255,c/=255;var d,e,f=Math.max(a,b,c),g=Math.min(a,b,c),h=f,i=f-g;if(e=0==f?0:i/f,f==g)d=0;else{switch(f){case a:d=(b-c)/i+(c>b?6:0);break;case b:d=(c-a)/i+2;break;case c:d=(a-b)/i+4}d/=6}return[d,e,h]}function e(a,b,c){var d,e,f,g=Math.floor(6*a),h=6*a-g,i=c*(1-b),j=c*(1-h*b),k=c*(1-(1-h)*b);switch(g%6){case 0:d=c,e=k,f=i;break;case 1:d=j,e=c,f=i;break;case 2:d=i,e=c,f=k;break;case 3:d=i,e=j,f=c;break;case 4:d=k,e=i,f=c;break;case 5:d=c,e=i,f=j}return[255*d,255*e,255*f]}return{hsvToRgb:e,rgbToHsv:d,hslToRgb:b,rgbToHsl:a}}]),colorApp.controller("backgroundColor",["ColorConverterService","$log",function(a,b){b.log("Create user: "+a.rgbToHsl(123,123,123))}]);