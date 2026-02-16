# 📊 GUIDE COMPLET - Intégration Google Sheets API

## 🎯 Ce qu'on va faire :

Transformer votre puzzle en un vrai système de **classement partagé** où tous les joueurs voient les scores de tout le monde en temps réel !

---

## 📋 ÉTAPE 1 : Créer votre Google Sheet

### 1.1 Créer le fichier
1. Allez sur [Google Sheets](https://sheets.google.com)
2. Créez un nouveau document
3. Nommez-le : **"Puzzle Team Leaderboard"**

### 1.2 Configurer les colonnes
Dans la première ligne, créez ces en-têtes :

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| Timestamp | Nom | Temps (sec) | Mouvements | Score | Date |

### 1.3 Rendre le sheet accessible
1. Cliquez sur **"Partager"** (en haut à droite)
2. Changez l'accès à : **"Tous les utilisateurs avec le lien peuvent modifier"**
3. Copiez le **lien du sheet**

**Exemple de lien :**
```
https://docs.google.com/spreadsheets/d/ABC123XYZ789/edit
```

Le code important est : **ABC123XYZ789** (votre SHEET_ID)

---

## 📋 ÉTAPE 2 : Activer l'API Google Sheets

### 2.1 Créer un projet Google Cloud
1. Allez sur [Google Cloud Console](https://console.cloud.google.com)
2. Créez un nouveau projet : **"Puzzle Leaderboard"**
3. Sélectionnez ce projet

### 2.2 Activer l'API
1. Dans le menu, allez à **"APIs & Services" > "Library"**
2. Cherchez **"Google Sheets API"**
3. Cliquez sur **"Enable"**

### 2.3 Créer une clé API
1. Allez à **"APIs & Services" > "Credentials"**
2. Cliquez **"+ CREATE CREDENTIALS"**
3. Choisissez **"API Key"**
4. Copiez votre clé : `AIzaSyBITbhLW7s0UoFQtyJkUniObXmre62UCYw`

### 2.4 Configurer la clé (IMPORTANT)
1. Cliquez sur votre clé API
2. Sous **"API restrictions"**, sélectionnez **"Restrict key"**
3. Cochez uniquement **"Google Sheets API"**
4. Sous **"Website restrictions"**, ajoutez vos domaines autorisés
5. Cliquez **"Save"**

---

## 📋 ÉTAPE 3 : Configuration dans le code

Dans le fichier HTML, vous devrez ajouter ces deux valeurs :

```javascript
const GOOGLE_SHEETS_CONFIG = {
    apiKey: 'AIzaSyBITbhLW7s0UoFQtyJkUniObXmre62UCYw',  // Votre clé API
    spreadsheetId: '1BDcTW-OE7Ya-qDEnoZf4sY4dfYEI6PCRzwOpMP4lKsI',                    // Votre Sheet ID
    sheetName: 'Feuille 1'                               // Nom de l'onglet (généralement Sheet1)
};
```

---

## 📋 ÉTAPE 4 : Tester

### Test 1 : Vérifier l'accès au Sheet
Ouvrez la console (F12) après avoir chargé la page, vous devriez voir :
```
✅ Connected to Google Sheets!
📊 Leaderboard loaded: 0 scores
```

### Test 2 : Ajouter un score
1. Résolvez le puzzle
2. Entrez votre nom
3. Vérifiez dans votre Google Sheet → une nouvelle ligne devrait apparaître !

### Test 3 : Multi-utilisateurs
1. Ouvrez le jeu sur **2 ordinateurs différents**
2. Résolvez sur les 2
3. Les 2 devraient voir les scores des 2 dans le classement !

---

## 🔒 SÉCURITÉ & BONNES PRATIQUES

### ⚠️ Limitations de sécurité
Avec cette méthode (clé API publique) :
- ✅ Parfait pour usage interne d'équipe
- ✅ Gratuit et simple
- ⚠️ La clé API est visible dans le code source
- ⚠️ Limitez l'accès par domaine dans Google Cloud

### 🛡️ Recommandations :
1. **Restreignez par domaine** dans Google Cloud Console
2. **Activez les quotas** pour limiter les abus
3. **Ne partagez pas** le lien publiquement
4. Pour une **vraie production**, utilisez OAuth2 (plus complexe)

### 📊 Quotas Google Sheets API (Gratuit) :
- **Lecture** : 100 requêtes par 100 secondes
- **Écriture** : 100 requêtes par 100 secondes
- Largement suffisant pour une équipe de 50 personnes !

---

## 🚨 TROUBLESHOOTING

### Erreur : "API key not valid"
→ Vérifiez que vous avez bien activé Google Sheets API
→ Attendez 2-3 minutes après avoir créé la clé

### Erreur : "The caller does not have permission"
→ Vérifiez que le Sheet est en accès "Tous les utilisateurs peuvent modifier"
→ Vérifiez le SHEET_ID dans le code

### Les scores n'apparaissent pas
→ Ouvrez la console (F12) pour voir les erreurs
→ Vérifiez que les noms de colonnes sont exacts

### Scores en double
→ Normal si quelqu'un joue plusieurs fois
→ Le code garde automatiquement le meilleur score de chaque joueur

---

## 📈 FONCTIONNALITÉS BONUS AVEC SHEETS

### Voir les stats en direct :
Votre Google Sheet devient un **dashboard en temps réel** !

Vous pouvez ajouter dans Sheet :
- Graphiques d'évolution
- Stats par équipe
- Moyenne des temps
- Joueurs les plus actifs

### Exemple de formules Google Sheets :

**Meilleur temps :**
```
=MIN(C:C)
```

**Joueur avec le meilleur score :**
```
=INDEX(B:B, MATCH(MAX(E:E), E:E, 0))
```

**Nombre de parties jouées :**
```
=COUNTA(A:A)-1
```

---

## 🎉 RÉSULTAT FINAL

### Avant (localStorage) :
```
👤 Marie (son ordi)       👤 Jean (son ordi)
   Ses scores uniquement     Ses scores uniquement
```

### Après (Google Sheets) :
```
        ☁️ GOOGLE SHEETS
              ↙️  ↘️
   👤 Marie          👤 Jean
   Voit TOUS         Voit TOUS
   les scores        les scores
```

---

## 🎯 PROCHAINES ÉTAPES

Une fois configuré, vous pouvez :
1. 📧 Envoyer le lien du jeu à toute l'équipe
2. 📊 Projeter le Google Sheet sur un écran lors des réunions
3. 🏆 Organiser des tournois avec suivi en temps réel
4. 📈 Analyser les données dans Google Sheets

**PRÊT POUR LE SETUP ? Je vais créer le code maintenant !** 🚀
