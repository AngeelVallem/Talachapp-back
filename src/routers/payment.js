const express = require("express");
const SECRET_STRIPE_KEY = process.env.SECRET_STRIPE_KEY;
const stripe = require("stripe")(SECRET_STRIPE_KEY);
const auth = require("../middlewares/auth");
const user = require("../usecases/users");


const router = express.Router()

router.patch("/success", auth.hasToken, async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  const subscription = await stripe.subscriptions.retrieve(
    session.subscription
  );

  const { Authorization } = req.headers;

  if (!Authorization) {
    res.status(401).json({
      success: false,
      message: "Not authorized",
      data: null,
    });
    return;
  }
  /* SE AGREGA SUBSCRIPTION_ID AL USUARIO LOGGEADO */
  const currentUser = await user.getUser(Authorization);
  await userUsesCases.updateById(currentUser._id, {
    subscriptionId: subscription.id,
  });
  res.redirect("/success/completed-subscription");
  res.end();
});

router.get(
  "/success/completed-subscription",
  auth.hasToken,
  async (req, res) => {
    const { Authorization } = req.headers;
    if (!Authorization) {
      res.status(401).json({
        success: false,
        message: "Not authorized",
        data: null,
      });
      return;
    }

    await userUsesCases.getProfile(Authorization);

    res.redirect("/success/completed-subscription");
    res.end();
  }
);

router.get("/subscription", auth.hasToken, async (req, res) => {
  try {
    const { Authorization } = req.headers;
    if (!Authorization) {
      res.status(401).json({
        success: false,
        message: "Not authorized",
        data: null,
      });
      return;
    }

    const currentUser = await user.getUser(Authorization);

    /* Traer la data de la subscripcion */
    const { subscriptionId } = currentUser;
    if (!subscriptionId) {
      res.status(402).json({
        success: false,
        message: "Payment Required",
        data: null,
      });
      return;
    }
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    res.status(200).json({
      success: true,
      message: "Subscription",
      data: {
        subscription,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
});

router.delete("/subscriptions/:id", auth.hasToken, async (req, res) => {
  try {
    const { id } = req.params;
    const canceledSub = await stripe.subscriptions.del(id);
    res.status(200).json({
      success: true,
      message: "Subscription cancel successfully",
      data: {
        canceledSub,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
});

// router.get("/canceled", authMiddlewares.auth, async (req, res) => {
//   res.send(`<html><body><h1>Process canceled</h1></body></html>`);
//   res.end();
// });

router.post(
  "/create-checkout-session",
  auth.hasToken ,
  async (req, res) => {
    const { priceId } = req.body;
    try {
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url:
          "http://localhost:8080/stripe/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "http://localhost:8080/stripe/canceled",
      });

      res.send({
        sessionId: session.id,
      });
    } catch (e) {
      res.status(400);
      return res.send({
        error: {
          message: e.message,
        },
      });
    }
  }
);

module.exports = router;
