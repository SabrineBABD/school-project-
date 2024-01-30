// import express module
const express = require('express')
// import bodyParser module
const bodyParser = require('body-parser')
// import mongoose module
const mongoose = require('mongoose');
// import bcrypt module
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

mongoose.connect(('mongodb://127.0.0.1:27017/SchoolDataBase'), { useNewUrlParser: true, useUnifiedTopology: true });
const User = require("./models/users")
const Course = require("./models/courses")
const AssignStudent = require("./models/assignstudents")
const Result = require("./models/results")

// creation app express
const app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/jsoneee
app.use(bodyParser.json())
app.use('/images', express.static(path.join('backend/images')))
app.use('/files', express.static(path.join('backend/files')))
// Security configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
});


const secretKey = 'sabrine1997';
app.use(session({
    secret: secretKey,
}));

const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'cpdf/pdf': 'pdf',   
    'cv/pdf': 'pdf', 
}

      




const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            if (file.fieldname === 'image') {
                cb(null, 'backend/images');
            } else if (file.fieldname === 'cv') {
                cb(null, 'backend/files');
            } else {
                cb(new Error('Invalid fieldname'), null);
            }
        },
        filename: (req, file, cb) => {
            const name = file.originalname.toLowerCase().split(' ').join('-');
            const extension = file.fieldname === 'image' ? MIME_TYPE[file.mimetype] : MIME_TYPE[file.mimetype];
            const fileName = name + '-' + Date.now() + '-' + file.fieldname + '-' + '.' + extension;
            cb(null, fileName);
        }
    })
});






app.post('/api/signup/:role',upload.fields([{ name: 'image', maxCount: 1 }, { name: 'cv', maxCount: 1 }]), (req, res) => {
    console.log("hiiii");
    console.log("req body",req.body);
    bcrypt.hash(req.body.password, 10, (err, hashPwd) => {
        console.log("hashPwd", hashPwd);
    
        let url = req.protocol + '://' + req.get('host');
        const imageUrl = req.files && req.files['image'] ? url + '/images/' + req.files['image'][0].filename : null;
        const fileUrl = req.files && req.files['cv'] ? url + '/files/' + req.files['cv'][0].filename : null;
    const user=new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:hashPwd,
        address:req.body.address,
        tel:req.body.tel,
        speciality:req.body.speciality,
        childTel:req.body.childTel,
        role:req.body.role,
        status:req.body.status,
        image: imageUrl,
        cv: fileUrl,
    })
    user.save((err, docs) => {
        if (err) {
            console.log(err);
            if(err.errors.email)
            res.json({ message: "email used!" })
        } else{
              console.log('here docs',docs);
            res.json({message:"user added"})
         
        }
    }) 

})
})

   // if(user.role==='Student'){
    //     finededCourse.students.push(docs._id)
    //             Course.updateOne({ _id: req.body.courseId }, finededCourse).then(() => {
    //                 res.status(201).json({ message: "student added" })
    //             })
    // }


app.post('/api/login', (req, res) => {
    let user;
    User.findOne({ email: req.body.email }).then((findedUser) => {
        user = findedUser
        if (!findedUser) {
            res.json({ message: "0" })
        } else if (!findedUser.status) {
            res.json({ message: "3" }) 
        }else {
        return bcrypt.compare(req.body.password, findedUser.password)
        }
     })
        .then((correctPwd) => {
            console.log("user",user);
            if (!correctPwd) {
                res.json({ message: "1" })
            } else {
                let finalUser = {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                }
                console.log(finalUser);
                const token = jwt.sign(finalUser, secretKey, {
                    expiresIn:
                        '1h'
                });
                res.json({ message: "2",user:token})
            }
        })
   
})




const storage = multer.diskStorage({
    destination: (req, file, cb) => {
       
        const isFileValid = MIME_TYPE[file.mimetype];
        let error = new Error("File type is invalid");
        if (isFileValid) {
            error = null
        }
      cb(null,'backend/files'); // Specify the directory where files will be stored
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension =path.extname(name);;
        const fileName = name + '-' + Date.now() + '-course-'+extension;
      cb(null,fileName); // Use the original file name
    }
  });


 

//Trait Logi Get All Users
app.get('/users', (req, res) => {
    User.find().then((docs) => {
        res.json({ data: docs })
    })
})


app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;

    // First, find the user to get their information before deletion
    User.findById(userId).then((user) => {
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the courses that have this user in the 'students' array
        Course.updateMany({ students: userId }, { $pull: { students: userId } }, (err) => {
            if (err) return res.status(500).json({ message: "Error updating courses" });

            // Remove assignments for the user
            AssignStudent.deleteMany({ studentId: userId }, (err) => {
                if (err) return res.status(500).json({ message: "Error deleting assignments" });

                // Remove results related to the user
                Result.deleteMany({ studentId: userId }, (err) => {
                    if (err) return res.status(500).json({ message: "Error deleting results" });

                    // After removing related information, delete the user
                    User.deleteOne({ _id: userId }).then(() => {
                        res.json({ message: "User and related information deleted" });
                    }).catch((err) => {
                        res.status(500).json({ message: "Error deleting user" });
                    });
                });
            });
        });
    }).catch((err) => {
        res.status(500).json({ message: "Error finding user" });
    });
});


app.put('/users/:id/status', (req, res) => {
    User.updateOne({ _id: req.params.id }, req.body).then(() => {
        res.json({ message: "Teacher updated" })
    })
})


app.post("/courses/assign", (req, res) => {
    const { studentId, teacherId, courseId } = req.body;

    // Check if the assignment already exists for the specific student, teacher, and course
    AssignStudent.findOne({ studentId, teacherId, courseId })
        .then(existingAssignment => {
            if (existingAssignment) {
                // Assignment already exists, return an error or appropriate response
                return res.status(400).json({ message: "Student already assigned to this course with this teacher." });
            }
            // Create a new assignment if it doesn't exist
            const assignmentData = new AssignStudent({ studentId, teacherId, courseId });
            return assignmentData.save();
        })
        .then(() => {
            Course.findOneAndUpdate(
                { _id: courseId },
                { $push: { students: studentId } },
                { new: true },
                (err, updatedCourse) => {
                    if (err) {
                        console.error(err);
                        res.status(500).json({ message: "Error updating course." });
                    } else {
                        res.status(200).json({ message: "Student assigned successfully." });
                    }
                }
            );
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: "Internal server error." });
        });
})

app.get("/courses/:id", (req, res) => {
    Course.findOne({ _id: req.params.id }).then((docs) => {
        res.json({ data: docs })
    })
})

//Trait Logi Get  Update By Id
app.put('/courses/:id', multer({ storage: storage }).single('cpdf'), (req, res) => {
    const courseId = req.params.id;

    Course.findById(courseId).then((existingCourse) => {
        if (!existingCourse) {
            return res.status(404).json({ message: "Course not found" });
        }

        // If a new file is provided, update the cpdf field in the database
        if (req.file) {
            const url = req.protocol + '://' + req.get('host');
            const courseUrl = url + '/courses/download/' + req.file.filename;
            existingCourse.cpdf = courseUrl;
        }

        // Update other fields if needed
        existingCourse.speciality = req.body.speciality;
        existingCourse.name = req.body.name;
        existingCourse.desc = req.body.desc;
        existingCourse.teacherId = req.body.teacherId;
        
        existingCourse.save().then(() => {
            res.json({ message: "Course updated successfully" });
        }).catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
        });
    }).catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    });
});
app.get("/courses/assign/:id", (req, res) => {
    const id = req.params.courseId;
    AssignStudent.find({id}).populate("studentId").then((docs) => {
        res.json({ data: docs })
    
    })
})

app.get("/courses/assigned-courses/:studentId", (req, res) => {
    const studentId = req.params.studentId;
    AssignStudent.find({studentId}).populate('courseId teacherId').then((docs) => {
        res.json({ data: docs })
    })
 })




 

app.post("/courses", multer({ storage: storage }).single('cpdf'), (req, res) => {
               
                let url = req.protocol + '://' + req.get('host');
                let courseUrl = url + '/courses/download/' + req.file.filename
                const course = new Course ({
                    speciality: req.body.speciality,
                    name: req.body.name,
                    teacherId:req.body.teacherId,
                    desc: req.body.desc,
                    cpdf: courseUrl,
                })
                course.save((err, docs) => {
                    if (err) {
                        console.log(err);

                    } else {
                        console.log('here docs',docs);
                         res.status(201).json({ message: "course added" })
                    }

                })

            })
  
  app.get("/courses/download/:filename", (req, res) => {
    const file = `${__dirname}/files/${req.params.filename}`;
    res.download(file); // Set appropriate headers for download
 });

   
 app.get("/download/:filename", (req, res) => {
    const file = `${__dirname}/files/${req.params.filename}`;
    res.download(file); // Set appropriate headers for download
 });

//Trait Logi Get AllCourses
app.get("/courses", (req, res) => {
    Course.find().populate('teacherId students').then((docs) => {
        res.json({ data: docs })
    
    })
})

app.post("/results", (req, res) => {
    const result= new Result ({
        courseId: req.body.courseId,
        studentId: req.body.studentId,
        note:req.body.note,
        evaluation: req.body.evaluation,
    })
    result.save((err, docs) => {
        if (err) {
            console.log(err);

        } else {
            console.log('here docs',docs);
             res.status(201).json({ message: "result added" })
        }    
    })
    })

    app.get("/results", (req, res) => {
        Result.find().populate('studentId courseId').then((docs) => {
            res.json({ data: docs })
        
        })
    })

    app.delete('/courses/:id', (req, res) => {
        const courseId = req.params.id;

        AssignStudent.deleteMany({ courseId: courseId }, (err) => {
            if (err) return res.status(500).json({ message: "Error deleting assignments" });
        })
            // Remove results related to the user
            Result.deleteMany({ courseId: courseId }, (err) => {
                if (err) return res.status(500).json({ message: "Error deleting results" });
            })
        Course.findByIdAndDelete(courseId, (err, deletedCourse) => {
            if (err) {
                return res.status(500).json({ message: 'Internal server error' });
            }
    
            if (!deletedCourse) {
                return res.status(404).json({ message: 'Course not found' });
            }
    
            res.json({ message: 'Course deleted successfully' });
        });
    });
    
    app.delete('/courses/:courseId/:studentId', async (req, res) => {
        const courseId = req.params.courseId;
        const studentId = req.params.studentId;
    
        try {
            // Remove results related to the student in the specified course
            await Result.deleteMany({ studentId: studentId, courseId: courseId });
    
            // Remove the student from the course
            const course = await Course.findByIdAndUpdate(courseId, { $pull: { students: studentId } });
          
            if (!course) {
                return res.status(404).json({ message: 'Course not found' });
            }
    
            res.json({ message: 'Student deleted successfully from the course' });
       
            AssignStudent.deleteOne(({ studentId: studentId, courseId: courseId }), (err) => {
                if (err) return res.status(500).json({ message: "Error deleting assignments" });
            })
            } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    });

    app.delete('/results/:resultId',(req, res) => {
     
          Result.deleteOne({_id : req.params.resultId}).then(() => {
      
          res.json({ message: 'Result deleted successfully' });
        });
      });

    app.post("/teachers/filter", (req, res) => {
        User.find({ speciality: req.body.speciality , role: "Teacher"})
          .then((foundTeachers) => {
            res.json({ teachers: foundTeachers });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({ message: 'Internal server error.' });
          });
      });

      app.post("/students/filter", (req, res) => {
        const filter = {
            role: "Student"
          };
          
          if (req.body.tel) {
            filter.tel = req.body.tel;
          }
          
          if (req.body.firstName) {
            filter.firstName = new RegExp(req.body.firstName, 'i');
          }
          
          if (req.body.lastName) {
            filter.lastName = new RegExp(req.body.lastName, 'i');
          }
    
        User.find(filter)
          .then((foundStudents) => {
            res.json({ students: foundStudents });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({ message: 'Internal server error.' });
          });
      });
     

      app.get("/results/:id", (req, res) => {
        Result.findOne({ _id: req.params.id }).then((docs) => {
            res.json({ data: docs })
        })
    })
      app.put('/results/:id', (req, res) => {
        Result.updateOne({ _id: req.params.id }, req.body).then(() => {
            res.json({ message: "result updated" })
        })
    });



// make app exportable
module.exports = app