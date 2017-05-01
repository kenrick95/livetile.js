var LiveTile = (function () {
    function LiveTile(element, title, text, interval, offset) {
        if (offset === void 0) { offset = 0; }
        this.element = element;
        this.title = title;
        this.text = text;
        this.interval = interval;
        this.offset = offset;
        this.element.classList.add("livetile");
        this.titleElement = document.createElement("div");
        this.titleElement.textContent = title;
        this.titleElement.className = "lt-title";
        this.textElement = document.createElement("div");
        this.textElement.className = "lt-text lt-text-current";
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
        setTimeout(this.startTransition.bind(this), this.offset * 1000);
    };
    LiveTile.prototype.startTransition = function () {
        this.dummyElement.textContent = this.textElement.textContent;
        this.textElement.style.transition = "unset";
        this.textElement.style.transform = "translateY(" + this.element.clientHeight + "px)";
        this.textElement.offsetHeight;
        this.currentTextIndex = (this.currentTextIndex + 1) % this.text.length;
        this.currentText = this.text[this.currentTextIndex];
        this.textElement.textContent = this.currentText;
        this.transition();
    };
    LiveTile.prototype.transition = function () {
        this.textElement.style.transition = "transform 1s ease-out";
        this.textElement.style.transform = "translateY(0)";
        setTimeout(this.endTransition.bind(this), 1000);
    };
    LiveTile.prototype.endTransition = function () {
        setTimeout(this.startTransition.bind(this), this.interval * 1000);
    };
    return LiveTile;
}());

//# sourceMappingURL=LiveTile.js.map
