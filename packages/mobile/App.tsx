import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree';
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto';
import { StatusBar } from 'expo-status-bar';
import { styled } from 'nativewind';
import { ImageBackground } from 'react-native';

import blurBg from 'src/assets/blur.png';
import Stripes from './src/assets/stripes.svg';

const StyledStripes = styled(Stripes);

export default function App() {
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  });

  if (!hasLoadedFonts) {
    return null;
  }

  return (
    <ImageBackground
      className="relative flex-1 bg-gray-900"
      source={blurBg}
      imageStyle={{
        position: 'absolute',
        left: '-100%',
      }}
    >
      <StyledStripes className="absolute left-2" />
      <StatusBar translucent style="light" />
    </ImageBackground>
  );
}
