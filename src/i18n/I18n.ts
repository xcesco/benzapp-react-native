import I18n from 'react-native-i18n';

I18n.fallbacks = true;
I18n.defaultLocale = 'it';

I18n.translations = {
  it: {
    login: 'Login',
    loginSuccess: 'Login effettuato con successo',
    loginError: 'Credenziali invalide!',
    loginStart: 'Login in corso',

    lockLabelCheckPin: 'Inserisci il pin',
    lockLabelSetPin: 'Definisci un pin a 6 cifre',
    lockLabelSetSecondPin: 'Inserisci nuovamente il PIN',

    lockMessageOk: 'PIN valido',
    lockMessageError: 'PIN errato, riprovare',
    lockMessageSecondError: 'PIN non coincidente, riprovare',
  }
};

export default I18n;
