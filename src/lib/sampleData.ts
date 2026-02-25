import type { Applicant } from "@/types/intern-types";
import { Timestamp } from "firebase/firestore";

export const sampleApplicant: Applicant[] = [
    {
        id: "1",
        personalInformation: {
            firstName: "Juan",
            middleName: "Dela",
            lastName: "Cruz",
            address: "123 Rizal Street, Baguio City",
            birthDate: Timestamp.fromDate(
                new Date("2001-05-15T00:00:00+08:00"),
            ),
            age: 25,
            gender: "male",
            civilStatus: "single",
            phoneNumber: "09123456789",
            landlineNumber: "074 123 4567",
            email: "juan.delacruz@email.com",
        },
        education: {
            school: {
                primarySchool: "Baguio Central School",
                juniorHighSchool: "Baguio City National High School",
                seniorHighSchool: "Baguio City National High School",
                tertiarySchool: "Saint Louis University",
            },
            educationPeriod: {
                primaryYearFrom: "2005",
                primaryYearTo: "2011",
                juniorYearFrom: "2011",
                juniorYearTo: "2015",
                seniorYearFrom: "2015",
                seniorYearTo: "2017",
                tertiaryYearFrom: "2017",
                tertiaryYearTo: "2021",
            },
        },
        workExperience: {
            company: {
                firstCompany: "BPO Solutions Inc.",
                secondCompany: "City Hall Baguio",
                thirdCompany: "DOLE",
            },
            workPeriod: {
                firstPeriodFrom: Timestamp.fromDate(
                    new Date("2021-06-01T00:00:00Z"),
                ),
                firstPeriodTo: Timestamp.fromDate(
                    new Date("2022-05-31T23:59:59Z"),
                ),
                secondPeriodFrom: Timestamp.fromDate(
                    new Date("2022-06-01T00:00:00Z"),
                ),
                secondPeriodTo: Timestamp.fromDate(
                    new Date("2023-05-31T23:59:59Z"),
                ),
                thirdPeriodFrom: Timestamp.fromDate(
                    new Date("2023-06-01T00:00:00Z"),
                ),
                thirdPeriodTo: Timestamp.fromDate(
                    new Date("2024-05-31T23:59:59Z"),
                ),
            },
            position: {
                firstPosition: "Customer Service Representative",
                secondPosition: "Administrative Aide",
                thirdPosition: "Employment Officer",
            },
        },
        disadvantagedGroup: {
            pwd: false,
            indiginousPeople: false,
            victimOfArmedConflict: false,
            rebelReturnee: false,
            fourPsBeneficiary: true,
        },
        documents: {
            birthCertificate: true,
            transcriptOfRecords: true,
            diploma: true,
            form137138: true,
            applicationLetter: true,
            barangayCertificate: true,
            certificationFromSchool: false,
            others: {},
        },
        governmentInformation: {
            validIdType: "UMID",
            dateOrPlaceIssued: Timestamp.fromDate(
                new Date("2023-03-10T00:00:00+08:00"),
            ),
            lbpNumber: "987654321",
        },
        emergencyContact: {
            emergencyName: "Maria Dela Cruz",
            emergencyContact: "09987654321",
            emergencyAddress: "123 Rizal Street, Baguio City",
        },
        GIPAssignment: {
            lgu: "Baguio City",
            previousExperince: "180",
            dateHired: Timestamp.fromDate(
                new Date("2025-01-06T00:00:00+08:00"),
            ),
            dateEnded: Timestamp.fromDate(
                new Date("2025-12-31T00:00:00+08:00"),
            ),
            assignmentPlace: "Baguio City Engineering Office",
            adlNo: "0045 Baguio",
            employmentStatus: "Active",
        },
        GSIS: {
            beneficiaryName: "Maria Dela Cruz",
            relationship: "Mother",
        },
        remarks: "Performing well, eligible for extension.",
    },
    {
        id: "2",
        personalInformation: {
            firstName: "Pedro",
            middleName: "Fernando",
            lastName: "Penduko",
            address: "123 Rizal Street, Baguio City",
            birthDate: Timestamp.fromDate(
                new Date("1999-05-15T00:00:00+08:00"),
            ),
            age: 25,
            gender: "male",
            civilStatus: "single",
            phoneNumber: "09123456789",
            landlineNumber: "074 123 4567",
            email: "juan.delacruz@email.com",
        },
        education: {
            school: {
                primarySchool: "Baguio Central School",
                juniorHighSchool: "Baguio City National High School",
                seniorHighSchool: "Baguio City National High School",
                tertiarySchool: "Saint Louis University",
            },
            educationPeriod: {
                primaryYearFrom: "2005",
                primaryYearTo: "2011",
                juniorYearFrom: "2011",
                juniorYearTo: "2015",
                seniorYearFrom: "2015",
                seniorYearTo: "2017",
                tertiaryYearFrom: "2017",
                tertiaryYearTo: "2021",
            },
        },
        workExperience: {
            company: {
                firstCompany: "BPO Solutions Inc.",
                secondCompany: "City Hall Baguio",
                thirdCompany: "DOLE",
            },
            workPeriod: {
                firstPeriodFrom: Timestamp.fromDate(
                    new Date("2021-06-01T00:00:00Z"),
                ),
                firstPeriodTo: Timestamp.fromDate(
                    new Date("2022-05-31T23:59:59Z"),
                ),
                secondPeriodFrom: Timestamp.fromDate(
                    new Date("2022-06-01T00:00:00Z"),
                ),
                secondPeriodTo: Timestamp.fromDate(
                    new Date("2023-05-31T23:59:59Z"),
                ),
                thirdPeriodFrom: Timestamp.fromDate(
                    new Date("2023-06-01T00:00:00Z"),
                ),
                thirdPeriodTo: Timestamp.fromDate(
                    new Date("2024-05-31T23:59:59Z"),
                ),
            },
            position: {
                firstPosition: "Customer Service Representative",
                secondPosition: "Administrative Aide",
                thirdPosition: "Employment Officer",
            },
        },
        disadvantagedGroup: {
            pwd: false,
            indiginousPeople: false,
            victimOfArmedConflict: false,
            rebelReturnee: false,
            fourPsBeneficiary: true,
        },
        documents: {
            birthCertificate: true,
            transcriptOfRecords: true,
            diploma: true,
            form137138: true,
            applicationLetter: true,
            barangayCertificate: true,
            certificationFromSchool: false,
            others: {},
        },
        governmentInformation: {
            validIdType: "UMID",
            dateOrPlaceIssued: Timestamp.fromDate(
                new Date("2023-03-10T00:00:00+08:00"),
            ),
            lbpNumber: "987654321",
        },
        emergencyContact: {
            emergencyName: "Maria Dela Cruz",
            emergencyContact: "09987654321",
            emergencyAddress: "123 Rizal Street, Baguio City",
        },
        GIPAssignment: {
            lgu: "Baguio City",
            previousExperince: "180",
            dateHired: Timestamp.fromDate(
                new Date("2025-01-06T00:00:00+08:00"),
            ),
            dateEnded: Timestamp.fromDate(
                new Date("2025-12-31T00:00:00+08:00"),
            ),
            assignmentPlace: "Baguio City Engineering Office",
            adlNo: "0045 Baguio",
            employmentStatus: "Active",
        },
        GSIS: {
            beneficiaryName: "Maria Dela Cruz",
            relationship: "Mother",
        },
        remarks: "Performing well, eligible for extension.",
    },
];

export const sampleApplicantFlattened = sampleApplicant.map((a, index) => ({
    id: index.toString(),
    firstName: a.personalInformation.firstName,
    middleName: a.personalInformation.middleName,
    lastName: a.personalInformation.lastName,
    fullName: `${a.personalInformation.firstName} ${a.personalInformation.middleName} ${a.personalInformation.lastName}`,
    address: a.personalInformation.address,
    birthDate:
        a.personalInformation.birthDate?.toDate().toLocaleDateString() ?? "",
    age: a.personalInformation.age,
    gender: a.personalInformation.gender,
    civilStatus: a.personalInformation.civilStatus,
    phoneNumber: a.personalInformation.phoneNumber,
    landlineNumber: a.personalInformation.landlineNumber,
    email: a.personalInformation.email,
}));
