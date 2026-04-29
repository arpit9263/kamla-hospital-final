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

const AppointmentForm = () => {
  const [params] = useSearchParams();
  const preselectedDoctor = params.get("doctor") || "";
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    department: "",
    doctor: preselectedDoctor,
    date: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.department || !form.date) {
      toast.error("Please fill all required fields");
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
        <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>
          Book another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-5">
      <div>
        <Label htmlFor="name" className="mb-1.5 flex items-center gap-2"><User className="w-3.5 h-3.5" /> Full name *</Label>
        <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </div>
      <div>
        <Label htmlFor="phone" className="mb-1.5 flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> Phone *</Label>
        <Input id="phone" type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      </div>
      <div className="sm:col-span-2">
        <Label htmlFor="email" className="mb-1.5 flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> Email</Label>
        <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </div>
      <div>
        <Label className="mb-1.5 flex items-center gap-2"><Stethoscope className="w-3.5 h-3.5" /> Department *</Label>
        <Select value={form.department} onValueChange={(v) => setForm({ ...form, department: v })}>
          <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
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
          <SelectTrigger><SelectValue placeholder="Any available" /></SelectTrigger>
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
        <Input id="date" type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
      </div>
      <div className="sm:col-span-2">
        <Label htmlFor="message" className="mb-1.5 flex items-center gap-2"><MessageSquare className="w-3.5 h-3.5" /> Message</Label>
        <Textarea id="message" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Briefly describe your concern..." />
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" variant="hero" size="lg" className="w-full">
          Request Appointment
        </Button>
      </div>
    </form>
  );
};

export default AppointmentForm;
