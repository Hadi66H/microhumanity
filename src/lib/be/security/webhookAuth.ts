import { headers } from 'next/headers';

/**
 * Validates that the current request is a legitimate webhook call
 * This adds an extra layer of security for service role operations
 */
export async function validateWebhookContext(): Promise<boolean> {
  try {
    const headersList = await headers();

    console.log(
      '[WEBHOOK] Headers',
      headersList.get('stripe-signature'),
      headersList.get('host'),
      headersList.get('user-agent')
    );
    // Check for Stripe webhook signature header
    const stripeSignature = headersList.get('stripe-signature');
    if (stripeSignature) {
      return true; // Legitimate Stripe webhook
    }

    // Check if request is coming from localhost (development)
    const host = headersList.get('host');
    if (host?.includes('localhost') || host?.includes('127.0.0.1')) {
      return true; // Allow in development
    }

    // Check for other legitimate webhook sources
    const userAgent = headersList.get('user-agent');
    if (userAgent?.includes('Stripe/')) {
      return true; // Stripe webhook
    }

    return false;
  } catch (error) {
    console.error('Error validating webhook context:', error);
    return false;
  }
}

/**
 * Validates webhook signature for Stripe webhooks
 * @param body - Request body
 * @param signature - Stripe signature header
 * @returns boolean indicating if signature is valid
 */
export function validateStripeWebhookSignature(
  body: string,
  signature: string
): boolean {
  try {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error('Missing STRIPE_WEBHOOK_SECRET');
      return false;
    }

    // This will throw an error if signature is invalid
    stripe.webhooks.constructEvent(body, signature, webhookSecret);
    return true;
  } catch (error) {
    console.error('Invalid Stripe webhook signature:', error);
    return false;
  }
}

/**
 * Security context for service role operations
 */
export interface SecurityContext {
  source: 'webhook' | 'admin' | 'cron' | 'system';
  operation: string;
  userId?: string;
  validated?: boolean;
}

/**
 * Creates a validated security context for webhook operations
 */
export async function createWebhookSecurityContext(
  operation: string,
  userId?: string
): Promise<SecurityContext> {
  const isValidWebhook = await validateWebhookContext();

  return {
    source: 'webhook',
    operation,
    userId,
    validated: isValidWebhook,
  };
}
