import Background from "@/components/background";
import Card from "@/components/card";
import Sidebar from "@/components/sidebar";
import { prisma } from "@/lib/prisma";
import {
  IconUser,
  IconFileDescription,
  IconSettings,
} from "@tabler/icons-react";

export default async function Home() {
  const patients = await prisma.patient.findMany();

  return (
    <>
      <div>
        <div className="relative h-screen ">
          <Background />
          {/* Option choice */}
          <div className="flex justify-center h-screen place-items-center lg:flex-row flex-col gap-18 md:gap-36">
            <Card
              title="Patients"
              url="/patients"
              icon={<IconUser size={52} />}
            />
            <Card
              title="Ordonnances"
              url="/ordonnances"
              icon={<IconFileDescription size={52} />}
            />
            <Card
              title="Paramètres"
              url="/settings"
              icon={<IconSettings size={52} />}
            />
          </div>
        </div>
      </div>
    </>
  );
}
