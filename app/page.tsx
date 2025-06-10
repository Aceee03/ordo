import { prisma } from "@/lib/prisma";


export default async function Home() {
  const patients = await prisma.patient.findMany();

  return (
    <>
    <h1>
      {patients.map((patient) => (
        <div key={patient.id}>
        {patient.firstName + " " + patient.lastName}
        </div>
      ))}
    </h1>
    </>
  );
}
