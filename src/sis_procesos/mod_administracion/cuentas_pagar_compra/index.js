var empty = require('empty-element');
var yo = require('yo-yo');
import { URL } from '../../../constantes_entorno/constantes'
import { NuevoCliente, BuscarCliente , AbrirModalObs , BuscarProducto } from '../../modales'
import { AsignarSeriesModal } from '../../modales/series'
import { BuscarCuentasPendientes } from '../../modales/cuentas'
import { ConvertirCadena } from '../../../../utility/tools'

var listaFormaPago = []
var obs_xml = null
var aSaldo = 0
var contador = 0
var contadorPercepcion = 0
var idFilaSeleccionadaSerie = 0

function VerCuentas(variables,fecha_actual,CodLibro) {
    global.objCliente = ''
    global.objProducto = ''
    global.arraySeries = ''
    contador = 0
    contadorPercepcion = 0
    var el = yo`
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                <h4 class="modal-title"><b>${CodLibro=='08'?'CUENTAS POR PAGAR':'CUENTAS POR COBRAR'}</b></h4>
            </div>
            <div class="modal-body" id="modal_form_ingreso">
                <div class="modal fade" id="modal_observaciones">
                    <div class="modal-dialog modal-sm" > 
                        <div class="modal-content" id="modal_obs_body"></div>
                    </div> 
                </div>
                <div class="row">
                    <div class="callout callout-danger hidden" id="modal_error_ingreso">
                        <p>Es necesario llenar todos los campos requeridos y el Importe mayor a cero</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-8">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h4> Cliente/Proveedor </h4>
                            </div>
                            <div class="panel-body">
                                <div class="row">
                                    <div class="col-md-4" id="divCodTipoDoc">
                                        <div class="form-group">
                                            <select id="Cod_TipoDoc" class="form-control input-sm">
                                                ${variables.dataDocumentos.map(e=>yo`<option style="text-transform:uppercase" value="${e.Cod_TipoDoc}">${e.Nom_TipoDoc}</option>`)}
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-8" id="divNroDocumento">
                                        <div class="input-fromr">
                                            <input type="text" id="Nro_Documento" onblur="${() => BuscarClienteDoc(CodLibro)}" class="form-control input-sm required">
                                        </div>
                                    </div>
                               
                                </div>
                                <div class="row">
                                    <div class="col-md-12" id="divCliente">
                                        <div class="form-group">
                                            <label> Señor(es) : </label>
                                            <input type="text" id="Cliente" class="form-control input-sm required" data-id=null>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12" id="divDireccion">
                                        <div class="form-group">
                                            <label> Direccion : </label>
                                            <input type="text" id="Direccion" class="form-control input-sm required">
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="box-footer">
                                
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="panel panel-default" style="pointer-events:none;">
                            <div class="panel-heading text-center">
                                <div class="row">
                                    <h4 class="box-title" id="Ruc_Empresa"><strong> R.U.C. ${variables.empresa.RUC}</strong></h4>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <select id="Cod_TipoComprobante" class="form-control selectPalerp">
                                                ${variables.dataComprobante.map(e=>yo`<option style="text-transform:uppercase" value="${e.Cod_TipoComprobante}">${e.Nom_TipoComprobante}</option>`)}
                                            </select>
                                        </div>
                                    </div>
                                </div> 
                                
                                <div class="row">
                                    <div class="col-md-5" id="divSerie">
                                        <div class="form-group">
 
                                            <select class="form-control input-sm" id="Serie">
                                                ${variables.dataComprobante.map(e=>yo`<option style="text-transform:uppercase" value="${e.Serie}">${e.Serie}</option>`)}
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-7" id="divNumero">
                                        <div class="form-group">
                                            <input type="text" class="form-control input-sm required" id="Numero" value="00000000${variables.dataMov[0].Numero}">
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="panel panel-default">
                            <div class="panel-body">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="col-sm-4" id="divContado">
                                                    <div class="radio">
                                                        <label>
                                                            <input type="radio" value="contado" id="optCredito" name="optCredito"  checked> Contado
                                                        </label>
                                                    </div>
                                                </div>
                                                 
                                                <div class="col-sm-8" id="divOperacion">
                                                    <label id="lbCuentaCajaBanco">#Operacion</label>
                                                    <div class="form-group">
                                                        <select class="form-control input-sm" id="Cod_CuentaBancaria" onchange=${()=>CambioCodCuentaBancaria(CodLibro)}> 
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-4" id="divFormasPago">
                                                <div class="form-group">
                                                    <select class="form-control input-sm" id="Cod_FormaPago" onchange="${()=>CambioFormasPago(CodLibro)}"> 
                                                        ${variables.dataFormasPago.map(e=>yo`<option style="text-transform:uppercase" value="${e.Cod_FormaPago}">${e.Nom_FormaPago}</option>`)}
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-8" id="divCuentaCajaBancos">
                                                <div class="form-group">
                                                    <select class="form-control input-sm" id="Cuenta_CajaBancos"> 
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="row">
                                            <div class="col-sm-4" id="divMoneda">
                                                <div class="form-group">
                                                    <b>Moneda: </b>
                                                    <select id="Cod_Moneda" class="form-control input-sm">
                                                        ${variables.dataMonedas.map(e=>yo`<option style="text-transform:uppercase" value="${e.Cod_Moneda}">${e.Nom_Moneda}</option>`)}
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-sm-3" id="divTC">
                                                <div class="form-group">
                                                    <b>T/C: </b>
                                                    <input class="form-control input-sm" type="number" id="Tipo_Cambio" value="1.00">
                                                </div>
                                            </div>
                                            <div class="col-sm-5" id="divFecha">
                                                <div class="form-group">
                                                    <b>Fecha: </b>
                                                    <input type="date" class="form-control input-sm" id="Fecha" value="${fecha_actual}">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-12" id="divPlantilla" style="display:none">
                                                <div class="form-group">
                                                    <b>Plantilla: </b>
                                                    <select id="Cod_Plantilla" id="" class="form-control input-sm">
                                                      
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-4 col-md-4">
                                        <div class="panel panel-default">
                                            <div class="panel-body">
                                                <div class="row">
                                                    <div class="col-md-8 col-sm-8">
                                                        <div class="checkbox">
                                                            <label> 
                                                                <input type="checkbox" id="optTodoFechas" checked onchange=${()=>CambioTodoFechas()}> Todo 
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-sm-4">
                                                        <button class="btn btn-info" type="button">Ver</button>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6 col-md-6">
                                                        <div class="form-group">
                                                            <b>Desde: </b>
                                                            <input type="date" id="FechaInicio" value="${fecha_actual}" class="form-control input-sm">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-md-6">
                                                        <div class="form-group">
                                                            <b>Hasta: </b>
                                                            <input type="date" id="FechaFin" value="${fecha_actual}" class="form-control input-sm">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-4 col-md-4">
                                        <div class="panel panel-default">
                                            <div class="panel-body">
                                                <div class="row">
                                                    <div class="col-md-8 col-sm-8">
                                                        <div class="checkbox">
                                                            <label> 
                                                                <input type="checkbox" id="optTodoVencimiento" checked onchange=${()=>CambioTodoVencimiento()}> Todo 
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-sm-4">
                                                        <button class="btn btn-info" type="button">Ver</button>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6 col-sm-6">
                                                        <div class="radio">
                                                            <label> 
                                                                <input type="radio" name="optRadios" id="optRadiosPorVencer" value="PorVencer"> Por vencer 
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-sm-6">
                                                        <div class="radio">
                                                            <label> 
                                                                <input type="radio" name="optRadios" id="optRadiosVencidos" value="Vencidos"> Vencidos 
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-4 col-md-4">
                                        <div class="panel panel-default">
                                            <div class="panel-body">
                                                <div class="row">
                                                    <div class="col-md-4 col-sm-4">
                                                        <div class="checkbox">
                                                            <label> 
                                                                <input type="checkbox" id="optTodoLicitacion" checked onchange=${()=>CambioTodoLicitacion()}> Todo 
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-8 col-sm-8">
                                                        <div class="checkbox">
                                                            <label> 
                                                                <input type="checkbox"> Solo Documentos Formales 
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-8 col-md-8">
                                                        <div class="form-group"> 
                                                            <select class="form-control input-sm" id="Cod_Licitacion"></select>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-4 col-md-4">
                                                        <button class="btn btn-info" type="button">Ver</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="panel panel-default">
                            <div class="panel-body">
                                <div class="row">
                                    <div class="table-responsive" id="divTablaComprobantes">

                                        <table id="tablaComprobantes" class="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Fecha</th>
                                                    <th>Vencimiento</th> 
                                                    <th>Documento</th>
                                                    <th>Total Faltante</th>
                                                    <th>Amortizar</th>
                                                    <th>Saldo</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>
                            <div class="panel-footer">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group row">
                                            <label class="col-sm-4 col-form-label">Comentarios:</label>
                                            <div class="col-sm-8">
                                                <input type="text" id="comentarios" class="form-control-plaintext input-sm form-control">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-8">

                                        <div class="form-group row">
                                            <label class="col-sm-1 col-form-label">Total</label>
                                            <div class="col-sm-10"> 
                                                <div class="col-sm-4">
                                                    <input type="number" id="Total" class="form-control">
                                                </div>
                                                <div class="col-sm-4">
                                                    <input type="number" id="TotalAmortizar" class="form-control">
                                                </div>
                                                <div class="col-sm-4">
                                                    <input type="number" id="TotalSaldo" class="form-control">
                                                </div>
                                            </div>  
                                        </div>
 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="modal-footer">
                <button class="btn btn-primary" onclick=${()=>VerGuardar(CodLibro)}>${CodLibro=='08'?'Pagar':'Cobrar'}</button>
                <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>`
    var ingreso = document.getElementById('modal-proceso')
    empty(ingreso).appendChild(el)
    $('#modal-proceso').modal()  
    CambioFormasPago(CodLibro)
    if(global.objCliente =='')
        BuscarCuentasPendientes(CodLibro,0,'1753-01-01 00:00:00','9999-12-31 23:59:59.997')
    else{
        $("#Cod_TipoDocumento").val(global.objCliente.Cod_TipoDocumento)
        $("#Cliente").val(global.objCliente.Nom_Cliente)
        $("#Nro_Documento").val(global.objCliente.Doc_Cliente)
        $("#Cliente").attr("data-id",global.objCliente.Id_Cliente)
        $("#Cod_Moneda").val(global.objCliente.Cod_Moneda)
        CargarLicitacionesCliente(global.objCliente.Id_Cliente)
        BuscarPorFecha(CodLibro)
    }

    
    $('#modal-otros-procesos').on('hidden.bs.modal', function () { 
        if(global.objCliente!='' && global.arraySeries){ 
            $("#Cod_TipoDocumento").val(global.objCliente.Cod_TipoDocumento)
            $("#Cliente").val(global.objCliente.Nom_Cliente)
            $("#Nro_Documento").val(global.objCliente.Doc_Cliente)
            $("#Cliente").attr("data-id",global.objCliente.Id_Cliente)
            $("#Cod_Moneda").val(global.objCliente.Cod_Moneda)
            CargarLicitacionesCliente(global.objCliente.Id_Cliente)
            BuscarPorFecha(CodLibro)
        }
    }) 

    CambioTodoFechas()
    CambioTodoVencimiento()
    CambioTodoLicitacion()
}

function AgregarTabla(comprobantes){
    var el = yo`<table id="tablaComprobantes" class="table table-bordered table-striped">
    <thead>
        <tr>
            <th>Fecha</th>
            <th>Vencimiento</th> 
            <th>Documento</th>
            <th>Total Faltante</th>
            <th>Amortizar</th>
            <th>Saldo</th>
        </tr>
    </thead>
    <tbody>
        ${comprobantes.map((c,index) => yo`
        <tr>
            <td class="hidden idComprobante">${c.id_ComprobantePago}</td>
            <td class="FechaEmision">${c.FechaEmision}</td>
            <td class="FechaVencimiento">${c.FechaVencimiento}</td> 
            <td class="hidden Dias">${c.Dias}</td> 
            <td class="Documento">${c.Documento}</td> 
            <td class="TotalFaltante">${c.TotalFaltante}</td> 
            <td class="Amortizar"><input class="form-control" type="number" value="0.00" onkeypress=${()=>CambioAmortizar()}></td> 
            <td class="Saldo">${c.TotalFaltante}</td> 
        </tr>`)}
    </tbody>

</table>`
    empty(document.getElementById('divTablaComprobantes')).appendChild(el);
}

function CargarModalConfirmacionCuentas(CodLibro){
    var el = yo`
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                <h4 class="modal-title"> Confirmacion </h4>
            </div>
            <div class="modal-body">
                <p>Esta seguro que desea realizar esta operacion?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger pull-left" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" onclick=${()=>AceptarConfirmacionCuenta(CodLibro)}>Aceptar</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>`


    var modal_proceso = document.getElementById('modal-alerta');
    empty(modal_proceso).appendChild(el);
    $('#modal-alerta').modal()
}

function LlenarCuentaBancaria(cuentas,CodLibro){
    var html = ''
    for(var i=0; i<cuentas.length; i++){
        html = html+'<option value="'+cuentas[i].Cod_CuentaBancaria+'">'+cuentas[i].Des_CuentaBancaria+'</option>'
    }
     
    $("#Cod_CuentaBancaria").html('')
    $("#Cod_CuentaBancaria").html(html)
    CambioCodCuentaBancaria(CodLibro)
}

function LlenarCuentaBancaria_(cuentas,CodLibro){
    var html = ''
    for(var i=0; i<cuentas.length; i++){
        html = html+'<option value="'+cuentas[i].NroCuenta_Bancaria+'">'+cuentas[i].CuentaBancaria+'</option>'
    }
     
    $("#Cod_CuentaBancaria").html('')
    $("#Cod_CuentaBancaria").html(html)
    CambioCodCuentaBancaria(CodLibro) 
}

function LlenarCheques(cheques){
    var html = ''
    for(var i=0; i<cheques.length; i++){
        html = html+'<option value="'+cheques[i].Id_MovimientoCuenta+'">'+cheques[i].Des_Movimiento+'</option>'
    }
     
    $("#Cuenta_CajaBancos").html('')
    $("#Cuenta_CajaBancos").html(html) 
}

function EsValido(){
    var MontoMaximo = 0
     
   if($("#divCuentaCajaBancos").css("display")=="block" && $("#Cuenta_CajaBancos").val()!='' && $("#Cuenta_CajaBancos").val()!=null){
       try{
            MontoMaximo = parseFloat($("#Cuenta_CajaBancos").val().split('[', ']')[1])
       }catch(e){
            MontoMaximo = 0
       }
   }

   if( $("#Cliente").attr("data-id")!=null &&  $("#Cliente").attr("data-id")!=''){
       if($("#tablaComprobantes > tbody tr").length > 0){
           if(MontoMaximo==0 || parseFloat($("#TotalAmortizar").val())<= MontoMaximo){
               if(parseFloat($("#TotalAmortizar").val())!=0){
                    return true
               }else{
                    toastr.error('El Monto a Amortizar debe ser Mayor a CERO (0.00).','Error',{timeOut: 5000})
                    $("#TotalAmortizar").focus()
               }    
           }else{
               if($("#Cod_FormaPago").val().toString()=="998"){
                    toastr.error('Debe de selecionar un Pago Adelantado que sea superior o igual al Monto Total de Comprobante.','Error',{timeOut: 5000})
               }else{
                   if($("#Cod_FormaPago").val().toString()=="007"){
                        toastr.error('Debe de selecionar un Cheque que sea superior o igual al Monto Total de Comprobante.','Error',{timeOut: 5000})
                   }
               }
               $("#Cuenta_CajaBancos").focus()
           }
       }else{
            toastr.error('Debe ingresar como minimo un Detalle en el Comprobante.','Error',{timeOut: 5000})
       }
   }else{
        toastr.error('Debe selecionar un cliente si por defecto dejarlo en CLIENTES VARIOS.','Error',{timeOut: 5000})
        $("#Cliente").focus()
   }

   return false

}

function CalcularTotal(){
    try{
        var SumaTotal = 0
        var SumaAmortiza = 0
        $('#tablaComprobantes > tbody tr').each(function () {

            SumaAmortiza += parseFloat($(this).find("td").eq(6).find("input").val())
            if((parseFloat($(this).find("td").eq(5).text()) - parseFloat($(this).find("td").eq(5).find("input").val()))>0)
                $(this).find("td").eq(7).text((parseFloat($(this).find("td").eq(5).text()) - parseFloat($(this).find("td").eq(5).find("input").val())))
            else
                $(this).find("td").eq(7).text("0.00")
            
            SumaTotal += parseFloat($(this).find("td").eq(5).text())            
        });

        $("#Total").val(SumaTotal)
        $("#TotalAmortizar").val(SumaAmortiza)
        $("#TotalFaltante").val(SumaTotal-SumaAmortiza)

    }catch(e){

    }


}

function BuscarPorFecha(CodLibro){
    var Id_Cliente = $("#Cliente").attr("data-id")
    var Cod_Libro = CodLibro
    var FechaInicio = $("#optTodoFechas").is(":checked")?'1753-01-01 00:00:00':$("#FechaInicio").val()
    var FechaFin = $("#optTodoFechas").is(":checked")?'9999-12-31 23:59:59.997':$("#FechaFin").val()
    var Cod_Moneda = $("#Cod_Moneda").val()
    var Vencimiento = $("#optTodoVencimiento").is(":checked")?null:(($('input[name=optRadios]:checked').val()=="PorVencer")?true:false)
    var Cod_Licitacion = $("#optTodoLicitacion").is(":checked")?null:$("#Cod_Licitacion").val()

    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Id_Cliente,
            Cod_Libro,
            FechaInicio,
            FechaFin,
            Cod_Moneda,
            Vencimiento,
            Cod_Licitacion
        })
    }
    fetch(URL + '/recibo_iegreso_api/get_cuentas_by_cobrar_pagar', parametros)
        .then(req => req.json())
        .then(res => { 
            if (res.respuesta == 'ok') {
                AgregarTabla(res.data.cuentas)
            } 
        })
    
}

function CambioTodoFechas(){
    $("#FechaFin").attr("disabled",($("#optTodoFechas").is(":checked")))
    $("#FechaInicio").attr("disabled",($("#optTodoFechas").is(":checked")))
}

function CambioTodoLicitacion(){
    $("#Cod_Licitacion").attr("disabled",($("#optTodoFechas").is(":checked")))
}

function CambioTodoVencimiento(){
    if($("#optTodoVencimiento").is(":checked")){
        $('input[name=optRadios]').attr("checked",false)
        $('input[name=optRadios]').attr("disabled",true)
    }else{        
        $('#optRadiosPorVencer').attr("checked",true)
        $('#optRadiosVencidos').attr("checked",false)
        $('input[name=optRadios]').attr("disabled",false)
    }
}

function CambioCodCuentaBancaria(CodLibro){
    var Cod_CuentaBancaria = $("#Cod_CuentaBancaria").val()
    var Beneficiario = $("#Cliente").val()
    var Cod_Libro = CodLibro

    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Cod_CuentaBancaria,
            Beneficiario,
            Cod_Libro
        })
    }
    fetch(URL + '/cuentas_bancarias_api/get_cheques_by_cuenta_cliente', parametros)
        .then(req => req.json())
        .then(res => {
            if (res.respuesta == 'ok') {
                var cheques = res.data.cheques 
                LlenarCheques(cheques)
            } 
        })
}

function CambioAmortizar(){
    CalcularTotal()
}

function CambioFormasPago(CodLibro){
    if($("#Cod_FormaPago").val()!=null && $("#Cod_FormaPago").val()!=""){
        var flagDisplay="none"
        if($("#Cod_FormaPago").val()!="008")
            flagDisplay = "block"
        
        $("#divOperacion").css("display",flagDisplay)
        $("#Cod_CuentaBancaria").css("display",flagDisplay)
        $("#divCuentaCajaBancos").css("display",flagDisplay)

        if($("#divOperacion").css("display")=="block"){
            switch ($("#Cod_FormaPago").val()) {
                case "007":
                    if(CodLibro=="08"){
                        $("#lbCuentaCajaBanco").text("# de Cheque: ")
                        TraerCuentaBancariaPorSucursal(CodLibro)
                    }else{
                        toastr.error('No Existe la Operacion de CHEQUE para ventas.\nSe debe de Depositar el Cheque eh ingresarlo como Deposito en Cuenta.','Error',{timeOut: 5000})
                        $("#Cod_FormaPago").val(null)
                    }
                    break 
                case "011":
                    $("#Cod_CuentaBancaria").css("display","block")
                    $("#lbCuentaCajaBanco").text("# de Operacion")
                    if(CodLibro=="08"){
                        TraerCuentasBancariasXIdClienteProveedor(CodLibro)
                    }else{
                        TraerCuentaBancariaPorSucursal(CodLibro)
                    }
                    break
                case "001":
                    $("#lbCuentaCajaBanco").text("# de Letra: ")
                    break
                case "005":
                    $("#lbCuentaCajaBanco").text("# de Tarjeta VISA: ")
                    break
                case "006":
                    $("#lbCuentaCajaBanco").text("# de Tarjeta MASTER CARD: ")
                    break
                case "004":
                    $("#lbCuentaCajaBanco").text("# de Orden de Pago: ")
                    break
                case "003":
                    $("#Cod_CuentaBancaria").css("display","block")
                    $("#lbCuentaCajaBanco").text("Seleccione Transferencia: ")
                    TraerCuentaBancariaPorSucursal()
                    break
                case "008":
                    $("#divOperacion").css("display","none")
                    $("#Cod_CuentaBancaria").css("display","none")
                    $("#divCuentaCajaBancos").css("display","none")
                    break
                case "998":
                    $("#lbCuentaCajaBanco").text("Selecione Pago Adelantado: ")
                    TraerSaldoPagoAdelantado()
                    break
                default:
                    $("#lbCuentaCajaBanco").text("# de Operación: ")
                    break
            }
        }
    }
}
 

function TraerSaldoPagoAdelantado(){
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Id_ClienteProveedor:global.objCliente.Id_ClienteProveedor
        })
    }
    fetch(URL + '/compras_api/get_pago_adelantado', parametros)
        .then(req => req.json())
        .then(res => {
            if (res.respuesta == 'ok') {
                var pagos_adelantados = res.data.pagos_adelantados
                if (pagos_adelantados.length>0){
                    LlenarPagosAdelantados(pagos_adelantados)
                }else{
                    $("#lbCuentaCajaBanco").text("No tienen Ningun Adelanto para Selecionar.")
                    $("#Cuenta_CajaBancos").html('')
                    $("#divCuentaCajaBancos").css("display","none")
                } 
            } 
        })
}

function TraerCuentasBancariasXIdClienteProveedor(CodLibro){
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Id_ClienteProveedor:global.objCliente.Id_ClienteProveedor
        })
    }
    fetch(URL + '/cuentas_bancarias_api/get_cuenta_by_id_cliente', parametros)
        .then(req => req.json())
        .then(res => {
            if (res.respuesta == 'ok') {
                var cuentas = res.data.cuentas
                LlenarCuentaBancaria_(cuentas,CodLibro)
            } 
        })
}


function TraerCuentaBancariaPorSucursal(CodLibro){
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        })
    }
    fetch(URL + '/cuentas_bancarias_api/get_cuenta_by_sucursal', parametros)
        .then(req => req.json())
        .then(res => {
            if (res.respuesta == 'ok') {
                var cuentas = res.data.cuentas
                LlenarCuentaBancaria(cuentas,CodLibro)
            } 
        })
}

function BuscarClienteDoc(CodLibro) {
    var Nro_Documento = document.getElementById('Nro_Documento').value
    var Cod_TipoDocumento = document.getElementById('Cod_TipoDoc').value
    var Cod_TipoCliente = CodLibro == "08" ? "001" : "002"
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Nro_Documento, Cod_TipoDocumento,Cod_TipoCliente
        })
    }
    fetch(URL + '/clientes_api/get_cliente_by_documento', parametros)
        .then(req => req.json())
        .then(res => {
            if (res.respuesta == 'ok' && res.data.cliente.length > 0) {
                global.objCliente = res.data.cliente[0]

                if(global.objCliente !='' && global.objCliente){
                    $("#Cod_TipoDocumento").val(global.objCliente.Cod_TipoDocumento)
                    $("#Cliente").val(global.objCliente.Cliente)
                    $("#Nro_Documento").val(global.objCliente.Nro_Documento)
                    $("#Cliente").attr("data-id",global.objCliente.Id_ClienteProveedor) 
                    CargarLicitacionesCliente(global.objCliente.Id_ClienteProveedor)
                }
            }
            H5_loading.hide()
        })
}


function CargarLicitacionesCliente(Id_ClienteProveedor){
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Id_ClienteProveedor
        })
    }
    fetch(URL + '/clientes_api/get_licitaciones_by_cliente', parametros)
        .then(req => req.json())
        .then(res => {
            if (res.respuesta == 'ok') {
                var licitaciones = res.data.licitaciones 
                if(licitaciones.length>0){
                    $("#divCodigoLicitacion").css("display","block")
                    $("#divLicitacion").css("display","block")
                    $("#optLicitacion").attr("checked",true)
                    LlenarLicitaciones(licitaciones)
                }else{
                    $("#divCodigoLicitacion").css("display","none")
                    $("#divLicitacion").css("display","none")
                    $("#optLicitacion").attr("checked",false)   
                }
            } 
        })
}

function VerGuardar(CodLibro){
    try{
        if(EsValido()){
            CargarModalConfirmacionCuentas(CodLibro)
        }
    }catch(e){
        toastr.error('Error al agregar nuevo elemento, intentelo mas luego.\n\n','Error',{timeOut: 5000})
    }
}

function EstablecerCamposEntidad(CodLibro){

}

function AceptarConfirmacionCuenta(CodLibro){
    EstablecerCamposEntidad(CodLibro)
    var i = 0
    var Facturas = ""
    $('#tablaComprobantes > tbody tr').each(function () {
        if(parseFloat($(this).find("td").eq(6).find("input").val())>0){
            if(parseFloat($(this).find("td").eq(5).text()) == parseFloat($(this).find("td").eq(6).find("input").val()) ){
                
            }
        }
        /*SumaAmortiza += parseFloat($(this).find("td").eq(6).find("input").val())
        if((parseFloat($(this).find("td").eq(5).text()) - parseFloat($(this).find("td").eq(5).find("input").val()))>0)
            $(this).find("td").eq(7).text((parseFloat($(this).find("td").eq(5).text()) - parseFloat($(this).find("td").eq(5).find("input").val())))
        else
            $(this).find("td").eq(7).text("0.00")
        
        SumaTotal += parseFloat($(this).find("td").eq(5).text())    */        
    });
}
 
function Cuentas(Cod_Libro) {
    H5_loading.show(); 
    const fecha = new Date()
    const mes = fecha.getMonth() + 1
    const dia = fecha.getDate()
    var fecha_format = fecha.getFullYear() + '-' + (mes > 9 ? mes : '0' + mes) + '-' + (dia > 9 ? dia : '0' + dia)

    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Cod_TipoComprobante :'RE',
            Id_Cliente: 0,
            Cod_Libro,
            FechaInicio:  '1753-01-01 00:00:00',
            FechaFin:  '9999-12-31 23:59:59.997',
        })
    }
    fetch(URL + '/recibo_iegreso_api/get_variables_cuentas_cobrar_pagar', parametros)
        .then(req => req.json())
        .then(res => {
            var variables = res.data
            const parametros = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                })
            }
            fetch(URL + '/cajas_api/get_empresa', parametros)
                .then(req => req.json())
                .then(res => {
                    var data_empresa = res.empresa
                    variables['empresa'] = data_empresa
                    VerCuentas(variables,fecha_format,Cod_Libro)
                    H5_loading.hide()
    
                })

        }) 
}

export { Cuentas }