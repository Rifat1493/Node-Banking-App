import prisma from "../configs/prisma.js";
export const createCustomers = async(customer_name)=>{

    // Create the user
    const newCustomer = await prisma.Customer.create({
      data: {
        customer_name,
      },
    });
    return newCustomer;
}