
import { TrendingUp, Users, Clock, Award } from "lucide-react";

interface MetricCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  change?: string;
  color: string;
}

const MetricCard = ({ icon, value, label, change, color }: MetricCardProps) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${color}`}>
        {icon}
      </div>
      {change && (
        <div className="flex items-center text-green-600 text-sm font-medium">
          <TrendingUp className="w-4 h-4 mr-1" />
          {change}
        </div>
      )}
    </div>
    <div className="text-3xl font-bold text-slate-800 mb-2">{value}</div>
    <div className="text-slate-600 font-medium">{label}</div>
  </div>
);

const PerformanceMetrics = () => {
  const metrics = [
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      value: "150+",
      label: "Happy Clients",
      change: "+25%",
      color: "bg-blue-100"
    },
    {
      icon: <Award className="w-6 h-6 text-green-600" />,
      value: "200+",
      label: "Projects Completed",
      change: "+40%",
      color: "bg-green-100"
    },
    {
      icon: <Clock className="w-6 h-6 text-purple-600" />,
      value: "98%",
      label: "On-Time Delivery",
      change: "+2%",
      color: "bg-purple-100"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-rose-600" />,
      value: "4.9/5",
      label: "Client Satisfaction",
      change: "+0.2",
      color: "bg-rose-100"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 text-green-700 rounded-full text-sm font-semibold mb-4">
            📊 Our Track Record
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Results That Speak for Themselves
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Numbers don't lie. Here's how we've been making a difference for businesses worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        {/* Additional Success Metrics */}
        <div className="mt-16 bg-gradient-to-r from-slate-50 to-blue-50 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Client Success Highlights
            </h3>
            <p className="text-slate-600">
              Real impact from our partnership approach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">300%</div>
              <div className="text-slate-600 font-medium">Average Sales Increase</div>
              <div className="text-sm text-slate-500 mt-1">For e-commerce clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">85%</div>
              <div className="text-slate-600 font-medium">Faster Load Times</div>
              <div className="text-sm text-slate-500 mt-1">Performance optimization</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">50%</div>
              <div className="text-slate-600 font-medium">Reduced Bounce Rate</div>
              <div className="text-sm text-slate-500 mt-1">UX improvements</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceMetrics;
