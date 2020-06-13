require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `
    select  "productId",
            "name",
            "price",
            "image",
            "shortDescription"
      from  "products"
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const productId = Number(req.params.productId);
  const sql = `
    select  *
      from  "products"
     where  "productId" = $1
  `;
  const params = [productId];
  db.query(sql, params)
    .then(result => {
      if (result.rows.length < 1) {
        return next(new ClientError(`cannot ${req.method} ${req.originalUrl}, product does not exist`, 404));
      }
      return res.status(200).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {
  if (req.session.cartId) {
    const sql = `
      select  "c"."cartItemId",
              "c"."price",
              "p"."productId",
              "p"."image",
              "p"."name",
              "p"."shortDescription"
        from  "cartItems" as "c"
        join  "products" as "p" using ("productId")
       where  "c"."cartId" = $1
  `;
    const params = [req.session.cartId];
    db.query(sql, params)
      .then(result => {
        return res.json(result.rows);
      });
  } else {
    return [];
  }
});

app.post('/api/cart', (req, res, next) => {
  const productId = req.body.productId;
  if (!productId) {
    return res.status(400).json({ error: 'productId required' });
  }
  if (productId <= 0 || !Number.isInteger(Number(productId))) {
    return res.status(400).json({ error: 'invalid productId' });
  }
  const sql = `
    select  "price"
      from  "products"
     where  "productId" = $1
  `;
  const params = [productId];
  db.query(sql, params)
    .then(result => {
      if (result.rows.length < 1) {
        return next(new ClientError(`cannot find product with productId of ${productId}`, 404));
      }
      if (req.session.cartId) {
        return { cartId: req.session.cartId, ...result.rows[0] };
      } else {
        const insCart = `
          insert into "carts" ("cartId", "createdAt")
          values (default, default)
          returning "cartId"
        `;
        return (
          db.query(insCart)
            .then(result2 => {
              return { ...result2.rows[0], ...result.rows[0] };
            })
        );
      }
    })
    .then(cartPriceId => {
      req.session.cartId = cartPriceId.cartId;
      const insCartItemRow = `
        insert into "cartItems" ("cartId", "productId", "price")
        values ($1, $2, $3)
        returning "cartItemId"
      `;
      const cart = [cartPriceId.cartId, productId, cartPriceId.price];
      return (
        db.query(insCartItemRow, cart)
          .then(result => {
            return result.rows[0];
          })
      );
    })
    .then(result => {
      const cartItemId = result.cartItemId;
      const selCartItem = `
        select  "c"."cartItemId",
                "c"."price",
                "p"."productId",
                "p"."image",
                "p"."name",
                "p"."shortDescription"
          from  "cartItems" as "c"
          join  "products" as "p" using ("productId")
         where  "c"."cartItemId" = $1
      `;
      const cartIdParam = [cartItemId];
      return (
        db.query(selCartItem, cartIdParam)
          .then(result2 => {
            res.status(201).json(result2.rows[0]);
          })
      );
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred'
      });
    });
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
