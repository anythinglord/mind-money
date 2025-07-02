import { z } from "zod";

export const expenseSchema = z.object({
    name: z.string().min(5, "Must be at least 5 characters long"),
    amount: z.string().min(2, "Must be at least 2 characters long"),
});
    
