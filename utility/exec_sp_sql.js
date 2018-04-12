var sql = require("mssql");
var dbConfig = require('./conexion_sql').dbConfig
//Procedimientos Almacenados
var Ejecutar_SP_SQL = function (res, store_procedure, param) {
    var dbConn = new sql.Connection(dbConfig);
    dbConn.connect(function (err) {
        if (err) {
            console.log("Error while connecting database :- " + err);
            return res.json({ respuesta: 'error' })
        }
        // creacion Request object
        var request = new sql.Request(dbConn);
        // parametros para procedimiento
        for (i = 0; i < param.length; i++) {
            request.input(param[i].nom_parametro, param[i].tipo_parametro || sql.NVarChar, param[i].valor_parametro)
        }

        request.execute(store_procedure, function (err, result) {
            dbConn.close()
            if (err) {
                console.log("Error while querying database :- " + err);
                return res.json({ respuesta: 'error',detalle_error:err })
            }
            data = result[0]
            res.json({ respuesta: 'ok', data })
        });

    });
}

module.exports = { Ejecutar_SP_SQL }