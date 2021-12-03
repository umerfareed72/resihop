import NetInfo from '@react-native-community/netinfo';

export default async function CheckConnectivity() {
  const response = await NetInfo.fetch();
  return response.isConnected && response.isInternetReachable;
}
