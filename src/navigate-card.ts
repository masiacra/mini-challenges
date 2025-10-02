import { CustomComponentName } from "./consts";
import { CustomComponent } from "./types";

class NavigateCard extends HTMLElement implements CustomComponent {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  connectedCallback() {
    if (this.querySelector("div")) return;

    this.innerHTML = `
            <div>
                ${this.getAttribute("title") ?? "Unknown title"}
            </div>
        `;

    const div = this.querySelector("div");

    if (div) {
      div.addEventListener("click", this.onClick);
    }
  }

  disconnectedCallback() {
    const div = this.querySelector("div");

    if (div) {
      div.removeEventListener("click", this.onClick);
    }
  }

  onClick() {
    // TODO: как открывать конкретную страницу
    let to = this.getAttribute("to");
    if (to) {
      if (!to.startsWith("/")) {
        to = `/${to}`;
      }
      globalThis.history.pushState({}, "", to);
      globalThis.dispatchEvent(new Event("popstate"));
    }
  }
}

export function registerNavigateCard() {
  customElements.define(CustomComponentName.NavigateCard, NavigateCard);
}
