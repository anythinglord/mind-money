import { z } from "zod";

export const expenseSchema = z.object({
    name: z.string().min(5, "Must be at least 5 characters long"),
    amount: z.string().min(1, "Must be at least 1 characters long"),
});
    
