import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  ChefHat,
  DollarSign,
  Users,
  Clock,
  MapPin,
  Phone,
  Camera,
  Plus,
  Minus,
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Heart,
  Star,
  UtensilsCrossed,
  CheckCircle2,
} from "lucide-react";
import { ProviderService } from "@/services/providerService";
import { cuisineTypes, deliveryTypes } from "@/data/providers";

interface TiffinItem {
  name: string;
  price: string;
  description: string;
  contents: string[];
}

interface PricingPlan {
  plan_type: "weekly" | "monthly";
  meals_per_day: 1 | 2;
  price: string;
  original_price: string;
  discount_percentage: string;
}

const BecomeProvider = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [areas, setAreas] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    selectedAreas: [] as string[],
    address: "",
    description: "",
    cuisines: [] as string[],
    food_type: "" as "veg" | "non-veg" | "both" | "",
    delivery_types: [] as string[],
    specialties: "",
    timing_lunch: "",
    timing_dinner: "",
    experience_years: "",
    allow_single_tiffin: false,
  });

  const [tiffinItems, setTiffinItems] = useState<TiffinItem[]>([
    { name: "", price: "", description: "", contents: [""] },
  ]);

  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([
    {
      plan_type: "weekly",
      meals_per_day: 1,
      price: "",
      original_price: "",
      discount_percentage: "",
    },
  ]);

  // Load areas from Supabase
  useState(() => {
    const loadAreas = async () => {
      const areasData = await ProviderService.getUniqueAreas();
      setAreas(areasData);
    };
    loadAreas();
  });

  const steps = [
    {
      id: "welcome",
      title: "Welcome to TiffinFind",
      subtitle: "Let's start your culinary journey",
      icon: Heart,
      color: "from-pink-500 to-rose-500",
    },
    {
      id: "personal",
      title: "Personal Information",
      subtitle: "Tell us about yourself",
      icon: Users,
      color: "from-blue-500 to-indigo-500",
    },
    {
      id: "location",
      title: "Service Areas",
      subtitle: "Where do you serve?",
      icon: MapPin,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "business",
      title: "Business Details",
      subtitle: "Your culinary expertise",
      icon: ChefHat,
      color: "from-orange-500 to-amber-500",
    },
    {
      id: "menu",
      title: "Menu & Pricing",
      subtitle: "Showcase your delicious offerings",
      icon: UtensilsCrossed,
      color: "from-purple-500 to-violet-500",
    },
    {
      id: "plans",
      title: "Subscription Plans",
      subtitle: "Set your pricing strategy",
      icon: DollarSign,
      color: "from-teal-500 to-cyan-500",
    },
    {
      id: "timing",
      title: "Operating Hours",
      subtitle: "When are you available?",
      icon: Clock,
      color: "from-red-500 to-pink-500",
    },
    {
      id: "complete",
      title: "All Set!",
      subtitle: "Your journey begins now",
      icon: CheckCircle2,
      color: "from-green-500 to-emerald-500",
    },
  ];

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAreaToggle = (area: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedAreas: prev.selectedAreas.includes(area)
        ? prev.selectedAreas.filter((a) => a !== area)
        : [...prev.selectedAreas, area],
    }));
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
      delivery_types: prev.delivery_types.includes(type)
        ? prev.delivery_types.filter((t) => t !== type)
        : [...prev.delivery_types, type],
    }));
  };

  // Tiffin Items Management
  const addTiffinItem = () => {
    setTiffinItems((prev) => [
      ...prev,
      { name: "", price: "", description: "", contents: [""] },
    ]);
  };

  const removeTiffinItem = (index: number) => {
    if (tiffinItems.length > 1) {
      setTiffinItems((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const updateTiffinItem = (
    index: number,
    field: keyof TiffinItem,
    value: string | string[]
  ) => {
    setTiffinItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const addTiffinItemContent = (tiffinIndex: number) => {
    setTiffinItems((prev) =>
      prev.map((item, i) =>
        i === tiffinIndex ? { ...item, contents: [...item.contents, ""] } : item
      )
    );
  };

  const removeTiffinItemContent = (
    tiffinIndex: number,
    contentIndex: number
  ) => {
    setTiffinItems((prev) =>
      prev.map((item, i) =>
        i === tiffinIndex
          ? {
              ...item,
              contents: item.contents.filter((_, j) => j !== contentIndex),
            }
          : item
      )
    );
  };

  const updateTiffinItemContent = (
    tiffinIndex: number,
    contentIndex: number,
    value: string
  ) => {
    setTiffinItems((prev) =>
      prev.map((item, i) =>
        i === tiffinIndex
          ? {
              ...item,
              contents: item.contents.map((content, j) =>
                j === contentIndex ? value : content
              ),
            }
          : item
      )
    );
  };

  // Pricing Plans Management
  const addPricingPlan = () => {
    setPricingPlans((prev) => [
      ...prev,
      {
        plan_type: "weekly",
        meals_per_day: 1,
        price: "",
        original_price: "",
        discount_percentage: "",
      },
    ]);
  };

  const removePricingPlan = (index: number) => {
    if (pricingPlans.length > 1) {
      setPricingPlans((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const updatePricingPlan = (
    index: number,
    field: keyof PricingPlan,
    value: string | number
  ) => {
    setPricingPlans((prev) =>
      prev.map((plan, i) => (i === index ? { ...plan, [field]: value } : plan))
    );
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1: // Personal Information
        return !!(formData.name && formData.email && formData.phone);
      case 2: // Location
        return formData.selectedAreas.length > 0;
      case 3: // Business
        return !!(formData.food_type && formData.cuisines.length > 0);
      case 4: // Menu
        return tiffinItems.some((item) => item.name && item.price);
      case 5: // Plans
        return pricingPlans.some((plan) => plan.price);
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      if (validateStep(currentStep)) {
        setCurrentStep((prev) => prev + 1);
      } else {
        toast.error("Please fill in all required fields before continuing");
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    // Basic validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      formData.selectedAreas.length === 0
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (tiffinItems.some((item) => !item.name || !item.price)) {
      toast.error("Please complete all tiffin item details");
      return;
    }

    if (!formData.food_type) {
      toast.error("Please select food type");
      return;
    }

    try {
      setLoading(true);

      const registrationData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        address: formData.address,
        description: formData.description,
        food_type: formData.food_type,
        experience_years: formData.experience_years
          ? parseInt(formData.experience_years)
          : undefined,
        specialties: formData.specialties
          ? formData.specialties.split(",").map((s) => s.trim())
          : [],
        timing_lunch: formData.timing_lunch,
        timing_dinner: formData.timing_dinner,
        allow_single_tiffin: formData.allow_single_tiffin,
        areas: formData.selectedAreas,
        cuisines: formData.cuisines,
        delivery_types: formData.delivery_types,
        tiffin_items: tiffinItems
          .filter((item) => item.name && item.price)
          .map((item) => ({
            name: item.name,
            price: parseFloat(item.price),
            description: item.description,
            contents: item.contents.filter((content) => content.trim() !== ""),
          })),
        pricing_plans: pricingPlans
          .filter((plan) => plan.price)
          .map((plan) => ({
            plan_type: plan.plan_type,
            meals_per_day: plan.meals_per_day,
            price: parseFloat(plan.price),
            original_price: plan.original_price
              ? parseFloat(plan.original_price)
              : undefined,
            discount_percentage: plan.discount_percentage
              ? parseInt(plan.discount_percentage)
              : undefined,
            description: `${plan.plan_type === "weekly" ? "7" : "30"} days ${
              plan.meals_per_day === 1 ? "lunch" : "lunch & dinner"
            } (${plan.meals_per_day} meal${
              plan.meals_per_day > 1 ? "s" : ""
            }/day)`,
          })),
      };

      await ProviderService.registerProvider(registrationData);

      setCurrentStep(steps.length - 1);
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Failed to submit registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Welcome
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="w-32 h-32 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
            >
              <Heart className="w-16 h-16 text-white" />
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold text-gray-800 mb-4"
            >
              Welcome to Your Culinary Journey!
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              Join thousands of home chefs who are sharing their passion for
              cooking and building successful food businesses with TiffinFind.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8"
            >
              {[
                {
                  icon: Users,
                  title: "Reach More Customers",
                  desc: "Connect with food lovers in your area",
                },
                {
                  icon: DollarSign,
                  title: "Earn More Income",
                  desc: "Turn your passion into profit",
                },
                {
                  icon: Sparkles,
                  title: "Share Your Recipes",
                  desc: "Showcase your culinary skills",
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600">{benefit.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        );

      case 1: // Personal Information
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700 mb-2 block"
                >
                  Full Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Your full name"
                  className="h-12"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700 mb-2 block"
                >
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your@email.com"
                  className="h-12"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-700 mb-2 block"
                >
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+91 9876543210"
                  className="h-12"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="whatsapp"
                  className="text-sm font-medium text-gray-700 mb-2 block"
                >
                  WhatsApp Number
                </Label>
                <Input
                  id="whatsapp"
                  value={formData.whatsapp}
                  onChange={(e) =>
                    handleInputChange("whatsapp", e.target.value)
                  }
                  placeholder="+91 9876543210"
                  className="h-12"
                />
              </div>
            </div>
            <div>
              <Label
                htmlFor="address"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Full Address
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Complete address"
                className="h-12"
              />
            </div>
          </motion.div>
        );

      case 2: // Location
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-4 block">
                Service Areas * (Select areas you can serve)
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-80 overflow-y-auto border rounded-lg p-4 bg-gray-50">
                {areas.map((area) => (
                  <motion.div
                    key={area}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      formData.selectedAreas.includes(area)
                        ? "border-orange-500 bg-orange-50 text-orange-700"
                        : "border-gray-200 bg-white hover:border-orange-300"
                    }`}
                    onClick={() => handleAreaToggle(area)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{area}</span>
                      {formData.selectedAreas.includes(area) && (
                        <Check className="w-4 h-4 text-orange-600" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              {formData.selectedAreas.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-2 mt-4"
                >
                  {formData.selectedAreas.map((area) => (
                    <Badge
                      key={area}
                      variant="secondary"
                      className="flex items-center gap-1 px-3 py-1"
                    >
                      {area}
                      <X
                        className="w-3 h-3 cursor-pointer hover:text-red-500"
                        onClick={() => handleAreaToggle(area)}
                      />
                    </Badge>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        );

      case 3: // Business Details
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Description
              </Label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Tell us about your cooking style, experience, and what makes your food special..."
                rows={4}
                className="resize-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Food Type *
                </Label>
                <Select
                  value={formData.food_type}
                  onValueChange={(value: "veg" | "non-veg" | "both") =>
                    handleInputChange("food_type", value)
                  }
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select food type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="veg">🌱 Vegetarian Only</SelectItem>
                    <SelectItem value="non-veg">
                      🍖 Non-Vegetarian Only
                    </SelectItem>
                    <SelectItem value="both">
                      🌱🍖 Both Veg & Non-Veg
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Experience (years)
                </Label>
                <Input
                  value={formData.experience_years}
                  onChange={(e) =>
                    handleInputChange("experience_years", e.target.value)
                  }
                  placeholder="Years of cooking experience"
                  type="number"
                  className="h-12"
                />
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-4 block">
                Cuisines You Specialize In *
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {cuisineTypes.map((cuisine) => (
                  <motion.div
                    key={cuisine}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      formData.cuisines.includes(cuisine)
                        ? "border-orange-500 bg-orange-50 text-orange-700"
                        : "border-gray-200 bg-white hover:border-orange-300"
                    }`}
                    onClick={() => handleCuisineToggle(cuisine)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{cuisine}</span>
                      {formData.cuisines.includes(cuisine) && (
                        <Check className="w-4 h-4 text-orange-600" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-4 block">
                Delivery Options
              </Label>
              <div className="grid md:grid-cols-3 gap-3">
                {deliveryTypes.map((type) => (
                  <motion.div
                    key={type}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      formData.delivery_types.includes(type)
                        ? "border-orange-500 bg-orange-50 text-orange-700"
                        : "border-gray-200 bg-white hover:border-orange-300"
                    }`}
                    onClick={() => handleDeliveryTypeToggle(type)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{type}</span>
                      {formData.delivery_types.includes(type) && (
                        <Check className="w-4 h-4 text-orange-600" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 4: // Menu & Pricing
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Showcase Your Delicious Tiffin Items
              </h3>
              <p className="text-gray-600">
                Add the tiffin items you want to offer to your customers
              </p>
            </div>

            {tiffinItems.map((tiffin, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-dashed border-orange-200 rounded-2xl p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-gray-800 flex items-center">
                    <UtensilsCrossed className="w-5 h-5 mr-2 text-orange-600" />
                    Tiffin Item #{index + 1}
                  </h4>
                  {tiffinItems.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeTiffinItem(index)}
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Tiffin Name *
                    </Label>
                    <Input
                      value={tiffin.name}
                      onChange={(e) =>
                        updateTiffinItem(index, "name", e.target.value)
                      }
                      placeholder="e.g., Dal Makhani Special"
                      className="h-12"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Price (₹) *
                    </Label>
                    <Input
                      type="number"
                      value={tiffin.price}
                      onChange={(e) =>
                        updateTiffinItem(index, "price", e.target.value)
                      }
                      placeholder="150"
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Description
                  </Label>
                  <Textarea
                    value={tiffin.description}
                    onChange={(e) =>
                      updateTiffinItem(index, "description", e.target.value)
                    }
                    placeholder="Brief description of the tiffin"
                    rows={2}
                    className="resize-none"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    What's included in this tiffin? *
                  </Label>
                  {tiffin.contents.map((content, contentIndex) => (
                    <div key={contentIndex} className="flex gap-2 mb-2">
                      <Input
                        value={content}
                        onChange={(e) =>
                          updateTiffinItemContent(
                            index,
                            contentIndex,
                            e.target.value
                          )
                        }
                        placeholder="e.g., Dal, Rice, 2 Subji, 5 Roti, Salad"
                        className="h-10"
                      />
                      {tiffin.contents.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            removeTiffinItemContent(index, contentIndex)
                          }
                          className="text-red-600 border-red-300 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addTiffinItemContent(index)}
                    className="mt-2 text-orange-600 border-orange-300 hover:bg-orange-50"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Item
                  </Button>
                </div>
              </motion.div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addTiffinItem}
              className="w-full h-12 text-orange-600 border-orange-300 hover:bg-orange-50 border-dashed"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Another Tiffin Item
            </Button>
          </motion.div>
        );

      case 5: // Pricing Plans
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Create Your Subscription Plans
              </h3>
              <p className="text-gray-600">
                Offer weekly and monthly plans to attract more customers
              </p>
            </div>

            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-dashed border-blue-200 rounded-2xl p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-gray-800 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                    Plan #{index + 1}
                  </h4>
                  {pricingPlans.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removePricingPlan(index)}
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="grid md:grid-cols-5 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Plan Type
                    </Label>
                    <Select
                      value={plan.plan_type}
                      onValueChange={(value: "weekly" | "monthly") =>
                        updatePricingPlan(index, "plan_type", value)
                      }
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Meals Per Day
                    </Label>
                    <Select
                      value={plan.meals_per_day.toString()}
                      onValueChange={(value) =>
                        updatePricingPlan(
                          index,
                          "meals_per_day",
                          parseInt(value) as 1 | 2
                        )
                      }
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 (Lunch Only)</SelectItem>
                        <SelectItem value="2">2 (Lunch & Dinner)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Plan Price (₹)
                    </Label>
                    <Input
                      type="number"
                      value={plan.price}
                      onChange={(e) =>
                        updatePricingPlan(index, "price", e.target.value)
                      }
                      placeholder="1000"
                      className="h-10"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Original Price (₹)
                    </Label>
                    <Input
                      type="number"
                      value={plan.original_price}
                      onChange={(e) =>
                        updatePricingPlan(
                          index,
                          "original_price",
                          e.target.value
                        )
                      }
                      placeholder="1200"
                      className="h-10"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Discount (%)
                    </Label>
                    <Input
                      type="number"
                      value={plan.discount_percentage}
                      onChange={(e) =>
                        updatePricingPlan(
                          index,
                          "discount_percentage",
                          e.target.value
                        )
                      }
                      placeholder="15"
                      max="50"
                      className="h-10"
                    />
                  </div>
                </div>
              </motion.div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addPricingPlan}
              className="w-full h-12 text-blue-600 border-blue-300 hover:bg-blue-50 border-dashed"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Another Plan
            </Button>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="allowSingleTiffin"
                  checked={formData.allow_single_tiffin}
                  onCheckedChange={(checked) =>
                    handleInputChange("allow_single_tiffin", checked as boolean)
                  }
                />
                <label
                  htmlFor="allowSingleTiffin"
                  className="text-sm font-medium text-gray-700"
                >
                  Allow customers to buy single tiffins (not just weekly/monthly
                  plans)
                </label>
              </div>
            </div>
          </motion.div>
        );

      case 6: // Timing
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Set Your Operating Hours
              </h3>
              <p className="text-gray-600">
                When are you available to serve your customers?
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Lunch Hours
                </Label>
                <Input
                  value={formData.timing_lunch}
                  onChange={(e) =>
                    handleInputChange("timing_lunch", e.target.value)
                  }
                  placeholder="12:00 PM - 2:00 PM"
                  className="h-12"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Dinner Hours
                </Label>
                <Input
                  value={formData.timing_dinner}
                  onChange={(e) =>
                    handleInputChange("timing_dinner", e.target.value)
                  }
                  placeholder="7:00 PM - 9:00 PM"
                  className="h-12"
                />
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Specialties (comma separated)
              </Label>
              <Input
                value={formData.specialties}
                onChange={(e) =>
                  handleInputChange("specialties", e.target.value)
                }
                placeholder="Dal Tadka, Biryani, Roti, etc."
                className="h-12"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Camera className="w-6 h-6 text-blue-600 mr-3" />
                <h4 className="font-semibold text-blue-800">
                  Photos (Coming Soon)
                </h4>
              </div>
              <div className="text-center py-8">
                <Camera className="w-16 h-16 mx-auto text-blue-400 mb-4" />
                <p className="text-blue-700 mb-2">
                  Photo upload feature will be available soon
                </p>
                <p className="text-sm text-blue-600">
                  For now, you can share photos via WhatsApp after registration
                </p>
              </div>
            </div>
          </motion.div>
        );

      case 7: // Complete
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
            >
              <CheckCircle2 className="w-16 h-16 text-white" />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                🎉 Congratulations!
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Your registration has been submitted successfully! We'll contact
                you within 24 hours for verification.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8"
            >
              {[
                {
                  icon: Phone,
                  title: "Verification Call",
                  desc: "We'll call you to verify your details",
                },
                {
                  icon: Star,
                  title: "Profile Review",
                  desc: "Our team will review your profile",
                },
                {
                  icon: CheckCircle2,
                  title: "Go Live",
                  desc: "Start receiving orders from customers",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6"
            >
              <h3 className="font-semibold text-green-800 mb-2">
                What's Next?
              </h3>
              <p className="text-green-700 text-sm">
                Keep an eye on your phone and email. Our team will reach out to
                you soon to complete the verification process and help you get
                started on your culinary journey!
              </p>
            </motion.div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Progress Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <motion.div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${currentStepData.color} shadow-lg`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <currentStepData.icon className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {currentStepData.title}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {currentStepData.subtitle}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 mb-1">
                  Step {currentStep + 1} of {steps.length}
                </div>
                <div className="text-lg font-semibold text-gray-800">
                  {Math.round(progress)}%
                </div>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
          <div className="p-8">
            <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>
          </div>

          {/* Navigation */}
          {currentStep !== 0 && currentStep !== steps.length - 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 px-8 py-6 flex justify-between items-center border-t border-gray-100"
            >
              <Button
                onClick={prevStep}
                variant="outline"
                className="flex items-center space-x-2 h-12 px-6"
                disabled={currentStep === 0}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>

              {currentStep === steps.length - 2 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex items-center space-x-2 h-12 px-8 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Complete Registration</span>
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  className="flex items-center space-x-2 h-12 px-6 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </motion.div>
          )}

          {/* Welcome Step Navigation */}
          {currentStep === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 px-8 py-6 text-center border-t border-gray-100"
            >
              <Button
                onClick={nextStep}
                size="lg"
                className="h-14 px-12 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-lg font-semibold"
              >
                <span>Let's Get Started</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BecomeProvider;
