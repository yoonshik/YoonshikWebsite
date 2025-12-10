import Calculator from './apps/Calculator';
import MontyHall from './apps/MontyHall';

// Define the type for our app registry
type AppComponent = () => JSX.Element;

export interface AppInfo {
  component: AppComponent;
  title: string;
  description: string;
}

// Registry of available apps
// Note: Keep this in sync with appsMetadata.ts for client components
export const apps: Record<string, AppInfo> = {
  calculator: {
    component: Calculator,
    title: 'Calculator',
    description: 'A simple calculator app',
  },
  montyhall: {
    component: MontyHall,
    title: 'Monty Hall Problem',
    description: 'Interactive simulator demonstrating why you should always switch doors',
  },
  // Add more apps here in the future
};
