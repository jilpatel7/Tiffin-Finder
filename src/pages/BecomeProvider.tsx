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
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  ChefHat,
  DollarSign,
  Users,
  Clock,
  MapPin,
  Camera,
  Plus,
  Minus,
  X,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

      toast.success(
        "Registration submitted successfully! We'll contact you within 24 hours for verification."
      );

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        whatsapp: "",
        selectedAreas: [],
        address: "",
        description: "",
        cuisines: [],
        food_type: "",
        delivery_types: [],
        specialties: "",
        timing_lunch: "",
        timing_dinner: "",
        experience_years: "",
        allow_single_tiffin: false,
      });
      setTiffinItems([
        { name: "", price: "", description: "", contents: [""] },
      ]);
      setPricingPlans([
        {
          plan_type: "weekly",
          meals_per_day: 1,
          price: "",
          original_price: "",
          discount_percentage: "",
        },
      ]);
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Failed to submit registration. Please try again.");
    } finally {
      setLoading(false);
    }
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
                  <div className="mb-4">
                    <Label>
                      Service Areas * (Select multiple areas you can serve)
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2 max-h-40 overflow-y-auto border rounded-lg p-3">
                      {areas.map((area) => (
                        <div key={area} className="flex items-center space-x-2">
                          <Checkbox
                            id={area}
                            checked={formData.selectedAreas.includes(area)}
                            onCheckedChange={() => handleAreaToggle(area)}
                          />
                          <label htmlFor={area} className="text-sm">
                            {area}
                          </label>
                        </div>
                      ))}
                    </div>
                    {formData.selectedAreas.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.selectedAreas.map((area) => (
                          <Badge
                            key={area}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            {area}
                            <X
                              className="w-3 h-3 cursor-pointer"
                              onClick={() => handleAreaToggle(area)}
                            />
                          </Badge>
                        ))}
                      </div>
                    )}
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
                      <Label>Food Type *</Label>
                      <Select
                        value={formData.food_type}
                        onValueChange={(value: "veg" | "non-veg" | "both") =>
                          handleInputChange("food_type", value)
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
                        value={formData.experience_years}
                        onChange={(e) =>
                          handleInputChange("experience_years", e.target.value)
                        }
                        placeholder="Years of cooking experience"
                        type="number"
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
                            checked={formData.delivery_types.includes(type)}
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

                {/* Tiffin Items */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Tiffin Items & Pricing
                  </h3>

                  {tiffinItems.map((tiffin, index) => (
                    <Card
                      key={index}
                      className="mb-4 border-2 border-dashed border-gray-200"
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-semibold">
                            Tiffin Item #{index + 1}
                          </h4>
                          {tiffinItems.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeTiffinItem(index)}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                          )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <Label>Tiffin Name *</Label>
                            <Input
                              value={tiffin.name}
                              onChange={(e) =>
                                updateTiffinItem(index, "name", e.target.value)
                              }
                              placeholder="e.g., Dal Makhani Special"
                            />
                          </div>
                          <div>
                            <Label>Price (₹) *</Label>
                            <Input
                              type="number"
                              value={tiffin.price}
                              onChange={(e) =>
                                updateTiffinItem(index, "price", e.target.value)
                              }
                              placeholder="150"
                            />
                          </div>
                        </div>

                        <div className="mb-4">
                          <Label>Description</Label>
                          <Textarea
                            value={tiffin.description}
                            onChange={(e) =>
                              updateTiffinItem(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                            placeholder="Brief description of the tiffin"
                            rows={2}
                          />
                        </div>

                        <div>
                          <Label>What's included in this tiffin? *</Label>
                          {tiffin.contents.map((content, contentIndex) => (
                            <div key={contentIndex} className="flex gap-2 mt-2">
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
                              />
                              {tiffin.contents.length > 1 && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    removeTiffinItemContent(index, contentIndex)
                                  }
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
                            className="mt-2"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Item
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={addTiffinItem}
                    className="mb-4"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Another Tiffin Item
                  </Button>
                </div>

                {/* Pricing Plans */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Weekly & Monthly Plans
                  </h3>

                  {pricingPlans.map((plan, index) => (
                    <Card
                      key={index}
                      className="mb-4 border-2 border-dashed border-gray-200"
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-semibold">Plan #{index + 1}</h4>
                          {pricingPlans.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removePricingPlan(index)}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                          )}
                        </div>

                        <div className="grid md:grid-cols-5 gap-4">
                          <div>
                            <Label>Plan Type</Label>
                            <Select
                              value={plan.plan_type}
                              onValueChange={(value: "weekly" | "monthly") =>
                                updatePricingPlan(index, "plan_type", value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Meals Per Day</Label>
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
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">
                                  1 (Lunch Only)
                                </SelectItem>
                                <SelectItem value="2">
                                  2 (Lunch & Dinner)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Plan Price (₹)</Label>
                            <Input
                              type="number"
                              value={plan.price}
                              onChange={(e) =>
                                updatePricingPlan(
                                  index,
                                  "price",
                                  e.target.value
                                )
                              }
                              placeholder="1000"
                            />
                          </div>
                          <div>
                            <Label>Original Price (₹)</Label>
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
                            />
                          </div>
                          <div>
                            <Label>Discount (%)</Label>
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
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={addPricingPlan}
                    className="mb-4"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Another Plan
                  </Button>

                  <div className="flex items-center space-x-2 mt-4">
                    <Checkbox
                      id="allowSingleTiffin"
                      checked={formData.allow_single_tiffin}
                      onCheckedChange={(checked) =>
                        handleInputChange(
                          "allow_single_tiffin",
                          checked as boolean
                        )
                      }
                    />
                    <label htmlFor="allowSingleTiffin" className="text-sm">
                      Allow customers to buy single tiffins (not just
                      weekly/monthly plans)
                    </label>
                  </div>
                </div>

                {/* Operational Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Operational Information
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label>Lunch Hours</Label>
                      <Input
                        value={formData.timing_lunch}
                        onChange={(e) =>
                          handleInputChange("timing_lunch", e.target.value)
                        }
                        placeholder="12:00 PM - 2:00 PM"
                      />
                    </div>
                    <div>
                      <Label>Dinner Hours</Label>
                      <Input
                        value={formData.timing_dinner}
                        onChange={(e) =>
                          handleInputChange("timing_dinner", e.target.value)
                        }
                        placeholder="7:00 PM - 9:00 PM"
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
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white text-lg py-3"
                >
                  {loading ? "Submitting..." : "Submit Registration"}
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
