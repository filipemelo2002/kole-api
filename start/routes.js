/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', () => ({ greeting: 'Hello world in JSON' }));
Route.post('/login', 'SessionController.create');
Route.post('/users', 'UserController.create');
Route.get('/users', 'UserController.show').middleware('auth');
Route.put('/users', 'UserController.update').middleware('auth');
Route.delete('/users', 'UserController.destroy').middleware('auth');

Route.post('/filters', 'FilterController.create').middleware('admin');
Route.get('/filters', 'FilterController.show');
Route.put('/filters/:id', 'FilterController.update').middleware(
  'admin',
);
Route.delete('/filters/:id', 'FilterController.destroy').middleware(
  'admin',
);

Route.post('/products', 'ProductController.create').middleware([
  'admin',
]);
Route.get('/products/:filter', 'ProductController.show');
Route.get('/products', 'ProductController.list');
Route.put('/products/:id', 'ProductController.update').middleware([
  'admin',
]);
Route.delete(
  '/products/:id',
  'ProductController.destroy',
).middleware(['admin']);

Route.post('/order', 'OrderController.create').middleware('auth');
Route.get('/order', 'OrderController.show').middleware('auth');
Route.get('/order/all', 'OrderController.list').middleware('admin');
Route.put('/order/:id', 'OrderController.update').middleware('admin');
Route.delete('/order/:id', 'OrderController.destroy').middleware(
  'admin',
);

Route.post('/admin', 'AdminController.create');
Route.get('/admin', 'AdminController.show').middleware('admin');
Route.put('/admin', 'AdminController.update').middleware('admin');
Route.delete('/admin', 'AdminController.destroy').middleware('admin');

Route.post('/admin/login', 'AdminSessionController.create');
