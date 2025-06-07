import { z } from 'zod';
export const formSchema = z.object({
  features: z.object({
    "Hours Studied": z.string().regex(/^\d+$/, "Must be a number").refine(val => {
      const num = Number(val);
      return num >= 0 && num <= 16;
    }, {
      message: "Must be between 0 and 16",
    }),

    "Previous Scores": z.string().regex(/^\d+$/, "Must be a number").refine(val => {
      const num = Number(val);
      return num >= 1 && num <= 100;
    }, {
      message: "Must be between 1 and 100",
    }),

    "Extracurricular Activities": z.enum(["No", "Yes"]),

    "Sleep Hours": z.string().regex(/^\d+$/, "Must be a number").refine(val => {
      const num = Number(val);
      return num >= 1 && num <= 16;
    }, {
      message: "Must be between 1 and 16",
    }),

    "Sample Question Papers Practiced": z.string().regex(/^\d+$/, "Must be a number").refine(val => {
      const num = Number(val);
      return num >= 0 && num <= 16;
    }, {
      message: "Must be between 0 and 16",
    }),
  }),
});


export type FormFeatures = z.infer<typeof formSchema>;
export const schema = z.object({ features: formSchema });
export type FormData = z.infer<typeof schema>;
