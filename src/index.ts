class CounterForm {
  private valueElement: HTMLElement;
  private incrementer: HTMLInputElement;

  constructor(private form: HTMLFormElement | null) {
    if (!this.form) {
      throw new Error("Please, pass element form");
    }
    this.valueElement = this.form.querySelector(".value")!;
    this.incrementer = this.form.querySelector(".incrementer")!;

    this.click = this.click.bind(this);

    this.form.addEventListener("click", this.click);
  }

  click(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    if (targetElement) {
      if (targetElement.classList.contains("increment")) {
        this.increment();
      }
      if (targetElement.classList.contains("decrement")) {
        this.decrement();
      }
      if (targetElement.classList.contains("reset")) {
        this.reset();
      }
    }
  }

  get currentValue() {
    return Number(this.valueElement.textContent);
  }

  get incrementValue() {
    return Number(this.incrementer.value);
  }

  increment() {
    this.valueElement.textContent = String(
      this.currentValue + this.incrementValue
    );
  }

  decrement() {
    this.valueElement.textContent = String(
      this.currentValue - this.incrementValue
    );
  }

  reset() {
    this.valueElement.textContent = "0";
  }
}

function main() {
  new CounterForm(document.querySelector(".awesome-form"));
}

main();
