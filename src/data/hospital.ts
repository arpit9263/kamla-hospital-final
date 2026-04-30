import doc1 from "@/assets/dineshpratap.jpeg";
import doc2 from "@/assets/vinodmisuriya.jpeg";
import doc3 from "@/assets/saurabhshrivastava.jpeg";
import doc4 from "@/assets/satishAgrawal.jpeg";
import doc5 from "@/assets/prakashKumar.jpeg";
import doc6 from "@/assets/prabhatChaurasia.jpeg";
import doc7 from "@/assets/AnkurNeekhra.jpeg";
import doc8 from "@/assets/rajatMisuriya.jpeg";
import doc9 from "@/assets/neelamKumari.jpeg";
import doc10 from "@/assets/amanjeetSingh.jpeg";
import logo from "@/assets/kamla-logo.svg";
import exterior from "@/assets/kamla-exterior.jpeg";
import exteriorWide from "@/assets/kamla-exterior-wide.jpeg";
import ultrasound from "@/assets/kamla-ultrasound.jpeg";
import diagnostic from "@/assets/kamla-diagnostic.jpeg";
import xray from "@/assets/kamla-xray.jpeg";
import lab from "@/assets/kamla-lab.jpeg";
import ward from "@/assets/kamla-ward.jpeg";
import icu from "@/assets/kamla-icu.jpeg";
import ot from "@/assets/kamla-ot.jpeg";
import carm from "@/assets/kamla-carm.jpeg";
import pharmacy from "@/assets/kamla-pharmacy.jpeg";

export type Department = { id: string; name: string; icon: string; description: string; treatments: string[]; };
export type Doctor = { id: string; name: string; specialty: string; departmentId: string; qualifications: string; experience: string; bio: string; availability: string; image: string; highlights?: string[]; };
export type GalleryItem = { id: string; title: string; category: "Hospital" | "Doctors" | "Facilities" | "Events"; image: string; };

export const hospitalInfo = {
  name: "Kamla Hospital",
  tagline: "The spirit to care",
  logo,
  phone: { reception: "05102320775", emergency: "8303792140" },
  email: "kamlahosp6@gmail.com",
  workingHours: { opd: "10:00 AM to 7:00 PM", emergency: "Available 24x7" },
  diagnosticServices: ["X-Ray", "MRI", "CT Scan", "Lab Tests", "Other diagnostic services"],
  address: "Kamla Hospital, Jhansi, Uttar Pradesh",
  mapQuery: "Kamla Hospital Jhansi",
  images: { exterior, exteriorWide, ultrasound, diagnostic, xray, lab, ward, icu, ot, carm, pharmacy },
  facilities: {
    beds: 120,
    criticalCare: ["ICU", "NICU", "ICCU"],
    ambulance: true,
  },
  insurancePartners: [
    "Ayushman Bharat",
    "Pandit Deen Dayal Upadhaya Yojana",
    "HDFC Ergo",
    "SBI General",
    "Universal Sompo",
  ],
};

export const departments: Department[] = [
  { id: "ent", name: "ENT", icon: "Stethoscope", description: "Ear, nose and throat care by experienced ENT specialists.", treatments: ["ENT Consultation", "Hearing Problems", "Sinus Care", "Throat Care", "Minor ENT Procedures"] },
  { id: "gastro-liver", name: "Gastro & Liver", icon: "Activity", description: "Specialized care for digestive, stomach, intestine and liver disorders.", treatments: ["Gastro Consultation", "Liver Disease Care", "Acidity & Ulcer Care", "Digestive Disorder Treatment", "Endoscopy Guidance"] },
  { id: "orthopedics", name: "Orthopedic", icon: "Bone", description: "Diagnosis and treatment for bones, joints, fractures and musculoskeletal conditions.", treatments: ["Fracture Care", "Joint Pain", "Sports Injury", "Back Pain", "Orthopedic Surgery"] },
  { id: "cardiology", name: "Cardiology", icon: "Heart", description: "Heart care services with consultation, monitoring and diagnostic support.", treatments: ["Cardiac Consultation", "ECG", "BP & Heart Monitoring", "Chest Pain Evaluation", "Preventive Heart Care"] },
  { id: "ophthalmology", name: "Ophthalmology", icon: "Eye", description: "Eye care and surgical consultation for vision and eye-related conditions.", treatments: ["Eye Checkup", "Cataract Consultation", "Vision Problems", "Eye Infection", "Ophthalmic Surgery"] },
  { id: "general-pulmonary", name: "General & Pulmonary Medicine", icon: "Stethoscope", description: "General physician care along with chest and pulmonary consultation.", treatments: ["General Consultation", "Fever & Infection", "Breathing Problems", "Asthma/COPD Care", "Pulmonary Consultation"] },
  { id: "dental", name: "Dental & Maxillofacial", icon: "Smile", description: "Dental, oral and maxillofacial surgical care.", treatments: ["Dental Consultation", "Oral Surgery", "Tooth Extraction", "Jaw & Facial Injury", "Dental Procedures"] },
  { id: "gynecology", name: "Gynecology", icon: "Baby", description: "Women’s health, maternity and gynecological care.", treatments: ["Gynecology Consultation", "Pregnancy Care", "Ultrasound Support", "Women’s Health", "Gynecological Surgery"] },
  { id: "neurosurgery", name: "Neurosurgery", icon: "Brain", description: "Specialist consultation for brain, spine and nervous system surgical conditions.", treatments: ["Neurosurgery Consultation", "Spine Problems", "Head Injury", "Brain & Nerve Care", "Surgical Opinion"] },
  { id: "general-surgery", name: "General Surgery", icon: "Activity", description: "Experienced surgical care and consultation for common surgical conditions.", treatments: ["General Surgery", "Minor Procedures", "Abdominal Surgery", "Trauma Care", "Pre/Post Surgery Care"] },
];

export const doctors: Doctor[] = [
  { id: "dr-dinesh-pratap", name: "Dr. Dinesh Pratap", specialty: "General Surgeon", departmentId: "general-surgery", qualifications: "MBBS, MS", experience: "40+ Years", bio: "A senior surgical consultant at Kamla Hospital with extensive experience in patient evaluation, operative care and post-surgical recovery guidance.", availability: hospitalInfo.workingHours.opd, image: doc1, highlights: ["40+ years of clinical and surgical practice", "Trusted guidance for general surgery cases", "Patient-first consultation approach"] },
  { id: "dr-vinod-misuriya", name: "Dr. Vinod Misuriya", specialty: "Otorhinolaryngologist / ENT Specialist", departmentId: "ent", qualifications: "MBBS, MS", experience: "40+ Years", bio: "An experienced ENT specialist treating ear, nose and throat concerns with a practical, careful and compassionate approach.", availability: hospitalInfo.workingHours.opd, image: doc2, highlights: ["40+ years of ENT practice", "Care for sinus, hearing and throat disorders", "Experienced in ENT surgical consultation"] },
  { id: "dr-saurabh-shrivastava", name: "Dr. Saurabh Shrivastava", specialty: "Gastro & Liver Specialist", departmentId: "gastro-liver", qualifications: "MBBS, MD, DM", experience: "5+ Years", bio: "Specialist for digestive system, stomach, intestine and liver-related conditions with a focus on clear diagnosis and treatment planning.", availability: hospitalInfo.workingHours.opd, image: doc3, highlights: ["Gastro and liver disorder consultation", "Advanced qualification in gastroenterology", "Evidence-based treatment planning"] },
  { id: "dr-satish-agarwal", name: "Dr. Satish Agarwal", specialty: "Orthopedic", departmentId: "orthopedics", qualifications: "MBBS, MS", experience: "5+ Years", bio: "Orthopedic specialist providing care for bone, joint, fracture, sports injury and mobility-related problems.", availability: hospitalInfo.workingHours.opd, image: doc4, highlights: ["Fracture and joint pain management", "Orthopedic surgical consultation", "Rehabilitation-focused care"] },
  { id: "dr-prakash-kumar", name: "Dr. Prakash Kumar", specialty: "Cardiologist", departmentId: "cardiology", qualifications: "MBBS, MD", experience: "5+ Years", bio: "Cardiology specialist supporting heart-related consultation, preventive cardiac care and diagnostic guidance.", availability: hospitalInfo.workingHours.opd, image: doc5, highlights: ["Cardiac consultation and monitoring", "Preventive heart care guidance", "Chest pain and BP evaluation"] },
  { id: "dr-prabhat-chaurasia", name: "Dr. Prabhat Chaurasia", specialty: "Ophthalmic Surgeon", departmentId: "ophthalmology", qualifications: "MBBS, MS", experience: "5+ Years", bio: "Ophthalmic surgeon providing eye checkups, vision care and surgical opinion for eye-related conditions.", availability: hospitalInfo.workingHours.opd, image: doc6, highlights: ["Eye care and surgical consultation", "Vision and cataract evaluation", "Patient-friendly treatment advice"] },
  { id: "dr-ankur-neekhra", name: "Dr. Ankur Neekhra", specialty: "General Physician & Pulmonary Specialist", departmentId: "general-pulmonary", qualifications: "MBBS, MD", experience: "5+ Years", bio: "General physician and pulmonary specialist for fever, infections, respiratory problems, asthma/COPD and chest-related concerns.", availability: hospitalInfo.workingHours.opd, image: doc7, highlights: ["General medicine and pulmonary consultation", "Respiratory disease care", "Asthma/COPD and infection management"] },
  { id: "dr-rajat-misuriya", name: "Dr. Rajat Misuriya", specialty: "Oral & Maxillofacial Surgeon", departmentId: "dental", qualifications: "BDS, MDS", experience: "5+ Years", bio: "Oral and maxillofacial surgeon handling dental, jaw, facial injury and oral surgical consultation.", availability: hospitalInfo.workingHours.opd, image: doc8, highlights: ["Oral and maxillofacial procedures", "Dental surgical consultation", "Jaw and facial condition care"] },
  { id: "dr-neelam-kumari", name: "Dr. Neelam Kumari", specialty: "Gynecologist", departmentId: "gynecology", qualifications: "MBBS, MS", experience: "5+ Years", bio: "Gynecologist providing women’s health consultation, pregnancy care, ultrasound guidance and gynecological surgical opinion.", availability: hospitalInfo.workingHours.opd, image: doc9, highlights: ["Women’s health and maternity care", "Gynecological consultation", "Pregnancy and ultrasound support"] },
  { id: "dr-amanjeet-singh-kindra", name: "Dr. Amanjeet Singh Kindra", specialty: "Neurosurgeon", departmentId: "neurosurgery", qualifications: "MBBS, M.Ch", experience: "5+ Years", bio: "Neurosurgeon providing expert consultation for brain, spine and nervous-system surgical conditions.", availability: hospitalInfo.workingHours.opd, image: doc10, highlights: ["Brain and spine consultation", "Neurosurgical opinion", "Head injury and nerve care guidance"] },
];

export const testimonials = [
  { name: "Patient Family", role: "Emergency care", text: "Kamla Hospital team provided timely support and caring treatment during an emergency.", rating: 5 },
  { name: "OPD Patient", role: "Consultation", text: "Doctors explained everything clearly and the staff was helpful throughout the visit.", rating: 5 },
  { name: "Diagnostic Patient", role: "Diagnostics", text: "X-Ray, lab and diagnostic services were available smoothly under one roof.", rating: 5 },
];

export const faqs = [
  { q: "How can I book an appointment?", a: `You can call reception at ${hospitalInfo.phone.reception} or visit the hospital during OPD timing: ${hospitalInfo.workingHours.opd}.` },
  { q: "Is emergency care available 24/7?", a: `Yes. Emergency service is ${hospitalInfo.workingHours.emergency}. Call ${hospitalInfo.phone.emergency}.` },
  { q: "What diagnostic services are available?", a: `${hospitalInfo.name} provides ${hospitalInfo.diagnosticServices.join(", ")}.` },
  { q: "What are the OPD timings?", a: `OPD Timing: ${hospitalInfo.workingHours.opd}. Emergency: ${hospitalInfo.workingHours.emergency}.` },
];


export const galleryItems: GalleryItem[] = [
  { id: "hospital-front", title: "Kamla Hospital Front View", category: "Hospital", image: exterior },
  { id: "hospital-wide", title: "Hospital Main Building", category: "Hospital", image: exteriorWide },
  { id: "ultrasound", title: "Ultrasound Room", category: "Facilities", image: ultrasound },
  { id: "xray", title: "X-Ray Facility", category: "Facilities", image: xray },
  { id: "diagnostic", title: "Diagnostic Desk", category: "Facilities", image: diagnostic },
  { id: "lab", title: "Lab & Testing Area", category: "Facilities", image: lab },
  { id: "ward", title: "Patient Ward", category: "Hospital", image: ward },
  { id: "icu", title: "ICU Care Area", category: "Facilities", image: icu },
  { id: "ot", title: "Operation Theatre", category: "Facilities", image: ot },
  { id: "carm", title: "C-Arm Facility", category: "Facilities", image: carm },
  { id: "pharmacy", title: "Ratna Medical Store", category: "Hospital", image: pharmacy },
  { id: "doctor-care", title: "Doctor Consultation Moment", category: "Doctors", image: ultrasound },
];
