import { render, screen, waitFor, act } from "@testing-library/react";
import { Dialog, dialogCloseSubject$, dialogOpenSubject$ } from './Dialog'
import { describe, it, expect, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { expensesSlice } from '../../redux/states/expenses'
import { categorySlice } from '../../redux/states/category'
import { userSlice } from '../../redux/states/user'

// Create a test store
const createTestStore = () => {
    return configureStore({
        reducer: {
            expenses: expensesSlice.reducer,
            category: categorySlice.reducer,
            user: userSlice.reducer
        }
    })
}

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
    const store = createTestStore()
    return <Provider store={store}>{children}</Provider>
}

describe("Dialog component with RxJS", () => {
    beforeEach(() => {
        // Reset subject before each test
        dialogOpenSubject$.setSubject = false;
        dialogCloseSubject$.setSubject = false;
    });

    it("should not render initially", () => {
        render(
            <TestWrapper>
                <Dialog title="My Dialog">Content</Dialog>
            </TestWrapper>
        );
        expect(screen.queryByText('My Dialog')).not.toBeInTheDocument();
    })

    it('should show when observable emits true', async () => {
        render(
            <TestWrapper>
                <Dialog title="My Dialog">Content</Dialog>
            </TestWrapper>
        );
        
        act(() => {
            dialogOpenSubject$.setSubject = true;
        });
        
        await waitFor(() => {
            expect(screen.getByText('My Dialog')).toBeInTheDocument();
        });
        expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('should hide when observable emits false after being open', async () => {
        render(
            <TestWrapper>
                <Dialog title="My Dialog">Content</Dialog>
            </TestWrapper>
        );
        
        act(() => {
            dialogOpenSubject$.setSubject = true;
        });
        
        await waitFor(() => {
            expect(screen.getByText('My Dialog')).toBeInTheDocument();
        });

        act(() => {
            dialogCloseSubject$.setSubject = true;
        });
        
        await waitFor(() => {
            expect(screen.queryByText('My Dialog')).not.toBeInTheDocument();
        });
    });

    it('should close when IconButton is clicked', async () => {
        render(
            <TestWrapper>
                <Dialog title="My Dialog">Content</Dialog>
            </TestWrapper>
        );
        
        act(() => {
            dialogOpenSubject$.setSubject = true;
        });
        
        await waitFor(() => {
            expect(screen.getByText('My Dialog')).toBeInTheDocument();
        });
        
        const button = screen.getByRole('button');
        await userEvent.click(button);
        
        await waitFor(() => {
            expect(screen.queryByText('My Dialog')).not.toBeInTheDocument();
        });
    });
})