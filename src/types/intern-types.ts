import type { Timestamp } from "firebase/firestore";

export interface PersonalInformation {
    firstName: string;
    middleName: string;
    lastName: string;
    address: string;
    birthDate: Timestamp;
    age: number;
    gender: string;
    civilStatus: string;
    phoneNumber: string;
    landlineNumber: string;
    email: string;
}

export interface School {
    primarySchool: string;
    juniorHighSchool: string;
    seniorHighSchool: string;
    tertiarySchool: string;
}

export interface EducationPeriod {
    primaryYearFrom: string;
    primaryYearTo: string;
    juniorYearFrom: string;
    juniorYearTo: string;
    seniorYearFrom: string;
    seniorYearTo: string;
    tertiaryYearFrom: string;
    tertiaryYearTo: string;
}

export interface Education {
    school: School;
    educationPeriod: EducationPeriod;
}

export interface Company {
    firstCompany: string;
    secondCompany: string;
    thirdCompany: string;
}

export interface WorkPeriod {
    firstPeriodFrom: Timestamp;
    firstPeriodTo: Timestamp;
    secondPeriodFrom: Timestamp;
    secondPeriodTo: Timestamp;
    thirdPeriodFrom: Timestamp;
    thirdPeriodTo: Timestamp;
}

export interface Position {
    firstPosition: string;
    secondPosition: string;
    thirdPosition: string;
}

export interface WorkExperience {
    company: Company;
    workPeriod: WorkPeriod;
    position: Position;
}

export interface DisadvantagedGroup {
    pwd: boolean;
    indiginousPeople: boolean;
    victimOfArmedConflict: boolean;
    rebelReturnee: boolean;
    fourPsBeneficiary: boolean;
}

export interface Documents {
    birthCertificate: boolean;
    transcriptOfRecords: boolean;
    diploma: boolean;
    form137138: boolean;
    applicationLetter: boolean;
    barangayCertificate: boolean;
    certificationFromSchool: boolean;
    others: Record<string, unknown>;
}

export interface GovernmentInformation {
    validIdType: string;
    dateOrPlaceIssued: Timestamp;
    lbpNumber: string;
}

export interface EmergencyContact {
    emergencyName: string;
    emergencyContact: string;
    emergencyAddress: string;
}

export interface GIPAssignment {
    lgu: string;
    previousExperince: string;
    dateHired: Timestamp;
    dateEnded: Timestamp;
    assignmentPlace: string;
    adlNo: string;
    employmentStatus: string;
}

export interface GSIS {
    beneficiaryName: string;
    relationship: string;
}

export interface Applicant {
    id: string;
    personalInformation: PersonalInformation;
    education: Education;
    workExperience: WorkExperience;
    disadvantagedGroup: DisadvantagedGroup;
    documents: Documents;
    governmentInformation: GovernmentInformation;
    emergencyContact: EmergencyContact;
    GIPAssignment: GIPAssignment;
    GSIS: GSIS;
    remarks: string;
}
