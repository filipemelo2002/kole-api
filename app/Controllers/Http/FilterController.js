const Filter = use('App/Models/Filter');
class FilterController {
  async create({ request }) {
    const data = request.only(['title']);
    const filter = await Filter.create(data);
    return filter;
  }

  async show() {
    const filter = await Filter.all();
    return filter;
  }

  async update({ request }) {
    const { id } = request.params;
    const data = request.only(['title']);
    const filter = await Filter.find(id);
    filter.title = data.title;
    filter.save();
    return filter;
  }

  async destroy({ request }) {
    const { id } = request.params;

    const filter = await Filter.findOrFail(id);
    await filter.delete();
  }
}

module.exports = FilterController;
