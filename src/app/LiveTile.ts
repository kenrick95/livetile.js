class LiveTile {
  element: HTMLDivElement;
  textElement: HTMLDivElement;
  titleElement: HTMLDivElement;
  dummyElement: HTMLDivElement;
  title: string;
  text: Array<string>;
  interval: number;
  offset: number;
  currentTextIndex: number;
  currentText: string;

  constructor(element: HTMLDivElement, title: string, text: Array<string>, interval: number, offset: number = 0) {
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

  public start() {
    this.currentTextIndex = this.text.length - 1;
    this.textElement.textContent = this.text[this.currentTextIndex];
    setTimeout(this.startTransition.bind(this), this.offset * 1000);
  }
  private startTransition() {
    this.dummyElement.textContent = this.textElement.textContent;

    this.textElement.style.transition = "unset";
    this.textElement.style.transform = `translateY(${this.element.clientHeight}px)`;
    this.textElement.offsetHeight; // triggering a reflow

    this.currentTextIndex = (this.currentTextIndex + 1) % this.text.length;
    this.currentText = this.text[this.currentTextIndex];

    this.textElement.textContent = this.currentText;

    this.transition();
  }
  private transition() {
    this.textElement.style.transition = "transform 1s ease-out";
    this.textElement.style.transform = `translateY(0)`;

    setTimeout(this.endTransition.bind(this), 1000);
  }
  private endTransition() {
    setTimeout(this.startTransition.bind(this), this.interval * 1000);
  }
}