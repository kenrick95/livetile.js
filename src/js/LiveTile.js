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
        this.start();
    }
    LiveTile.prototype.start = function () {
        this.currentTextIndex = this.text.length - 1;
        this.textElement.textContent = this.text[this.currentTextIndex];
        this.startTransition();
    };
    LiveTile.prototype.startTransition = function () {
        this.dummyElement.textContent = this.textElement.textContent;
        this.dummyElement.style.height = this.textElement.clientHeight + "px";
        this.textElement.style.height = "0px";
        this.currentTextIndex = (this.currentTextIndex + 1) % this.text.length;
        this.currentText = this.text[this.currentTextIndex];
        this.textElement.textContent = this.currentText;
        window.requestAnimationFrame(this.transition.bind(this));
    };
    LiveTile.prototype.transition = function () {
        if (this.dummyElement.clientHeight === 0) {
            window.requestAnimationFrame(this.endTransition.bind(this));
            return;
        }
        this.textElement.style.height = (this.textElement.clientHeight + 1) + "px";
        this.dummyElement.style.height = (this.dummyElement.clientHeight - 1) + "px";
        window.requestAnimationFrame(this.transition.bind(this));
    };
    LiveTile.prototype.endTransition = function () {
        setTimeout(this.startTransition.bind(this), this.interval * 1000);
    };
    return LiveTile;
}());

//# sourceMappingURL=LiveTile.js.map
