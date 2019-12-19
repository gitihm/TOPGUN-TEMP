const mongoose = require("mongoose");
const { Schema } = mongoose;

const sensorSchema = new Schema({
  Time: String,
  DevEUI: String,
  DevAddr: String,
  FPort: String,
  FCntUp: String,
  ADRbit: String,
  MType: String,
  FCntDn: String,
  payload_hex: String,
  mic_hex: String,
  Lrcid: String,
  LrrRSSI: String,
  LrrSNR: String,
  SpFact: String,
  SubBand: String,
  Channel: String,
  DevLrrCnt: String,
  Lrrid: String,
  Late: String,
  LrrLAT: String,
  LrrLON: String,
  Lrrs: String,
  CustomerID: String,
  CustomerData: String,
  ModelCfg: String,
  InstantPER: String,
  MeanPER: String
});

mongoose.model("sensors", sensorSchema);
