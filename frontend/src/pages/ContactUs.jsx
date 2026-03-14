import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Loader2, CheckCircle } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const contactInfo = [
{
  icon: Phone,
  title: "Phone",
  value: "+91 8876658209",
  subtitle: "Available 24/7 on whatsapp / Call during business hours"
},
{
  icon: Mail,
  title: "Email",
  value: "fibreteldib@gmail.com",
  subtitle: "We reply within 2 hours"
},
{
  icon: MapPin,
  title: "Address",
  value: "Jhalukpara Road,  New Market ",
  subtitle: "Silicon Valley, CA 94000"
},
{
  icon: Clock,
  title: "Working Hours",
  value: "24/7 Support",
  subtitle: "Always available for you"
}];


export default function ContactUs() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    setSubmitting(true);

    try {
      await axios.post(`${API}/contact`, formData);
      setSubmitted(true);
      toast.success("Message sent successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center" data-testid="contact-success">
        <div className="glass rounded-xl p-12 max-w-lg text-center">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="font-['Outfit'] text-2xl font-bold mb-4">Message Sent!</h2>
          <p className="text-gray-400 mb-8">
            Thank you for reaching out. Our team will get back to you within 2 hours.
          </p>
          <Button
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
            }}
            className="bg-cyan-500 hover:bg-cyan-400 text-black"
            data-testid="send-another-btn">

            Send Another Message
          </Button>
        </div>
      </div>);

  }

  return (
    <div className="pt-24 pb-16 min-h-screen" data-testid="contact-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-['Outfit'] text-4xl sm:text-5xl font-bold mb-4">
            Get in <span className="text-cyan-400">Touch</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="font-['Outfit'] text-2xl font-bold mb-8">Contact Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) =>
              <div
                key={index}
                className="glass rounded-xl p-6 card-hover"
                data-testid={`contact-info-${index}`}>

                  <div className="icon-container mb-4">
                    <info.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="font-medium text-white mb-1">{info.title}</h3>
                  <p className="text-cyan-400 font-['JetBrains_Mono'] text-sm">{info.value}</p>
                  <p className="text-gray-500 text-sm mt-1">{info.subtitle}</p>
                </div>
              )}
            </div>

            {/* Map placeholder */}
            <div className="mt-8 glass rounded-xl overflow-hidden h-64 relative">
              <div className="absolute inset-0 bg-[#0f172a] flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-cyan-400/50 mx-auto mb-3" />
                  <p className="text-gray-500">123 Tech Park, Silicon Valley</p>
                  <p className="text-gray-600 text-sm">CA 94000, USA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="font-['Outfit'] text-2xl font-bold mb-8">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="glass rounded-xl p-8" data-testid="contact-form">
              <div className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`bg-white/5 border-white/10 focus:border-cyan-500 ${
                    errors.name ? 'border-red-500' : ''}`
                    }
                    data-testid="contact-input-name" />

                  {errors.name &&
                  <p className="text-red-400 text-sm">{errors.name}</p>
                  }
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={`bg-white/5 border-white/10 focus:border-cyan-500 ${
                    errors.email ? 'border-red-500' : ''}`
                    }
                    data-testid="contact-input-email" />

                  {errors.email &&
                  <p className="text-red-400 text-sm">{errors.email}</p>
                  }
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-300">Phone Number (Optional)</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    className="bg-white/5 border-white/10 focus:border-cyan-500"
                    data-testid="contact-input-phone" />

                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-gray-300">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className={`bg-white/5 border-white/10 focus:border-cyan-500 ${
                    errors.subject ? 'border-red-500' : ''}`
                    }
                    data-testid="contact-input-subject" />

                  {errors.subject &&
                  <p className="text-red-400 text-sm">{errors.subject}</p>
                  }
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-300">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    className={`bg-white/5 border-white/10 focus:border-cyan-500 resize-none ${
                    errors.message ? 'border-red-500' : ''}`
                    }
                    data-testid="contact-input-message" />

                  {errors.message &&
                  <p className="text-red-400 text-sm">{errors.message}</p>
                  }
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold h-12 btn-cyber"
                  data-testid="submit-contact-btn">

                  {submitting ?
                  <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </> :

                  "Send Message"
                  }
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>);

}