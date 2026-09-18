import { Request, Response } from "express";
import { productService } from "../services/productService";

export async function getProducts(req: Request, res: Response) {
  try {
    const products = await productService.getAllProducts(req.query);
    res.json({ success: true, count: products.length, data: products });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function getProductBySlug(req: Request, res: Response) {
  try {
    const slug = req.params.slug as string;
    const product = await productService.getProductBySlug(slug);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.json({ success: true, data: product });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const product = await productService.updateProduct(id, req.body);
    res.json({ success: true, data: product });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    await productService.deleteProduct(id);
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}
