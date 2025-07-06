import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser()
    if (userError || !user) {
      throw new Error('Unauthorized')
    }

    const { action, inventory_data } = await req.json()

    switch (action) {
      case 'add_item':
        return await addInventoryItem(supabaseClient, user.id, inventory_data)
      case 'update_stock':
        return await updateStock(supabaseClient, user.id, inventory_data)
      case 'get_low_stock':
        return await getLowStockItems(supabaseClient, user.id)
      case 'predict_usage':
        return await predictUsage(supabaseClient, user.id, inventory_data)
      case 'generate_reorder':
        return await generateReorderReport(supabaseClient, user.id)
      default:
        throw new Error('Invalid action')
    }

  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})

async function addInventoryItem(supabaseClient: any, userId: string, itemData: any) {
  const { error } = await supabaseClient
    .from('inventory')
    .insert({
      user_id: userId,
      item_name: itemData.item_name,
      item_code: itemData.item_code || `INV-${Date.now()}`,
      category: itemData.category,
      subcategory: itemData.subcategory,
      description: itemData.description,
      current_quantity: itemData.current_quantity || 0,
      minimum_stock: itemData.minimum_stock || 0,
      maximum_stock: itemData.maximum_stock,
      unit_of_measure: itemData.unit_of_measure || 'pcs',
      unit_cost: itemData.unit_cost,
      supplier_name: itemData.supplier_name,
      supplier_contact: itemData.supplier_contact,
      expiry_date: itemData.expiry_date,
      batch_number: itemData.batch_number,
      location: itemData.location,
      auto_reorder: itemData.auto_reorder || false,
      reorder_point: itemData.reorder_point || 0
    })

  if (error) throw error

  return new Response(
    JSON.stringify({ success: true, message: 'Inventory item added successfully' }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function updateStock(supabaseClient: any, userId: string, transactionData: any) {
  // Start transaction
  const { data: inventoryItem, error: fetchError } = await supabaseClient
    .from('inventory')
    .select('current_quantity')
    .eq('id', transactionData.inventory_id)
    .eq('user_id', userId)
    .single()

  if (fetchError) throw fetchError

  const newQuantity = inventoryItem.current_quantity + 
    (transactionData.transaction_type === 'in' ? transactionData.quantity : -transactionData.quantity)

  // Update inventory
  const { error: updateError } = await supabaseClient
    .from('inventory')
    .update({ 
      current_quantity: newQuantity,
      last_restocked: transactionData.transaction_type === 'in' ? new Date().toISOString() : undefined
    })
    .eq('id', transactionData.inventory_id)
    .eq('user_id', userId)

  if (updateError) throw updateError

  // Record transaction
  const { error: transactionError } = await supabaseClient
    .from('inventory_transactions')
    .insert({
      user_id: userId,
      inventory_id: transactionData.inventory_id,
      transaction_type: transactionData.transaction_type,
      quantity: transactionData.quantity,
      reference_id: transactionData.reference_id,
      notes: transactionData.notes,
      performed_by: transactionData.performed_by
    })

  if (transactionError) throw transactionError

  return new Response(
    JSON.stringify({ success: true, new_quantity: newQuantity }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function getLowStockItems(supabaseClient: any, userId: string) {
  const { data, error } = await supabaseClient
    .from('inventory')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .filter('current_quantity', 'lte', 'minimum_stock')
    .order('current_quantity', { ascending: true })

  if (error) throw error

  return new Response(
    JSON.stringify({ success: true, low_stock_items: data }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function predictUsage(supabaseClient: any, userId: string, params: any) {
  const { data, error } = await supabaseClient
    .from('inventory_transactions')
    .select('*')
    .eq('user_id', userId)
    .eq('inventory_id', params.inventory_id)
    .eq('transaction_type', 'out')
    .gte('transaction_date', new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString())
    .order('transaction_date', { ascending: true })

  if (error) throw error

  // Simple usage prediction based on last 90 days
  const totalUsage = data.reduce((sum: number, transaction: any) => sum + transaction.quantity, 0)
  const dailyAverage = totalUsage / 90
  const monthlyPrediction = dailyAverage * 30

  return new Response(
    JSON.stringify({ 
      success: true, 
      daily_average_usage: dailyAverage,
      monthly_prediction: monthlyPrediction,
      suggested_reorder_quantity: monthlyPrediction * 2 // 2 months supply
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function generateReorderReport(supabaseClient: any, userId: string) {
  const { data, error } = await supabaseClient
    .from('inventory')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .or('current_quantity.lte.reorder_point,auto_reorder.eq.true')
    .order('category', { ascending: true })

  if (error) throw error

  const reorderReport = data.map((item: any) => ({
    item_name: item.item_name,
    category: item.category,
    current_stock: item.current_quantity,
    reorder_point: item.reorder_point,
    suggested_quantity: Math.max(item.maximum_stock - item.current_quantity, item.minimum_stock),
    supplier: item.supplier_name,
    estimated_cost: item.unit_cost * Math.max(item.maximum_stock - item.current_quantity, item.minimum_stock)
  }))

  return new Response(
    JSON.stringify({ success: true, reorder_report: reorderReport }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}