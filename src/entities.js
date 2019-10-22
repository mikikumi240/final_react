



class LentModel {
    constructor(LentId, InvId, ReceivedDate, ReturnedDate, EmpNum, Remark) {
        this.LentId = LentId;
        this.InvId = InvId;
        this.ReceivedDate = ReceivedDate;
        this.ReturnedDate = ReturnedDate;
        this.EmpNum = EmpNum;
        this.Remark = Remark;
    }
}

class EmployeeModel {
    constructor(EmpNum, EmpLastName, EmpFirstName, EmpDeptId) {
        this.EmpNum = EmpNum;
        this.EmpLastName = EmpLastName;
        this.EmpFirstName = EmpFirstName;
        this.EmpDeptId = EmpDeptId
    }
}
class UserModel {
    constructor(isAdmin, adminPsw, password, un, userDisplayName) {
        this.isAdmin = isAdmin;
        this.adminPsw = adminPsw;
        this.password = password;
        this.un = un;
        this.userDisplayName = userDisplayName;
    }
}
class InventoryModel {
    constructor(InvID, TypeCode, SubTypeCode, Makat) {
        this.InvID = InvID;
        this.TypeCode = TypeCode;
        this.SubTypeCode = SubTypeCode;
        this.Makat = Makat;
    }
}

class DeliveryModel {
    constructor(parseDelivery) {
        this.id = parseDelivery.id;
        this.schum = parseDelivery.get("schum");
        this.content_descr = parseDelivery.get("content_descr");                
        // this.createdAt = new Date(parseDelivery.get("createdAt").getUTCFullYear(),
        // parseDelivery.get("createdAt").getUTCMonth(), 
        // parseDelivery.get("createdAt").getUTCDate());
        this.createdAt = new Date (parseDelivery.get("createdAt")).toISOString().slice(0,10);
        this.suppliedAt = new Date (parseDelivery.get("suppliedAt")).toISOString().slice(0,10);        
        this.identity_no = parseDelivery.get("identity_no");//mispar hazmana
        this.img = parseDelivery.get("image")._url;  
        this.physicFile=   parseDelivery.get("image");    

    }
}

export default {
    LentModel,
    EmployeeModel,
    UserModel,
    InventoryModel,
    DeliveryModel
}

