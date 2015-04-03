//==========================================================
// <T>空间属性页面。</T>
//
// @class
// @author maocy
// @history 150325
//==========================================================
function FDsSpacePropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   //..........................................................
   // @attribute
   o._visible      = false;
   // @attribute
   o._workspace    = null;
   o._activeSpace  = null;
   // @attribute
   o._controlGuid  = null;
   o._controlCode  = null;
   o._controlLabel = null;
   //..........................................................
   // @event
   o.onBuilded     = FDsSpacePropertyFrame_onBuilded;
   o.onDataChanged = FDsSpacePropertyFrame_onDataChanged;
   //..........................................................
   // @method
   o.construct     = FDsSpacePropertyFrame_construct;
   // @method
   o.loadObject    = FDsSpacePropertyFrame_loadObject;
   // @method
   o.dispose       = FDsSpacePropertyFrame_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsSpacePropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   // 关联事件
   o._controlLabel.addDataChangedListener(o, o.onDataChanged);
}

//==========================================================
// <T>数据改变处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsSpacePropertyFrame_onDataChanged(p){
   var o = this;
   var space = o._activeSpace;
   var resource = space.resource();
   // 设置属性
   resource.setLabel(o._controlLabel.get());
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsSpacePropertyFrame_construct(){
   var o = this;
   // 父处理
   o.__base.FUiForm.construct.call(o);
}

//==========================================================
// <T>加载材质信息。</T>
//
// @method
// @param space:FE3dSpace 空间
//==========================================================
function FDsSpacePropertyFrame_loadObject(space){
   var o = this;
   var resource = space.resource();
   // 设置属性
   o._activeSpace = space;
   // 设置参数
   o._controlGuid.set(resource.guid());
   o._controlCode.set(resource.code());
   o._controlLabel.set(resource.label());
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsSpacePropertyFrame_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiForm.dispose.call(o);
}