import { supabase, type ProviderWithDetails } from "@/lib/supabase";

export class ProviderService {
  // Fetch all approved providers with their related data
  static async getAllProviders(): Promise<ProviderWithDetails[]> {
    try {
      // First, get all approved providers
      const { data: providers, error: providersError } = await supabase
        .from("providers")
        .select("*")
        .eq("status", "approved")
        .order("rating", { ascending: false });

      if (providersError) throw providersError;
      if (!providers) return [];

      // Get all related data for these providers
      const providerIds = providers.map((p) => p.id);

      const [
        { data: areas },
        { data: cuisines },
        { data: deliveryTypes },
        { data: tiffinItems },
        { data: tiffinContents },
        { data: pricingPlans },
        { data: testimonials },
        { data: gallery },
        { data: deliverySlots },
      ] = await Promise.all([
        supabase
          .from("provider_areas")
          .select("*")
          .in("provider_id", providerIds),
        supabase
          .from("provider_cuisines")
          .select("*")
          .in("provider_id", providerIds),
        supabase
          .from("provider_delivery_types")
          .select("*")
          .in("provider_id", providerIds),
        supabase
          .from("tiffin_items")
          .select("*")
          .in("provider_id", providerIds)
          .eq("is_available", true)
          .order("sort_order"),
        supabase.from("tiffin_item_contents").select("*").order("sort_order"),
        supabase
          .from("pricing_plans")
          .select("*")
          .in("provider_id", providerIds)
          .eq("is_active", true)
          .order("sort_order"),
        supabase
          .from("provider_testimonials")
          .select("*")
          .in("provider_id", providerIds)
          .eq("is_verified", true),
        supabase
          .from("provider_gallery")
          .select("*")
          .in("provider_id", providerIds)
          .order("sort_order"),
        supabase
          .from("delivery_slots")
          .select("*")
          .in("provider_id", providerIds)
          .eq("is_active", true)
          .order("sort_order"),
      ]);

      // Combine all data
      return providers.map((provider) => {
        const providerAreas =
          areas
            ?.filter((a) => a.provider_id === provider.id)
            .map((a) => a.area) || [];
        const providerCuisines =
          cuisines
            ?.filter((c) => c.provider_id === provider.id)
            .map((c) => c.cuisine) || [];
        const providerDeliveryTypes =
          deliveryTypes
            ?.filter((d) => d.provider_id === provider.id)
            .map((d) => d.delivery_type) || [];
        const providerTiffinItems =
          tiffinItems?.filter((t) => t.provider_id === provider.id) || [];
        const providerPricingPlans =
          pricingPlans?.filter((p) => p.provider_id === provider.id) || [];
        const providerTestimonials =
          testimonials?.filter((t) => t.provider_id === provider.id) || [];
        const providerGallery =
          gallery?.filter((g) => g.provider_id === provider.id) || [];
        const providerDeliverySlots =
          deliverySlots
            ?.filter((s) => s.provider_id === provider.id)
            .map((s) => s.slot_time) || [];

        // Add contents to tiffin items
        const tiffinItemsWithContents = providerTiffinItems.map((item) => ({
          ...item,
          contents:
            tiffinContents
              ?.filter((c) => c.tiffin_item_id === item.id)
              .map((c) => c.content_item) || [],
        }));

        return {
          ...provider,
          areas: providerAreas,
          cuisines: providerCuisines,
          delivery_types: providerDeliveryTypes,
          tiffin_items: tiffinItemsWithContents,
          pricing_plans: providerPricingPlans,
          testimonials: providerTestimonials,
          gallery: providerGallery,
          delivery_slots: providerDeliverySlots,
        };
      });
    } catch (error) {
      console.error("Error fetching providers:", error);
      return [];
    }
  }

  // Fetch a single provider by ID
  static async getProviderById(
    id: string
  ): Promise<ProviderWithDetails | null> {
    try {
      const providers = await this.getAllProviders();
      return providers.find((p) => p.id === id) || null;
    } catch (error) {
      console.error("Error fetching provider:", error);
      return null;
    }
  }

  // Register a new provider
  static async registerProvider(providerData: {
    name: string;
    email: string;
    phone: string;
    whatsapp?: string;
    address?: string;
    description?: string;
    food_type: "veg" | "non-veg" | "both";
    experience_years?: number;
    specialties?: string[];
    timing_lunch?: string;
    timing_dinner?: string;
    allow_single_tiffin: boolean;
    areas: string[];
    cuisines: string[];
    delivery_types: string[];
    tiffin_items: Array<{
      name: string;
      price: number;
      description?: string;
      contents: string[];
    }>;
    pricing_plans: Array<{
      plan_type: "weekly" | "monthly";
      meals_per_day: 1 | 2;
      price: number;
      original_price?: number;
      discount_percentage?: number;
      description?: string;
    }>;
  }) {
    try {
      // Insert provider
      const { data: provider, error: providerError } = await supabase
        .from("providers")
        .insert({
          name: providerData.name,
          email: providerData.email,
          phone: providerData.phone,
          whatsapp: providerData.whatsapp,
          address: providerData.address,
          description: providerData.description,
          food_type: providerData.food_type,
          experience_years: providerData.experience_years,
          specialties: providerData.specialties,
          timing_lunch: providerData.timing_lunch,
          timing_dinner: providerData.timing_dinner,
          allow_single_tiffin: providerData.allow_single_tiffin,
          status: "pending",
        })
        .select()
        .single();

      if (providerError) throw providerError;
      if (!provider) throw new Error("Failed to create provider");

      const providerId = provider.id;

      // Insert related data
      const insertPromises = [];

      // Insert areas
      if (providerData.areas.length > 0) {
        insertPromises.push(
          supabase.from("provider_areas").insert(
            providerData.areas.map((area) => ({
              provider_id: providerId,
              area,
            }))
          )
        );
      }

      // Insert cuisines
      if (providerData.cuisines.length > 0) {
        insertPromises.push(
          supabase.from("provider_cuisines").insert(
            providerData.cuisines.map((cuisine) => ({
              provider_id: providerId,
              cuisine,
            }))
          )
        );
      }

      // Insert delivery types
      if (providerData.delivery_types.length > 0) {
        insertPromises.push(
          supabase.from("provider_delivery_types").insert(
            providerData.delivery_types.map((delivery_type) => ({
              provider_id: providerId,
              delivery_type,
            }))
          )
        );
      }

      // Insert tiffin items and their contents
      if (providerData.tiffin_items.length > 0) {
        const { data: tiffinItems, error: tiffinError } = await supabase
          .from("tiffin_items")
          .insert(
            providerData.tiffin_items.map((item, index) => ({
              provider_id: providerId,
              name: item.name,
              price: item.price,
              description: item.description,
              sort_order: index,
            }))
          )
          .select();

        if (tiffinError) throw tiffinError;

        // Insert tiffin item contents
        if (tiffinItems) {
          const contentInserts: {
            tiffin_item_id: string;
            content_item: string;
            sort_order: number;
          }[] = [];
          for (let i = 0; i < tiffinItems.length; i++) {
            const tiffinItem = tiffinItems[i];
            const contents = providerData.tiffin_items[i].contents;
            contents.forEach((content, contentIndex) => {
              contentInserts.push({
                tiffin_item_id: tiffinItem.id,
                content_item: content,
                sort_order: contentIndex,
              });
            });
          }
          if (contentInserts.length > 0) {
            insertPromises.push(
              supabase.from("tiffin_item_contents").insert(contentInserts)
            );
          }
        }
      }

      // Insert pricing plans
      if (providerData.pricing_plans.length > 0) {
        insertPromises.push(
          supabase.from("pricing_plans").insert(
            providerData.pricing_plans.map((plan, index) => ({
              provider_id: providerId,
              plan_type: plan.plan_type,
              meals_per_day: plan.meals_per_day,
              price: plan.price,
              original_price: plan.original_price,
              discount_percentage: plan.discount_percentage,
              description: plan.description,
              sort_order: index,
            }))
          )
        );
      }

      // Execute all inserts
      await Promise.all(insertPromises);

      return { success: true, providerId };
    } catch (error) {
      console.error("Error registering provider:", error);
      throw error;
    }
  }

  // Add a testimonial for a provider
  static async addTestimonial(
    providerId: string,
    testimonial: {
      customer_name: string;
      rating: number;
      comment: string;
    }
  ) {
    try {
      const { error } = await supabase.from("provider_testimonials").insert({
        provider_id: providerId,
        customer_name: testimonial.customer_name,
        rating: testimonial.rating,
        comment: testimonial.comment,
        is_verified: false, // Will be verified by admin
      });

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error("Error adding testimonial:", error);
      throw error;
    }
  }

  // Get unique areas for filtering
  static async getUniqueAreas(): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from("provider_areas")
        .select("area")
        .order("area");

      if (error) throw error;

      const uniqueAreas = [...new Set(data?.map((item) => item.area) || [])];
      return uniqueAreas;
    } catch (error) {
      console.error("Error fetching areas:", error);
      return [];
    }
  }

  // Get unique cuisines for filtering
  static async getUniqueCuisines(): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from("provider_cuisines")
        .select("cuisine")
        .order("cuisine");

      if (error) throw error;

      const uniqueCuisines = [
        ...new Set(data?.map((item) => item.cuisine) || []),
      ];
      return uniqueCuisines;
    } catch (error) {
      console.error("Error fetching cuisines:", error);
      return [];
    }
  }
}
