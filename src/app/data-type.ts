export interface signUp{
    name:string,
    email:string,
    prourl:string,
    password:string
}
export interface login{
    email:string,
    password:string

}
export interface product{
    name:string,
    price:number,
    category:string,
    color:string,
    description:string,
    image:string,
    id:number,
    quantity:undefined|number,
    productId:undefined|number,
    discount:number,
    image2:string,
    additionaldiscount:number,

}
export interface cart{
    name:string,
    price:number,
    category:string,
    color:string,
    description:string,
    image:string,
    id:number |undefined,
    quantity:undefined|number,
    userId:number,
    productId:number
}
export interface priceSummary{
    quantity:number,
    price:number,
    discount:number,
    tax:number,
    delivary:number,
    total:number,
    discountedprice:number
}
export interface order{
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    userId:string,
    id:number|undefined,

}
export interface file{
    target:string
}
export interface users{
    id: any
    name:string,
    email:string,
    password:string,
    prourl:string

}
export interface photo{
    id: number|undefined,
    image:string
}
export interface application{
    id: number|undefined,
    fullName:string,
    dob:string,
    gender:string,
    address:string,
    phone:number,
    email:string,
    governmentID:string,
    employerName:string,
    employmentStatus:string,
    proofOfIncome:string,
    dependentName:string,
    dependentDOB:string,
    preExistingConditions:string,
    previousSurgeries:string,
    currentMedications:string,
    existingCoverage:string,
    previousPolicyNumbers:string,
    ifsccode:string,
    bankAccount:number,
    branch:string,
    income:number,

}
export interface skinapplication{
    id: number|undefined,
    fullName:string,
    dob:string,
    gender:string,
    age:number,
    country:string,
    address:string,
    phone:number,
    email:string,
    impact:string,
    preExistingConditions:string,
    previousSurgeries:string,
    currentMedications:string,
    existingCoverage:string,
    previousPolicyNumbers:string,
    cancer:string,
    bleeding:string,
    image:photo

}
export interface doctorappointment{
    quantity: number
    id: number|undefined,
    name:string,
    email:string,
    phone:number,
    address:string,
    date:Date,
    message:string,


}
export interface appointment{
    quantity: number
    id: number|undefined,
    name:string,
    email:string,
    phone:number,
    address:string,
    date:Date,
    message:string,
    userId:number,
    docId:number


}