import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

// TODO remove these by making API requests to a server
const SUPABASE_URL = 'https://raoszeifgfklelzkwkur.supabase.co'
const SUPABASE_SERVICE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhb3N6ZWlmZ2ZrbGVsemt3a3VyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MTYyNzUyMSwiZXhwIjoyMDA3MjAzNTIxfQ.XMe88MU1s9U-bC-Rs32RFa1y0msfkTi_XUi4pKFA8NI'

const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_KEY)
export default supabase
