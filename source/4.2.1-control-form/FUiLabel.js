//==========================================================
// <T>文本控件。</T>
//
// @class
// @author maocy
// @version 150123
//==========================================================
function FUiLabel(o){
   o = RClass.inherits(this, o, FEditControl);
   //..........................................................
   // @event
   o.onBuildEdit  = FUiLabel_onBuildEdit;
   //..........................................................
   // @method
   o.text         = FUiLabel_text;
   o.setText      = FUiLabel_setText;
   o.refreshStyle = RMethod.empty;
   return o;
}

//==========================================================
// <T>建立编辑框。</T>
//
// @method
//==========================================================
function FUiLabel_onBuildEdit(){
   var o = this;
   //o.hEdit = o.hEditCell;
   //if(o.dataDefault){
   //   o.hEdit.innerHTML = RString.nvl(o.dataDefault);
   //}
}

//==========================================================
// <T>获取文本内容。</T>
//
// @method
// @return String 文本内容
//==========================================================
function FUiLabel_text(){
   //return this.hEdit.innerText;
}

//==========================================================
// <T>设置文本内容。</T>
//
// @method
// @param t:text:String 文本内容
//==========================================================
function FUiLabel_setText(t){
   //this.hEdit.innerHTML = RString.nvl(t);
}
