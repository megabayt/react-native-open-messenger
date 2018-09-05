import { Platform, Linking } from 'react-native'

const isString = (str) => Object.prototype.toString.call(str) === '[object String]'
const isBool = (bool) => Object.prototype.toString.call(bool) === '[object Boolean]'

const openApp = async (url, iosLink, androidLink) => {
  try {
    return await Linking.openURL(url);
  } catch(err) {
    const urlMarket = Platform.OS === 'ios'
      ? iosLink
      : androidLink;
    return await Linking.openURL(urlMarket);
  }
}

export const openViber = async (args = {}) => {
  if (!args.number) { return Promise.reject('no number provided') }
  if (!isString(args.number)) { return Promise.reject('number should be string') }

  return await openApp(
    `viber://add?number=${args.number}`,
    'itms-apps://itunes.apple.com/us/app/id382617920?mt=8',
    'market://details?id=com.viber.voip'
  );
}

export const openWhatsapp = async (args = {}) => {
  if (!args.number) { return Promise.reject('no number provided') }
  if (!isString(args.number)) { return Promise.reject('number should be string') }

  return await openApp(
    `https://api.whatsapp.com/send?phone=+${args.number}`,
    'itms-apps://itunes.apple.com/us/app/id310633997?mt=8',
    'market://details?id=com.whatsapp'
  );
}

export const openTelegramm = async (args = {}) => {
  if (!args.number) { return Promise.reject('no number provided') }
  if (!isString(args.number)) { return Promise.reject('number should be string') }

  return await openApp(
    `tg://resolve?domain=${args.number}`,
    'itms-apps://itunes.apple.com/us/app/id686449807?mt=8',
    'market://details?id=org.telegram.messenger'
  );
}