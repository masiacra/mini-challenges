import { registerCounterForm } from "./counter-form/counter-form";
import { registerNavigateCard } from "./navigate-item/navigate-item";
import { registerNotFound } from "./not-found/not-found";
import { renderContent } from "./render-content";

function main() {
  registerNavigateCard();
  registerCounterForm();
  registerNotFound();
}

document.addEventListener("DOMContentLoaded", main);

function handlePopstate() {
  renderContent(document.getElementById("root")!, globalThis.location.pathname);
}

window.addEventListener("popstate", handlePopstate);
