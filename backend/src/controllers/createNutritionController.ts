import type { FastifyRequest, FastifyReply } from 'fastify'
import { createNutritionService } from '../services/createNutritionService'

export type CreateNutritionDataProps = {
  name: string
  weight: string
  height: string
  age: string
  gender: string
  objective: string
  level: string
}

class createNutritionController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, weight, height, age, gender, objective, level } =
      request.body as CreateNutritionDataProps

    const createNutrition = new createNutritionService()

    const nutrition = await createNutrition.execute({
      name,
      weight,
      height,
      age,
      gender,
      objective,
      level,
    })

    reply.send({ nutrition })
  }
}

export { createNutritionController }
