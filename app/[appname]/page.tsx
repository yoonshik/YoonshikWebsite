import { notFound } from 'next/navigation';
import Calculator from './apps/Calculator';

// Define the type for our app registry
type AppComponent = () => JSX.Element;

interface AppInfo {
  component: AppComponent;
  title: string;
  description: string;
}

// Registry of available apps
const apps: Record<string, AppInfo> = {
  calculator: {
    component: Calculator,
    title: 'Calculator',
    description: 'A simple calculator app',
  },
  // Add more apps here in the future
};

interface PageProps {
  params: Promise<{
    appname: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { appname } = await params;
  const app = apps[appname];
  
  if (!app) {
    return {
      title: 'App Not Found',
    };
  }

  return {
    title: `${app.title} | Yoonshik Hong`,
    description: app.description,
  };
}

export async function generateStaticParams() {
  // Generate static paths for all registered apps
  return Object.keys(apps).map((appname) => ({
    appname,
  }));
}

export default async function AppPage({ params }: PageProps) {
  const { appname } = await params;
  const app = apps[appname];

  // If app doesn't exist, show 404
  if (!app) {
    notFound();
  }

  const AppComponent = app.component;

  return <AppComponent />;
}
