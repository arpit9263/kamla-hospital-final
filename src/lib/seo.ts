import { doctors, hospitalInfo } from "@/data/hospital";

export const SITE_URL = "https://kamlahospitaljhansi.in";
export const DEVELOPER_NAME = "Rewan Tech Solutions";
export const DEVELOPER_URL = "https://rewantechsolutions.com/";
export const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

export const seoKeywords = [
  "Kamla Hospital",
  "Kamla Hospital Jhansi",
  "Kamla Hospital Jhansi Uttar Pradesh",
  "best hospital in Jhansi",
  "multi specialty hospital in Jhansi",
  "private hospital in Jhansi",
  "emergency hospital in Jhansi",
  "24x7 emergency care Jhansi",
  "ICU hospital in Jhansi",
  "NICU hospital in Jhansi",
  "ICCU care Jhansi",
  "Ayushman Bharat hospital Jhansi",
  "PM-JAY hospital Jhansi",
  "cashless treatment hospital Jhansi",
  "ENT specialist Jhansi",
  "gastroenterologist Jhansi",
  "liver specialist Jhansi",
  "orthopedic doctor Jhansi",
  "joint pain doctor Jhansi",
  "cardiologist Jhansi",
  "ophthalmologist Jhansi",
  "gynecologist Jhansi",
  "general surgeon Jhansi",
  "diagnostic center Jhansi",
  "X Ray MRI CT Scan Jhansi",
  "ambulance service Jhansi",
].join(", ");

export type SeoConfig = {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  image?: string;
  structuredData?: Record<string, unknown>;
};

export const hospitalStructuredData = {
  "@context": "https://schema.org",
  "@type": "Hospital",
  name: hospitalInfo.name,
  alternateName: `${hospitalInfo.name}, Jhansi`,
  slogan: hospitalInfo.tagline,
  url: SITE_URL,
  logo: `${SITE_URL}/kamla-hospital-official-logo.jpg`,
  image: DEFAULT_IMAGE,
  telephone: [`+91-${hospitalInfo.phone.emergency}`, hospitalInfo.phone.reception],
  email: hospitalInfo.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: hospitalInfo.address,
    addressLocality: "Jhansi",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
      description: "Emergency available 24x7",
    },
  ],
  medicalSpecialty: [
    "Emergency Medicine",
    "Otolaryngology",
    "Gastroenterology",
    "Orthopedic",
    "Cardiology",
    "Ophthalmology",
    "Gynecology",
    "General Surgery",
  ],
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "120 beds", value: true },
    { "@type": "LocationFeatureSpecification", name: "ICU, NICU and ICCU", value: true },
    { "@type": "LocationFeatureSpecification", name: "Ambulance service", value: true },
    { "@type": "LocationFeatureSpecification", name: "X-Ray, MRI, CT Scan and Lab Tests", value: true },
  ],
  founder: {
    "@type": "Person",
    name: "Dr. Vinod Misuriya",
    jobTitle: "Founder & Chairman",
  },
  employee: [
    {
      "@type": "Person",
      name: "Rajat Misuriya",
      jobTitle: "Managing Director",
    },
    {
      "@type": "Person",
      name: "Archna Misuriya",
      jobTitle: "Managing Director",
    },
  ],
  creator: {
    "@type": "Organization",
    name: DEVELOPER_NAME,
    url: DEVELOPER_URL,
  },
};

export const routeSeo: Record<string, SeoConfig> = {
  "/": {
    title: "Kamla Hospital Jhansi | Multi-Specialty Hospital & 24x7 Emergency Care",
    description:
      "Kamla Hospital Jhansi offers trusted multi-specialty healthcare, 24x7 emergency care, ICU/NICU/ICCU, diagnostics, surgery, Ayushman Bharat assistance and experienced doctors.",
    canonicalPath: "/",
    structuredData: hospitalStructuredData,
  },
  "/about": {
    title: "About Kamla Hospital Jhansi | Best Multi-Specialty Hospital in Jhansi Since 1998",
    description:
      "Kamla Hospital Jhansi is a leading multi-specialty hospital in Jhansi with 40+ years of trust, 120 beds, ICU/NICU/ICCU, 24x7 emergency, advanced diagnostics and Ayushman Bharat support — founded by Dr. Vinod Misuriya.",
    canonicalPath: "/about",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About Kamla Hospital Jhansi",
      description: "About one of the best multi-specialty hospitals in Jhansi — leadership, mission, infrastructure and 24x7 emergency care.",
      url: `${SITE_URL}/about`,
      mainEntity: hospitalStructuredData,
    },
  },
  "/departments": {
    title: "Departments at Kamla Hospital Jhansi | Cardiology, Cardio Thoracic Surgery & Surgical Care",
    description:
      "Explore Kamla Hospital Jhansi departments including Cardiology, Cardio Thoracic Surgery, General Surgery, General Medicine, Pulmonary Medicine, ENT, Orthopedics & Paediatrics, Dental & Maxillofacial, Gastro & Liver, Ophthalmology, Gynecology and Neurosurgery.",
    canonicalPath: "/departments",
  },
  "/doctors": {
    title: "Doctors at Kamla Hospital Jhansi | Experienced Specialist Consultation",
    description:
      "Find experienced doctors and specialists at Kamla Hospital Jhansi for ENT, Gastro & Liver, Orthopedic, Cardiology, Ophthalmology, Gynecology, emergency and surgery care.",
    canonicalPath: "/doctors",
  },
  "/ayushman-bharat": {
    title: "Ayushman Bharat Hospital in Jhansi | PM-JAY Cashless Treatment at Kamla Hospital",
    description:
      "Kamla Hospital Jhansi is empanelled under Ayushman Bharat (PM-JAY) — get eligibility check, document verification, cashless treatment for approved packages, ICU care and 24x7 emergency support.",
    canonicalPath: "/ayushman-bharat",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Is Kamla Hospital Jhansi empanelled under Ayushman Bharat (PM-JAY)?", acceptedAnswer: { "@type": "Answer", text: "Yes. Kamla Hospital Jhansi supports eligible Ayushman Bharat beneficiaries with cashless treatment for approved packages as per PM-JAY rules." } },
        { "@type": "Question", name: "How do I check if I am eligible for PM-JAY?", acceptedAnswer: { "@type": "Answer", text: "Check eligibility on the official PM-JAY beneficiary portal or visit our help desk at Kamla Hospital Jhansi with your Aadhaar — our team will assist you." } },
        { "@type": "Question", name: "What documents do I need to bring?", acceptedAnswer: { "@type": "Answer", text: "Ayushman card / PM-JAY ID, Aadhaar card, mobile number for OTP and any previous medical reports or admission advice from your doctor." } },
        { "@type": "Question", name: "How much treatment cost is covered?", acceptedAnswer: { "@type": "Answer", text: "PM-JAY provides up to ₹5 lakh per family per year for approved treatment packages, subject to scheme rules and package availability." } },
      ],
    },
  },
  "/gallery": {
    title: "Gallery | Kamla Hospital Jhansi Infrastructure, Facilities & Patient Care",
    description:
      "View Kamla Hospital Jhansi gallery featuring hospital infrastructure, diagnostic facilities, ICU/NICU areas, patient care spaces, doctors and special moments.",
    canonicalPath: "/gallery",
  },
  "/services": {
    title: "Hospital Services in Jhansi | Emergency, ICU, Diagnostics & Surgery",
    description:
      "Kamla Hospital Jhansi offers 24x7 emergency care, OPD consultation, diagnostics, ICU/NICU/ICCU, surgery, ambulance support, health packages and patient services.",
    canonicalPath: "/services",
  },
  "/appointment": {
    title: "Book Appointment at Kamla Hospital Jhansi | OPD & Specialist Consultation",
    description:
      "Book an appointment with Kamla Hospital Jhansi for specialist consultation, OPD services, diagnostics, emergency guidance and healthcare support.",
    canonicalPath: "/appointment",
  },
  "/contact": {
    title: "Contact Kamla Hospital Jhansi | Emergency, Appointment & Directions",
    description:
      "Contact Kamla Hospital Jhansi for appointments, emergency support, OPD timings, diagnostics, ambulance help, directions and patient service assistance.",
    canonicalPath: "/contact",
  },
};

export const getDoctorSeo = (doctorId?: string): SeoConfig | undefined => {
  const doctor = doctors.find((d) => d.id === doctorId);
  if (!doctor) return undefined;

  return {
    title: `${doctor.name} | ${doctor.specialty} at Kamla Hospital Jhansi`,
    description: `${doctor.name}, ${doctor.qualifications}, is a ${doctor.specialty} at Kamla Hospital Jhansi with ${doctor.experience} experience. View profile, availability and consultation details.`,
    canonicalPath: `/doctors/${doctor.id}`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Physician",
      name: doctor.name,
      medicalSpecialty: doctor.specialty,
      hasCredential: doctor.qualifications,
      worksFor: {
        "@type": "Hospital",
        name: hospitalInfo.name,
        url: SITE_URL,
      },
      url: `${SITE_URL}/doctors/${doctor.id}`,
    },
  };
};
