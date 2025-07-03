import { motion } from "framer-motion";
import { Heart, Target, Users, Zap, Award, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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

  const values = [
    {
      icon: Heart,
      title: "Made with Love",
      description:
        "Every meal on our platform is prepared with care and love by home cooks who understand the value of good food.",
    },
    {
      icon: Users,
      title: "Community First",
      description:
        "We believe in building strong communities by connecting neighbors and supporting local food entrepreneurs.",
    },
    {
      icon: Award,
      title: "Quality Assured",
      description:
        "All our providers are verified for hygiene, quality, and reliability to ensure you get the best experience.",
    },
    {
      icon: Globe,
      title: "Sustainable Future",
      description:
        "Supporting homemade food reduces food waste and promotes sustainable eating habits in our communities.",
    },
  ];

  const stats = [
    { number: "1000+", label: "Happy Customers" },
    { number: "150+", label: "Verified Providers" },
    { number: "50+", label: "Areas Covered" },
    { number: "25+", label: "Cuisine Types" },
  ];

  const team = [
    {
      name: "Priya Sharma",
      role: "Founder & CEO",
      description:
        "Passionate about connecting people through food and supporting local entrepreneurs.",
      image:
        "https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg",
    },
    {
      name: "Rahul Verma",
      role: "Head of Operations",
      description:
        "Ensuring smooth operations and maintaining quality standards across our platform.",
      image:
        "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg",
    },
    {
      name: "Anjali Patel",
      role: "Community Manager",
      description:
        "Building relationships with providers and customers to create a thriving community.",
      image:
        "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg",
    },
  ];

  return (
    <div className="pb-16 md:pb-0">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About <span className="text-orange-600">TiffinFind</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're on a mission to revolutionize how people access homemade
              food by creating a trusted platform that connects food lovers with
              passionate home cooks.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                In today's fast-paced world, finding healthy, affordable, and
                delicious homemade food has become increasingly difficult.
                Students living away from home, working professionals with busy
                schedules, and families looking for convenient meal solutions
                all struggle with the same challenge.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                TiffinFind bridges this gap by creating a trusted marketplace
                where talented home cooks can share their culinary skills with
                their community, while food lovers can discover authentic,
                homemade meals just like their mothers used to make.
              </p>
              <div className="flex items-center space-x-4">
                <Target className="h-8 w-8 text-orange-600" />
                <span className="text-lg font-semibold text-gray-900">
                  Bringing families together, one meal at a time
                </span>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="relative">
              <img
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
                alt="Homemade food"
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
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
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and help us build a
              platform that truly serves our community.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="h-full p-6 text-center border-2 border-gray-100 hover:border-orange-200 transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-8 w-8 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-16 bg-orange-600"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              Together, we're building a stronger food community
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-orange-100 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
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
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Passionate individuals working together to make homemade food
              accessible to everyone
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="overflow-hidden border-2 border-gray-100 hover:border-orange-200 transition-all duration-300">
                  <div className="aspect-square relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-orange-600 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Problem We're Solving */}
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
              The Problem We're Solving
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-red-600 text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Expensive Restaurant Food
                    </h3>
                    <p className="text-gray-600">
                      Eating out daily is expensive and often unhealthy, making
                      it unsustainable for students and working professionals.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-red-600 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Time Constraints
                    </h3>
                    <p className="text-gray-600">
                      Busy schedules make it difficult to cook fresh meals
                      daily, leading to reliance on processed foods.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-red-600 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Limited Options
                    </h3>
                    <p className="text-gray-600">
                      Finding reliable, healthy, and affordable homemade food
                      options is challenging in urban areas.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <div className="bg-orange-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Our Solution
                </h3>
                <p className="text-gray-600 mb-6">
                  TiffinFind creates a trusted ecosystem where home cooks can
                  monetize their culinary skills while providing food lovers
                  access to authentic, affordable, and healthy homemade meals.
                </p>
                <div className="flex items-center mb-4">
                  <Zap className="h-6 w-6 text-orange-600 mr-2" />
                  <span className="font-semibold text-gray-900">
                    Connecting communities through food
                  </span>
                </div>
                <Button asChild className="bg-orange-600 hover:bg-orange-700 ">
                  <Link to="/search" className="hover:text-white">
                    Find Tiffin Services
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-16 bg-gradient-to-r from-orange-600 to-orange-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join Our Mission
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Whether you're looking for delicious homemade meals or want to
              share your culinary talents, we'd love to have you as part of our
              community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-white text-orange-600 hover:bg-orange-100 hover:text-orange-700 px-8 py-3 rounded-full text-base font-semibold shadow-lg transition-colors duration-300"
              >
                <Link to="/search">Find Tiffin Services</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border bg-orange-700 border-white/40 bg-none text-white hover:text-orange-200 hover:border-orange-200 hover:bg-white/10 backdrop-blur-md px-8 py-3 rounded-full text-base font-semibold transition-all duration-300"
              >
                <Link to="/become-provider">Become a Provider</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
