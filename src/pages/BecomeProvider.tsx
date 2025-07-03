import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
  ChefHat,
  DollarSign,
  Users,
  Clock,
  MapPin,
  Camera,
} from "lucide-react";
import { cuisineTypes, areas, deliveryTypes } from "@/data/providers";

const BecomeProvider = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    area: "",
    address: "",
    description: "",
    cuisines: [] as string[],
    foodType: "",
    deliveryTypes: [] as string[],
    priceMin: "",
    priceMax: "",
    specialties: "",
    timing: "",
    weeklyPrice: "",
    monthlyPrice: "",
    experience: "",
  });

  const benefits = [
    {
      icon: Users,
      title: "Reach More Customers",
      description: "Connect with hundreds of potential customers in your area",
    },
    {
      icon: DollarSign,
      title: "Increase Your Income",
      description: "Turn your cooking passion into a profitable business",
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "Work on your own terms and set your own hours",
    },
    {
      icon: ChefHat,
      title: "Share Your Recipes",
      description: "Showcase your culinary skills and family recipes",
    },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCuisineToggle = (cuisine: string) => {
    setFormData((prev) => ({
      ...prev,
      cuisines: prev.cuisines.includes(cuisine)
        ? prev.cuisines.filter((c) => c !== cuisine)
        : [...prev.cuisines, cuisine],
    }));
  };

  const handleDeliveryTypeToggle = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      deliveryTypes: prev.deliveryTypes.includes(type)
        ? prev.deliveryTypes.filter((t) => t !== type)
        : [...prev.deliveryTypes, type],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.area
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    console.log("Provider Registration Data:", formData);
    toast.success("Registration submitted! We'll contact you within 24 hours.");

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      whatsapp: "",
      area: "",
      address: "",
      description: "",
      cuisines: [],
      foodType: "",
      deliveryTypes: [],
      priceMin: "",
      priceMax: "",
      specialties: "",
      timing: "",
      weeklyPrice: "",
      monthlyPrice: "",
      experience: "",
    });
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Become a Tiffin Provider
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our platform and start earning by sharing your delicious
            homemade meals with your community
          </p>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-center mb-8">
            Why Join TiffinFind?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <Card key={benefit.title} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-gray-600">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </motion.div>

        {/* Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                Provider Registration Form
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Personal Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        placeholder="+91 9876543210"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="whatsapp">WhatsApp Number</Label>
                      <Input
                        id="whatsapp"
                        value={formData.whatsapp}
                        onChange={(e) =>
                          handleInputChange("whatsapp", e.target.value)
                        }
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>
                </div>

                {/* Location Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Location Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="area">Area *</Label>
                      <Select
                        value={formData.area}
                        onValueChange={(value) =>
                          handleInputChange("area", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your area" />
                        </SelectTrigger>
                        <SelectContent>
                          {areas.map((area) => (
                            <SelectItem key={area} value={area}>
                              {area}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="address">Full Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        placeholder="Complete address"
                      />
                    </div>
                  </div>
                </div>

                {/* Business Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <ChefHat className="w-5 h-5 mr-2" />
                    Business Information
                  </h3>

                  <div className="mb-4">
                    <Label>Description</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      placeholder="Tell us about your cooking style, experience, and what makes your food special..."
                      rows={3}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label>Food Type</Label>
                      <Select
                        value={formData.foodType}
                        onValueChange={(value) =>
                          handleInputChange("foodType", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select food type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="veg">Vegetarian Only</SelectItem>
                          <SelectItem value="non-veg">
                            Non-Vegetarian Only
                          </SelectItem>
                          <SelectItem value="both">
                            Both Veg & Non-Veg
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Experience (years)</Label>
                      <Input
                        value={formData.experience}
                        onChange={(e) =>
                          handleInputChange("experience", e.target.value)
                        }
                        placeholder="Years of cooking experience"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <Label>Cuisines You Specialize In</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {cuisineTypes.map((cuisine) => (
                        <div
                          key={cuisine}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={cuisine}
                            checked={formData.cuisines.includes(cuisine)}
                            onCheckedChange={() => handleCuisineToggle(cuisine)}
                          />
                          <label htmlFor={cuisine} className="text-sm">
                            {cuisine}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <Label>Delivery Options</Label>
                    <div className="flex flex-wrap gap-4 mt-2">
                      {deliveryTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={type}
                            checked={formData.deliveryTypes.includes(type)}
                            onCheckedChange={() =>
                              handleDeliveryTypeToggle(type)
                            }
                          />
                          <label htmlFor={type} className="text-sm">
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pricing Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Pricing Information
                  </h3>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <Label>Min Price (₹)</Label>
                      <Input
                        type="number"
                        value={formData.priceMin}
                        onChange={(e) =>
                          handleInputChange("priceMin", e.target.value)
                        }
                        placeholder="80"
                      />
                    </div>
                    <div>
                      <Label>Max Price (₹)</Label>
                      <Input
                        type="number"
                        value={formData.priceMax}
                        onChange={(e) =>
                          handleInputChange("priceMax", e.target.value)
                        }
                        placeholder="150"
                      />
                    </div>
                    <div>
                      <Label>Weekly Plan (₹)</Label>
                      <Input
                        type="number"
                        value={formData.weeklyPrice}
                        onChange={(e) =>
                          handleInputChange("weeklyPrice", e.target.value)
                        }
                        placeholder="For 14 tiffins (2 meals/day)"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        14 tiffins (2 meals/day)
                      </p>
                    </div>
                    <div>
                      <Label>Monthly Plan (₹)</Label>
                      <Input
                        type="number"
                        value={formData.monthlyPrice}
                        onChange={(e) =>
                          handleInputChange("monthlyPrice", e.target.value)
                        }
                        placeholder="For 60 tiffins (2 meals/day)"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        60 tiffins (2 meals/day)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Operational Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Operational Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Operating Hours</Label>
                      <Input
                        value={formData.timing}
                        onChange={(e) =>
                          handleInputChange("timing", e.target.value)
                        }
                        placeholder="11:00 AM - 2:00 PM, 7:00 PM - 9:00 PM"
                      />
                    </div>
                    <div>
                      <Label>Specialties (comma separated)</Label>
                      <Input
                        value={formData.specialties}
                        onChange={(e) =>
                          handleInputChange("specialties", e.target.value)
                        }
                        placeholder="Dal Tadka, Biryani, Roti, etc."
                      />
                    </div>
                  </div>
                </div>

                {/* Image Upload Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Camera className="w-5 h-5 mr-2" />
                    Photos (Coming Soon)
                  </h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Camera className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-2">
                      Photo upload feature will be available soon
                    </p>
                    <p className="text-sm text-gray-500">
                      For now, you can share photos via WhatsApp after
                      registration
                    </p>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white text-lg py-3"
                >
                  Submit Registration
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default BecomeProvider;
