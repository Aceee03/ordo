// Lists all patients
export default async function PatientsPage() {
  const res = await fetch("http://localhost:3000/api/patients", { cache: "no-store" });
  const patients = await res.json();

  return (
    <div>
      <h1>All Patients</h1>
      <ul>
        {patients.map((patient: any) => (
          <li key={patient.id}>
            <a href={`/patients/${patient.id}`}>
              {patient.firstName} {patient.lastName}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
