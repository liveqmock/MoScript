﻿//==========================================================
// <T>类型数组的工具类</T>
//
// @reference
// @author maocy
// @version 150112
//==========================================================
var RTypeArray = new function RTypeArray(){
   var o = this;
   //..........................................................
   // @attribute
   o._float3  = null;
   o._float4  = null;
   o._data    = new Object();
   //..........................................................
   // @method
   o.float3      = RTypeArray_float3;
   o.float4      = RTypeArray_float4;
   o.createArray = RTypeArray_createArray;
   o.findTemp    = RTypeArray_findTemp;
   return o;
}

//==========================================================
// <T>获得3元素浮点数。</T>
//
// @method
// @return Float32Array 浮点数
//==========================================================
function RTypeArray_float3(){
   var o = this;
   var v = o._float3;
   if(v == null){
      v = o._float3 = new Float32Array(3);
   }
   return v;
}

//==========================================================
// <T>获得4元素浮点数。</T>
//
// @method
// @return Float32Array 浮点数
//==========================================================
function RTypeArray_float4(){
   var o = this;
   var v = o._float4;
   if(v == null){
      v = o._float4 = new Float32Array(4);
   }
   return v;
}

//==========================================================
// <T>创建定长的数组。</T>
//
// @method
// @param t:typeCd:EDataType 数据类型
// @param l:length:Integer 数据长度
// @return Array 数组
//==========================================================
function RTypeArray_createArray(t, l){
   switch(t){
      case EDataType.Boolean:
      case EDataType.Int8:
         return new Int8Array(l);
      case EDataType.Int16:
         return new Int16Array(l);
      case EDataType.Int32:
         return new Int32Array(l);
      case EDataType.Int64:
         return new Int64Array(l);
      case EDataType.Uint8:
         return new Uint8Array(l);
      case EDataType.Uint16:
         return new Uint16Array(l);
      case EDataType.Uint32:
         return new Uint32Array(l);
      case EDataType.Float32:
         return new Float32Array(l);
      case EDataType.Float64:
         return new Float64Array(l);
   }
   throw new TError('Create unknown type array. (type={1}, length={2})', t, l);
}

//==========================================================
// <T>获得唯一的临时数组。</T>
//
// @method
// @param t:typeCd:EDataType 数据类型
// @param l:length:Integer 数据长度
// @return Array 数组
//==========================================================
function RTypeArray_findTemp(t, l){
   var o = this;
   var d = o._data;
   // 获得类型集合
   var s = d[t];
   if(s == null){
      s = d[t] = new Object();
   }
   // 获得类型长度
   var r = s[l];
   if(r == null){
      r = s[l] = o.createArray(t, l);
   }
   return r;
}
