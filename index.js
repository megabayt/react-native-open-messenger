import { Platform, Linking } from 'react-native'

const isString = (str) => Object.prototype.toString.call(str) === '[object String]'
const isBool = (bool) => Object.prototype.toString.call(bool) === '[object Boolean]'

const openLink = async (url) => {
  try {
    const canOpen = await Linking.canOpenURL(url);
    if (!canOpen) {
      return Promise.reject(`invalid URL provided: ${url}`);
    } else {
      await Linking.openURL(url);
    }
  } catch (err) {
    return Promise.reject(err);
  }
}

const viber = async (args = {}) => {

  if (!args.number) { return Promise.reject('no number provided') }
  if (!isString(args.number)) { return Promise.reject('number should be string') }

  const url = `viber://add?number=${args.number}`;

  try {
    await openLink(url);
  } catch(err) {
    const urlMarket = Platform.OS === 'ios'
      ? `itms-apps://itunes.apple.com/us/app/id382617920?mt=8`
      : `market://details?id=com.viber.voip`;
    return await openLink(urlMarket);
  }
  return;
}

export default viber;
