import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../../lib/stripe";

interface IRequest {
  priceId: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { priceId }: IRequest = req.body;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    if (!priceId) {
      return res.status(400).json({ error: "Product price not found!" });
    }

    const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${process.env.NEXT_URL}/`;

    const checkoutSession = await stripe.checkout.sessions.create({
      success_url: successUrl,
      cancel_url: cancelUrl,
      mode: "payment",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
    });

    return res.status(201).json({
      checkoutUrl: checkoutSession.url,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, data: error });
  }
};

export default handler;
