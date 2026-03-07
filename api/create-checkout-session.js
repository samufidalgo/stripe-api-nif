/**
 * Serverless: crea una sesión de Stripe Checkout (suscripción).
 * Despliega en Vercel y define en el entorno:
 *   STRIPE_SECRET_KEY, STRIPE_PRICE_ID
 * La extensión envía POST con { success_url, cancel_url }.
 */
const Stripe = require('stripe');

function allowCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

module.exports = async (req, res) => {
  allowCors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env.STRIPE_PRICE_ID || 'price_1T2f0QCLMeba3WZUMZAhTCcc';
  if (!secret) {
    return res.status(500).json({ error: 'STRIPE_SECRET_KEY no configurada' });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch (e) {
    return res.status(400).json({ error: 'JSON inválido' });
  }

  const successUrl = body.success_url;
  const cancelUrl = body.cancel_url || body.success_url;
  const priceIdFromBody = body.price_id;
  if (!successUrl || !successUrl.startsWith('chrome-extension://')) {
    return res.status(400).json({ error: 'success_url debe ser una URL chrome-extension://' });
  }

  const stripe = new Stripe(secret);
  const finalPriceId = priceIdFromBody || priceId;
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: finalPriceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
    });
    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || 'Error al crear la sesión' });
  }
};
