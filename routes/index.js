const express = require("express"); 
const router = express.Router(); 
const userRoutes = require("./userRoutes"); 
const courseRoutes = require("./courseRoutes"); 
const subscriberRoutes = require("./subscriberRoutes"); 
const apiRoutes = require("./apiRoutes");
 const homeRoutes = require("./homeRoutes");
 const errorRoutes = require("./errorRoutes"); 


router.use("/users", userRoutes); 
router.use("/courses", courseRoutes); 
router.use("/subscribers", subscriberRoutes); 
router.use("/api", apiRoutes);
router.use("/", homeRoutes); 
router.use("/", errorRoutes); 

 
module.exports = router; 
