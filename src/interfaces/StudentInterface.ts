export interface StudentData {
    student_id: string
    parent_id:string
    firstname: string
    lastname: string
    middlename: string
    birthdate: Date
    LRN: string
    gradelevel: string
    schoolname: string
    schooladdress: string
    schoolID: string
    schooltype: string
    schoollevel: string
    created_at: Date
    status: "Graduated" | "Undergraduate" | "Stopped"
    schoolyearend:string,
    schoolyearstart:string
}