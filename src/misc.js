
import globals from './global';
import jsonEmployees from './Employees';
import jsonDepartments from './departments';
import jsonInventory from './InventoryData';
import jsonSubTypes from './subTypes';
import jsonTypes from './types';
import jsonUsers from './Users';


let functions = {
  loadDb(){
    globals.arrInventory=jsonInventory;
    globals.arrEmp=jsonEmployees;
    globals.arrDepartments=jsonDepartments;
    globals.arrSubTypes=jsonSubTypes;
    globals.arrTypes=jsonTypes;
    globals.arrUsers=jsonUsers;
    globals.arrInventory=jsonInventory;
  }
  
}

export default functions;