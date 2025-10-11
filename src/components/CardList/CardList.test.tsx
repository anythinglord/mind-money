import { render, screen } from "@testing-library/react";
import { CardList } from ".";
import { describe, it, expect } from 'vitest';
import { Section } from '../../models/interfaces'

describe("CardList", () => {

    const mockData: Section[] = [
        { name: 'expenses', icon: 'dollar-sign', value: 5000 },
        { name: 'income', icon: 'pie-chart', value: 'Food' },
        { name: 'total month', icon: 'signal', value: 6000 }
    ];

    it("render all cards correctly", () => {
        render(<CardList data={mockData} />);

        // Verify the names will be rendered
        expect(screen.getByText('expenses')).toBeInTheDocument();
        expect(screen.getByText('income')).toBeInTheDocument();
        expect(screen.getByText('total month')).toBeInTheDocument();

        // Verify the numeric values
        expect(screen.getByText('$ 5,000')).toBeInTheDocument();
        expect(screen.getByText('$ 6,000')).toBeInTheDocument();

        // Verify the string value
        expect(screen.getByText('Food')).toBeInTheDocument();
    })

    it('render the main container', () => {
        const { container } = render(<CardList data={mockData} />);
        expect(container.querySelector('.cardl-index')).toBeInTheDocument();
    });

    it('use key index without break the app', () => {
        // Si quieres comprobar que no rompe con keys repetidas
        const dataWithDuplicateNames: Section[] = [
          { name: 'A', icon: 'star', value: 1 },
          { name: 'A', icon: 'star', value: 2 },
        ];
    
        render(<CardList data={dataWithDuplicateNames} />);
        expect(screen.getAllByText('A').length).toBe(2);
    });
})
