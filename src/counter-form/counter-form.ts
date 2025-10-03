import { CustomComponentName } from "../consts";
import { CustomComponent } from "../types";
import styles from "./counter-form.module.css";

// TODO: стилизация
class CounterFormComponent extends HTMLElement implements CustomComponent {
  connectedCallback(): void {
    if (this.querySelector("form")) {
      return;
    }

    this.innerHTML = `
        <form class=${styles.form}>
            <div class=${styles.value} data-label="value">
                0
            </div>
            <div>
                <button class=${styles.button} data-label="minus" type="button">-</button>
                <button class=${styles.button} data-label="plus" type="button">+</button>
            </div>
            <label>
                Increment/Decrement by:
                <input type="number" value="1" />
            </label>
            <button class=${styles.button} data-label="reset" type="reset">
                reset
            </button>
            <div>Keyboard shortcuts: ArrowUp to increment, ArrowDown to decrement, Page Up/Down to change step value</div>
        </form>
    `;
    this.onClick = this.onClick.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);

    window.addEventListener("keyup", this.onKeyUp);
    const form = this.querySelector("form");

    if (form) {
      form.addEventListener("click", this.onClick);
    }
  }

  disconnectedCallback() {
    window.removeEventListener("keyup", this.onKeyUp);

    const form = this.querySelector("form");

    if (form) {
      form.removeEventListener("click", this.onClick);
    }
  }

  get value(): number {
    const form = this.querySelector("form");
    if (!form) {
      return 0;
    }
    return Number(form.firstElementChild?.textContent);
  }

  setValue(newValue: number): void {
    const form = this.querySelector("form");
    if (!form || !form.firstElementChild) {
      return;
    }

    form.firstElementChild.textContent = String(newValue);
  }

  get incrementer(): number {
    const form = this.querySelector("form");
    if (!form) {
      return 0;
    }
    const input = form.querySelector('input[type="number"]');

    return Boolean(input) ? Number((input as HTMLInputElement).value) : 0;
  }

  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (target) {
      switch (target.dataset.label) {
        case "plus": {
          this.setValue(this.value + this.incrementer);
          break;
        }
        case "minus": {
          this.setValue(this.value - this.incrementer);
          break;
        }
        case "reset": {
          this.setValue(0);
          break;
        }
      }
    }
  }

  onKeyUp({ key }: KeyboardEvent): void {
    const form = this.querySelector("form");
    const input = form?.querySelector('input[type="number"]');

    if (document.activeElement === input) {
      return;
    }

    const dict: Record<string, () => void> = {
      ArrowUp: () => this.setValue(this.value + this.incrementer),
      ArrowDown: () => this.setValue(this.value - this.incrementer),
      PageUp: () => {
        if (input) {
          input.setAttribute("value", String(this.incrementer + 1));
        }
      },
      PageDown: () => {
        if (input) {
          input.setAttribute("value", String(this.incrementer - 1));
        }
      },
    };

    dict[key]?.();
  }
}

export function registerCounterForm() {
  customElements.define(CustomComponentName.CounterForm, CounterFormComponent);
}
