// export const arrUsers=[];
// export var currentUser={};
// export var arrTypes =[];
// export var arrSubTypes = [];
// export var arrDepartments = [];
// export var arrInventory=[];
// export var arrLents=[];
// export var arrEmp=[];
// export const i_am_global="shalom";
// and then we did:
// let arrUsers=require('./global').arrUsers;
// let currentUser=require('./global').currentUser;
// let arrTypes=require('./global').arrTypes;
// let arrSubTypes=require('./global').arrSubTypes;
// let arrDepartments=require('./global').arrDepartments;
// let arrInventory=require('./global').arrInventory;
// let arrEmp=require('./global').arrEmp;
// let arrLents=require('./global').arrLents;
 


//the following is instead of the above
let globals = {
    arrUsers: [],
    currentUser: {},
    arrTypes: [],
    arrSubTypes: [],
    arrDepartments: [],
    arrInventory: [],
    arrLents: [],
    arrEmp: [],
    i_am_global: "shalom",
    dbLoaded:false
}

export default globals;