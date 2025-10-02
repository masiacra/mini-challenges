import { CustomComponentName } from "./consts";
import { CustomComponent } from "./types";

class NotFound extends HTMLElement implements CustomComponent {
  connectedCallback(): void {
    this.innerHTML = "<h1>Not Found</h1>";
  }
}

export function registerNotFound() {
  customElements.define(CustomComponentName.NotFound, NotFound);
}
