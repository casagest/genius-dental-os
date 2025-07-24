/**
 * Security middleware for enhanced application security
 */

interface SecurityConfig {
  enableCSP: boolean;
  enableHSTS: boolean;
  enableXFrameOptions: boolean;
  rateLimitRequests: number;
  rateLimitWindow: number;
}

// Rate limiting store
const requestCounts = new Map<string, { count: number; resetTime: number }>();

/**
 * Security headers for production
 */
export const PRODUCTION_SECURITY_HEADERS = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

/**
 * Content Security Policy for medical application
 */
export const MEDICAL_CSP_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Required for React dev
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://ldtaveitfkiniibwebhn.supabase.co wss://ldtaveitfkiniibwebhn.supabase.co",
  "media-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'"
].join('; ');

/**
 * Enhanced rate limiting with IP tracking
 */
export function checkEnhancedRateLimit(
  identifier: string,
  maxRequests: number = 100,
  windowMs: number = 60000 // 1 minute
): boolean {
  const now = Date.now();
  const windowStart = now - windowMs;

  // Clean old entries
  for (const [key, data] of requestCounts.entries()) {
    if (data.resetTime < now) {
      requestCounts.delete(key);
    }
  }

  const current = requestCounts.get(identifier);
  
  if (!current || current.resetTime < now) {
    requestCounts.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (current.count >= maxRequests) {
    return false;
  }

  current.count++;
  return true;
}

/**
 * Sanitize sensitive data for logging
 */
export function sanitizeForLogging(data: any): any {
  const sensitiveFields = [
    'password', 'token', 'apiKey', 'secret', 'authorization',
    'cookie', 'session', 'ssn', 'email', 'phone'
  ];

  if (typeof data !== 'object' || data === null) {
    return data;
  }

  const sanitized = { ...data };
  
  for (const field of sensitiveFields) {
    if (field in sanitized) {
      sanitized[field] = '[REDACTED]';
    }
  }

  return sanitized;
}

/**
 * Validate medical data integrity
 */
export function validateMedicalDataIntegrity(data: any): boolean {
  if (!data || typeof data !== 'object') {
    return false;
  }

  // Check for required fields in medical data
  const requiredFields = ['patient_id', 'created_at'];
  for (const field of requiredFields) {
    if (!(field in data)) {
      return false;
    }
  }

  // Validate UUID format for patient_id
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(data.patient_id)) {
    return false;
  }

  return true;
}

/**
 * Security audit logger
 */
export class SecurityAuditLogger {
  private static logs: Array<{
    timestamp: number;
    level: 'info' | 'warn' | 'error';
    event: string;
    userId?: string;
    details?: any;
  }> = [];

  static log(
    level: 'info' | 'warn' | 'error',
    event: string,
    userId?: string,
    details?: any
  ) {
    this.logs.push({
      timestamp: Date.now(),
      level,
      event,
      userId,
      details: sanitizeForLogging(details)
    });

    // Keep only last 1000 logs
    if (this.logs.length > 1000) {
      this.logs = this.logs.slice(-1000);
    }

    // Log to console in development
    if (import.meta.env.DEV) {
      console.log(`[SECURITY ${level.toUpperCase()}]`, event, details);
    }
  }

  static getLogs(level?: 'info' | 'warn' | 'error') {
    return level ? this.logs.filter(log => log.level === level) : this.logs;
  }

  static clearLogs() {
    this.logs = [];
  }
}

/**
 * HIPAA compliance utilities
 */
export const HIPAACompliance = {
  /**
   * Check if data contains PHI (Protected Health Information)
   */
  containsPHI(data: any): boolean {
    if (typeof data !== 'object' || data === null) {
      return false;
    }

    const phiFields = [
      'ssn', 'medical_record_number', 'insurance_id',
      'date_of_birth', 'phone', 'email', 'address'
    ];

    return phiFields.some(field => field in data);
  },

  /**
   * Anonymize PHI data for analytics
   */
  anonymizePHI(data: any): any {
    if (!this.containsPHI(data)) {
      return data;
    }

    const anonymized = { ...data };
    
    // Remove or hash sensitive fields
    if (anonymized.ssn) delete anonymized.ssn;
    if (anonymized.medical_record_number) delete anonymized.medical_record_number;
    if (anonymized.insurance_id) delete anonymized.insurance_id;
    if (anonymized.email) {
      anonymized.email = anonymized.email.replace(/(.{2}).*@/, '$1***@');
    }
    if (anonymized.phone) {
      anonymized.phone = anonymized.phone.replace(/(\d{3}).*(\d{4})/, '$1***$2');
    }

    return anonymized;
  }
};
