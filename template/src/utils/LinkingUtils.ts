import { Linking } from 'react-native';

class LinkingUtils {
  openUrl = async (url: string) => {
    if (url.startsWith('www')) {
      url = 'https://' + url;
    }
    console.log({ url });
    try {
      await Linking.openURL(url);
    } catch (e) {
      //
    }
  };
}

export default new LinkingUtils();
