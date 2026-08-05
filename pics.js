/* ═══════════════════════════════════════════
   ZATHLETE — Photos des mouvements
   Source : free-exercise-db (domaine public, Unlicense)
   Deux images par exercice : position de départ, position d'arrivée
   ═══════════════════════════════════════════ */
const EXPIC = {
  'Burpees broad jump'          : ['Front_Box_Jump_0.jpg', 'Front_Box_Jump_1.jpg'],
  'Corde à sauter'              : ['Rope_Jumping_0.jpg', 'Rope_Jumping_1.jpg'],
  'Course 1 km'                 : ['Running_Treadmill_0.jpg', 'Running_Treadmill_1.jpg'],
  'Course souple 3 km'          : ['Running_Treadmill_0.jpg', 'Running_Treadmill_1.jpg'],
  'Curl barre EZ'               : ['EZ-Bar_Curl_0.jpg', 'EZ-Bar_Curl_1.jpg'],
  'Curl marteau'                : ['Hammer_Curls_0.jpg', 'Hammer_Curls_1.jpg'],
  'Dips barres parallèles'      : ['Dips_-_Chest_Version_0.jpg', 'Dips_-_Chest_Version_1.jpg'],
  'Dips triceps'                : ['Dips_-_Triceps_Version_0.jpg', 'Dips_-_Triceps_Version_1.jpg'],
  'Développé couché'            : ['Barbell_Bench_Press_-_Medium_Grip_0.jpg', 'Barbell_Bench_Press_-_Medium_Grip_1.jpg'],
  'Développé militaire'         : ['Standing_Military_Press_0.jpg', 'Standing_Military_Press_1.jpg'],
  'Extension poulie haute'      : ['Triceps_Pushdown_0.jpg', 'Triceps_Pushdown_1.jpg'],
  'Extension quadriceps'        : ['Leg_Extensions_0.jpg', 'Leg_Extensions_1.jpg'],
  'Face pull'                   : ['Face_Pull_0.jpg', 'Face_Pull_1.jpg'],
  'Farmer carry'                : ['Farmers_Walk_0.jpg', 'Farmers_Walk_1.jpg'],
  'Fentes marchées'             : ['Dumbbell_Lunges_0.jpg', 'Dumbbell_Lunges_1.jpg'],
  'Fentes marchées légères'     : ['Bodyweight_Walking_Lunge_0.jpg', 'Bodyweight_Walking_Lunge_1.jpg'],
  'Gainage planche'             : ['Plank_0.jpg', 'Plank_1.jpg'],
  'Hollow body hold'            : ['Ab_Crunch_Machine_0.jpg', 'Ab_Crunch_Machine_1.jpg'],
  'L-sit'                       : ['Hanging_Leg_Raise_0.jpg', 'Hanging_Leg_Raise_1.jpg'],
  'Leg curl allongé'            : ['Lying_Leg_Curls_0.jpg', 'Lying_Leg_Curls_1.jpg'],
  'Mollets debout'              : ['Standing_Calf_Raises_0.jpg', 'Standing_Calf_Raises_1.jpg'],
  'Mountain climbers'           : ['Mountain_Climbers_0.jpg', 'Mountain_Climbers_1.jpg'],
  'Pike push-up'                : ['Hanging_Pike_0.jpg', 'Hanging_Pike_1.jpg'],
  'Pompes archer'               : ['Pushups_0.jpg', 'Pushups_1.jpg'],
  'Presse à cuisses'            : ['Leg_Press_0.jpg', 'Leg_Press_1.jpg'],
  'Rameur'                      : ['Seated_Cable_Rows_0.jpg', 'Seated_Cable_Rows_1.jpg'],
  'Rowing barre'                : ['Bent_Over_Barbell_Row_0.jpg', 'Bent_Over_Barbell_Row_1.jpg'],
  'Sled push'                   : ['Sled_Push_0.jpg', 'Sled_Push_1.jpg'],
  'Squat barre'                 : ['Barbell_Squat_0.jpg', 'Barbell_Squat_1.jpg'],
  'Tirage horizontal poulie'    : ['Seated_Cable_Rows_0.jpg', 'Seated_Cable_Rows_1.jpg'],
  'Tirage vertical'             : ['Wide-Grip_Lat_Pulldown_0.jpg', 'Wide-Grip_Lat_Pulldown_1.jpg'],
  'Tractions pronation'         : ['Pullups_0.jpg', 'Pullups_1.jpg'],
  'Wall balls'                  : ['Kettlebell_Thruster_0.jpg', 'Kettlebell_Thruster_1.jpg'],
  'Écarté haltères incliné'     : ['Incline_Dumbbell_Flyes_0.jpg', 'Incline_Dumbbell_Flyes_1.jpg'],
  'Élévations latérales'        : ['Side_Lateral_Raise_0.jpg', 'Side_Lateral_Raise_1.jpg'],
};
function exPics(n){ return EXPIC[n] || null; }
