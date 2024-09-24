import { useState } from 'react'
import { Text, View, TouchableOpacity, FlatList, Modal } from 'react-native'

import { Feather } from '@expo/vector-icons'

import { Controller } from 'react-hook-form'

import { colors } from '@/src/constants/colors'

type OptionsProps = {
  label: string
  value: string | number
}

type SelectProps = {
  name: string
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  control: any
  placeholder?: string
  error?: string
  options: OptionsProps[]
}

export function Select({
  name,
  control,
  placeholder,
  error,
  options,
}: SelectProps) {
  const [visible, setVisible] = useState(false)

  return (
    <View style={{ marginBottom: 16 }}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                height: 44 /* Nunca faça isso Horrível */,
                backgroundColor: colors.white,
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                borderRadius: 4,
              }}
              onPress={() => setVisible(true)}
            >
              <Text>
                {value
                  ? options.find(option => option.value === value)?.label
                  : placeholder}
              </Text>
              <Feather name="arrow-down" size={16} color={colors.black} />
            </TouchableOpacity>

            <Modal
              visible={visible}
              animationType="fade"
              transparent
              onRequestClose={() => setVisible(false)}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  flex: 1,
                  justifyContent: 'center',
                }}
                activeOpacity={1}
                onPress={() => setVisible(false)}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.white,
                    marginHorizontal: 10,
                    borderRadius: 8,
                    padding: 20,
                  }}
                  activeOpacity={1}
                >
                  <FlatList
                    contentContainerStyle={{ gap: 4 }}
                    data={options}
                    keyExtractor={item => String(item.value)}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={{
                          paddingVertical: 14,
                          paddingHorizontal: 8,
                          backgroundColor: 'rgba(208,208,208,0.40)',
                          borderRadius: 4,
                        }}
                        onPress={() => {
                          onChange(item.value)

                          setVisible(false)
                        }}
                      >
                        <Text>{item.label}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            </Modal>
          </>
        )}
      />

      {error && <Text style={{ color: 'red', marginTop: 4 }}>{error}</Text>}
    </View>
  )
}
