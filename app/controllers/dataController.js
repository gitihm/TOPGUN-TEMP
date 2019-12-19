const mongoose = require("mongoose");
const Sensor = mongoose.model("sensors");
const Data = mongoose.model("data");
const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

exports.updateData = async (req, res, next) => {
  while(1){
    const loraData = await getlist();
    const mainData = await getData();
    // console.log("loraData " + loraData.length);
    // console.log("mainData " + mainData.length);
    if (!checkNewData(loraData, mainData)) sleep(5000);
    let d = await validate(loraData);
    let sizeUnupload = (loraData.length-(loraData.length-mainData.length)) - 1
    if(sizeUnupload==-1) sizeUnupload =0
    await saveData(d,sizeUnupload)
  }
  
};
exports.getdata = async (req, res, next) => {
 
    const NowData = await getData();
    return res.json(NowData);
  
};
checkNewData = async (loraData, mainData) => {
  if (loraData.length > mainData.length) return true;
  return false;
};
saveData = async (d,index) => {
  for(let i=index ; i < d.length ; i++){
    console.log("HAVE NEW DATA");
    await new Data({
      Time: d[i].Time,
      Latitude: d[i].Latitude,
      Longitude: d[i].Longitude,
      Alittude: d[i].Alittude,
      BatteryLevel: d[i].BatteryLevel,
      Date: d[i].Date,
      Other: {
        Pressure: d[i].Other.Pressure,
        Temperature: d[i].Other.Temperature,
        Humidity: d[i].Other.Humidity
      }
    }).save();
  }
};
validate = async d => {
  var newList = [];
  d.forEach(async _ => {
    let tmplist = {};
    if (_.payload_hex && _.payload_hex.split("").length == 32) {
      let __ = await setFormData(_.payload_hex);
      tmplist.Date = _.Time.split("T")[0];
      tmplist.Time = _.Time.split("T")[1]
        .split("+")[0]
        .split(".")[0];
      tmplist.Latitude = __.latitude;
      tmplist.Longitude = __.longitude;
      tmplist.Alittude = __.alittude;
      tmplist.BatteryLevel = __.batteryLevel;
      tmplist.Other = {
        Pressure: __.pressure,
        Temperature: __.temperature,
        Humidity: __.humidity
      };
      newList.push(tmplist);
    }
  });
  return newList;
};
setFormData = async payload => {
  let arr = payload.match(/..?/g);
  let appLedStateOn = parseInt("0x" + arr[0], 16);
  let pressure =
    ((parseInt("0x" + arr[1], 16) * 256 + parseInt("0x" + arr[2], 16)) * 10) /
    100;
  let temperature =
    (parseInt("0x" + arr[3], 16) * 256 + parseInt("0x" + arr[4], 16)) / 100;
  let humidity =
    (parseInt("0x" + arr[5], 16) * 256 + parseInt("0x" + arr[6], 16)) / 100;
  let batteryLevel = (parseInt("0x" + arr[7], 16) * 100) / 254;
  let latitude =
    (parseInt("0x" + arr[8], 16) * 65536 +
      parseInt("0x" + arr[9], 16) * 256 +
      parseInt("0x" + arr[10], 16)) /
    100000;
  let longitude =
    (parseInt("0x" + arr[11], 16) * 65536 +
      parseInt("0x" + arr[12], 16) * 256 +
      parseInt("0x" + arr[13], 16)) /
    100000;
  let alittude =
    parseInt("0x" + arr[14], 16) * 256 + parseInt("0x" + arr[15], 16);

  return {
    appLedStateOn,
    pressure,
    temperature,
    humidity,
    batteryLevel,
    latitude,
    longitude,
    alittude
  };
};
getlist = async () => {
  return await Sensor.find();
};
getData = async () => {
  return await Data.find();
};
