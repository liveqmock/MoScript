﻿//==========================================================
// <T>事件信息类。</T>
//
// @struct
// @author maocy
// @version 150113
//==========================================================
function SEvent(o){
   if(!o){o = this;}
   //..........................................................
   // @attribute
   o.name    = null;
   o.hSource = null;
   return o;
}