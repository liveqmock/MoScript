﻿//==========================================================
// <T>简单颜色渲染器。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FG3dShadowTechnique(o){
   o = RClass.inherits(this, o, FG3dTechnique);
   //..........................................................
   // @attribute
   o._name      = 'shadow';
   // @attribute
   o._passDepth = null;
   o._passColor = null;
   //..........................................................
   // @method
   o.setup      = FG3dShadowTechnique_setup;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
function FG3dShadowTechnique_setup(){
   var o = this;
   o.__base.FG3dTechnique.setup.call(o);
   var ps = o._passes;
   // 创建光深处理过程
   var p = o._passDepth = RClass.create(FG3dShadowDepthPass);
   p.linkContext(o._context);
   p.setup();
   ps.push(p);
   // 创建颜色处理过程
   var p = o._passColor = RClass.create(FG3dShadowColorPass);
   p.linkContext(o._context);
   p.setup();
   ps.push(p);
}