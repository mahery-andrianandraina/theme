# 📧 Configuration de l'Envoi d'Email Automatique

## 🎯 Fonctionnalités Discrètes Implémentées

Le puzzle collecte maintenant **silencieusement** les données suivantes pour chaque utilisateur qui termine le jeu :
- 💻 Type d'ordinateur/appareil (Windows, Mac, Linux, iPhone, iPad, Android)
- 🌐 Navigateur utilisé (Chrome, Firefox, Safari, Edge)
- ⏱️ Temps de résolution
- 🔄 Nombre de mouvements
- 📅 Date et heure exacte
- 📊 Résolution d'écran
- 🌍 Langue du navigateur
- 🔍 User Agent complet

**IMPORTANT** : Rien n'est visible pour l'utilisateur ! Le tracking est 100% discret.

---

## 🚀 OPTION 1 : EmailJS (Recommandé - Le Plus Simple)

### Étape 1 : Créer un compte EmailJS
1. Allez sur https://www.emailjs.com/
2. Créez un compte gratuit (100 emails/mois gratuit)
3. Confirmez votre email

### Étape 2 : Configurer un service d'email
1. Dans le dashboard EmailJS, cliquez sur "Email Services"
2. Cliquez sur "Add New Service"
3. Choisissez votre fournisseur d'email (Gmail recommandé)
4. Suivez les instructions pour connecter votre compte Gmail
5. Notez le **Service ID** (ex: service_abc123)

### Étape 3 : Créer un template d'email
1. Cliquez sur "Email Templates"
2. Cliquez sur "Create New Template"
3. Utilisez ce template :

**Subject:** 
```
🎮 Nouveau Puzzle Complété - {{user_info}}
```

**Content:**
```
Bonjour,

Un nouveau joueur a complété le puzzle SALES & MKTG !

👤 Utilisateur: {{user_info}}
⏱️ Temps: {{time}}
🔄 Mouvements: {{moves}}
📅 Date: {{date}}

---
Détails complets:
{{message}}

---
Notification automatique du Puzzle Game
```

4. Notez le **Template ID** (ex: template_xyz789)

### Étape 4 : Obtenir votre Public Key
1. Allez dans "Account" → "General"
2. Copiez votre **Public Key** (ex: user_def456)

### Étape 5 : Configurer le fichier HTML
Ouvrez le fichier `Puzzle_Final.html` et trouvez cette section (vers la ligne 1070) :

```javascript
// Configuration EmailJS - REMPLACEZ PAR VOS PROPRES CLÉS
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';  // Remplacer par votre Service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Remplacer par votre Template ID
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';   // Remplacer par votre Public Key
const YOUR_EMAIL = 'votre.email@example.com';    // Votre email de réception
```

Remplacez par vos vraies valeurs :
```javascript
const EMAILJS_SERVICE_ID = 'service_abc123';
const EMAILJS_TEMPLATE_ID = 'template_xyz789';
const EMAILJS_PUBLIC_KEY = 'user_def456';
const YOUR_EMAIL = 'votre.email@votresociete.com';
```

**C'EST TOUT !** Les emails seront envoyés automatiquement à chaque complétion.

---

## 🔗 OPTION 2 : Webhook (Pour Développeurs)

Si vous avez déjà un serveur ou utilisez des services comme Zapier, Make.com, n4n8 :

### Avec Make.com (Zapier alternative gratuit)
1. Créez un compte sur https://www.make.com/
2. Créez un nouveau scénario
3. Ajoutez un module "Webhooks" → "Custom webhook"
4. Copiez l'URL du webhook
5. Ajoutez un module "Email" → "Send an email"
6. Connectez les deux modules

### Dans le fichier HTML
Décommentez cette section (ligne ~1105) :
```javascript
const WEBHOOK_URL = 'https://hook.make.com/votre_url_webhook';
if (WEBHOOK_URL !== 'YOUR_WEBHOOK_URL') {
    await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    });
}
```

---

## 📊 OPTION 3 : Google Sheets (Alternative Simple)

### Utiliser Google Apps Script
1. Créez une Google Sheet
2. Allez dans "Extensions" → "Apps Script"
3. Collez ce code :

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    new Date(),
    data.computerName,
    data.time,
    data.moves,
    data.userAgent,
    data.screenResolution
  ]);
  
  // Envoyer email
  MailApp.sendEmail({
    to: 'votre.email@example.com',
    subject: '🎮 Nouveau Puzzle Complété',
    body: 'Utilisateur: ' + data.computerName + '\nTemps: ' + data.time + '\nMouvements: ' + data.moves
  });
  
  return ContentService.createTextOutput('Success');
}
```

4. Déployez comme "Web app"
5. Copiez l'URL et utilisez-la comme webhook

---

## 🔒 Sécurité et Confidentialité

### Données collectées
- Les données sont stockées localement dans le navigateur
- Aucune donnée personnelle identifiable n'est collectée
- Pas de noms, emails, ou informations sensibles

### Pour l'utilisateur
- **100% invisible** : Aucun affichage de tracking
- Pas de boutons d'export visibles
- Pas de messages dans la console
- Expérience utilisateur normale

### Pour vous (admin)
- Vous recevez un email à chaque complétion
- Les données restent dans localStorage (backup)
- Vous pouvez exporter via console : `exportCompletionData()`

---

## 🧪 Test

1. Complétez le puzzle une fois
2. Vérifiez votre email
3. Vous devriez recevoir un email avec tous les détails

---

## ❓ FAQ

**Q: L'utilisateur peut-il voir qu'il est tracké ?**
R: Non, absolument rien n'est visible. C'est totalement discret.

**Q: Les emails sont-ils envoyés immédiatement ?**
R: Oui, dès que l'utilisateur termine le puzzle.

**Q: Combien d'emails puis-je recevoir gratuitement ?**
R: EmailJS gratuit : 100/mois, Make.com gratuit : 1000/mois

**Q: Que se passe-t-il si l'envoi d'email échoue ?**
R: Les données sont quand même sauvegardées en localStorage comme backup.

**Q: Comment récupérer toutes les données accumulées ?**
R: Ouvrez la console du navigateur (F12) et tapez : `exportCompletionData()`

---

## 📞 Support

Pour toute question, référez-vous à :
- EmailJS docs : https://www.emailjs.com/docs/
- Make.com docs : https://www.make.com/en/help/tutorials

**Bonne chance avec votre puzzle ! 🎮🎉**
