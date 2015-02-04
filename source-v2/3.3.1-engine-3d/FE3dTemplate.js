 //==========================================================
// <T>渲染模板。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FE3dTemplate(o){
   o = RClass.inherits(this, o, FDisplay3d, MListenerLoad);
   //..........................................................
   // @attribute
   o._dataReady     = false;
   o._ready         = false;
   o._resource      = null;
   // @attribute
   o._meshAnimation = null;
   o._animation     = null;
   // @attribute
   o._resource      = null;
   o._displays      = null;
   //..........................................................
   // @method
   o.testReady      = FE3dTemplate_testReady;
   // @method
   o.displays       = FE3dTemplate_displays;
   o.meshAnimation  = FE3dTemplate_meshAnimation;
   // @method
   o.setResource    = FE3dTemplate_setResource;
   o.loadResource   = FE3dTemplate_loadResource;
   o.reloadResource = FE3dTemplate_reloadResource;
   // @method
   o.processLoad    = FE3dTemplate_processLoad;
   o.process        = FE3dTemplate_process;
   return o;
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @method
// @return 是否准备好
//==========================================================
function FE3dTemplate_testReady(){
   return this._dataReady;
}

//==========================================================
// <T>获得显示集合。</T>
//
// @method
// @return TObjects 显示集合
//==========================================================
function FE3dTemplate_displays(){
   return this._displays;
}

//==========================================================
// <T>获得网格动画。</T>
//
// @method
// @return FRd3MeshAnimation 显示集合
//==========================================================
function FE3dTemplate_meshAnimation(){
   var o = this;
   var a = o._meshAnimation;
   if(!a){
      a = o._meshAnimation = RClass.create(FRd3MeshAnimation);
   }
   return a;
}

//==========================================================
// <T>设置资源模板。</T>
//
// @method
// @param p:resource:FRs3Template 资源模板
//==========================================================
function FE3dTemplate_setResource(p){
   this._resource = p;
}

//==========================================================
// <T>加载资源模板。</T>
//
// @method
// @param p:resource:FRs3Template 资源模板
//==========================================================
function FE3dTemplate_loadResource(p){
   var o = this;
   // 加载资源渲染集合
   var rs = p.displays();
   var c = rs.count();
   if(c > 0){
      var ds = o._displays = new TObjects();
      for(var i = 0; i < c; i++){
         var r = rs.get(i);
         var d = RClass.create(FE3dTemplateRenderable);
         d._display = o;
         d._context = o._context;
         d.loadResource(r);
         ds.push(d);
      }
   }
}

//==========================================================
// <T>重新加载资源。</T>
//
// @method
//==========================================================
function FE3dTemplate_reloadResource(){
   var o = this;
   var s = o._displays;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         s.get(i).reloadResource();
      }
   }
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
function FE3dTemplate_processLoad(){
   var o = this;
   if(o._ready){
      return true;
   }
   // 加载资源
   if(!o._dataReady){
      if(!o._resource.testReady()){
         return false;
      }
      o.loadResource(o._resource);
      o._dataReady = true;
   }
   // 加载渲染对象
   var ds = o._displays;
   var c = ds.count();
   for(var i = 0; i < c; i++){
      var d = ds.get(i);
      if(!d.testReady()){
         return false;
      }
   }
   if(c > 0){
      var rs = o._renderables = new TObjects();
      for(var i = 0; i < c; i++){
         var d = ds.get(i);
         d.load();
         o._renderables.push(d);
      }
   }
   // 加载完成
   o.processLoadListener(o);
   o._ready = true;
   return o._ready;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function FE3dTemplate_process(){
   var o = this;
   o.__base.FDisplay3d.process.call(o);
   // 处理动画集合
   if(o._animation){
      o._animation.process();
   }
   return true;
}
