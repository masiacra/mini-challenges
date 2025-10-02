import { CustomComponentName } from "../consts";
import { CustomComponent } from "../types";

class NavigateItem extends HTMLElement implements CustomComponent {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  connectedCallback() {
    if (this.querySelector("a")) return;

    this.innerHTML = `
            <li>
                <a href=${this.getAttribute("to")}>
                  ${this.getAttribute("title") ?? "Unknown title"}
                </a>
            </li>
        `;

    const anchor = this.querySelector("a");

    if (anchor) {
      anchor.addEventListener("click", this.onClick);
    }
  }

  disconnectedCallback() {
    const anchor = this.querySelector("a");

    if (anchor) {
      anchor.removeEventListener("click", this.onClick);
    }
  }

  onClick(event: MouseEvent) {
    event.preventDefault();

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
  customElements.define(CustomComponentName.NavigateItem, NavigateItem);
}
