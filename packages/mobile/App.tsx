import { StatusBar } from 'expo-status-bar'
import { ImageBackground, Text } from 'react-native'
import { styled } from 'nativewind'

import blurBg from 'src/assets/blur.png'
import Stripes from './src/assets/stripes.svg'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'

const StyledStripes = styled(Stripes)

export default function App() {
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  if (!hasLoadedFonts) {
    return null
  }

  return (
    <ImageBackground
      source={blurBg}
      className={'relative flex-1 bg-gray-900'}
      imageStyle={{
        position: 'absolute',
        left: '-100%',
      }}
    >
      <StyledStripes className={'absolute left-2'} />
      <StatusBar style="light" translucent />
    </ImageBackground>
  )
}
