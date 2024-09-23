import { Text, TextInput, View, type KeyboardTypeOptions } from 'react-native'

import { Controller, type Control } from 'react-hook-form'

import { colors } from '@/src/constants/colors'

type InputProps = {
  name: string
  control: Control
  placeholder?: string
  rules?: object
  error?: string
  KeyboardType: KeyboardTypeOptions
}

export function Input({
  name,
  control,
  placeholder,
  rules,
  error,
  KeyboardType,
}: InputProps) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{
              height: 44 /* Isso aqui nunca fazer Horrível */,
              backgroundColor: colors.white,
              paddingHorizontal: 10,
              borderRadius: 4,
            }}
            placeholder={placeholder}
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
            keyboardType={KeyboardType}
          />
        )}
      />

      {error && <Text style={{ color: 'red', marginTop: 4 }}>{error}</Text>}
    </View>
  )
}
