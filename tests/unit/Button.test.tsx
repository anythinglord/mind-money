import React from "react"
import { render, screen } from "@testing-library/react";
import { Button } from '../../src/components/Button'
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event'

describe("Button", () => {
    it("render a button", () => {
        render(<Button />)
        expect(screen.getByText("button")).toBeInTheDocument()
    })

    it("render a button with label", () => {
        render(<Button label="label"/>)
        expect(screen.getByText("label")).toBeInTheDocument()
    })

    it("execute the handleClick after click the button", async () => {
        const mockHandleClick = vi.fn();
        render(<Button label="clicky" handleClick={mockHandleClick} />);
        const button = screen.getByRole("button", { name: /clicky/i });
        await userEvent.click(button)
        expect(mockHandleClick).toHaveBeenCalledTimes(1)
    })
})