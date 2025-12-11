import Calculator from './apps/Calculator';
import MontyHall from './apps/MontyHall';
import Flowchart from './apps/Flowchart';

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
  whichreligion: {
    component: Flowchart,
    title: 'Which religion are you?',
    description: 'Find your religion through a series of questions',
  },
  // Add more apps here in the future
};
