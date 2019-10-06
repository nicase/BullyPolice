const id = require('mongoose').Types.ObjectId;

const profiles = require('./profiles');

module.exports = [
  {
    _id: id(),
    platform: "rd",
	  language: "es",
	  user: profiles[0]._id,
    data: "A diferencia de Benjamin Button el nunca ha sido guapo",
    index: 0.5,
    link: "http://www.google.es"
  },
  {
    _id: id(),
    platform: "tw",
	  language: "es",
	  user: profiles[1]._id,
    data: "@Nicase99 tiene razon, pareces benjamin button pero en vez de hacerte viejo te haces feo",
    index: 0.8,
    link: "http://www.google.es"
  },
  {
    _id: id(),
    platform: "rd",
	  language: "es",
	  user: profiles[0]._id,
    data: "Me cago en tus putos muertos @MarcAT eres super feo y tocas la guitarra que da pena, pero no tanto como tu vida miserable hijo de puta",
    index: 0.99,
    link: "http://www.google.es"
  },
];
