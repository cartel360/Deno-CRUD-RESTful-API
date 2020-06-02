import { Product } from "../types.ts";

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
      msg: "Np Product Found",
    };
  }
};

// Add A Product @route POST /API/products
const addProduct = ({ response }: { response: any }) => {
  response.body = "add";
};

// Update A Product @route PUT /API/products/:id
const updateProduct = ({ response }: { response: any }) => {
  response.body = "update";
};

// Delete A Product @route DELETE /API/products/:id
const deleteProduct = ({ response }: { response: any }) => {
  response.body = "delete";
};

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct };
