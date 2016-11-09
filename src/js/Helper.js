var Helper = (function () {
    function Helper() {
    }
    Helper.slideDown = function (element) {
        element.style.maxHeight = "1000px";
        element.style.opacity = "1";
    };
    Helper.slideUp = function (element) {
        element.style.maxHeight = "0";
        this.once(1, function () {
            element.style.opacity = "0";
        });
    };
    Helper.once = function (seconds, callback) {
        var counter = 0;
        var time = window.setInterval(function () {
            counter++;
            if (counter >= seconds) {
                callback();
                window.clearInterval(time);
            }
        }, 400);
    };
    return Helper;
}());

//# sourceMappingURL=Helper.js.map
