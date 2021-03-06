//==========================================================
// <T>平面渲染纹理。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FG3dFlatTexture(o){
   o = RClass.inherits(this, o, FG3dTexture);
   //..........................................................
   // @attribute
   o.width      = 0;
   o.height     = 0;
   //..........................................................
   // @method
   o.construct  = FG3dFlatTexture_construct;
   // @method
   o.uploadData = RMethod.virtual(o, 'uploadData');
   o.upload     = RMethod.virtual(o, 'upload');
   o.update     = RMethod.empty;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FG3dFlatTexture_construct(){
   var o = this;
   o.__base.FG3dTexture.construct();
   o._textureCd = EG3dTexture.Flat2d;
}
