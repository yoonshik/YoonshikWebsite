import { notFound } from 'next/navigation';
import { apps, type AppInfo } from './appsRegistry';

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
