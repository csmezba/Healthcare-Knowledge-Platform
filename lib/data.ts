import { Author, Article, Medicine, Disease, Equipment } from "./types";

// Premium Authors & Reviewers Database
export const authors: Record<string, Author> = {
  dr_sarah: {
    id: "dr_sarah",
    name: "Dr. Sarah Jenkins, M.D., FACC",
    role: "Cardiologist & Healthcare Advocate",
    bio: "Dr. Sarah Jenkins is a board-certified cardiologist with over 15 years of clinical experience. She graduated from Johns Hopkins School of Medicine and specializes in preventative cardiovascular care and digital health tools.",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=250",
    expertise: ["Cardiology", "Preventative Care", "Heart Healthy Diet", "Hypertension"],
    social: { twitter: "@SarahJenkinsMD", linkedin: "linkedin.com/in/sarahjenkins" }
  },
  pharmacist_james: {
    id: "pharmacist_james",
    name: "Dr. James Vance, Pharm.D., R.Ph.",
    role: "Clinical Pharmacist",
    bio: "Dr. James Vance is a registered clinical pharmacist specializing in drug-drug interactions, pediatric compounding, and patient safety protocols. He serves as an advisor to national formulary committees.",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=250",
    expertise: ["Pharmacology", "Drug Interactions", "Geriatric Medicine", "Immunizations"],
    social: { linkedin: "linkedin.com/in/jamesvancepharmd", email: "james.vance@takecare.org" }
  },
  dr_marcus: {
    id: "dr_marcus",
    name: "Dr. Marcus Thorne, M.D., FAAP",
    role: "Associate Professor of Pediatrics",
    bio: "Dr. Marcus Thorne is a practicing pediatrician and child health researcher. He is passionate about making pediatric guidance accessible to families worldwide, with focus on early development and respiratory care.",
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=250",
    expertise: ["Pediatrics", "Neonatal Care", "Child Nutrition", "Asthma Management"],
    social: { twitter: "@MarcusThorneMD" }
  },
  nutritionist_elena: {
    id: "nutritionist_elena",
    name: "Elena Rostova, M.S., R.D., L.D.N.",
    role: "Registered Clinical Dietitian",
    bio: "Elena Rostova is a licensed dietitian specialized in metabolic health, inflammatory disease nutrition, and gut microbiome optimization. She consults for premium athletic organizations and health programs.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250",
    expertise: ["Nutrition Science", "Gut Health", "Metabolic Therapy", "Supplements"],
    social: { linkedin: "linkedin.com/in/elenarostovard", twitter: "@ElenaRostovaRD" }
  }
};

// Rich, Editorial Long-form Articles
export const articles: Article[] = [
  {
    id: "heart-wellness-guide",
    title: "The Ultimate Guide to Cardiovascular Longevity: Scientific Protocols & Daily Habits",
    summary: "Cardiovascular diseases remain the leading cause of global mortality. Discover the latest research-backed habits, dietary strategies, and biometric tracking protocols to safeguard your heart wellness.",
    category: "Health Tips",
    author: authors.dr_sarah,
    medicalReviewer: authors.pharmacist_james,
    readTime: "8 min read",
    date: "July 15, 2026",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800",
    tags: ["Cardiology", "Heart Health", "Nutrition", "Vitals Tracking"],
    popularity: 98,
    likes: 342,
    references: [
      { id: "ref1", citation: "American Heart Association (2025). Lifestyle and Diet Guidelines for Cardiovascular Prevention. Circulation, 142(12), e21-e35." },
      { id: "ref2", citation: "Harvard T.H. Chan School of Public Health. Omega-3 Fatty Acids and Endothelial Function Studies, 2024." }
    ],
    faqs: [
      { question: "What is a healthy resting heart rate?", answer: "For most adults, a normal resting heart rate ranges from 60 to 100 beats per minute. Highly active individuals or athletes may have resting rates as low as 40 to 50 bpm." },
      { question: "Does taking standard doses of Omega-3 prevent plaque buildup?", answer: "While clinical trials yield complex results, consistent supplementation of high-quality, pure EPA/DHA has been shown to support lower triglyceride levels and reduce systemic arterial inflammation." }
    ],
    tableOfContents: [
      { id: "intro", label: "1. Understanding Cardiovascular Risk" },
      { id: "diet", label: "2. The Cardio-protective Dietary Protocol" },
      { id: "exercise", label: "3. Zone 2 Cardio and Heart Reserve" },
      { id: "tracking", label: "4. Biomarkers and Home Diagnostics" }
    ],
    content: `Cardiovascular disease is not a sudden event, but rather a slow, compounding vascular response that develops over decades. Fortunately, modern cardiology has uncovered highly effective diagnostic and lifestyle tools to measure, manage, and mitigate this progression.

### 1. Understanding Cardiovascular Risk Factors

The endothelium—the single-cell thick lining of your blood vessels—is the primary shield against atherosclerosis. Plaque deposition begins when this lining is damaged by factors like oxidized LDL cholesterol, high glucose spikes, and chronically elevated arterial pressure.

To truly understand your risk, you must look beyond total cholesterol levels. A complete risk assessment includes looking at:
* **Apolipoprotein B (ApoB):** A direct count of all atherogenic, plaque-carrying particles in your circulation.
* **hs-CRP:** A highly sensitive measurement of systemic vascular inflammation.
* **HbA1c:** An average marker of glycemic spikes, which directly stiffen arterial walls.

### 2. The Cardio-protective Dietary Protocol

Dietary choices play an immediate role in nitric oxide synthesis—the molecule responsible for vessel relaxation.

* **The Power of Phytochemicals:** Rich, dark berries, leafy greens, and extra virgin olive oil supply polyphenols that protect circulating lipids from oxidation.
* **Electrolyte Ratios:** Reducing processed sodium intake while significantly increasing dietary potassium (found in avocados, spinach, and sweet potatoes) relaxes smooth muscle cells within artery walls, naturally lowering systemic resistance.
* **Fiber Intervention:** Soluble fiber binds to bile acids in the intestinal tract, encouraging the liver to extract excess cholesterol from the bloodstream for bile reproduction.

### 3. Zone 2 Cardio and Heart Reserve

Not all exercise is created equal for cardiac fitness. Training at a moderate, conversational intensity—known as **Zone 2 heart rate training**—specifically stimulates mitochondrial density within myocardial tissues.

Zone 2 training promotes:
1. Increased **Stroke Volume**, meaning your heart pumps more blood per beat with less physiological strain.
2. Improved muscular extraction of oxygen, leading to a lower overall resting heart rate.
3. Enhanced metabolic flexibility, preventing the cellular insulin resistance that accelerates vascular damage.

Aim for at least 150 minutes of Zone 2 cardio weekly, coupled with short bouts of high-intensity aerobic exercise to elevate VO2 max.

### 4. Biomarkers and Home Diagnostics

Maintaining a consistent home diagnostic routine provides an invaluable baseline:
* **Blood Pressure Stability:** Measure your blood pressure using a validated upper-arm cuff twice daily (morning and evening) in a seated, quiet state for 5 minutes. Consistent readings below 120/80 mmHg indicate healthy arterial elasticity.
* **Resting Heart Rate & HRV:** Tracking your heart rate variability (HRV) during sleep offers a robust look at autonomic nervous system balance.

*Disclaimer: The information above is peer-reviewed but does not constitute personal medical diagnosis or treatment plans. Consult Dr. Sarah Jenkins or your local cardiologist for specialized advice.*`
  },
  {
    id: "blood-pressure-monitor-guide",
    title: "How to Correctly Use a Home Blood Pressure Monitor: A Step-by-Step Clinical Protocol",
    summary: "Nearly 50% of home blood pressure readings are clinically inaccurate due to procedural errors. Master the standard sitting position and cuff guidelines recommended by cardiologists.",
    category: "Medical Equipment",
    author: authors.dr_sarah,
    medicalReviewer: authors.dr_marcus,
    readTime: "5 min read",
    date: "June 29, 2026",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    tags: ["Blood Pressure", "Diagnostics", "Home Health", "Medical Equipment"],
    popularity: 92,
    likes: 215,
    references: [
      { id: "ref1", citation: "Journal of Human Hypertension (2025). Standardization of Ambulatory Blood Pressure Guidelines." },
      { id: "ref2", citation: "AHA Clinical Practice Bulletin on Home Sphygmomanometers, 2024." }
    ],
    faqs: [
      { question: "Why is my blood pressure higher in the morning?", answer: "This is known as the morning surge. It corresponds with the natural cortisol and adrenaline release your body triggers to wake you up. However, an extreme surge can indicate uncontrolled hypertension." },
      { question: "Which arm should I measure?", answer: "Initially, measure both arms. If there is a consistent difference, use the arm that records the higher blood pressure reading for all future diagnostic checks." }
    ],
    tableOfContents: [
      { id: "prep", label: "1. Pre-Measurement Restrictions" },
      { id: "posture", label: "2. The Precision Posture" },
      { id: "cuff", label: "3. Cuff Placement Mechanics" },
      { id: "timing", label: "4. Timing and Log Frequency" }
    ],
    content: `An accurate blood pressure reading is highly dependent on preparation, positioning, and equipment fit. Minor errors—such as a full bladder or crossed legs—can falsely inflate your reading by up to 10 to 15 mmHg. 

### 1. Pre-Measurement Restrictions
Before pressing the start button on your digital BP monitor, make sure you have observed these physiological restrictions:
* **No stimulants:** Avoid caffeine, nicotine, and intense exercise for at least 30 minutes prior.
* **Empty your bladder:** A full bladder physically compresses renal arteries, raising systemic pressure.
* **Rest quietly:** Sit in absolute silence for 5 full minutes without looking at your phone, reading, or talking.

### 2. The Precision Posture
Your posture dictates hydrostatic pressure in your extremities.
1. **Back Supported:** Sit in a firm chair with your spine fully supported. Do not slouch on a soft sofa.
2. **Feet Flat:** Place both feet entirely flat on the floor. Crossing your legs at the knees or ankles immediately raises venous pressure.
3. **Arm at Heart Level:** Rest your cuffed arm on a flat desk or armrest. The cuff must be level with your right atrium (the midpoint of your breastbone).

### 3. Cuff Placement Mechanics
Ensure you are using the correct cuff size—a cuff that is too small will cause artificially high readings.
* Wrap the cuff directly onto **bare skin**. Placing it over shirt sleeves ruins sensor accuracy.
* The lower edge of the cuff should sit **1 inch (2.5 cm) above the bend of your elbow**.
* Align the cuff's artery marker (usually indicated by an arrow) directly over your brachial artery, pointing down the inside of your arm.
* Ensure you can slide two fingertips snugly under the cuff edge; any tighter or looser will disrupt volumetric pressure waveforms.

### 4. Timing and Log Frequency
* Take two readings, spaced 1 to 2 minutes apart, both in the morning before medication/breakfast, and in the evening before bed.
* Document these in a neat digital log or export them directly via Bluetooth to your clinical portal to share with your cardiologist.`
  },
  {
    id: "otc-allergy-comparison",
    title: "Decongestants vs. Antihistamines: A Pharmacist's Comparative Guide to Allergy Relief",
    summary: "Confused by the allergy aisle? Learn the chemical differences between histamine blockers and vasoconstrictors to choose the perfect relief for your symptoms.",
    category: "Medicines",
    author: authors.pharmacist_james,
    medicalReviewer: authors.dr_sarah,
    readTime: "6 min read",
    date: "July 2, 2026",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800",
    tags: ["Pharmacology", "Allergy", "OTC Medicines", "Safety Guides"],
    popularity: 95,
    likes: 410,
    references: [
      { id: "ref1", citation: "Global Allergy & Asthma Formulary Board. Pharmacokinetics of H1 Antagonists, 2025." }
    ],
    faqs: [
      { question: "Can I take Cetirizine and Pseudoephedrine together?", answer: "Yes, they are frequently combined (such as in 'D' formulas), but this increases side effects like dry mouth, insomnia, and blood pressure elevation." }
    ],
    tableOfContents: [
      { id: "mechanisms", label: "1. The Chemical Mechanisms" },
      { id: "antihistamines", label: "2. Antihistamines: Blocking the Trigger" },
      { id: "decongestants", label: "3. Decongestants: Constricting the Vessels" },
      { id: "summary", label: "4. Which One to Choose?" }
    ],
    content: `When seasonal allergens strike, walking down the pharmacy aisle can feel overwhelming. Choosing between an **antihistamine** and a **decongestant** requires understanding their completely different physiological targets.

### 1. The Chemical Mechanisms
Allergic rhinitis is triggered when mast cells in your nasal lining detect allergens (like pollen), causing them to release a flood of **histamine**. Histamine binds to H1 receptors, dilating blood vessels, inducing swelling, and causing mucus glands to hyper-secrete. 

* **Antihistamines** work by occupying H1 receptors, preventing histamine from attaching. They turn off the cellular alarm.
* **Decongestants** do not block histamine. Instead, they act directly on alpha-adrenergic receptors in the smooth muscle of nasal blood vessels, forcing swollen vessels to constrict and open the airway.

### 2. Antihistamines: First-Gen vs. Second-Gen
Antihistamines are divided into two main clinical classes:
* **First-Generation (e.g., Diphenhydramine / Benadryl):** These cross the blood-brain barrier. They block central H1 receptors, causing strong drowsiness, slowed motor function, and dry eyes. They are ideal for nighttime use.
* **Second-Generation (e.g., Cetirizine, Loratadine, Fexofenadine):** Engineered with larger molecules that do not easily cross into brain tissue. They offer 24-hour relief with minimal drowsiness.

### 3. Decongestants: The Blood Pressure Warning
Decongestants come in oral tablets (Pseudoephedrine) and rapid nasal sprays (Oxymetazoline).
* **Nasal Spray Warning (Rebound Congestion):** Using nasal decongestant sprays for more than 3 to 5 consecutive days can damage your nasal lining, causing severe rebound congestion (Rhinitis Medicamentosa).
* **Oral Decongestants & Heart Strain:** Because oral decongestants constrict blood vessels throughout the entire body, they can significantly increase blood pressure and heart rate. They should be strictly avoided by individuals with diagnosed hypertension or arrhythmias.`
  }
];

// Comprehensive Medicine Database
export const medicines: Medicine[] = [
  {
    id: "ibuprofen",
    name: "Ibuprofen",
    genericName: "Ibuprofen (Non-steroidal Anti-inflammatory Drug - NSAID)",
    brandNames: ["Advil", "Motrin", "Nurofen"],
    type: "Analgesic / Anti-inflammatory",
    prescriptionStatus: "Over-the-Counter (OTC)",
    dosageForms: ["Tablet", "Liquid Gel Capsule", "Oral Suspension", "Intravenous"],
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=600",
    overview: "Ibuprofen is a widely used Non-steroidal Anti-inflammatory Drug (NSAID) designed to alleviate mild-to-moderate pain, reduce fever, and suppress active soft-tissue inflammation by inhibiting COX enzymes.",
    uses: [
      "Relief of tension headaches and migraines",
      "Management of osteoarthritis and rheumatoid arthritis pain",
      "Reduction of acute inflammatory fever",
      "Alleviation of muscle strains, dental pain, and menstrual cramps"
    ],
    dosage: "Standard adult dose is 200mg to 400mg orally every 4 to 6 hours as needed. Do not exceed 1200mg in a 24-hour period unless under direct clinical supervision.",
    administration: "Always swallow with a full glass of water. Take with food or a glass of milk to buffer the stomach lining from gastrointestinal irritation.",
    sideEffects: [
      { symptom: "Dyspepsia or stomach upset", severity: "Common" },
      { symptom: "Mild dizziness or headache", severity: "Common" },
      { symptom: "Gastric ulceration or bleeding", severity: "Severe" },
      { symptom: "Renal impairment or fluid retention", severity: "Rare" }
    ],
    warnings: [
      "May increase the risk of serious cardiovascular thrombotic events, including heart attack or stroke.",
      "Contraindicated immediately before or after coronary artery bypass graft (CABG) surgery.",
      "Can cause severe gastrointestinal bleeding, ulceration, and perforation."
    ],
    pregnancy: "Contraindicated in the third trimester of pregnancy due to the risk of premature closure of the fetal ductus arteriosus.",
    breastfeeding: "Excreted in human milk in extremely low concentrations; generally considered compatible with breastfeeding, but consult your pediatrician first.",
    elderly: "Increased risk of severe renal impairment and gastrointestinal bleeding. Use the lowest effective dose for the shortest duration.",
    children: "Dosage must be strictly calculated based on weight, not age (generally 10mg/kg per dose every 6 hours). Consult a pediatrician.",
    drugInteractions: [
      "Anticoagulants (e.g., Warfarin, Aspirin): Increased risk of severe internal bleeding.",
      "Antihypertensives (e.g., Lisinopril): Ibuprofen can decrease the blood pressure lowering effect.",
      "Lithium: Ibuprofen decreases renal clearance, elevating lithium toxicity risk."
    ],
    foodInteractions: [
      "Take with food to minimize GI distress, though food slightly delays the rate of absorption."
    ],
    alcoholInteraction: "Strictly avoid concurrent alcohol intake. Combined usage significantly increases gastric mucosal erosion and bleeding risks.",
    storage: "Store at room temperature (20°C to 25°C / 68°F to 77°F) away from moisture, direct sunlight, and heat.",
    faqs: [
      { question: "How long does Ibuprofen take to work?", answer: "Oral tablets typically begin working within 20 to 30 minutes, reaching peak pain relief in 1 to 2 hours." },
      { question: "Can I take Ibuprofen with Acetaminophen (Tylenol)?", answer: "Yes. Because they belong to different drug classes and are processed by different pathways (kidneys vs. liver), they can be taken together or alternated under clinical guidance." }
    ],
    references: [
      { id: "mref1", citation: "FDA Ibuprofen Safety Update, 2024. Cardiovascular and GI Warnings." },
      { id: "mref2", citation: "Clinical Pharmacology Review. Mechanism of Non-Selective COX Inhibition." }
    ]
  },
  {
    id: "lisinopril",
    name: "Lisinopril",
    genericName: "Lisinopril (Angiotensin-Converting Enzyme Inhibitor)",
    brandNames: ["Zestril", "Prinivil"],
    type: "Antihypertensive / ACE Inhibitor",
    prescriptionStatus: "Rx - Prescription Required",
    dosageForms: ["Tablet", "Oral Solution"],
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=600",
    overview: "Lisinopril is an oral medication belonging to the ACE inhibitor class. It relaxes blood vessels, helping to treat high blood pressure, manage heart failure, and improve survival rates following a heart attack.",
    uses: [
      "Treatment of primary and secondary hypertension",
      "Adjunctive therapy in chronic congestive heart failure",
      "Improvement of survival outcomes post-myocardial infarction",
      "Protection of renal function in diabetic nephropathy"
    ],
    dosage: "Initial dose is typically 10mg orally once daily, adjusted by your physician up to 40mg daily based on clinical response.",
    administration: "Administer once daily at the exact same time, with or without food. Ensure adequate daily hydration.",
    sideEffects: [
      { symptom: "Persistent dry, ticklish cough", severity: "Common" },
      { symptom: "Dizziness or orthostatic hypotension", severity: "Common" },
      { symptom: "Hyperkalemia (high potassium levels)", severity: "Rare" },
      { symptom: "Angioedema (life-threatening swelling of face/airway)", severity: "Severe" }
    ],
    warnings: [
      "Discontinue immediately if swelling of the face, extremities, lips, tongue, or glottis occurs.",
      "Monitor kidney function and serum potassium levels regularly during therapy.",
      "Can cause low blood pressure, especially if taking diuretics or in dehydrated states."
    ],
    pregnancy: "Extremely dangerous. When pregnancy is detected, discontinue Lisinopril as soon as possible. Exposure during the second and third trimesters can cause fetal injury or death.",
    breastfeeding: "Safety profile is not fully established. Use alternative medications if nursing a newborn or premature infant.",
    elderly: "May require lower starting doses due to natural age-related declines in kidney function.",
    children: "Approved for children aged 6 years and older with hypertension. Pediatric dosing must be managed strictly by a pediatric cardiologist.",
    drugInteractions: [
      "Potassium Supplements or Salt Substitutes: Severe, dangerous risk of hyperkalemia.",
      "Diuretics (water pills): May lead to sudden, severe drops in blood pressure.",
      "NSAIDs: May impair kidney function and reduce Lisinopril's antihypertensive efficiency."
    ],
    foodInteractions: [
      "Avoid salt substitutes containing potassium chloride, as they can cause hyperkalemia."
    ],
    alcoholInteraction: "Alcohol enhances Lisinopril's blood pressure-lowering effect, potentially causing severe dizziness, fainting, or orthostatic drops.",
    storage: "Store at 15°C to 30°C (59°F to 86°F) in a tightly closed, moisture-resistant container.",
    faqs: [
      { question: "Why does Lisinopril cause a dry cough?", answer: "Lisinopril prevents the breakdown of bradykinin, a natural compound that accumulates in the respiratory tract. This accumulation can trigger a persistent, dry, ticklish cough. If this becomes bothersome, consult your doctor about switching to an ARB (Angiotensin Receptor Blocker)." },
      { question: "Is Lisinopril safe for long-term use?", answer: "Yes, it is routinely prescribed for lifelong management of high blood pressure, with regular monitoring of kidney function and potassium levels." }
    ],
    references: [
      { id: "lref1", citation: "AHA Hypertension Management Compendium, 2025." },
      { id: "lref2", citation: "Journal of Nephrology. Protecting Diabetic Renal Function with ACE Inhibitors." }
    ]
  },
  {
    id: "amoxicillin",
    name: "Amoxicillin",
    genericName: "Amoxicillin (Beta-lactam Aminopenicillin Antibiotic)",
    brandNames: ["Amoxil", "Moxatag", "Trimox"],
    type: "Antibiotic / Antibacterial",
    prescriptionStatus: "Rx - Prescription Required",
    dosageForms: ["Capsule", "Tablet", "Chewable Tablet", "Powder for Oral Suspension"],
    image: "https://images.unsplash.com/photo-1607619056574-7b8d304f3c6f?auto=format&fit=crop&q=80&w=600",
    overview: "Amoxicillin is a moderate-spectrum aminopenicillin antibiotic used to treat bacterial infections of the middle ear, tonsils, throat, larynx, bronchi, lungs, urinary tract, and skin.",
    uses: [
      "Acute otitis media (middle ear infections)",
      "Streptococcal pharyngitis (Strep throat) and tonsillitis",
      "Community-acquired pneumonia",
      "Skin and soft tissue bacterial infections"
    ],
    dosage: "Adult dosing ranges from 250mg to 500mg every 8 hours, or 500mg to 875mg every 12 hours, depending on infection severity.",
    administration: "Can be taken with or without food. Liquid suspensions must be shaken thoroughly before use and measured with a clinical dosing syringe.",
    sideEffects: [
      { symptom: "Nausea, diarrhea, or loose stools", severity: "Common" },
      { symptom: "Oral thrush or vaginal yeast infection", severity: "Common" },
      { symptom: "Severe allergic skin rash (Hives)", severity: "Severe" },
      { symptom: "Anaphylaxis (severe allergic reaction)", severity: "Severe" }
    ],
    warnings: [
      "Do not use if you have a confirmed history of severe immediate penicillin allergies.",
      "Complete the entire prescribed course, even if symptoms disappear, to prevent the development of drug-resistant bacteria.",
      "May cause Clostridioides difficile-associated diarrhea, ranging from mild diarrhea to fatal colitis."
    ],
    pregnancy: "Considered safe and is a primary antibiotic choice during pregnancy (Category B). Inform your obstetrician.",
    breastfeeding: "Excreted in breast milk in small amounts; generally considered compatible with nursing, but monitor your infant for diaper rash or thrush.",
    elderly: "No special dosage adjustments are required unless renal impairment is present.",
    children: "A primary choice for pediatric bacterial infections. Doses are strictly based on weight (typically 40-90 mg/kg/day split into 2-3 doses).",
    drugInteractions: [
      "Probenecid: Decreases renal secretion of Amoxicillin, raising blood concentrations.",
      "Oral Contraceptives: May slightly reduce the effectiveness of birth control pills.",
      "Allopurinol: Co-administration increases the risk of developing a drug-induced skin rash."
    ],
    foodInteractions: [
      "None. Food does not impair oral absorption, and can help prevent stomach upset."
    ],
    alcoholInteraction: "No direct chemical reaction, but alcohol should be avoided as it impairs the immune system and delays recovery.",
    storage: "Capsules and tablets: Store at room temperature. Prepared liquid suspensions: Ideally refrigerate and discard any unused portion after 14 days.",
    faqs: [
      { question: "What should I do if I miss a dose?", answer: "Take the missed dose as soon as you remember. If it is almost time for your next dose, skip the missed dose and resume your regular schedule. Do not double doses to catch up." },
      { question: "Can Amoxicillin treat a common cold or flu?", answer: "No. Amoxicillin is an antibiotic that only treats bacterial infections. It is completely ineffective against viral infections like the cold or flu." }
    ],
    references: [
      { id: "aref1", citation: "CDC Antibiotic Stewardship Guidelines, 2025." },
      { id: "aref2", citation: "Pediatric Infectious Disease Compendium. Standard Amoxicillin Dosing." }
    ]
  }
];

// Disease Library
export const diseases: Disease[] = [
  {
    id: "hypertension",
    name: "Hypertension (High Blood Pressure)",
    overview: "Hypertension occurs when the force of blood pushing against your artery walls is consistently too high. Often called the 'silent killer' because it rarely presents symptoms, untreated hypertension can lead to heart attacks, strokes, and kidney failure.",
    image: "https://images.unsplash.com/photo-1530026405186-ed1ea0dc7a63?auto=format&fit=crop&q=80&w=600",
    symptoms: [
      "Usually asymptomatic (no obvious signs)",
      "Occasional dull headaches (especially in the morning)",
      "Shortness of breath or chest discomfort",
      "Dizziness, tinnitus, or nosebleeds (in severe spikes)"
    ],
    riskLevel: "High",
    commonAge: "Adults aged 35 and older, though increasingly common in younger demographics due to lifestyle factors.",
    treatments: [
      "First-line medications like ACE Inhibitors, ARBs, or Beta-Blockers",
      "Low-sodium, high-potassium dietary adjustments (DASH diet)",
      "Regular aerobic and cardiovascular exercise (Zone 2 cardio)",
      "Stress reduction techniques and weight management"
    ],
    guideContent: "Hypertension strains the delicate blood vessels in your brain and heart. Over time, high pressure causes microscopic tears in arterial walls. When cholesterol particles lodge in these tears, plaque builds up, leading to a condition called atherosclerosis. Managing your blood pressure through medication and a healthy lifestyle is key to maintaining long-term cardiovascular health.",
    prevention: [
      "Limit sodium intake to under 1500mg daily.",
      "Incorporate 30 minutes of moderate cardiovascular exercise 5 times a week.",
      "Monitor blood pressure regularly with a validated home cuff."
    ],
    whenToSeeDoctor: "Consult a primary physician if home blood pressure readings are consistently above 130/80 mmHg. Seek immediate emergency care if your blood pressure spikes above 180/120 mmHg and is accompanied by chest pain, shortness of breath, or vision changes."
  },
  {
    id: "asthma",
    name: "Bronchial Asthma",
    overview: "Asthma is a chronic inflammatory condition of the airways. It causes the bronchial tubes to swell, narrow, and produce excess mucus in response to various triggers, making breathing difficult and inducing coughing and wheezing.",
    image: "https://images.unsplash.com/photo-1581091911393-41f2a507cfb4?auto=format&fit=crop&q=80&w=600",
    symptoms: [
      "Shortness of breath and rapid breathing",
      "Chest tightness, stiffness, or pain",
      "Wheezing (a whistling sound) during exhalation",
      "Coughing fits, often worsened at night or by exercise"
    ],
    riskLevel: "Moderate",
    commonAge: "Can develop at any age, but most frequently diagnosed during childhood.",
    treatments: [
      "Inhaled Corticosteroids (e.g., Fluticasone) for daily controller therapy",
      "Short-Acting Beta-Agonists (e.g., Albuterol) for immediate rescue relief",
      "Leukotriene receptor antagonists (e.g., Montelukast) oral tablets",
      "Avoidance of allergen triggers (pollen, dust mites, pet dander)"
    ],
    guideContent: "Asthma symptoms are caused by airway hyper-responsiveness. When exposed to an allergen, cold air, or physical exertion, the muscles surrounding your airways contract, narrowing the passage. At the same time, inflammation swells the inner lining and triggers excess mucus production, making breathing difficult.",
    prevention: [
      "Identify and limit exposure to environmental allergens.",
      "Pre-treat with a rescue inhaler 15 minutes before physical exercise.",
      "Get an annual influenza vaccination to prevent respiratory complications."
    ],
    whenToSeeDoctor: "See your doctor regularly to keep your Asthma Action Plan up-to-date. Seek immediate emergency care if rescue inhalers do not provide relief, or if you experience chest retractions, difficulty speaking in full sentences, or a blue hue on your lips or fingernails."
  }
];

// Medical Equipment Catalog
export const medicalEquipment: Equipment[] = [
  {
    id: "take-bp-monitor",
    name: "TakeShield Digital Upper-Arm Blood Pressure Monitor",
    category: "Cardiovascular Diagnostics",
    image: "https://images.unsplash.com/photo-1631815518252-dd12f245658e?auto=format&fit=crop&q=80&w=600",
    rating: 4.8,
    reviewsCount: 1420,
    priceRange: "Mid-range",
    specs: [
      { label: "Cuff Circumference Range", value: "8.6 inches to 16.5 inches (22 cm to 42 cm)" },
      { label: "Measurement Method", value: "Oscillometric sensor wave detection" },
      { label: "Data Connectivity", value: "Bluetooth 5.0 to iOS & Android Sync" },
      { label: "Memory Storage Capacity", value: "2 users x 100 diagnostic logs with averages" },
      { label: "Power Source", value: "4 AAA Batteries or USB-C direct input" }
    ],
    benefits: [
      "Clinically validated for precision cardiovascular diagnostics",
      "Intuitive three-color WHO blood pressure classification indicator",
      "Automatic detection of irregular heartbeats (Arrhythmias)",
      "Premium, high-contrast backlit LCD screen for easy reading"
    ],
    usageGuide: [
      "Position yourself in a supported sitting posture with feet flat on the floor.",
      "Fit the arm cuff snuggly onto bare skin, 1 inch above your elbow bend.",
      "Rest quietly for 5 minutes prior to measuring.",
      "Press the Start button, keep your arm steady, and remain silent during inflation."
    ],
    maintenance: "Clean the display and cuff with a dry or lightly damp lint-free cloth. Do not wash the cuff bladder or submerge the monitor in water. Remove batteries if the monitor will be stored for more than 3 months.",
    cleaning: "Wipe with a soft cloth moistened with diluted rubbing alcohol (70% isopropyl alcohol) for disinfecting. Let air dry completely.",
    buyingGuide: "This monitor is highly recommended for daily management of hypertension. Its clinical accuracy makes it an ideal choice for patients sharing data logs with cardiologists.",
    faqs: [
      { question: "Can multiple users log their data on this device?", answer: "Yes. The device features separate memory profiles for User 1 and User 2, allowing each to store up to 100 individual blood pressure logs." },
      { question: "Why does my home monitor show different readings than the clinic?", answer: "Differences can be caused by the clinical environment (White Coat Syndrome), incorrect cuff size, or not resting before taking measurements." }
    ]
  },
  {
    id: "take-mesh-nebulizer",
    name: "TakeBreath Handheld Mesh Nebulizer Pro",
    category: "Respiratory Wellness",
    image: "https://images.unsplash.com/photo-1584017911632-d27860bc404c?auto=format&fit=crop&q=80&w=600",
    rating: 4.9,
    reviewsCount: 840,
    priceRange: "Premium",
    specs: [
      { label: "Aerosol Output Rate", value: "≥ 0.25 mL/min" },
      { label: "Particle Size (MMAD)", value: "2.3 µm ± 25% (deep pulmonary delivery)" },
      { label: "Medication Cup Capacity", value: "Max 10 mL" },
      { label: "Operating Noise Level", value: "< 20 dB (completely silent)" },
      { label: "Power Source", value: "Rechargeable Lithium Polymer (USB-C)" }
    ],
    benefits: [
      "Ultra-fine mesh technology ensures optimal medication absorption",
      "Pocket-sized and lightweight for convenient respiratory relief on-the-go",
      "Low residual volume ensures you get your complete dose of medication",
      "Dual-power design with USB-C and battery operations"
    ],
    usageGuide: [
      "Open the medicine chamber and add your prescribed sterile solution.",
      "Attach the soft silicone inhalation mask or mouthpiece securely.",
      "Sit upright, hold the nebulizer level, and turn the device on.",
      "Inhale slowly and deeply through the mouth, then exhale naturally."
    ],
    maintenance: "Always clean the medicine chamber immediately after each use to prevent medication residue from clogging the delicate micro-mesh holes.",
    cleaning: "Rinse the medicine cup with sterile distilled water and let air dry. Weekly, disinfect by soaking the cup in a 1:3 white vinegar and warm water solution for 15 minutes, then rinse thoroughly.",
    buyingGuide: "An excellent premium option for active individuals managing chronic asthma, COPD, or bronchitis who require portable, reliable, and silent nebulization.",
    faqs: [
      { question: "Can I use hypertonic saline solutions?", answer: "Yes, standard sterile saline and prescribed bronchodilators are compatible with this nebulizer. Avoid essential oils, which can clog the micro-mesh." },
      { question: "How long does a full battery charge last?", answer: "The built-in rechargeable battery provides up to 120 minutes of continuous operation on a single charge." }
    ]
  }
];

// Data Helper functions for Next.js App Router
export function getArticleById(id: string): Article | undefined {
  return articles.find((article) => article.id === id);
}

export function getMedicineById(id: string): Medicine | undefined {
  return medicines.find((medicine) => medicine.id === id);
}

export function getDiseaseById(id: string): Disease | undefined {
  return diseases.find((disease) => disease.id === id);
}

export function getEquipmentById(id: string): Equipment | undefined {
  return medicalEquipment.find((item) => item.id === id);
}
