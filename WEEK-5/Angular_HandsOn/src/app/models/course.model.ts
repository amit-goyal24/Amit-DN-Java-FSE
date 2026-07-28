export interface Course { id:number; name:string; code:string; credits:number|null; gradeStatus:'passed'|'failed'|'pending'; }
export const SAMPLE_COURSES: Course[] = [
 {id:1,name:'Data Structures',code:'CS101',credits:4,gradeStatus:'passed'}, {id:2,name:'Angular Fundamentals',code:'WD220',credits:3,gradeStatus:'pending'}, {id:3,name:'Database Systems',code:'DB310',credits:3,gradeStatus:'failed'}, {id:4,name:'Cloud Computing',code:'CC401',credits:4,gradeStatus:'pending'}, {id:5,name:'Communication Skills',code:'HS105',credits:1,gradeStatus:'passed'}];
