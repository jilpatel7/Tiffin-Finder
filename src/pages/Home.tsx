import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Search,
  Eye,
  MessageCircle,
  UtensilsCrossed,
  Users,
  Clock,
  Shield,
  Star,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { testimonials } from "@/data/providers";
import { useState, useEffect } from "react";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselImages = [
    {
      url: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
      title: "Authentic North Indian Cuisine",
      description: "Rich flavors and traditional recipes",
    },
    {
      url: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg",
      title: "Fresh South Indian Delights",
      description: "Healthy and nutritious meals",
    },
    {
      url: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg",
      title: "Homemade with Love",
      description: "Just like mother's cooking",
    },
    {
      url: "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg",
      title: "Multi-Cuisine Options",
      description: "Variety to satisfy every craving",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const steps = [
    {
      icon: Search,
      title: "Search",
      description:
        "Find tiffin providers in your area using our smart search filters.",
    },
    {
      icon: Eye,
      title: "View Details",
      description:
        "Browse menus, prices, and reviews to find the perfect match.",
    },
    {
      icon: MessageCircle,
      title: "Contact",
      description:
        "Connect directly with providers via phone, WhatsApp, or email.",
    },
    {
      icon: UtensilsCrossed,
      title: "Enjoy Meals",
      description:
        "Relish delicious homemade meals delivered fresh to your door.",
    },
  ];

  const features = [
    {
      icon: Users,
      title: "Verified Providers",
      description:
        "All our tiffin providers are verified for quality and hygiene.",
    },
    {
      icon: Clock,
      title: "On-Time Delivery",
      description: "Fresh meals delivered right on time, every time.",
    },
    {
      icon: Shield,
      title: "Safe & Hygienic",
      description: "Prepared in clean home kitchens with utmost care.",
    },
  ];

  // Floating food icons data
  const floatingIcons = [
    { icon: "🍱", delay: 0, duration: 20, x: "10%", y: "20%" },
    { icon: "🍛", delay: 2, duration: 25, x: "80%", y: "15%" },
    { icon: "🥘", delay: 4, duration: 22, x: "15%", y: "70%" },
    { icon: "🍚", delay: 1, duration: 28, x: "85%", y: "75%" },
    { icon: "🥄", delay: 3, duration: 24, x: "25%", y: "45%" },
    { icon: "🍽️", delay: 5, duration: 26, x: "75%", y: "50%" },
    { icon: "🥢", delay: 1.5, duration: 23, x: "5%", y: "85%" },
    { icon: "🍜", delay: 3.5, duration: 27, x: "90%", y: "30%" },
    { icon: "🥗", delay: 2.5, duration: 21, x: "35%", y: "25%" },
    { icon: "🍲", delay: 4.5, duration: 29, x: "65%", y: "80%" },
  ];

  return (
    <div className="pb-0">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 py-20 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Healthy Homemade Meals
              <span className="block text-orange-600">Near You</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              Discover authentic homemade tiffin services in your area. Fresh,
              affordable, and delicious meals prepared with love, delivered to
              your doorstep.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                asChild
                size="lg"
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full"
              >
                <Link
                  to="/search"
                  className="text-white hover:text-white flex items-center"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Find Tiffin Services
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-8 py-3 rounded-full"
              >
                <Link
                  to="/become-provider"
                  className="flex items-center text-orange-600 hover:text-white"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Become a Provider
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Image Carousel Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Delicious Meals Await You
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our variety of authentic homemade cuisines from verified
              providers
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative w-full h-full">
                {carouselImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <div className="text-center text-white">
                        <h3 className="text-3xl md:text-4xl font-bold mb-4">
                          {image.title}
                        </h3>
                        <p className="text-xl md:text-2xl">
                          {image.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentSlide
                        ? "bg-white"
                        : "bg-white bg-opacity-50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Problem Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-16 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Tired of Expensive, Unhealthy Food?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              Students, working professionals, and families struggle daily with
              finding affordable, healthy, and tasty meals. Restaurant food is
              expensive, processed food is unhealthy, and cooking daily is
              time-consuming.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <Card className="p-6 h-full border-2 border-gray-100 hover:border-orange-200 transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-8 w-8 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How It Works Section - Enhanced Multi-Step UI */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #f97316 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, #f97316 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mb-6 shadow-lg">
              <UtensilsCrossed className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It <span className="text-orange-600">Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Finding your perfect tiffin service is just a few clicks away.
              Follow these simple steps to enjoy delicious homemade meals.
            </p>
          </motion.div>

          {/* Steps Container */}
          <div className="relative">
            {/* Desktop Connection Lines */}
            <div className="hidden lg:block absolute top-20 left-0 right-0 h-px">
              <div className="flex justify-between items-center h-full max-w-4xl mx-auto px-16">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-orange-300 to-orange-300"></div>
                <div className="w-4 h-4 bg-orange-300 rounded-full mx-8"></div>
                <div className="flex-1 h-px bg-gradient-to-r from-orange-300 to-orange-300"></div>
                <div className="w-4 h-4 bg-orange-300 rounded-full mx-8"></div>
                <div className="flex-1 h-px bg-gradient-to-r from-orange-300 to-transparent"></div>
              </div>
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  className="group relative"
                >
                  {/* Step Card */}
                  <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-orange-200 relative z-10">
                    {/* Step Number Badge */}
                    <div className="absolute -top-4 left-8">
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-sm font-bold text-white">
                          {index + 1}
                        </span>
                      </div>
                    </div>

                    {/* Icon Container */}
                    <div className="mb-6 pt-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-inner">
                        <step.icon className="h-10 w-10 text-orange-600 group-hover:text-orange-700 transition-colors duration-300" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {step.description}
                      </p>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Mobile Connection Arrow */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden flex justify-center mt-6 mb-2">
                      <div className="w-px h-8 bg-gradient-to-b from-orange-300 to-orange-200"></div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center mt-16"
          >
            <div className="inline-flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Link
                  to="/search"
                  className="flex items-center text-white hover:text-white"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Start Your Journey
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-orange-300 text-orange-600 hover:bg-orange-50 font-semibold py-4 px-8 rounded-full transition-all duration-300"
              >
                <Link to="/about" className="flex items-center">
                  Learn More
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-16 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied customers who found their perfect
              tiffin service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="p-6 h-full border-2 border-gray-100 hover:border-orange-200 transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4 italic">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="relative py-20 md:py-28 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 overflow-hidden text-white"
      >
        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden">
          {floatingIcons.map((item, index) => (
            <motion.div
              key={index}
              className="absolute text-2xl md:text-4xl opacity-30"
              style={{
                left: item.x,
                top: item.y,
                zIndex: 0,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: item.duration,
                delay: item.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {item.icon}
            </motion.div>
          ))}
        </div>

        {/* Decorative Blobs */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/3 left-1/4 w-40 h-40 bg-white/10 rounded-full blur-2xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.05, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-white/10 rounded-full blur-2xl"
            animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.05, 0.2] }}
            transition={{
              duration: 12,
              delay: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 to-transparent z-0"></div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div variants={itemVariants}>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur rounded-2xl mb-6 shadow-lg"
            >
              <UtensilsCrossed className="h-8 w-8 text-white" />
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-5xl font-extrabold mb-4 leading-snug"
            >
              Ready to Find Your
              <span className="block bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                Perfect Tiffin Service?
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-base md:text-xl text-orange-100 max-w-2xl mx-auto mb-10 font-light"
            >
              Join our community today and discover amazing homemade meals near
              you. Fresh, affordable, and full of love!
            </motion.p>

            {/* CTA Buttons */}
            <motion.div className="flex flex-col items-center justify-center sm:flex-row gap-4 sm:gap-6">
              {/* Search Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-orange-600 hover:bg-orange-100 hover:text-orange-700 px-8 py-3 rounded-full text-base font-semibold shadow-lg transition-colors duration-300"
                >
                  <Link to="/search" className="flex items-center">
                    <Search className="mr-2 h-5 w-5" />
                    Start Searching
                  </Link>
                </Button>
              </motion.div>

              {/* Become a Provider Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border bg-orange-700 border-white/40 bg-none text-white hover:text-orange-200 hover:border-orange-200 hover:bg-white/10 backdrop-blur-md px-8 py-3 rounded-full text-base font-semibold transition-all duration-300"
                >
                  <Link to="/become-provider" className="flex items-center">
                    <Plus className="mr-2 h-5 w-5" />
                    Become a Provider
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-12 flex flex-wrap justify-center gap-6 text-orange-100 text-sm"
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                1000+ Happy Customers
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Verified Providers
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-current" />
                4.8+ Average Rating
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-16 fill-white opacity-70"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28..."
              opacity="0.3"
            />
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69..." opacity="0.5" />
            <path d="M0,0V5.63C149.93,59,314.09,71.32..." />
          </svg>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
