import React from 'react'
import Parse from 'parse';
import{Button,Table,Row,Col,Modal,Form,Image}  from 'react-bootstrap';
import NumericInput from 'react-numeric-input';
import entity from './entities';
import mishloach from './teudaMish1.png';
import globals from './global';
import waiting from './wait.gif';
// import mishloach2 from '../public/teudaMish1.png';

class Delivery extends React.Component  {
    constructor(props){
      super(props);
        this.imgChange=this.imgChange.bind(this);
        this.openImage=this.openImage.bind(this);
        this.delDelivery=this.delDelivery.bind(this);
        this.readDeliveries=this.readDeliveries.bind(this);
        this.openModal=this.openModal.bind(this);
        this.closeModal=this.closeModal.bind(this);
        this.readInput=this.readInput.bind(this);
        this.createDelivery=this.createDelivery.bind(this);
        this.updateDelivery=this.updateDelivery.bind(this);
        this.state={
            showModal: false,
            imgChanged:false,
            currDelivery:
            {   schum:0,content_descr:'',suppliedAt:'',
                id:0,identity_no:'',
                newDeliveryImg: {
                    file: null,
                    URL: ""
                }
            },
            deliveries:[],
            action:'' ,
            waiting:false           
        };
    }
    imgChange(ev) {
debugger
        let newDeliveryImg = {};
        newDeliveryImg.file = ev.target.files[0];
        if (newDeliveryImg.file) {
            newDeliveryImg.URL = URL.createObjectURL(newDeliveryImg.file);
        } else {
            newDeliveryImg.URL = "";
        }

        let tmpDelivery=this.state.currDelivery;
        tmpDelivery.newDeliveryImg=newDeliveryImg;
        this.setState({ currDelivery:tmpDelivery,imgChanged:true });
        console.log("imgChnaged");
        console.log(newDeliveryImg.URL);
        
    }
	
    readDeliveries(){
        debugger
        const DeliveryTable = Parse.Object.extend('delivery');        
        const query = new Parse.Query(DeliveryTable);
        
        query.find().then((results) => {                
            console.log("see results below:");
            console.log(results);
            const deliveries = results.map(result => new entity.DeliveryModel(result));
            
            this.setState({deliveries,waiting:false,imgChanged:false});

        }, (error) => {
            
            
            alert("err");
        });
    }
    delDeliveryNir(e){
        const RecipeTable = Parse.Object.extend('delivery');
        const query = new Parse.Query(RecipeTable);
        query.equalTo("objectId", "JGMuHOims3");
        query.find().then((results) => {
            
            console.log('Recipe found', results);

            alert("found!!!");
            results.destroy().then(function(response) {
                
                alert("deleted from anan!!!");
                }, (error) => {
                    alert("delete failed!!!");
                // error is a Parse.Error with an error code and message.
                })

        }, (error) => {
            // if (typeof document !== 'undefined') document.write(`Error while fetching Recipe: ${JSON.stringify(error)}`);
            alert("not found");
            console.error('Error while fetching Recipe', error);
        });
    }
    delDelivery_site(e){
        //i took from the site
        const SoccerPlayers = Parse.Object.extend("delivery");
        const soccerPlayers = new SoccerPlayers();

        // Retrieve the object by id
        soccerPlayers.get("JGMuHOims3")
        .then((player) => {
        // The object was retrieved successfully and it is ready to update.
        alert("found!!");
        player.destroy().then((player) => {
            alert("deleted from anan!!!");
            //refresh: this.readDeliveries();
        }, (error) => {
            // The delete failed.
            // error is a Parse.Error with an error code and message.
        })
        }, (error) => {
        // The object was not retrieved successfully.
        });;
    }
    delDelivery(e) {
        this.setState({waiting:true})
        const RecipeTable = Parse.Object.extend('delivery');
        const query = new Parse.Query(RecipeTable);
        let id=e.currentTarget.getAttribute("data-id");
        query.equalTo("objectId", id);

        
        query.first(id)
        .then(eventToDelete => {
          if(eventToDelete !== undefined) {
            console.log('Event to Delete', eventToDelete.id);
            eventToDelete.destroy()
            .then(eventDeleted => {
              console.log('Deleted Event', eventDeleted.id);
              this.readDeliveries();//refresh
            })
            .catch(console.error)
          }
        });
      }
    componentDidMount(){
        this.setState({imgChanged:false});
        this.readDeliveries();
        
    }
    openModal(e) {
        debugger
        var currDelivery={schum:0,content_descr:'',suppliedAt:'',
        id:0,identity_no:'',newDeliveryImg:{file:null,URL:''}};
        let action=e.currentTarget.getAttribute("action_");//edit/add
        if (action=='edit'){
            let id=e.currentTarget.getAttribute("data-id");
            let arrFind=this.state.deliveries.filter(x=>x.id==id);
            if (arrFind.length>0){
                
                currDelivery.schum=parseInt(arrFind[0]["schum"]);
                currDelivery.identity_no=arrFind[0]["identity_no"];
                currDelivery.content_descr=arrFind[0]["content_descr"];
                currDelivery.suppliedAt=new Date(arrFind[0]["suppliedAt"]);
                currDelivery.id=arrFind[0]["id"];
                debugger
                // currDelivery.newDeliveryImg.file=null;
                currDelivery.newDeliveryImg.URL=arrFind[0]["img"]
                currDelivery.newDeliveryImg.file=arrFind[0]["physicFile"];
                console.log("eee");
                console.log(currDelivery.newDeliveryImg.URL);
                
                // currDelivery.newDeliveryImg.URL=arrFind[0]["img"]
                ////
                // let tmpDeliveryImg = {};
                // tmpDeliveryImg.file = arrFind[0]["physicFile"];
                // if (tmpDeliveryImg.file) {
                    // tmpDeliveryImg.URL = URL.createObjectURL(tmpDeliveryImg.file);
                // } else {
                    // tmpDeliveryImg.URL = "";
                // }
                // currDelivery.newDeliveryImg=tmpDeliveryImg;                                                         
                
            }
        }
        this.setState({ showModal: true ,action,currDelivery});
    }

    closeModal() {
        this.setState({ showModal: false,action:'' });
    }
    updateDelivery(e) {
        debugger
        let id=this.state.currDelivery.id;
       

        const DeliveryTable = Parse.Object.extend('delivery');
        const query = new Parse.Query(DeliveryTable);
        query.get(id).then((eventToUpdate) => {
            eventToUpdate.set('content_descr', this.state.currDelivery.content_descr);
            eventToUpdate.set('identity_no', this.state.currDelivery.identity_no);
            eventToUpdate.set('schum', parseInt(this.state.currDelivery.schum));
            eventToUpdate.set('suppliedAt', new Date(this.state.currDelivery.suppliedAt));    
            console.log("yup");
            console.log( this.state.currDelivery.newDeliveryImg.file)
            console.log(this.state.currDelivery.newDeliveryImg.file.name)
            if(this.state.imgChanged==true)    eventToUpdate.set('image', new Parse.File(this.state.currDelivery.newDeliveryImg.file.name, this.state.currDelivery.newDeliveryImg.file));
            
            eventToUpdate.save().then((response) => {                            
              console.log('Updated ', response);
              this.readDeliveries();
            }, (error) => {
              
              console.error('Error while updating ', error);
            });
          });
        
        this.closeModal();
      }
    createDelivery(){
       
        const DeliveryRow = Parse.Object.extend('delivery');
        const newDelivery = new DeliveryRow();        
        
        newDelivery.set('identity_no', this.state.currDelivery.identity_no);
        newDelivery.set('suppliedAt',  new Date(this.state.currDelivery.suppliedAt));        
        newDelivery.set('content_descr', this.state.currDelivery.content_descr);
        newDelivery.set('schum', parseInt(this.state.currDelivery.schum));                
        newDelivery.set('image', new Parse.File(this.state.currDelivery.newDeliveryImg.file.name, this.state.currDelivery.newDeliveryImg.file));

        newDelivery.save().then(result => {
            console.log('delivery created', result);                    
            this.readDeliveries();
          },
          (error) => {            
            console.error('Error while creating Recipe: ', error);
          }
        );

        this.closeModal();

    }
    readInput(e){
        // e.preventDefault();
        
        let FieldName=e.target.getAttribute("data-id");
        let FieldValue=e.target.value;                
        let tmpDelivery=this.state.currDelivery;

        switch (FieldName){
          case "content_descr":                
          case "suppliedAt":
          case "identity_no":
          case "schum":              
              tmpDelivery[FieldName]=FieldValue;              
              this.setState({currDelivery:tmpDelivery});             
              break;
        }
        
    }
    openImage(e){
        debugger
        //return;
        let id=e.currentTarget.getAttribute("data-id");
        let arrFilter=this.state.deliveries.filter(x=>x.id==id);
        if (arrFilter.length>0){
            let img=arrFilter[0]["img"];
            window.open(img,'_blank');
        }
        // const url = 'somesite.com?data=yourDataToSend';
        
        //?var fileURL = URL.createObjectURL(img);
        
        // window.open({mishloach}, '_blank');
        
    }
    render(){ 
        var jsxSpinner
        if (this.state.waiting==true){
            jsxSpinner=<div className="mx-auto d-block" style={{width:'30px',height:'30px'}} id="loading">
                        <p><img style={{width:'50px',height:'50px'}}  src={waiting} />אנא המתן</p>
                    </div>     
        }  
        var disableFlag=globals.currentUser["isAdmin"]==1?'' : 'disabled';
        disableFlag='';//zmani!!!!!!
        var tblHeader=<thead>
            <th>מספר הזמנה</th>
            <th>תאריך הזמנה</th>
            <th>תאריך הספקה</th>
            <th>פרטי הזמנה</th>
            <th>סכום</th>
            <th>מחיקה</th>
            <th>עריכה</th>
            <th>קובץ</th>
            </thead>
        var results=this.state.deliveries;
        console.log("look here");
        console.log(results);
        
        var jsxDeliveries;
         jsxDeliveries = results.map(result =>                                 
            <tr data_id={result.id}>
                
                <td>{result.identity_no}</td>
                <td>{result.createdAt}</td>
                <td>{result.suppliedAt}</td>
                <td>{result.content_descr}</td>
                <td>{result.schum}</td>
                <td><Button disabled={disableFlag} onClick={this.delDelivery}  data-id={result.id} className="mx-auto d-block"
                    variant="light"><i style={{fontSize:"20px",color:"green"}}
                    className="fa fa-trash" ></i>
                </Button></td>
                <td><Button disabled={disableFlag} onClick={this.openModal} action_='edit' data-id={result.id} className="mx-auto d-block"
                    variant="light"><i style={{fontSize:"20px",color:"blue"}}
                    className="fa fa-edit" ></i>
                </Button></td>
                {/* <td><Button href={mishloach} target="_blank"><img src={mishloach} 
                style={{height:"20px",width:"20px"}}/></Button></td> */}
                <td><Button variant="light" className="mx-auto d-block" data-id={result.id} onClick={this.openImage}><i style={{fontSize:"20px",color:"purple"}}
                    className="fa fa-file" ></i>
                </Button></td>
            </tr>);
        
        return (
            <div>
                <h2 className="m-5">הזמנות - רכש</h2>                
                {jsxSpinner}
                <Button variant="secondary fa fa-plus " sm={2} action_='add' onClick={this.openModal}></Button>
                <div responsive>
                <Table id="tblDelivery" className="m-5" striped bordered hover  >
                    {tblHeader}                
                    <tbody>
                    {jsxDeliveries}
                    </tbody>
                </Table>
                </div>
                {/* המסך המודלי */}
                <Modal show={this.state.showModal} onHide={this.closeModal} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>הזמנה חדשה </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Form.Label column sm={2}>
                                    מספר הזמנה
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control onChange={this.readInput} data-id="identity_no" 
                                    type="text" placeholder="הקלד מס' הזמנה" value={this.state.currDelivery.identity_no}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalPassword">
                                <Form.Label column sm={2}>
                                    תאריך הגעת המשלוח
                                </Form.Label>
                                <Col sm={10}>                                
                                    <Form.Control value={this.state.currDelivery.suppliedAt} onChange={this.readInput} data-id="suppliedAt" type="date"  />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalPassword">
                                <Form.Label column sm={2}>
                                    סכום
                                </Form.Label>
                                <Col sm={6}>
                                    {/* <NumericInput className="form-control" style={ false } onChange={this.readInput} data_id="schum"/>                                     */}
                                    <Form.Control value={this.state.currDelivery.schum} onChange={this.readInput} data-id="schum" type="number"/>                                    
                                </Col>
                                
                            </Form.Group>
                            <Form.Group as={Row} controlId="formHorizontalPassword">
                                <Form.Label column sm={2}>
                                    פרטי ההזמנה
                                </Form.Label>
                                <Col sm={6}>
                                <Form.Control value={this.state.currDelivery.content_descr} onChange={this.readInput} data-id="content_descr" type="text" placeholder="הזן מוצרי ההזמנה" />
                                </Col>
                                
                            </Form.Group>
                            <Form.Group as={Row} controlId="formHorizontalPassword">
                                <Form.Label column sm={2}>
                                    תעודת הזמנה
                                </Form.Label>
                                <Col sm={6}>
                                    <Form.Control type="file" placeholder="תעודת משלוח" accept="image/*" onChange={this.imgChange} />
                                </Col>
                                <Col sm={4}>
                                    <Image src={this.state.currDelivery.newDeliveryImg ['URL']} fluid />
                                </Col>
                            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                            סגור
                        </Button>
                        <Button variant="primary" onClick={this.state.action=='add'?this.createDelivery:this.updateDelivery}>
                            שמור
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
    }
    export default Delivery;