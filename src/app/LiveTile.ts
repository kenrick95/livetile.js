class LiveTile {
    element: HTMLDivElement;
    textElement: HTMLDivElement;
    titleElement: HTMLDivElement;
    title: string;
    text: Array<string>;
    interval: number;
    currentTextIndex: number;
    currentText: string;

    constructor(element: HTMLDivElement, title: string, text: Array<string>, interval: number) {
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

    public start() {
        this.currentTextIndex = this.text.length - 1;
        this.animate();
    }
    private animate() {
        this.currentTextIndex = (this.currentTextIndex + 1) % this.text.length;
        this.currentText = this.text[this.currentTextIndex];

        this.textElement.textContent = this.currentText;

        setTimeout(this.animate.bind(this), this.interval * 1000);
    }
}