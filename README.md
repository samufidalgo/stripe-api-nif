# API Stripe Checkout (suscripción)

Backend serverless para crear sesiones de Stripe Checkout. **La clave secreta de Stripe nunca se envía a la extensión.**

## Despliegue en Vercel

1. Instala Vercel CLI: `npm i -g vercel`
2. En esta carpeta: `cd stripe-api && npm install`
3. Despliega: `vercel`
4. Añade variables de entorno en el dashboard de Vercel (o con `vercel env add`):
   - **STRIPE_SECRET_KEY**: tu clave secreta de Stripe (ej. `sk_test_...`)
   - **STRIPE_PRICE_ID** (opcional): ID del precio de suscripción (por defecto usa `price_1T2f0QCLMeba3WZUMZAhTCcc`)

5. Copia la URL de la API (ej. `https://tu-proyecto.vercel.app/api/create-checkout-session`) y actualízala en la extensión:
   - En `popup.js`: constante `STRIPE_CHECKOUT_API`
   - En `payment.html`: variable `STRIPE_CHECKOUT_API`

## Qué hace la API

- Recibe `POST` con JSON: `{ "success_url": "chrome-extension://.../success.html?paid=1", "cancel_url": "chrome-extension://.../payment.html" }`
- Crea una sesión de Stripe Checkout en modo suscripción con el Price ID configurado
- Devuelve `{ "url": "https://checkout.stripe.com/..." }` para que la extensión abra Stripe en una pestaña

Solo acepta `success_url` que empiece por `chrome-extension://` por seguridad.
