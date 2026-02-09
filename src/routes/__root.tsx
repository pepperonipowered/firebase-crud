import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { database } from "@/config/firebase";
import { Button } from "@/components/ui/button";

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    async function addTestDoc() {
        try {
            const docRef = await addDoc(collection(database, "interns"), {
                intern: [
                    {
                        personalInformation: {
                            firstName: "Gelen Veecente Joey",
                            middleName: "Labuyo",
                            lastName: "Bad-eye",
                            address: "103 Crecencia Village, Bokawkan Road, Baguio City",
                            birthDate: Timestamp.fromDate(new Date("2001-09-01T00:00:00+08:00")),
                            age: 24,
                            gender: "male",
                            civilStatus: "single",
                            phoneNumber: "0945856271",
                            landlineNumber: "02 8123 4567",
                            email: "throwaway211.throw@gmail.com",
                        },
                        education: {
                            school: {
                                primarySchool: "Bonifacio Elementary",
                                juniorHighSchool: "Bonifacio Elementary",
                                seniorHighSchool: "Guisad Valley",
                                tertiarySchool: "University of Baguio",
                            },
                            educationPeriod: {
                                primaryYear: "2006-2012",
                                juniorYear: "2013-2018",
                                seniorYear: "2018-2019",
                                tertiaryYear: "2020-2025",
                            },
                        },
                        workExperience: {
                            company: {
                                firstCompany: "DOLE",
                                secondCompany: "City Mayor's Office",
                                thirdCompany: "Registry of Deeds",
                            },
                            workPeriod: {
                                firstPeriod: "2021-2022",
                                secondPeriod: "2022-2023",
                                thirdPeriod: "2024-2025",
                            },
                            position: {
                                firstPosition: "Clerk",
                                secondPosition: "Driver",
                                thirdPosition: "Clerk",
                            },
                        },
                        disadvantagedGroup: {
                            pwd: true,
                            indiginousPeople: true,
                            victimOfArmedConflict: true,
                            rebelReturnee: true,
                            fourPsBeneficiary: true,
                        },
                        documents: {
                            birthCertificate: true,
                            transcriptOfRecords: true,
                            diploma: true,
                            form137138: true,
                            applicationLetter: true,
                            barangayCertificate: true,
                            certificationFromSchool: true,
                            others: {},
                        },
                        governmentInformation: {
                            validIdType: "POSTAL ID",
                            dateOrPlaceIssued: Timestamp.fromDate(new Date("2025-06-26T00:00:00+00:00")),
                            lbpNumber: "130145456",
                        },
                        emergencyContact: {
                            emergencyName: "Doe a deer",
                            emergencyContact: "09876543210",
                            emergencyAddress: "Baguio City",
                        },
                        GIPAssignment: {
                            lgu: "Baguio City",
                            previousExperince: "365",
                            dateHired: Timestamp.fromDate(new Date("2026-01-01T00:00:00+08:00")),
                            dateEnded: Timestamp.fromDate(new Date("2026-12-31T00:00:00+08:00")),
                            assignmentPlace: "Baguio City LGU",
                            adlNo: "0121 Baguio",
                            employmentStatus: "Mission Completed",
                        },
                        GSIS: {
                            beneficiaryName: "Doe a deer",
                            relationship: "a female deer",
                        },
                        remarks: "Hired after internship: January 01, 2027",
                    },
                ],
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <React.Fragment>
            <div>Hello "__root"!</div>
            <Button onClick={addTestDoc}>Add test intern</Button>
            <Outlet />
        </React.Fragment>
    );
}
