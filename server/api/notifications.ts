import { sub } from "date-fns";

interface RecentAction {
  id: number;
  type: "school_created" | "school_updated" | "school_deleted" | "admin_created" | "admin_updated" | "admin_deleted" | "user_registered";
  title: string;
  description: string;
  icon: string;
  date: string;
  unread?: boolean;
}

const recentActions: RecentAction[] = [
  {
    id: 1,
    type: "school_created",
    title: "New driving school created",
    description: "Driving School 'Auto Academy' was created",
    icon: "i-lucide-school",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    unread: true,
  },
  {
    id: 2,
    type: "admin_created",
    title: "New admin created",
    description: "Admin 'John Doe' was created and assigned to 'Auto Academy'",
    icon: "i-lucide-user-cog",
    date: sub(new Date(), { minutes: 15 }).toISOString(),
    unread: true,
  },
  {
    id: 3,
    type: "school_updated",
    title: "Driving school updated",
    description: "Driving School 'City Driving School' information was updated",
    icon: "i-lucide-edit",
    date: sub(new Date(), { hours: 1 }).toISOString(),
  },
  {
    id: 4,
    type: "admin_updated",
    title: "Admin updated",
    description: "Admin 'Jane Smith' information was updated",
    icon: "i-lucide-user-cog",
    date: sub(new Date(), { hours: 2 }).toISOString(),
  },
  {
    id: 5,
    type: "user_registered",
    title: "New user registered",
    description: "User 'Mike Johnson' registered in 'Auto Academy'",
    icon: "i-lucide-user-plus",
    date: sub(new Date(), { hours: 3 }).toISOString(),
  },
  {
    id: 6,
    type: "school_created",
    title: "New driving school created",
    description: "Driving School 'Elite Driving' was created",
    icon: "i-lucide-school",
    date: sub(new Date(), { hours: 5 }).toISOString(),
  },
  {
    id: 7,
    type: "admin_deleted",
    title: "Admin deleted",
    description: "Admin 'Bob Wilson' was deleted",
    icon: "i-lucide-user-x",
    date: sub(new Date(), { hours: 6 }).toISOString(),
    unread: true,
  },
  {
    id: 8,
    type: "school_updated",
    title: "Driving school updated",
    description: "Driving School 'Fast Track' contact information was updated",
    icon: "i-lucide-edit",
    date: sub(new Date(), { hours: 8 }).toISOString(),
  },
  {
    id: 9,
    type: "admin_created",
    title: "New admin created",
    description: "Admin 'Sarah Connor' was created and assigned to 'Elite Driving'",
    icon: "i-lucide-user-cog",
    date: sub(new Date(), { hours: 10 }).toISOString(),
  },
  {
    id: 10,
    type: "user_registered",
    title: "New user registered",
    description: "User 'Alex Brown' registered in 'City Driving School'",
    icon: "i-lucide-user-plus",
    date: sub(new Date(), { days: 1 }).toISOString(),
  },
  {
    id: 11,
    type: "school_deleted",
    title: "Driving school deleted",
    description: "Driving School 'Old School' was deleted",
    icon: "i-lucide-trash",
    date: sub(new Date(), { days: 1, hours: 2 }).toISOString(),
  },
  {
    id: 12,
    type: "admin_updated",
    title: "Admin updated",
    description: "Admin 'Tom Anderson' was reassigned to different school",
    icon: "i-lucide-user-cog",
    date: sub(new Date(), { days: 1, hours: 5 }).toISOString(),
  },
  {
    id: 13,
    type: "school_created",
    title: "New driving school created",
    description: "Driving School 'Pro Drivers' was created",
    icon: "i-lucide-school",
    date: sub(new Date(), { days: 2 }).toISOString(),
  },
  {
    id: 14,
    type: "user_registered",
    title: "New user registered",
    description: "User 'Emma Davis' registered in 'Pro Drivers'",
    icon: "i-lucide-user-plus",
    date: sub(new Date(), { days: 2, hours: 3 }).toISOString(),
  },
  {
    id: 15,
    type: "admin_created",
    title: "New admin created",
    description: "Admin 'Chris Lee' was created and assigned to 'Pro Drivers'",
    icon: "i-lucide-user-cog",
    date: sub(new Date(), { days: 3 }).toISOString(),
  },
];

export default defineEventHandler(async () => {
  return recentActions;
});
