import { registerCounterForm } from "./counter-form";
import { registerNavigateCard } from "./navigate-card";
import { registerNotFound } from "./not-found";
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
