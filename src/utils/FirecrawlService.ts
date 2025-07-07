import FirecrawlApp from '@mendable/firecrawl-js';
import { ApiKeysManager } from '@/lib/supabase';
import { supabase } from '@/lib/supabase';

interface ErrorResponse {
  success: false;
  error: string;
}

interface CrawlStatusResponse {
  success: true;
  status: string;
  completed: number;
  total: number;
  creditsUsed: number;
  expiresAt: string;
  data: any[];
}

type CrawlResponse = CrawlStatusResponse | ErrorResponse;

export class FirecrawlService {
  private static firecrawlApp: FirecrawlApp | null = null;

  static async saveApiKey(apiKey: string): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      console.error('User not authenticated');
      return false;
    }

    const success = await ApiKeysManager.saveApiKey('firecrawl', apiKey, user.id);
    if (success) {
      this.firecrawlApp = new FirecrawlApp({ apiKey });
      console.log('API key saved securely');
    }
    return success;
  }

  static async getApiKey(): Promise<string | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    
    return await ApiKeysManager.getApiKey('firecrawl', user.id);
  }

  static async testApiKey(apiKey: string): Promise<boolean> {
    try {
      console.log('Testing API key with Firecrawl API');
      this.firecrawlApp = new FirecrawlApp({ apiKey });
      // A simple test scrape to verify the API key
      const testResponse = await this.firecrawlApp.scrapeUrl('https://example.com');
      return testResponse.success;
    } catch (error) {
      console.error('Error testing API key:', error);
      return false;
    }
  }

  static async scrapeIStoma(url: string): Promise<{ success: boolean; error?: string; data?: any }> {
    const apiKey = await this.getApiKey();
    if (!apiKey) {
      return { success: false, error: 'API key not found. Please configure your Firecrawl API key first.' };
    }

    try {
      console.log('Making scrape request to Firecrawl API for iStoma');
      if (!this.firecrawlApp) {
        this.firecrawlApp = new FirecrawlApp({ apiKey });
      }

      const scrapeResponse = await this.firecrawlApp.scrapeUrl(url, {
        formats: ['markdown', 'html'],
        includeTags: ['table', 'div', 'span', '.patient-data', '.appointment', '.financial'],
        excludeTags: ['nav', 'footer', 'script', 'style'],
        waitFor: 3000, // Wait for dynamic content to load
      });

      if (!scrapeResponse.success) {
        console.error('Scrape failed:', scrapeResponse.error);
        return { 
          success: false, 
          error: scrapeResponse.error || 'Failed to scrape iStoma data' 
        };
      }

      console.log('Scrape successful:', scrapeResponse);
      return { 
        success: true,
        data: scrapeResponse 
      };
    } catch (error) {
      console.error('Error during scrape:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to connect to Firecrawl API' 
      };
    }
  }

  static async crawlIStoma(startUrl: string): Promise<{ success: boolean; error?: string; data?: any }> {
    const apiKey = await this.getApiKey();
    if (!apiKey) {
      return { success: false, error: 'API key not found. Please configure your Firecrawl API key first.' };
    }

    try {
      console.log('Making crawl request to Firecrawl API for iStoma');
      if (!this.firecrawlApp) {
        this.firecrawlApp = new FirecrawlApp({ apiKey });
      }

      const crawlResponse = await this.firecrawlApp.crawlUrl(startUrl, {
        limit: 50,
        scrapeOptions: {
          formats: ['markdown', 'html'],
          includeTags: ['table', 'div', 'span', '.patient-data', '.appointment', '.financial'],
          excludeTags: ['nav', 'footer', 'script', 'style'],
          waitFor: 3000,
        }
      }) as CrawlResponse;

      if (!crawlResponse.success) {
        console.error('Crawl failed:', (crawlResponse as ErrorResponse).error);
        return { 
          success: false, 
          error: (crawlResponse as ErrorResponse).error || 'Failed to crawl iStoma' 
        };
      }

      console.log('Crawl successful:', crawlResponse);
      return { 
        success: true,
        data: crawlResponse 
      };
    } catch (error) {
      console.error('Error during crawl:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to connect to Firecrawl API' 
      };
    }
  }
}