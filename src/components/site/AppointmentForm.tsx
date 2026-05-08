import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Calendar, User, Phone, Mail, Stethoscope, MessageSquare, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { departments, doctors } from "@/data/hospital";
import { toast } from "sonner";
import { submitToFormspree } from "@/lib/formspree";

const APPOINTMENT_FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_APPOINTMENT_ENDPOINT || "https://formspree.io/f/mpqbjnob";

const AppointmentForm = () => {
  const [params] = useSearchParams();
  const preselectedDoctor = params.get("doctor") || "";
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    department: "",
    doctor: preselectedDoctor,
    date: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const phoneOk = /^[6-9]\d{9}$/.test(form.phone.trim());
    const selectedDate = form.date ? new Date(form.date + "T00:00:00") : null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!form.name.trim() || !form.phone.trim() || !form.department || !form.date) {
      toast.error("Please fill all required fields");
      return;
    }
    if (!phoneOk) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (selectedDate && selectedDate < today) {
      toast.error("Please select today or a future appointment date");
      return;
    }
    setIsSubmitting(true);
    const selectedDoctor = doctors.find((d) => d.id === form.doctor);
    const selectedDepartment = departments.find((d) => d.id === form.department);
    const result = await submitToFormspree(APPOINTMENT_FORMSPREE_ENDPOINT, {
      formType: "Appointment Request",
      name: form.name,
      phone: form.phone,
      email: form.email || "Not provided",
      department: selectedDepartment?.name || form.department,
      doctor: selectedDoctor?.name || "Any available",
      preferredDate: form.date,
      message: form.message || "Not provided",
      page: window.location.href,
    });
    setIsSubmitting(false);

    if (!result.ok) {
      toast.error(result.message);
      return;
    }

    setSubmitted(true);
    toast.success("Appointment request received! We'll call you shortly.");
  };

  if (submitted) {
    return (
      <div className="text-center py-12 animate-scale-in">
        <div className="w-20 h-20 rounded-full bg-accent text-primary flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="font-display text-2xl font-bold mb-2">Appointment Requested!</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Thank you, {form.name}. Our team will call you on {form.phone} within 30 minutes to confirm your appointment.
        </p>
        <Button variant="outline" className="mt-6" aria-label="Book another appointment" onClick={() => setSubmitted(false)}>
          Book another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-5" aria-label="Book appointment form">
      <div>
        <Label htmlFor="name" className="mb-1.5 flex items-center gap-2"><User className="w-3.5 h-3.5" /> Full name *</Label>
        <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </div>
      <div>
        <Label htmlFor="phone" className="mb-1.5 flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> Phone *</Label>
        <Input id="phone" type="tel" inputMode="numeric" required placeholder="10-digit mobile number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })} />
      </div>
      <div className="sm:col-span-2">
        <Label htmlFor="email" className="mb-1.5 flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> Email</Label>
        <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </div>
      <div>
        <Label className="mb-1.5 flex items-center gap-2"><Stethoscope className="w-3.5 h-3.5" /> Department *</Label>
        <Select value={form.department} onValueChange={(v) => setForm({ ...form, department: v })}>
          <SelectTrigger aria-label="Select department"><SelectValue placeholder="Select department" /></SelectTrigger>
          <SelectContent>
            {departments.map((d) => (
              <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="mb-1.5 flex items-center gap-2"><User className="w-3.5 h-3.5" /> Preferred doctor</Label>
        <Select value={form.doctor} onValueChange={(v) => setForm({ ...form, doctor: v })}>
          <SelectTrigger aria-label="Select preferred doctor"><SelectValue placeholder="Any available" /></SelectTrigger>
          <SelectContent>
            {doctors
              .filter((d) => !form.department || d.departmentId === form.department)
              .map((d) => (
                <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      <div className="sm:col-span-2">
        <Label htmlFor="date" className="mb-1.5 flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> Preferred date *</Label>
        <Input id="date" type="date" required min={new Date().toISOString().split("T")[0]} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
      </div>
      <div className="sm:col-span-2">
        <Label htmlFor="message" className="mb-1.5 flex items-center gap-2"><MessageSquare className="w-3.5 h-3.5" /> Message</Label>
        <Textarea id="message" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Briefly describe your concern..." />
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" variant="hero" size="lg" className="w-full" aria-label="Submit appointment request" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Request Appointment"}
        </Button>
      </div>
    </form>
  );
};

export default AppointmentForm;
