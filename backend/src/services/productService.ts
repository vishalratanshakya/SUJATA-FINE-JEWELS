import { Product } from "../models/Product";

export class ProductService {
  async getAllProducts(query: any = {}) {
    const filter: any = {};
    if (query.category) filter.category = new RegExp(query.category, "i");
    if (query.metal) filter.metal = new RegExp(query.metal, "i");
    if (query.isNewArrival === "true") filter.isNewArrival = true;
    if (query.isBestseller === "true" || query.isBestSeller === "true") {
      filter.$or = [{ isBestseller: true }, { isBestSeller: true }];
    }
    return await Product.find(filter).sort({ createdAt: -1 });
  }

  async getProductBySlug(slug: string) {
    return await Product.findOne({ slug });
  }

  async createProduct(data: any) {
    if (!data.slug && data.name) {
      data.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    }
    const existing = await Product.findOne({ slug: data.slug });
    if (existing) {
      data.slug = `${data.slug}-${Date.now()}`;
    }
    if (!data.id) {
      data.id = `prod-${Date.now()}`;
    }
    return await Product.create(data);
  }

  async updateProduct(id: string, data: any) {
    return await Product.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteProduct(id: string) {
    return await Product.findByIdAndDelete(id);
  }
}

export const productService = new ProductService();
