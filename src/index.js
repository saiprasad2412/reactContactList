import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import {createClient} from '@supabase/supabase-js'


const supabase= createClient('https://uzdhwfdnjaqizcrtjshe.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6ZGh3ZmRuamFxaXpjcnRqc2hlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ3MDc4ODIsImV4cCI6MjAyMDI4Mzg4Mn0.YoihT7b5gkp6ggHTPapXTLbO03D-Ojy_mRFWjF_b5-g')

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </React.StrictMode>
);

