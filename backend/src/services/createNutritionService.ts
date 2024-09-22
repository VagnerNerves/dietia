import type { CreateNutritionDataProps } from '../controllers/createNutritionController'

class createNutritionService {
  async execute({
    name,
    weight,
    height,
    age,
    gender,
    objective,
    level,
  }: CreateNutritionDataProps) {
    console.log('TESTE')

    return { message: 'Funcionou o Service' }
  }
}

export { createNutritionService }
