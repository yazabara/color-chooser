colorApp.factory('ColorDataStorage', function(){

    /** Текушие данные пользователя */
    var currentData = {
        randomColors : [{
            background: "#313F7C",
            backgroundInput: "#313F7C",
            color: "white"
        }],
        randomIndex: 0
    };

    return {
        currentData: currentData
    };
});