
import { Button } from '@/components/ui/button';

interface AdminHeaderProps {
  userEmail: string;
  onSignOut: () => void;
}

const AdminHeader = ({ userEmail, onSignOut }: AdminHeaderProps) => {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">bunisystems.com Admin</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Welcome, {userEmail}</span>
          <Button variant="outline" onClick={onSignOut}>
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
