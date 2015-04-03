//==========================================================
// <T>场景画板工具栏。</T>
//
// @class
// @author maocy
// @history 150210
//==========================================================
function FDsSolutionPropertyToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   //..........................................................
   // @property
   o._frameName           = 'design3d.solution.PropertyToolBar';
   //..........................................................
   // @attribute
   o._controlInsertButton = null;
   o._controlUpdateButton = null;
   o._controlDeleteButton = null;
   //..........................................................
   // @event
   o.onBuilded            = FDsSolutionPropertyToolBar_onBuilded;
   // @event
   o.onUpdateClick        = FDsSolutionPropertyToolBar_onUpdateClick;
   //..........................................................
   // @method
   o.construct            = FDsSolutionPropertyToolBar_construct;
   // @method
   o.dispose              = FDsSolutionPropertyToolBar_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsSolutionPropertyToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
   //..........................................................
   // 按键事件关联
   o._controlUpdateButton.addClickListener(o, o.onUpdateClick);
}

//==========================================================
// <T>更新按键点击处理。</T>
//
// @method
// @param event:SClickEvent 点击事件
//==========================================================
function FDsSolutionPropertyToolBar_onUpdateClick(event){
   var o = this;
   var guid = o._workspace._activeProjectGuid;
   window.location = 'Project.wa?do=detail&guid=' + guid;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsSolutionPropertyToolBar_construct(){
   var o = this;
   // 父处理
   o.__base.FUiToolBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsSolutionPropertyToolBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiToolBar.dispose.call(o);
}
