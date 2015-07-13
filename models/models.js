var path = require('path');

// Cargar modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite
var sequelize = new Sequelize(null, null, null, {dialect: "sqlite", storage: "quiz.sqlite"});

// Importar la definición de la tabla Quiz de quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz; // Exportar la definición de la tabla Quiz

// Crea e inicializa la tabla de preguntas en DB
/*sequelize.sync().success(
	function() {
		Quiz.count().success(
			function() {
				if (count === 0) {
					Quiz.create({pregunta: 'Capital de Italia', respuesta: 'Roma'}).success(function(){console.log('Base de datos inicializada')});
				};
			});
	}
);*/

// Crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function() {
  // success(..) ejecuta el manejador una vez creada la tabla
  Quiz.count().then(function (count){
    if(count === 0) {   // la tabla se inicializa solo si está vacía
      Quiz.create({ pregunta: 'Capital de Italia',
                   respuesta: 'Roma'
                })
      .then(function(){console.log('Base de datos inicializada')});
    };
  });
});
