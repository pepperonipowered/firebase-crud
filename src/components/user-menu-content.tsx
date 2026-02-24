import { signOut } from 'firebase/auth'
import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from './ui/dropdown-menu'
import { Link, useNavigate } from '@tanstack/react-router'
import { LogOut, Settings } from 'lucide-react'
import { auth } from '@/config/firebase'
import { toast } from 'sonner'
import { useAuth } from '@/context/auth-provider.'
import UserInfo from './user-info'

export default function UserMenuContent() {
    const { user } = useAuth();

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate({ to: "/login" });
        } catch {
            toast.error("Failed to log out. Please try again.");
        }
    };
    return (
        <div>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserInfo user={user} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link
                        className="block w-full cursor-pointer"
                        to={`/`}
                    >
                        <Settings className="mr-2" />
                        Settings
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}
                data-test="logout-button">
                <LogOut className="mr-2" />
                Log out
            </DropdownMenuItem>
        </div>
    )
}
