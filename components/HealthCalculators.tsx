"use client";

import React, { useState } from "react";
import { Activity, Calculator, Droplet, Heart, ShieldAlert, Sparkles, Scale, Info } from "lucide-react";

export default function HealthCalculators() {
  const [activeTab, setActiveTab] = useState<"bmi" | "bmr" | "water" | "heart" | "bp">("bmi");

  // State for BMI
  const [bmiWeight, setBmiWeight] = useState<number>(70);
  const [bmiHeight, setBmiHeight] = useState<number>(175);
  const [bmiUnit, setBmiUnit] = useState<"metric" | "imperial">("metric");

  // State for BMR
  const [bmrWeight, setBmrWeight] = useState<number>(70);
  const [bmrHeight, setBmrHeight] = useState<number>(175);
  const [bmrAge, setBmrAge] = useState<number>(30);
  const [bmrGender, setBmrGender] = useState<"male" | "female">("male");
  const [bmrActivity, setBmrActivity] = useState<string>("1.375");

  // State for Water Intake
  const [waterWeight, setWaterWeight] = useState<number>(70);
  const [waterExercise, setWaterExercise] = useState<number>(30);

  // State for Heart Rate
  const [hrAge, setHrAge] = useState<number>(30);
  const [hrResting, setHrResting] = useState<number>(70);

  // State for Blood Pressure
  const [bpSystolic, setBpSystolic] = useState<number>(120);
  const [bpDiastolic, setBpDiastolic] = useState<number>(80);

  const calculateBMI = () => {
    let bmiValue = 0;
    if (bmiUnit === "metric") {
      const heightInMeters = bmiHeight / 100;
      bmiValue = bmiWeight / (heightInMeters * heightInMeters);
    } else {
      bmiValue = (bmiWeight / (bmiHeight * bmiHeight)) * 703;
    }
    return Math.round(bmiValue * 10) / 10;
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: "Underweight", color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-200" };
    if (bmi < 25) return { label: "Normal (Healthy Weight)", color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-200" };
    if (bmi < 30) return { label: "Overweight", color: "text-orange-500", bg: "bg-orange-50", border: "border-orange-200" };
    return { label: "Obese Class", color: "text-red-500", bg: "bg-red-50", border: "border-red-200" };
  };

  const calculateBMR = () => {
    let bmrValue = 0;
    if (bmrGender === "male") {
      bmrValue = 10 * bmrWeight + 6.25 * bmrHeight - 5 * bmrAge + 5;
    } else {
      bmrValue = 10 * bmrWeight + 6.25 * bmrHeight - 5 * bmrAge - 161;
    }
    return Math.round(bmrValue);
  };

  const calculateWaterIntake = () => {
    const base = waterWeight * 35;
    const extra = waterExercise * 12.5;
    const totalMl = base + extra;
    return {
      liters: (totalMl / 1000).toFixed(2),
      ounces: (totalMl * 0.033814).toFixed(0)
    };
  };

  const calculateHRZones = () => {
    const maxHR = 220 - hrAge;
    const hrReserve = maxHR - hrResting;
    return {
      max: maxHR,
      zone1: { min: Math.round(hrResting + hrReserve * 0.5), max: Math.round(hrResting + hrReserve * 0.6) },
      zone2: { min: Math.round(hrResting + hrReserve * 0.6), max: Math.round(hrResting + hrReserve * 0.7) },
      zone3: { min: Math.round(hrResting + hrReserve * 0.7), max: Math.round(hrResting + hrReserve * 0.8) },
      zone4: { min: Math.round(hrResting + hrReserve * 0.8), max: Math.round(hrResting + hrReserve * 0.9) }
    };
  };

  const getBPClassification = () => {
    if (bpSystolic < 120 && bpDiastolic < 80) {
      return { status: "Normal", color: "bg-emerald-500 text-white", advice: "Excellent! Maintain your dietary fiber, hydration, and cardiovascular routine." };
    }
    if ((bpSystolic >= 120 && bpSystolic < 130) && bpDiastolic < 80) {
      return { status: "Elevated", color: "bg-amber-400 text-slate-900", advice: "Your pressure is slightly elevated. Consider reducing refined sodium and monitoring weekly." };
    }
    if ((bpSystolic >= 130 && bpSystolic < 140) || (bpDiastolic >= 80 && bpDiastolic < 90)) {
      return { status: "Stage 1 Hypertension", color: "bg-orange-500 text-white", advice: "Stage 1 hypertension. Discuss DASH diet protocols and light aerobic schedules with your practitioner." };
    }
    if ((bpSystolic >= 140 && bpSystolic < 180) || (bpDiastolic >= 90 && bpDiastolic < 120)) {
      return { status: "Stage 2 Hypertension", color: "bg-red-500 text-white", advice: "Stage 2 hypertension. Clinical intervention is typically advised. Consult Dr. Jenkins or your physician." };
    }
    return { status: "Hypertensive Crisis (Urgent Care)", color: "bg-rose-700 text-white animate-pulse", advice: "WARNING: Retest in 5 minutes. If reading is still above 180/120 and accompanied by headaches or chest pain, seek emergency clinical care immediately." };
  };

  return (
    <div className="bg-white border border-slate-100 rounded-3xl shadow-xl overflow-hidden p-6 lg:p-8 w-full mx-auto my-4" id="health-calculators">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
        <div>
          <span className="text-xs text-blue-600 font-bold font-mono uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
            <Calculator className="h-4 w-4" />
            <span>Interactive Laboratory Suite</span>
          </span>
          <h2 className="font-display font-black text-2xl md:text-3xl text-slate-950 tracking-tight">
            TakeCare Health Calculators
          </h2>
          <p className="text-sm text-slate-500 font-medium">Verify your biometrics using standard clinical equations.</p>
        </div>
        <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-semibold">
          <Sparkles className="h-3.5 w-3.5 fill-blue-700 text-blue-200" />
          <span>Validated Protocols</span>
        </div>
      </div>

      {/* Calculator Selector Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-3 mb-6 scrollbar-thin scrollbar-thumb-slate-200">
        <button
          onClick={() => setActiveTab("bmi")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTab === "bmi" ? "bg-blue-600 text-white shadow-md shadow-blue-100" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Scale className="h-4 w-4" />
          <span>Body Mass Index (BMI)</span>
        </button>
        <button
          onClick={() => setActiveTab("bmr")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTab === "bmr" ? "bg-blue-600 text-white shadow-md shadow-blue-100" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Activity className="h-4 w-4" />
          <span>BMR & Daily Energy</span>
        </button>
        <button
          onClick={() => setActiveTab("water")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTab === "water" ? "bg-blue-600 text-white shadow-md shadow-blue-100" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Droplet className="h-4 w-4" />
          <span>Hydration Intake</span>
        </button>
        <button
          onClick={() => setActiveTab("heart")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTab === "heart" ? "bg-blue-600 text-white shadow-md shadow-blue-100" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Heart className="h-4 w-4" />
          <span>Cardio Zones (HR)</span>
        </button>
        <button
          onClick={() => setActiveTab("bp")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTab === "bp" ? "bg-blue-600 text-white shadow-md shadow-blue-100" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
          }`}
        >
          <ShieldAlert className="h-4 w-4" />
          <span>BP Classification</span>
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* TAB CONTENT: BMI */}
        {activeTab === "bmi" && (
          <>
            <div className="md:col-span-5 space-y-4">
              <h3 className="font-display font-bold text-slate-900 text-base">Biometric Inputs</h3>
              
              <div className="flex gap-2 bg-slate-50 p-1 rounded-xl">
                <button
                  onClick={() => { setBmiUnit("metric"); setBmiWeight(70); setBmiHeight(175); }}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${bmiUnit === "metric" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"}`}
                >
                  Metric (kg/cm)
                </button>
                <button
                  onClick={() => { setBmiUnit("imperial"); setBmiWeight(150); setBmiHeight(68); }}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${bmiUnit === "imperial" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"}`}
                >
                  Imperial (lbs/in)
                </button>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Weight</span>
                  <span>{bmiWeight} {bmiUnit === "metric" ? "kg" : "lbs"}</span>
                </div>
                <input
                  type="range"
                  min={bmiUnit === "metric" ? "40" : "90"}
                  max={bmiUnit === "metric" ? "150" : "330"}
                  value={bmiWeight}
                  onChange={(e) => setBmiWeight(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Height</span>
                  <span>{bmiHeight} {bmiUnit === "metric" ? "cm" : "inches"}</span>
                </div>
                <input
                  type="range"
                  min={bmiUnit === "metric" ? "130" : "50"}
                  max={bmiUnit === "metric" ? "210" : "85"}
                  value={bmiHeight}
                  onChange={(e) => setBmiHeight(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>
            </div>

            <div className="md:col-span-7 bg-slate-50 rounded-2xl p-6 flex flex-col justify-between border border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 font-bold font-mono tracking-widest uppercase">Calculated Index</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-display font-black text-5xl text-blue-600 tracking-tight">{calculateBMI()}</span>
                  <span className="text-xs text-slate-500 font-mono">kg/m²</span>
                </div>
                
                {(() => {
                  const category = getBMICategory(calculateBMI());
                  return (
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 mt-3 rounded-full border text-xs font-bold ${category.color} ${category.bg} ${category.border}`}>
                      <Info className="h-3.5 w-3.5" />
                      <span>{category.label}</span>
                    </div>
                  );
                })()}

                <p className="text-xs text-slate-500 leading-relaxed mt-4">
                  Body Mass Index (BMI) provides a standardized evaluation of somatic weight class based on height. While highly useful for population metrics, it does not distinguish muscle mass from adipose tissues.
                </p>
              </div>

              <div className="mt-6 p-4 bg-white rounded-xl border border-slate-100 text-xs text-slate-700 leading-relaxed">
                <span className="font-bold text-slate-900 block mb-1">Board Certification Advice:</span>
                Aim for a balanced diet rich in leafy greens, complex carbohydrates, and fiber while undertaking regular aerobic cardiovascular habits to target healthy metabolic boundaries.
              </div>
            </div>
          </>
        )}

        {/* TAB CONTENT: BMR */}
        {activeTab === "bmr" && (
          <>
            <div className="md:col-span-5 space-y-4">
              <h3 className="font-display font-bold text-slate-900 text-base">Metabolic Inputs</h3>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setBmrGender("male")}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${bmrGender === "male" ? "bg-blue-600 border-blue-700 text-white shadow-sm" : "bg-white border-slate-200 text-slate-600"}`}
                >
                  Male
                </button>
                <button
                  onClick={() => setBmrGender("female")}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${bmrGender === "female" ? "bg-blue-600 border-blue-700 text-white shadow-sm" : "bg-white border-slate-200 text-slate-600"}`}
                >
                  Female
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Age</label>
                  <input
                    type="number"
                    value={bmrAge}
                    onChange={(e) => setBmrAge(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Weight (kg)</label>
                  <input
                    type="number"
                    value={bmrWeight}
                    onChange={(e) => setBmrWeight(Math.max(10, Number(e.target.value)))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Height (cm)</label>
                  <input
                    type="number"
                    value={bmrHeight}
                    onChange={(e) => setBmrHeight(Math.max(50, Number(e.target.value)))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase block">Daily Activity Profile</label>
                <select
                  value={bmrActivity}
                  onChange={(e) => setBmrActivity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none text-slate-700 font-medium"
                >
                  <option value="1.2">Sedentary (Little/no exercise)</option>
                  <option value="1.375">Lightly Active (1-3 days light exercise)</option>
                  <option value="1.55">Moderately Active (3-5 days moderate workout)</option>
                  <option value="1.725">Very Active (6-7 days heavy training)</option>
                </select>
              </div>
            </div>

            <div className="md:col-span-7 bg-slate-50 rounded-2xl p-6 flex flex-col justify-between border border-slate-100">
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold font-mono tracking-widest uppercase block mb-1">Basal Metabolic Rate (BMR)</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display font-black text-4xl text-slate-900 tracking-tight">{calculateBMR()}</span>
                    <span className="text-xs text-slate-500 font-mono">kcal / day</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Calories required simply to survive at complete rest.</p>
                </div>

                <div>
                  <span className="text-[10px] text-blue-600 font-bold font-mono tracking-widest uppercase block mb-1">Total Daily Energy Expenditure (TDEE)</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display font-black text-4xl text-blue-600 tracking-tight">
                      {Math.round(calculateBMR() * Number(bmrActivity))}
                    </span>
                    <span className="text-xs text-blue-500 font-mono">kcal / day</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Estimated daily energy expenditure including your activity load.</p>
                </div>
              </div>

              <div className="mt-6 p-3 bg-blue-50/50 border border-blue-100 rounded-xl text-xs text-slate-600 leading-relaxed">
                <span className="font-bold text-blue-900 block mb-1 font-display">Nutritionist Recommendation:</span>
                To maintain standard mass metrics, target calorie intakes mirroring your calculated TDEE. For steady metabolic fat burn, establish a healthy deficit of approximately 250 to 500 kcal per day.
              </div>
            </div>
          </>
        )}

        {/* TAB CONTENT: WATER */}
        {activeTab === "water" && (
          <>
            <div className="md:col-span-5 space-y-5">
              <h3 className="font-display font-bold text-slate-900 text-base">Hydration Inputs</h3>
              
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Body Mass (Weight)</span>
                  <span>{waterWeight} kg</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="140"
                  value={waterWeight}
                  onChange={(e) => setWaterWeight(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Physical Activity Duration</span>
                  <span>{waterExercise} minutes</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="120"
                  step="15"
                  value={waterExercise}
                  onChange={(e) => setWaterExercise(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>
            </div>

            <div className="md:col-span-7 bg-slate-50 rounded-2xl p-6 flex flex-col justify-between border border-slate-100">
              <div className="space-y-5">
                <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
                  <Droplet className="h-5 w-5 fill-blue-600" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold font-mono tracking-widest uppercase block mb-1">Target Intake Plan</span>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="bg-white p-4 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Metric Volume</span>
                      <p className="font-display font-black text-3xl text-blue-600 tracking-tight mt-1">
                        {calculateWaterIntake().liters} <span className="text-xs font-mono font-medium text-slate-500">Liters</span>
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Imperial Volume</span>
                      <p className="font-display font-black text-3xl text-blue-600 tracking-tight mt-1">
                        {calculateWaterIntake().ounces} <span className="text-xs font-mono font-medium text-slate-500">Fluid oz</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-3 bg-white rounded-xl border border-slate-100 text-xs text-slate-600 leading-relaxed">
                Hydration levels maintain normal blood volume, support digestive processing, regulate temperature, and aid kidney waste elimination. Sip fluids slowly and steadily throughout your active hours.
              </div>
            </div>
          </>
        )}

        {/* TAB CONTENT: HEART */}
        {activeTab === "heart" && (
          <>
            <div className="md:col-span-5 space-y-5">
              <h3 className="font-display font-bold text-slate-900 text-base">Cardiac Baseline</h3>
              
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Age</span>
                  <span>{hrAge} years old</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="85"
                  value={hrAge}
                  onChange={(e) => setHrAge(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Resting Heart Rate</span>
                  <span>{hrResting} BPM</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="100"
                  value={hrResting}
                  onChange={(e) => setHrResting(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>
            </div>

            <div className="md:col-span-7 bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold font-mono tracking-widest uppercase block mb-1">Karvonen Cardiac Zones</span>
              
              <div className="flex justify-between items-center bg-white p-3.5 rounded-xl border border-slate-100 mb-4">
                <div>
                  <p className="text-xs font-bold text-slate-900">Estimated Maximum Heart Rate</p>
                  <p className="text-[11px] text-slate-400 font-medium">Standard physiological constraint formula</p>
                </div>
                <div className="text-right">
                  <span className="font-display font-black text-2xl text-rose-600">{calculateHRZones().max}</span>
                  <span className="text-[10px] text-slate-400 font-mono ml-1">BPM</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs p-2 bg-emerald-50 rounded-lg border border-emerald-100">
                  <span className="font-semibold text-emerald-800">Zone 1: Active Recovery (50% - 60%)</span>
                  <span className="font-mono font-bold text-emerald-900">{calculateHRZones().zone1.min} - {calculateHRZones().zone1.max} BPM</span>
                </div>
                <div className="flex items-center justify-between text-xs p-2 bg-blue-50 rounded-lg border border-blue-100">
                  <span className="font-semibold text-blue-800">Zone 2: Cardiovascular Longevity (60% - 70%)</span>
                  <span className="font-mono font-bold text-blue-900">{calculateHRZones().zone2.min} - {calculateHRZones().zone2.max} BPM</span>
                </div>
                <div className="flex items-center justify-between text-xs p-2 bg-amber-50 rounded-lg border border-amber-100">
                  <span className="font-semibold text-amber-800">Zone 3: Aerobic Capacity (70% - 80%)</span>
                  <span className="font-mono font-bold text-amber-900">{calculateHRZones().zone3.min} - {calculateHRZones().zone3.max} BPM</span>
                </div>
                <div className="flex items-center justify-between text-xs p-2 bg-rose-50 rounded-lg border border-rose-100">
                  <span className="font-semibold text-rose-800">Zone 4: Anaerobic Performance (80% - 90%)</span>
                  <span className="font-mono font-bold text-rose-900">{calculateHRZones().zone4.min} - {calculateHRZones().zone4.max} BPM</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* TAB CONTENT: BP */}
        {activeTab === "bp" && (
          <>
            <div className="md:col-span-5 space-y-5">
              <h3 className="font-display font-bold text-slate-900 text-base">Clinician Sphygmomanometer Inputs</h3>
              
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Systolic Pressure (Upper Value)</span>
                  <span className="font-mono font-bold text-blue-600">{bpSystolic} mmHg</span>
                </div>
                <input
                  type="range"
                  min="90"
                  max="200"
                  value={bpSystolic}
                  onChange={(e) => setBpSystolic(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Diastolic Pressure (Lower Value)</span>
                  <span className="font-mono font-bold text-blue-600">{bpDiastolic} mmHg</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="130"
                  value={bpDiastolic}
                  onChange={(e) => setBpDiastolic(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>
            </div>

            <div className="md:col-span-7 bg-slate-50 rounded-2xl p-6 flex flex-col justify-between border border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 font-bold font-mono tracking-widest uppercase block mb-1">Classification Output</span>
                <div className="flex items-center gap-3 mt-1.5">
                  <div className={`px-4 py-2 rounded-xl text-xs font-black tracking-wide shadow-sm ${getBPClassification().color}`}>
                    {getBPClassification().status}
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Based on AHA Guidelines</span>
                </div>
                
                <p className="text-xs text-slate-700 mt-4 leading-relaxed bg-white p-4 rounded-xl border border-slate-100">
                  {getBPClassification().advice}
                </p>
              </div>

              <div className="mt-6 flex gap-2 items-start text-[10px] text-slate-500 bg-blue-50/40 p-3 rounded-lg border border-blue-50/80">
                <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                <span>Diagnostic logs should be completed in duplicate twice daily—once prior to morning medications and once in the evening—resting for 5 full minutes in absolute silence prior to cuff engagement.</span>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
