﻿//==========================================================
// <T>三维坐标结构。</T>
//
// @struct
// @author maocy
// @version 141230
//==========================================================
function SPoint3(x, y, z){
   var o = this;
   //..........................................................
   // @attribute
   o.x           = x;
   o.y           = y;
   o.z           = z;
   //..........................................................
   // @method
   o.set         = SPoint3_set;
   o.resize      = SPoint3_resize;
   o.slerp       = SPoint3_slerp;
   o.serialize   = SPoint3_serialize;
   o.unserialize = SPoint3_unserialize;
   o.toString    = SPoint3_toString;
   o.dump        = SPoint3_dump;
   return o;
}

//==========================================================
// 设置三维坐标，初始化
//
// @tool
// @param x:xPosition:Integer X坐标
// @param y:yPosition:Integer Y坐标
// @param z:zPosition:Integer Z坐标
//==========================================================
function SPoint3_set(x, y, z){
   var o = this;
   if(x != null){
      o.x = x;
   }
   if(y != null){
      o.y = y;
   }
   if(z != null){
      o.z = z;
   }
}

//==========================================================
// 把坐标的三个坐标放大X Y Z
//
// @tool
// @param x:xPosition:Integer X坐标
// @param y:yPosition:Integer Y坐标
// @param z:zPosition:Integer Z坐标
//==========================================================
function SPoint3_resize(x, y, z){
   var o = this;
   if(x != null){
      o.x += x;
   }
   if(y != null){
      o.y += y;
   }
   if(z != null){
      o.z += z;
   }
}

//==========================================================
// <T>计算插值。</T>
//
// @method
// @param v1:value1:SPoint3 开始坐标
// @param v2:value2:SPoint3 结束坐标
// @param r:rate:Float 比率
//==========================================================
function SPoint3_slerp(v1, v2, r){
   var o = this;
   o.x = (v2.x - v1.x) * r + v1.x;
   o.y = (v2.y - v1.y) * r + v1.y;
   o.z = (v2.z - v1.z) * r + v1.z;
}

//==========================================================
// <T>序列化数据到输出流里。</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
function SPoint3_serialize(p){
   var o = this;
   p.writeFloat(o.x);
   p.writeFloat(o.y);
   p.writeFloat(o.z);
}

//==========================================================
// <T>从输入流里反序列化数据。</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
function SPoint3_unserialize(p){
   var o = this;
   o.x = p.readFloat();
   o.y = p.readFloat();
   o.z = p.readFloat();
}

//==========================================================
// <T>获得字符串。</T>
//
// @return String 字符串
//==========================================================
function SPoint3_toString(){
   var o = this;
   return o.x + ',' + o.y + ',' + o.z;
}

//==========================================================
// ???
//
// @tool
// @param x:xPosition:Integer X坐标
// @param y:yPosition:Integer Y坐标
// @param z:zPosition:Integer Z坐标
//==========================================================
function SPoint3_dump(){
   return RClass.dump(this) + ' [' + this.x + ',' + this.y + ',' + this.z + ']';
}
