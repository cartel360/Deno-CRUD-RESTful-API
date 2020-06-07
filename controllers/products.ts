import { Client } from "https://deno.land/x/postgres/mod.ts"; // Added This
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Product } from "../types.ts";
import { database } from "../config.ts"; // Added This

// Added This
// Init Client
const client = new Client(database);

let products: Product[] = [
  {
    id: "1",
    name: "Product One",
    description: "This is Product One",
    price: 50,
  },
  {
    id: "2",
    name: "Product Two",
    description: "This is Product Two",
    price: 100,
  },
  {
    id: "3",
    name: "Product Three",
    description: "This is Product Three",
    price: 150,
  },
];

const getProducts = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: products,
  };
};

// Get A Product @route GET /API/products
const getProduct = (
  { params, response }: { params: { id: string }; response: any },
) => {
  const product: Product | undefined = products.find((p) => p.id === params.id);

  if (product) {
    response.status = 200;
    response.body = {
      success: true,
      data: product,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No Product Found",
    };
  }
};

// Add A Product @route POST /API/products
const addProduct = async (
  { request, response }: { request: any; response: any },
) => {
  const body = await request.body();
  const product = body.vaue;

  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      msg: "No Data",
    };
  } else {
    try {
      await client.connect();

      const result = await client.query(
        "INSERT INTO products(name,description,price) VALUES($1,$2,$3)",
        product.name,
        product.description,
        product.price,
      );

      response.status = 201;
      response.body = {
        success: true,
        data: product,
      };
    } catch (error) {
      response.status = 500;
      response.body = {
        success: false,
        msg: error.toString(),
      };
    } finally {
      await client.end;
    }
  }
};

// Update A Product @route PUT /API/products/:id
const updateProduct = async (
  { params, request, response }: {
    params: { id: string };
    request: any;
    response: any;
  },
) => {
  const product: Product | undefined = products.find((p) => p.id === params.id);

  if (product) {
    const body = await request.body();

    const updateData: { name?: string; description?: string; price?: number } =
      body.value;

    products = products.map((p) =>
      p.id === params.id ? { ...p, ...updateData } : p
    );

    response.status = 200;
    response.body = {
      success: true,
      data: products,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No Product Found",
    };
  }
};

// Delete A Product @route DELETE /API/products/:id
const deleteProduct = (
  { params, response }: { params: { id: string }; response: any },
) => {
  products = products.filter((p) => p.id !== params.id);
  response.body = {
    success: true,
    msg: "Product Removed",
  };
};

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct };
