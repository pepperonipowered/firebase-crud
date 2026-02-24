import type { User } from 'firebase/auth'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export default function UserInfo({user}: {user: User | null}) {
  return (
    <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage src={user?.photoURL || undefined} alt={user?.displayName || user?.email || "User"} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {user?.displayName?.[0] || user?.email?.[0] || "U"}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.displayName}</span>
                {user?.email && (
                    <span className="truncate text-xs text-muted-foreground">
                        {user.email}
                    </span>
                )}
            </div>
        </>
  )
}
