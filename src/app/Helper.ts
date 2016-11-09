class Helper {
    public static slideDown(element : HTMLElement) {
        element.style.maxHeight = "1000px";
	    element.style.opacity   = "1";
    }
    public static slideUp(element : HTMLElement) {
        element.style.maxHeight = "0";
        this.once(1, function () {
            element.style.opacity = "0";
        });
    }
    private static once(seconds : number, callback : Function) {
        var counter = 0;
        var time = window.setInterval( function () {
            counter++;
            if ( counter >= seconds ) {
                callback();
                window.clearInterval( time );
            }
        }, 400 );
    }
}