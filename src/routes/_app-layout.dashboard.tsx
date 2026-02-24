import { createFileRoute } from "@tanstack/react-router";
// import { addDoc, collection, Timestamp } from "firebase/firestore";
// import { database } from "@/config/firebase";
import { DataTable } from "@/components/data-table/data-table";
import { sampleApplicant } from "@/lib/sampleData";
import { columns } from "@/components/data-table/columns";

export const Route = createFileRoute("/_app-layout/dashboard")({
    component: RouteComponent,
});

function RouteComponent() {
    
    // async function addTestDoc() {
    //     try {
    //         const docRef = await addDoc(collection(database, "interns"), {
    //             intern: [
    //                 {
    //                     personalInformation: {
    //                         firstName: "Gelen Veecente Joey",
    //                         middleName: "Labuyo",
    //                         lastName: "Bad-eye",
    //                         address:
    //                             "103 Crecencia Village, Bokawkan Road, Baguio City",
    //                         birthDate: Timestamp.fromDate(
    //                             new Date("2001-09-01T00:00:00+08:00"),
    //                         ),
    //                         age: 24,
    //                         gender: "male",
    //                         civilStatus: "single",
    //                         phoneNumber: "0945856271",
    //                         landlineNumber: "02 8123 4567",
    //                         email: "throwaway211.throw@gmail.com",
    //                     },
    //                     education: {
    //                         school: {
    //                             primarySchool: "Bonifacio Elementary",
    //                             juniorHighSchool: "Bonifacio Elementary",
    //                             seniorHighSchool: "Guisad Valley",
    //                             tertiarySchool: "University of Baguio",
    //                         },
    //                         educationPeriod: {
    //                             primaryYearFrom: "2006",
    //                             primaryYearTo: "2012",
    //                             juniorYearFrom: "2013",
    //                             juniorYearTo: "2018",
    //                             seniorYearFrom: "2018",
    //                             seniorYearTo: "2020",
    //                             tertiaryYearFrom: "2020",
    //                             tertiaryYearTo: "2025",
    //                         },
    //                     },
    //                     workExperience: {
    //                         company: {
    //                             firstCompany: "DOLE",
    //                             secondCompany: "City Mayor's Office",
    //                             thirdCompany: "Registry of Deeds",
    //                         },
    //                         workPeriod: {
    //                             firstPeriodFrom: Timestamp.fromDate(
    //                                 new Date("2021-01-01T00:00:00Z"),
    //                             ),
    //                             firstPeriodTo: Timestamp.fromDate(
    //                                 new Date("2022-12-31T23:59:59Z"),
    //                             ),
    //                             secondPeriodFrom: Timestamp.fromDate(
    //                                 new Date("2022-01-01T00:00:00Z"),
    //                             ),
    //                             secondPeriodTo: Timestamp.fromDate(
    //                                 new Date("2023-12-31T23:59:59Z"),
    //                             ),
    //                             thirdPeriodFrom: Timestamp.fromDate(
    //                                 new Date("2024-01-01T00:00:00Z"),
    //                             ),
    //                             thirdPeriodTo: Timestamp.fromDate(
    //                                 new Date("2025-12-31T23:59:59Z"),
    //                             ),
    //                         },
    //                         position: {
    //                             firstPosition: "Clerk",
    //                             secondPosition: "Driver",
    //                             thirdPosition: "Clerk",
    //                         },
    //                     },
    //                     disadvantagedGroup: {
    //                         pwd: true,
    //                         indiginousPeople: true,
    //                         victimOfArmedConflict: true,
    //                         rebelReturnee: true,
    //                         fourPsBeneficiary: true,
    //                     },
    //                     documents: {
    //                         birthCertificate: true,
    //                         transcriptOfRecords: true,
    //                         diploma: true,
    //                         form137138: true,
    //                         applicationLetter: true,
    //                         barangayCertificate: true,
    //                         certificationFromSchool: true,
    //                         others: {},
    //                     },
    //                     governmentInformation: {
    //                         validIdType: "POSTAL ID",
    //                         dateOrPlaceIssued: Timestamp.fromDate(
    //                             new Date("2025-06-26T00:00:00+00:00"),
    //                         ),
    //                         lbpNumber: "130145456",
    //                     },
    //                     emergencyContact: {
    //                         emergencyName: "Doe a deer",
    //                         emergencyContact: "09876543210",
    //                         emergencyAddress: "Baguio City",
    //                     },
    //                     GIPAssignment: {
    //                         lgu: "Baguio City",
    //                         previousExperince: "365",
    //                         dateHired: Timestamp.fromDate(
    //                             new Date("2026-01-01T00:00:00+08:00"),
    //                         ),
    //                         dateEnded: Timestamp.fromDate(
    //                             new Date("2026-12-31T00:00:00+08:00"),
    //                         ),
    //                         assignmentPlace: "Baguio City LGU",
    //                         adlNo: "0121 Baguio",
    //                         employmentStatus: "Mission Completed",
    //                     },
    //                     GSIS: {
    //                         beneficiaryName: "Doe a deer",
    //                         relationship: "a female deer",
    //                     },
    //                     remarks: "Hired after internship: January 01, 2027",
    //                 },
    //             ],
    //         });
    //         console.log("Document written with ID: ", docRef.id);
    //     } catch (e) {
    //         console.error("Error adding document: ", e);
    //     }
    // }

    return (
        <div>
            <h1>Hello "/dashboard"!</h1>
            <DataTable columns={columns} data={sampleApplicant} />
        </div>
    );
}
