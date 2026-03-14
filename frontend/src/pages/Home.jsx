import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, Shield, Clock, Headphones, ArrowRight, Check } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Blazing Fast",
    description: "Up to 1 Gbps speeds with fiber optic technology"
  },
  {
    icon: Shield,
    title: "Secure Network",
    description: "Enterprise-grade security with DDoS protection"
  },
  {
    icon: Clock,
    title: "99.9% Uptime",
    description: "Reliable connection backed by our SLA guarantee"
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Expert technical support available round the clock"
  }
];

const popularPlans = [
  { name: "Basic", speed: "60 Mbps", price: 649 },
  { name: "Enjoy", speed: "125 Mbps", price: 1049 },
  { name: "Business Pro", speed: "200 Mbps", price: 2299 }
];

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden" data-testid="hero-section">
        {/* Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1618601594350-35e891030820?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHwzfHxmaWJlciUyMG9wdGljJTIwbGlnaHRzJTIwZGFyayUyMGJhY2tncm91bmR8ZW58MHx8fHwxNzcyNTYyODc3fDA&ixlib=rb-4.1.0&q=85')`
          }}
        />
        <div className="absolute inset-0 bg-[#030712]/80" />
        <div className="absolute inset-0 hero-glow" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-['Outfit'] text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
            <span className="text-white">Lightning Fast</span>
            <br />
            <span className="gradient-text">Internet For Everyone</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 animate-fade-in-up stagger-1">
            Experience next-generation broadband with speeds up to 1 Gbps. 
            Perfect for streaming, gaming, and remote work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-2">
            <Link to="/plans">
              <Button 
                size="lg"
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 h-12 btn-cyber"
                data-testid="hero-view-plans-btn"
              >
                View Plans
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/new-connection">
              <Button 
                size="lg"
                variant="outline"
                className="border-white/20 hover:bg-white/10 text-white px-8 h-12"
                data-testid="hero-get-connected-btn"
              >
                Get Connected
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 animate-fade-in-up stagger-3">
            <div className="glass rounded-xl p-6">
              <div className="font-['JetBrains_Mono'] text-3xl font-bold text-cyan-400">1Gbps</div>
              <div className="text-gray-400 text-sm mt-1">Max Speed</div>
            </div>
            <div className="glass rounded-xl p-6">
              <div className="font-['JetBrains_Mono'] text-3xl font-bold text-cyan-400">50K+</div>
              <div className="text-gray-400 text-sm mt-1">Happy Users</div>
            </div>
            <div className="glass rounded-xl p-6">
              <div className="font-['JetBrains_Mono'] text-3xl font-bold text-cyan-400">99.9%</div>
              <div className="text-gray-400 text-sm mt-1">Uptime</div>
            </div>
            <div className="glass rounded-xl p-6">
              <div className="font-['JetBrains_Mono'] text-3xl font-bold text-cyan-400">24/7</div>
              <div className="text-gray-400 text-sm mt-1">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 grid-overlay" data-testid="features-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-['Outfit'] text-3xl sm:text-4xl font-bold mb-4">
              Why Choose <span className="text-cyan-400">CyberNet</span>?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We deliver more than just internet. Experience the difference with our premium features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="glass rounded-xl p-8 card-hover"
                data-testid={`feature-card-${index}`}
              >
                <div className="icon-container mb-6">
                  <feature.icon className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="font-['Outfit'] text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Plans Preview */}
      <section className="py-24 bg-[#0a0f1a]" data-testid="popular-plans-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-['Outfit'] text-3xl sm:text-4xl font-bold mb-4">
              Popular <span className="text-cyan-400">Plans</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Choose from our most loved plans, designed for every need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularPlans.map((plan, index) => (
              <div 
                key={plan.name}
                className="glass rounded-xl p-8 card-hover relative"
                data-testid={`popular-plan-${index}`}
              >
                {index === 1 && (
                  <div className="popular-badge">Most Popular</div>
                )}
                <h3 className="font-['Outfit'] text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="font-['JetBrains_Mono'] text-cyan-400 text-lg mb-6">{plan.speed}</div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-['JetBrains_Mono'] text-4xl font-bold">₹{plan.price}</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-gray-300 text-sm">
                    <Check className="w-4 h-4 text-cyan-400" />
                    Unlimited Data
                  </li>
                  <li className="flex items-center gap-3 text-gray-300 text-sm">
                    <Check className="w-4 h-4 text-cyan-400" />
                    Free Router
                  </li>
                  <li className="flex items-center gap-3 text-gray-300 text-sm">
                    <Check className="w-4 h-4 text-cyan-400" />
                    24/7 Support
                  </li>
                </ul>
                <Link to="/new-connection">
                  <Button 
                    className="w-full bg-cyan-500/20 hover:bg-cyan-500 text-cyan-400 hover:text-black border border-cyan-500/30 transition-all"
                    data-testid={`plan-select-btn-${index}`}
                  >
                    Select Plan
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/plans">
              <Button 
                variant="outline"
                className="border-white/20 hover:bg-white/10 text-white"
                data-testid="view-all-plans-btn"
              >
                View All Plans
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative" data-testid="cta-section">
        <div className="absolute inset-0 hero-glow" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-['Outfit'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Experience the <span className="text-cyan-400">Future</span>?
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of satisfied customers enjoying blazing-fast internet. 
            Get connected today with free installation.
          </p>
          <Link to="/new-connection">
            <Button 
              size="lg"
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-10 h-14 text-lg btn-cyber animate-pulse-glow"
              data-testid="cta-get-started-btn"
            >
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
