interface StudentCount {
    count: number;
}


export interface MemberData {
    Student: StudentCount[]
    parent_id: string,
    lastname:string,
    house_no:string,
    firstname:string,
    middle_name:string
    address:string,
    birthdate:Date
    contact:string,
    created_at:Date
}


