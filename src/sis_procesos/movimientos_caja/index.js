var yo = require('yo-yo')
var empty = require('empty-element');
import {URL} from '../../constantes_entorno/constantes'
function Ver(Flag_Cerrado,movimientos,saldos) {
    var el = yo`
        <div>
            <section class="content-header" id="sectionModals">
                 
                <div class="modal modal-danger fade" id="modal-danger" style="display: none;">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                                <h4 class="modal-title">¿Esta seguro que desea eliminar este cliente/proveedor?</h4>
                            </div>
                            <div class="modal-body">
                                <p>Al eliminar el cliente no podra recuperarlo. Desea continuar de todas maneras?</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-outline pull-left" data-dismiss="modal">Cancelar</button>
                                <button type="button" class="btn btn-outline" id="btnEliminar" data-dismiss="modal">Si,Eliminar</button>
                            </div>
                        </div>
                        <!-- /.modal-content -->
                    </div>
                    <!-- /.modal-dialog -->
                </div>
 
 
                <div class="modal fade" id="modal-alerta" style="z-index: 999999;">
                     
                </div>

                <div class="modal modal-default fade" id="modal-justificacion" style="display: none;overflow: auto;">
                     
                </div>

                <div class="modal fade" id="modal-superior" style="display: none;z-index: 1052;overflow: auto;" >
                     
                </div> 

                <div class="modal fade" id="modal-otros-procesos" style="display: none;z-index: 1051;overflow: auto;" >
                     
                </div>

                <div class="modal fade" id="modal-proceso" style="overflow: auto;">
                    
                </div>
            </section>
            <section class="content">
                <div class="row">
                    <div class="col-md-12"> 
                        <div class="nav-tabs-custom">
                            <ul class="nav nav-tabs" id="tabs">
                                <li class="active"><a href="#tab_1" id="id_1" data-toggle="tab" aria-expanded="true" onclick=${()=>refrescar_movimientos_caja()}>Movimientos</a></li>
                            </ul>
                            <div class="tab-content" id="tabs_contents">
                                <div class="tab-pane active" id="tab_1">
                                    
                                    <div class="box box-primary">
                                        <div class="box-header">
                                            <h3 class="box-title">Movimientos de Caja ${Flag_Cerrado?' - EL TURNO ESTA CERRADO':''}</h3>
                                        </div>
                                        <!-- /.box-header -->
                                        <div class="box-body">
                                            <div class="table-responsive">
                                            <table id="tablaMovimientos" class="table table-bordered table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>E</th>
                                                        <th>Fecha/Hora</th>
                                                        <th>D</th>
                                                        <th>Documento</th>
                                                        <th>Cliente/Proveedor</th>
                                                        <th>Descripcion</th>
                                                        <th>Plan</th>
                                                        <th>Cantidad</th>
                                                        <th>PU</th>
                                                        <th>Ingreso</th>
                                                        <th>Egreso</th>
                                                        <th>Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                ${movimientos.map(u => yo`
                                                <tr>
                                                    <td>${u.ID}</td>
                                                    <td>${u.Fecha_Reg.split('.')[0]}</td>
                                                    <td>${u.ID}</td>
                                                    <td>${u.Documento}</td>
                                                    <td>${u.Cliente}</td>
                                                    <td>${u.Movimiento}</td>
                                                    <td>${u.Cod_Manguera}</td>
                                                    <td>${u.Cantidad}</td>
                                                    <td>${u.PrecioUnitario}</td>
                                                    <td>${u.Ingreso}</td>
                                                    <td>${u.Egreso}</td>
                                                    <td>
                                                    ${!Flag_Cerrado?
                                                    yo`<div class="btn-group">
                                                            <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            Elegir una accion <span class="caret"></span>
                                                            </button>
                                                            <ul class="dropdown-menu">
                                                                <li><a href="javascript:void(0)" onclick=${()=>AbrirModalConfirmacion('extornar',u)} ><i class="fa fa-times-circle"></i>Anular</a></li>
                                                                <li><a href="javascript:void(0)" onclick=${()=>VerFormatoDocumento(u)} ><i class="fa fa-print"></i>Reimprimir</a></li>
                                                                <li><a href="javascript:void(0)" ><i class="fa fa-refresh"></i>Cambiar Plan</a></li>
                                                                <li><a href="javascript:void(0)" onclick=${()=>AbrirModalCambiarTurno(u)}><i class="fa fa-calendar"></i>Cambiar Turno</a></li>
                                                                <li><a href="javascript:void(0)" onclick=${()=>AbrirModalConfirmacion('eliminar',u)}><i class="fa fa-close"></i> Eliminar</a></li>
                                                            </ul>
                                                        </div>`
                                                    :
                                                    yo`
                                                    <div class="btn-group">
                                                        <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled>
                                                        Elegir una accion <span class="caret"></span>
                                                        </button>
                                                    </div>
                                                    `}
                                                    </td>
                                                </tr>`)}
                                                </tbody>
                    
                                            </table>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>`;
    var footer_element = yo`
        <div class="row">
            <div class="col-sm-7"></div>
            <div class="col-sm-5">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Moneda</th>
                            <th>Saldo Inicial</th>
                            <th>Ingresos</th>
                            <th>Egresos</th>
                            <th>Saldo Final</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${saldos.map(s=>yo`
                            <tr>
                                <td>${s.Moneda}</td>
                                <td>${s.SaldoInicial}</td>
                                <td>${s.Ingresos}</td>
                                <td>${s.Egresos}</td>
                                <td>${s.SaldoFinal}</td>
                            </tr>
                        `)}
                    </tbody>
                </table>
            </div>
        </div>`;
    var container = document.getElementById('main-contenido')
    empty(container).appendChild(el);
    var footer = document.getElementById('content_footer')
    empty(footer).appendChild(footer_element);
    $('#tablaMovimientos').DataTable({
        "lengthChange": false,
        "order": [[ 1, "desc" ]],
        "oLanguage": {
            "sSearch": "Buscar:"
        }
    });
 

}

function VerModalJustificacion(titulo,descripcion,movimiento,flag) {
    var el = yo` 
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title">${titulo}</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div id="modal_error" class="callout callout-danger hidden">
                                <p> Es necesario llenar los campos marcados con rojo</p>
                            </div>
                        </div>
                        <p>${descripcion}</p>
                        <div class="row" id="modal_form">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <input type="text" id="txtJustificacion" class="form-control required">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger pull-left" data-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" id="btnExtornarAnular" onclick=${()=>ExtornarAnular(movimiento,flag)}>Aceptar</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>`

    var modal_justificacion = document.getElementById('modal-justificacion');
    empty(modal_justificacion).appendChild(el);
    $('#modal-justificacion').modal()
}


function VerTabCaja(Flag_Cerrado,movimientos,saldos) {
    var sectionModals = yo`
                <div>
                    
                    <div class="modal modal-danger fade" id="modal-danger" style="display: none;">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                    <h4 class="modal-title">¿Esta seguro que desea eliminar este cliente/proveedor?</h4>
                                </div>
                                <div class="modal-body">
                                    <p>Al eliminar el cliente no podra recuperarlo. Desea continuar de todas maneras?</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-outline pull-left" data-dismiss="modal">Cancelar</button>
                                    <button type="button" class="btn btn-outline" id="btnEliminar" data-dismiss="modal">Si,Eliminar</button>
                                </div>
                            </div>
                            <!-- /.modal-content -->
                        </div>
                        <!-- /.modal-dialog -->
                    </div>
 

                    <div class="modal fade" id="modal-alerta" style="z-index: 999999;">
                     
                    </div>

                    <div class="modal modal-default fade" id="modal-justificacion" style="display: none;overflow: auto;">
                        
                    </div>

                    <div class="modal fade" id="modal-otros-procesos" style="display: none;z-index: 1051;overflow: auto;">
                     
                    </div>

                    <div class="modal fade" id="modal-superior" style="display: none;z-index: 1051;overflow: auto;" >
                        
                    </div>
                    <div class="modal fade" id="modal-proceso" style="overflow: auto;">
                        
                    </div>
                </div>`

    var el = yo`<div class="box box-primary">
                    <div class="box-header">
                        <h3 class="box-title">Movimientos de Caja ${Flag_Cerrado?' - EL TURNO ESTA CERRADO':''}</h3>
                    </div>
                    <!-- /.box-header -->
                    <div class="box-body">
                        <div class="table-responsive">
                        <table id="tablaMovimientos" class="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>E</th>
                                    <th>Fecha/Hora</th>
                                    <th>D</th>
                                    <th>Documento</th>
                                    <th>Cliente/Proveedor</th>
                                    <th>Descripcion</th>
                                    <th>Plan</th>
                                    <th>Cantidad</th>
                                    <th>PU</th>
                                    <th>Ingreso</th>
                                    <th>Egreso</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody class="context-menu-one">
                            ${movimientos.map(u => yo`
                            <tr>
                                <td>${u.ID}</td>
                                <td>${u.Fecha_Reg.split('.')[0]}</td>
                                <td>${u.ID}</td>
                                <td>${u.Documento}</td>
                                <td>${u.Cliente}</td>
                                <td>${u.Movimiento}</td>
                                <td>${u.Cod_Manguera}</td>
                                <td>${u.Cantidad}</td>
                                <td>${u.PrecioUnitario}</td>
                                <td>${u.Ingreso}</td>
                                <td>${u.Egreso}</td>
                                <td>

                                ${!Flag_Cerrado?
                                yo`<div class="btn-group">
                                        <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Elegir una accion <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li><a href="javascript:void(0)" onclick=${()=>AbrirModalConfirmacion('extornar',u)} ><i class="fa fa-times-circle"></i>Anular</a></li>
                                            <li><a href="javascript:void(0)" onclick=${()=>VerFormatoDocumento(u)} ><i class="fa fa-print"></i>Reimprimir</a></li>
                                            <li><a href="javascript:void(0)"  ><i class="fa fa-refresh"></i>Cambiar Plan</a></li>
                                            <li><a href="javascript:void(0)" onclick=${()=>AbrirModalCambiarTurno(u)}><i class="fa fa-calendar"></i>Cambiar Turno</a></li>
                                            <li><a href="javascript:void(0)" onclick=${()=>AbrirModalConfirmacion('eliminar',u)}><i class="fa fa-close"></i> Eliminar</a></li>
                                        </ul>
                                    </div>`
                                :
                                yo`
                                <div class="btn-group">
                                    <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled>
                                    Elegir una accion <span class="caret"></span>
                                    </button>
                                </div>
                                `}
                                </td>
                            </tr>`)}
                            </tbody>

                        </table>
                        </div>
                    </div>
                </div>`;


    var sectionFooter = yo`
                <div class="row">
                    <div class="col-sm-7"></div>
                    <div class="col-sm-5">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Moneda</th>
                                    <th>Saldo Inicial</th>
                                    <th>Ingresos</th>
                                    <th>Egresos</th>
                                    <th>Saldo Final</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${saldos.map(s=>yo`
                                    <tr>
                                        <td>${s.Moneda}</td>
                                        <td>${s.SaldoInicial}</td>
                                        <td>${s.Ingresos}</td>
                                        <td>${s.Egresos}</td>
                                        <td>${s.SaldoFinal}</td>
                                    </tr>
                                `)}
                            </tbody>
                        </table>
                    </div>
                </div>`;
     
    var sectionModalsElement = document.getElementById('sectionModals')
    empty(sectionModalsElement).appendChild(sectionModals);
    var container = document.getElementById('tab_1')
    empty(container).appendChild(el);
    $("#tab_1").click()
    $('#content_footer').html(sectionFooter);

    $('#tablaMovimientos').DataTable({
        "lengthChange": false,
        "order": [[ 1, "desc" ]],
        "oLanguage": {
            "sSearch": "Buscar:"
        }
    });
 

}

function AbrirModalManguera(movimiento){
    var el = yo`
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                    <h4 class="modal-title" id="txtTitulo">Cambiar Manguera </h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="Manguera">Seleccione una manguera</label>
                                <select id="Manguera" class="form-control">
                                </select>
                            </div>
                        </div>
                    </div>
                        
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger pull-left" data-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" id="btnCambiarTurno" onclick=${()=>GuardarManguera(movimiento)}>Aceptar</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>`
        var modal_proceso = document.getElementById('modal-alerta');
        empty(modal_proceso).appendChild(el);
        $('#modal-alerta').modal()
}


function AbrirModalCambiarTurno(movimiento){

    const fecha = new Date()
    var anio = fecha.getFullYear() 

    var el = yo`
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                <h4 class="modal-title">Seleccione el turno </h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                        <label for="Gestion">Gestion</label>
                            <input type="number" id="Gestion" value=${anio} class="form-control" onkeyup=${()=>TraerPeriodos()} onchange=${()=>TraerPeriodos()}>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                        <label for="Periodo">Periodo</label>
                            <select id="Periodo" class="form-control" onchange=${()=>TraerTurnos()}>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                        <label for="Turno">Turno</label>
                            <select id="Turno" class="form-control">
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger pull-left" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" id="btnCambiarTurno" onclick=${()=>GuardarCambioTurno(movimiento)}>Aceptar</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>`
    var modal_proceso = document.getElementById('modal-alerta');
    empty(modal_proceso).appendChild(el);
    $('#modal-alerta').modal()
    TraerPeriodos()
}


function AbrirModalConfirmacion(flag,movimiento){
    var el=''
    if(flag=="eliminar"){
        el = yo`
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title">Se eliminara el dato seleccionado</h4>
                    </div>
                    <div class="modal-body">
                        <p>¿Esta seguro de eliminar este comprobante?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger pull-left" data-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick=${()=>AceptarConfirmacion(flag,movimiento)}>Aceptar</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>`
    }else{ 
        el = yo`
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title">Se eliminara el dato seleccionado</h4>
                    </div>
                    <div class="modal-body">
                        <p>¿Esta seguro de extornar este comprobante?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger pull-left" data-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick=${()=>AceptarConfirmacion(flag,movimiento)}>Aceptar</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>` 
    }


    var modal_proceso = document.getElementById('modal-alerta');
    empty(modal_proceso).appendChild(el);
    $('#modal-alerta').modal()
}



function LlenarPeriodo(periodos,idSelect){
    var el = yo`
        ${periodos.map(e => yo`
             <option value="${e.Cod_Periodo}">${e.Nom_Periodo}</option>
        `)}`   
    $("#"+idSelect).html('')
    $("#"+idSelect).html(el) 
}

function LlenarTurnos(turnos,idSelect){
    var el = yo`
        ${turnos.map(e => yo`
             <option value="${e.Cod_Turno}">${e.Des_Turno}</option>
        `)}`   
    $("#"+idSelect).html('')
    $("#"+idSelect).html(el) 
}

function LlenarManguera(mangueras,idSelect){
    var el = yo`
    ${mangueras.map(e => yo`
         <option value="${e.Cod_Turno}">${e.Des_Turno}</option>
    `)}`   
    $("#"+idSelect).html('')
    $("#"+idSelect).html(el) 
}



function TraerPeriodos(){
    var Gestion = $("#Gestion").val()  
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify({
            Gestion
        })
    }
    fetch(URL + '/empresa_api/get_periodos_by_gestion', parametros)
        .then(req => req.json())
        .then(res => {
            LlenarPeriodo(res.data.periodos,'Periodo')
            TraerTurnos()
        })
}

function TraerTurnos(){
    var Cod_Periodo = $("#Periodo").val()
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify({
            Cod_Periodo
        })
    }
    fetch(URL + '/empresa_api/get_turnos_by_periodo', parametros)
        .then(req => req.json())
        .then(res => { 
            LlenarTurnos(res.data.turnos,'Turno')
        })
}

function GuardarCambioTurno(movimiento){ 
    var id_ComprobantePago = movimiento.ID
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify({
            id_ComprobantePago
        })
    }
    switch (movimiento.Entidad) {
        case "CAJ_COMPROBANTE_PAGO":

            var id_ComprobantePago = movimiento.ID
            var Cod_Turno = $("#Turno").val()
            const parametrosCP = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'same-origin',
                body: JSON.stringify({
                    id_ComprobantePago,
                    Cod_Turno
                })
            }
             
            fetch(URL + '/turnos_api/cambiar_comprobante_by_turno', parametrosCP)
                .then(req => req.json())
                .then(res => {
                    $("#modal-alerta").modal("hide") 
                    refrescar_movimientos_caja()
                    if (res.respuesta == 'ok') { 
                        toastr.success('Se modifico correctamente el turno','Confirmacion',{timeOut: 5000})
                    }else{
                        toastr.error('No se pudo modificar el turno','Error',{timeOut: 5000})
                    }
                })
            break;
        case "CAJ_CAJA_MOVIMIENTOS":
            
            var Id_MovimientoCaja = movimiento.ID
            var Cod_TurnoActual = $("#Turno").val()
            const parametrosCM = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'same-origin',
                body: JSON.stringify({
                    Id_MovimientoCaja,
                    Cod_TurnoActual
                })
            }

            fetch(URL + '/turnos_api/cambiar_movimientos_by_turno', parametrosCM)
                .then(req => req.json())
                .then(res => {
                    $("#modal-alerta").modal("hide") 
                    refrescar_movimientos_caja()
                    if (res.respuesta == 'ok') { 
                        toastr.success('Se modifico correctamente el turno','Confirmacion',{timeOut: 5000})
                    }else{
                        toastr.error('No se pudo modificar el turno','Error',{timeOut: 5000})
                    }
                })
            break;
        case "ALM_ALMACEN_MOV":
            
            var Id_AlmacenMov = movimiento.ID
            var Cod_TurnoActual = $("#Turno").val()
            const parametrosAM = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'same-origin',
                body: JSON.stringify({
                    Id_AlmacenMov,
                    Cod_TurnoActual
                })
            }

            fetch(URL + '/turnos_api/cambiar_almacen_by_turno', parametrosAM)
                .then(req => req.json())
                .then(res => {
                    $("#modal-alerta").modal("hide") 
                    refrescar_movimientos_caja()
                    if (res.respuesta == 'ok') { 
                        toastr.success('Se modifico correctamente el turno','Confirmacion',{timeOut: 5000})
                    }else{
                        toastr.error('No se pudo modificar el turno','Error',{timeOut: 5000})
                    }
                })
            break;
    }
}

 
 

function AceptarConfirmacion(flag,movimiento){
    $("#modal-alerta").modal("hide")
    if(flag=="eliminar"){
        VerModalJustificacion("Ingrese una justificacion de eliminacion","Por ejemplo : Por error de ingreso en monto",movimiento,flag)
    }else{ 
        VerModalJustificacion("Ingrese una justificacion del extorno / anulacion","Por ejemplo : Por error de ingreso en",movimiento,flag)
    }
}

function VerFormatoDocumento(u){

}
 

function ExtornarAnular(movimiento,flag) {
    var id_Movimiento = movimiento.ID
    var entidad = movimiento.Entidad
    var MotivoAnulacion = $("#txtJustificacion").val()
    const fecha = new Date()
    const mes = fecha.getMonth() + 1
    const dia = fecha.getDate() 
    var fecha_format = fecha.getFullYear() + '-' + (mes > 9 ? mes : '0' + mes) + '-' + (dia > 9 ? dia : '0' + dia) + ' '+ [(fecha.getHours()>9?fecha.getHours():'0'+fecha.getHours()), (fecha.getMinutes()>9?fecha.getMinutes():'0'+fecha.getMinutes())].join(':');
    
    var parametros = {} 
    if(ValidacionCampos('modal_error','modal_form')){ 
        if(flag=="extornar"){ 
            switch (entidad){
                case "CAJ_CAJA_MOVIMIENTOS":
                    parametros = {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        credentials: 'same-origin',
                        body: JSON.stringify({
                            id_Movimiento
                        })
                    }
                    fetch(URL + '/movimientos_caja_api/extornar_movimiento', parametros)
                        .then(req => req.json())
                        .then(res => {
                            $("#modal-justificacion").modal("hide") 
                            //refrescar_movimientos_caja()
                            if (res.respuesta == 'ok') { 
                                refrescar_movimientos_caja()
                                toastr.success('Se anulo correctamente el movimiento','Confirmacion',{timeOut: 5000})
                            }else{
                                toastr.error('No se pudo anular correctamente el movimiento','Error',{timeOut: 5000})
                            }
                        })
                    break;
                case "CAJ_COMPROBANTE_PAGO":
                    parametros = {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        credentials: 'same-origin',
                        body: JSON.stringify({
                            id_ComprobantePago:id_Movimiento
                        })
                    }
                    fetch(URL + '/comprobantes_pago_api/get_comprobante_pago', parametros)
                        .then(req => req.json())
                        .then(res => {
                            var comprobante_pago = res.data.comprobante_pago[0]
                            var id_ComprobantePago = comprobante_pago.id_ComprobantePago
                            if(comprobante_pago.Cod_TipoComprobante=='TKF' || comprobante_pago.Cod_TipoComprobante=='TKB'){
                                parametros = {
                                    method: 'POST',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                    credentials: 'same-origin',
                                    body: JSON.stringify({
                                        id_ComprobantePago:id_Movimiento,
                                        Fecha:fecha_format,
                                        MotivoAnulacion
                                    })
                                }
                                fetch(URL + '/comprobantes_pago_api/get_comprobante_pago', parametros)
                                    .then(req => req.json())
                                    .then(res => {
                                        if(res.respuesta=='ok'){
                                            toastr.success('Se anulo correctamente el comprobante','Confirmacion',{timeOut: 5000})
                                        }else{
                                            toastr.error('No se pudo anular correctamente el comprobante','Error',{timeOut: 5000})
                                        }
                                    })
                            }else{
                                if(comprobante_pago.Cod_TipoComprobante=='FE' || comprobante_pago.Cod_TipoComprobante=='BE'){
                                    parametros = {
                                        method: 'POST',
                                        headers: {
                                            Accept: 'application/json',
                                            'Content-Type': 'application/json',
                                        },
                                        credentials: 'same-origin',
                                        body: JSON.stringify({
                                            id_ComprobantePago:id_Movimiento,
                                            Fecha:fecha_format,
                                            MotivoAnulacion
                                        })
                                    }
                                    fetch(URL + '/comprobantes_pago_api/get_comprobante_pago', parametros)
                                        .then(req => req.json())
                                        .then(res => {
                                            if(res.respuesta=='ok'){
                                                toastr.success('Se anulo correctamente el comprobante','Confirmacion',{timeOut: 5000})
                                            }else{
                                                toastr.error('No se pudo anular correctamente el comprobante','Error',{timeOut: 5000})
                                            }
                                        })
                                }else{
                                    
                                    parametros = {
                                        method: 'POST',
                                        headers: {
                                            Accept: 'application/json',
                                            'Content-Type': 'application/json',
                                        },
                                        credentials: 'same-origin',
                                        body: JSON.stringify({
                                            id_ComprobantePago:id_Movimiento,
                                            Fecha:fecha_format,
                                            MotivoAnulacion
                                        })
                                    }
                                    fetch(URL + '/comprobantes_pago_api/get_comprobante_pago', parametros)
                                        .then(req => req.json())
                                        .then(res => {
                                            if(res.respuesta=='ok'){
                                                toastr.success('Se anulo correctamente el comprobante','Confirmacion',{timeOut: 5000})
                                            }else{
                                                toastr.error('No se pudo anular correctamente el comprobante','Error',{timeOut: 5000})
                                            }
                                        })


                                }
                            }
                            /*$("#modal-justificacion").modal("hide")  
                            if (res.respuesta == 'ok') { 
                                refrescar_movimientos_caja()
                                toastr.success('Se anulo correctamente el comprobante','Confirmacion',{timeOut: 5000})
                            }else{
                                toastr.error('No se pudo anular correctamente el comprobante','Error',{timeOut: 5000})
                            }*/
                        })
                    break;
                case "ALM_ALMACEN_MOV":
                    var Id_Almacen_Mov = id_Movimiento 
                    parametros = {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        credentials: 'same-origin',
                        body: JSON.stringify({
                            Id_Almacen_Mov
                        })
                    }
                    fetch(URL + '/movimientos_caja_api/extornar_movimiento_almacen', parametros)
                        .then(req => req.json())
                        .then(res => {
                            $("#modal-justificacion").modal("hide") 
                            //refrescar_movimientos_caja()
                            if (res.respuesta == 'ok') { 
                                refrescar_movimientos_caja()
                                toastr.success('Se anulo correctamente el movimiento','Confirmacion',{timeOut: 5000})
                            }else{
                                toastr.error('No se pudo anular correctamente el movimiento','Error',{timeOut: 5000})
                            }
                        })
                    break;
                case "CAJ_FORMA_PAGO":
                    var id_ComprobantePago = id_Movimiento 
                    var Item = movimiento.Item
                    parametros = {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        credentials: 'same-origin',
                        body: JSON.stringify({
                            id_ComprobantePago,
                            Item
                        })
                    }
                    fetch(URL + '/movimientos_caja_api/extornar_movimiento_almacen', parametros)
                        .then(req => req.json())
                        .then(res => {
                            $("#modal-justificacion").modal("hide") 
                            //refrescar_movimientos_caja()
                            if (res.respuesta == 'ok') { 
                                refrescar_movimientos_caja()
                                toastr.success('Se anulo correctamente el movimiento','Confirmacion',{timeOut: 5000})
                            }else{
                                toastr.error('No se pudo anular correctamente el movimiento','Error',{timeOut: 5000})
                            }
                        })
                    break;


            }



            
        }else{

            switch (entidad){
                case "CAJ_CAJA_MOVIMIENTOS":
                    parametros = {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        credentials: 'same-origin',
                        body: JSON.stringify({
                            id_Movimiento

                        })
                    }
                    fetch(URL + '/movimientos_caja_api/eliminar_movimiento', parametros)
                        .then(req => req.json())
                        .then(res => {
                            $("#modal-justificacion").modal("hide")
                            //refrescar_movimientos_caja()
                            if (res.respuesta == 'ok') { 
                                refrescar_movimientos_caja()
                                toastr.success('Se elimino correctamente el movimiento','Confirmacion',{timeOut: 5000})
                            }else{
                                toastr.error('No se pudo eliminar correctamente el movimiento','Error',{timeOut: 5000})
                            } 
                        })
                    break;
                case "CAJ_COMPROBANTE_PAGO":
                    var Justificacion = $("#txtJustificacion").val() 
                    var id_ComprobantePago = id_Movimiento
                    parametros = {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        credentials: 'same-origin',
                        body: JSON.stringify({
                            id_ComprobantePago,
                            Justificacion
                        })
                    }
                    fetch(URL + '/movimientos_caja_api/eliminar_movimiento', parametros)
                        .then(req => req.json())
                        .then(res => {
                            $("#modal-justificacion").modal("hide")
                            //refrescar_movimientos_caja()
                            if (res.respuesta == 'ok') { 
                                refrescar_movimientos_caja()
                                toastr.success('Se elimino correctamente el comprobante','Confirmacion',{timeOut: 5000})
                            }else{
                                toastr.error('No se pudo eliminar correctamente el comprobante','Error',{timeOut: 5000})
                            } 
                        })
                    break;
                case "ALM_ALMACEN_MOV": 
                    var Id_AlmacenMov = id_Movimiento
                    parametros = {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        credentials: 'same-origin',
                        body: JSON.stringify({
                            Id_AlmacenMov
                        })
                    }
                    fetch(URL + '/movimientos_caja_api/eliminar_movimiento_almacen', parametros)
                        .then(req => req.json())
                        .then(res => {
                            $("#modal-justificacion").modal("hide")
                            //refrescar_movimientos_caja()
                            if (res.respuesta == 'ok') { 
                                refrescar_movimientos_caja()
                                toastr.success('Se elimino correctamente el movimiento','Confirmacion',{timeOut: 5000})
                            }else{
                                toastr.error('No se pudo eliminar correctamente el movimiento','Error',{timeOut: 5000})
                            } 
                        })
                    break;

            }


            
        }
    }
}

 function refrescar_movimientos_caja(){
    H5_loading.show();
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        })
    }
    fetch(URL+'/movimientos_caja_api/get_movimientos', parametros)
        .then(req => req.json())
        .then(res => {
            if (res.respuesta == 'ok') {

                VerTabCaja(res.arqueo!=null?res.arqueo.Flag_Cerrado:true,res.data.movimientos,res.data.saldos)
            }
            else
                VerTabCaja([])
            H5_loading.hide()
        }) 
}


module.exports = function movimientos_caja(ctx, next) {
    H5_loading.show();
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        })
    }
    fetch(URL+'/movimientos_caja_api/get_movimientos', parametros)
        .then(req => req.json())
        .then(res => {
            if (res.respuesta == 'ok') {
                Ver(res.arqueo!=null?res.arqueo.Flag_Cerrado:true,res.data.movimientos,res.data.saldos)
            }
            else
                Ver([])
            H5_loading.hide()
        })
    next();
}

module.exports.refrescar_movimientos = function refrescar_movimientos(){
    refrescar_movimientos_caja()
}