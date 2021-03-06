//==========================================================
// <T>渲染模型控制台。</T>
//
// @console
// @author maocy
// @version 150106
//==========================================================
function FE3dModelConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._scopeCd    = EScope.Local;
   // @attribute
   o._loadModels = null;
   o._models     = null;
   // @attribute
   o._thread     = null;
   o._interval   = 100;
   //..........................................................
   // @event
   o.onProcess   = FE3dModelConsole_onProcess;
   //..........................................................
   // @method
   o.construct   = FE3dModelConsole_construct;
   o.models      = FE3dModelConsole_models;
   o.alloc       = FE3dModelConsole_alloc;
   o.free        = FE3dModelConsole_free;
   return o;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function FE3dModelConsole_onProcess(){
   var o = this;
   var ms = o._loadModels;
   ms.record();
   while(ms.next()){
      var m = ms.current();
      if(m.processLoad()){
         ms.removeCurrent();
      }
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dModelConsole_construct(){
   var o = this;
   // 设置属性
   o._loadModels = new TLooper();
   o._models = new TDictionary();
   // 创建线程
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}

//==========================================================
// <T>获得渲染模型集合。</T>
//
// @method
// @return TDictionary 渲染模型集合
//==========================================================
function FE3dModelConsole_models(){
   return this._models;
}

//==========================================================
// <T>加载一个模型。</T>
//
// @method
// @param pc:content:FRenderContent 名称
// @param pn:name:String 名称
// @return FRenderModel 渲染模型
//==========================================================
function FE3dModelConsole_alloc(pc, pn){
   var o = this;
   // 尝试从缓冲池中取出
   var ms = o._models.get(pn);
   if(ms){
      if(!ms.isEmpty()){
         return ms.pop();
      }
   }
   // 加载渲染对象
   var rmc = RConsole.find(FE3rModelConsole);
   var rm = rmc.load(pc, pn);
   // 加载模型
   var m = RClass.create(FModel3d);
   m._context = pc;
   m._name = pn;
   m._modelName = pn;
   m._renderable = rm;
   // 测试是否已加载
   //if(rm.testReady()){
   //   m.load(rm);
   //}else{
      // 增加加载中
      o._loadModels.push(m);
   //}
   return m;
}

//==========================================================
// <T>释放一个模型。</T>
//
// @method
// @param p:model:FModel3d 模型
//==========================================================
function FE3dModelConsole_free(p){
   var o = this;
   // 脱离父对象
   p.remove();
   // 放到缓冲池
   var n = p._modelName;
   var ms = o._models.get(n);
   if(ms == null){
      ms = new TObjects();
      o._models.set(n, ms);
   }
   ms.push(p);
}
