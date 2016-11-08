var LiveTile = (function () {
    function LiveTile(element, title, interval, text) {
        this.element = element;
        this.title = title;
        this.interval = interval;
        this.text = text;
        this.start();
        this.titleElement = new HTMLDivElement();
        this.titleElement.textContent = title;
        this.textElement = new HTMLDivElement();
        this.element.appendChild(this.titleElement);
        this.element.appendChild(this.textElement);
    }
    LiveTile.prototype.start = function () {
        this.currentTextIndex = this.text.length - 1;
    };
    LiveTile.prototype.animate = function () {
        this.currentTextIndex = (this.currentTextIndex + 1) % this.text.length;
        this.currentText = this.text[this.currentTextIndex];
        this.element.textContent = this.currentText;
        setTimeout(this.animate, this.interval * 1000);
    };
    return LiveTile;
}());

//# sourceMappingURL=LiveTile.js.map
