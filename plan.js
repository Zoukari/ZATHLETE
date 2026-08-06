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

/* ═══════════════════════════════════════════
   REMPLACEMENT D'UN ALIMENT
   On garde l'apport du plat d'origine et on
   recalcule la quantité du remplaçant.
   ═══════════════════════════════════════════ */

/* Aliments enregistrés par l'utilisateur, injectés dans toutes les listes */
function myFoods(){
  try{ return JSON.parse(localStorage.getItem('za_myfoods')) || []; }catch{ return []; }
}
function saveMyFood(f){
  const l = myFoods();
  if(l.some(x => x.n.toLowerCase() === f.n.toLowerCase())) return false;
  l.push(f);
  localStorage.setItem('za_myfoods', JSON.stringify(l));
  return true;
}
function delMyFood(name){
  localStorage.setItem('za_myfoods',
    JSON.stringify(myFoods().filter(x => x.n !== name)));
}

/* Toutes les catégories, base + personnels */
function allCats(){
  const out = {};
  for(const k in FOODS) out[k] = {...FOODS[k], items:[...FOODS[k].items]};
  myFoods().forEach(f => {
    const c = out[f.cat] ? f.cat : 'prot';
    out[c].items.unshift({...f, mine:true});
  });
  return out;
}

/* Recherche souple : base + aliments personnels */
function searchFood(q){
  const s = q.trim().toLowerCase();
  if(s.length < 2) return [];
  const out = [];
  myFoods().forEach(f => {
    const n = f.n.toLowerCase();
    if(n.includes(s)) out.push({...f, mine:true, exact:n.startsWith(s)});
  });
  for(const k in FOODS){
    FOODS[k].items.forEach(f => {
      const n = f.n.toLowerCase();
      if(n.includes(s)) out.push({...f, cat:k, exact:n.startsWith(s)});
    });
  }
  return out.sort((a,b) =>
    ((b.mine?2:0)+(b.exact?1:0)) - ((a.mine?2:0)+(a.exact?1:0))).slice(0, 8);
}

/* Quantité du remplaçant pour un apport équivalent.
   Sur une protéine on aligne les protéines, sinon les calories. */
function swapQty(oldItem, newFood){
  const oldP = oldItem.p * oldItem.m;
  const oldK = oldItem.k * oldItem.m;
  let m;
  if(oldItem.cat === 'prot' && newFood.p > 0)      m = oldP / newFood.p;
  else if(newFood.k > 0)                            m = oldK / newFood.k;
  else                                              m = 1;
  m = Math.max(.5, Math.round(m * 2) / 2);
  return {
    n:newFood.n, u:newFood.u, q:newFood.q,
    p:newFood.p, k:newFood.k, cat:newFood.cat, m
  };
}

/* Estimation pour un aliment absent de la base */
function guessFoodItem(txt){
  let hit = null;
  for(const [re, v] of GUESS){ if(re.test(txt)){ hit = v; break; } }
  if(!hit) hit = {p:20, k:400};
  return {n:txt, u:'portion', q:1, p:hit.p, k:hit.k, cat:'prot'};
}

/* ═══════════════════════════════════════════
   COMPOSITION CORPORELLE
   À partir des mensurations déjà saisies.
   ═══════════════════════════════════════════ */

/* ─── MASSE GRASSE : trois méthodes croisées ───
   Chaque mensuration nourrit au moins un calcul.        */

/* 1. US Navy — tour de taille, tour de cou, hauteur */
function bfNavy(taille, cou, hauteur){
  if(!taille || !cou || !hauteur) return null;
  const diff = taille - cou;
  if(diff <= 0) return null;
  const bf = 495 / (1.0324 - 0.19077*Math.log10(diff) + 0.15456*Math.log10(hauteur)) - 450;
  return (isFinite(bf) && bf > 3 && bf < 60) ? Math.round(bf*10)/10 : null;
}

/* 2. Covert Bailey — hanches, cuisse, mollet, avant-bras (en pouces) */
function bfBailey(hanches, cuisse, mollet, avantbras, age){
  if(!hanches || !cuisse || !mollet || !avantbras) return null;
  const I = c => c / 2.54;
  const bf = (age >= 30)
    ? I(hanches) + I(cuisse) - 2*I(mollet) - I(avantbras)
    : I(hanches) + 0.8*I(cuisse) - 2*I(mollet) - I(avantbras);
  return (isFinite(bf) && bf > 3 && bf < 60) ? Math.round(bf*10)/10 : null;
}

/* 3. Deurenberg — indice de masse corporelle et âge */
function bfDeurenberg(kg, hauteur, age){
  if(!kg || !hauteur) return null;
  const imc = kg / Math.pow(hauteur/100, 2);
  const bf = 1.20*imc + 0.23*(age||35) - 16.2;
  return (isFinite(bf) && bf > 3 && bf < 60) ? Math.round(bf*10)/10 : null;
}

/* Consensus pondéré. US Navy pèse le plus, Deurenberg le moins :
   il surestime chez les personnes qui s'entraînent.        */
function bfConsensus(kg, m, cm, age){
  const navy = bfNavy(+m.taille, +m.cou, cm);
  const bail = bfBailey(+m.hanches, +m.cuisse, +m.mollet, +m.avantbras, age);
  const deur = bfDeurenberg(kg, cm, age);
  const parts = [];
  if(navy !== null) parts.push({n:'US Navy',        v:navy, w:5, s:'taille · cou'});
  if(bail !== null) parts.push({n:'Covert Bailey',  v:bail, w:3, s:'hanches · cuisse · mollet · avant-bras'});
  if(deur !== null) parts.push({n:'Deurenberg',     v:deur, w:2, s:'poids · taille · âge'});
  if(!parts.length) return null;
  const tw = parts.reduce((a,b)=>a+b.w, 0);
  const bf = Math.round(parts.reduce((a,b)=>a+b.v*b.w, 0) / tw * 10) / 10;
  const spread = parts.length > 1
    ? Math.round((Math.max(...parts.map(x=>x.v)) - Math.min(...parts.map(x=>x.v)))*10)/10
    : 0;
  return {bf, parts, spread};
}

/* Eau corporelle totale — formule de Watson (homme), en litres. */
function totalBodyWater(kg, hauteur, age){
  if(!kg || !hauteur) return null;
  const tbw = 2.447 - 0.09156*(age||35) + 0.1074*hauteur + 0.3362*kg;
  return Math.round(tbw * 10) / 10;
}

/* Muscle squelettique — formule de Lee, à partir des circonférences
   de bras, cuisse et mollet. Sans plis cutanés elle surestime :
   on la croise avec la masse maigre pour donner une fourchette. */
function muscleLee(hauteur, bras, cuisse, mollet, age){
  if(!bras || !cuisse || !mollet) return null;
  const h = hauteur/100;
  const sm = h*(0.00744*bras*bras + 0.00088*cuisse*cuisse + 0.00441*mollet*mollet)
             + 2.4 - 0.048*(age||35) + 7.8;
  return (isFinite(sm) && sm > 10 && sm < 70) ? Math.round(sm*10)/10 : null;
}

/* Composition complète */
function bodyComp(kg, mensu, profile){
  const cm  = (profile && profile.cm)  || 171;
  const age = (profile && profile.age) || 35;
  const con = bfConsensus(kg, mensu, cm, age);
  if(!con || !kg) return null;
  const bf = con.bf;

  const fatKg  = Math.round(kg * bf / 100 * 10) / 10;
  const leanKg = Math.round((kg - fatKg) * 10) / 10;
  const water  = totalBodyWater(kg, cm, age);
  const bone   = Math.round(kg * 0.045 * 10) / 10;

  const lee  = muscleLee(cm, +mensu.bras, +mensu.cuisse, +mensu.mollet, age);
  const base = Math.round(leanKg * 0.53 * 10) / 10;
  const muscle = lee !== null ? Math.round((lee + base)/2 * 10)/10 : base;
  const range  = lee !== null
    ? [Math.min(lee, base), Math.max(lee, base)].map(x => Math.round(x*10)/10)
    : null;

  return {bf, fatKg, leanKg, water, bone, muscle, range,
          methods: con.parts, spread: con.spread, lee,
          waterPct: water ? Math.round(water/kg*1000)/10 : null};
}

/* ─── Indices tirés des mensurations ───
   Chaque mesure sert à quelque chose de concret.        */
function bodyIndices(m, hauteur, kg){
  const h = hauteur || 171;
  const out = [];

  // Tour de taille rapporté à la taille : le meilleur prédicteur simple
  if(m.taille){
    const r = +m.taille / h;
    const s = r < 0.43 ? ['Bas','r'] : r < 0.5 ? ['Bon','c'] : r < 0.58 ? ['À surveiller','i'] : ['Élevé','w'];
    out.push({k:'Taille ÷ hauteur', v:r.toFixed(2), s:s[0], t:s[1],
      d:'Sous 0,50 c\'est la zone visée. C\'est le rapport le plus fiable pour le risque cardiovasculaire.'});
  }

  // Taille sur hanches : répartition de la graisse
  if(m.taille && m.hanches){
    const r = +m.taille / +m.hanches;
    const s = r < 0.90 ? ['Bon','c'] : r < 0.96 ? ['Moyen','i'] : ['Élevé','w'];
    out.push({k:'Taille ÷ hanches', v:r.toFixed(2), s:s[0], t:s[1],
      d:'Sous 0,90 chez l\'homme. Mesure la graisse abdominale, la plus liée au risque métabolique.'});
  }

  // Épaules/poitrine sur taille : la silhouette en V
  if(m.poitrine && m.taille){
    const r = +m.poitrine / +m.taille;
    const s = r > 1.15 ? ['Athlétique','c'] : r > 1.05 ? ['En progression','i'] : ['À construire','w'];
    out.push({k:'Poitrine ÷ taille', v:r.toFixed(2), s:s[0], t:s[1],
      d:'Le rapport qui donne la silhouette en V. Il monte quand la taille descend et que le haut du corps tient.'});
  }

  // Bras + cuisse : témoin du maintien musculaire
  if(m.bras && m.cuisse){
    out.push({k:'Bras + cuisse', v:(+m.bras + +m.cuisse).toFixed(1)+' cm', s:'Repère', t:'i',
      d:'Ce total doit rester stable ou monter pendant que ton poids baisse. S\'il chute, tu perds du muscle.'});
  }

  // Mollet : entre dans le calcul du muscle et dans Bailey
  if(m.mollet){
    const r = +m.mollet / (+m.cuisse || 1);
    out.push({k:'Mollet ÷ cuisse', v:r.toFixed(2), s:'Équilibre', t:'i',
      d:'Le mollet bouge peu avec la graisse : c\'est pour ça qu\'il sert de référence dans le calcul de ta masse grasse.'});
  }

  // Cou : entre dans le calcul de la masse grasse
  if(m.cou){
    out.push({k:'Tour de cou', v:m.cou+' cm', s:'Calcul', t:'i',
      d:'Combiné au tour de taille, il donne ta masse grasse par la méthode US Navy.'});
  }

  return out;
}

/* Lecture du pourcentage de masse grasse, homme adulte */
function bfLabel(bf){
  if(bf < 8)  return ['Très bas',            'r'];
  if(bf < 14) return ['Athlétique',          'c'];
  if(bf < 18) return ['En forme',            'c'];
  if(bf < 25) return ['Moyenne',             'i'];
  return ['Au-dessus de la moyenne',         'w'];
}
