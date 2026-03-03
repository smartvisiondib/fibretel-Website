import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Shield, Clock, Headphones, CheckCircle } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const trustIndicators = [
  { icon: Shield, text: "Secure & Encrypted" },
  { icon: Clock, text: "Quick Installation" },
  { icon: Headphones, text: "24/7 Support" },
];

export default function NewConnection() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    plan_id: searchParams.get("plan") || "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get(`${API}/plans`);
      setPlans(response.data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    } finally {
      setLoading(false);
    }
  };

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
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }
    
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    
    if (!formData.plan_id) {
      newErrors.plan_id = "Please select a plan";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handlePlanChange = (value) => {
    setFormData(prev => ({ ...prev, plan_id: value }));
    if (errors.plan_id) {
      setErrors(prev => ({ ...prev, plan_id: "" }));
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
      const selectedPlan = plans.find(p => p.id === formData.plan_id);
      const payload = {
        ...formData,
        plan_name: selectedPlan?.name || ""
      };

      await axios.post(`${API}/connections`, payload);
      setSubmitted(true);
      toast.success("Application submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center" data-testid="success-screen">
        <div className="glass rounded-xl p-12 max-w-lg text-center">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="font-['Outfit'] text-2xl font-bold mb-4">Application Submitted!</h2>
          <p className="text-gray-400 mb-8">
            Thank you for choosing CyberNet. Our team will contact you within 24 hours to schedule your installation.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={() => navigate("/")}
              variant="outline"
              className="border-white/20 hover:bg-white/10"
              data-testid="back-home-btn"
            >
              Back to Home
            </Button>
            <Button 
              onClick={() => navigate("/plans")}
              className="bg-cyan-500 hover:bg-cyan-400 text-black"
              data-testid="view-plans-btn"
            >
              View Plans
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen" data-testid="new-connection-page">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h1 className="font-['Outfit'] text-4xl sm:text-5xl font-bold mb-4">
                Get <span className="text-cyan-400">Connected</span>
              </h1>
              <p className="text-gray-400 text-lg">
                Fill out the form below and our team will contact you within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="glass rounded-xl p-8" data-testid="connection-form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      errors.name ? 'border-red-500' : ''
                    }`}
                    data-testid="input-name"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm" data-testid="error-name">{errors.name}</p>
                  )}
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
                      errors.email ? 'border-red-500' : ''
                    }`}
                    data-testid="input-email"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm" data-testid="error-email">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-300">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    className={`bg-white/5 border-white/10 focus:border-cyan-500 ${
                      errors.phone ? 'border-red-500' : ''
                    }`}
                    data-testid="input-phone"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm" data-testid="error-phone">{errors.phone}</p>
                  )}
                </div>

                {/* Plan Selection */}
                <div className="space-y-2">
                  <Label htmlFor="plan" className="text-gray-300">Select Plan *</Label>
                  <Select value={formData.plan_id} onValueChange={handlePlanChange}>
                    <SelectTrigger 
                      className={`bg-white/5 border-white/10 focus:border-cyan-500 ${
                        errors.plan_id ? 'border-red-500' : ''
                      }`}
                      data-testid="select-plan-trigger"
                    >
                      <SelectValue placeholder="Choose a plan" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0f172a] border-white/10">
                      {plans.map((plan) => (
                        <SelectItem 
                          key={plan.id} 
                          value={plan.id}
                          className="focus:bg-cyan-500/20"
                          data-testid={`plan-option-${plan.id}`}
                        >
                          {plan.name} - {plan.speed} - ₹{plan.price}/mo
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.plan_id && (
                    <p className="text-red-400 text-sm" data-testid="error-plan">{errors.plan_id}</p>
                  )}
                </div>

                {/* Address */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address" className="text-gray-300">Installation Address *</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Main Street, City, State - 123456"
                    className={`bg-white/5 border-white/10 focus:border-cyan-500 ${
                      errors.address ? 'border-red-500' : ''
                    }`}
                    data-testid="input-address"
                  />
                  {errors.address && (
                    <p className="text-red-400 text-sm" data-testid="error-address">{errors.address}</p>
                  )}
                </div>
              </div>

              <Button 
                type="submit"
                disabled={submitting}
                className="w-full mt-8 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold h-12 btn-cyber"
                data-testid="submit-connection-btn"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </form>
          </div>

          {/* Trust Indicators */}
          <div className="lg:col-span-1">
            <div className="glass rounded-xl p-8 sticky top-24">
              <h3 className="font-['Outfit'] text-xl font-bold mb-6">Why CyberNet?</h3>
              <div className="space-y-6">
                {trustIndicators.map((item, index) => (
                  <div key={index} className="flex items-start gap-4" data-testid={`trust-indicator-${index}`}>
                    <div className="icon-container shrink-0" style={{ width: 48, height: 48 }}>
                      <item.icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-gray-400 text-sm mb-4">
                  Need help choosing a plan?
                </p>
                <p className="font-['JetBrains_Mono'] text-cyan-400 text-lg">
                  1800-123-4567
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Available 24/7
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
