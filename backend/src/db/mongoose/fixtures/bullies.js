const id = require('mongoose').Types.ObjectId;

const profiles = require('./profiles');

module.exports = [
  {
    _id: id(),
    platform: "rd",
	  language: "es",
	  user: profiles[0].id_,
	  data: "A diferencia de Benjamin Button el nunca ha sido guapo"
  },
  {
    _id: id(),
    platform: "tw",
	  language: "es",
	  user: profiles[1].id_,
	  data: "@Nicase99 tiene razon, pareces benjamin button pero en vez de hacerte viejo te haces feo"
  },
  {
    _id: id(),
    platform: "rd",
	  language: "es",
	  user: profiles[0].id_,
	  data: "Me cago en tus putos muertos @MarcAT eres super feo y tocas la guitarra que da pena, pero no tanto como tu vida miserable hijo de puta"
  },
];
