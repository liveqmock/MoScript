//==========================================================
// <T>渲染可绘制对象。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FG3dRenderable(o){
   o = RClass.inherits(this, o, FGraphicRenderable);
   //..........................................................
   // @attribute
   o._matrix            = null;
   // @attribute
   o._effectName        = null;
   o._effect            = null;
   o._materialName      = null;
   o._material          = null;
   o._materialReference = null;
   //..........................................................
   // @method
   o.construct          = FG3dRenderable_construct;
   o.matrix             = FG3dRenderable_matrix;
   o.effectName         = FG3dRenderable_effectName;
   o.material           = FG3dRenderable_material;
   o.testVisible        = FG3dRenderable_testVisible;
   o.update             = FG3dRenderable_update;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FG3dRenderable_construct(){
   var o = this;
   o.__base.FGraphicRenderable.construct.call(o);
   o._matrix = new SMatrix3d();
   o._material = RClass.create(FG3dMaterial);
}

//==========================================================
// <T>获得矩阵。</T>
//
// @method
// @return 矩阵
//==========================================================
function FG3dRenderable_matrix(){
   return this._matrix;
}

//==========================================================
// <T>获得效果器名称。</T>
//
// @method
// @return String 效果器名称
//==========================================================
function FG3dRenderable_effectName(){
   return this._effectName;
}

//==========================================================
// <T>获得材质。</T>
//
// @method
// @return 材质
//==========================================================
function FG3dRenderable_material(){
   return this._material;
}

//==========================================================
// <T>测试是否可见。</T>
//
// @method
// @return Boolean 是否可见
//==========================================================
function FG3dRenderable_testVisible(){
   return true;
}

//==========================================================
// <T>更新处理。</T>
//
// @method
//==========================================================
function FG3dRenderable_update(p){
   var o = this;
   o._matrix.assign(p);
}