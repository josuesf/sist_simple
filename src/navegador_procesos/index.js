var yo = require('yo-yo')
var empty = require('empty-element');
import { URL } from '../constantes_entorno/constantes'

//Views CompraVenta
import { NuevoCompraVentaME } from '../sis_procesos/mod_ventas/recibo_compra_venta_me'
//Views Envio Efectivo
import { NuevoEnvioEfectivo } from '../sis_procesos/mod_ventas/transferencias'

import { NuevoIngreso } from '../sis_procesos/mod_ventas/recibo_ingreso'
import { NuevoEgreso } from '../sis_procesos/mod_ventas/recibo_egreso'
import { NuevaVenta, VentaSimple } from '../sis_procesos/mod_ventas/ventas'
import { NuevoArqueoCaja } from '../sis_procesos/mod_ventas/arqueo_caja'


import { NuevaRecepcion } from '../sis_procesos/mod_compras/recepcion_efectivo'
import { ComprobantePago } from '../sis_procesos/mod_compras/comprobante_pago'
import { EntradasSalidas } from '../sis_procesos/mod_almacen/entradas_salidas'
import { Cuentas } from '../sis_procesos/mod_administracion/cuentas_pagar_compra'
import { LibroReservas } from '../sis_procesos/mod_reservas/reservas'
import { NuevaHabitacion } from '../sis_procesos/mod_reservas/habitaciones'

function Ver(Flag_Cerrado) { 
   
    var el = yo`
        ${!Flag_Cerrado?
            yo`<ul class="sidebar-menu" data-widget="tree">
                

                <li class="header">Movimientos de caja</li>
                <li class=""><a  href="javascript:void(0)" onclick=${() => NuevoIngreso()}><i class="fa fa-circle-o"></i> Recibo de Ingresos</a></li>
                <li class=""><a  href="javascript:void(0)" onclick=${() => NuevoEgreso()}><i class="fa fa-circle-o"></i> Recibo de Egresos</a></li>
                <li class=""><a  href="javascript:void(0)" onclick=${() => NuevoCompraVentaME(true)}><i class="fa fa-circle-o"></i> Compra y Venta de Dolares</a></li>
                <li class=""><a  href="javascript:void(0)" onclick=${() => NuevoEnvioEfectivo(true)}><i class="fa fa-circle-o"></i> Envio Efectivo</a></li> 
                <li class=""><a href="javascript:void(0);" onclick=${() => NuevaRecepcion()}><i class="fa fa-circle-o"></i> <span>Recepcion de Efectivo</span></a></li>
                    
                <li class="header">Ventas</li>
                <li class="treeview">
                    <a href="javascript:void(0);">
                        <span>Documentos de Ventas</span>
                        <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                        </span>
                    </a>
                    <ul class="treeview-menu">
                        <li class=""><a href="javascript:void(0);" onclick=${() => NuevaVenta()}><i class="fa fa-cart-plus"></i> <span> Nueva Venta</span></a></li>
                        <li class=""><a href="javascript:void(0);" onclick=${() => VentaSimple()}><i class="fa fa-shopping-basket"></i> <span> Venta Simple</span></a></li>
                    </ul>
                </li>  

                <li class="header">Compras</li>
                <li class="treeview">
                    <a href="javascript:void(0);">
                        <span>Documentos de Compras</span>
                        <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                        </span>
                    </a>
                    <ul class="treeview-menu">
                        <li>
                            <a href="javascript:void(0);" onclick=${() => ComprobantePago('08')}>
                                <i class="fa fa-circle-o"></i> <span>Facturas Recibidas</span>
                            </a>
                        </li>
                    </ul>
                </li>  


                <li class="header">Almacen</li>
                <li class="treeview">
                    <a href="javascript:void(0);">
                        <span>Movimientos</span>
                        <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                        </span>
                    </a>
                    <ul class="treeview-menu">
                        <li class=""><a href="javascript:void(0);" onclick=${() => EntradasSalidas('NE')}><i class="fa fa-arrow-circle-down"></i> <span> Registro de Entradas</span></a></li>
                        <li class=""><a href="javascript:void(0);" onclick=${() => EntradasSalidas('NS')}><i class="fa fa-arrow-circle-up"></i> <span> Registro de Salidas</span></a></li>
                    </ul>
                </li>  
            

                <li class="header">Administracion</li>
                <li class="treeview">
                    <a href="javascript:void(0);">
                        <span>Cobros</span>
                        <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                        </span>
                    </a>
                    <ul class="treeview-menu">
                        <li>
                            <a href="javascript:void(0);" onclick=${() => Cuentas('14')}>
                            <span> Cuentas por Cobrar</span>   
                            </a>
                        </li>
                    </ul>
                </li>  
                <li class="treeview">
                    <a href="javascript:void(0);">
                        <span>Pagos</span>
                        <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                        </span>
                    </a>
                    <ul class="treeview-menu">
                        <li>
                            <a href="javascript:void(0);" onclick=${() => Cuentas('14')}>
                            <span> Cuentas por Cobrar</span>   
                            </a>
                        </li>
                    </ul>
                </li>  
            

                <li class="header">Sistema</li>
                <li><a href="javascript:void(0);" onclick=${() => NuevoArqueoCaja()}><i class="fa fa-circle-o"></i> <span> Arqueo de Caja</span></a></li>  

            </ul>`
            :yo`
            <ul class="sidebar-menu" data-widget="tree">
                

                <li class="header">Movimientos de caja</li>
                <li class=""><a  href="javascript:void(0)" class="not-active"><i class="fa fa-circle-o"></i> Recibo de Ingresos</a></li>
                <li class=""><a  href="javascript:void(0)" class="not-active"><i class="fa fa-circle-o"></i> Recibo de Egresos</a></li>
                <li class=""><a  href="javascript:void(0)" class="not-active"><i class="fa fa-circle-o"></i> Compra y Venta de Dolares</a></li>
                <li class=""><a  href="javascript:void(0)" class="not-active"><i class="fa fa-circle-o"></i> Envio Efectivo</a></li> 
                <li class=""><a href="javascript:void(0);" class="not-active"><i class="fa fa-circle-o"></i> <span>Recepcion de Efectivo</span></a></li>
                    
                <li class="header">Ventas</li>
                <li class="treeview">
                    <a href="javascript:void(0);">
                        <span>Documentos de Ventas</span>
                        <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                        </span>
                    </a>
                    <ul class="treeview-menu">
                        <li class=""><a href="javascript:void(0);" class="not-active"><i class="fa fa-cart-plus"></i> <span> Nueva Venta</span></a></li>
                        <li class=""><a href="javascript:void(0);" class="not-active"><i class="fa fa-shopping-basket"></i> <span> Venta Simple</span></a></li>
                    </ul>
                </li>  

                <li class="header">Compras</li>
                <li class="treeview">
                    <a href="javascript:void(0);">
                        <span>Documentos de Compras</span>
                        <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                        </span>
                    </a>
                    <ul class="treeview-menu">
                        <li>
                            <a href="javascript:void(0);" class="not-active">
                                <i class="fa fa-circle-o"></i> <span>Facturas Recibidas</span>
                            </a>
                        </li>
                    </ul>
                </li>  


                <li class="header">Almacen</li>
                <li class="treeview">
                    <a href="javascript:void(0);">
                        <span>Movimientos</span>
                        <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                        </span>
                    </a>
                    <ul class="treeview-menu">
                        <li class=""><a href="javascript:void(0);" class="not-active"><i class="fa fa-arrow-circle-down"></i> <span> Registro de Entradas</span></a></li>
                        <li class=""><a href="javascript:void(0);" class="not-active"><i class="fa fa-arrow-circle-up"></i> <span> Registro de Salidas</span></a></li>
                    </ul>
                </li>  
            

                <li class="header">Administracion</li>
                <li class="treeview">
                    <a href="javascript:void(0);">
                        <span>Cobros</span>
                        <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                        </span>
                    </a>
                    <ul class="treeview-menu">
                        <li>
                            <a href="javascript:void(0);" class="not-active">
                            <span> Cuentas por Cobrar</span>   
                            </a>
                        </li>
                    </ul>
                </li>  
                <li class="treeview">
                    <a href="javascript:void(0);">
                        <span>Pagos</span>
                        <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                        </span>
                    </a>
                    <ul class="treeview-menu">
                        <li>
                            <a href="javascript:void(0);" class="not-active">
                            <span> Cuentas por Cobrar</span>   
                            </a>
                        </li>
                    </ul>
                </li>  
            

                <li class="header">Sistema</li>
                <li><a href="javascript:void(0);" class="not-active"><i class="fa fa-circle-o"></i> <span> Arqueo de Caja</span></a></li>  

            </ul>
            
            `}`;
    var container = document.getElementById('nav-container')
    empty(container).appendChild(el);
}

module.exports = function navegador(ctx, next) {
    
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
        })
    }
    fetch(URL+'/cajas_api/get_arqueo', parametros)
    .then(req => req.json())
    .then(res => { 
        Ver(res.arqueo[0].Flag_Cerrado)
    })
  
}