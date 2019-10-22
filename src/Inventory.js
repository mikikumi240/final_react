import globals from './global';

import React from 'react';


class Inventory extends React.Component {
    constructor(props){
    super(props);
    }
    render(){
      
      //copy the array:
      let SearchInv= globals.arrInventory.slice(0);
      if (this.props.data.Makat!="") SearchInv=SearchInv.filter(x=>x.Makat==this.props.data.Makat);
      SearchInv=SearchInv.filter(x=>x.TypeCode==this.props.data.TypeCode);
      SearchInv=SearchInv.filter(x=>x.SubTypeCode==this.props.data.SubTypeCode);
      SearchInv=SearchInv.map(y=><tr data-id={y.InvID}><td>{y.TypeCode}</td>
        <td>{y.SubTypeCode}</td>
        <td>{y.Makat}</td>
        </tr>);
  
      let jsxTable=<tr >        
        <th>סוג מכשיר</th>
        <th>יצרן</th>
        <th>מקט</th>
      </tr>+{SearchInv}//concate failed
      return (
        <div>
          <thead>
          <tr >        
          <th>סוג מכשיר</th>
          <th>יצרן</th>
          <th>מקט</th>
          </tr>
          </thead>
          <tbody>
          {SearchInv}
          </tbody>
        </div>
        
      );
    }
  }
  export default Inventory;