import { render, screen } from "@testing-library/react";
import { Dialog, dialogCloseSubject$, dialogOpenSubject$ } from './Dialog'
import { describe, it, expect, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event'


describe("Dialog component with RxJS", () => {
    beforeEach(() => {
        // Reset subject before each test
        dialogOpenSubject$.setSubject = false;
        dialogCloseSubject$.setSubject = true;
    });

    it("should not render initially", () => {
        render(<Dialog title="My Dialog">Content</Dialog>);
        expect(screen.queryByText('My Dialog')).not.toBeInTheDocument();
    })

    it('should show when observable emits true', () => {
        render(<Dialog title="My Dialog">Content</Dialog>);
        dialogOpenSubject$.setSubject = true;
        expect(screen.getByText('My Dialog')).toBeInTheDocument();
        expect(screen.getByText('Content')).toBeInTheDocument();
    });


    it('should hide when observable emits false after being open', () => {
        render(<Dialog title="My Dialog">Content</Dialog>);
        dialogOpenSubject$.setSubject = true;
        expect(screen.getByText('My Dialog')).toBeInTheDocument();

        dialogCloseSubject$.setSubject = true;
        expect(screen.queryByText('My Dialog')).not.toBeInTheDocument();
    });

    it('should close when IconButton is clicked', async () => {
        render(<Dialog title="My Dialog">Content</Dialog>);
        dialogOpenSubject$.setSubject = true;
        const button = screen.getByRole('button');
        await userEvent.click(button);
        expect(screen.queryByText('My Dialog')).not.toBeInTheDocument();
    });
})