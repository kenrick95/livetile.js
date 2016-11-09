var LiveTile = (function () {
    function LiveTile(element, title, text, interval) {
        this.element = element;
        this.title = title;
        this.text = text;
        this.interval = interval;
        this.element.className = "livetile";
        this.titleElement = document.createElement("div");
        this.titleElement.textContent = title;
        this.titleElement.className = "lt-title";
        this.textElement = document.createElement("div");
        this.textElement.className = "lt-text";
        this.dummyElement = document.createElement("div");
        this.dummyElement.className = "lt-text";
        this.element.appendChild(this.titleElement);
        this.element.appendChild(this.dummyElement);
        this.element.appendChild(this.textElement);
        this.textElement.style.background = "green";
        this.dummyElement.style.background = "red";
        this.textElement.classList.add("lt-text-transition");
        this.dummyElement.classList.add("lt-text-transition");
        this.start();
    }
    LiveTile.prototype.start = function () {
        this.currentTextIndex = this.text.length - 1;
        this.animate();
    };
    LiveTile.prototype.animate = function () {
        var _this = this;
        this.dummyElement.textContent = this.textElement.textContent;
        this.currentTextIndex = (this.currentTextIndex + 1) % this.text.length;
        this.currentText = this.text[this.currentTextIndex];
        this.textElement.textContent = this.currentText;
        Helper.slideUp(this.textElement);
        Helper.slideDown(this.textElement);
        setTimeout(function () {
            _this.animate();
        }, this.interval * 1000);
    };
    return LiveTile;
}());

//# sourceMappingURL=LiveTile.js.map
