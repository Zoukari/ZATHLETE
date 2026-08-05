# ZATHLETE

Application de suivi fitness et nutrition — **95 kg → 80 kg**

🔗 **[zoukari.github.io/ZATHLETE](https://zoukari.github.io/ZATHLETE)**

---

## 🔐 Accès
- **Code PIN par défaut : `2709`**
- Réglages : **5 taps sur le logo** → changement du PIN, objectifs, export, reset

---

## 📱 Écrans

### Accueil
Citation du jour · Niveau et XP · Anneau de poids vers 80 kg · Protéines, eau, calories · Séance du jour · Hydratation rapide · Raccourcis
**Bouton ↺ en haut à droite** : réinitialise toute la journée (repas, eau, séries, pesée, sommeil).

### Sport
Programme 7 jours — Push · Hyrox · Pull · Calisthenics · **Repos vendredi** · Jambes · Hyrox léger
6 exercices par séance avec séries × reps × charge et conseil technique. Chaque série se coche individuellement.

### Nutrition
- **Composeur de repas** : 6 catégories (protéines, féculents, légumes, fruits, matières grasses, boissons), ~80 aliments, quantités ajustables, calcul automatique des protéines et calories
- **Aliment inconnu** : tu écris ce que c'est, l'app estime
- **Coller de ChatGPT** : colle l'analyse d'une photo, l'app lit les valeurs
- Répartition d'assiette adaptée au type de séance du jour
- Repas libre (1 par semaine, sans culpabilisation)
- Gestion des envies (faim réelle vs envie)
- Mode jeûne avec ordre de rupture
- Fiches compléments (créatine, whey, spiruline, oméga-3…)

### Poids
- **Chaque jour** : poids seul, courbe 14 jours, moyenne 7 jours
- **Dimanche · complet** : pesée officielle, 6 mensurations, tension, photos, note
- Alertes automatiques : perte trop rapide, plateau détecté
- Suivi de la tension artérielle
- Phases 1 → 2 → 3

### Progrès
- **Score** : Athlete Score /100 avec détail par catégorie, bilan du jour
- **Trophées** : 24 trophées à débloquer
- **Rapports** : Jour · Semaine · Mois · Comparer deux semaines · Rapport médical
- Bouton **Copier pour ChatGPT** avec prompt complet

---

## 🏗️ Technique
HTML/CSS/JS vanilla · Supabase (sync) · LocalStorage (offline first) · PWA installable

Service worker en **network-first** : l'app se met toujours à jour au lancement.

---
*ZATHLETE 2026*
