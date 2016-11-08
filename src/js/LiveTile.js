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
        this.element.appendChild(this.titleElement);
        this.element.appendChild(this.textElement);
        this.start();
    }
    LiveTile.prototype.start = function () {
        this.currentTextIndex = this.text.length - 1;
        this.animate();
    };
    LiveTile.prototype.animate = function () {
        this.currentTextIndex = (this.currentTextIndex + 1) % this.text.length;
        this.currentText = this.text[this.currentTextIndex];
        this.textElement.textContent = this.currentText;
        setTimeout(this.animate.bind(this), this.interval * 1000);
    };
    return LiveTile;
}());

//# sourceMappingURL=LiveTile.js.map
