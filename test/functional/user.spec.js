const { test, trait } = use('Test/Suite')('User');

trait('Test/ApiClient');
trait('Auth/Client');

const data = {
  name: 'Random User',
  email: 'usertest@gmail.com',
  password: '123456',
  country: 'Brazil',
  address: 'Rua Vila Nova, 98',
  city: 'Jaboatão dos Guararapes',
  postal: '54320500',
  state: 'Pernambuco',
  phone: '+5581654872514',
};

function login(client, email, password) {
  return client.post('/login').send({ email, password }).end();
}
test('Should be able to Create a new User', async ({ client }) => {
  const user = await client.post('/users').send(data).end();
  user.assertStatus(200);
});

test('Should be able to Login to User Account', async ({
  client,
}) => {
  const { email, password } = data;
  const session = await login(client, email, password);
  session.assertStatus(200);
});

test('Should be able to update user', async ({ client }) => {
  const { email, password } = data;
  const session = await login(client, email, password);
  const response = await client
    .put('/users')
    .header('Authorization', `Bearer ${session.body.token}`)
    .header('refresh_token', session.body.refreshToken)
    .send({
      name: 'Filipe Melo',
      email: 'filipe123123@gmail.com',
      password: '123456',
      country: 'Brazil',
      address: 'Rua Vila Nova, 100',
      city: 'Jaboatão dos Guararapes',
      postal: '54320500',
      state: 'Pernambuco',
      phone: '+5581654872514',
    })
    .end();
  response.assertStatus(200);
});

test('Should be able to destroy user', async ({ client }) => {
  const { password } = data;
  const session = await login(
    client,
    'filipe123123@gmail.com',
    password,
  );
  const response = await client
    .delete('/users')
    .header('Authorization', `Bearer ${session.body.token}`)
    .header('refresh_token', session.body.refreshToken)
    .end();

  response.assertStatus(200);
});
