import prisma from "../configs/prisma.js";

export const createOrderService = async (customer_id, order_date, details) => {
  return prisma.$transaction(async (prisma) => {
    const newOrder = await prisma.order.create({
      data: {
        customer_id,
        order_date,
      },
    });

    const orderDetails = details.map((detail) => ({
      order_id: newOrder.order_id,
      customer_id,
      product_id: detail.product_id,
      quantity: detail.quantity,
      unit_price: detail.unit_price,
    }));

    await prisma.orderDetail.createMany({
      data: orderDetails,
    });

    return newOrder;
  });
};
