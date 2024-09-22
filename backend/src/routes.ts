import type {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from 'fastify'
import { createNutritionController } from './controllers/createNutritionController'

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.get('/teste', (request: FastifyRequest, reply: FastifyReply) => {
    const responseText =
      '```json\n{\n  "nome": "Vagner",\n  "sexo": "Masculino",\n  "idade": 36,\n  "altura": 1.70,\n  "peso": 60,\n  "objetivo": "hipertrofia",\n  "refeicoes": [\n    {\n      "horario": "08:00",\n      "nome": "Café da Manhã",\n      "alimentos": [\n        "2 fatias de pão integral",\n        "2 ovos mexidos",\n        "1 banana",\n        "200ml de leite desnatado",\n        "1 colher de sopa de azeite de oliva"\n      ]\n    },\n    {\n      "horario": "10:00",\n      "nome": "Lanche da Manhã",\n        "alimentos": [\n          "1 iogurte grego com granola",\n          "1 scoop de whey protein"\n        ]\n    },\n    {\n      "horario": "13:00",\n      "nome": "Almoço",\n      "alimentos": [\n        "150g de frango grelhado",\n        "1 xícara de arroz integral",\n        "1 xícara de brócolis",\n        "1 batata doce média",\n        "Salada verde à vontade"\n      ]\n    },\n    {\n      "horario": "16:00",\n      "nome": "Lanche da Tarde",\n      "alimentos": [\n        "1 scoop de whey protein",\n        "1 fruta (maçã, laranja, etc.)"\n      ]\n    },\n    {\n      "horario": "20:00",\n      "nome": "Jantar",\n      "alimentos": [\n        "150g de peixe grelhado",\n        "1 xícara de quinoa",\n        "1 xícara de espinafre",\n        "Salada verde à vontade"\n      ]\n    }\n  ],\n  "suplementos": [\n    "Whey protein",\n    "Creatina",\n    "BCAA",\n    "Glutamina"\n  ]\n}\n```'

    try {
      const jsonString = responseText
        .replace(/```\w*\n/g, '')
        .replace(/\n```/g, '')
        .trim()

      const jsonObject = JSON.parse(jsonString)

      return reply.send({ data: jsonObject })
    } catch (error) {
      console.log(error)
    }

    reply.send({ ok: true })
  })

  fastify.post(
    '/create',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new createNutritionController().handle(request, reply)
    }
  )
}
