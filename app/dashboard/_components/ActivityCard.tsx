import { getUserSession } from "@/app/auth/getUserSession";
import plane from '@/assets/plane.png';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import ActivityCardContent from "./ActivityCardContent";


const ActivityCard = async () => {

  const session = await getUserSession();
  if (!session?.user) {
    return redirect("/");
  }

  return (
    <Card className="col-span-4 lg:col-span-3">
      <CardHeader>
        <div
          className="flex flex-row items-center justify-between pb-2 space-y-0"
        >
          <CardTitle className="text-2xl font-bold">
            <Link href="/history">Recent Activity</Link>
          </CardTitle>
          <Image src={plane} alt="history" width={30} height={30} priority />
        </div>
        <CardDescription>
          You have played a total of 33 quizzes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ActivityCardContent limit={5} userId={session.user.id} />
      </CardContent>
    </Card>
  );
};

export default ActivityCard;