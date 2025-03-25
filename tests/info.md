# Testing

## Unit Tests (Vitest + Testing Library)


They test individual functions or components in isolation.
```jsx
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

test("show the correct test", () => {
  render(<Button text="Click me" />);
  expect(screen.getByText("Click me")).toBeInTheDocument();
});
```

## Integration Tests (Vitest + Testing Library)


They verify how multiple components or modules interact with each other.

```jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "./App";

test("the button increment the counter", async () => {
  render(<App />);
  const button = screen.getByRole("button", { name: /increment/i });

  await userEvent.click(button);
  expect(screen.getByText("Counter: 1")).toBeInTheDocument();
});
```

## Functional Tests (Vitest + Supertest)


They validate that a specific application function meets the expected requirements.

```jsx
import request from "supertest";
import app from "../server";

test("debería responder con una lista de usuarios", async () => {
  const response = await request(app).get("/users");
  expect(response.status).toBe(200);
  expect(response.body).toHaveLength(3);
});
```

## User Interface Tests (Playwright)

Verify the UI (buttons, forms, styles)
```jsx
import { test, expect } from "@playwright/test";

test("el usuario puede iniciar sesión", async ({ page }) => {
  await page.goto("https://miapp.com");
  await page.fill("#email", "user@example.com");
  await page.fill("#password", "password123");
  await page.click("text=Iniciar sesión");
  expect(await page.url()).toBe("https://miapp.com/dashboard");
});
```

## End-to-End Tests (Playwright)


They simulate a complete user flow (example: login, adding products to the cart and paying).
```jsx
describe("Flujo de compra", () => {
  it("debería permitir agregar un producto al carrito", () => {
    cy.visit("/productos");
    cy.contains("Añadir al carrito").click();
    cy.get("#cart").should("contain", "1 producto");
  });
});
```