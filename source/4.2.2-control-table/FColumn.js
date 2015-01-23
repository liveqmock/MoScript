//==========================================================
// <T>表格内的列控件。</T>
//
// hPanel<TD>
// ┌------------------------------------------------------┐
// │ hForm<TABLE>                                         │
// │ hFormLine<TR>                                        │
// │┌--------------┬------------------┬--------------┐│
// ││hIconPanel<TD>│hHeadPanel<TD>    │hSortPanel<TD>││
// ││hIcon<IMG>    │hLabel<SPAN>      │hSort<IMG>    ││
// │└--------------┴------------------┴--------------┘│
// └------------------------------------------------------┘
// hSearchPanel<TD>
// ┌--------------------------------------------------------------------┐
// │ hSearchForm<TABLE>                                                 │
// │ hSearchFormLine<TR>                                                │
// │┌--------------------┬--------------------┬--------------------┐│
// ││hSearchIconPanel<TD>│hSearchEditPanel<TD>│hSearchDropPanel<TD>││
// ││hSearchIcon<IMG>    │hSearchEdit<INPUT>  │hSearchDrop<IMG>    ││
// │└--------------------┴--------------------┴--------------------┘│
// └--------------------------------------------------------------------┘
// 
// @class
// @author maocy
// @version 150123
//==========================================================
function FColumn(o) {
   //o = RClass.inherits(this, o, FControl, MEditDescriptor, MDisplay);
   o = RClass.inherits(this, o, FControl);
   //..........................................................
   // @property
   //o._dispList          = RClass.register(o, new APtySet('dispList', 'disp_config', EDisplayConfig.List), true);
   o._dispList          = true;
   //..........................................................
   // @attribute
   o._cellClass         = FCell;
   //..........................................................
   // @html
   o._hForm             = null;
   o._hFormLine         = null;
   //..........................................................
   // @event
   o.onBuildLabel      = FColumn_onBuildLabel;
   o.onBuildSearchIcon = RMethod.empty;
   o.onBuildSearchEdit = FColumn_onBuildSearchEdit;
   o.onBuildSearchDrop = RMethod.empty;
   o.onBuildSearchForm = FColumn_onBuildSearchForm;
   o.onBuildSearch     = FColumn_onBuildSearch;
   o.onBuildTotal      = FColumn_onBuildTotal;
   o.onBuildPanel      = FColumn_onBuildPanel;
   //..........................................................
   // @process
   o.oeBuild           = FColumn_oeBuild;








   //..........................................................
   // @property
   //o._dispList          = RClass.register(o, new APtySet('dispList', 'dispConfig', EDisplayConfig.List));
   //o._dispFixed         = RClass.register(o, new APtySet('dispFixed', 'dispConfig', EDisplayConfig.Fixed));
   //o._dispAuto          = RClass.register(o, new APtySet('dispAuto', 'dispConfig', EDisplayConfig.Auto));
   //o._dispSize          = RClass.register(o, new APtySet('dispSize', 'dispConfig', EDisplayConfig.Size));
   //o._dispDrag          = RClass.register(o, new APtySet('dispDrag', 'dispConfig', EDisplayConfig.Drag));
   o._dataType          = RClass.register(o, new APtyString('dataType'));
   o._editColor         = RClass.register(o, new APtyString('editColor'));
   o._editBgcolor       = RClass.register(o, new APtyString('editBgcolor'));
   o._orderAble         = RClass.register(o, new APtyBoolean('orderAble'));
   o._editAlign         = EAlign.Left;
   o._viewIcons         = RClass.register(o, new APtyString('viewIcons'));
   //..........................................................
   // @style
   o._styleHead         = RClass.register(o, new AStyle('_styleHead'));
   o._styleHeadLabel    = RClass.register(o, new AStyle('_styleHeadLabel'));
   o._styleSearchPanel  = RClass.register(o, new AStyle('_styleSearchPanel'));
   o._styleSearchEdit   = RClass.register(o, new AStyle('_styleSearchEdit'));
   o._styleIconSortUp   = RClass.register(o, new AStyleIcon('_styleIconSortUp'));
   o._styleIconSortDown = RClass.register(o, new AStyleIcon('_styleIconSortDown'));
   //..........................................................
   // @attribute
   o.hasIconArea       = false;
   o.hasDropArea       = false;
   //..........................................................
   // @attribute
   o.table             = null;
   o.index             = null;
   o.iconMap           = null;
   o.sortType          = true;
   o.isDisplay         = true;
   o.searchHint        = "Search ...";
   //..........................................................
   // @html
   o._hIconPanel        = null;
   o._hIcon             = null;
   o._hHeadPanel        = null;
   o._hLabel            = null;
   o._hSortPanel        = null;
   o._hSortUp           = null;
   o._hSortDown         = null;
   o._hSearchPanel      = null;
   o._hSearchForm       = null;
   o._hSearchFormLine   = null;
   o._hSearchIconPanel  = null;
   o._hSearchIcon       = null;
   o._hSearchEditPanel  = null;
   o._hSearchEdit       = null;
   o._hSearchDropPanel  = null;
   o._hSearchDrop       = null;
   o._hFixPanel         = null;
   //..........................................................
   // @event
   o.onSearchEnter     = RClass.register(o, new AEventMouseEnter('onSearchEnter'));
   o.onSearchClick     = RClass.register(o, new AEventClick('onSearchClick'));
   o.onSearchLeave     = RClass.register(o, new AEventMouseLeave('onSearchLeave'));
   o.onSearchKeyDown   = RClass.register(o, new AEventKeyDown('onSearchKeyDown'));
   o.onCellMouseEnter  = RClass.register(o, new AEventMouseEnter('onCellMouseEnter'), FColumn_onCellMouseEnter);
   o.onCellMouseLeave  = RClass.register(o, new AEventMouseLeave('onCellMouseLeave'), FColumn_onCellMouseLeave);
   o.onCellMouseDown   = RClass.register(o, new AEventMouseDown('onCellMouseDown'), FColumn_onCellMouseDown);
   o.onCellClick       = RClass.register(o, new AEventClick('onCellClick'), FColumn_onCellClick);
   o.onCellDoubleClick = RClass.register(o, new AEventDoubleClick('onCellDoubleClick'), FColumn_onCellDoubleClick);
   o.onCellKeyDown     = RClass.register(o, new AEventKeyDown('onCellKeyDown'), FColumn_onCellKeyDown);
   // @event
   o.onDataKeyDown     = FColumn_onDataKeyDown;
   o.onDataChanged     = FColumn_onDataChanged;
   // @event
   o.onEditBegin       = FColumn_onEditBegin;
   o.onEditEnd         = FColumn_onEditEnd;
   o.onEditChanged     = FColumn_onEditChanged;
   //..........................................................
   // @event
   o.onHeadMouseDown   = RClass.register(o, new AEventMouseDown('onHeadMouseDown'), FColumn_onHeadMouseDown);
   //..........................................................
   // @process
   o.oeMode            = FColumn_oeMode;
   o.oeRefresh         = FColumn_oeRefresh;
   //..........................................................
   // @method
   o.createCell        = FColumn_createCell;
   o.createMoveable    = FColumn_createMoveable;
   o.searchValue       = FColumn_searchValue;
   o.setStyleStatus    = FColumn_setStyleStatus;
   o.cell              = FColumn_cell;
   o.equalsValue       = FColumn_equalsValue;
   o.setWidth          = FColumn_setWidth;
   o.setVisible        = FColumn_setVisible;
   o.moveCellFocus     = FColumn_moveCellFocus;
   o.getEditRange      = FColumn_getEditRange;
   o.dispose           = FColumn_dispose;
   o.dump              = FColumn_dump;
   return o;
}

//==========================================================
// <T>建立标签。</T>
//
// @method
// @param p:param:TEventProcess 事件
//==========================================================
function FColumn_onBuildLabel(p){
   var o = this;
   var hr = o._hFormLine;
   // 建立图标区
   if (o._icon) {
      var hip = o._hIconPanel = RBuilder.appendTableCell(hr);
      o._hIcon = RBuilder.appendIcon(hip, o.icon);
   }
   // 建立标题区
   if (o._label) {
      var hl = o._hLabel = RBuilder.appendTableCell(hr);
      hl.noWrap = true;
      hl.style.fontSize = '12';
      hl.style.fontWeight = 'bolder';
      // 设置可编辑性
      hl.style.color = o.editUpdate ? EColor.TextEdit : EColor.TextReadonly;
      // 设置标题颜色
      if(o.editUpdate && o.validRequire){
         hl.style.color = EColor.Require;
      }
      hl.align = o.labelAlign;
      hl.innerText = o.label();
   }
   // 建立排序区
   var hsp = o._hSortPanel = RBuilder.appendTableCell(hr);
   var hsu = o._hSortUp = RBuilder.appendIcon(hsp, o.styleIcon('SortUp', FColumn));
   hsu.style.display = 'none';
   var hsu = o._hSortDown = RBuilder.appendIcon(hsp, o.styleIcon('SortDown', FColumn));
   hsu.style.display = 'none';
   // 如果当前控件支持列表接口
   //if(RClass.isClass(o, MListView)){
      //o.setLabelStyle(o._hLabel);
   //}
}

//==========================================================
// <T>建立搜索编辑框。</T>
//
// @method
// @param p:param:TEventProcess 事件
//==========================================================
function FColumn_onBuildSearchEdit(p){
   var o = this;
   var hc = o._hSearchEditPanel = o._hSearchFormLine.insertCell();
   var he = o._hSearchEdit = RBuilder.append(hc, 'INPUT', o.styleName('SearchEdit'));
   // 关联事件
   //o.table.linkEvent(o, 'onColumnSearchKeyDown', he);
   o.attachEvent('onSearchClick', he);
   he.style.backgroundColor = "#FFFFFF";
   hc.style.backgroundColor = "#FFFFFF";
   //he.innerText = o.searchHint;
   // 设置文字对齐方式
   if(!RString.isEmpty(o._editAlign)){
      he.style.textAlign = o._editAlign;
   }
}

//==========================================================
// <T>建立搜索表单。</T>
//
// @method
// @param p:param:TEventProcess 事件
//==========================================================
function FColumn_onBuildSearchForm(p){
   var o = this;
   var hf = o._hSearchForm = RBuilder.appendTable(o._hSearchPanel);
   hf.width = '100%';
   hf.style.backgroundColor = '#FFFFFF';
   var hfl = o._hSearchFormLine = hf.insertRow();
   if(RClass.isClass(o, FColumnButton)){
      o._hSearchPanel.style.backgroundColor = '#EEEFF1';
      o._hSearchPanel.style.borderLeft='1 solid #808080';
      o._hSearchPanel.style.borderTop='1 solid #808080';
      o._hSearchPanel.style.borderBottom = '1 solid #9EC4EB';
      return;
   }
   // 建立图标区
   o.onBuildSearchIcon();
   // 建立编辑区
   o.onBuildSearchEdit();
   // 建立下拉区
   o.onBuildSearchDrop();
}

//==========================================================
// <T>建立搜索。</T>
//
// @method
// @param p:param:TEventProcess 事件
//==========================================================
function FColumn_onBuildSearch(p){
   var o = this;
   // 创建底板
   var h = o._hSearchPanel = RBuilder.create(p, 'TD', o.styleName('SearchPanel'));
   h.style.backgroundColor = "#FFFFFF";
   h.style.borderBottom = '1 solid #9EC4EB';
   RHtml.linkSet(h, 'control', o);
   // 关联事件
  o.attachEvent('onSearchEnter', h);
  o.attachEvent('onSearchLeave', h);
  // 创建布局
  o.onBuildSearchForm(p);
}

//==========================================================
// <T>建立搜索总计。</T>
//
// @method
// @param p:param:TEventProcess 事件
//==========================================================
function FColumn_onBuildTotal(p){
   var o = this;
   // 创建底板
   var h = o._hTotalPanel = RBuilder.create(p, 'TD');
   RHtml.linkSet(h, 'control', o);
   h.align = 'right';
   h.style.color = '#686860';
   h.style.backgroundColor = '#F8F8F0';
   h.style.borderBottom = '1 solid #B8B8B0';
   h.innerText = ' ';
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @param p:param:TEventProcess 事件
//==========================================================
function FColumn_onBuildPanel(p) {
   this._hPanel = RBuilder.create(p, 'TD');
}

//==========================================================
// <T>建立当前控件的显示框架。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
// @return EEventStatus 处理状态
//==========================================================
function FColumn_oeBuild(p) {
   var o = this;
   var t = o.table;
   // 设置绝对编辑标志
   o._absEdit = o._editInsert || o._editUpdate || o._editDelete;
   if(!o._absEdit){
      if(!RString.isEmpty(o._lovReference)){
         o._hasDropArea = true;
      }else{
         o._hasDropArea = false;
      }
   }
   // 分解的图标字符串，判断是否拥有图标区
   if (!RString.isEmpty(o._viewIcons)) {
      var im = o.iconMap = new TAttributes();
      im.split(o._viewIcons.replace(/\n/g, ';'), '=', ';');
      o.hasIconArea = im.count > 0;
   }
   // 调用底层建立对象
   o.__base.FControl.oeBuild.call(o, p);
   var hp = o._hPanel;
   hp.style.backgroundImage = 'url(' + RResource.iconPath('control.column.head') + ')';
   hp.style.padding = 4;
   // 创建标题头容器(TD对象)
   var hf = o._hForm = RBuilder.appendTable(hp);
   if (!o._orderAble) {
     hf.style.cursor = 'hand';
     //o.attachEvent('onHeadMouseDown', hf);
   }
   var hr = o._hFormLine = RBuilder.appendTableRow(o._hForm);
   o.onBuildLabel(p);
   // 创建搜索区
   o.onBuildSearch(p);
   // 创建统计区
   o.onBuildTotal(p);
   // 创建数据区的修正对象<TD>
   var h = o._hFixPanel = RBuilder.create(p, 'TD');
   h.height = 1;
   h.bgColor = '#FFFFFF'
   // 设置宽度
   if(!o.width){
      o.width = 60;
   }
   o._hPanel.style.pixelWidth = o.width;
   o._hFixPanel.style.pixelWidth = o.width;
   return EEventStatus.Stop;
}













//==========================================================
function FColumn_onCellMouseEnter(s, e){
   this.table.hoverRow(s.row, true);
}

//==========================================================
function FColumn_onCellMouseLeave(s, e){
   this.table.hoverRow(s.row, false);
}

//==========================================================
function FColumn_onCellMouseDown(s, e){
   var o = this;
   var t = s.table;
   var r = s.row;
   // 选中行
   t.__focusCell = s;
   t.selectRow(r, !e.ctrlKey, true);
   // 设置焦点
   var fc = RConsole.find(FFocusConsole);
   var c = fc.focusControl;
   if(RClass.isClass(c, FDropEditor)){
      if(c.source == s){
         return;
      }
   }
   RConsole.find(FFocusConsole).focus(s);
}

//==========================================================
function FColumn_onCellClick(s, e){
   this.table.clickRow(s.row);
}

//==========================================================
function FColumn_onCellDoubleClick(s, e){
   var o = this;
   var r = s.row;
   if(!o.isEditAble(r)){
      o.table.doubleClickRow(r);
   }
}

//==========================================================
function FColumn_onCellKeyDown(s, e, he){
   var o = this;
   if(he){
      o.table.onCellKeyDown(s, e, he);
   }
}

//==========================================================
function FColumn_oeMode(e){
   var o = this;
   if(e.isAfter()){
      var d = false;
      if(EAction.Design == e.mode){
         d = o.dispDesign;
      }else{
         d = o._dispList;
      }
      o.inModeDisplay = d;
      o.setVisible(d);
   }
   return EEventStatus.Continue;
}

//==========================================================
function FColumn_oeRefresh(e) {
   var o = this;
   if(e.isBefore()){
      o.setVisible(o._dispList);
   }
}

//==========================================================
function FColumn_onDataKeyDown(s, e) {
   var o = this;
   o.__base.MEditDescriptor.onDataKeyDown.call(o, s, e);
}

//==========================================================
function FColumn_onDataChanged(s, e) {
   var o = this;
   o.table.setDataStatus(s.row, EDataStatus.Update);
}

//==========================================================
function FColumn_onEditBegin(editor) {
   var o = this;
   var row = editor.row;
   o.editor = editor;
   o.table.editRow = row;
   o.table.editColumn = o;
   o.table.select(row, true);
   RLogger.debug(o, 'Edit begin (column={1} row={2} editor={3})', o.name, RClass.dump(row), RClass.dump(editor));
}

//==========================================================
function FColumn_onEditEnd(e) {
   var o = this;
   var row = editor.row;
   var text = editor.text();
   o.setValue(row, o.formatValue(text));
   o.setText(row, text);
   o.table.setDataStatus(row, row.isChanged() ? EDataStatus.Update : EDataStatus.Unknown)
   o.editor = null;
   RLogger.debug(o, '{1}={2}\n{3}\n{4}', RClass.dump(editor), o.formatValue(text), o.dump(), row.dump());
}

//==========================================================
function FColumn_onEditChanged(cell) {
   cell.row.refresh();
}

//==========================================================
function FColumn_onHeadMouseDown(e) {
   var o = this;
   var tbl = o.table;
   var ct = tbl.dsViewer.count;
   var x = e.x;
   if(!RClass.isClass(o, FColumnButton)){
	   var l = o._hPanel.offsetWidth;
	   var r = l - 6;
	   if (x > 0 && x < r) {
	      if (ct > 0 && !RClass.isClass(e.source, FColumnStatus)) {
	         // 设置排序信息
	         var cs = tbl.columns;
	         var len = cs.count;
	         for ( var n = 0; n < len; n++) {
	            var c = cs.value(n);
	            c._hSortUp.style.display = 'none';
	            c._hSortDown.style.display = 'none';
	         }
	         tbl.dsOrders.clear();
	         var oi = new TOrderItem();
	         var n = o.dataName;
	         if (o.sortType) {
	            oi.set(n, EOrder.Desc);
	            o._hSortUp.style.display = 'none';
	            o._hSortDown.style.display = 'block';
	         } else {
	            o._hSortUp.style.display = 'block';
	            o._hSortDown.style.display = 'none';
	            oi.set(n, EOrder.Asc);
	         }
	         o.sortType = !o.sortType;
	         tbl.dsOrders.push(oi);
	         // 重新获取数据
	         tbl.dsSearch();
	      }
   }
   }
}

//==========================================================
function FColumn_onRowClick(s, e){
   RConsole.find(FListenerConsole).process(FGridControl, EGridAction.RowClick, s.row, s.row);
}

//==========================================================
// <T>根据单元格类型，为行对象创建单元格对象，并设置可见性。</T>
//
// @method
// @param r:row:FRow 行对象
// @return FCell 单元格实例
//==========================================================
function FColumn_createCell() {
   var o = this;
   var c = RClass.create(o.__cellClass);
   c.name = o.name;
   c.table = o.table;
   c.column = o;
   c.build();
   c.setVisible(o._dispList);
   return c;
}

//==========================================================
function FColumn_createMoveable(p) {
   var o = this;
   var r = o.cloneMove;
   if (!r) {
      r = RClass.create(o.constructor);
      r.buildMode = EColumnMode.Drag;
      r.assign(o, EAssign.Property);
      r.build();
      // RWindow.append(r);
      // p.appendChild(r._hPanel);
      // var h = r.panel(EPanel.Move);
      // h.onmousedown = o.ohDragStart;
      // h.onmousemove = o.ohDrag;
      // h.onmouseup = o.ohDragStop;
      o.cloneMove = r;
   }
   var hc = o.panel(EPanel.Move);
   var hr = r.panel(EPanel.Move);
   RHtml.setPixelRect(hr, RHtml.rect(hc));
   hr.className = r.styleName('DesignMove');
   hr.style.pixelLeft = hc.offsetLeft;
   r.show();
   return r;
}

//==========================================================
function FColumn_searchValue() {
   var o = this;
   if(o._hSearchEdit){
      return o._hSearchEdit.value;
   }
}

//==========================================================
function FColumn_setStyleStatus(row, status) {
   var o = this;
   var h = o.cell(row);
   if (h) {
      var s = h.style;
      switch (status) {
      case EStyle.Normal:
         if (row.isDelete()) {
            s.backgroundColor = EColor.Delete;
         } else {
            if (o.isEditAble(row)) {
               s.backgroundColor = EColor.Edit;
            } else {
               s.backgroundColor = EColor.Readonly;
            }
         }
         break;
      case EStyle.Select:
         if (row.isDelete()) {
            s.backgroundColor = EColor.Select;
         } else {
            s.textDecoration = 'none';
            if (o.isEditAble(row)) {
               s.backgroundColor = EColor.RowEditSelect;
            } else {
               s.backgroundColor = EColor.Select;
            }
         }
         break;
      case EStyle.Delete:
         s.textDecoration = 'line-through';
         s.backgroundColor = EColor.Select;
         break;
      }
   }
}

//==========================================================
// <T>取得指定行上的当前列对象的单元格对象。</T>
//
// @method
// @param r:row:FRow 指定行对象
// @return FCell 单元格对象
//==========================================================
function FColumn_cell(r){
   return r.cell(this.index);
}

//==========================================================
function FColumn_equalsValue(s, t) {
   return RString.nvl(s).replace(/\n/g, '\\n').replace(/\r/g, '\\r') == RString.nvl(t).replace(/\n/g, '\\n').replace(/\r/g, '\\r');
}

//==========================================================
// <T>设置列的宽度。</T>
//
// @method
// @param w:width:Number 宽度
//==========================================================
function FColumn_setWidth(w){
   var o = this;
   o._hPanel.style.pixelWidth = w;
   o._hFixPanel.style.pixelWidth = w;
}

//==========================================================
function FColumn_setVisible(v){
   var o = this;
   o.isDisplay = v;
   var s = v ? 'block' : 'none';
   o._hPanel.style.display = s;
   o._hSearchPanel.style.display = s;
   o._hTotalPanel.style.display = s;
   o._hFixPanel.style.display = s;
}

//==========================================================
function FColumn_moveCellFocus(row, p) {
   var o = this;
   var t = o.table;
   // Find move targetCol/row/cell
   var mt = null;
   var mr = null;
   var mc = null;
   if(EPosition.Top == p){
      mt = o;
      mr = t.rows.get(t.rows.indexOf(row) - 1);
      if(mr){
         mc = mr.cell(mt.index);
      }
   }else if(EPosition.Bottom == p){
      mt = o;
      mr = t.rows.get(t.rows.indexOf(row) + 1);
      if(mr){
         mc = mr.cell(mt.index);
      }
   }else if (EPosition.Before == p){
      var fi = o.index - 1;
      var ri = t.rows.indexOf(row);
      for(var n = ri; n >= 0; n--){
         var fr = t.rows.get(n);
         for( var i = fi; i >= 0; i--){
            var ft = t.columns.value(i);
            if(RClass.isClass(ft, FColumn) && ft._dispList){
               mt = ft;
               mr = fr;
               mc = mr.cell(mt.index);
               break;
            }
         }
         if(mt){
            break;
         }
         fi = t.columns.count - 1;
      }
   }else if(EPosition.After == p){
      var fi = o.index + 1;
      var ri = t.rows.indexOf(row);
      var cc = t.columns.count;
      var rc = t.rows.count;
      for(var n = ri; n < rc; n++){
         var fr = t.rows.get(n);
         for(var i = fi; i < cc; i++){
            var ft = t.columns.value(i);
            if(RClass.isClass(ft, FColumn) && ft._dispList){
               mt = ft;
               mr = fr;
               mc = mr.cell(mt.index);
               break;
            }
         }
         if(mt){
            break;
         }
         fi = 0;
      }
   }
   // Move focus
   if(mt && mr && mc){
      mc.focus(true);
      RConsole.find(FFocusConsole).focus(mc);
   }
}

//==========================================================
function FColumn_getEditRange(){
   var o = this;
   var hc = o._hSearchPanel;
   var p = RHtml.offsetPosition(hc);
   var w = hc.offsetWidth;
   var h = hc.offsetHeight;
   return new TRange(p.x, p.y, w, h);
}

//==========================================================
function FColumn_dispose(){
   var o = this;
   o.__base.FControl.dispose.call(o);
   RMemory.freeHtml(o._hSearchPanel);
   RMemory.freeHtml(o._hFixPanel);
   o._hForm = null;
   o._hFormLine = null;
   o._hIconPanel = null;
   o._hIcon = null;
   o._hHeadPanel = null;
   o._hLabel = null;
   o._hSortPanel = null;
   o._hSortUp = null;
   o._hSortDown = null;
   o._hSearchPanel = null;
   o._hSearchForm = null;
   o._hSearchFormLine = null;
   o._hSearchIconPanel = null;
   o._hSearchIcon = null;
   o._hSearchEditPanel = null;
   o._hSearchEdit = null;
   o._hSearchDropPanel = null;
   o._hSearchDrop = null;
   o._hFixPanel = null;
}

//==========================================================
function FColumn_dump(s) {
   var o = this;
   s = RString.nvlStr(s);
   s.append(RClass.dump(o), '[');
   s.append('name=', o.name);
   s.appendIf(o.icon, ',icon=', o.icon);
   s.appendIf(o.label, ',label=', o.label);
   s.appendIf(o.align, ',align=', o.align);
   s.appendIf(o.valign, ',valign=', o.valign);
   s.appendIf(o.dataName, ',dataName=', o.dataName);
   s.appendIf(o.dataDefault, ',dataDefault=', o.dataDefault);
   s.appendIf(o.index, ',index=', o.index);
   s.append(']');
   s.append(' [editAccess=');
   s.append(o.editInsert ? 'I' : '_');
   s.append(o.editUpdate ? 'U' : '_');
   s.append(']');
   return s;
}
