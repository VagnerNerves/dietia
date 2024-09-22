import { Pressable, Text, View } from 'react-native'

import { Feather } from '@expo/vector-icons'

import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { colors } from '@/src/constants/colors'
import { router } from 'expo-router'

type HeaderProps = {
  step: string
  title: string
}

export function Header({ step, title }: HeaderProps) {
  const insets = useSafeAreaInsets()

  return (
    <View
      style={{
        backgroundColor: colors.white,
        borderBottomRightRadius: 14,
        borderBottomLeftRadius: 14,
        marginBottom: 14,
        paddingTop: insets.top + 34,
      }}
    >
      <View style={{ paddingHorizontal: 16, paddingBottom: 34 }}>
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          <Pressable onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color={colors.black} />
          </Pressable>

          <Text style={{ fontSize: 18 }}>{step}</Text>

          <Feather name="loader" size={16} color={colors.black} />
        </View>

        <Text
          style={{ fontSize: 30, fontWeight: 'bold', color: colors.background }}
        >
          {title}
        </Text>
      </View>
    </View>
  )
}
