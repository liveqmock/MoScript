﻿//==========================================================
// <T>播放信息。</T>
//
// @struct
// @author maocy
// @version 150112
//==========================================================
function SRd3PlayInfo(o){
   if(!o){o = this;}
   //..........................................................
   // @attribute
   o.tick         = 0;
   o.playRate     = 1.0;
   o.currentFrame = null;
   o.nextFrame    = null;
   o.rate         = 1.0;
   o.alpha        = 1.0;
   o.translation  = new SPoint3();
   o.quaternion   = new SQuaternion();
   o.scale        = new SVector3();
   o.matrix       = new SMatrix3d();
   //..........................................................
   o.update       = SRd3PlayInfo_update;
   return o;
}

//============================================================
// <T>更新数据。</T>
//
// @method
//============================================================
function SRd3PlayInfo_update(){
   var o = this;
   // 检查参数
   if(o.currentFrame == null){
      return false;
   }
   if(o.nextFrame == null){
      return false;
   }
   // 获得矩阵
   var m = o.matrix;
   var ct = o.currentFrame.translation();
   var cr = o.currentFrame.quaternion();
   var cs = o.currentFrame.scale();
   // 计算插值矩阵
   var r = o.rate;
   if((r > 0) && (r < 1)){
      // 计算中间矩阵
      var nt = o.nextFrame.translation();
      var nr = o.nextFrame.quaternion();
      var ns = o.nextFrame.scale();
      o.translation.slerp(ct, nt, r);
      o.quaternion.slerp(cr, nr, r);
      o.scale.slerp(cs, ns, r);
      m.build(o.translation, o.quaternion, o.scale);
      // 计算插值透明度
      //alpha = (next.alpha - current.alpha) * rate + current.alpha;
   }else{
      // 计算插值透明度
      m.build(ct, cr, cs);
      //alpha = currentPtr->Alpha();
   }
   return true;
}
