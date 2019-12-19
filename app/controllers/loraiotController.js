const mongoose = require("mongoose");
const Sensor = mongoose.model("sensors");

exports.list = async (req, res, next) => {
  try {
    Sensor.find()
      .sort({ Time: 1 })
      .limit(200)
      .exec(function(err, data) {
        if (err) {
          const result = {
            error: true,
            error_msg: err.message
          };
          return res.status(500).json(result);
        }
        return res.json(data);
      });
  } catch (err) {
    console.log(err);
    const result = {
      error: true,
      error_msg: err.message
    };
    return res.status(500).json(result);
  }
};

exports.store = async (req, res, next) => {
  try {
    const data = req.body.DevEUI_uplink;

    if (!data) {
      return res.send("0");
    }

    const result = await new Sensor({
      Time: data.Time,
      DevEUI: data.DevEUI,
      DevAddr: data.DevAddr,
      FPort: data.FPort,
      FCntUp: data.FCntUp,
      ADRbit: data.ADRbit,
      MType: data.MType,
      FCntDn: data.FCntDn,
      payload_hex: data.payload_hex,
      mic_hex: data.mic_hex,
      Lrcid: data.Lrcid,
      LrrRSSI: data.LrrRSSI,
      LrrSNR: data.LrrSNR,
      SpFact: data.SpFact,
      SubBand: data.SubBand,
      Channel: data.Channel,
      DevLrrCnt: data.DevLrrCnt,
      Lrrid: data.Lrrid,
      Late: data.Late,
      LrrLAT: data.LrrLAT,
      LrrLON: data.LrrLON,
      Lrrs: JSON.stringify(data.Lrrs),
      CustomerID: data.CustomerID,
      CustomerData: JSON.stringify(data.CustomerData),
      ModelCfg: data.ModelCfg,
      InstantPER: data.InstantPER,
      MeanPER: data.MeanPER
    }).save();

    return res.send("1");
  } catch (err) {
    console.log(err);
    const result = {
      error: true,
      error_msg: err.message
    };
    return res.status(500).json(result);
  }
};
