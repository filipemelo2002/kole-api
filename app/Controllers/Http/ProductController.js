const Product = use('App/Models/Product');
const Picture = use('App/Models/Picture');
// const Dropbox = use('Dropbox');
class ProductController {
  async create({ request }) {
    let product = {};
    const pictures = [];
    await request.multipart.field((name, value) => {
      request[name] = value;
    });
    await request.multipart.file('picture', {}, async (file) => {
      const path = `${Date.now()}-${file.clientName}`;
      const src = await Dropbox.upload(path, file.stream);
      pictures.push({ path, src });
    });
    await request.multipart.process();
    const { description, price, filter_id } = request;
    product = await Product.create({
      description,
      price,
      filter_id,
    });
    pictures.forEach((pic) => {
      pic.product_id = product.id;
    });
    await Picture.createMany(pictures);
    await product.load('pictures');
    return product;
  }

  async show({ request }) {
    const { filter } = request.params;
    const { page = 1 } = request.get();
    const products = await Product.query()
      .where('filter_id', filter)
      .with('pictures')
      .paginate(page);
    return products;
  }

  async list() {
    const products = await Product.query().with('pictures').fetch();
    return products;
  }

  async update({ request }) {
    const { id } = request.params;
    const data = request.only(['description', 'price', 'filter_id']);
    const product = await Product.find(id);
    await product.merge(data);
    await product.save();
    return product;
  }

  async destroy({ request }) {
    const { id } = request.params;
    const product = await Product.findOrFail(id);
    const picture = await Picture.query()
      .where('product_id', id)
      .fetch();
    const pictures = picture.toJSON();
    pictures.forEach((pic) => {
      Dropbox.destroy(pic.path);
    });
    await product.delete();
  }
}

module.exports = ProductController;
