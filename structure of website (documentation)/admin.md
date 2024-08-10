Rough path for admin:

1. request will come onto the app.js (backend) first by user.
2. so the request path for this will be /admin/.......So the app.use('/admin', adminRouter) will be used
3. this will redirect to /routes/admin
4. /routes/admin will redirect this request to postProductAdd which is created in ./controller/product
5. /controller/product will redirect the request to the Database of product in the model folder (./model/product).
6. Finally the controller will revert back the request to the routes/admin.js file which will redirect to app.js.
