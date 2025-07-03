import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Phone,
  MessageCircle,
  Mail,
  Star,
  MapPin,
  Clock,
  Truck,
  ChefHat,
  ArrowLeft,
  Calendar,
  IndianRupee,
  Users,
  Zap,
  Send,
} from "lucide-react";
import { tiffinProviders } from "@/data/providers";
import { toast } from "sonner";

const ProviderDetail = () => {
  const { id } = useParams();
  const provider = tiffinProviders.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewerName, setReviewerName] = useState("");

  if (!provider) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Provider not found
          </h1>
          <Link to="/search">
            <Button>Back to Search</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleContact = (type: "phone" | "whatsapp" | "email") => {
    switch (type) {
      case "phone":
        window.open(`tel:${provider.contact.phone}`);
        break;
      case "whatsapp":
        window.open(
          `https://wa.me/${provider.contact.whatsapp.replace("+", "")}`
        );
        break;
      case "email":
        window.open(`mailto:${provider.contact.email}`);
        break;
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName || !reviewText || rating === 0) {
      toast.error("Please fill in all fields and select a rating");
      return;
    }

    toast.success("Review submitted successfully!");
    setReviewerName("");
    setReviewText("");
    setRating(0);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Back Button */}
        <Link
          to="/search"
          className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Search
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <img
                  src={provider.gallery[selectedImage]}
                  alt={provider.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex space-x-2 overflow-x-auto">
                {provider.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index
                        ? "border-yellow-500"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Provider Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        {provider.name}
                      </h1>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{provider.location.address}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">
                            {provider.rating}
                          </span>
                          <span className="text-gray-500 ml-1">
                            ({provider.reviews} reviews)
                          </span>
                        </div>
                        <Badge variant="outline">
                          {provider.foodType === "both"
                            ? "Veg & Non-Veg"
                            : provider.foodType === "veg"
                            ? "Vegetarian"
                            : "Non-Vegetarian"}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {provider.priceRange}
                      </div>
                      <div className="text-sm text-gray-500">per meal</div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">{provider.description}</p>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 mr-3 text-yellow-500" />
                      <div>
                        <div className="font-semibold text-sm">Timings</div>
                        <div className="text-sm text-gray-600">
                          Lunch: {provider.timing.lunch}
                          <br />
                          Dinner: {provider.timing.dinner}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Truck className="w-5 h-5 mr-3 text-green-500" />
                      <div>
                        <div className="font-semibold text-sm">Delivery</div>
                        <div className="text-sm text-gray-600 capitalize">
                          {provider.deliveryType}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <ChefHat className="w-4 h-4 mr-2" />
                      Cuisines
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {provider.cuisine.map((cuisine) => (
                        <Badge key={cuisine} variant="secondary">
                          {cuisine}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {provider.specialties.map((specialty) => (
                        <Badge key={specialty} variant="outline">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Pricing Plans */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <IndianRupee className="w-5 h-5 mr-2" />
                    Pricing Plans
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4 bg-gradient-to-br from-yellow-50 to-orange-50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Weekly Plan</span>
                        <span className="text-lg font-bold text-green-600">
                          ₹{provider.weeklyPrice}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        14 tiffins (2 meals/day for 7 days)
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Users className="w-3 h-3 mr-1" />
                        Perfect for individuals
                      </div>
                    </div>
                    <div className="border rounded-lg p-4 bg-gradient-to-br from-yellow-50 to-orange-50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Monthly Plan</span>
                        <span className="text-lg font-bold text-green-600">
                          ₹{provider.monthlyPrice}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        60 tiffins (2 meals/day for 30 days)
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Zap className="w-3 h-3 mr-1" />
                        Best value & savings
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Delivery Slots */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Delivery Slots
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {provider.deliverySlots.map((slot) => (
                      <Badge
                        key={slot}
                        variant="outline"
                        className="justify-center py-2"
                      >
                        {slot}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Customer Reviews
                  </h3>
                  <div className="space-y-4 mb-6">
                    {provider.testimonials.map((testimonial, index) => (
                      <div
                        key={index}
                        className="border-b pb-4 last:border-b-0"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">
                            {testimonial.name}
                          </span>
                          <div className="flex">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">
                          {testimonial.comment}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Add Review Form */}
                  <div className="border-t pt-6">
                    <h4 className="font-semibold mb-4">Write a Review</h4>
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Your Name
                        </label>
                        <Input
                          value={reviewerName}
                          onChange={(e) => setReviewerName(e.target.value)}
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Rating
                        </label>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              className={`w-8 h-8 ${
                                star <= rating ? "bg-yellow-400" : "bg-gray-400"
                              }`}
                            >
                              <Star className="w-full h-full fill-current" />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Your Review
                        </label>
                        <Textarea
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          placeholder="Share your experience..."
                          rows={3}
                        />
                      </div>
                      <Button
                        type="submit"
                        className="bg-orange-600 hover:bg-orange-700"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Submit Review
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar - Contact & Order */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-8"
            >
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <ChefHat className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Contact Provider
                    </h3>
                    <p className="text-sm text-gray-600">
                      Get in touch to place your order
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <Button
                      onClick={() => handleContact("phone")}
                      className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white"
                      size="lg"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Call Now
                    </Button>

                    <Button
                      onClick={() => handleContact("whatsapp")}
                      className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white"
                      size="lg"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      WhatsApp
                    </Button>

                    <Button
                      onClick={() => handleContact("email")}
                      className="w-full flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white"
                      size="lg"
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      Email
                    </Button>
                  </div>

                  <div className="border-t pt-6">
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-800">
                          Quick Order
                        </span>
                        <Badge className="bg-yellow-100 text-yellow-800">
                          Popular
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Start with our weekly plan and experience the taste!
                      </p>
                      <div className="text-lg font-bold text-green-600 mb-2">
                        ₹{provider.weeklyPrice}/week
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white text-lg py-3 font-semibold">
                      Order Now
                    </Button>
                    <p className="text-xs text-gray-500 text-center mt-2">
                      Contact provider directly to place your order
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDetail;
