/* ═══════════════════════════════════════════
   ZATHLETE — Variantes d'exercices
   « Sans machine »  : haltères, barre, élastique
   « Mode voyage »   : rien, ou une serviette et une chaise
   Trois propositions par exercice, on en choisit une.
   ═══════════════════════════════════════════ */

const ALTS = {
  'Développé couché':{
    nomachine:[
      {n:'Développé haltères au sol',s:4,r:'8-10',kg:20,w:'Deux haltères'},
      {n:'Pompes lestées',s:4,r:'10-15',kg:0,w:'Sac à dos chargé'},
      {n:'Développé élastique debout',s:4,r:'12-15',kg:0,w:'Élastique'}],
    travel:[
      {n:'Pompes classiques',s:4,r:'15-20',kg:0,w:'Rien'},
      {n:'Pompes déclinées pieds surélevés',s:4,r:'10-15',kg:0,w:'Une chaise'},
      {n:'Pompes diamant',s:4,r:'8-12',kg:0,w:'Rien'}]},

  'Développé militaire':{
    nomachine:[
      {n:'Développé haltères debout',s:4,r:'8-10',kg:14,w:'Deux haltères'},
      {n:'Développé élastique',s:4,r:'12-15',kg:0,w:'Élastique'},
      {n:'Push press bidon d\u2019eau',s:4,r:'10-12',kg:0,w:'Deux bidons'}],
    travel:[
      {n:'Pike push-up',s:4,r:'8-12',kg:0,w:'Rien'},
      {n:'Pompes en appui mural',s:3,r:'6-10',kg:0,w:'Un mur'},
      {n:'Élévations frontales serviette',s:4,r:'15',kg:0,w:'Une serviette'}]},

  'Écarté haltères incliné':{
    nomachine:[
      {n:'Écarté au sol',s:3,r:'12-15',kg:10,w:'Deux haltères'},
      {n:'Écarté élastique',s:3,r:'15',kg:0,w:'Élastique'},
      {n:'Pompes prise large',s:3,r:'15-20',kg:0,w:'Rien'}],
    travel:[
      {n:'Pompes prise large',s:3,r:'15-20',kg:0,w:'Rien'},
      {n:'Pompes glissées serviette',s:3,r:'10-12',kg:0,w:'Serviette sur sol lisse'},
      {n:'Pompes lentes 4 secondes',s:3,r:'8-10',kg:0,w:'Rien'}]},

  'Élévations latérales':{
    nomachine:[
      {n:'Élévations haltères',s:4,r:'12-15',kg:8,w:'Deux haltères'},
      {n:'Élévations élastique',s:4,r:'15-20',kg:0,w:'Élastique'},
      {n:'Élévations bouteilles d\u2019eau',s:4,r:'15-20',kg:0,w:'Deux bouteilles'}],
    travel:[
      {n:'Élévations bouteilles d\u2019eau',s:4,r:'15-20',kg:0,w:'Deux bouteilles'},
      {n:'Isométrie bras tendus',s:3,r:'30 s',kg:0,w:'Rien'},
      {n:'Cercles de bras lents',s:3,r:'20',kg:0,w:'Rien'}]},

  'Dips triceps':{
    nomachine:[
      {n:'Dips entre deux chaises',s:3,r:'10-15',kg:0,w:'Deux chaises'},
      {n:'Extension haltère nuque',s:3,r:'12',kg:12,w:'Un haltère'},
      {n:'Extension élastique',s:3,r:'15',kg:0,w:'Élastique'}],
    travel:[
      {n:'Dips sur chaise',s:3,r:'12-18',kg:0,w:'Une chaise'},
      {n:'Pompes diamant',s:3,r:'10-15',kg:0,w:'Rien'},
      {n:'Extension serviette isométrique',s:3,r:'20 s',kg:0,w:'Une serviette'}]},

  'Extension poulie haute':{
    nomachine:[
      {n:'Extension élastique',s:3,r:'15',kg:0,w:'Élastique'},
      {n:'Kickback haltère',s:3,r:'12-15',kg:8,w:'Un haltère'},
      {n:'Extension nuque haltère',s:3,r:'12',kg:12,w:'Un haltère'}],
    travel:[
      {n:'Pompes diamant',s:3,r:'10-15',kg:0,w:'Rien'},
      {n:'Dips sur chaise',s:3,r:'12-15',kg:0,w:'Une chaise'},
      {n:'Pompes mains reculées',s:3,r:'10-12',kg:0,w:'Rien'}]},

  'Tirage vertical':{
    nomachine:[
      {n:'Tractions à la barre',s:4,r:'6-10',kg:0,w:'Une barre'},
      {n:'Tirage élastique haut',s:4,r:'12-15',kg:0,w:'Élastique ancré haut'},
      {n:'Tractions australiennes',s:4,r:'12-15',kg:0,w:'Barre basse ou table'}],
    travel:[
      {n:'Tractions australiennes sous table',s:4,r:'12-15',kg:0,w:'Une table solide'},
      {n:'Tirage serviette porte',s:4,r:'12-15',kg:0,w:'Serviette + porte'},
      {n:'Superman au sol',s:4,r:'15',kg:0,w:'Rien'}]},

  'Rowing barre':{
    nomachine:[
      {n:'Rowing haltère un bras',s:4,r:'10-12',kg:22,w:'Un haltère'},
      {n:'Rowing élastique',s:4,r:'15',kg:0,w:'Élastique'},
      {n:'Tractions australiennes',s:4,r:'12-15',kg:0,w:'Barre basse'}],
    travel:[
      {n:'Tractions australiennes sous table',s:4,r:'12-15',kg:0,w:'Une table'},
      {n:'Rowing serviette isométrique',s:4,r:'20 s',kg:0,w:'Une serviette'},
      {n:'Superman avec tirage',s:4,r:'15',kg:0,w:'Rien'}]},

  'Tirage horizontal poulie':{
    nomachine:[
      {n:'Rowing élastique assis',s:3,r:'15',kg:0,w:'Élastique'},
      {n:'Rowing haltères buste penché',s:3,r:'12',kg:18,w:'Deux haltères'},
      {n:'Tractions australiennes',s:3,r:'12-15',kg:0,w:'Barre basse'}],
    travel:[
      {n:'Tractions australiennes sous table',s:3,r:'12-15',kg:0,w:'Une table'},
      {n:'Tirage serviette porte',s:3,r:'15',kg:0,w:'Serviette + porte'},
      {n:'Superman prolongé',s:3,r:'20 s',kg:0,w:'Rien'}]},

  'Face pull':{
    nomachine:[
      {n:'Face pull élastique',s:3,r:'15-20',kg:0,w:'Élastique'},
      {n:'Oiseau haltères',s:3,r:'15',kg:8,w:'Deux haltères'},
      {n:'Rotations externes élastique',s:3,r:'15',kg:0,w:'Élastique'}],
    travel:[
      {n:'Oiseau bouteilles d\u2019eau',s:3,r:'15-20',kg:0,w:'Deux bouteilles'},
      {n:'W au sol',s:3,r:'15',kg:0,w:'Rien'},
      {n:'Écartés serviette isométriques',s:3,r:'20 s',kg:0,w:'Une serviette'}]},

  'Curl barre EZ':{
    nomachine:[
      {n:'Curl haltères',s:3,r:'10-12',kg:12,w:'Deux haltères'},
      {n:'Curl élastique',s:3,r:'15',kg:0,w:'Élastique'},
      {n:'Curl bidon d\u2019eau',s:3,r:'15',kg:0,w:'Deux bidons'}],
    travel:[
      {n:'Curl serviette auto-résistance',s:3,r:'12',kg:0,w:'Une serviette'},
      {n:'Tractions supination',s:3,r:'6-10',kg:0,w:'Une barre'},
      {n:'Curl sac à dos chargé',s:3,r:'12-15',kg:0,w:'Un sac'}]},

  'Curl marteau':{
    nomachine:[
      {n:'Curl marteau haltères',s:3,r:'12',kg:12,w:'Deux haltères'},
      {n:'Curl marteau élastique',s:3,r:'15',kg:0,w:'Élastique'},
      {n:'Curl bidon prise neutre',s:3,r:'15',kg:0,w:'Deux bidons'}],
    travel:[
      {n:'Curl sac à dos prise neutre',s:3,r:'15',kg:0,w:'Un sac'},
      {n:'Suspension à la barre',s:3,r:'30 s',kg:0,w:'Une barre'},
      {n:'Curl serviette auto-résistance',s:3,r:'12',kg:0,w:'Une serviette'}]},

  'Squat barre':{
    nomachine:[
      {n:'Goblet squat haltère',s:4,r:'10-12',kg:24,w:'Un haltère'},
      {n:'Squat bulgare',s:4,r:'10/jambe',kg:16,w:'Une chaise + haltères'},
      {n:'Squat sauté',s:4,r:'15',kg:0,w:'Rien'}],
    travel:[
      {n:'Squat bulgare au poids du corps',s:4,r:'12/jambe',kg:0,w:'Une chaise'},
      {n:'Squat sauté',s:4,r:'15-20',kg:0,w:'Rien'},
      {n:'Squat pistolet assisté',s:4,r:'6/jambe',kg:0,w:'Un appui'}]},

  'Presse à cuisses':{
    nomachine:[
      {n:'Goblet squat',s:4,r:'12',kg:22,w:'Un haltère'},
      {n:'Fentes lestées',s:4,r:'12/jambe',kg:16,w:'Deux haltères'},
      {n:'Squat élastique',s:4,r:'15',kg:0,w:'Élastique'}],
    travel:[
      {n:'Squat au poids du corps lent',s:4,r:'20',kg:0,w:'Rien'},
      {n:'Chaise murale',s:4,r:'45 s',kg:0,w:'Un mur'},
      {n:'Squat sauté',s:4,r:'15',kg:0,w:'Rien'}]},

  'Fentes marchées':{
    nomachine:[
      {n:'Fentes haltères',s:3,r:'12/jambe',kg:16,w:'Deux haltères'},
      {n:'Fentes arrière sac à dos',s:3,r:'12/jambe',kg:0,w:'Un sac chargé'},
      {n:'Step-up sur banc',s:3,r:'12/jambe',kg:14,w:'Banc + haltères'}],
    travel:[
      {n:'Fentes marchées au poids du corps',s:3,r:'20/jambe',kg:0,w:'Rien'},
      {n:'Step-up sur chaise',s:3,r:'15/jambe',kg:0,w:'Une chaise'},
      {n:'Fentes sautées alternées',s:3,r:'12/jambe',kg:0,w:'Rien'}]},

  'Leg curl allongé':{
    nomachine:[
      {n:'Soulevé de terre jambes tendues',s:3,r:'12',kg:30,w:'Haltères ou barre'},
      {n:'Leg curl élastique',s:3,r:'15',kg:0,w:'Élastique'},
      {n:'Hip thrust au sol',s:3,r:'15',kg:20,w:'Un haltère'}],
    travel:[
      {n:'Nordic curl assisté',s:3,r:'6-8',kg:0,w:'Un appui pour les pieds'},
      {n:'Pont fessier une jambe',s:3,r:'15/jambe',kg:0,w:'Rien'},
      {n:'Glissés talons serviette',s:3,r:'12',kg:0,w:'Serviette sur sol lisse'}]},

  'Extension quadriceps':{
    nomachine:[
      {n:'Squat bulgare',s:3,r:'12/jambe',kg:14,w:'Chaise + haltères'},
      {n:'Extension élastique',s:3,r:'15',kg:0,w:'Élastique'},
      {n:'Chaise murale lestée',s:3,r:'45 s',kg:0,w:'Mur + sac'}],
    travel:[
      {n:'Chaise murale',s:3,r:'45-60 s',kg:0,w:'Un mur'},
      {n:'Squat pistolet assisté',s:3,r:'6/jambe',kg:0,w:'Un appui'},
      {n:'Squat sauté',s:3,r:'15',kg:0,w:'Rien'}]},

  'Mollets debout':{
    nomachine:[
      {n:'Mollets haltères',s:4,r:'20',kg:20,w:'Deux haltères'},
      {n:'Mollets une jambe',s:4,r:'15/jambe',kg:0,w:'Une marche'},
      {n:'Sauts à la corde',s:4,r:'60 s',kg:0,w:'Une corde'}],
    travel:[
      {n:'Mollets une jambe sur marche',s:4,r:'20/jambe',kg:0,w:'Une marche'},
      {n:'Sauts sur place',s:4,r:'40',kg:0,w:'Rien'},
      {n:'Marche sur pointes',s:4,r:'45 s',kg:0,w:'Rien'}]},

  'Sled push':{
    nomachine:[
      {n:'Fentes marchées lestées',s:4,r:'25 m',kg:16,w:'Deux haltères'},
      {n:'Poussée de mur en appui',s:4,r:'30 s',kg:0,w:'Un mur'},
      {n:'Squat sauté',s:4,r:'20',kg:0,w:'Rien'}],
    travel:[
      {n:'Sprint sur place genoux hauts',s:4,r:'30 s',kg:0,w:'Rien'},
      {n:'Fentes marchées',s:4,r:'25 m',kg:0,w:'Rien'},
      {n:'Bear crawl',s:4,r:'20 m',kg:0,w:'Rien'}]},

  'Farmer carry':{
    nomachine:[
      {n:'Port de bidons d\u2019eau',s:4,r:'40 m',kg:0,w:'Deux bidons'},
      {n:'Port de sacs de courses',s:4,r:'40 m',kg:0,w:'Deux sacs'},
      {n:'Suspension à la barre',s:4,r:'30 s',kg:0,w:'Une barre'}],
    travel:[
      {n:'Valise portée en marchant',s:4,r:'40 m',kg:0,w:'Ta valise'},
      {n:'Suspension à la barre',s:4,r:'30 s',kg:0,w:'Une barre'},
      {n:'Gainage latéral',s:4,r:'40 s/côté',kg:0,w:'Rien'}]},

  'Rameur':{
    nomachine:[
      {n:'Rowing élastique rapide',s:3,r:'60 s',kg:0,w:'Élastique'},
      {n:'Swing haltère',s:3,r:'20',kg:16,w:'Un haltère'},
      {n:'Burpees',s:3,r:'12',kg:0,w:'Rien'}],
    travel:[
      {n:'Burpees',s:3,r:'12-15',kg:0,w:'Rien'},
      {n:'Montées de genoux',s:3,r:'60 s',kg:0,w:'Rien'},
      {n:'Squat sauté enchaîné',s:3,r:'20',kg:0,w:'Rien'}]},

  'Wall balls':{
    nomachine:[
      {n:'Thruster haltères',s:4,r:'15',kg:14,w:'Deux haltères'},
      {n:'Squat + élévation bidon',s:4,r:'15',kg:0,w:'Un bidon'},
      {n:'Squat sauté bras tendus',s:4,r:'20',kg:0,w:'Rien'}],
    travel:[
      {n:'Squat sauté bras au-dessus',s:4,r:'20',kg:0,w:'Rien'},
      {n:'Thruster sac à dos',s:4,r:'15',kg:0,w:'Un sac chargé'},
      {n:'Burpees',s:4,r:'12',kg:0,w:'Rien'}]},

  'Tractions pronation':{
    nomachine:[
      {n:'Tractions australiennes',s:4,r:'12-15',kg:0,w:'Barre basse'},
      {n:'Tirage élastique haut',s:4,r:'15',kg:0,w:'Élastique ancré'},
      {n:'Rowing haltère un bras',s:4,r:'12',kg:20,w:'Un haltère'}],
    travel:[
      {n:'Tractions australiennes sous table',s:4,r:'12-15',kg:0,w:'Une table'},
      {n:'Tirage serviette porte',s:4,r:'15',kg:0,w:'Serviette + porte'},
      {n:'Superman avec tirage',s:4,r:'15',kg:0,w:'Rien'}]},

  'Dips barres parallèles':{
    nomachine:[
      {n:'Dips entre deux chaises',s:4,r:'10-15',kg:0,w:'Deux chaises'},
      {n:'Pompes déclinées',s:4,r:'12-15',kg:0,w:'Une chaise'},
      {n:'Développé haltères au sol',s:4,r:'10',kg:18,w:'Deux haltères'}],
    travel:[
      {n:'Dips sur le bord du lit',s:4,r:'15',kg:0,w:'Un lit ou une chaise'},
      {n:'Pompes déclinées',s:4,r:'12-15',kg:0,w:'Une chaise'},
      {n:'Pompes diamant',s:4,r:'10-12',kg:0,w:'Rien'}]},
};

/* Repli générique quand un exercice n'a pas de variante déclarée */
const ALT_FALLBACK = {
  nomachine:[
    {n:'Version haltères',s:4,r:'10-12',kg:14,w:'Deux haltères'},
    {n:'Version élastique',s:4,r:'15',kg:0,w:'Élastique'},
    {n:'Version au poids du corps',s:4,r:'15-20',kg:0,w:'Rien'}],
  travel:[
    {n:'Pompes',s:4,r:'15-20',kg:0,w:'Rien'},
    {n:'Squat au poids du corps',s:4,r:'20',kg:0,w:'Rien'},
    {n:'Gainage planche',s:4,r:'45 s',kg:0,w:'Rien'}]
};

function altsFor(name, mode){
  const a = ALTS[name] || ALT_FALLBACK;
  return (a[mode] || ALT_FALLBACK[mode]).slice(0,3);
}
