var empty = require('empty-element');
var yo = require('yo-yo');
import { URL } from '../../../constantes_entorno/constantes'
import { NuevoCliente, BuscarCliente, BuscarProducto,Buscar } from '../../modales'
import { BloquearControles,getObjectArrayJsonVentas, changeArrayJsonVentas, deleteElementArrayJsonVentas } from '../../../../utility/tools'
import { ComprobantePago } from '../../mod_compras/comprobante_pago'


var cantidad_tabs = 1
var IdTabSeleccionado = null

//var Total = 0
//var TotalDescuentos = 0
//var TipodeCambio = 1
//var _CantidadOriginal = null
//var SimboloMoneda = ''
//var SimboloMonedaExtra = ''

global.variablesVentas = []

function VerNuevaVenta(variables,CodLibro) {
    cantidad_tabs++
    const idTabVenta = cantidad_tabs
    global.objClienteVenta = ''
    global.objProductoVentas = ''
    global.variablesVentas.push({idTab:idTabVenta,Total:0,TotalDescuentos:0,TipodeCambio:1,_CantidadOriginal:null,SimboloMoneda:'',SimboloMonedaExtra:'',Cliente:null,Detalles:null})
    var tab = yo`
        <li class="" onclick=${()=>TabVentaSeleccionado(idTabVenta)}><a href="#tab_${idTabVenta}" data-toggle="tab" aria-expanded="false" id="id_${idTabVenta}">Ventas <button type="button" class="close" onclick=${()=>CerrarTabVenta(idTabVenta)}><span aria-hidden="true"> ×</span></button></a></li>`

    var tabContent = yo`
        <div class="tab-pane" id="tab_${idTabVenta}">
            <div class="row">
                <div class="col-md-3">
                    <div class="box box-success box-solid">
                        <div class="box-header with-border text-center">
                            <h4>Datos del cliente</h4>
                        </div>
                        <div class="box-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <select class="form-control" id="Cod_TipoDoc_${idTabVenta}">
                                            ${variables.documentos.map(e=>yo`<option style="text-transform:uppercase" value="${e.Cod_TipoDoc}">${e.Nom_TipoDoc}</option>`)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <input type="text" id="Nro_Documento_${idTabVenta}" onblur="${() => BuscarClienteDoc(CodLibro,idTabVenta)}" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Nombres completos</label>
                                        <div class="input-group">
                                            <div class="input-group-btn">
                                                <button type="button" id="AgregarCliente" class="btn btn-success" onclick=${()=>NuevoCliente(variables.documentos)}>
                                                    <i class="fa fa-plus"></i>
                                                </button>
                                            </div>
                                            <input type="text" id="Cliente_${idTabVenta}" class="form-control" data-id=null>
                                            <div class="input-group-btn">
                                                <button type="button" id="BuscarCliente" class="btn btn-info" onclick=${()=>BuscarCliente("Cliente_"+idTabVenta,"Nro_Documento_"+idTabVenta,null)}>
                                                    <i class="fa fa-search"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p></p>
                            <div class="row">
                                <div class="col-md-12"> 
                                    <div class="form-group">
                                        <label>Direccion</label>
                                        <input type="text" class="form-control" id="Direccion_${idTabVenta}">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="box-footer">

                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="box box-default">
                                        <div class="box-header">
                                            <h4> Monedas </h4>
                                        </div>
                                        <div class="box-body"> 
                                                <div class="cc-selector-2 text-center row" id="divMonedas_${idTabVenta}" >
                                                    ${variables.formaspago.map(e=>yo`
                                                        ${e.Cod_FormaPago=="008"?
                                                            variables.monedas.map(m=>
                                                                m.Cod_Moneda!="PEN"?
                                                                m.Cod_Moneda!="USD"?
                                                                m.Cod_Moneda!="EUR"?
                                                                yo``
                                                                :
                                                                yo`
                                                                <div class="row">
                                                                    <div class="col-md-12">
                                                                        <input type="radio" name="Cod_Moneda_Forma_Pago_${idTabVenta}" value="euros" onchange=${()=>CambioMonedaFormaPagoEuros(idTabVenta)}/>
                                                                        <label class="drinkcard-cc euros" for="Cod_Moneda_Forma_Pago_${idTabVenta}"></label>
                                                                    </div>
                                                                </div>`
                                                                :
                                                                yo`
                                                                <div class="row">
                                                                    <div class="col-md-12">
                                                                        <input type="radio" name="Cod_Moneda_Forma_Pago_${idTabVenta}" value="dolares" onchange=${()=>CambioMonedaFormaPagoDolares(idTabVenta)}/>
                                                                        <label class="drinkcard-cc dolares" for="Cod_Moneda_Forma_Pago_${idTabVenta}"></label>
                                                                    </div>
                                                                </div>`
                                                                :
                                                                yo`
                                                                <div class="row">
                                                                    <div class="col-md-12">
                                                                        <input type="radio" name="Cod_Moneda_Forma_Pago_${idTabVenta}" value="soles" checked="checked" onchange=${()=>CambioMonedaFormaPagoSoles(idTabVenta)}/>
                                                                        <label class="drinkcard-cc soles" for="Cod_Moneda_Forma_Pago_${idTabVenta}"></label>
                                                                    </div>
                                                                </div>`
                                                            )
                                                        :
                                                        yo``
                                                        }
                                                    `)}
                                                    
                                                    <div class="row">
                                                        <div class="col-md-8">
                                                            <div class="form-group">
                                                                <label>Tipo Cambio</label>
                                                                <input type="number" class="form-control" value="1.00" id="Tipo_Cambio_Venta_${idTabVenta}" name="Tipo_Cambio_Venta_${idTabVenta}" onkeypress=${()=>CambioTipoCambioVenta(idTabVenta)}>
                                                            </div> 
                                                        </div>
                                                    </div>

                                                </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="box box-default">
                                        <div class="box-header">
                                            <h4> Tarjetas </h4>
                                        </div>
                                        <div class="box-body">
                                                <div class="cc-selector-2 text-center row" id="divTarjetas_${idTabVenta}"> 
                                                    ${variables.formaspago.map(e=>yo`
                                                        ${  e.Cod_FormaPago!="005"?
                                                            e.Cod_FormaPago!="006"?
                                                            yo``
                                                            :
                                                            yo`
                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                    <input  checked="checked" id="Cod_FormaPago_MasterCard_${idTabVenta}" type="radio" name="Cod_FormaPago_Modal_${idTabVenta}" value="mastercard"  onchange=${()=>CambioMonedaFormaPagoMasterCard(idTabVenta)}/>
                                                                    <label class="drinkcard-cc mastercard" for="Cod_FormaPago_Modal_${idTabVenta}"></label>
                                                                </div>
                                                            </div>`
                                                            :
                                                            yo`
                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                    <input  checked="checked" id="Cod_FormaPago_Visa_${idTabVenta}" type="radio" name="Cod_FormaPago_Modal_${idTabVenta}" value="visa" onchange=${()=>CambioMonedaFormaPagoVisa(idTabVenta)}/>
                                                                    <label class="drinkcard-cc visa" for="Cod_FormaPago_Modal_${idTabVenta}"></label>
                                                                </div>
                                                            </div>`
                                                        }
                                                    `)}

                                                    ${variables.formaspago.map(e=>yo`
                                                        ${  e.Cod_FormaPago=="005"?
                                                            yo`
                                                            <div class="row">
                                                                <div class="col-md-8">
                                                                    <div class="form-group">
                                                                        <label>Nro Ref.</label>
                                                                        <input type="number" class="form-control" value="" id="Nro_Tarjeta_${idTabVenta}" name="Nro_Tarjeta_${idTabVenta}">
                                                                    </div> 
                                                                </div>
                                                            </div>`
                                                            :
                                                            yo``
                                                        }
                                                    `)}
                                                     
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="box box-success box-solid">
                        <div class="box-header with-border text-center">
                            <h4>Detalle de la venta</h4>
                        </div>
                        <div class="box-body">

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="col-md-8">
                                        <div class="form-group">
                                            <label>Codigo/Nombres Producto</label>
                                            <input type="text" class="form-control" id="txtBusqueda_${idTabVenta}" onblur=${()=>BuscarProductoCP(event,'blur',idTabVenta)} onkeypress=${()=>BuscarProductoCP(event,'key',idTabVenta)}>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label>Precio</label>
                                            <select class="form-control" id="Cod_Precio_${idTabVenta}">
                                                ${variables.precios.map(e=>yo`<option style="text-transform:uppercase" value="${e.Cod_Precio}">${e.Nom_Precio}</option>`)}
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label>Almacen</label>
                                            <select class="form-control" id="Cod_Almacen_${idTabVenta}">
                                                ${variables.almacenes.map(e=>yo`<option style="text-transform:uppercase" value="${e.Cod_Almacen}">${e.Des_Almacen}</option>`)}
                                            </select>
                                        </div>
                                    </div> 
                                </div>
                            </div> 
                            
                            <div class="row">
                                <div class="col-md-12">
                                
                                <table class="table table-bordered table-hover">
                                    <thead>
                                        <tr> 
                                            <th>Codigo</th>
                                            <th>Producto</th>
                                            <th>Cantidad</th>
                                            <th>Precio Unitario</th>
                                            <th>Descuento(%)</th>
                                            <th>SubTotal</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    
                                    <tfoot>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td><button class="btn btn-default btn-lg" id="btnDescuentos_${idTabVenta}" style="display:none"><i class="fa fa-arrow-circle-down text-red"></i>TOTAL DESCUENTOS: 0.00</button></td>
                                            <td><button class="btn btn-default btn-lg" id="btnTotal_${idTabVenta}" data-toggle="button" aria-pressed="false" autocomplete="off" onclick=${()=>VerVuelto(variables,idTabVenta)}><i class="fa fa-money text-green"></i></button></td>
                                            <td><button class="btn btn-default btn-lg" id="btnConversion_${idTabVenta}" style="display:none"><i class="fa fa-refresh text-green"></i></button></td>
                                        </tr>
                                    </tfoot>

                                    <tbody id="tablaBodyProductosVentas_${idTabVenta}">
                                    </tbody> 
                                </table>
                                
                                </div>
                                                        
                            </div>
                            

                        </div>
                        <div class="box-footer" id="divFooter_${idTabVenta}">
                            <div class="row"> 
                                
                                <div class="col-md-12">
                                    <div class="box box-warning">
                                        <div class="box-header with-border">
                                            <h3 class="box-title"><i class="fa fa-star text-orange"></i> Favoritos</h3>
                                        </div>
                                        <div class="box-body" id="divFavoritos_${idTabVenta}">
                                            ${CrearBotonesFavoritos(variables.favoritos,idTabVenta)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="box box-warning">
                                        <div class="box-header with-border">
                                            <h3 class="box-title" style="margin-left:20px">Productos</h3>
                                            
                                            <div class="box-tools" style="left: 10px;display:none" id="divTools_${idTabVenta}">
                                                <button type="button" class="btn btn-box-tool" onclick=${()=>CrearBotonesCategoriasXSeleccion(variables.categorias,'',idTabVenta)}><i class="fa fa-arrow-left"></i></button>
                                            </div>

                                        </div>
                                        <div class="box-body" id="divProductos_${idTabVenta}">
                                            ${CrearBotonesCategorias(variables.categorias,idTabVenta)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    
    $("#tabs").append(tab)
    $("#tabs_contents").append(tabContent)
    $("#id_"+idTabVenta).click()
    TraerSimboloSOLES(variables.monedas,'PEN',idTabVenta)
    CambioMonedaFormaPagoSoles(idTabVenta)
    CambioMonedaFormaPagoDolares(idTabVenta)
    CambioMonedaFormaPagoEuros(idTabVenta)
    CambioMonedaFormaPagoMasterCard(idTabVenta)
    CambioMonedaFormaPagoVisa(idTabVenta)

    

    $('#modal-superior').on('hidden.bs.modal', function () {

        if(global.objProductoVentas!='' && global.objProductoVentas){
            $("#txtBusqueda_"+IdTabSeleccionado).val("")

            ValidarStock(global.objProductoVentas.Stock_Act,global.objProductoVentas,IdTabSeleccionado,function(flag){
                if(flag){
                    ExisteProducto(global.objProductoVentas.Cod_Producto,IdTabSeleccionado,function(flag,index){
                        if(flag){
                            $('#tablaBodyProductosVentas_'+IdTabSeleccionado+' tr:eq('+ index + ')').find('td.Cantidad').find('input').val((parseFloat($('#tablaBodyProductosVentas_'+IdTabSeleccionado+' tr:eq('+ index + ')').find('td.Cantidad').find('input').val())+1).toFixed(2))
                            $('#tablaBodyProductosVentas_'+IdTabSeleccionado+' tr:eq('+ index + ')').find('td.Precio').text((parseFloat($('#tablaBodyProductosVentas_'+IdTabSeleccionado+' tr:eq('+ index + ')').find('td.Cantidad').find('input').val())*parseFloat(global.objProductoVentas.Precio_Venta)).toFixed(2))
                            $('#tablaBodyProductosVentas_'+IdTabSeleccionado+' tr:eq('+ index + ')').find('td.DescuentoTotal').text((parseFloat($('#tablaBodyProductosVentas_'+IdTabSeleccionado+' tr:eq('+ index + ')').find('td.DescuentoUnitario').text())*parseFloat($('#tablaBodyProductosVentas_'+IdTabSeleccionado+' tr:eq('+ index + ')').find('td.Cantidad').find('input').val())).toFixed(2))
                        }else{
                            var idFila = $('#tablaBodyProductosVentas_'+IdTabSeleccionado+' > tr').length
                            var fila = yo`
                            <tr id="${idFila+''+IdTabSeleccionado}">
                                <td class="Cod_Producto">${global.objProductoVentas.Cod_Producto}</td> 
                                <td class="Flag_Stock hidden">${global.objProductoVentas.Flag_Stock}</td> 
                                <td class="Nom_Producto" style="width: 30%;">${global.objProductoVentas.Nom_Producto}</td> 
                                <td class="Cantidad"><input type="number" class="form-control input-sm" value="1.0000" onblur=${()=>FocusInOutCantidadVenta(idFila+''+IdTabSeleccionado,IdTabSeleccionado)} onchange=${()=>CambioCantidadVenta(idFila+''+IdTabSeleccionado,IdTabSeleccionado)}></td>
                                <td class="Unitario hidden">${global.objProductoVentas.Precio_Venta}</td>
                                <td class="UnitarioBase"><input type="number" class="form-control input-sm" value=${global.objProductoVentas.Precio_Venta} onchange=${()=>CambioPrecioDescuentos(idFila+''+IdTabSeleccionado,IdTabSeleccionado)}></td> 
                                <td class="Descuentos"><input type="number" class="form-control input-sm" value="0.00" onchange=${()=>CambioPrecioDescuentos(idFila+''+IdTabSeleccionado,IdTabSeleccionado)}></td>
                                <td class="DescuentoUnitario hidden">0</td> 
                                <td class="DescuentoTotal hidden">0</td> 
                                <td class="Precio">${global.objProductoVentas.Precio_Venta}</td>
                                <td>
                                    <div style="display:flex;"> 
                                        <button type="button" onclick="${()=>EliminarFila(idFila+''+IdTabSeleccionado,IdTabSeleccionado)}" class="btn btn-danger btn-sm"><i class="fa fa-trash"></i></button>
                                    </div>
                                </td>
                            </tr>`
                            $('#tablaBodyProductosVentas_'+IdTabSeleccionado).append(fila)
                        }
                        CalcularTotal(IdTabSeleccionado)
                        CalcularTotalDescuentos(IdTabSeleccionado)
                    })
                   
                    
                }else{
                    toastr.error('No existe stock para dicho producto','Error',{timeOut: 5000})  
                }
            })

        }


        if(global.objClienteVenta!='' && global.objClienteVenta){
            changeArrayJsonVentas(global.variablesVentas,IdTabSeleccionado,[null,null,null,null,null,null,global.objClienteVenta,null])
        }


    })

    $("#modal-superior").on("shown.bs.modal", function () { 
        //console.log("modal show")
        $("#chbSoloProductoStock").prop("checked",false)
        $("#divSoloProductoStock").css("display","none")
        $("#Cod_Categoria").css("display","block")
        $("#lbCod_Categoria").css("display","block")
        $("#Cod_Categoria").val("01")
        $("#Cod_Precio").val($("#Cod_Precio_"+IdTabSeleccionado).val())
        Buscar()
   
    });

    IdTabSeleccionado = idTabVenta
}

function CrearDivFavoritos(variables,idTab){
    var div = yo`
                <div>
                    <div class="row">              
                        <div class="col-md-12">
                            <div class="box box-warning">
                                <div class="box-header with-border">
                                    <h3 class="box-title"><i class="fa fa-star text-orange"></i> Favoritos</h3>
                                </div>
                                <div class="box-body" id="divFavoritos_${idTab}">
                                    ${CrearBotonesFavoritos(variables.favoritos,idTab)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="box box-warning">
                                <div class="box-header with-border">
                                    <h3 class="box-title" style="margin-left:20px">Productos</h3>
                                    
                                    <div class="box-tools" style="left: 10px;display:none" id="divTools_${idTab}">
                                        <button type="button" class="btn btn-box-tool" onclick=${()=>CrearBotonesCategoriasXSeleccion(variables.categorias,'',idTab)}><i class="fa fa-arrow-left"></i></button>
                                    </div>

                                </div>
                                <div class="box-body" id="divProductos_${idTab}">
                                    ${CrearBotonesCategorias(variables.categorias,idTab)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
    var divFV = document.getElementById('divFooter_'+idTab);
    empty(divFV).appendChild(div);
}

function CrearDivVuelto(idTab){
    var div = yo` 
                    <div class="row">              
                        <div class="col-md-4 col-md-offset-4">
                            <div class="box box-success">
                                <div class="box-header with-border">
                                    <h3 class="box-title">Vuelto Ideal</h3>
                                </div>
                                <div class="box-body">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label><h4 id="lbVuelto_${idTab}" style="font-weight: bold;">Vuelto</h4></label>
                                                <input type="number" style="color: #dd4b39;font-weight: bold;font-size: 25px;" id="Vuelto_${idTab}" value="0.00" class="form-control" onblur=${()=>CalcularVueltoEspecial(idTab)}>
                                            </div>
                                        </div> 
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="col-md-4" id="divUSD_${idTab}">
                                                <div class="form-group">
                                                    <label style="font-weight: bold;" id="lbUSD_${idTab}">USD:</label>
                                                    <input type="text" style="color: #dd4b39;font-weight: bold;font-size: 25px;" value="0.00" id="USD_${idTab}" class="form-control" onkeypress=${()=>BloquearControles(event)} >
                                                </div> 
                                            </div>
                                            <div class="col-md-4" id="divTC_${idTab}"> 
                                                <label id="laCambio_${idTab}" style="margin-top: 30px;margin-left: -20px;">x T/C</label>
                                            </div>
                                            <div class="col-md-4" id="divPEN_${idTab}">
                                                <div class="form-group">
                                                    <label style="font-weight: bold;" id="lbPEN_${idTab}">PEN:</label>
                                                    <input type="text" style="color: #dd4b39;font-weight: bold;font-size: 25px;" value="0.00" id="PEN_${idTab}" class="form-control"  onkeypress=${()=>BloquearControles(event)} >
                                                </div> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="box box-success">
                                <div class="box-body">
                                    <div class="form-group">
                                        <label id="lbTotalCobrar_${idTab}" style="font-weight: bold;">Total a Cobrar</label>
                                        <input type="number" id="TotalCobrar_${idTab}" style="color: #1a2226;font-weight: bold;font-size: 25px;" value="0.00" class="form-control">
                                    </div> 
                                    <div class="form-group">
                                        <label id="lbTotalRecibidos_${idTab}" style="font-weight: bold;">Total Recibidos</label>
                                        <input type="number" id="TotalRecibidos_${idTab}"  style="color: #1a2226;font-weight: bold;font-size: 25px;" value="0.00" class="form-control" onblur=${()=>CalcularVuelto(idTab)} onkeypress=${()=>KeyCalcularVuelto(event,idTab)}>
                                    </div>
                                    <div style="height: 1px;background: #00a65a;"></div> 
                                    <p></p>
                                    <div class="form-group">
                                        <label id="lbVueltoCalculado_${idTab}" style="font-weight: bold;">Vuelto calculado</label>
                                        <input type="text" id="VueltoCalculado_${idTab}"  style="color: #1a2226;font-weight: bold;font-size: 25px;" value="0.00" class="form-control"  onkeypress=${()=>BloquearControles(event)} >
                                    </div>
                                    <div class="form-group">
                                        <button type="button" class="btn btn-success btn-xs" onclick=${()=>CalcularVuelto(idTab)}>Calcular</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> `
    var divFV = document.getElementById('divFooter_'+idTab);
    empty(divFV).appendChild(div);
    CalcularVuelto(idTab)
}


function CargarModalConfirmacion(idTab,_CodTipoComprobante){
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
                <p>Se ha introducido moneda extranjera pero\n\nno introdujo un total recibido.Desea continuar sin comprar moneda extranjera?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger pull-left" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" id="btnConfirmacion" onclick=${()=>AceptarConfirmacion(idTab,_CodTipoComprobante)}>Aceptar</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>`


    var modal_proceso = document.getElementById('modal-alerta');
    empty(modal_proceso).appendChild(el);
    $('#modal-alerta').modal()
}


function AceptarConfirmacion(idTab,_CodTipoComprobante){
    VentaSimpleSinME(idTab,_CodTipoComprobante)
}


function VerVuelto(variables,idTab){
    if($("#btnTotal_"+idTab).hasClass('active')){
        CrearDivFavoritos(variables,idTab)
    }else{
        CrearDivVuelto(idTab)
    }
}

function CrearBotonesProductos(c,idTab,callback){
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            CodCategoria:c.Cod_Categoria,
            CodAlmacen:$("#Cod_Almacen_"+idTab).val()
        })
    }
    fetch(URL + '/productos_serv_api/get_producto_by_codalm_codprec_stock', parametros)
        .then(req => req.json())
        .then(res => {
            if(res.respuesta=="ok"){
                var productos = res.data.productos
                callback(c,productos)
            }else{
                callback(c,[])
            }
    
        }) 
}

function CrearBotonesCategorias(categorias,idTab){
     
    return yo`<div>
            ${categorias.map(e=> 
                e.Cod_Padre==''?
                    yo`<a class="btn btn-app" onclick=${()=>SeleccionarCategoria(e,categorias,idTab)}>${e.Des_Categoria}</a>`
                :
                    yo``)}
            </div>` 
}


function CrearBotonesCategoriasXSeleccion(categorias,CodPadre,idTab){
     
    var listaProductos= yo`<div>
            ${categorias.map(e=> 
                e.Cod_Padre==CodPadre?
                    yo`<a class="btn btn-app" onclick=${()=>SeleccionarCategoria(e,categorias,idTab)}>${e.Des_Categoria.toString().replace('-->','')}</a>`
                :
                    yo``)}
            </div>`
    
    if(CodPadre==''){
        $("#divTools_"+idTab).css("display","none")
    }else{
        $("#divTools_"+idTab).css("display","block")
    }

    var divProductos = document.getElementById('divProductos_'+idTab);
    empty(divProductos).appendChild(listaProductos);
    
    
}


function CrearBotonesFavoritos(favoritos,idTab){
    return  yo`<div> 
                ${favoritos.map(e=>yo`<a class="btn btn-app" onclick=${()=>AgregarProducto(e,favoritos,idTab)} style="height:80px"><i class="fa fa-star text-orange"></i> ${e.Nom_Producto}<p></p> ${parseFloat(e.Valor).toFixed(4)}</a>`)}
            </div>`
}

function TieneHijos(c,categorias,callback){
    var resp = false
    for(var i=0;i<categorias.length;i++){
        if(categorias[i].Cod_Padre==c.Cod_Categoria){
            resp = true
            break
        }
    }
    callback(resp)
}

function ValidarStock(pStock,pCodigoProducto,idTab,callback){
    var resp = true
    $('#tablaBodyProductosVentas_'+idTab+' tr').each(function () {
        var Flag_Stock = $(this).find("td").eq(1).text()
        var Cod_Producto = $(this).find("td").eq(0).text()
        var Cantidad = $(this).find("td").eq(3).find("input").val()
        if(Cod_Producto==pCodigoProducto){
            if(Flag_Stock.toString()=="true"){
                if(parseFloat(Cantidad)>=parseFloat(pStock)){
                    resp = false
                }
            }
            return false
        }
    });

    callback(resp)
}


function SeleccionarCategoria(c,categorias,idTab){
    TieneHijos(c,categorias,function(flag){ 
        if(flag){
            CrearBotonesCategoriasXSeleccion(categorias,c.Cod_Categoria,idTab)
        }else{
            CrearBotonesProductos(c,idTab,function(categoria,productos){
                if(productos.length>0){ 
                    var listaProductos= yo`<div>
                                            ${productos.map(e=> yo`<a class="btn btn-app" style="height:80px">${e.Nom_Producto}<p></p>${getObjectArrayJsonVentas(global.variablesVentas,idTab)[0].SimboloMoneda+' '+parseFloat(categoria.Valor).toFixed(4)}</a>`)}
                                        </div>`
                    var divProductos = document.getElementById('divProductos_'+idTab);
                    empty(divProductos).appendChild(listaProductos);
                } 
            })
        }
    })

}

function TraerSimboloSOLES(monedas,pCodMoneda,idTab){
    for(var i=0;i<monedas.length;i++){
        if(monedas[i].Cod_Moneda==pCodMoneda){
            changeArrayJsonVentas(global.variablesVentas,idTab,[null,null,null,null,monedas[i].Simbolo,null,null,null])
            //SimboloMoneda = monedas[i].Simbolo
            changeArrayJsonVentas(global.variablesVentas,idTab,[null,null,null,null,null,monedas[i].Simbolo,null,null])
            //SimboloMonedaExtra = getObjectArrayJsonVentas(global.variablesVentas,idTab)[0].SimboloMoneda
            break
        }
    }
    $("#btnTotal_"+idTab).html('<i class="fa fa-money text-green"></i> TOTAL: '+getObjectArrayJsonVentas(global.variablesVentas,idTab)[0].SimboloMoneda+' '+parseFloat(getObjectArrayJsonVentas(global.variablesVentas,idTab)[0].Total).toFixed(2))
}

function ExisteProducto(CodProducto,idTab,callback){
    var flag = false
    var posicion = -1
    $('#tablaBodyProductosVentas_'+idTab+' tr').each(function (index) {
        var Cod_Producto = $(this).find("td").eq(0).text()
        if(Cod_Producto==CodProducto){
            flag = true
            posicion = index
            return false
        }
    });
    callback(flag,posicion)
}

function RecuperarPrecio(favoritos,producto){ 
    var pValor = '0.00'
    for(var i=0;i<favoritos.length;i++){
        if(favoritos[i].Cod_Producto==producto.Cod_Producto){
            pValor = parseFloat(favoritos[i].Valor).toFixed(2)
            break
        }
    } 
    return pValor
}



function RecalcularSubtotales(idTab){
    $('#tablaBodyProductosVentas_'+idTab+' tr').each(function (index) { 
        var _Cantidad = parseFloat($(this).find("td").eq(3).find('input').val())
        var _PrecioUnitario = parseFloat($(this).find("td").eq(4).text())
        $(this).find("td").eq(9).text((parseFloat(_Cantidad)*parseFloat(_PrecioUnitario)).toFixed(2))
    });
    CalcularTotal(idTab)
}


function RecalcularDescuentosTotales(idTab){
    $('#tablaBodyProductosVentas_'+idTab+' tr').each(function (index) { 
        var _Cantidad = parseFloat($(this).find("td").eq(3).find('input').val())
        var _DescuentoUnitario = parseFloat($(this).find("td").eq(7).text())
        $(this).find("td").eq(8).text((_Cantidad*_DescuentoUnitario).toFixed(2))
    });
    CalcularTotalDescuentos(idTab)
}

function CalcularVuelto(idTab){
    if($('input[name=Cod_Moneda_Forma_Pago_'+idTab+']:checked').val() == 'soles'){
        $("#TotalCobrar_"+idTab).val(getObjectArrayJsonVentas(global.variablesVentas,idTab)[0].Total)
    }else{
        $("#TotalCobrar_"+idTab).val(parseFloat(getObjectArrayJsonVentas(global.variablesVentas,idTab)[0].Total)/parseFloat(getObjectArrayJsonVentas(global.variablesVentas,idTab)[0].TipodeCambio))
    }
    $("#VueltoCalculado_"+idTab).val(parseFloat($("#TotalRecibidos_"+idTab).val())-parseFloat($("#TotalCobrar_"+idTab).val()))

    if(parseFloat($("#TotalRecibidos_"+idTab).val())-parseFloat($("#TotalCobrar_"+idTab).val())>0){
        $("#lbVuelto_"+idTab).text("VUELTO:")
        if($('input[name=Cod_Moneda_Forma_Pago_'+idTab+']:checked').val() == 'soles'){
            $("#Vuelto_"+idTab).val(parseFloat($("#TotalRecibidos_"+idTab).val())-parseFloat($("#TotalCobrar_"+idTab).val()))
        }else{
           
            var ArregloNumero = (parseFloat($("#TotalRecibidos_"+idTab).val())-parseFloat($("#TotalCobrar_"+idTab).val())).toString().split('.')
            var _ParteEntera = parseInt(ArregloNumero[0])
            var _ParteDecimal =0
            if(ArregloNumero.length>1)
                _ParteDecimal = parseFloat('0.'+ArregloNumero[1])
            $("#Vuelto_"+idTab).val(_ParteEntera)
            $("#USD_"+idTab).val(_ParteDecimal)
            $("#PEN_"+idTab).val(parseFloat(_ParteDecimal)*parseFloat($("#Tipo_Cambio_Venta_"+idTab).val()))

        }
    }else{
        $("#lbVuelto_"+idTab).text("FALTA:")
        if($('input[name=Cod_Moneda_Forma_Pago_'+idTab+']:checked').val() == 'soles'){
            $("#Vuelto_"+idTab).val(parseFloat($("#TotalRecibidos_"+idTab).val())-parseFloat($("#TotalCobrar_"+idTab).val()))
        }else{
            $("#Vuelto_"+idTab).val('0.00')
            $("#USD_"+idTab).val(parseFloat($("#TotalRecibidos_"+idTab).val())-parseFloat($("#TotalCobrar_"+idTab).val()))
            $("#PEN_"+idTab).val(parseFloat($("#USD_"+idTab).val())*parseFloat($("#Tipo_Cambio_Venta_"+idTab).val()))
        }
    }
    //$("#txtBusqueda_"+idTab).focus()
    //$("#TotalRecibidos_"+idTab).focus() 

}

function KeyCalcularVuelto(event,idTab){
    if(event.which==13){
        CalcularVuelto(idTab)
    }
}

function CalcularVueltoEspecial(idTab){
    
    if(parseFloat($("#TotalRecibidos_"+idTab).val()) - parseFloat($("#TotalCobrar_"+idTab).val()) > 0 ){
        if($('input[name=Cod_Moneda_Forma_Pago_'+idTab+']:checked').val() == 'soles'){
            $("#TotalRecibidos_"+idTab).val(parseFloat($("#TotalCobrar_"+idTab).val())+parseFloat($("#Vuelto_"+idTab)))
            CalcularVuelto(idTab)
        }else{
            $("#USD_"+idTab).val(parseFloat($("#TotalRecibidos_"+idTab).val()) - parseFloat($("#TotalCobrar_"+idTab).val()) - parseFloat($("#Vuelto_"+idTab).val()))
            $("#PEN_"+idTab).val(parseFloat($("#USD_"+idTab).val()) * parseFloat($("#Tipo_Cambio_Venta_"+idTab).val()))
        }
    }
}

function CalcularTotalDescuentos(idTab){
    var _total = 0
    $('#tablaBodyProductosVentas_'+idTab+' tr').each(function (index) { 
        _total = _total + parseFloat($(this).find("td").eq(8).text())
    });
    _total = parseFloat(_total.toFixed(2))
    changeArrayJsonVentas(global.variablesVentas,idTab,[null,_total,null,null,null,null,null,null])
    //TotalDescuentos = _total
    $("#btnDescuentos_"+idTab).html('<i class="fa fa-arrow-circle-down text-red"></i> TOTAL DESCUENTOS: '+getObjectArrayJsonVentas(global.variablesVentas,idTab)[0].SimboloMoneda+' '+parseFloat(getObjectArrayJsonVentas(global.variablesVentas,idTab)[0].TotalDescuentos).toFixed(2))
    if(_total!=0){
        $("#btnDescuentos_"+idTab).css("display","block")
    }else{
        $("#btnDescuentos_"+idTab).css("display","none")
    }
}

function CalcularTotal(idTab){
    var _total = 0
    $('#tablaBodyProductosVentas_'+idTab+' tr').each(function (index) {
        _total = _total + parseFloat($(this).find("td").eq(9).text())
    });
    _total = parseFloat(_total.toFixed(2))
    changeArrayJsonVentas(global.variablesVentas,idTab,[_total,null,null,null,null,null,null,null])
    //Total = _total
    $("#btnTotal_"+idTab).html('<i class="fa fa-money text-green"></i> TOTAL: '+getObjectArrayJsonVentas(global.variablesVentas,idTab)[0].SimboloMoneda+' '+parseFloat(getObjectArrayJsonVentas(global.variablesVentas,idTab)[0].Total).toFixed(2))
    if ($('input[name=Cod_Moneda_Forma_Pago_'+idTab+']:checked').val() == 'dolares' || $('input[name=Cod_Moneda_Forma_Pago_'+idTab+']:checked').val() == 'euros') {
        if ($('input[name=Cod_Moneda_Forma_Pago_'+idTab+']:checked').val() == 'euros'){
            $("#btnConversion_"+idTab).css("display","block")
            $("#btnConversion_"+idTab).html('<i class="fa fa-refresh text-green"></i> EN EUROS: '+getObjectArrayJsonVentas(global.variablesVentas,idTab)[0].SimboloMonedaExtra+' '+(parseFloat(getObjectArrayJsonVentas(global.variablesVentas,idTab)[0].Total)/parseFloat(getObjectArrayJsonVentas(global.variablesVentas,idTab)[0].TipodeCambio)).toFixed(2))
        }else{
            $("#btnConversion_"+idTab).css("display","block")
            $("#btnConversion_"+idTab).html('<i class="fa fa-refresh text-green"></i> EN DOLARES: '+getObjectArrayJsonVentas(global.variablesVentas,idTab)[0].SimboloMonedaExtra+' '+(parseFloat(getObjectArrayJsonVentas(global.variablesVentas,idTab)[0].Total)/parseFloat(getObjectArrayJsonVentas(global.variablesVentas,idTab)[0].TipodeCambio)).toFixed(2))
        }
    }else{
        $("#btnConversion_"+idTab).css("display","none")
    }
}

function LimpiarVenta(idTab){
    $("#tablaBodyProductosVentas_"+idTab).html('')
    $("#txtBusqueda_"+idTab).val('')
    $("#txtBusqueda_"+idTab).focus()
    $("#btnConversion_"+idTab).css("display","none")
    $("#Direccion_"+idTab).val('')
    $("#Nro_Documento_"+idTab).val('')
    $("#Cliente_"+idTab).val('')
    $("#Cliente_"+idTab).attr("data-id",null)

    changeArrayJsonVentas(global.variablesVentas,idTab,[null,null,null,null,null,null,-1,null])

    if($("#btnTotal_"+idTab).hasClass('active')){
        $("#btnTotal_"+idTab).click()
    }

     
    CalcularTotal(idTab)
    CalcularTotalDescuentos(idTab)
}

function TabVentaSeleccionado(idTab){
    IdTabSeleccionado = idTab
    global.objClienteVenta = ''
}

function CerrarTabVenta(idTab){
    $('#tab_'+idTab).remove()
    $('#id_'+idTab).parents('li').remove()
    var tabFirst = $('#tabs a:first'); 
    tabFirst.tab('show');
    IdTabSeleccionado = null
    deleteElementArrayJsonVentas(global.variablesVentas,idTab)
}

function EliminarFila(idFila,idTab){
    $('#'+idFila).remove()
    CalcularTotal(idTab)
    CalcularTotalDescuentos(idTab)
}

function FocusInOutCantidadVenta(idFila,idTab){
    if($('#'+idFila).find('td.Flag_Stock').text().toString()=="true"){
        //_CantidadOriginal = parseFloat($('#'+idFila).find('td.Cantidad').find('input').val())
        changeArrayJsonVentas(global.variablesVentas,idTab,[null,null,null,parseFloat($('#'+idFila).find('td.Cantidad').find('input').val()),null,null,null,null])
    }
}

function CambioMonedaFormaPagoMasterCard(idTab){
    if ($('input[name=Cod_FormaPago_Modal_'+idTab+']:checked').val() == 'mastercard'){
        $("#Nro_Tarjeta_"+idTab).val("")
        $("#Nro_Tarjeta_"+idTab).prop("disabled",true)
        $('input[name=Cod_FormaPago_Modal_'+idTab+'][value="mastercard"]').prop("checked",false)
    }else{
        $("#Nro_Tarjeta_"+idTab).prop("disabled",false)
        $('input[name=Cod_FormaPago_Modal_'+idTab+'][value="mastercard"]').prop("checked",true)
        $('input[name=Cod_FormaPago_Modal_'+idTab+'][value="visa"]').prop("checked",false)
    }
}

function CambioMonedaFormaPagoVisa(idTab){
    if ($('input[name=Cod_FormaPago_Modal_'+idTab+']:checked').val() == 'visa'){
        $("#Nro_Tarjeta_"+idTab).val("")
        $("#Nro_Tarjeta_"+idTab).prop("disabled",true)
        $('input[name=Cod_FormaPago_Modal_'+idTab+'][value="visa"]').prop("checked",false)
    }else{
        $("#Nro_Tarjeta_"+idTab).prop("disabled",false)
        $('input[name=Cod_FormaPago_Modal_'+idTab+'][value="mastercard"]').prop("checked",false)
        $('input[name=Cod_FormaPago_Modal_'+idTab+'][value="visa"]').prop("checked",true)
    }
}


function CambioMonedaFormaPagoEuros(idTab){
    const fecha = new Date()
    const mes = fecha.getMonth() + 1
    const dia = fecha.getDate()
    var fecha_actual = fecha.getFullYear() + '-' + (mes > 9 ? mes : '0' + mes) + '-' + (dia > 9 ? dia : '0' + dia)
    var Cod_Moneda = 'EUR' 
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Cod_Moneda,
            FechaHora:fecha_actual
        })
    }
    fetch(URL + '/comprobantes_pago_api/get_variables_formas_pago', parametros)
        .then(req => req.json())
        .then(res => {
            if(res.respuesta=="ok"){
                var tipos_cambios = res.data.tipos_cambios
                //TipodeCambio = parseFloat((tipos_cambios.length==0?'1':tipos_cambios[0].Venta)).toFixed(3)
                //TipodeCambio = parseFloat(TipodeCambio).toFixed(3)
                changeArrayJsonVentas(global.variablesVentas,idTab,[null,null,parseFloat((tipos_cambios.length==0?'1':tipos_cambios[0].Venta)).toFixed(3),null,null,null,null,null])
                $("#Tipo_Cambio_Venta_"+idTab).val(getObjectArrayJsonVentas(global.variablesVentas,idTab)[0].TipodeCambio)

                const parametrosMonedas = {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                    })
                }
                fetch(URL + '/comprobantes_pago_api/get_monedas', parametrosMonedas)
                    .then(req => req.json())
                    .then(res => {
                        if(res.respuesta=="ok"){
                            var monedas = res.data.monedas
                            for(var i=0;i<monedas.length;i++){
                                if(monedas[i].Cod_Moneda == 'EUR'){
                                    changeArrayJsonVentas(global.variablesVentas,idTab,[null,null,null,null,null,monedas[i].Simbolo,null,null])
                                    //SimboloMonedaExtra = monedas[i].Simbolo
                                    break
                                }
                            }

                            if ($('input[name=Cod_Moneda_Forma_Pago_'+idTab+']:checked').val() == 'euros'){
                                $("#lbTotalCobrar_"+idTab).attr("data-value","EUR")
                                $("#lbTotalRecibidos_"+idTab).attr("data-value","EUR")
                                $("#lbVuelto_"+idTab).attr("data-value","EUR")
                                $("#lbVueltoCalculado_"+idTab).attr("data-value","EUR")
                                $("#lbUSD_"+idTab).text("EUR")
                                $("#divUSD_"+idTab).css("display","block")
                                $("#laCambio_"+idTab).css("display","block")
                                $("#lbVuelto_"+idTab).val(parseFloat($("#lbVuelto_"+idTab).val()).toFixed(0))
                                $("#divPEN_"+idTab).css("display","block")
                            }

                            CalcularTotal(idTab)
                            CalcularTotalDescuentos(idTab)

                            if ($('input[name=Cod_Moneda_Forma_Pago_'+idTab+']:checked').val() == 'soles'){
                                $("#TotalCobrar_"+idTab).val(getObjectArrayJsonVentas(global.variablesVentas,idTab)[0].Total)
                            }else{
                                $("#TotalCobrar_"+idTab).val(parseFloat(getObjectArrayJsonVentas(global.variablesVentas,idTab)[0].Total)/parseFloat(getObjectArrayJsonVentas(global.variablesVentas,idTab)[0].TipodeCambio))
                            }
                            CalcularVuelto(idTab)

                        }
                    })


            }
        })
 
}

function CambioMonedaFormaPagoDolares(idTab){
    const fecha = new Date()
    const mes = fecha.getMonth() + 1
    const dia = fecha.getDate()
    var fecha_actual = fecha.getFullYear() + '-' + (mes > 9 ? mes : '0' + mes) + '-' + (dia > 9 ? dia : '0' + dia)
    var Cod_Moneda = 'USD' 
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Cod_Moneda,
            FechaHora:fecha_actual
        })
    }
    fetch(URL + '/comprobantes_pago_api/get_variables_formas_pago', parametros)
        .then(req => req.json())
        .then(res => {
            if(res.respuesta=="ok"){
                var tipos_cambios = res.data.tipos_cambios
                //TipodeCambio = parseFloat((tipos_cambios.length==0?'1':tipos_cambios[0].Venta)).toFixed(3)
                //TipodeCambio = parseFloat(TipodeCambio).toFixed(3)
                changeArrayJsonVentas(global.variablesVentas,idTab,[null,null,parseFloat((tipos_cambios.length==0?'1':tipos_cambios[0].Venta)).toFixed(3),null,null,null,null,null])
                $("#Tipo_Cambio_Venta_"+idTab).val(getObjectArrayJsonVentas(global.variablesVentas,idTab)[0].TipodeCambio)

                const parametrosMonedas = {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                    })
                }
                fetch(URL + '/comprobantes_pago_api/get_monedas', parametrosMonedas)
                    .then(req => req.json())
                    .then(res => {
                        if(res.respuesta=="ok"){
                            var monedas = res.data.monedas
                            for(var i=0;i<monedas.length;i++){
                                if(monedas[i].Cod_Moneda == 'USD'){
                                    changeArrayJsonVentas(global.variablesVentas,idTab,[null,null,null,null,null,monedas[i].Simbolo,null,null])
                                    //SimboloMonedaExtra = monedas[i].Simbolo
                                    break
                                }
                            }

                            if ($('input[name=Cod_Moneda_Forma_Pago_'+idTab+']:checked').val() == 'dolares'){
                                $("#lbTotalCobrar_"+idTab).attr("data-value","USD")
                                $("#lbTotalRecibidos_"+idTab).attr("data-value","USD")
                                $("#lbVuelto_"+idTab).attr("data-value","USD")
                                $("#lbVueltoCalculado_"+idTab).attr("data-value","USD")
                                $("#lbUSD_"+idTab).text("USD")
                                $("#divUSD_"+idTab).css("display","block")
                                $("#laCambio_"+idTab).css("display","block")
                                $("#lbVuelto_"+idTab).val(parseFloat($("#lbVuelto_"+idTab).val()).toFixed(0))
                                $("#divPEN_"+idTab).css("display","block")
                            }

                            CalcularTotal(idTab)
                            CalcularTotalDescuentos(idTab)

                            if ($('input[name=Cod_Moneda_Forma_Pago_'+idTab+']:checked').val() == 'soles'){
                                $("#TotalCobrar_"+idTab).val(getObjectArrayJsonVentas(global.variablesVentas,idTab)[0].Total)
                            }else{
                                $("#TotalCobrar_"+idTab).val(parseFloat(getObjectArrayJsonVentas(global.variablesVentas,idTab)[0].Total)/parseFloat(getObjectArrayJsonVentas(global.variablesVentas,idTab)[0].TipodeCambio))
                            }
                            CalcularVuelto(idTab)

                        }
                    })


            }
        })
 
}

function CambioMonedaFormaPagoSoles(idTab){
    if ($('input[name=Cod_Moneda_Forma_Pago_'+idTab+']:checked').val() == 'soles'){
        $("#lbTotalCobrar_"+idTab).attr("data-value","PEN")
        $("#lbTotalRecibidos_"+idTab).attr("data-value","PEN")
        $("#lbVuelto_"+idTab).attr("data-value","PEN")
        $("#lbVueltoCalculado_"+idTab).attr("data-value","PEN")
        $("#divUSD_"+idTab).css("display","none")
        $("#divTC_"+idTab).css("display","none")
        $("#divPEN_"+idTab).css("display","none")
        $("#lbVuelto_"+idTab).val(parseFloat($("#lbVuelto_"+idTab).val()).toFixed(2))
    }

    if ($('input[name=Cod_Moneda_Forma_Pago_'+idTab+']:checked').val() == 'soles'){
        $("#TotalCobrar_"+idTab).val(getObjectArrayJsonVentas(global.variablesVentas,idTab)[0].Total)
    }else{
        $("#TotalCobrar_"+idTab).val(parseFloat(getObjectArrayJsonVentas(global.variablesVentas,idTab)[0].Total)/parseFloat(getObjectArrayJsonVentas(global.variablesVentas,idTab)[0].TipodeCambio))
    }
    CalcularVuelto(idTab)
}


function CambioCantidadVenta(idFila,idTab){
    if($('#'+idFila).find('td.Flag_Stock').text().toString()=="true"){
        
        const parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Cod_Producto: $('#'+idFila).find('td.Cod_Producto').text().toString(),
                Cod_Almacen: $("#Cod_Almacen_"+idTab).val(),
                Cod_TipoPrecio: $("#Cod_Precio_"+idTab).val()
            })
        }
        fetch(URL + '/productos_serv_api/get_codigo_unidad_by_codP_codA_codTP', parametros)
            .then(req => req.json())
            .then(res => {
                if(res.respuesta=="ok"){
                    var producto = res.data.producto[0]
                    if(parseFloat($('#'+idFila).find('td.Cantidad').find('input').val()) > parseFloat(producto.Stock_Act)){
                        toastr.error('El stock maximo es de : '+parseFloat(producto.Stock_Act).toFixed(0),'Error',{timeOut: 5000})  
                        $('#'+idFila).find('td.Cantidad').find('input').val(getObjectArrayJsonVentas(global.variablesVentas,idTab)[0]._CantidadOriginal)
                    }
                }else{
                    $('#'+idFila).find('td.Cantidad').find('input').val(getObjectArrayJsonVentas(global.variablesVentas,idTab)[0]._CantidadOriginal)
                }

            }) 
    } 
    RecalcularSubtotales(idTab)
    RecalcularDescuentosTotales(idTab)
}


function CambioPrecioDescuentos(idFila,idTab){
    var _Unitario = parseFloat($('#'+idFila).find('td.UnitarioBase').find('input').val())
    var _Descuento = parseFloat($('#'+idFila).find('td.Descuentos').find('input').val()) / 100
    if(_Descuento !=0){
        $('#'+idFila).find('td.Descuentos').find('input').css("background","#dd4b39")
        $('#'+idFila).find('td.Descuentos').find('input').css("color","white")
        $('#'+idFila).find('td.Descuentos').find('input').css("border-color","#dd4b39")
    }else{
        
        $('#'+idFila).find('td.Descuentos').find('input').css("background","white")
        $('#'+idFila).find('td.Descuentos').find('input').css("color","#555")
        $('#'+idFila).find('td.Descuentos').find('input').css("border-color","#98999c")
    }
    $('#'+idFila).find('td.DescuentoUnitario').text(_Unitario * _Descuento)
    RecalcularSubtotales(idTab)
    RecalcularDescuentosTotales(idTab)
 
}
 
function CambioTipoCambioVenta(idTab){
    //TipodeCambio = parseFloat($("#Tipo_Cambio_Venta_"+idTab).val())
    changeArrayJsonVentas(global.variablesVentas,idTab,[null,null,parseFloat($("#Tipo_Cambio_Venta_"+idTab).val()),null,null,null,null,null])
    CalcularTotal(idTab)
    CalcularTotalDescuentos(idTab)
    if ($('input[name=Cod_Moneda_Forma_Pago_'+idTab+']:checked').val() == 'soles'){
        $("#TotalCobrar_"+idTab).val(getObjectArrayJsonVentas(global.variablesVentas,idTab)[0].Total)
    }else{
        $("#TotalCobrar_"+idTab).val(parseFloat(getObjectArrayJsonVentas(global.variablesVentas,idTab)[0].Total)/parseFloat(getObjectArrayJsonVentas(global.variablesVentas,idTab)[0].TipodeCambio))
    }
    CalcularVuelto(idTab)
}


function AgregarProducto(producto,favoritos,idTab){

    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Id_Producto: producto.Id_Producto
        })
    }
    fetch(URL + '/productos_serv_api/get_producto_by_pk', parametros)
        .then(req => req.json())
        .then(res => {
            if(res.respuesta=="ok"){
                var dataProducto = res.data.producto[0]
                ValidarStock(producto.Stock_Act,dataProducto,idTab,function(flag){
                    if(flag){
                        ExisteProducto(producto.Cod_Producto,idTab,function(flag,index){
                            if(flag){
                                $('#tablaBodyProductosVentas_'+idTab+' tr:eq('+ index + ')').find('td.Cantidad').find('input').val((parseFloat($('#tablaBodyProductosVentas_'+idTab+' tr:eq('+ index + ')').find('td.Cantidad').find('input').val())+1).toFixed(2))
                                $('#tablaBodyProductosVentas_'+idTab+' tr:eq('+ index + ')').find('td.Precio').text((parseFloat($('#tablaBodyProductosVentas_'+idTab+' tr:eq('+ index + ')').find('td.Cantidad').find('input').val())*parseFloat(RecuperarPrecio(favoritos,dataProducto))).toFixed(2))
                                $('#tablaBodyProductosVentas_'+idTab+' tr:eq('+ index + ')').find('td.DescuentoTotal').text((parseFloat($('#tablaBodyProductosVentas_'+idTab+' tr:eq('+ index + ')').find('td.DescuentoUnitario').text())*parseFloat($('#tablaBodyProductosVentas_'+idTab+' tr:eq('+ index + ')').find('td.Cantidad').find('input').val())).toFixed(2))
                            }else{
                                var idFila = $('#tablaBodyProductosVentas_'+idTab+' > tr').length
                                var fila = yo`
                                <tr id="${idFila+''+idTab}">
                                    <td class="Cod_Producto">${dataProducto.Cod_Producto}</td> 
                                    <td class="Flag_Stock hidden">${dataProducto.Flag_Stock}</td> 
                                    <td class="Nom_Producto" style="width: 30%;">${dataProducto.Nom_Producto}</td> 
                                    <td class="Cantidad"><input type="number" class="form-control input-sm" value="1.0000" onblur=${()=>FocusInOutCantidadVenta(idFila+''+idTab,idTab)} onchange=${()=>CambioCantidadVenta(idFila+''+idTab,idTab)}></td>
                                    <td class="Unitario hidden">${RecuperarPrecio(favoritos,dataProducto)}</td>
                                    <td class="UnitarioBase"><input type="number" class="form-control input-sm" value=${RecuperarPrecio(favoritos,dataProducto)} onchange=${()=>CambioPrecioDescuentos(idFila+''+idTab,idTab)}></td> 
                                    <td class="Descuentos"><input type="number" class="form-control input-sm" value="0.00" onchange=${()=>CambioPrecioDescuentos(idFila+''+idTab,idTab)}></td>
                                    <td class="DescuentoUnitario hidden">0</td> 
                                    <td class="DescuentoTotal hidden">0</td> 
                                    <td class="Precio">${RecuperarPrecio(favoritos,dataProducto)}</td>
                                    <td>
                                        <div style="display:flex;"> 
                                            <button type="button" onclick="${()=>EliminarFila(idFila+''+idTab,idTab)}" class="btn btn-danger btn-sm"><i class="fa fa-trash"></i></button>
                                        </div>
                                    </td>
                                </tr>`
                                $('#tablaBodyProductosVentas_'+idTab).append(fila)
                            }
                            CalcularTotal(idTab)
                            CalcularTotalDescuentos(idTab)
                        })
                       
                        
                    }else{
                        toastr.error('No existe stock para dicho producto','Error',{timeOut: 5000})  
                    }
                })
            }
    
        })
}


function BuscarProductoCP(event,tipo,idTab) { 
    if(tipo=='blur'){
        if($("#txtBusqueda_"+idTab).val().trim().length>=3){
            global.objProductoVentas = ''
            BuscarProducto(true, $("#txtBusqueda_"+idTab).val())
        } 
    }else{
        if(event.which==13){
            if($("#txtBusqueda_"+idTab).val().trim().length>=3){
                $("#Cod_Precio_"+idTab).focus()
                global.objProductoVentas = ''
                BuscarProducto(true, $("#txtBusqueda_"+idTab).val())
            } 
        }
        //if(!$("#optEsGasto").is(":checked"))
        //    BuscarProducto(CodLibro == "14", $("#Nom_Producto").val())
        
        //$("#Nom_Producto").focusout()
    }
}



function BuscarClienteDoc(CodLibro,idTab) {
    var Nro_Documento = document.getElementById('Nro_Documento_'+idTab).value
    var Cod_TipoDocumento = document.getElementById('Cod_TipoDoc_'+idTab).value
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
                global.objClienteVenta = res.data.cliente[0]
                changeArrayJsonVentas(global.variablesVentas,idTab,[null,null,null,null,null,null,global.objClienteVenta,null])
                if(global.objClienteVenta !='' && global.objClienteVenta){
                    $("#Cod_TipoDoc_"+idTab).val(global.objClienteVenta.Cod_TipoDocumento)
                    $("#Cliente_"+idTab).val(global.objClienteVenta.Cliente)
                    $("#Direccion_"+idTab).val(global.objClienteVenta.Direccion)
                    $("#Nro_Documento_"+idTab).val(global.objClienteVenta.Nro_Documento)
                    $("#Cliente_"+idTab).attr("data-id",global.objClienteVenta.Id_ClienteProveedor)                   
                } 
            }
            H5_loading.hide()
        })
}

function NuevaVenta() {
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
    fetch(URL + '/comprobantes_pago_api/get_variables_ventas', parametros)
        .then(req => req.json())
        .then(res => {
            var variables = res.data
            if (res.respuesta == 'ok') {
                VerNuevaVenta(variables,null)
            }else{
                toastr.error(res.detalle_error,'Error',{timeOut: 5000})
            }
            H5_loading.hide()
        })
}
 

function VentaSimple(){

    console.log(global.variablesVentas)
    var _CodTipoComprobante=""
    if(!($('#tabs li:first').hasClass('active'))){
        if(IdTabSeleccionado!=null){
            var rows = $("#tablaBodyProductosVentas_"+IdTabSeleccionado+" > tr").length
            ComprobantePago('14',getObjectArrayJsonVentas(global.variablesVentas,IdTabSeleccionado)[0].Cliente)
            if(rows>0){
                // verificar cierre z ???
                if(parseFloat(getObjectArrayJsonVentas(global.variablesVentas,IdTabSeleccionado)[0].Total<=700)){
                    if($('input[name=Cod_Moneda_Forma_Pago_'+IdTabSeleccionado+']:checked').val() == 'dolares' || $('input[name=Cod_Moneda_Forma_Pago_'+IdTabSeleccionado+']:checked').val() == 'euros'){
                        if(parseFloat($("#TotalRecibidos_"+IdTabSeleccionado).val())>0){
                            VentaSimpleConME(IdTabSeleccionado, _CodTipoComprobante)
                        }else{ 
                            CargarModalConfirmacion(IdTabSeleccionado,_CodTipoComprobante) 
                        }
                    }else{
                        VentaSimpleSinME(IdTabSeleccionado,_CodTipoComprobante)
                    }
                }else{
                    if($("#Cliente_"+IdTabSeleccionado).attr("data-id")==null){

                    }else{
                        if($('input[name=Cod_Moneda_Forma_Pago_'+IdTabSeleccionado+']:checked').val() == 'dolares' || $('input[name=Cod_Moneda_Forma_Pago_'+IdTabSeleccionado+']:checked').val() == 'euros'){
                            if(parseFloat($("#TotalRecibidos_"+IdTabSeleccionado).val())>0){
                                VentaSimpleConME(IdTabSeleccionado, _CodTipoComprobante)
                            }else{ 
                                CargarModalConfirmacion(IdTabSeleccionado,_CodTipoComprobante) 
                            }
                        }else{
                            VentaSimpleSinME(IdTabSeleccionado,_CodTipoComprobante)
                        }
                    }
                }
            }else{
                toastr.error('No se puede Utilizar esta opcion sin haber ingresado al menos una venta.\n\n Ingrese la venta y vuelva a intentarlo.','Error',{timeOut: 5000})     
            }
            //console.log(getObjectArrayJsonVentas(global.variablesVentas,IdTabSeleccionado)[0].Total)
            //changeArrayJsonVentas(global.variablesVentas,IdTabSeleccionado,[10])
            //console.log(getObjectArrayJsonVentas(global.variablesVentas,IdTabSeleccionado))
            //LimpiarVenta(IdTabSeleccionado)
        }
    }else{
        IdTabSeleccionado = null
    } 
}


export { NuevaVenta, VentaSimple }