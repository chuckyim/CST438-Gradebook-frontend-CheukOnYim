import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import Button from '@mui/material/Button';
import {DataGrid} from '@mui/x-data-grid';
import {SERVER_URL} from '../constants.js'

class AddAssignment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            assignmentName: '',
            dueDate: '',
            courseId: ''
        };
    }

    submitHandler = (e) => {
        e.preventDefault();
        const token = Cookies.get('XSRF-TOKEN');

        const requestOptions = {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': token
            },
          body: JSON.stringify({
                                "assignmentName":this.state.assignmentName,
                                "dueDate":this.state.dueDate,
                                "courseId":this.state.courseId
                              })
        };
      
        fetch(`${SERVER_URL}/assignment`, requestOptions)
        .then(res => {
        if (res.ok) {
          toast.success("A new Assignment has been added", {
              position: toast.POSITION.TOP_RIGHT
          });
          console.log("A new Assignment has been added");
        } else {
          toast.error("Error, course not added", {
              position: toast.POSITION.BOTTOM_LEFT
          });
          console.error('Error Status =' + res.status);
        }})
      .catch(err => {
        toast.error("Error, course not added", {
              position: toast.POSITION.BOTTOM_LEFT
        });
        console.error(err);
      })
      }

    render() {
        
         return (
            <div>
              <div className="App">
              <h2>New Assignment </h2>
                <form onSubmit={this.submitHandler}>
                    <p>Enter an Assignment Name</p>
                    <input type="text" name='assignmentName' onChange={ (e)=> this.setState({assignmentName: e.target.value}) }/>
                    <p>Enter a due Date</p>
                    <input type="date" name='dueDate' onChange={(e)=> this.setState({dueDate: e.target.value})}  />
                    <p>Enter a Course ID</p>
                    <input type="number" name='courseID' onChange={(e)=> this.setState({courseId: e.target.value})}/>
                    <input type="submit" name="submit"/>
                </form>
              <ToastContainer autoClose={1500} /> 
              </div>
            </div>
             
         )
     }
    
 }
export default AddAssignment;