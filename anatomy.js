/* ═══════════════════════════════════════════
   ZATHLETE — Carte musculaire
   Silhouette face et dos, groupes surlignables
   ═══════════════════════════════════════════ */

/* Chaque groupe est un tracé indépendant, repéré par sa clé.
   Vue de face : viewBox 0 0 120 300                        */
const BODY_FRONT = {
  _base:`
    <ellipse cx="60" cy="18" rx="11" ry="13"/>
    <rect x="54" y="28" width="12" height="12" rx="5"/>
    <path d="M42 40h36c5 0 9 4 9 9l2 30c0 4-1 7-3 10l-2 29c0 5-4 9-9 9H45c-5 0-9-4-9-9l-2-29c-2-3-3-6-3-10l2-30c0-5 4-9 9-9z"/>
    <rect x="44" y="124" width="32" height="22" rx="8"/>
    <rect x="22" y="46" width="14" height="52" rx="7"/><rect x="84" y="46" width="14" height="52" rx="7"/>
    <rect x="23" y="96" width="12" height="44" rx="6"/><rect x="85" y="96" width="12" height="44" rx="6"/>
    <ellipse cx="29" cy="146" rx="6" ry="8"/><ellipse cx="91" cy="146" rx="6" ry="8"/>
    <rect x="43" y="144" width="16" height="60" rx="8"/><rect x="61" y="144" width="16" height="60" rx="8"/>
    <rect x="45" y="202" width="12" height="56" rx="6"/><rect x="63" y="202" width="12" height="56" rx="6"/>
    <ellipse cx="51" cy="262" rx="8" ry="5"/><ellipse cx="69" cy="262" rx="8" ry="5"/>`,
  trapezes:`<path d="M43 41h34c1 4 0 8-2 10H45c-2-2-3-6-2-10z"/>`,
  epaules:`<ellipse cx="29" cy="53" rx="8" ry="10"/><ellipse cx="91" cy="53" rx="8" ry="10"/>`,
  pectoraux:`<rect x="43" y="52" width="15" height="22" rx="6"/><rect x="62" y="52" width="15" height="22" rx="6"/>`,
  biceps:`<rect x="24" y="58" width="10" height="34" rx="5"/><rect x="86" y="58" width="10" height="34" rx="5"/>`,
  avantbras:`<rect x="24" y="98" width="10" height="38" rx="5"/><rect x="86" y="98" width="10" height="38" rx="5"/>`,
  abdos:`<rect x="52" y="78" width="16" height="42" rx="5"/>`,
  obliques:`<rect x="42" y="80" width="8" height="38" rx="4"/><rect x="70" y="80" width="8" height="38" rx="4"/>`,
  quadriceps:`<rect x="45" y="150" width="12" height="50" rx="6"/><rect x="63" y="150" width="12" height="50" rx="6"/>`,
  mollets:`<rect x="46" y="206" width="10" height="44" rx="5"/><rect x="64" y="206" width="10" height="44" rx="5"/>`,
};

const BODY_BACK = {
  _base:null,
  trapezes:`<path d="M43 41h34c2 6 1 16-2 24-5-3-10-4-15-4s-10 1-15 4c-3-8-4-18-2-24z"/>`,
  deltoides:`<ellipse cx="29" cy="53" rx="8" ry="10"/><ellipse cx="91" cy="53" rx="8" ry="10"/>`,
  dorsaux:`<path d="M44 66c5-3 10-4 16-4s11 1 16 4c1 10 0 20-3 28-4 5-8 8-13 8s-9-3-13-8c-3-8-4-18-3-28z"/>`,
  triceps:`<rect x="24" y="58" width="10" height="34" rx="5"/><rect x="86" y="58" width="10" height="34" rx="5"/>`,
  avantbras:`<rect x="24" y="98" width="10" height="38" rx="5"/><rect x="86" y="98" width="10" height="38" rx="5"/>`,
  lombaires:`<rect x="50" y="102" width="20" height="20" rx="5"/>`,
  fessiers:`<rect x="44" y="125" width="32" height="21" rx="9"/>`,
  ischios:`<rect x="45" y="150" width="12" height="50" rx="6"/><rect x="63" y="150" width="12" height="50" rx="6"/>`,
  mollets:`<rect x="46" y="206" width="10" height="44" rx="5"/><rect x="64" y="206" width="10" height="44" rx="5"/>`,
};

/* Libellés lisibles */
const MUSCLE_FR = {
  trapezes:'Trapèzes', epaules:'Épaules', deltoides:'Épaules arrière',
  pectoraux:'Pectoraux', biceps:'Biceps', triceps:'Triceps',
  avantbras:'Avant-bras', abdos:'Abdominaux', obliques:'Obliques',
  dorsaux:'Dos', lombaires:'Lombaires', fessiers:'Fessiers',
  quadriceps:'Quadriceps', ischios:'Ischio-jambiers', mollets:'Mollets'
};

/* Muscles sollicités par exercice.
   p = principaux (rouge vif) · s = secondaires (orange pâle) */
const EXMUSCLE = {
  'Développé couché':          {p:['pectoraux'],            s:['triceps','epaules']},
  'Développé militaire':       {p:['epaules'],              s:['triceps','abdos','trapezes']},
  'Écarté haltères incliné':   {p:['pectoraux'],            s:['epaules']},
  'Élévations latérales':      {p:['epaules'],              s:['trapezes']},
  'Dips triceps':              {p:['triceps'],              s:['pectoraux','epaules']},
  'Extension poulie haute':    {p:['triceps'],              s:[]},

  'Tirage vertical':           {p:['dorsaux'],              s:['biceps','avantbras']},
  'Rowing barre':              {p:['dorsaux','trapezes'],   s:['biceps','lombaires']},
  'Tirage horizontal poulie':  {p:['dorsaux','trapezes'],   s:['biceps']},
  'Face pull':                 {p:['deltoides','trapezes'], s:[]},
  'Curl barre EZ':             {p:['biceps'],               s:['avantbras']},
  'Curl marteau':              {p:['biceps','avantbras'],   s:[]},

  'Squat barre':               {p:['quadriceps','fessiers'],s:['ischios','lombaires','abdos']},
  'Presse à cuisses':          {p:['quadriceps'],           s:['fessiers']},
  'Fentes marchées':           {p:['quadriceps','fessiers'],s:['ischios','mollets']},
  'Leg curl allongé':          {p:['ischios'],              s:['mollets']},
  'Extension quadriceps':      {p:['quadriceps'],           s:[]},
  'Mollets debout':            {p:['mollets'],              s:[]},

  'Course 1 km':               {p:['quadriceps','mollets'], s:['ischios','fessiers']},
  'Course souple 3 km':        {p:['quadriceps','mollets'], s:['ischios','fessiers']},
  'Sled push':                 {p:['quadriceps','fessiers'],s:['mollets','abdos']},
  'Farmer carry':              {p:['avantbras','trapezes'], s:['abdos','obliques','quadriceps']},
  'Rameur':                    {p:['dorsaux','quadriceps'], s:['biceps','trapezes']},
  'Wall balls':                {p:['quadriceps','epaules'], s:['fessiers','abdos']},
  'Burpees broad jump':        {p:['quadriceps','pectoraux'],s:['abdos','epaules','mollets']},

  'Gainage planche':           {p:['abdos'],                s:['obliques','epaules','lombaires']},
  'Fentes marchées légères':   {p:['quadriceps'],           s:['fessiers']},
  'Mountain climbers':         {p:['abdos'],                s:['epaules','quadriceps']},
  'Corde à sauter':            {p:['mollets'],              s:['quadriceps','avantbras']},

  'Tractions pronation':       {p:['dorsaux'],              s:['biceps','avantbras','trapezes']},
  'Dips barres parallèles':    {p:['triceps','pectoraux'],  s:['epaules']},
  'Pompes archer':             {p:['pectoraux'],            s:['triceps','abdos']},
  'L-sit':                     {p:['abdos'],                s:['quadriceps','triceps']},
  'Pike push-up':              {p:['epaules'],              s:['triceps','abdos']},
  'Hollow body hold':          {p:['abdos'],                s:['obliques','quadriceps']},
};

/* Construit les deux silhouettes avec les groupes surlignés */
function bodyMap(name){
  const m = EXMUSCLE[name];
  if(!m) return null;
  const paint = (set, key) =>
    m.p.includes(key) ? 'var(--m-hot)' :
    m.s.includes(key) ? 'var(--m-warm)' : 'var(--m-off)';

  const draw = (set) => Object.keys(set)
    .filter(k => k !== '_base')
    .map(k => `<g fill="${paint(set,k)}" stroke="none">${set[k]}</g>`)
    .join('');

  const shell = `<g fill="var(--body-fill)" stroke="var(--body-line)" stroke-width="1">${BODY_FRONT._base}</g>`;
  return {
    front:`<svg viewBox="0 0 120 276" class="bmap">${shell}${draw(BODY_FRONT)}</svg>`,
    back: `<svg viewBox="0 0 120 276" class="bmap">${shell}${draw(BODY_BACK)}</svg>`,
    primary:   m.p.map(k => MUSCLE_FR[k] || k),
    secondary: m.s.map(k => MUSCLE_FR[k] || k)
  };
}
