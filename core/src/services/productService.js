import prisma from "../configs/prisma.js";
export const createProducts = async(product_name)=>{

    // Create the user
    const newProduct = await prisma.Product.create({
      data: {
        product_name,
      },
    });
    return newProduct;
}