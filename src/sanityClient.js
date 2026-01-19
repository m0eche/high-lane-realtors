import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: '20z6c3fo', 
  dataset: 'production',
  useCdn: true,
  apiVersion: '2026-01-18',
});