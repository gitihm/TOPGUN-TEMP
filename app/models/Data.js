const mongoose = require("mongoose");
const { Schema } = mongoose;
const subDataSchema = new Schema({
    Pressure : String,
    Temperature :String,
    Humidity:String,
  
    
  });
const dataSchema = new Schema({
  Time: String,
  Latitude : String,
  Longitude : String,
  Alittude :String,
  BatteryLevel : String,
  Date:String,
  Other : subDataSchema,
});

mongoose.model("data", dataSchema);
