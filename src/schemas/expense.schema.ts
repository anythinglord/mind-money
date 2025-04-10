import { z } from "zod";

export const expenseSchema = z.object({
    description: z.string(),
    amount: z.string(),
});
    
