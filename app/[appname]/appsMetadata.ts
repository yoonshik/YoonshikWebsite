// Client-safe app metadata (no component imports)
export interface AppInfoClient {
  name: string;
  title: string;
  description: string;
  path: string;
}

// Registry of available apps metadata - keep in sync with appsRegistry.ts
export const appsMetadata: AppInfoClient[] = [
  {
    name: 'calculator',
    title: 'Calculator',
    description: 'A simple calculator app',
    path: '/calculator',
  },
  {
    name: 'montyhall',
    title: 'Monty Hall Problem',
    description: 'Interactive simulator demonstrating why you should always switch doors',
    path: '/montyhall',
  },
  // Add more apps here in the future
];
