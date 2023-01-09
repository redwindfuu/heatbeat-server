const e = require("express");

const HEALTH_ASSERT = ["good", "normal", "normal", "bad", "bad"];

const calHealth = (dataList, user) => {
  const { isPlaySport, Gender, whereLive, birth } = user;
  // get Age form birth user
  const currentYear = new Date().getFullYear();
  const Age = currentYear - birth.getFullYear();
  let conditions = [
    {
      title: "isPlaySport",
      value: isPlaySport,
    },
    {
      title: "Gender",
      value: Gender ? "male" : "female",
    },
    {
      title: "Age",
      value: Age,
    },
    {
      title: "whereLive",
      value: whereLive,
    },
  ];
  let message = [];
  conditions.forEach((condition) => {
    if (!checkHealth(dataList, condition)) {
      message.push(
        "your heart rate is not normal compared to your " + condition.title
      );
    }
  });
  const data = {
    message: message,
    evaluate: HEALTH_ASSERT[message.length],
  };
  return data;
};

const checkHealth = (dataList, condition) => {
  let result = 0;
  let count = 0;
  switch (condition.title) {
    case "isPlaySport":
      // count heartbeat between 50 and 120
      if (condition.value) {
        dataList.forEach((item, index) => {
          if (item.beat >= 50 && item.beat <= 120) {
            count += 1;
          }
        });
        result = (count / dataList.length) * 100;
        if (result > 70) {
          return true;
        }
        return false;
      }
      break;
    case "Gender":
      /**
       * Kích cỡ trái tim của nữ giới nhỏ 2/3 lần so với trái tim nam giới.
       * Trọng lượng trung bình trái tim của nữ giới nặng khoảng 120g trong khi trái tim của nam giới nặng tới 180g.
       *  Chính vì thế, trái tim nữ giới được chứng minh đập nhanh hơn trái tim nam giới.
       * Trung bình trái tim nam giới chỉ đập 70 – 72 nhịp/phút nhưng trái tim nữ giới trưởng thành đập 78 – 82 nhịp/phút.
       * Tuy nhiên, sự khác biệt này không ảnh hưởng đến sức khỏe tim mạch tổng thể của cả nam giới và nữ giới.
       */
      if ((condition.value = "male")) {
        dataList.forEach((item, index) => {
          if (item.beat >= 70 && item.beat <= 75) {
            count += 1;
          }
        });
        result = (count / dataList.length) * 100;
        if (result > 70) {
          return true;
        }
        return false;
      } else {
        dataList.forEach((item, index) => {
          if (item.beat >= 78 && item.beat <= 82) {
            count += 1;
          }
        });
        result = (count / dataList.length) * 100;
        if (result > 70) {
          return true;
        }
        return false;
      }
      break;
    case "Age":
      if (condition.value >= 0 && condition.value <= 12) {
        dataList.forEach((item, index) => {
          if (item.beat >= 80 && item.beat <= 140) {
            count += 1;
          }
        });
        result = (count / dataList.length) * 100;
        if (result > 70) {
          return true;
        }
      } else if (condition.value >= 13 && condition.value <= 55) {
        dataList.forEach((item, index) => {
          if (item.beat >= 60 && item.beat <= 110) {
            count += 1;
          }
        });
        result = (count / dataList.length) * 100;
        if (result > 70) {
          return true;
        }
      } else {
        dataList.forEach((item, index) => {
          if (item.beat >= 50 && item.beat <= 80) {
            count += 1;
          }
        });
        result = (count / dataList.length) * 100;
        if (result > 70) {
          return true;
        }
      }
      return false;
    case "whereLive":
      switch (condition.value) {
        case "Highland":
          dataList.forEach((item, index) => {
            if (item.beat >= 80 && item.beat <= 140) {
              count += 1;
            }
          });
          result = (count / dataList.length) * 100;
          if (result > 70) {
            return true;
          }
        case "Plateau":
          dataList.forEach((item, index) => {
            if (item.beat >= 80 && item.beat <= 140) {
              count += 1;
            }
          });
          result = (count / dataList.length) * 100;
          if (result > 70) {
            return true;
          }
        case "Delta":
          dataList.forEach((item, index) => {
            if (item.beat >= 80 && item.beat <= 140) {
              count += 1;
            }
          });
          result = (count / dataList.length) * 100;
          if (result > 70) {
            return true;
          }
          return false;
        default:
          break;
      }
      break;
    default:
      break;
  }
  return true;
};

module.exports = {
  calHealth,
};
