//==========================================================
// <T>渲染布局元素。</T>
//
// @class
// @author maocy
// @history 150212
//==========================================================
MO.Graphic3d.FG3dLayoutElement = function FG3dLayoutElement(o){
   o = RClass.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._name   = 0;
   o._buffer = null;
   //..........................................................
   // @method
   o.name   = FG3dLayoutElement_name;
   return o;

   //==========================================================
   // <T>获得名称。</T>
   //
   // @return 名称
   //==========================================================
   function FG3dLayoutElement_name(){
      return this._name;
   }
}