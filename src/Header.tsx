import { Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import '@aws-amplify/ui-react/styles.css';
import outputs from "../amplify_outputs.json";
import { Amplify } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { AuthUser, getCurrentUser } from 'aws-amplify/auth';
import { Dialog, DialogContent, DialogTrigger } from './components/ui/dialog';
import { Authenticator } from '@aws-amplify/ui-react';
import { Select, SelectContent, SelectItem, SelectTrigger } from './components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './components/ui/dropdown-menu';

Amplify.configure(outputs);


const Header = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    checkUser()
  }, [])
  
  async function checkUser() {
      const currentUser = await getCurrentUser()
      setUser(currentUser);
      localStorage.set('userId', user?.userId)
  }  
  return (
    <header className="bg-pink-500 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold">Content Generator</h1>
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>{user.signInDetails?.loginId}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className='bg-pink-200'>Log Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost">Sign In / Sign Up</Button>
            </DialogTrigger>
            <DialogContent>
              <Authenticator></Authenticator>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </header>
  );
};

export default Header;