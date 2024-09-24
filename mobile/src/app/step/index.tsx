import { Pressable, ScrollView, Text, View } from 'react-native'

import { router } from 'expo-router'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { colors } from '@/src/constants/colors'

import { useDataStore } from '@/src/store/data'

import { Header } from '@/src/components/header'
import { Input } from '@/src/components/input'

const schema = z.object({
  name: z.string().min(1, { message: 'O nome é Obrigatório.' }),
  weight: z.string().min(1, { message: 'O peso é Obrigatório.' }),
  age: z.string().min(1, { message: 'A idade é Obrigatória.' }),
  height: z.string().min(1, { message: 'A altura é Obrigatória.' }),
})

type FormData = z.infer<typeof schema>

export default function Step() {
  const { setPageOne } = useDataStore()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  function handleCreate(data: FormData) {
    setPageOne(data)

    router.push('/create')
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header step="Passo 1" title="Vamos Começar" />

      <ScrollView style={{ paddingHorizontal: 16 }}>
        <Text
          style={{
            fontSize: 16,
            color: colors.white,
            fontWeight: 'bold',
            marginBottom: 8,
          }}
        >
          Nome Completo
        </Text>
        <Input
          name="name"
          control={control}
          placeholder="Digite seu nome..."
          error={errors.name?.message}
          KeyboardType="default"
        />

        <Text
          style={{
            fontSize: 16,
            color: colors.white,
            fontWeight: 'bold',
            marginBottom: 8,
          }}
        >
          Seu peso atual:
        </Text>
        <Input
          name="weight"
          control={control}
          placeholder="Ex: 75"
          error={errors.weight?.message}
          KeyboardType="numeric"
        />

        <Text
          style={{
            fontSize: 16,
            color: colors.white,
            fontWeight: 'bold',
            marginBottom: 8,
          }}
        >
          Sua altura atual:
        </Text>
        <Input
          name="height"
          control={control}
          placeholder="Ex: 1.70"
          error={errors.height?.message}
          KeyboardType="numeric"
        />

        <Text
          style={{
            fontSize: 16,
            color: colors.white,
            fontWeight: 'bold',
            marginBottom: 8,
          }}
        >
          Sua idade atual:
        </Text>
        <Input
          name="age"
          control={control}
          placeholder="Ex: 36"
          error={errors.age?.message}
          KeyboardType="numeric"
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
