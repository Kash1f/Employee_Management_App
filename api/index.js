const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

app.listen(port, () => {
  console.log("Server is running on port 8000");
});

const Employee = require("./models/employee");
const Attendance = require("./models/attendance");

//Endpoint to register Employees

app.post("/addEmployee", async (req, res) => {
  try {
    //these are the required details to create the employees in backend
    const {
      employeeName,
      employeeId,
      designation,
      phoneNumber,
      dateOfBirth,
      joiningDate,
      activeEmployee,
      salary,
      address,
    } = req.body;

    //after getting all the details, creating a new employee

    const newEmployee = new Employee({
      employeeName,
      employeeId,
      designation,
      phoneNumber,
      dateOfBirth,
      joiningDate,
      activeEmployee,
      salary,
      address,
    });

    //saving employee to the database

    await newEmployee.save();

    res.status(201).json({ message: "Employee saved successfully", employee: newEmployee });

  } catch (error) {
    console.log("Error creating Employee", error);
    res.status(500).json({ message: "Employee could not be added" });
  }
});

//Endpoint to fetch all the employees
app.get("/employees", async(req,res)=>{
  try{
    //using find method we will send all of the employees to the res
     
    //we will send the employees in the res, no specific condition, we will get all the employees stored in backend
    //this endpoint will give us the list of employees that is present in backend

    const employees = await Employee.find();
    res.status(200).json(employees)
                                          

  } catch(error){
    res.status(500).json({message : "Employees could not be retrieved"})
  }
})