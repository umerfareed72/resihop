import dynamicLinks from '@react-native-firebase/dynamic-links';
export const LinkHelper = async () => {
  const link = await dynamicLinks().buildShortLink({
    link: `https://resihop.page.link/N8fh`,
    // domainUriPrefix is created in your Firebase console
    domainUriPrefix: 'https://resihop.page.link',
    // optional setup which updates Firebase analytics campaign
    // "banner". This also needs setting up before hand
    analytics: {
      campaign: 'banner',
    },
    android: {
      packageName: 'com.reactnative.resihop',
    },
  });
  return link;
};
