const Order = use('App/Models/Order');
const crypto = require('crypto');

class OrderController {
  async create({ request, auth }) {
    const order_id = crypto.randomBytes(3).toString('HEX');
    const { products, ...data } = request.only([
      'subtotal',
      'obs',
      'status',
      'products',
    ]);
    data.order_id = order_id;
    data.user_id = auth.jwtPayload.uid;
    const order = await Order.create(data);
    await order.products().attach(
      products.map(({ id }) => id),
      (row) => {
        const product = products.find(
          (productInstance) => productInstance.id === row.product_id,
        );
        row.qtd = product.qtd;
      },
    );
    await order.load('products');
    return order;
  }

  async show({ auth }) {
    const id = auth.jwtPayload.uid;
    const orders = await Order.findBy('user_id', id);
    await orders.load('products');
    return orders;
  }

  async list() {
    const order = await Order.query().with('products').fetch();
    return order;
  }

  async update({ request }) {
    const { id } = request.params;
    const { status } = request.only(['status']);
    const order = await Order.find(id);
    order.status = status;
    await order.save();
    return order;
  }

  async destroy({ request }) {
    const { id } = request.params;
    const order = await Order.find(id);
    await order.delete();
  }
}

module.exports = OrderController;
