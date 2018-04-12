var yo  =  require('yo-yo')
var empty = require('empty-element');

var el = yo`
<ul class="sidebar-menu" data-widget="tree">
    <li class="header">Mantenimientos</li>
    <li class="treeview">
        <a href="#">
            <i class="fa fa-cog"></i> <span>Configuracion</span>
            <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>
            </span>
        </a>
        <ul class="treeview-menu">
            <li class=""><a href="/usuarios"><i class="fa fa-circle-o"></i> Usuarios</a></li>
        </ul>
    </li>
</ul>`;

module.exports = function navegador (ctx, next) {
    var container = document.getElementById('nav-container')
    empty(container).appendChild(el);
    next();
  }