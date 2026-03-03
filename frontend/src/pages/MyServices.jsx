import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Gauge, 
  Globe, 
  Headphones, 
  Tv, 
  Shield, 
  Zap,
  Server,
  Wifi,
  ArrowRight
} from "lucide-react";

const services = [
  {
    icon: Gauge,
    title: "Speed Boost",
    description: "Temporarily upgrade your connection speed for demanding tasks like large downloads or 4K streaming.",
    features: ["2x Speed for 24 hours", "On-demand activation", "Pay per use"],
    highlighted: true,
    span: "md:col-span-2"
  },
  {
    icon: Globe,
    title: "Static IP",
    description: "Get a dedicated IP address for hosting servers, remote access, or enhanced security.",
    features: ["Dedicated IPv4", "99.9% uptime", "Business ready"],
    highlighted: false,
    span: ""
  },
  {
    icon: Headphones,
    title: "24/7 Premium Support",
    description: "Priority technical assistance from our expert team, available round the clock.",
    features: ["Instant response", "Remote diagnostics", "Dedicated agent"],
    highlighted: false,
    span: ""
  },
  {
    icon: Tv,
    title: "OTT Bundles",
    description: "Access popular streaming platforms bundled with your internet plan at discounted rates.",
    features: ["Netflix, Prime, Hotstar", "Up to 40% savings", "Single billing"],
    highlighted: true,
    span: "md:col-span-2 lg:col-span-1"
  },
  {
    icon: Shield,
    title: "Network Security",
    description: "Enterprise-grade protection against malware, phishing, and cyber threats.",
    features: ["Real-time protection", "Parental controls", "Ad blocking"],
    highlighted: false,
    span: ""
  },
  {
    icon: Zap,
    title: "Express Installation",
    description: "Get connected within 24 hours of registration with our express service.",
    features: ["Same-day setup", "Free equipment", "Expert technician"],
    highlighted: false,
    span: ""
  },
  {
    icon: Server,
    title: "Business Solutions",
    description: "Tailored connectivity solutions for enterprises with SLA guarantees.",
    features: ["99.99% SLA", "Dedicated bandwidth", "VPN support"],
    highlighted: false,
    span: ""
  },
  {
    icon: Wifi,
    title: "Mesh WiFi Coverage",
    description: "Extend your WiFi coverage to every corner of your home or office.",
    features: ["Seamless roaming", "Up to 5000 sq ft", "Easy app control"],
    highlighted: false,
    span: ""
  }
];

export default function MyServices() {
  return (
    <div className="pt-24 pb-16 min-h-screen" data-testid="services-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-['Outfit'] text-4xl sm:text-5xl font-bold mb-4">
            Our <span className="text-cyan-400">Services</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Beyond just internet. Explore our range of value-added services designed to enhance your digital experience.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`glass rounded-xl p-6 card-hover ${service.span} ${
                service.highlighted ? 'ring-1 ring-cyan-500/30' : ''
              }`}
              data-testid={`service-card-${index}`}
            >
              <div className={`icon-container mb-5 ${
                service.highlighted ? 'bg-cyan-500/20 border-cyan-500/30' : ''
              }`}>
                <service.icon className={`w-6 h-6 ${
                  service.highlighted ? 'text-cyan-400' : 'text-gray-400'
                }`} />
              </div>
              
              <h3 className="font-['Outfit'] text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">{service.description}</p>
              
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i} className="text-gray-300 text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 glass rounded-xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 hero-glow opacity-50" />
          <div className="relative">
            <h2 className="font-['Outfit'] text-2xl sm:text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-8">
              Choose from our range of plans and add any services you need. 
              Our team will help you customize the perfect package.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/plans">
                <Button 
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8"
                  data-testid="services-view-plans-btn"
                >
                  View Plans
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  variant="outline"
                  className="border-white/20 hover:bg-white/10"
                  data-testid="services-contact-btn"
                >
                  Talk to Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
