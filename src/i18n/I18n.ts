import I18n from 'react-native-i18n';

I18n.fallbacks = true;
I18n.defaultLocale = 'it';

I18n.translations = {
  // en: {
  //   greeting: 'Hi from the UK!',
  // },
  it: {
    login: 'Login',
    loginSuccess: 'Login effettuato con successo',
    loginError: 'Credenziali invalide!',
    loginStart: 'Login in corso',
  },
};

export default I18n;
