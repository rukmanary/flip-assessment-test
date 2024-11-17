import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenName from '../navigation/ScreenName';

type RootStackParamList = {
  [ScreenName.TRANSACTION_LIST]: undefined;
  [ScreenName.DETAIL_TRANSACTION]: { itemId: string };
};

const useAppNavigation = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const navigateToTransactionList = () => {
    navigation.navigate(ScreenName.TRANSACTION_LIST);
  };

  const navigateToDetails = (itemId: string) => {
    navigation.navigate(ScreenName.DETAIL_TRANSACTION, { itemId });
  };

  return {
    navigation,
    navigateToTransactionList,
    navigateToDetails,
  };
};

export default useAppNavigation;
