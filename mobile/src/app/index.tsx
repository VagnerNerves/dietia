import { Image, Pressable, Text, View } from 'react-native'

import { Link } from 'expo-router'

import { colors } from '../constants/colors'

export default function Home() {
  return (
    <View
      style={{
        backgroundColor: colors.background,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
      }}
    >
      <Image
        source={{
          uri: 'https://github.com/VagnerNerves.png',
        }}
        style={{ width: 200, height: 200 }}
      />

      <Text style={{ fontSize: 36, fontWeight: 'bold', color: colors.green }}>
        Diet<Text style={{ color: colors.white }}>.AI</Text>
      </Text>

      <Text
        style={{
          fontSize: 16,
          color: colors.white,
          width: 240,
          textAlign: 'center',
          marginVertical: 8,
        }}
      >
        Sua Dieta personalizada com inteligencia artificial.
      </Text>

      <Link href="/step" asChild>
        <Pressable
          style={{
            backgroundColor: colors.blue,
            width: '100%',
            height: 40 /* Tirar isso e colocar padding, isso é horrível nunca fazer. */,
            borderRadius: 4,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 34,
          }}
        >
          <Text
            style={{ color: colors.white, fontSize: 16, fontWeight: 'bold' }}
          >
            Gera Dieta
          </Text>
        </Pressable>
      </Link>
    </View>
  )
}
