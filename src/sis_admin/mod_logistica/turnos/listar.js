var empty = require('empty-element');
var yo = require('yo-yo');

import {NuevoTurno} from './agregar'
import {URL} from '../../../constantes_entorno/constantes'

function Ver(turnos, paginas, pagina_actual, _escritura){
    var el = yo`
    <div>
        <section class="content-header">
        <div class="modal modal-danger fade" id="modal-danger" style="display: none;">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span></button>
              <h4 class="modal-title">¿Esta seguro que desea eliminar este turno?</h4>
            </div>
            <div class="modal-body">
              <p>Al eliminar este turno no podra recuperarlo. Desea continuar de todas maneras?</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline pull-left" data-dismiss="modal">Cancelar</button>
              <button type="button" class="btn btn-outline" id="btnEliminar" data-dismiss="modal">Si, Eliminar</button>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
            <h1>
                Turnos de Atencion
                <small>Control turnos</small>
            </h1>
            <ol class="breadcrumb">
                <li>
                    <a href="#">
                        <i class="fa fa-cog"></i> Logistica</a>
                </li>
                <li class="active">Turnos</li>
            </ol>
        </section>
        <section class="content">
            <div class="box">
                <div class="box-header">
                    <h3 class="box-title">Lista de Turnos</h3>
                    ${_escritura ? yo`<a onclick=${()=>NuevoTurno(_escritura)} class="btn btn-info pull-right">
                        <i class="fa fa-plus"></i> Nueva Turno</a>`: yo``}
                </div>
                <!-- /.box-header -->
                <div class="box-body">
                    <div class="table-responsive">
                    <table id="example1" class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Turno</th>
                                <th>Inicio</th>
                                <th>Fin</th>
                                <th>Cerrado</th>
                                <th>Usuario</th>
                                <th>Fecha</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${turnos.map(u => yo`
                            <tr>
                                <td>${u.Cod_Turno}</td>
                                <td>${u.Des_Turno}</td>
                                <td>${getFechaHora(u.Fecha_Inicio,true,true)}</td>
                                <td>${getFechaHora(u.Fecha_Fin,true,true)}</td>
                                <td>${u.Flag_Cerrado?'Si':'No'}</td>
                                <td>${u.Cod_UsuarioReg}</td>
                                <td>${getFechaHora(u.Fecha_Reg,true,false)}</td>
                                <td>
                                    ${_escritura ? yo`<button class="btn btn-xs btn-success" onclick="${()=>NuevoTurno(_escritura, u)}"><i class="fa fa-edit"></i></button>` : yo``}
                                    ${_escritura ? yo`<button class="btn btn-xs btn-danger" data-toggle="modal" data-target="#modal-danger" onclick="${()=>Eliminar(_escritura, u)}"><i class="fa fa-trash"></i></button>` : yo``}
                                    
                                </td>
                            </tr>`)}
                        </tbody>
    
                    </table>
                    </div>
                    <div class="box-footer clearfix">
                        <ul class="pagination pagination-sm no-margin pull-right">
                            <li>
                                <a href="#" onclick=${()=>(pagina_actual>0)?ListarTurnos(_escritura,pagina_actual-1):null}>«</a>
                            </li>
                            ${((new Array(paginas)).fill(0)).map((p, i) => yo`<li class=${pagina_actual==i?'active':''}>
                            <a href="#" onclick=${()=>ListarTurnos(_escritura,i)} >${i + 1}</a>
                            </li>`)}
                        
                            <li>
                                <a href="#" onclick=${()=>(pagina_actual+1<paginas)?ListarTurnos(_escritura,pagina_actual+1):null}>»</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </div>`
    var main = document.getElementById('main-contenido');
    empty(main).appendChild(el);
}

function getFechaHora(str, flagfecha, flaghora){
    var spl = str.split('T')
    var fecha = spl[0].split('-')
    var hora = spl[1].split(':')
    var fechastr = fecha[2]+'/'+fecha[1]+'/'+fecha[0]
    var horastr = hora[0]+':'+hora[1]
    return flagfecha?fechastr+(flaghora?' '+horastr:''):flaghora?horastr:''
}

function Eliminar(_escritura, turno){
    var btnEliminar = document.getElementById('btnEliminar')
    btnEliminar.addEventListener('click', function del(ev){
        var Cod_Turno = turno.Cod_Turno
        H5_loading.show();
        const parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Cod_Turno
            })
        }
        fetch(URL+'/turnos_api/eliminar_turno', parametros)
            .then(req => req.json())
            .then(res => {
                ListarTurnos(_escritura,0)
                this.removeEventListener('click', del)
                H5_loading.hide()
            })
    })
}

function ListarTurnos(escritura,NumeroPagina) {
    H5_loading.show();
    var _escritura=escritura;
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            TamanoPagina: '20',
            NumeroPagina: NumeroPagina||'0',
            ScripOrden: ' ORDER BY Cod_Turno desc',
            ScripWhere: ''
        })
    }
    fetch(URL+'/turnos_api/get_turnos', parametros)
        .then(req => req.json())
        .then(res => {
            if (res.respuesta == 'ok') {
                var paginas = parseInt(res.data.num_filas[0].NroFilas)
                paginas = parseInt(paginas / 20) + (paginas % 20 != 0 ? 1 : 0)
                Ver(res.data.turnos, paginas,NumeroPagina||0, _escritura)
            }
            else
                Ver([])
            H5_loading.hide()
        })
}

export {ListarTurnos}