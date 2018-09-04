import { Platform, Linking } from 'react-native'

const isString = (str) => Object.prototype.toString.call(str) === '[object String]'
const isBool = (bool) => Object.prototype.toString.call(bool) === '[object Boolean]'

const viber = async (args = {}) => {

  if (!args.number) { return Promise.reject('no number provided') }
  if (!isString(args.number)) { return Promise.reject('number should be string') }

  const url = `viber://add?number=${args.number}`;

  try {
    return await Linking.openURL(url);
  } catch(err) {
    const urlMarket = Platform.OS === 'ios'
      ? `itms-apps://itunes.apple.com/us/app/id382617920?mt=8`
      : `market://details?id=com.viber.voip`;
    return await Linking.openURL(urlMarket);
  }
}

export default viber;
