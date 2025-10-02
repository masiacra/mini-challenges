import { CustomComponentName } from "./consts";
import { CustomComponent } from "./types";

const RouteDictionary: Record<string, string> = {
  "/counter": CustomComponentName.CounterForm,
};

export function renderContent(parent: HTMLElement, pathname: string): void {
  parent.innerHTML = "";

  if (pathname === "/") {
    return;
  }
  const newChildLabel =
    RouteDictionary[pathname] ?? CustomComponentName.NotFound;
  const newChild = document.createElement(newChildLabel);
  parent.append(newChild);
}
