//==========================================================
// <T>WebGL渲染器。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FWglFragmentShader(o){
   o = RClass.inherits(this, o, FRenderFragmentShader);
   //..........................................................
   // @attribute
   o._native = null;
   // @method
   o.setup   = FWglFragmentShader_setup;
   o.upload  = FWglFragmentShader_upload;
   o.dispose = FWglFragmentShader_dispose;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
function FWglFragmentShader_setup(){
   var o = this;
   o.__base.FRenderFragmentShader.setup.call(o);
   var g = o._context._native;
   o._native = g.createShader(g.FRAGMENT_SHADER);
}

//==========================================================
// <T>上传渲染代码。</T>
//
// @method
// @param v:value:String 渲染代码
//==========================================================
function FWglFragmentShader_upload(v){
   var o = this;
   var g = o._context._native;
   var n = o._native;
   // 上传代码
   g.shaderSource(n, v);
   // 编译处理
   g.compileShader(n);
   var r = g.getShaderParameter(n, g.COMPILE_STATUS);
   if(!r){
      var i = g.getShaderInfoLog(n);
      RLogger.fatal(o, null, 'Upload fragment shader source failure. (error={1})\n{2}', i, v);
      g.deleteShader(s); 
      o._native = null;
      return false;
   }
   o._source = v;
   return true;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FWglFragmentShader_dispose(){
   var o = this;
   var g = o._context._native;
   if(o._native){
      g.deleteShader(o._native);
   }
   o._native = null;
   o.__base.FRenderFragmentShader.dispose.call(o);
}