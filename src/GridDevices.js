import globals from './global';

import React from 'react';






import{Button,Table}  from 'react-bootstrap';





class GridDevices extends React.Component  {
    constructor(props){
      super(props);
      
      this.rowClicked=this.rowClicked.bind(this);
      this.btnDelClicked=this.btnDelClicked.bind(this);
  }
  rowClicked(e){
    let id=e.currentTarget.getAttribute("data-id");
    if (this.props.target=="TypeCode"){
      this.props.handleTypeSelected(id);
    }    
    else {
      this.props.handleSubTypeSelected(id);
    }  
  
  }
  btnDelClicked(e){
    let id=e.currentTarget.getAttribute("data-id");
    if (this.props.target=="TypeCode"){
      this.props.handleTypeDeleted(id);
    }    
    else {
      this.props.handleSubTypeDeleted(id);
    }
  }
  render(){
    var jsxTable;
    var title;
    var disableFlag=globals.currentUser["isAdmin"]==1?'' : 'disabled';
    if(this.props.target==='TypeCode'){
      title=<h4>סוג מכשירים במלאי</h4>
      jsxTable=globals.arrTypes.map(x=><tr onClick={this.rowClicked} data-id={x.code}><td>{x.short}</td>
      <td><Button disabled={disableFlag} data-id={x.code} className="mx-auto d-block" onClick={this.btnDelClicked} variant="light"><i style={{fontSize:"20px",color:"red"}}
      className="fa fa-remove" ></i> </Button></td></tr>);
    }
    else {
      title=<h4>יצרנים של המכשיר</h4>
      let filtered=globals.arrSubTypes.filter(x=>x.type_code==this.props.Type);
      jsxTable=filtered.map(x=><tr onClick={this.rowClicked} data-id={x.subType_code}><td>{x.descr}</td>
      <td><Button disabled={disableFlag} data-id={x.subType_code} className="mx-auto d-block" onClick={this.btnDelClicked} variant="light"><i style={{fontSize:"20px",color:"red"}}
      className="fa fa-trash" ></i> </Button></td></tr>);
    }
    return(
      <div>
        {title}
        <Table className="w-50 m-5" striped bordered hover responsive>
          <thead>
          <tr>
            <th md={1}>תיאור</th>  
            <th md={1}>לחץ למחיקה</th>  
          </tr>
          </thead>
          <tbody>
          {jsxTable}
          </tbody>
        </Table>
        
      </div>
    );
    }
  }
  export default GridDevices;