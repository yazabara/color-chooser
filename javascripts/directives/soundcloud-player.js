colorApp.directive('soundcloud', function ($http) {
    function link(scope) {
        var clientid = 'b23455855ab96a4556cbd0a98397ae8c';
        $http({
            method: 'GET',
            url: 'http://api.soundcloud.com/tracks/' + scope.track + '.json?client_id=' + clientid
        }).success(function (data) {
            scope.stream = data.stream_url + '?client_id=' + clientid;
            scope.song = new Audio();
            scope.play();
        });

        scope.playing = false;
        scope.play = function () {
            scope.playing = !scope.playing;
            if (!scope.playing) {
                scope.song.pause();
            }
            else {
                if (scope.song.src == '') {
                    scope.song.src = scope.stream;
                }
                scope.song.play();
            }
        };
    }

    return {
        restrict: 'E',
        scope: {
            track: '=track'
        },
        templateUrl: 'templates/soundcloud.html',
        link: link
    };
});