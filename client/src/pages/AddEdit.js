import React, {useState, useEffect} from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import "./AddEdit.css";
import axios from 'axios';
import { toast } from 'react-toastify';

//defining intial state of data variables
const initialState = {
    name:'',
    address:''
};

//edit function start
const AddEdit = () => {
    const [state, setState] = useState(initialState);
    const {name, address} = state;
    const history = useHistory();

    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`)
        .then((resp) => setState({...resp.data[0]}));
    }, [id]);


    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || !address){
            toast.error("please provide value");
        }
        else{
            if(!id){
                axios.post("http://localhost:5000/api/post", {
                    name,
                    address
                }).then(() => {
                    setState({name:"", address:""})
                }).catch((err) => toast.error(err.response.data));
                toast.success("data added successfully");
            }
            else{
                axios.put(`http://localhost:5000/api/update/${id}`, {
                name,
                address
            }).then(() => {
                setState({name:"", address:""})
            }).catch((err) => toast.error(err.response.data));
            toast.success("data updated successfully");
            }
            setTimeout(() => 
                history.push("/"), 500);
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({ ...state, [name]: value});
    };
    return(
        <div style={{marginTop:"100px"}}>
            <form style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center"
            }}
            onSubmit={handleSubmit}
            >
                <label htmlFor='name'>Name</label>
                <input 
                type="text"
                id='name'
                name='name'
                placeholder='Your address ...'
                value={name || ""}
                onChange={handleInputChange}
                />
                <label htmlFor='address'>Address</label>
                <input 
                type="address"
                id='address'
                name='address'
                placeholder='Your address ...'
                value={address || ""}
                onChange={handleInputChange}
                />
                <input type='submit' value={id? "Update" : "Save"} />
                <Link to='/'>
                <input type='button' value='Go Back' />
                </Link>
            </form>
        </div>
    )
}

export default AddEdit;