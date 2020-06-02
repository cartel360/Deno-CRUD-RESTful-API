import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} from "./controllers/products.ts";

const router = new Router();

router.get("/API/products", getProducts)
  .get("/API/products/:id", getProduct)
  .post("/API/products", addProduct)
  .put("/API/products", updateProduct)
  .delete("/API/products", deleteProduct);

export default router;
