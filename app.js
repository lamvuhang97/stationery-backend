var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var productsRouter = require('./routes/products');
var categoriesRouter = require('./routes/categories');
var ordersRouter = require('./routes/orders');
var orderdetailsRouter = require('./routes/orderdetails');
var cartsRouter = require('./routes/carts');
var imageRouter = require('./routes/images');
var paypalRouter = require('./routes/paypal');
var reviewsRouter = require('./routes/reviews');
var addressesRouter = require('./routes/addresses');
var transactionsRouter = require('./routes/transactions');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/orders', ordersRouter);
app.use('/orderdetails', orderdetailsRouter);
app.use('/carts', cartsRouter);
app.use('/images', imageRouter);
app.use('/paypal', paypalRouter);
app.use('/reviews', reviewsRouter);
app.use('/addresses', addressesRouter);
app.use('/transactions', transactionsRouter);


app.post("/webhook", async (req, res) => {
  // console.log("app", req.body);
  const type = req.body.event_type;
  const paypalPayoutId = req.body.resource.payout_batch_id;
  const paypalTransactionId = req.body.resource.transaction_id;

  console.log(type, paypalPayoutId, req.body);
  switch (type) {
    case "PAYMENT.PAYOUTS-ITEM.SUCCEEDED":
      console.log(type, paypalPayoutId, req.body);
      // await transactionController.updateSuccessfulTransaction(
      //   paypalPayoutId,
      //   paypalTransactionId
      // );
      break;
    case "PAYMENT.PAYOUTS-ITEM.UNCLAIMED":
      console.log(type, paypalPayoutId, req.body);
      // await transactionController.updateUnclaimedTransaction(
      //   paypalPayoutId,
      //   paypalTransactionId
      // );
      break;
    case "PAYMENT.PAYOUTS-ITEM.FAILED":
      console.log(type, paypalPayoutId, req.body);
      // await transactionController.updateFailedTransaction(
      //   paypalPayoutId,
      //   paypalTransactionId
      // );
      break;
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
