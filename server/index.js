import express from "express";

const app = express();
const port = 3000; //add your port here
const PUBLISHABLE_KEY = "pk_test_51KTugfB8vhb9ZmvPaDZM44Ua4pV6IepGmG0or84O3aPSRXVUi60HziqVPVW8yCJSItVPlR2ghZ2FyaxL3Evx5DGD008ykP8eSx";
const SECRET_KEY = "sk_test_51KTugfB8vhb9ZmvPsMv30eCYJOjlqhIHKz27oMxQjiliQxlOXQ81lAWOzWVwhufTEehoMbpSLnHsm7Ile5e5h4Dg000m4sdiyJ";
import Stripe from "stripe";
import bodyParser from 'body-parser';


//Confirm the API version from your stripe dashboard
const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });

let key;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099, //lowest denomination of particular currency
      currency: "aed",
      payment_method_types: ["card"], //by default
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/send-key",  async (req, res) => {
  let {email} = req.body;
  key = email;
});

app.get("/receive-key",  async (req, res) => {
  res.send(key);
  console.log(key);
});