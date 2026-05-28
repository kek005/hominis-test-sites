// Deterministic seed data for Pulse hospital dashboard.

export const DEMO_USER = { email: 'demo@hominis.test', password: 'password', name: 'Dr. Sarah Lin', role: 'Attending Physician' }

export const WARDS = ['Emergency', 'ICU', 'General', 'Pediatrics', 'Maternity', 'Surgery']
export const STATUSES = ['Admitted', 'Observation', 'Critical', 'Discharged']

export const STAFF = [
  { id: 's1', name: 'Dr. Sarah Lin', role: 'Attending Physician', dept: 'Emergency', avatar: 11, onCall: true },
  { id: 's2', name: 'Dr. Marcus Webb', role: 'Cardiologist', dept: 'ICU', avatar: 12, onCall: true },
  { id: 's3', name: 'Dr. Priya Anand', role: 'Pediatrician', dept: 'Pediatrics', avatar: 5, onCall: false },
  { id: 's4', name: 'Dr. James Okoro', role: 'Surgeon', dept: 'Surgery', avatar: 13, onCall: true },
  { id: 's5', name: 'Dr. Elena Rossi', role: 'OB-GYN', dept: 'Maternity', avatar: 9, onCall: false },
  { id: 's6', name: 'Nurse Tom Hayes', role: 'Charge Nurse', dept: 'General', avatar: 14, onCall: true },
  { id: 's7', name: 'Nurse Aisha Bello', role: 'RN', dept: 'ICU', avatar: 16, onCall: true },
  { id: 's8', name: 'Dr. Henry Cole', role: 'Hospitalist', dept: 'General', avatar: 17, onCall: false },
]

const FIRST = ['Robert', 'Maria', 'David', 'Linda', 'Michael', 'Susan', 'James', 'Karen', 'John', 'Patricia', 'Daniel', 'Nancy', 'Paul', 'Carol']
const LAST = ['Nguyen', 'Garcia', 'Smith', 'Johnson', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White']
const DIAGNOSES = ['Pneumonia', 'Post-op recovery', 'Chest pain — observation', 'Fractured femur', 'Acute appendicitis', 'Diabetic ketoacidosis', 'Severe asthma', 'Sepsis', 'Stroke — monitoring', 'Dehydration', 'Migraine', 'Cellulitis', 'COPD exacerbation', 'Routine delivery']
const ALLERGIES = [['Penicillin'], ['None'], ['Latex', 'Penicillin'], ['Sulfa'], ['None'], ['Aspirin'], ['Peanuts'], ['None']]
const MEDS = [
  ['Amoxicillin 500mg', 'Ibuprofen 400mg'],
  ['Metoprolol 25mg', 'Aspirin 81mg'],
  ['Insulin (sliding scale)', 'Metformin 1000mg'],
  ['Albuterol inhaler', 'Prednisone 40mg'],
  ['Acetaminophen 650mg'],
  ['Heparin', 'Pantoprazole 40mg'],
  ['Ceftriaxone 1g', 'Normal saline IV'],
]

function vitals(seed) {
  return {
    hr: 60 + (seed * 3) % 45,
    bp: `${110 + (seed * 5) % 40}/${70 + (seed * 2) % 20}`,
    temp: (36.4 + ((seed % 18) / 10)).toFixed(1),
    spo2: 92 + (seed * 2) % 8,
    resp: 12 + (seed % 10),
  }
}

export const PATIENTS = Array.from({ length: 14 }).map((_, i) => {
  const ward = WARDS[i % WARDS.length]
  const status = i % 6 === 0 ? 'Critical' : i % 5 === 0 ? 'Observation' : i % 7 === 0 ? 'Discharged' : 'Admitted'
  const seed = i * 7 + 3
  return {
    id: 'p' + (1000 + i),
    mrn: 'MRN-' + (480000 + i * 137),
    name: `${FIRST[i % FIRST.length]} ${LAST[(i * 3) % LAST.length]}`,
    age: 4 + (i * 6) % 80,
    sex: i % 2 === 0 ? 'F' : 'M',
    ward,
    room: `${ward[0]}${100 + i}`,
    status,
    admitted: `2026-05-${String(28 - (i % 14)).padStart(2, '0')}`,
    diagnosis: DIAGNOSES[i % DIAGNOSES.length],
    doctor: STAFF[i % 5].name,
    vitals: vitals(seed),
    allergies: ALLERGIES[i % ALLERGIES.length],
    meds: MEDS[i % MEDS.length],
    notes: [
      { id: 'n' + i, at: '2026-05-27 08:15', author: STAFF[i % 5].name, text: 'Stable overnight. Continue current treatment plan and reassess in the morning.' },
    ],
  }
})

export const WARD_BEDS = WARDS.map((w, i) => {
  const total = [18, 12, 30, 16, 14, 20][i]
  const occupied = [15, 11, 22, 9, 7, 13][i]
  return { ward: w, total, occupied }
})

export const APPOINTMENTS = [
  { id: 'a1', time: '09:00', patient: 'Robert Nguyen', doctor: 'Dr. Sarah Lin', dept: 'Emergency', type: 'Follow-up', status: 'Checked in' },
  { id: 'a2', time: '09:30', patient: 'Maria Garcia', doctor: 'Dr. Marcus Webb', dept: 'ICU', type: 'Consult', status: 'Scheduled' },
  { id: 'a3', time: '10:15', patient: 'David Smith', doctor: 'Dr. James Okoro', dept: 'Surgery', type: 'Pre-op', status: 'Scheduled' },
  { id: 'a4', time: '11:00', patient: 'Linda Johnson', doctor: 'Dr. Priya Anand', dept: 'Pediatrics', type: 'Check-up', status: 'Checked in' },
  { id: 'a5', time: '13:30', patient: 'Michael Brown', doctor: 'Dr. Sarah Lin', dept: 'Emergency', type: 'Follow-up', status: 'Scheduled' },
  { id: 'a6', time: '14:15', patient: 'Susan Davis', doctor: 'Dr. Henry Cole', dept: 'General', type: 'Discharge', status: 'Scheduled' },
  { id: 'a7', time: '15:00', patient: 'James Miller', doctor: 'Dr. Elena Rossi', dept: 'Maternity', type: 'Ultrasound', status: 'Scheduled' },
]

// 14-day admissions series for the dashboard chart.
export const ADMISSIONS = [12, 9, 14, 11, 16, 13, 18, 10, 15, 12, 17, 14, 19, 16].map((v, i) => ({
  date: `2026-05-${String(15 + i).padStart(2, '0')}`, count: v,
}))
