# 🎮 PUZZLE TEAM - README

## 📦 FICHIERS LIVRÉS

Vous avez reçu **3 fichiers** :

### 1. `index_ameliore.html` ⭐ RECOMMANDÉ
**Le puzzle complet avec toutes les améliorations**
- 🏆 Leaderboard (classement local)
- 🏅 Système de badges
- 📊 Analytics détaillées
- 🎉 Effets visuels (confettis)
- 📢 Partage facile

**Utilisation :**
- Renommez en `index.html`
- Ouvrez dans un navigateur
- Chaque personne voit ses propres scores

---

### 2. `integration_google_sheets.js` 🌐 AVANCÉ
**Code pour activer le classement partagé**

**À utiliser si vous voulez que TOUT LE MONDE voie les scores de TOUT LE MONDE**

**Étapes :**
1. Lisez `GUIDE_GOOGLE_SHEETS.md` (IMPORTANT !)
2. Suivez les instructions pour créer votre Google Sheet
3. Obtenez votre clé API
4. Copiez le code de `integration_google_sheets.js`
5. Collez-le dans `index_ameliore.html` avant `</script>`
6. Modifiez la configuration avec vos clés

---

### 3. `GUIDE_GOOGLE_SHEETS.md` 📖
**Guide étape par étape pour Google Sheets**

Contient :
- Comment créer le Google Sheet
- Comment obtenir la clé API
- Comment configurer
- Troubleshooting

---

## 🚀 DÉMARRAGE RAPIDE

### Option A : Local (Simple) ✅

1. Ouvrez `index_ameliore.html`
2. C'est tout ! 🎉

**Résultat :** Chaque joueur voit ses propres 10 meilleurs scores

---

### Option B : Google Sheets (Partagé) 🌐

1. Suivez `GUIDE_GOOGLE_SHEETS.md`
2. Configurez votre Sheet + API
3. Intégrez le code
4. Partagez le fichier à votre équipe

**Résultat :** TOUS les joueurs voient le même classement global

---

## 🎯 QUELLE OPTION CHOISIR ?

### Choisissez LOCAL si :
- ✅ Vous voulez tester rapidement
- ✅ C'est pour usage personnel
- ✅ Vous ne voulez pas configurer d'API
- ✅ Vous avez moins de 5 joueurs

### Choisissez GOOGLE SHEETS si :
- ✅ Vous avez une équipe (5+ personnes)
- ✅ Vous voulez une vraie compétition
- ✅ Vous êtes OK pour 30 min de setup
- ✅ Vous voulez voir les stats en temps réel

---

## 🏆 FONCTIONNALITÉS

### Leaderboard
- Top 10 des meilleurs scores
- Classement par temps + mouvements
- Médailles 🥇🥈🥉
- Badge "RECORD!" 

### Badges (5 à débloquer)
- 🎯 Débutant - Première résolution
- ⚡ Éclair - Moins de 2 minutes
- 🎯 Efficace - Moins de 50 mouvements
- 💎 Parfait - Score optimal
- 👑 Légende - Top 1

### Analytics
- Score d'efficacité (%)
- Évaluation de vitesse
- Type de stratégie
- Nombre de parties

### Effets Visuels
- 🎉 Confettis sur les records
- ✨ Animations de badges
- 💫 Barres de progression

### Partage
- 📋 Copie rapide pour Slack/Teams
- 🎨 Format optimisé

---

## 💾 DONNÉES

### Mode Local :
```
Stockage : localStorage du navigateur
Localisation : Ordinateur de chaque joueur
Persistance : Tant que le cache n'est pas vidé
```

### Mode Google Sheets :
```
Stockage : Google Sheets
Localisation : Cloud Google
Persistance : Permanent
Accès : Tous les joueurs avec le lien
```

---

## 🐛 PROBLÈMES COURANTS

### "Le leaderboard ne s'affiche pas"
→ Ouvrez la console (F12) pour voir les erreurs
→ Vérifiez que le JavaScript n'est pas bloqué

### "Je ne vois pas les scores des autres" (Mode Local)
→ Normal ! En mode local, chacun voit ses propres scores
→ Utilisez Google Sheets pour un classement partagé

### "Google Sheets ne fonctionne pas"
→ Vérifiez votre clé API
→ Vérifiez que le Sheet est en accès "Tout le monde peut modifier"
→ Attendez 2-3 minutes après avoir créé la clé
→ Consultez `GUIDE_GOOGLE_SHEETS.md`

---

## 📞 SUPPORT

### Debug :
Ouvrez la console (F12) et cherchez :
```
✅ Connected to Google Sheets!        (Sheets activé)
💾 Mode: Local Storage                (Mode local)
🚀 Améliorations chargées...          (Tout fonctionne)
```

### Reset des données locales :
Console (F12) :
```javascript
localStorage.clear();
location.reload();
```

---

## 🎉 BONNE CHANCE !

Votre puzzle est maintenant **10x plus engageant** !

Les gens vont :
- ✅ Rejouer pour améliorer leur score
- ✅ Se défier entre collègues
- ✅ Parler du jeu dans l'équipe
- ✅ Créer une compétition saine

**Amusez-vous bien ! 🎮🚀**

---

## 📊 STATISTIQUES DU SYSTÈME

- 🏆 Top 10 scores
- 🏅 5 badges
- 📊 4 métriques d'analytics
- 🎉 50 confettis par record
- ⚡ Chargement < 1 seconde
- 💾 < 5KB de données stockées
