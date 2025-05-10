// frontend/mobile/components/__tests__/ProductCard.test.tsx
import React from "react";
import { render } from "@testing-library/react-native";
import {ProductCard} from "../ProductCardb";

describe("ProductCard", () => {
  it("renders product name, description, and price", () => {
    const { getByText } = render(
      <ProductCard
        name="Test Product"
        description="This is a test description"
        price={29.99}
      />
    );

    expect(getByText("Test Product")).toBeTruthy();
    expect(getByText("This is a test description")).toBeTruthy();
    expect(getByText("$29.99")).toBeTruthy();
  });
});
