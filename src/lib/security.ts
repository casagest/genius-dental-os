import DOMPurify from 'dompurify';
import { z } from 'zod';

// Rate limiting store
const rateLimitStore = new Map<string, { count: number; lastReset: number }>();

/**
 * Sanitizes HTML input to prevent XSS attacks
 */
export function sanitizeHtml(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'br'],
    ALLOWED_ATTR: []
  });
}

/**
 * Sanitizes text input by removing harmful characters
 */
export function sanitizeText(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
}

/**
 * Validates and sanitizes API key format
 */
export function validateApiKey(key: string, prefix: string): boolean {
  if (!key || typeof key !== 'string') return false;
  if (!key.startsWith(prefix)) return false;
  if (key.length < 32) return false;
  return /^[a-zA-Z0-9_-]+$/.test(key.replace(prefix, ''));
}

/**
 * Simple rate limiting implementation
 */
export function checkRateLimit(
  identifier: string, 
  maxRequests: number = 10, 
  windowMs: number = 60000
): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);
  
  if (!entry || now - entry.lastReset > windowMs) {
    rateLimitStore.set(identifier, { count: 1, lastReset: now });
    return true;
  }
  
  if (entry.count >= maxRequests) {
    return false;
  }
  
  entry.count++;
  return true;
}

/**
 * Secure random string generator
 */
export function generateSecureToken(length: number = 32): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Hash sensitive data for storage
 */
export async function hashData(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Validate URL to prevent SSRF attacks
 */
export function validateUrl(url: string, allowedDomains?: string[]): boolean {
  try {
    const urlObj = new URL(url);
    
    // Block private IPs and localhost
    if (urlObj.hostname === 'localhost' || 
        urlObj.hostname === '127.0.0.1' ||
        urlObj.hostname.startsWith('192.168.') ||
        urlObj.hostname.startsWith('10.') ||
        urlObj.hostname.startsWith('172.')) {
      return false;
    }
    
    if (allowedDomains && !allowedDomains.includes(urlObj.hostname)) {
      return false;
    }
    
    return urlObj.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Content Security Policy headers
 */
export const CSP_HEADER = `
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https:;
  connect-src 'self' https://api.elevenlabs.io https://api.openai.com https://api.notion.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
`.replace(/\s+/g, ' ').trim();

/**
 * Security headers for API responses
 */
export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': CSP_HEADER
};

/**
 * Error messages that don't leak sensitive information
 */
export const SECURE_ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid credentials provided',
  ACCESS_DENIED: 'Access denied',
  RATE_LIMITED: 'Too many requests. Please try again later',
  VALIDATION_ERROR: 'Invalid input provided',
  SERVER_ERROR: 'Internal server error occurred'
} as const;