import React,{Component} from 'react'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import axios from '../../../axios-orders'

import classes from './ContactData.css'
class ContactData extends Component{
    state={
        orderform:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            zipcode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'ZIP CODE'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touched:false
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your E-mail'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'cheapest',displayValue:'Cheapest'}
                    ]
                },
                value:'fastest',
                validation:{},
                valid:true
            }
        },
        formIsValid:false,
        loading:false
    }

    checkValidity(value, rules){
        let isValid=true;
        if(rules.required){
            isValid=value.trim() !== '' && isValid; //trim - removes any whitespaces
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    orderHandler =(event) => {
        event.preventDefault();  //TO PREVENT THE DEFAULT ACTION OF SENDING A REQUEST AND RELOADING THE PAGE
        this.setState({
            loading:true
        });
        const orderData={};
        for(let formid in this.state.orderform){
            orderData[formid]=this.state.orderform[formid].value;
        }
        const order={
            ingredients:this.props.ingredients,
            price:this.props.totalPrice,
            orderData:orderData
        }
        axios.post('/orders.json', order)
        .then(response=>{
            this.setState({
                loading:false
            });
            this.props.history.push('/');
        })
        .catch(err=>{
            this.setState({
                loading:false
            });
            console.log(err);
        });
    }

    inputChangeHandler = (event,formid) => {
        const orderform2={...this.state.orderform};
        const form2= {...orderform2[formid]};
        form2.value=event.target.value;
        form2.valid=this.checkValidity(form2.value,form2.validation)
        form2.touched=true;
        orderform2[formid]=form2;

        let formIsValid=true;
        for(let formid in orderform2){
            formIsValid=orderform2[formid].valid && formIsValid;
        }

        this.setState({
            orderform:orderform2,
            formIsValid:formIsValid
        });
    }

    render() {
        let formElementsArray=[];
        for (let key in this.state.orderform){
            formElementsArray.push({
                id:key,
                config:this.state.orderform[key]
            })
        }
        let form=(<form onSubmit={this.orderHandler}>
            {formElementsArray.map(formElement => (
                <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}
                shouldValidate={formElement.config.validation}
                changed={(event)=>this.inputChangeHandler(event,formElement.id)}/>
            ))}
            <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
        </form>);
        if(this.state.loading){
            form = <Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data : </h4>
                {form}
            </div>
        );
    }
}

export default ContactData;