var empty = require('empty-element');
var yo = require('yo-yo');
import { ListarCajas } from './listar'

function Ver(_escritura, sucursales, usuarios, cuentas_contables, caja, documentos, productos) {

    var el = yo`
    <div>
            <div class="modal modal-danger fade" id="modal-danger" style="display: none;">
            <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span></button>
                <h4 class="modal-title">¿Esta seguro que desea eliminar este usuario?</h4>
                </div>
                <div class="modal-body">
                <p>Al eliminar el usuario se perderan todos los datos.</p>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-outline pull-left" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-outline" id="btnEliminar" data-dismiss="modal">Eliminar</button>
                </div>
            </div>
            <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <div class="modal fade" id="modal-buscar-responsable" style="display: none;">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                       
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span></button>
                        <h4 class="modal-title">Usuario o vendedor responsable</h4>
                    </div>
                    <div class="modal-body">
                        <div class="box box-primary">
                            <div class="box-header with-border">
                            <h3 class="box-title">Busqueda de usuario</h3>
                            </div>
                            <!-- /.box-header -->
                            <!-- form start -->
                            <form role="form">
                                <div class="box-body">
                                
                                    <label for="Cod_UsuarioCajero">Ingrese codigo o nombre de usuario</label>
                                    <div class="input-group">
                                        <div class="input-group-btn">
                                            <button type="button" class="btn btn-primary" onclick="${()=> BusquedaDeUsuario()}">Buscar</button>
                                        </div>
                                        <input type="text" class="form-control" id="txtBuscarUsuario" onkeypress="${()=> BusquedaDeUsuario()}">
                                    </div>
                                    <br>
                                    <div class="table-responsive" id="contenedorTablaUsuarios">
                                        
                                    </div>
                                </div>
                            </form>
                            
                        </div>
                    </div>
                    
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="modal-nuevo-editar-documento" style="display: none;">
            
        </div>
        <section class="content-header">
            <h1>
                Cajas
                <small>Control cajas</small>
            </h1>
            <ol class="breadcrumb">
                <li>
                    <a href="#">
                        <i class="fa fa-cog"></i> Configuracion</a>
                </li>
                <li><a  onclick=${() => ListarCajas(_escritura)} href="#">
                Cajas</a></li>
                <li class="active">${caja ? 'Editar' : 'Nuevo'}</li>
            </ol>
        </section>
        <section class="content">
            <div class="box">
                <div class="box-header">
                    <a onclick=${() => ListarCajas(_escritura)}
                    class="btn btn-xs btn-warning">
                        <i class="fa fa-arrow-left"></i> Atras</a>
                    
                    
                </div>
                <!-- /.box-header -->
                <div class="box-body">
                    <div class="box box-primary">
                        <div class="box-header with-border">
                            <h3 class="box-title">Nueva Caja</h3>
                        </div>
                        <!-- form start -->
                        <div role="form">
                            <div class="box-body">
                                <div class="row">
                                    ${caja ? yo`` : yo`<div class="col-sm-6">
                                    <div class="form-group">
                                        <label for="Cod_Caja">Codigo Caja</label>
                                        <input type="text" style="text-transform:uppercase" class="form-control" id="Cod_Caja" placeholder="Ingrese codigo caja" >
                                    </div>
                                </div>`}
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="Flag_Activo"></label>
                                            
                                            <div class="checkbox">
                                                <label>
                                                    <input type="checkbox" id="Flag_Activo" checked="${caja ? caja.Flag_Activo : 0}"> Es Activo?
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="Des_Caja">Nombre de la Caja</label>
                                            <input type="text"  style="text-transform:uppercase" class="form-control" id="Des_Caja" placeholder="Ingrese Nombre de caja" value="${caja ? caja.Des_Caja : ''}">
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="Cod_Sucursal">Sucursal a la que pertence</label>
                                            <select id="Cod_Sucursal" class="form-control">
                                                ${sucursales.map(e => yo`<option style="text-transform:uppercase" value="${e}" ${caja ? caja.Cod_Sucursal == e ? 'selected' : '' : ''}>${e}</option>`)}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <label for="Cod_UsuarioCajero">Usuario o vendedor responsable</label>
                                        <div class="input-group">
                                            <div class="input-group-btn">
                                                <button type="button" class="btn btn-info" data-toggle="modal" data-target="#modal-buscar-responsable">Buscar responsable</button>
                                            </div>
                                            <input type="text" class="form-control" id="Cod_Usuario" disabled>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="Cod_CuentaContable">Cuenta Contable</label>
                                            <select id="Cod_CuentaContable" class="form-control select2">
                                                ${sucursales.map(e => yo`<option style="text-transform:uppercase" value="${e.Cod_CuentaContable}" ${caja ? caja.Cod_Sucursal == e ? 'selected' : '' : ''}>${e}</option>`)}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                ${caja != undefined ? yo`
                                    <div class="row">
                                            <div class="col-sm-12">
                                                <div class="nav-tabs-custom">
                                                    <ul class="nav nav-tabs">
                                                        <li class="active">
                                                            <a href="#tab_1" data-toggle="tab" aria-expanded="true">
                                                                <i class="fa fa-file"></i> Documentos Relacionados</a>
                                                        </li>
                                                        <li class="">
                                                            <a href="#tab_2" data-toggle="tab" aria-expanded="false">
                                                                <i class="fa fa-star"></i> Productos Favoritos</a>
                                                        </li>
                                                    </ul>
                                                    <div class="tab-content">
                                                        <div class="tab-pane active" id="tab_1">
                                                            <div class="box-header">
                                                                <a class="btn btn-info pull-right" data-toggle="modal" data-target="#modal-nuevo-editar-documento" onclick="${()=>AgregarDocumento(_escritura, sucursales, usuarios, cuentas_contables,caja)}">
                                                                <i class="fa fa-plus"></i> Agregar</a>
                                                            </div>
                                                            <div class="table-responsive">
                                                                <table class="table table-bordered table-striped">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Item</th>
                                                                            <th>Documento</th>
                                                                            <th>Serie</th>
                                                                            <th>Impresora</th>
                                                                            <th>Imprimir</th>
                                                                            <th>Nombre Archivo</th>
                                                                            <th>Rapida</th>
                                                                            <th>Ticketera</th>
                                                                            <th>Acciones</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        ${documentos.map(u => yo`
                                                                        <tr>
                                                                            <td>${u.Item}</td>
                                                                            <td>${u.Nom_TipoComprobante}</td>
                                                                            <td>${u.Serie}</td>
                                                                            <td>${u.Impresora}</td>
                                                                            <td>${u.Flag_Imprimir}</td>
                                                                            <td>${u.Nom_Archivo}</td>
                                                                            <td>${u.Flag_FacRapida}</td>
                                                                            <td>${u.Nro_SerieTicketera}</td>
                                                                            <td>
                                                                                ${_escritura ? yo`<button class="btn btn-xs btn-success" data-toggle="modal" data-target="#modal-nuevo-editar-documento" onclick="${()=>AgregarDocumento(_escritura, sucursales, usuarios, cuentas_contables,caja, u)}"><i class="fa fa-edit"></i></button>` : yo``}
                                                                                ${_escritura ? yo`<button class="btn btn-xs btn-danger" data-toggle="modal" data-target="#modal-danger" onclick="${()=>EliminarDocumento(_escritura, sucursales, usuarios, cuentas_contables,caja, u)}"><i class="fa fa-trash"></i></button>` : yo``}
                                                                                
                                                                            </td>
                                                                        </tr>`)}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                        <!-- /.tab-pane -->
                                                        <div class="tab-pane" id="tab_2">
                                                            <div class="box-header">
                                                                <a class="btn btn-info pull-right">
                                                                <i class="fa fa-plus"></i> Agregar</a>
                                                            </div>
                                                            <div class="table-responsive">
                                                                <table class="table table-bordered table-striped">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Producto</th>
                                                                            <th>Almacen</th>
                                                                            <th>Unidad Medida</th>
                                                                            <th>Precio</th>
                                                                            <th>Stock</th>
                                                                            <th>Acciones</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        ${productos.map(u => yo`
                                                                        <tr>
                                                                            <td>${u.Nom_Producto}</td>
                                                                            <td>${u.Des_Almacen}</td>
                                                                            <td>${u.Nom_UnidadMedida}</td>
                                                                            <td>${u.Valor}</td>
                                                                            <td>${u.Stock_Act}</td>
                                                                            <td>
                                                                                ${_escritura ? yo`<button class="btn btn-xs btn-success" onclick="${()=>NuevoUsuario(_escritura, _estados, _perfiles, u)}"><i class="fa fa-edit"></i></button>` : yo``}
                                                                                ${_escritura ? yo`<button class="btn btn-xs btn-danger" data-toggle="modal" data-target="#modal-danger" onclick="${()=>EliminarUsuario(_escritura, u)}"><i class="fa fa-trash"></i></button>` : yo``}
                                                                                
                                                                            </td>
                                                                        </tr>`)}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- /.tab-content -->
                                                </div>
                                            </div>
                                        
                                        </div>    
                                    `: yo``}
                                
                            </div>
                            <!-- /.box-body -->
                
                            
                        </div>
                        <div class="box-footer">
                                <button onclick="${() => Guardar(_escritura, caja)}" class="btn btn-primary">Guardar</button>
                            </div>
                    </div>
                </div>
            </div>
        </section>
    </div>`
    var main = document.getElementById('main-contenido');
    empty(main).appendChild(el);
    // $('.select2').select2();
}

var impresoras = [
    'Microsoft XSP Document Writer',
    'Microsoft Print to PDF',
    'Fax',
    'Enviar a OneNote 2013',
    'BIXOLON SPP R310',
    'EPSON TM-T20II'
]

function VerAgregarDocumento(_escritura, sucursales, usuarios, cuentas_contables, caja, comprobantes, documento){
    console.log(documento)
    var el = yo`<div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span></button>
                        <h4 class="modal-title">Documentos de una caja</h4>
                    </div>
                    <div class="modal-body">
                        <div class="box box-primary">
                            <div class="box-header with-border">
                            <h3 class="box-title">ADMINISTRACION</h3>
                            </div>
                            <!-- /.box-header -->
                            <!-- form start -->
                            <form role="form">
                                <div class="box-body">
                                    <div class="row">
                                        <div class="col-sm-6">
                                        <div class="form-group">
                                            <label>Comprobante</label>
                                            <select class="form-control" id="Cod_TipoComprobante">
                                                ${comprobantes.map(u => yo`<option value="${u.Cod_TipoComprobante}" ${documento?documento.Cod_TipoComprobante==u.Cod_TipoComprobante?'selected':'':''}>${u.Nom_TipoComprobante}</option>`)}
                                            </select>
                                        </div>                
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label for="Serie">Serie</label>
                                                <input type="text" class="form-control" id="Serie" placeholder="Serie" value="${documento?documento.Serie:''}">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-6"> 
                                            <div class="checkbox form-group">
                                                <label>
                                                <input type="checkbox" id="Flag_Imprimir" ${documento?documento.Flag_Imprimir?'checked':'':''}><b> Se imprime?</b>
                                                </label>
                                                <select class="form-control" id="Impresora">
                                                    ${impresoras.map(u=>yo`<option value="${u}" ${documento? u==documento.Impresora?'selected':'':''}>${u}</option>`)}
                                                </select>
                                            </div>       
                                        </div>
                                       
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label for="Nom_Archivo">Documento *.rpt</label>
                                                <input type="file" id="Nom_Archivo">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label for="Nom_ArchivoPublicar">Publicar Web *.rpt</label>
                                                <input type="file" id="Nom_ArchivoPublicar">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-6">  
                                            <div class="form-group">
                                                <label for="Nro_SerieTicketera">Nro. de Serie</label>
                                                <input type="email" class="form-control" id="Nro_SerieTicketera" placeholder="Nro. de Serie" value="${documento?documento.Nro_SerieTicketera:''}">
                                                <p class="help-block">Solo en caso de tener un Tiketera</p>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                        <label for="Flag_Activo"></label>
                                            <div class="checkbox">
                                                <label>
                                                <input type="checkbox" id="Flag_FacRapida" ${documento?documento.Flag_FacRapida?'checked':'':''}><b> Documento de facturacion rapida</b>
                                                </label>
                                            </div>  
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div class="box-footer">
                                <button onclick="${() => GuardarDocumento(_escritura, sucursales, usuarios, cuentas_contables, caja, documento)}" data-dismiss="modal" class="btn btn-primary">Guardar</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>`

    var modal_nuevo_editar_documento = document.getElementById('modal-nuevo-editar-documento')
    empty(modal_nuevo_editar_documento).appendChild(el)
}

function EliminarDocumento(_escritura, sucursales, usuarios, cuentas_contables,caja, u){
    var btnEliminar = document.getElementById('btnEliminar')
    btnEliminar.addEventListener('click', function Eliminar(ev) {
        H5_loading.show();
        var Cod_Caja = caja.Cod_Caja
        var Item = u.Item
        const parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Cod_Caja,
                Item,
            })
        }
        fetch('/cajas_api/eliminar_documento', parametros)
            .then(req => req.json())
            .then(res => {
                
                if (res.respuesta == 'ok') {
                    NuevaCaja(_escritura, sucursales, usuarios, cuentas_contables,caja)
                    this.removeEventListener('click', Eliminar)
                }
                else{
                    this.removeEventListener('click', Eliminar)
                }
                H5_loading.hide()
            })
    })
}

function GuardarDocumento(_escritura, sucursales, usuarios, cuentas_contables, caja, documento){
    var Cod_Caja = caja.Cod_Caja
    var Item = documento?documento.Item:0
    var Cod_TipoComprobante = document.getElementById('Cod_TipoComprobante').value
    var Serie = document.getElementById('Serie').value
    var Impresora = document.getElementById('Impresora').value
    var Flag_Imprimir = document.getElementById('Flag_Imprimir').checked?'1':'0'
    var Flag_FacRapida = document.getElementById('Flag_FacRapida').checked?'1':'0'
    var Nom_Archivo = document.getElementById('Nom_Archivo').files[0]!=undefined? document.getElementById('Nom_Archivo').files[0].name: ''
    var Nro_SerieTicketera = document.getElementById('Nro_SerieTicketera').value
    var Nom_ArchivoPublicar = document.getElementById('Nom_ArchivoPublicar').files[0]!=undefined? document.getElementById('Nom_ArchivoPublicar').files[0].name:''
    var Limite = 0
    var Cod_Usuario = "ADMINISTRADOR"


    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Cod_Caja,
            Item,
            Cod_TipoComprobante,
            Serie,
            Impresora,
            Flag_Imprimir,
            Flag_FacRapida,
            Nom_Archivo,
            Nro_SerieTicketera,
            Nom_ArchivoPublicar,
            Limite,
            Cod_Usuario
        })
    }
    fetch('/cajas_api/guardar_documento', parametros)
        .then(req => req.json())
        .then(res => {
            if (res.respuesta == 'ok') {
                NuevaCaja(_escritura, sucursales, usuarios, cuentas_contables,caja)
            }
            else{
                console.log('Error')
            }
        })
}

function AgregarDocumento(_escritura, sucursales, usuarios, cuentas_contables, caja, documento){

    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
    }
    fetch('/cajas_api/get_comprobantes', parametros)
    .then(req => req.json())
    .then(res => {
        if (res.respuesta == 'ok') {
            var comprobantes = res.data.comprobantes
            
            if(documento == undefined) 
                VerAgregarDocumento(_escritura, sucursales, usuarios, cuentas_contables,caja, comprobantes)
            else
                VerAgregarDocumento(_escritura, sucursales, usuarios, cuentas_contables,caja, comprobantes, documento)

        }else{
            console.log("ERR")
        }
    })
}

function BusquedaDeUsuario(){
    var txtBuscarUsuario = document.getElementById("txtBuscarUsuario").value
    if(txtBuscarUsuario.length >= 3){
        const parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                TamanoPagina: '20',
                NumeroPagina: '0',
                ScripOrden: ' ORDER BY Cod_Usuarios asc',
                ScripWhere: txtBuscarUsuario
            })
        }
        fetch('/cajas_api/buscar_usuarios', parametros)
        .then(req => req.json())
        .then(res => {
            if (res.respuesta == 'ok') {
                var usuarios = res.data.usuarios
                if(usuarios.length > 0)
                    AgregarTabla(usuarios)
                else  
                    empty(document.getElementById('contenedorTablaUsuarios'));
            }
            else
                empty(document.getElementById('contenedorTablaUsuarios'));
        })
    }else{
        empty(document.getElementById('contenedorTablaUsuarios'));
    }
}

function AgregarTabla(usuarios){
    var el = yo`<table id="example1" class="table table-bordered table-striped">
    <thead>
        <tr>
            <th>Codigo</th>
            <th>Nombre</th>
            <th>Accion</th>
        </tr>
    </thead>
    <tbody>
        ${usuarios.map(u => yo`
        <tr>
            <td>${u.Cod_Usuarios}</td>
            <td>${u.Nick}</td>
            <td><button class="btn btn-xs btn-primary" data-dismiss="modal" onclick="${()=>SeleccionarUsuario(u)}"><i class="fa fa-check"></i> Elegir</button></td>
        </tr>`)}
    </tbody>

</table>`
    empty(document.getElementById('contenedorTablaUsuarios')).appendChild(el);
}

function SeleccionarUsuario(usuario){
    var Cod_Usuario = document.getElementById('Cod_Usuario')
    Cod_Usuario.value = usuario.Cod_Usuarios + " - " + usuario.Nick
}



function NuevaCaja(_escritura, sucursales, usuarios, cuentas_contables, caja) {
    if (caja != undefined) {
        H5_loading.show();
        const parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Cod_Caja:caja.Cod_Caja })
        }
        fetch('/cajas_api/get_documents_by_caja', parametros)
            .then(req => req.json())
            .then(res => {
                if (res.respuesta == 'ok') {
                    Ver(_escritura, sucursales, usuarios, cuentas_contables, caja, res.data.documentos, res.data.productos)
                }
                else {
                    console.log('Error')
                }
                H5_loading.hide();
            })
    } else Ver(_escritura, sucursales, usuarios, cuentas_contables, caja, [], [])
}
export { NuevaCaja }