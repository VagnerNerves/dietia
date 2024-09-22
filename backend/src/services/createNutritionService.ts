import { GoogleGenerativeAI } from '@google/generative-ai'

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
    try {
      if (!process.env.API_KEY) {
        throw new Error('Is not api Key on env.')
      }

      const genAI = new GoogleGenerativeAI(process.env.API_KEY)
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

      const response = await model.generateContent(
        `Crie uma dieta completa para uma pessoa com nome: ${name} do sexo ${gender} com peso atual: ${weight}kg, altura: ${height}, idade: ${age} anos e com foco e objetivo em ${objective}, atualmente nível de atividade: ${level} e ignore qualquer outro parâmetro que não seja os passados, retorne em json com as respectivas propriedades, propriedade nome o nome da pessoa, propriedade sexo com sexo, propriedade idade, propriedade altura, propriedade peso, propriedade objetivo com o objetivo atual, propriedade refeições com uma array contendo dentro cada objeto sendo uma refeição da dieta e dentro de cada refeição a propriedade horário com horário da refeição, propriedade nome com nome e a propriedade alimentos com array contendo os alimentos dessa refeição e pode incluir uma propriedade como suplementos contendo array com sugestão de suplemento que é indicado para o sexo dessa pessoa e o objetivo dela e não retorne nenhuma observação além das passadas no prompt, retorne em json e nenhuma propriedade pode ter acento.`
      )

      if (response?.response?.candidates) {
        const jsonText = response.response.candidates[0]?.content.parts[0]
          .text as string

        const jsonString = jsonText
          .replace(/```\w*\n/g, '')
          .replace(/\n```/g, '')
          .trim()

        const jsonObject = JSON.parse(jsonString)

        return { data: jsonObject }
      }
    } catch (error) {
      console.error('Error JSON: ', error)
      throw new Error('Failed Create.')
    }
  }
}

export { createNutritionService }
