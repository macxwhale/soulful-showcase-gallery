
import { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  projectType: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechCorp Inc.",
    avatar: "👩‍💼",
    content: "bunisystems delivered an exceptional e-commerce platform that increased our online sales by 300%. Their attention to detail and professional approach exceeded our expectations.",
    rating: 5,
    projectType: "E-commerce Platform"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CEO",
    company: "StartupXYZ",
    avatar: "👨‍💻",
    content: "The team at bunisystems transformed our outdated website into a modern, responsive platform. Our user engagement has doubled since the launch.",
    rating: 5,
    projectType: "Website Redesign"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Operations Manager",
    company: "GreenTech Solutions",
    avatar: "👩‍🔬",
    content: "Professional, reliable, and results-driven. bunisystems created a custom CRM that streamlined our entire business process.",
    rating: 5,
    projectType: "Custom CRM"
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            💬 Client Success Stories
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what business leaders say about working with bunisystems.
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100">
            <div className="absolute top-6 left-8 text-rose-500 opacity-20">
              <Quote className="w-16 h-16" />
            </div>
            
            <div className="relative z-10">
              {/* Stars */}
              <div className="flex justify-center mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-xl md:text-2xl text-slate-700 text-center mb-8 leading-relaxed font-medium">
                "{currentTestimonial.content}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full flex items-center justify-center text-2xl">
                  {currentTestimonial.avatar}
                </div>
                <div className="text-center">
                  <div className="font-bold text-slate-800 text-lg">
                    {currentTestimonial.name}
                  </div>
                  <div className="text-slate-600">
                    {currentTestimonial.role}
                  </div>
                  <div className="text-slate-500 text-sm">
                    {currentTestimonial.company}
                  </div>
                  <div className="inline-block mt-2 px-3 py-1 bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 text-xs rounded-full border border-rose-200">
                    {currentTestimonial.projectType}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-slate-600 hover:text-rose-600"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-slate-600 hover:text-rose-600"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-rose-500 w-8"
                  : "bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>

        {/* Client Logos */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 text-sm mb-8">Trusted by industry leaders</p>
          <div className="flex justify-center items-center space-x-12 opacity-60">
            <div className="text-2xl font-bold text-slate-400">TechCorp</div>
            <div className="text-2xl font-bold text-slate-400">StartupXYZ</div>
            <div className="text-2xl font-bold text-slate-400">GreenTech</div>
            <div className="text-2xl font-bold text-slate-400">InnovateCo</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
