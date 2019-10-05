const id = require('mongoose').Types.ObjectId;

module.exports = [
  {
    _id: id(),
    platform: "rd",
	  name: "Pau Escofet",
	  link: "http://pauescofet.com"
  },
  {
    _id: id(),
    platform: "tw",
	  name: "Nicolas Camerlynck",
	  link: "http://nicase.com"
  },
];
