const { test, trait } = use('Test/Suite')('Product');
trait('Test/ApiClient');
trait('Auth/Client');

const Helpers = use('Helpers');
const product = {};
const admin = { email: 'filipe@domain.com', password: '123456' };
const token = {};

test('it should be able to login', async ({ client }) => {
  const response = await client
    .post('/admin/login')
    .send(admin)
    .end();
  response.assertStatus(200);
  token.token = response.body.token;
  token.refreshToken = response.body.refreshToken;
});

test('Should be able to create a Product', async ({ client }) => {
  const response = await client
    .post('/products')
    .field(
      'description',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    )
    .field('price', 250)
    .field('filter_id', 1)
    .attach('picture', Helpers.tmpPath('picture.jpg'))
    .attach('picture', Helpers.tmpPath('picture.jpg'))
    .header('Authorization', `Bearer ${token.token}`)
    .header('refresh_token', token.refreshToken)
    .end();

  response.assertStatus(200);

  product.id = response.body.id;
  product.price = response.body.price;
  product.description = response.body.description;

  token.token = response.headers.token;
  token.refreshToken = response.headers.refresh_token;
}).timeout(15000);

test('Should be able to update Product', async ({ client }) => {
  const response = await client
    .put(`/products/${product.id}`)
    .send({ price: 150 })
    .header('Authorization', `Bearer ${token.token}`)
    .header('refresh_token', token.refreshToken)
    .end();
  response.assertStatus(200);
  token.token = response.headers.token;
  token.refreshToken = response.headers.refresh_token;
});

test('Should be able to destroy product', async ({ client }) => {
  const response = await client
    .delete(`/products/${product.id}`)
    .header('Authorization', `Bearer ${token.token}`)
    .header('refresh_token', token.refreshToken)
    .end();

  response.assertStatus(204);
});
