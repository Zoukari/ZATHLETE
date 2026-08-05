/* ═══════════════════════════════════════════
   ZATHLETE — Objectifs dynamiques & plan du jour
   ═══════════════════════════════════════════ */

/* ─── 1. BESOINS QUI ÉVOLUENT ───
   Les calories ne sont pas un chiffre fixe : elles suivent le poids
   du moment, le type de séance du jour et la phase du programme.   */

const ACT = {                     // multiplicateur d'activité par type de séance
  'Repos':1.35,
  'Push':1.55, 'Pull':1.55, 'Calisthenics':1.55,
  'Jambes':1.70, 'Hyrox':1.72, 'Hyrox léger':1.48
};

function bmr(kg, cm, age){        // Mifflin-St Jeor, homme
  return 10*kg + 6.25*cm - 5*age + 5;
}

/* Déficit adapté à la phase : plus on approche de l'objectif,
   plus il s'allège pour protéger le muscle et les performances. */
function deficitPct(kg){
  if(kg>=90) return .19;          // Phase 1
  if(kg>=85) return .16;          // Phase 2
  return .12;                     // Phase 3 — finition
}

function dailyTargets(kg, type, profile){
  const P = profile || {};
  const cm  = P.cm  || 171;
  const age = P.age || 35;
  const w   = kg || 95;

  const tdee = bmr(w, cm, age) * (ACT[type] ?? 1.55);
  const kcal = Math.round((tdee * (1 - deficitPct(w))) / 10) * 10;

  // Protéines calées sur le poids cible intermédiaire, pas sur le poids brut
  const anchor = w >= 90 ? 88 : w >= 85 ? 84 : 80;
  let prot = Math.round((1.9 * anchor) / 5) * 5;
  prot = Math.min(175, Math.max(145, prot));

  // Eau : base + supplément les jours exigeants (et climat chaud de Djibouti)
  const hard = type==='Jambes' || type.startsWith('Hyrox');
  const eau = type==='Repos' ? 2.5 : hard ? 3.2 : 2.8;

  return {kcal, prot, eau: Math.round(eau*10)/10, tdee: Math.round(tdee), type};
}

/* Explication lisible du chiffre du jour */
function targetsWhy(kg, type){
  const hard = type==='Jambes' || type.startsWith('Hyrox');
  if(type==='Repos')
    return 'Jour de repos : dépense plus faible, donc apport réduit. Les protéines, elles, ne bougent pas.';
  if(hard)
    return 'Jour ' + type + ' : séance coûteuse, tu manges davantage pour tenir l\u2019effort et récupérer.';
  return 'Journée d\u2019entraînement standard.';
}

/* ─── 2. PLAN DU JOUR ───
   L'app ne se contente pas d'un total : elle dit quoi manger,
   à quel repas, en quelle quantité.                            */

/* Trames de repas. Chaque entrée pioche dans FOODS.
   Les quantités sont ajustées ensuite pour coller à la cible.  */
const PLATES = {
  petitdej: [
    {prot:'Œuf entier', fec:'Avoine',        leg:null,           fru:'Banane',   gras:null},
    {prot:'Yaourt nature', fec:'Pain complet', leg:null,         fru:'Orange',   gras:'Amandes'},
    {prot:'Fromage blanc 0%', fec:'Avoine',  leg:null,           fru:'Fraises',  gras:'Graines de chia'},
  ],
  principal: [
    {prot:'Blanc de poulet', fec:'Riz cuit',        leg:'Salade verte',   fru:'Pastèque', gras:'Huile d’olive'},
    {prot:'Poisson blanc',   fec:'Pommes de terre', leg:'Haricots verts', fru:'Melon',    gras:'Huile d’olive'},
    {prot:'Steak maigre',    fec:'Semoule / couscous', leg:'Salade verte',fru:'Orange',   gras:'Huile d’olive'},
    {prot:'Thon frais',      fec:'Patate douce',    leg:'Brocoli',        fru:'Mangue',   gras:'Avocat'},
    {prot:'Cuisse de poulet',fec:'Soupe de lentilles', leg:'Salade verte',fru:'Papaye',   gras:null},
    {prot:'Crevettes',       fec:'Riz cuit',        leg:'Courgette',      fru:'Ananas',   gras:'Huile d’olive'},
    {prot:'Poisson blanc',   fec:'Lentilles cuites',leg:'Épinards',       fru:'Pastèque', gras:'Huile d’olive'},
  ],
  collation: [
    {prot:'Yaourt nature', fec:null, leg:null, fru:'Banane', gras:'Amandes'},
    {prot:'Thon en boîte', fec:null, leg:null, fru:null,     gras:'Noix'},
    {prot:'Œuf entier',    fec:null, leg:null, fru:'Pomme',  gras:null},
    {prot:'Skyr',          fec:null, leg:null, fru:'Fraises',gras:'Graines de courge'},
  ],
  rupture: [
    {prot:'Yaourt nature', fec:null, leg:null, fru:'Dattes', gras:null},
    {prot:null,            fec:null, leg:null, fru:'Dattes', gras:null},
  ]
};

function findFood(name){
  for(const k in FOODS){
    const f = FOODS[k].items.find(x => x.n === name);
    if(f) return {...f, cat:k};
  }
  return null;
}

/* Construit un repas concret qui vise une cible kcal + protéines.
   On ajuste d'abord la protéine, puis le féculent sur les calories. */
function buildPlate(tpl, tKcal, tProt){
  const out = [];
  const add = (name, mult) => {
    const f = findFood(name);
    if(!f) return;
    const m = Math.max(.5, Math.round(mult*2)/2);
    out.push({n:f.n, u:f.u, q:f.q, p:f.p, k:f.k, m, cat:f.cat});
  };

  // Légume et fruit d'abord : quantités fixes, faible impact calorique
  if(tpl.leg)  add(tpl.leg, 1);
  if(tpl.fru)  add(tpl.fru, 1);
  if(tpl.gras) add(tpl.gras, 1);

  // Protéine ajustée pour atteindre la cible protéique du repas
  if(tpl.prot){
    const f = findFood(tpl.prot);
    if(f){
      const dejaP = out.reduce((a,b)=>a+b.p*b.m, 0);
      add(tpl.prot, Math.max(.5, (tProt - dejaP) / f.p));
    }
  }

  // Féculent ajusté pour compléter les calories restantes
  if(tpl.fec){
    const f = findFood(tpl.fec);
    if(f){
      const dejaK = out.reduce((a,b)=>a+b.k*b.m, 0);
      add(tpl.fec, Math.max(.5, (tKcal - dejaK) / f.k));
    }
  }

  const P = Math.round(out.reduce((a,b)=>a+b.p*b.m, 0));
  const K = Math.round(out.reduce((a,b)=>a+b.k*b.m, 0));
  return {items:out, prot:P, kcal:K};
}

/* Répartition du jour.
   Mode jeûne : un seul vrai repas, précédé d'une rupture légère.
   Sinon : la préférence de Zouk, deux repas + une collation.      */
function dayPlan(targets, fasting, seed){
  const s = seed || 0;
  const pick = (arr, off) => arr[(s + (off||0)) % arr.length];

  if(fasting){
    return [
      {nom:'Rupture du jeûne', heure:'au coucher du soleil', share:.12,
       tpl:pick(PLATES.rupture), note:'Eau d\u2019abord, puis les dattes. On ne se jette pas sur le plat principal.'},
      {nom:'Repas principal', heure:'30 à 45 min après la rupture', share:.68,
       tpl:pick(PLATES.principal), note:'Le vrai repas de la journée. Protéines, légumes, féculents selon la séance.'},
      {nom:'Collation avant le coucher', heure:'2 h avant de dormir', share:.20,
       tpl:pick(PLATES.collation, 1), note:'Facultative, mais elle aide à atteindre les protéines du jour.'}
    ];
  }
  return [
    {nom:'Déjeuner', heure:'12 h – 14 h', share:.42,
     tpl:pick(PLATES.principal), note:'Le repas le plus complet de ta journée.'},
    {nom:'Collation', heure:'16 h – 17 h', share:.18,
     tpl:pick(PLATES.collation), note:'Elle évite d\u2019arriver au dîner avec une faim à 9/10.'},
    {nom:'Dîner', heure:'19 h – 21 h', share:.40,
     tpl:pick(PLATES.principal, 3), note:'Un peu plus léger en féculents si tu ne t\u2019entraînes pas le soir.'}
  ];
}

/* Assemble le plan complet, prêt à afficher */
function makePlan(targets, fasting, seed){
  return dayPlan(targets, fasting, seed).map(r => {
    const built = buildPlate(r.tpl, targets.kcal*r.share, targets.prot*r.share);
    return {...r, ...built};
  });
}
