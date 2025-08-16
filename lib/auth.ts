import { supabase } from './supabaseClient';
import { AuthCredentials } from '@supabase/supabase-js';

export const signUp = async (credentials: AuthCredentials) => {
  const { data, error } = await supabase.auth.signUp(credentials);
  return { data, error };
};

export const signIn = async (credentials: AuthCredentials) => {
  const { data, error } = await supabase.auth.signInWithPassword(credentials);
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};
