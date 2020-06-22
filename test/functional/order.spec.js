const { test, trait } = use('Test/Suite')('Order');
trait('Test/ApiClient');
trait('Auth/Client');

const user = {
  email: 'filipe@gmail.com',
  password: '123456',
};
const token = {};
const order = {};
test('should be able to Log user in', async ({ client }) => {
  const response = await client.post('/login').send(user).end();
  response.assertStatus(200);
  token.token = response.body.token;
  token.refreshToken = response.body.refreshToken;
});

test('Should be able to request a new Order', async ({ client }) => {
  const response = await client
    .post('/order')
    .send({
      subtotal: 250,
      products: [
        {
          id: 1,
          qtd: 5,
        },
      ],
    })
    .header('Authorization', `Bearer ${token.token}`)
    .header('refresh_token', token.refreshToken)
    .end();
  response.assertStatus(200);
  token.token = response.headers.token;
  token.refreshToken = response.headers.refresh_token;

  order.id = response.body.id;
});

test('Should be able to show orders', async ({ client }) => {
  const response = await client
    .get('/order')
    .header('Authorization', `Bearer ${token.token}`)
    .header('refresh_token', token.refreshToken)
    .end();
  response.assertStatus(200);
});
