import z from 'zod';

const productsSchema = z.object({
  name: z.string({
    invalid_type_error: "El nombre tiene que ser una cadena de texto.",
    required_error: 'El nombre es requerido.'
  }),
  nameImg: z.string({
    required_error: 'La imagen es requerida.'
  }),
  price: z.number({
    invalid_type_error: "El precio tiene que ser un número.",
    required_error: 'El precio es requerido.'
  }),
  description: z.string({
    invalid_type_error: "La descripción tiene que ser una cadena de texto.",
  })

});


export function validateProduct(product) {
  return productsSchema.safeParse(product);
}

export function validatePartialProduct(product) {
  return productsSchema.partial().safeParse(product);
}
