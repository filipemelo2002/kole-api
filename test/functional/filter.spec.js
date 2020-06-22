const { test, trait } = use('Test/Suite')('Filter');

trait('Test/ApiClient');
trait('Auth/Client');
const filter = {};
const admin = { email: 'filipe@domain.com', password: '123456' };
const token = {};

test('should be able to create a new Filter', async ({ client }) => {
  const session = await client.post('/admin/login').send(admin).end();
  token.token = session.headers.token;
  token.refreshToken = session.headers.refresh_token;

  const response = await client
    .post('/filters')
    .send({ title: 'Attic' })
    .header('Authorization', `Bearer ${session.body.token}`)
    .header('refresh_token', session.body.refreshToken)
    .end();
  token.token = response.headers.token;
  token.refreshToken = response.headers.refresh_token;

  response.assertStatus(200);
  filter.title = response.body.title;
  filter.id = response.body.id;
});

test('Should be able to List all filters', async ({ client }) => {
  const response = await client.get('/filters').end();
  response.assertStatus(200);
});

test('Should be able to update Filter', async ({ client }) => {
  const response = await client
    .put(`/filters/${filter.id}`)
    .send({ title: 'Living Room' })
    .header('Authorization', `Bearer ${token.token}`)
    .header('refresh_token', token.refreshToken)
    .end();
  response.assertStatus(200);
  token.token = response.headers.token;
  token.refreshToken = response.headers.refresh_token;
});
test('Should be able to  destroy filter', async ({ client }) => {
  const response = await client
    .delete(`/filters/${filter.id}`)
    .header('Authorization', `Bearer ${token.token}`)
    .header('refresh_token', token.refreshToken)
    .end();
  response.assertStatus(204);
});
