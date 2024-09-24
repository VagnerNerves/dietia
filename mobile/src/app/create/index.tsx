import { Pressable, ScrollView, Text, View } from 'react-native'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { colors } from '@/src/constants/colors'

import { useDataStore } from '@/src/store/data'

import { Header } from '@/src/components/header'
import { Select } from '@/src/components/input/select'

const schema = z.object({
  gender: z.string().min(1, { message: 'O sexo é Obrigatório.' }),
  objective: z.string().min(1, { message: 'O objetivo é Obrigatório.' }),
  level: z.string().min(1, { message: 'Selecione seu level.' }),
})

type FormData = z.infer<typeof schema>

export default function Create() {
  const { setPageTwo } = useDataStore()
  console.log('ddd')

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const genderOptions = [
    { label: 'Masculino', value: 'masculino' },
    { label: 'Feminino', value: 'feminino' },
  ]

  const levelOptions = [
    {
      label: 'Sedentário (pouco ou nenhuma atividade física)',
      value: 'Sedentário',
    },
    {
      label: 'Levemente ativo (exercícios 1 a 3 vezes na semana)',
      value: 'Levemente ativo (exercícios 1 a 3 vezes na semana)',
    },
    {
      label: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)',
      value: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)',
    },
    {
      label: 'Altamente ativo (exercícios 5 a 7 dia por semana)',
      value: 'Altamente ativo (exercícios 5 a 7 dia por semana)',
    },
  ]

  const objectiveOptions = [
    { label: 'Emagrecer', value: 'emagrecer' },
    { label: 'Hipertrofia', value: 'Hipertrofia' },
    { label: 'Hipertrofia + Definição', value: 'Hipertrofia e Definição' },
    { label: 'Definição', value: 'Definição' },
  ]

  function handleCreate(data: FormData) {
    setPageTwo(data)
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header step="Passo 2" title="Finalizando Dieta" />

      <ScrollView style={{ paddingHorizontal: 16 }}>
        <Text
          style={{
            fontSize: 16,
            color: colors.white,
            fontWeight: 'bold',
            marginBottom: 8,
          }}
        >
          Sexo:
        </Text>
        <Select
          control={control}
          name="gender"
          placeholder="Selecione o seu sexo..."
          error={errors.gender?.message}
          options={genderOptions}
        />

        <Text
          style={{
            fontSize: 16,
            color: colors.white,
            fontWeight: 'bold',
            marginBottom: 8,
          }}
        >
          Selecione nível de atividade física:
        </Text>
        <Select
          control={control}
          name="level"
          placeholder="Selecione seu nível..."
          error={errors.level?.message}
          options={levelOptions}
        />

        <Text
          style={{
            fontSize: 16,
            color: colors.white,
            fontWeight: 'bold',
            marginBottom: 8,
          }}
        >
          Selecione seu objetivo:
        </Text>
        <Select
          control={control}
          name="objective"
          placeholder="Selecione seu objetivo..."
          error={errors.objective?.message}
          options={objectiveOptions}
        />

        <Pressable
          style={{
            backgroundColor: colors.blue,
            height: 44 /* Nunca fazer isso Horrível */,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
          }}
          onPress={handleSubmit(handleCreate)}
        >
          <Text
            style={{ color: colors.white, fontSize: 16, fontWeight: 'bold' }}
          >
            Avançar
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  )
}
