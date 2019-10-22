import globals from './global';
import React from 'react';
import{Table}  from 'react-bootstrap';



class DevicesInUse extends React.Component{
    constructor(props){
      super(props);
      this.RowSelected=this.RowSelected.bind(this);
    }
    RowSelected(e){
      debugger
        let LentIdSelected=e.currentTarget.getAttribute("data-id");
        this.props.onLentSelected(LentIdSelected);
    }
    render(){
      
      let objStyle={"width":"100%" ,"height":"100%","margin":0,"padding":0,"border":0};
      let jsxSubTypes=globals.arrSubTypes.map(x=><option value={x.subType_code}>{x.descr}</option>);
      let jsxTypes=globals.arrTypes.map(x=><option value={x.code}>{x.short}</option>);
      
      let merged = [];
        
      for(let i=0; i<this.props.Lents.length; i++) {
        merged.push({
          ...this.props.Lents[i], 
          ...(globals.arrInventory.find((itmInner) => itmInner.InvID === this.props.Lents[i].InvId))
          }
        );
      }
  
      var jsxDevicesInUse=merged.map(x=><tr data-id={x.LentId} onClick={this.RowSelected}>
      <td><select disabled value={x.TypeCode}style={objStyle}>{jsxTypes}</select></td>
      <td><select disabled value={x.SubTypeCode} style={objStyle}>{jsxSubTypes}</select></td>
      <td>{x.Makat}</td><td>{x.ReceivedDate}</td><td>{x.ReturnedDate}</td>
      <td>{x.Remark}</td>
      </tr>);
      return (
        <Table striped bordered hover>
          <thead>
          <tr >
            <th>סוג</th>
            <th>יצרן</th>
            <th>מקט</th>
            <th>תאריך מסירה</th>
            <th>תאריך החזרה</th>
            <th>הערה</th>
          </tr>
          </thead>
          <tbody>
          {jsxDevicesInUse}
          </tbody>
        </Table>
  
      );
    }
  }
  export default DevicesInUse;