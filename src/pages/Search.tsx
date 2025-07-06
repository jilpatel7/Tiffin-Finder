import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Search as SearchIcon,
  Filter,
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Star,
  Clock,
  Utensils,
  ShoppingCart,
  Percent,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { ProviderService } from "@/services/providerService";
import type { ProviderWithDetails } from "@/lib/supabase";

const Search = () => {
  const [providers, setProviders] = useState<ProviderWithDetails[]>([]);
  const [areas, setAreas] = useState<string[]>([]);
  const [cuisines, setCuisines] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState("all");
  const [selectedCuisine, setSelectedCuisine] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDelivery, setSelectedDelivery] = useState("all");
  const [priceRange, setPriceRange] = useState([50, 300]);
  const [sortBy, setSortBy] = useState("rating");

  // Load data from Supabase
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [providersData, areasData, cuisinesData] = await Promise.all([
          ProviderService.getAllProviders(),
          ProviderService.getUniqueAreas(),
          ProviderService.getUniqueCuisines(),
        ]);

        setProviders(providersData);
        setAreas(areasData);
        setCuisines(cuisinesData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredProviders = useMemo(() => {
    const filtered = providers.filter((provider) => {
      const matchesSearch =
        provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.areas.some((area) =>
          area.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        provider.cuisines.some((c) =>
          c.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesArea =
        selectedArea === "all" || provider.areas.includes(selectedArea);
      const matchesCuisine =
        selectedCuisine === "all" ||
        provider.cuisines.includes(selectedCuisine);
      const matchesType =
        selectedType === "all" ||
        provider.food_type === selectedType ||
        provider.food_type === "both";
      const matchesDelivery =
        selectedDelivery === "all" ||
        provider.delivery_types.includes(selectedDelivery);

      // Check price range against tiffin items
      const minPrice = Math.min(
        ...provider.tiffin_items.map((item) => item.price)
      );
      const maxPrice = Math.max(
        ...provider.tiffin_items.map((item) => item.price)
      );
      const matchesPrice =
        minPrice >= priceRange[0] && maxPrice <= priceRange[1];

      return (
        matchesSearch &&
        matchesArea &&
        matchesCuisine &&
        matchesType &&
        matchesDelivery &&
        matchesPrice
      );
    });

    // Sort providers
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;

        case "price-low": {
          const aMinPrice = Math.min(
            ...a.tiffin_items.map((item) => item.price)
          );
          const bMinPrice = Math.min(
            ...b.tiffin_items.map((item) => item.price)
          );
          return aMinPrice - bMinPrice;
        }

        case "price-high": {
          const aMaxPrice = Math.max(
            ...a.tiffin_items.map((item) => item.price)
          );
          const bMaxPrice = Math.max(
            ...b.tiffin_items.map((item) => item.price)
          );
          return bMaxPrice - aMaxPrice;
        }

        case "reviews":
          return b.review_count - a.review_count;

        default:
          return 0;
      }
    });

    return filtered;
  }, [
    providers,
    searchTerm,
    selectedArea,
    selectedCuisine,
    selectedType,
    selectedDelivery,
    priceRange,
    sortBy,
  ]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Area
        </Label>
        <Select value={selectedArea} onValueChange={setSelectedArea}>
          <SelectTrigger>
            <SelectValue placeholder="Select area" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Areas</SelectItem>
            {areas.map((area) => (
              <SelectItem key={area} value={area}>
                {area}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Cuisine
        </Label>
        <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
          <SelectTrigger>
            <SelectValue placeholder="Select cuisine" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cuisines</SelectItem>
            {cuisines.map((cuisine) => (
              <SelectItem key={cuisine} value={cuisine}>
                {cuisine}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Food Type
        </Label>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="veg">Vegetarian</SelectItem>
            <SelectItem value="non-veg">Non-Vegetarian</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Delivery Type
        </Label>
        <Select value={selectedDelivery} onValueChange={setSelectedDelivery}>
          <SelectTrigger>
            <SelectValue placeholder="Select delivery" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Delivery at Doorstep">Delivery</SelectItem>
            <SelectItem value="Pickup Only">Pickup</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-4 block">
          Price Range: ₹{priceRange[0]} - ₹{priceRange[1]} per meal
        </Label>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={300}
            min={50}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>₹50</span>
            <span>₹300</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div>
            <Label className="text-xs text-gray-500">Min Price</Label>
            <Input
              type="number"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([parseInt(e.target.value) || 50, priceRange[1]])
              }
              className="h-8 text-sm"
              min={50}
              max={300}
            />
          </div>
          <div>
            <Label className="text-xs text-gray-500">Max Price</Label>
            <Input
              type="number"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], parseInt(e.target.value) || 300])
              }
              className="h-8 text-sm"
              min={50}
              max={300}
            />
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading providers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Tiffin Service
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover authentic homemade meals from verified providers in your
            area
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center w-full">
            {/* Search - Always full width */}
            <div className="w-full relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search by name, area, or cuisine..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 w-full"
              />
            </div>

            {/* Sort & Filter - On mobile: side by side (50% each), on desktop: sort only */}
            <div className="w-full flex gap-4 items-center lg:w-auto">
              {/* Sort dropdown */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-1/2 lg:w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="reviews">Most Reviews</SelectItem>
                </SelectContent>
              </Select>

              {/* Filter button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-1/2 lg:hidden">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </motion.div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block w-80"
          >
            <Card className="sticky top-24">
              <CardHeader>
                <h3 className="text-lg font-semibold flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </h3>
              </CardHeader>
              <CardContent>
                <FilterContent />
              </CardContent>
            </Card>
          </motion.div>

          {/* Results */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 text-sm text-gray-600"
            >
              Found {filteredProviders.length} tiffin service
              {filteredProviders.length !== 1 ? "s" : ""}
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <AnimatePresence>
                {filteredProviders.map((provider) => {
                  const primaryImage =
                    provider.gallery.find((img) => img.is_primary)?.image_url ||
                    provider.gallery[0]?.image_url ||
                    "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg";

                  const minPrice = Math.min(
                    ...provider.tiffin_items.map((item) => item.price)
                  );
                  const maxPrice = Math.max(
                    ...provider.tiffin_items.map((item) => item.price)
                  );

                  return (
                    <motion.div
                      key={provider.id}
                      variants={cardVariants}
                      whileHover={{ scale: 1.02 }}
                      layout
                    >
                      <Card className="h-full overflow-hidden border-2 border-gray-100 hover:border-orange-200 transition-all duration-300">
                        <div className="aspect-video relative overflow-hidden">
                          <img
                            src={primaryImage}
                            alt={provider.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge
                              variant={
                                provider.food_type === "veg"
                                  ? "secondary"
                                  : "destructive"
                              }
                            >
                              {provider.food_type === "veg"
                                ? "🌱 Veg"
                                : provider.food_type === "non-veg"
                                ? "🍖 Non-Veg"
                                : "🌱🍖 Both"}
                            </Badge>
                          </div>
                          <div className="absolute top-4 right-4 bg-white rounded-full px-2 py-1 text-sm font-medium flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            {provider.rating}
                          </div>
                          {provider.allow_single_tiffin && (
                            <div className="absolute bottom-4 left-4">
                              <Badge className="bg-green-100 text-green-800 text-xs hover:bg-green-500 hover:text-white transition-all duration-200 hover:shadow-md hover:scale-105">
                                <ShoppingCart className="h-3 w-3 mr-1" />
                                Single Tiffin Available
                              </Badge>
                            </div>
                          )}
                        </div>

                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold text-gray-900">
                              {provider.name}
                            </h3>
                            <span className="text-lg font-bold text-orange-600">
                              ₹{minPrice}-{maxPrice}
                            </span>
                          </div>

                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">
                              {provider.areas.join(", ")}
                            </span>
                          </div>

                          <div className="flex items-center text-gray-600 mb-3">
                            <Utensils className="h-4 w-4 mr-1" />
                            <span className="text-sm">
                              {provider.cuisines.join(", ")}
                            </span>
                          </div>

                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {provider.description}
                          </p>

                          {/* Show best pricing plan if available */}
                          {provider.pricing_plans.length > 0 && (
                            <div className="mb-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">
                                  Best Plan:
                                </span>
                                {provider.pricing_plans[0]
                                  .discount_percentage && (
                                  <Badge className="bg-red-100 text-red-800 text-xs hover:bg-red-200 hover:text-red-900 transition-colors duration-200">
                                    {
                                      provider.pricing_plans[0]
                                        .discount_percentage
                                    }
                                    <Percent className="w-3 h-3 mr-1" />
                                    OFF
                                  </Badge>
                                )}
                              </div>
                              <div className="text-sm text-gray-600">
                                {provider.pricing_plans[0].description} - ₹
                                {provider.pricing_plans[0].price}
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{provider.timing_lunch}</span>
                            </div>
                            <span className="text-xs">
                              {provider.review_count} reviews
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" asChild>
                                <a href={`tel:${provider.phone}`}>
                                  <Phone className="h-4 w-4" />
                                </a>
                              </Button>
                              <Button size="sm" variant="outline" asChild>
                                <a
                                  href={`https://wa.me/${
                                    provider.whatsapp?.replace("+", "") ||
                                    provider.phone.replace("+", "")
                                  }`}
                                >
                                  <MessageCircle className="h-4 w-4" />
                                </a>
                              </Button>
                              <Button size="sm" variant="outline" asChild>
                                <a href={`mailto:${provider.email}`}>
                                  <Mail className="h-4 w-4" />
                                </a>
                              </Button>
                            </div>
                            <Button
                              asChild
                              className="bg-orange-600 hover:bg-orange-700"
                            >
                              <Link
                                to={`/provider/${provider.id}`}
                                className="hover:text-white"
                              >
                                View Details
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {filteredProviders.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-gray-400 mb-4">
                  <SearchIcon className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No providers found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria or filters
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
