# ZATHLETE — PROJECT ATHLETE

> Application mobile de suivi fitness et nutrition — Zouk | 95kg → 80kg

## 🔐 Accès
- **PIN par défaut :** `2709`
- Pour changer le PIN : taper 5x sur le logo ZATHLETE → Admin → Changer le PIN

## ⚡ Features

### Dashboard
- Poids actuel + progression vers 80 kg
- Protéines & eau du jour
- Séance du jour (programme Push/Pull/Jambes/Hyrox/Calisthenics)
- Boutons rapides eau (+250ml / +500ml / +750ml)

### Sport
- Programme 7 jours : Push · Hyrox · Pull · Calisthenics · **Repos Vendredi** · Jambes · Hyrox léger
- Détail exercices par séance
- Validation séance (sync Supabase)

### Nutrition
- Suivi protéines / eau / calories
- Ajout repas (méthode libre)
- Favoris pré-enregistrés (Repas Zouk 01-03 + collation)
- Repas libre (pas "cheat meal")
- Hydratation avec boutons rapides

### Poids
- Enregistrement + historique
- Moyenne 7 jours
- Mini graphique progression
- Phases 1→2→3 (95→80 kg)
- Progression en % vers objectif

### Score & Rapports
- **Athlete Score /100** avec statut (BEAST / SOLID / PROGRESSING)
- Rapport quotidien automatique
- Rapport hebdomadaire complet
- **Bouton COPIER POUR CHATGPT** (prompt complet prêt à coller)

### Admin (5x tap sur logo)
- Changement PIN
- Objectifs nutritionnels personnalisables
- Export données JSON
- Test connexion Supabase

## 🗄️ Supabase
Tables utilisées : `weight`, `meals`, `water`, `workouts`, `sleep`

## 📱 PWA
Installable sur iPhone/Android (Ajouter à l'écran d'accueil)

## 🏗️ Stack
- HTML/CSS/JS vanilla (zéro dépendance)
- Supabase (sync données)
- LocalStorage (offline first)
- Service Worker (PWA)

## 📅 Programme
| Jour | Séance |
|------|--------|
| Lundi | Push (Développé couché, militaire, triceps...) |
| Mardi | Hyrox (Course, Sled, Farmer carry...) |
| Mercredi | Pull (Tirage, Rowing, Biceps...) |
| Jeudi | Calisthenics (Tractions, Dips...) |
| **Vendredi** | **🕌 REPOS OBLIGATOIRE** |
| Samedi | Jambes (Squat, Presse, Fentes...) |
| Dimanche | Hyrox léger |

---
*Built for Zouk · ZATHLETE 2026*
