import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Loader2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function TariffPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

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

  const filteredPlans = activeTab === "all" 
    ? plans 
    : plans.filter(plan => plan.type.toLowerCase() === activeTab);

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen" data-testid="tariff-plans-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-['Outfit'] text-4xl sm:text-5xl font-bold mb-4">
            Choose Your <span className="text-cyan-400">Plan</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            From casual browsing to enterprise solutions, we have the perfect plan for you.
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-12">
            <TabsList className="bg-[#0f172a] border border-white/10 p-1" data-testid="plan-tabs">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black px-6"
                data-testid="tab-all"
              >
                All Plans
              </TabsTrigger>
              <TabsTrigger 
                value="home" 
                className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black px-6"
                data-testid="tab-home"
              >
                Home
              </TabsTrigger>
              <TabsTrigger 
                value="business" 
                className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black px-6"
                data-testid="tab-business"
              >
                Business
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPlans.map((plan, index) => (
                <div 
                  key={plan.id}
                  className={`glass rounded-xl p-6 card-hover relative ${
                    plan.popular ? 'ring-2 ring-cyan-500 glow-cyan' : ''
                  }`}
                  data-testid={`plan-card-${plan.id}`}
                >
                  {plan.popular && (
                    <div className="popular-badge" data-testid={`popular-badge-${plan.id}`}>
                      Best Value
                    </div>
                  )}
                  
                  {/* Plan Type Badge */}
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                    plan.type === 'Business' 
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' 
                      : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  }`}>
                    {plan.type}
                  </div>

                  <h3 className="font-['Outfit'] text-xl font-bold mb-1">{plan.name}</h3>
                  <div className="font-['JetBrains_Mono'] text-cyan-400 text-lg mb-4">{plan.speed}</div>
                  
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="font-['JetBrains_Mono'] text-3xl font-bold">₹{plan.price}</span>
                    <span className="text-gray-400 text-sm">/month</span>
                  </div>

                  <ul className="space-y-2 mb-6 min-h-[140px]">
                    {plan.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                        <Check className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  <Link to={`/new-connection?plan=${plan.id}`}>
                    <Button 
                      className={`w-full transition-all ${
                        plan.popular 
                          ? 'bg-cyan-500 hover:bg-cyan-400 text-black' 
                          : 'bg-cyan-500/20 hover:bg-cyan-500 text-cyan-400 hover:text-black border border-cyan-500/30'
                      }`}
                      data-testid={`select-plan-${plan.id}`}
                    >
                      Select Plan
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Comparison Note */}
        <div className="mt-16 text-center glass rounded-xl p-8 max-w-3xl mx-auto">
          <h3 className="font-['Outfit'] text-xl font-bold mb-3">Need Help Choosing?</h3>
          <p className="text-gray-400 mb-6">
            Our experts are available 24/7 to help you find the perfect plan for your needs.
          </p>
          <Link to="/contact">
            <Button 
              variant="outline" 
              className="border-white/20 hover:bg-white/10"
              data-testid="contact-help-btn"
            >
              Talk to an Expert
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
