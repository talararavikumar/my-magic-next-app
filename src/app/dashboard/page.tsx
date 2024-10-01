import { verifyToken } from '@/utils/auth';

export default async function DashboardPage() {
  const user = verifyToken();

  if (!user) {
    return <div>You need to log in to view this page.</div>;
  }

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>This is a protected route.</p>
    </div>
  );
}
