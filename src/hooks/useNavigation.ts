import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenName from '../navigation/ScreenName';
import { DetailTransactionData } from '../types';

type RootStackParamList = {
  [ScreenName.TRANSACTION_LIST]: undefined;
  [ScreenName.DETAIL_TRANSACTION]: { item: DetailTransactionData };
};

const useAppNavigation = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const navigateToTransactionList = () => {
    navigation.navigate(ScreenName.TRANSACTION_LIST);
  };

  const navigateToDetails = (item: DetailTransactionData) => {
    navigation.navigate(ScreenName.DETAIL_TRANSACTION, { item });
  };

  return {
    navigation,
    navigateToTransactionList,
    navigateToDetails,
  };
};

export default useAppNavigation;
