import { z } from "zod";

export const expenseSchema = (isEditMode: boolean) => z.object({
    name: isEditMode ? z.optional(z.string()) : z.string().min(4, "Must be at least 4 characters long"),
    amount: isEditMode ? z.optional(z.string()) : z.string().min(2, "Must be at least 2 characters long"),
});
    
