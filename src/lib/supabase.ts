import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// API Keys Management
export class ApiKeysManager {
  static async saveApiKey(keyName: string, keyValue: string, userId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('api_keys')
        .upsert({
          user_id: userId,
          key_name: keyName,
          key_value: keyValue,
          updated_at: new Date().toISOString()
        })

      return !error
    } catch (error) {
      console.error('Error saving API key:', error)
      return false
    }
  }

  static async getApiKey(keyName: string, userId: string): Promise<string | null> {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('key_value')
        .eq('user_id', userId)
        .eq('key_name', keyName)
        .single()

      if (error || !data) return null
      return data.key_value
    } catch (error) {
      console.error('Error getting API key:', error)
      return null
    }
  }

  static async deleteApiKey(keyName: string, userId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('api_keys')
        .delete()
        .eq('user_id', userId)
        .eq('key_name', keyName)

      return !error
    } catch (error) {
      console.error('Error deleting API key:', error)
      return false
    }
  }

  static async testFirecrawlKey(apiKey: string): Promise<boolean> {
    try {
      const { data, error } = await supabase.functions.invoke('test-firecrawl-key', {
        body: { apiKey }
      })

      return data?.success || false
    } catch (error) {
      console.error('Error testing Firecrawl key:', error)
      return false
    }
  }
}