class LiveTile {
    element: HTMLDivElement;
    textElement: HTMLDivElement;
    titleElement: HTMLDivElement;
    title: string;
    text: Array<string>;
    interval: number;
    currentTextIndex: number;
    currentText: string;

    constructor(element: HTMLDivElement, title: string, interval: number, text: Array<string>) {
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

    public start() {
        this.currentTextIndex = this.text.length - 1;
    }
    private animate() {
        this.currentTextIndex = (this.currentTextIndex + 1) % this.text.length;
        this.currentText = this.text[this.currentTextIndex];

        this.element.textContent = this.currentText;

        setTimeout(this.animate, this.interval * 1000);
    }
}