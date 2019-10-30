import globals from './global';
import entity from './entities';
import React from 'react';
import {Alert,Form,Col,Button,Table}  from 'react-bootstrap';
import Inventory from './Inventory';
import functions from './misc';



class Input extends React.Component  {
    constructor(props){
      super(props);
      this.selectedTypeChanged=this.selectedTypeChanged.bind(this);  
      this.selectedSubTypeChanged=this.selectedSubTypeChanged.bind(this);
      this.MakatChanged=this.MakatChanged.bind(this);
      this.searchItems=this.searchItems.bind(this);
      this.addItem=this.addItem.bind(this);
      this.hideAlert=this.hideAlert.bind(this);
    
      this.state={TypeCode:1,SubTypeCode:1,Makat:'',Alert:'',ModeSearch:false};//1 is the def
        
      if (!globals.dbLoaded){
        functions.loadDb();
        globals.dbLoaded=true;
        } 
      }
      componentDidMount(){
        
      }
      selectedSubTypeChanged(e){
        let SubTypeCode=e.target.value;  
        this.setState({SubTypeCode:SubTypeCode});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
      }
      hideAlert(){
        this.setState({Alert:''});
      }
      MakatChanged(e){
        e.preventDefault();
        let Makat=e.target.value;
        this.setState({Makat:Makat});
      }
      selectedTypeChanged(e){
         
        let TypeCode=e.target.value;    
        let subTypeDef=globals.arrSubTypes.filter(i=>i.type_code==TypeCode)[0]["subType_code"];    
        this.setState({TypeCode:TypeCode,SubTypeCode:subTypeDef});
      }
      addItem(){
        if (this.state.Makat===''){
          this.setState({Alert:'מקט לא הוזן'})
        }
        else if(globals.arrInventory.filter(x=>x.Makat==this.state.Makat).length>0){
          
          this.setState({Alert:'מקט  כבר קיים'})
        }
        else{            
          let id=1;
          if (globals.arrInventory.length>0) id= globals.arrInventory[globals.arrInventory.length-1]["InvID"]+1;
          globals.arrInventory.push(new entity.InventoryModel(id,this.state.TypeCode,this.state.SubTypeCode,this.state.Makat));
          this.setState({Alert:'פריט התווסף למלאי בהצלחה'})
        }
      }
      searchItems(){
    
        this.setState({ModeSearch:true});
      }
      render(){
        
      var jsxDevices=globals.arrTypes.map(x=><option value={x.code}>{x.short}</option>);
    
      
        
      var tmpSubTypes=globals.arrSubTypes.filter(i=>i.type_code==this.state.TypeCode);
      
      let jsxSubType=tmpSubTypes.map(x=><option value={x.subType_code}>{x.descr}</option>);
      
      var jsxAlert;
      var jsxInventory;
      if (this.state.Alert!=''){
          jsxAlert=<Alert variant="info" dismissible onClose={this.hideAlert}>
          {this.state.Alert}
          </Alert>
      }
      else if(this.state.ModeSearch==true){
        // inventory component will perform filter on arrInv the global based on criteria sent here)
        jsxInventory=<Inventory data={new entity.InventoryModel(0,this.state.TypeCode,this.state.SubTypeCode,this.state.Makat)}/>
      }
      
      return (
        <div style={{width:"50vw"}}>
        <Form autocomplete="off">
        <Form.Row>
          <Form.Group as={Col} controlId="formMakat">
            <Form.Label>מק"ט</Form.Label>
            <Form.Control type="text" placeholder='הזן מק"ט' onChange={this.MakatChanged} />
          </Form.Group>
    
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
        </Form.Row>
      </Form>
    {/* adding the <SearchAdd> */}
      <div className="d-flex  justify-content-end border">
        <Button onClick={this.addItem} sm={2}  variant="secondary fa fa-plus ml-2">
            
        </Button> 
        <Button onClick={this.searchItems} sm={2} variant="secondary fa fa-search">
            
        </Button> 
        
      </div>
      {jsxAlert}
      <Table striped bordered hover id="SearchResult">
      {jsxInventory}
      </Table>
      <Button href="#/" variant="secondary" >יציאה</Button>
      </div>
      );
      }
    }
    export default Input;