import { Ambulance, Award, Baby, Clock, HeartPulse, ShieldCheck, Stethoscope, Users, type LucideIcon } from "lucide-react";
import { hospitalInfo } from "@/data/hospital";

export type Slide = {
  id: string;
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  titleEnd?: string;
  description: string;
  image: string;
  ctaPrimary: { label: string; to: string };
  ctaSecondary: { label: string; to: string };
  icon: LucideIcon;
  tag: string;
};

export type HeroStat = {
  icon: LucideIcon;
  value: string;
  label: string;
};

export const slides: Slide[] = [
  {
    id: "care",
    eyebrow: "NABH Accredited Multi-Specialty",
    titleStart: "Compassionate care,",
    titleAccent: "advanced medicine",
    titleEnd: ".",
    description:
      "Specialist doctors, emergency care and diagnostic services under one roof with a patient-first approach.",
    image: hospitalInfo.images.exteriorWide,
    ctaPrimary: { label: "Book Appointment", to: "/appointment" },
    ctaSecondary: { label: "Find a Doctor", to: "/doctors" },
    icon: Stethoscope,
    tag: "Multi-Specialty",
  },
  {
    id: "emergency",
    eyebrow: "24/7 Emergency Response",
    titleStart: "Every second counts.",
    titleAccent: "We're ready",
    titleEnd: ".",
    description:
      "Emergency care is available 24x7 with medical support and critical care facilities.",
    image: hospitalInfo.images.icu,
    ctaPrimary: { label: "Call Emergency", to: `tel:${hospitalInfo.phone.emergency}` },
    ctaSecondary: { label: "Emergency Services", to: "/services" },
    icon: Ambulance,
    tag: "Emergency",
  },
  {
    id: "cardiac",
    eyebrow: "Diagnostic Services",
    titleStart: "Advanced",
    titleAccent: "diagnostics",
    titleEnd: ".",
    description:
      "X-Ray, MRI, CT Scan, lab tests and other diagnostic services available at Kamla Hospital.",
    image: hospitalInfo.images.diagnostic,
    ctaPrimary: { label: "View Services", to: "/departments" },
    ctaSecondary: { label: "Meet Doctors", to: "/doctors" },
    icon: HeartPulse,
    tag: "Diagnostics",
  },
  {
    id: "family",
    eyebrow: "OPD & Patient Care",
    titleStart: "Care for",
    titleAccent: "every patient",
    titleEnd: ".",
    description:
      "OPD Timing: 10:00 AM to 7:00 PM, with emergency support available 24x7.",
    image: hospitalInfo.images.ward,
    ctaPrimary: { label: "Book a Visit", to: "/appointment" },
    ctaSecondary: { label: "View Services", to: "/services" },
    icon: Baby,
    tag: "Family Care",
  },
];

export const stats: HeroStat[] = [
  { icon: Users, value: "10", label: "Specialist Doctors" },
  { icon: Award, value: "5+", label: "Key Specialties" },
  { icon: ShieldCheck, value: "24x7", label: "Emergency" },
  { icon: Clock, value: "10 AM-7 PM", label: "OPD Timing" },
];
