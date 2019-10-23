import globals from './global';
import functions from './misc';
import entity from './entities';
import React from 'react';
import axios from 'axios';
import {Route,Switch,Redirect} from 'react-router-dom';
import './App.css';
import Reports from './Reports';
import About from './About';
import TablesManage from './TablesManage';
import HomeScreen from './HomeScreen';
import{Alert,Overlay,Form,Row,Col,Button,Tooltip}  from 'react-bootstrap';
import jsonEmployees from './Employees';
import NewRegistration from './NewRegistration';
import DevicesInUse from './DevicesInUse';
import Employee from './Employee';


class AttachDeAttach extends React.Component  {
constructor(props){
  super(props);
  this.empSelected=this.empSelected.bind(this);
  this.updateTypeClicked=this.updateTypeClicked.bind(this);
  this.onLentSelected=this.onLentSelected.bind(this);
  this.okPressed=this.okPressed.bind(this);
  this.makatChanged=this.makatChanged.bind(this);
  this.selectedSubTypeChanged=this.selectedSubTypeChanged.bind(this);
  this.selectedTypeChanged=this.selectedTypeChanged.bind(this);
  this.receivedDateChanged=this.receivedDateChanged.bind(this);
  this.returnedDateChanged=this.returnedDateChanged.bind(this);
  this.remarkChanged=this.remarkChanged.bind(this);
  this.hideAlert=this.hideAlert.bind(this);
  this.cleanScr=this.cleanScr.bind(this);
  
  this.state={TTT:'',CurrentEmployee:new entity.EmployeeModel(0,'','',0),
  Lents:[],updateType:'',CurrentLent:new entity.LentModel(0,0,'','',0,''),
  CurrentInvItem:new entity.InventoryModel(0,0,0,''),Alert:'',
  DevicesToSelect:[],SubDevicesToSelect:[],reset:false,
  MakatsToSelect:[],currentInUse:[]};
  if (!globals.dbLoaded){
    functions.loadDb();
    globals.dbLoaded=true;
    } 
}
 componentDidUpdate() {
   
   let g=10;
    // if (this.state.reset) {
    //     this.setState({reset: false})
    // }
}
cleanScr(e){
  
  this.setState({CurrentEmployee:new entity.EmployeeModel(0,'','',0),
  Lents:[],updateType:'',CurrentLent:new entity.LentModel(0,0,'','',0,''),
  CurrentInvItem:new entity.InventoryModel(0,0,0,''),Alert:'',
  DevicesToSelect:[],SubDevicesToSelect:[],reset:true,MakatsToSelect:[],
  currentInUse:[]});
}
onLentSelected(lentIdSelected){
  
  
  
  let tmpLent=this.state.Lents.filter(x=>x.LentId==lentIdSelected);
  let tmpInv=globals.arrInventory.filter(x=>x.InvID==tmpLent[0].InvId);

  var copied_lent = { ...tmpLent[0] };//copy,so changes will not be saved in arrLents until save is clicked...
 
  let ItemsAvailable=globals.arrTypes.filter(x=>x.code==tmpInv[0]["TypeCode"]);
  let tmpSubTypes=globals.arrSubTypes.filter(x=>x.subType_code==tmpInv[0]["SubTypeCode"]);
  let tmpMakats=tmpInv;//2210
  this.setState({CurrentLent:copied_lent,CurrentInvItem:tmpInv[0],
    updateType:'deAttach',DevicesToSelect:ItemsAvailable,
    SubDevicesToSelect: tmpSubTypes,MakatsToSelect:tmpMakats});           

}

empSelected(objEmpSel){
  
  //=new EmployeeModel(0,'','',0)
  var Lents=globals.arrLents.filter(x=>x.EmpNum===objEmpSel.EmpNum);
  
  
//merged=invid empnum dates type and sub type
  this.setState({CurrentEmployee:objEmpSel,Lents:Lents,reset:false});
  
}
updateTypeClicked(e){
  
  let Type=0;
  let SubType=0;
  let Makat='';
  var allCurrentUsed = [];
  var arrFreeMakats=[];
  if(e.target.value=='attach'){
  
          
      for(let i=0; i<this.state.Lents.length; i++) {
        if (this.state.Lents[i]["ReturnedDate"]==='')
        {
          allCurrentUsed.push({
            ...this.state.Lents[i], 
            ...(globals.arrInventory.find((itmInner) => itmInner.InvID == this.state.Lents[i].InvId))
            }
          );
        }
      }
      //ItemsAvailable=items the emp can take
      var ItemsAvailable= globals.arrTypes.filter(obj => allCurrentUsed.every(s => s.TypeCode != obj.code));
      
      let ItemTypeDef=this.state.CurrentInvItem["TypeCode"];
      if(ItemsAvailable.length>0 && ItemTypeDef==0)ItemTypeDef=ItemsAvailable[0]["code"];
      var tmpSubTypes=globals.arrSubTypes.filter(i=>i.type_code==ItemTypeDef);

      //reset however in case user is not changing what is in the combox of Device type/sub device 
     //so we take is as def values for object CurrentInvItem
    
      if(ItemsAvailable.length>0){
        Type=ItemsAvailable[0]["code"];
        SubType=tmpSubTypes[0]["subType_code"];
        let arrMktOfProducer=globals.arrInventory.filter(i=>i.SubTypeCode==SubType);
        arrFreeMakats= arrMktOfProducer.filter(obj => allCurrentUsed.every(s => s.Makat != obj.Makat));
        Makat=arrFreeMakats[0]["Makat"];
      } 
      this.setState({updateType:e.target.value,MakatsToSelect:arrFreeMakats,
        currentInUse:allCurrentUsed,
        CurrentLent:new entity.LentModel(0,0,'','',0,''),
        CurrentInvItem:new entity.InventoryModel(0,Type,SubType,Makat),
        DevicesToSelect:ItemsAvailable,SubDevicesToSelect: tmpSubTypes });//attach/deAttach 

    }
  else if   (e.target.value=='deAttach'){
    
    if (this.state.Lents.length==0)
      this.setState({Alert:'לא רשומים מכשירים לעובד הנבחר'});
    else{
      //this.setState({Alert:'להסרת מכשיר מלקוח, יש ללחוץ על הרשומה המתאימה בטבלה העליונה '});
      let note=this.state.TTT!=''?'':'להסרת מכשיר מלקוח, יש ללחוץ על הרשומה המתאימה בטבלה העליונה ';

      this.setState({TTT:note});
            
    }
      
  }
    
    

  }
//makat and sub type can be changed only on attach ,otherwise they are locked+pasted on screen
//consider to copy objects with:let newInvItem = new Object(this.state.CurrentInvItem)
makatChanged(e){
  
  let newInvItem=new entity.InventoryModel(this.state.CurrentInvItem["InvID"],
  this.state.CurrentInvItem["TypeCode"],
  this.state.CurrentInvItem["SubTypeCode"],
  e.target.value);
  this.setState({CurrentInvItem:newInvItem});
}
selectedSubTypeChanged(e){
  //2210
  let arrMktOfProducer=globals.arrInventory.filter(i=>i.SubTypeCode==e.target.value);
  let arrFreeMakats= arrMktOfProducer.filter(obj => this.state.currentInUse.every(s => s.Makat != obj.Makat));
  //end 2210
  let newInvItem=new entity.InventoryModel(this.state.CurrentInvItem["InvID"],
  this.state.CurrentInvItem["TypeCode"],
  e.target.value,arrFreeMakats[0]["Makat"]);
  //before 2210 -this.state.CurrentInvItem["Makat"]);
  this.setState({CurrentInvItem:newInvItem,MakatsToSelect:arrFreeMakats});

}
selectedTypeChanged(e){
  //synchron
  
  let subTypeDef=globals.arrSubTypes.filter(i=>i.type_code==e.target.value)[0]["subType_code"];    
  //2210
  let arrMktOfProducer=globals.arrInventory.filter(i=>i.SubTypeCode==subTypeDef);
  let arrFreeMakats= arrMktOfProducer.filter(obj => this.state.currentInUse.every(s => s.Makat != obj.Makat));
  //end 2210
  let newInvItem=new entity.InventoryModel(this.state.CurrentInvItem["InvID"],
  e.target.value,
  subTypeDef,arrFreeMakats[0]["Makat"]);
  //before 2210- this.state.CurrentInvItem["Makat"]);

  var tmpSubTypes=globals.arrSubTypes.filter(i=>i.type_code==e.target.value);
  
  this.setState({CurrentInvItem:newInvItem,SubDevicesToSelect: tmpSubTypes,
    MakatsToSelect:arrFreeMakats });
}
returnedDateChanged(e){
  let tmpLentItem = new Object(this.state.CurrentLent);
  tmpLentItem["ReturnedDate"]=e.target.value;
  this.setState({CurrentLent:tmpLentItem});
}
receivedDateChanged(e){
  let tmpLentItem = new Object(this.state.CurrentLent);
  tmpLentItem["ReceivedDate"]=e.target.value;
  this.setState({CurrentLent:tmpLentItem});
}
remarkChanged(e){
  let tmpLentItem = new Object(this.state.CurrentLent);
  tmpLentItem["Remark"]=e.target.value;
  this.setState({CurrentLent:tmpLentItem});
}
okPressed(){
switch (this.state.updateType){
  case "attach":
    let EmpNum=this.state.CurrentEmployee["EmpNum"];
    if (EmpNum==0){
      this.setState({Alert:'מספר עובד לא הוזן'});
    }
    else if (isNaN(EmpNum) ){
      this.setState({Alert:'מספר עובד לא תקין'});
    }  
    else if(this.state.CurrentEmployee["EmpFirstName"]===''|| this.state.CurrentEmployee["EmpLastName"]===''){
      this.setState({Alert:'שם מלא לא הוזן'});
    }
    else if(this.state.CurrentLent["ReceivedDate"]==='') {
      this.setState({Alert:'תאריך מסירה לא הוזן'});
    }      
    
   
    else
    {
    debugger
      let NewEmp=new Object(this.state.CurrentEmployee);
      globals.arrEmp.push(NewEmp);
      
      let next_LentId=1;
      if (globals.arrLents.length>0) next_LentId=globals.arrLents[globals.arrLents.length-1]["LentId"]+1;
      let newLent = new Object(this.state.CurrentLent)
      newLent["LentId"]=next_LentId;
      newLent["EmpNum"]=EmpNum;
      
      let invIdSelected=globals.arrInventory.filter(x=>x.TypeCode==this.state.CurrentInvItem["TypeCode"] && x.SubTypeCode==this.state.CurrentInvItem["SubTypeCode"] && x.Makat==this.state.CurrentInvItem["Makat"]);
      if(invIdSelected.length>0){
        newLent["InvId"]=invIdSelected[0]["InvID"];
        globals.arrLents.push(newLent);                
      }
      else{
        this.setState({Alert:'פריט לא קיים במלאי'});
          }
    }        
   
    break;
  case "deAttach":
    
    
    if (this.state.CurrentEmployee["EmpNum"]==0){
      this.setState({Alert:'לא נבחר עובד'});
    }
      
    else if (this.state.CurrentLent["LentId"]==0){
      this.setState({Alert:'לא נבחרה השאלה'});
    }
      
    else if (this.state.CurrentLent["ReturnedDate"]==''){
      this.setState({Alert:'לא נבחר תאריך החזרה'});
    }
      
    else{
      let lentFound=globals.arrLents.filter(x=>x.LentId==this.state.CurrentLent["LentId"])
      lentFound[0]["ReturnedDate"]=this.state.CurrentLent["ReturnedDate"];
      lentFound[0]["Remark"]=this.state.CurrentLent["Remark"];
    }    
    
    
    break;
  }
  //refresh
  this.empSelected(this.state.CurrentEmployee);        
  this.setState({updateType:'', 
  DevicesToSelect:[],SubDevicesToSelect:[],     
  CurrentLent:new entity.LentModel(0,0,'','',0,''),
  CurrentInvItem:new entity.InventoryModel(0,0,0,''),currentInUse:[],MakatsToSelect:[]});
}
hideAlert(){
  this.setState({Alert:''});
}
render(){   
  var jsxDevices;
  var jsxSubType;
  var jsxAlert;  
  
  jsxDevices=this.state.DevicesToSelect.map(x=><option value={x.code}>{x.short}</option>);        
  jsxSubType=this.state.SubDevicesToSelect.map(x=><option value={x.subType_code}>{x.descr}</option>);
  // 22/10
  var jsxMakats=this.state.MakatsToSelect.map(x=><option value={x.Makat}>{x.Makat}</option>);           
  //22/10
  if (this.state.Alert!=''){
    jsxAlert=<Alert variant="danger" dismissible onClose={this.hideAlert}>
    {this.state.Alert}
    </Alert>
  }
var blnShow=(this.state.TTT!=''?true:false);
  return (
    <div className="mt-5">       
      <Employee notifySelectionBy={this.empSelected} reset={this.state.reset}/>
       
      <DevicesInUse Lents={this.state.Lents} onLentSelected={this.onLentSelected}/>
      {jsxAlert}
      <h4 className="pb-4">עדכון מיקום למכשיר</h4>
      <Form autocomplete="off">
        <Form.Check ref={(e)=>this.chkRemove=e} disabled__ className="mr-0 pl-5" inline label="החזרת מכשיר מלקוח" onChange={this.updateTypeClicked} type="radio" value="deAttach" checked={this.state.updateType=='deAttach'?true:false}/>
        <Overlay target={this.chkRemove} show={blnShow} placement="bottom">
        {props => (
          <Tooltip  {...props}>
            {this.state.TTT}
          </Tooltip>
        )}
        </Overlay>
        <Form.Check className="mr-0" inline label="מסירת מכשיר ללקוח" onChange={this.updateTypeClicked} type="radio" value="attach" checked={this.state.updateType=='attach'?true:false}/>
      
      
      <fieldset>
        <legend>פרטי השאלה</legend> 
          <Form.Row>
            <Form.Group as={Col} controlId="formDevice">
              <Form.Label>סוג מכשיר</Form.Label>
              <Form.Control as="select" onChange={this.selectedTypeChanged}>
                {jsxDevices}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="formDevice">
              <Form.Label>תת סוג</Form.Label>
              <Form.Control as="select" onChange={this.selectedSubTypeChanged}>
                {jsxSubType}
              </Form.Control>
            </Form.Group>

            {/* <Form.Group as={Col} controlId="formMakat">
              <Form.Label>מק"ט</Form.Label>
              <Form.Control type="text" placeholder='הזן מק"ט' 
              onChange={this.makatChanged} value={this.state.CurrentInvItem["Makat"]}></Form.Control>
            </Form.Group> */}
            {/* //2210 */}
            <Form.Group as={Col} controlId="formMakat2">
              <Form.Label>מס' קטלוג</Form.Label>
              <Form.Control as="select" onChange={this.makatChanged} value={this.state.CurrentInvItem["Makat"]}>
                {jsxMakats}
              </Form.Control>
            </Form.Group>
            {/* end 22/10 */}
            
          </Form.Row>      
          <Form.Row>
            <Form.Group as={Col} controlId="formDateLent">
              <Form.Label>ת.מסירה</Form.Label>
              <Form.Control type="date" onChange={this.receivedDateChanged} value={this.state.CurrentLent["ReceivedDate"] } />
            </Form.Group>
            <Form.Group as={Col} controlId="formDateReturn">
              <Form.Label>ת.החזרה</Form.Label>
              <Form.Control type="date" onChange={this.returnedDateChanged} value={this.state.CurrentLent["ReturnedDate"] }/> 
            </Form.Group>

            <Form.Group as={Col} controlId="formRemark">
              <Form.Label>הערה</Form.Label>
              <Form.Control type="text" placeholder='הזן הערה' 
              onChange={this.remarkChanged} 
              value={this.state.CurrentLent["Remark"] }/>
            </Form.Group>
          </Form.Row>
      </fieldset>
      </Form>

      <Button variant="secondary ml-2" onClick={this.cleanScr}>ניקוי מסך</Button>
      <Button variant="secondary ml-2" onClick={this.okPressed}>אישור</Button>
      <Button variant="secondary"   href="/#">
      {/* <i style={{fontSize:"40px",color:"blue"}}
                    className="fad fa-door-open" ></i> */}
                    יציאה
      </Button>
      

      
    </div>
  );
  }
}
export default AttachDeAttach;