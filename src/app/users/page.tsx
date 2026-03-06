import { UsersList } from "@/features/users/components/users-list";

export default function UsersPage() {
    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                <UsersList />
            </div>
        </div>
    );
}
