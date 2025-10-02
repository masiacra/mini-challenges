export interface CustomComponent {
  connectedCallback: () => void;

  disconnectedCallback?: () => void;

  attributeChangedCallback?: () => void;

  adoptedCallback?: () => void;
}
