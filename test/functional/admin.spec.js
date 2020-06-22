const { test, trait } = use('Test/Suite')('Admin');

trait('Test/ApiClient');
trait('Auth/Client');

const data = {
  email: 'admin@gmail.com',
  password: '123456',
};
const token = { token: '', refreshToken: '' };
test('it should be able to create a new Admin', async ({
  client,
}) => {
  const request = await client.post('/admin').send(data).end();
  request.assertStatus(200);
});

test('it should be able to login', async ({ client }) => {
  const response = await client.post('/admin/login').send(data).end();
  response.assertStatus(200);
  token.token = response.body.token;
  token.refreshToken = response.body.refreshToken;
});

test('it should be able to update admins', async ({ client }) => {
  data.email = 'adminNewMail@gmail.com';
  const response = await client
    .put('/admin')
    .send(data)
    .header('Authorization', `Bearer ${token.token}`)
    .header('refresh_token', token.refreshToken)
    .end();
  response.assertStatus(200);
  token.token = response.headers.token;
  token.refreshToken = response.headers.refresh_token;
});

test('it should be able to destroy admin', async ({ client }) => {
  const response = await client
    .delete('admin')
    .header('Authorization', `Bearer ${token.token}`)
    .header('refresh_token', token.refreshToken)
    .end();
  response.assertStatus(200);
});
