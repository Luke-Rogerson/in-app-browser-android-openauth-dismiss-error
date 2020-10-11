import React from 'react';
import {SafeAreaView, Linking, Button} from 'react-native';

import InAppBrowser from 'react-native-inappbrowser-reborn';

const App = () => {
  async function openLink() {
    const deepLink = 'hello';
    const url = `https://my-auth-login-page.com?redirect_uri=${deepLink}`;
    try {
      if (await InAppBrowser.isAvailable()) {
        InAppBrowser.openAuth(url, deepLink, {
          // iOS Properties
          ephemeralWebSession: false,
          // Android Properties
          showTitle: false,
          enableUrlBarHiding: true,
          enableDefaultShare: false,
        }).then((response) => {
          if (response.type === 'success' && response.url) {
            Linking.openURL(response.url);
          }
        });
      } else Linking.openURL(url);
    } catch (error) {
      Linking.openURL(url);
    }
  }

  return (
    <SafeAreaView>
      <Button title="PRESS ME" onPress={() => openLink()} />
    </SafeAreaView>
  );
};

export default App;
