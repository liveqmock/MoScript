//==========================================================
// <T>模板画板。</T>
//
// @author maocy
// @history 150130
//==========================================================
function FDsSceneCanvas(o){
   o = RClass.inherits(this, o, FDsCanvas);
   //..........................................................
   // @attribute
   o._graphicContext      = null;
   o._canvasModeCd        = EDsCanvasMode.Drop;
   o._canvasMoveCd        = EDsCanvasDrag.Unknown;
   o._activeScene         = null;
   o._rotation            = null;
   o._optionRotation      = false;
   o._capturePosition     = null;
   o._captureMatrix       = null;
   o._captureRotation     = null;
   o._dimensional         = null;
   o._selectObject        = null;
   o._selectRenderables   = null;
   // @attribute
   o._cameraMoveRate      = 0.8;
   o._cameraKeyRotation   = 0.03;
   o._cameraMouseRotation = 0.005;
   // @attribute
   o._templateMatrix      = null;
   o._templateRenderable  = null;
   o._templateFace        = null;
   o._templateTranslation = null;
   o._templateRotation    = null;
   o._templateScale       = null;
   o._templateViewScale   = 0.05;
   //..........................................................
   // @event
   o.onBuild              = FDsSceneCanvas_onBuild;
   o.onMouseCaptureStart  = FDsSceneCanvas_onMouseCaptureStart;
   o.onMouseCapture       = FDsSceneCanvas_onMouseCapture;
   o.onMouseCaptureStop   = FDsSceneCanvas_onMouseCaptureStop;
   o.onEnterFrame         = FDsSceneCanvas_onEnterFrame;
   o.onSceneLoad          = FDsSceneCanvas_onSceneLoad;
   //..........................................................
   o.oeResize             = FDsSceneCanvas_oeResize;
   o.oeRefresh            = FDsSceneCanvas_oeRefresh;
   //..........................................................
   // @method
   o.construct            = FDsSceneCanvas_construct;
   // @method
   o.innerSelectDisplay   = FDsSceneCanvas_innerSelectDisplay;
   o.innerSelectLayer     = FDsSceneCanvas_innerSelectLayer;
   o.selectNone           = FDsSceneCanvas_selectNone;
   o.selectLayers         = FDsSceneCanvas_selectLayers;
   o.selectLayer          = FDsSceneCanvas_selectLayer;
   o.selectDisplay        = FDsSceneCanvas_selectDisplay;
   o.selectMaterial       = FDsSceneCanvas_selectMaterial;
   o.selectRenderable     = FDsSceneCanvas_selectRenderable;
   o.switchMode           = FDsSceneCanvas_switchMode;
   o.switchPlay           = FDsSceneCanvas_switchPlay;
   o.switchMovie          = FDsSceneCanvas_switchMovie;
   o.reloadRegion         = FDsSceneCanvas_reloadRegion;
   o.loadScene            = FDsSceneCanvas_loadScene;
   // @method
   o.dispose              = FDsSceneCanvas_dispose;
   return o;
}

//==========================================================
// <T>构建处理。</T>
//
// @method
// @param p:event:TEventProcess 处理事件
//==========================================================
function FDsSceneCanvas_onBuild(p){
   var o = this;
   o.__base.FDsCanvas.onBuild.call(o, p);
   // 创建界面控制器
   var c = o._graphicContext;
   var tc = RConsole.find(FE3dTemplateConsole);
   var t = o._templateTranslation = tc.allocByCode(c, 'com.design.translation');
   t._optionFace = true;
   t.hide();
   var t = o._templateRotation = tc.allocByCode(c, 'com.design.rotation');
   t._optionFace = true;
   t.hide();
   var t = o._templateScale = tc.allocByCode(c, 'com.design.scale');
   t._optionFace = true;
   t.hide();
}

//==========================================================
// <T>鼠标捕捉开始处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsSceneCanvas_onMouseCaptureStart(p){
   var o = this;
   var s = o._activeScene;
   if(!s){
      return;
   }
   // 选取物件
   var r = o._activeScene.region();
   var st = RConsole.find(FG3dTechniqueConsole).find(o._graphicContext, FG3dSelectTechnique);
   var r = st.test(r, p.offsetX, p.offsetY);
   o.selectRenderable(r);
   o._capturePosition.set(p.clientX, p.clientY);
   o._captureRotation.assign(s.camera()._rotation);
   if(r){
      var d = r.display();
      o._captureMatrix.assign(d.matrix());
   }
   // 记录坐标
   o._templateMatrix.identity();
   if(o._templateFace){
      o._templateFaceMatrix.assign(o._templateFace.matrix());
      // 记录选中坐标
      var rs = o._selectRenderables;
      for(var i = rs.count() - 1; i >= 0; i--){
         var r = rs.getAt(i);
         if(!r._dragMatrix){
            r._dragMatrix = new SMatrix3d();
         }
         r._dragMatrix.assign(r.matrix());
      }
   }
}

//==========================================================
// <T>鼠标捕捉处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsSceneCanvas_onMouseCapture(p){
   var o = this;
   var s = o._activeScene;
   if(!s){
      return;
   }
   var cx = p.clientX - o._capturePosition.x;
   var cy = p.clientY - o._capturePosition.y;
   var mc = o._canvasModeCd;
   var mv = o._canvasMoveCd;
   var cm = o._captureMatrix;
   var sm = null;
   //var sr = o._templateRenderable;
   //if(sr){
   //   var sd = sr.display();
   //   sm = sd.matrix();
   //}
   var tf = o._templateFace;
   var tm = o._templateMatrix;
   switch(mc){
      case EDsCanvasMode.Drop:
         var c = o._activeScene.camera();
         var r = c.rotation();
         var cr = o._captureRotation;
         r.x = cr.x - cy * o._cameraMouseRotation;
         r.y = cr.y - cx * o._cameraMouseRotation;
         break;
      case EDsCanvasMode.Select:
         break;
      case EDsCanvasMode.Translate:
         if(tf){
            if(mv == EDsCanvasDrag.X){
               tm.tx = cx / 10;
            }else if(mv == EDsCanvasDrag.Y){
               tm.ty = -cy / 10;
            }else if(mv == EDsCanvasDrag.Z){
               tm.tz = cx / 10;
            }
         }
         break;
      case EDsCanvasMode.Rotation:
         if(tf){
            if(mv == EDsCanvasDrag.X){
               tm.rx = cx / 10;
            }else if(mv == EDsCanvasDrag.Y){
               tm.ry = -cy / 10;
            }else if(mv == EDsCanvasDrag.Z){
               tm.rz = cx / 10;
            }
         }
         break;
      case EDsCanvasMode.Scale:
         if(tf){
            if(mv == EDsCanvasDrag.X){
               tm.sx = cx / 10;
            }else if(mv == EDsCanvasDrag.Y){
               tm.sy = -cy / 10;
            }else if(mv == EDsCanvasDrag.Z){
               tm.sz = cx / 10;
            }else if(mv == EDsCanvasDrag.All){
               tm.sx = cx / 10;
               tm.sy = cx / 10;
               tm.sz = cx / 10;
            }
         }
         break;
   }
   // 移动选中集合
   if(tf){
      // 移动操作对象
      tf.matrix().merge(o._templateFaceMatrix, tm);
      // 移动选中对象
      var rs = o._selectRenderables;
      for(var i = rs.count() - 1; i >= 0; i--){
         var r = rs.getAt(i);
         r._matrix.merge(r._dragMatrix, tm);
      }
   }
}

//==========================================================
// <T>鼠标捕捉结束处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsSceneCanvas_onMouseCaptureStop(p){
}

//==========================================================
// <T>每帧处理。</T>
//
// @method
//==========================================================
function FDsSceneCanvas_onEnterFrame(){
   var o = this;
   var s = o._activeScene;
   if(!s){
      return;
   }
   var st = s.timer();
   var ss = st.spanSecond();
   //..........................................................
   // 按键处理
   var c = s.camera();
   var d = o._cameraMoveRate * ss;
   var r = o._cameraKeyRotation * ss;
   // 按键前后移动
   var kf = RKeyboard.isPress(EStageKey.Forward);
   var kb = RKeyboard.isPress(EStageKey.Back);
   if(kf && !kb){
      c.doWalk(d);
   }
   if(!kf && kb){
      c.doWalk(-d);
   }
   // 按键上下移动
   var kq = RKeyboard.isPress(EStageKey.Up);
   var ke = RKeyboard.isPress(EStageKey.Down);
   if(kq && !ke){
      c.doFly(d);
   }
   if(!kq && ke){
      c.doFly(-d);
   }
   // 按键左右旋转
   var ka = RKeyboard.isPress(EStageKey.RotationLeft);
   var kd = RKeyboard.isPress(EStageKey.RotationRight);
   if(ka && !kd){
      c.doYaw(r);
   }
   if(!ka && kd){
      c.doYaw(-r);
   }
   // 按键上下旋转
   var kz = RKeyboard.isPress(EStageKey.RotationUp);
   var kw = RKeyboard.isPress(EStageKey.RotationDown);
   if(kz && !kw){
      c.doPitch(r);
   }
   if(!kz && kw){
      c.doPitch(-r);
   }
   // 更新相机
   c.update();
   //..........................................................
   // 旋转模型
   if(o._optionRotation){
      var r = o._rotation;
      // 旋转所有层
      var ls = s.layers();
      var c = ls.count();
      for(var i = 0; i < c; i++){
         var l = ls.value(i);
         var m = l.matrix();
         m.setRotation(0, r.y, 0);
         m.update();
      }
      // 设置变量
      r.y += 0.01;
   }
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
// @param p:template:FTemplate3d 模板
//==========================================================
function FDsSceneCanvas_onSceneLoad(p){
   var o = this;
   var c = o._graphicContext;
   var s = o._activeScene;
   // 创建界面层
   var l = RClass.create(FDisplayUiLayer);
   l.selectTechnique(c, FG3dControlTechnique);
   l.pushDisplay(o._templateTranslation);
   l.pushDisplay(o._templateRotation);
   l.pushDisplay(o._templateScale);
   s.registerLayer('ui', l);
   // 加载区域
   o.reloadRegion();
   // 加载完成
   o.processLoadListener(o);
}

//==========================================================
// <T>刷新处理。</T>
//
// @method
//==========================================================
function FDsSceneCanvas_oeResize(p){
   var o = this;
   o.__base.FDsCanvas.oeResize.call(o, p);
   // 获得大小
   var hp = o._hPanel;
   var w = hp.offsetWidth;
   var h = hp.offsetHeight;
   // 设置投影
   var s = o._activeScene;
   if(s){
      var cp = s.camera().projection();
      cp.size().set(w, h);
      cp.update();
   }
   // 设置范围
   return EEventStatus.Stop;
}

//==========================================================
// <T>刷新处理。</T>
//
// @method
//==========================================================
function FDsSceneCanvas_oeRefresh(p){
   return EEventStatus.Stop;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsSceneCanvas_construct(){
   var o = this;
   o.__base.FDsCanvas.construct.call(o);
   o._capturePosition = new SPoint2();
   o._captureMatrix = new SMatrix3d();
   o._templateMatrix = new SMatrix3d();
   o._templateFaceMatrix = new SMatrix3d();
   o._rotation = new SVector3();
   o._captureRotation = new SVector3();
   o._selectRenderables = new TObjects();
}

//==========================================================
// <T>选中渲染显示对象处理。</T>
//
// @method
// @param p:display:FDisplay 显示对象
//==========================================================
function FDsSceneCanvas_innerSelectDisplay(p){
   var o = this;
   // 选中集合
   var s = p.renderables();
   var c = s.count();
   for(var i = 0; i < c; i++){
      var r = s.getAt(i);
      if(RClass.isClass(r, FDsSceneRenderable)){
         o._selectRenderables.push(r);
         r.showBoundBox();
      }
   }
}

//==========================================================
// <T>选中渲染显示对象处理。</T>
//
// @method
// @param p:display:FDisplay 显示对象
//==========================================================
function FDsSceneCanvas_innerSelectLayer(p){
   var o = this;
   // 选中集合
   var s = p.displays();
   var c = s.count();
   for(var i = 0; i < c; i++){
      var d = s.getAt(i);
      o.innerSelectDisplay(d)
   }
}

//==========================================================
// <T>不选中任何对象。</T>
//
// @method
//==========================================================
function FDsSceneCanvas_selectNone(){
   var o = this;
   o._selectObject = null;
   // 取消所有选中对象
   var s = o._selectRenderables;
   var c = s.count();
   for(var i = 0; i < c; i++){
      var r = s.get(i);
      r.hideBoundBox();
   }
   o._selectRenderables.clear();
}

//==========================================================
// <T>选中渲染层处理。</T>
//
// @method
// @param p:layer:FDisplayLayer 渲染层
//==========================================================
function FDsSceneCanvas_selectLayers(p){
   var o = this;
   // 取消选中
   o.selectNone();
   // 选中集合
   var s = o._activeScene.layers();
   for(var i = s.count() - 1; i >= 0; i--){
      o.innerSelectLayer(s.valueAt(i));
   }
}

//==========================================================
// <T>选中渲染层处理。</T>
//
// @method
// @param p:layer:FDisplayLayer 渲染层
//==========================================================
function FDsSceneCanvas_selectLayer(p){
   var o = this;
   // 取消选中
   o.selectNone();
   // 选中对象
   o._selectObject = p;
   // 选中集合
   o.innerSelectLayer(p);
}

//==========================================================
// <T>选中渲染显示对象处理。</T>
//
// @method
// @param p:display:FDisplay 显示对象
//==========================================================
function FDsSceneCanvas_selectDisplay(p){
   var o = this;
   // 取消选中
   o.selectNone();
   // 选中对象
   o._selectObject = p;
   // 选中集合
   o.innerSelectDisplay(p);
}

//==========================================================
// <T>选中渲染材质处理。</T>
//
// @method
// @param p:material:FG3dMaterial 渲染材质
//==========================================================
function FDsSceneCanvas_selectMaterial(p){
   var o = this;
   // 取消选中
   o.selectNone();
   // 选中对象
   o._selectObject = p;
   // 选中材质
   var d = p._display;
   var s = d.renderables();
   var c = s.count();
   for(var i = 0; i < c; i++){
      var r = s.get(i);
      if(r._materialReference == p){
         o._selectRenderables.push(r);
         r._optionSelected = true;
         r.showBoundBox();
      }
   }
}

//==========================================================
// <T>选中渲染对象处理。</T>
//
// @method
// @param p:renderable:FG3dRenderable 渲染对象
//==========================================================
function FDsSceneCanvas_selectRenderable(p){
   var o = this;
   var sr = p;
   if(sr){
      var n = sr._renderable._resource._code;
      switch(n){
         case 'ms_translation_x':
            o._canvasMoveCd = EDsCanvasDrag.X;
            o._templateRenderable = sr;
            return;
         case 'ms_translation_y':
            o._canvasMoveCd = EDsCanvasDrag.Y;
            o._templateRenderable = sr;
            return;
         case 'ms_translation_z':
            o._canvasMoveCd = EDsCanvasDrag.Z;
            o._templateRenderable = sr;
            return;
         case 'ms_rotation_x':
            o._canvasMoveCd = EDsCanvasDrag.X;
            o._templateRenderable = sr;
            return;
         case 'ms_rotation_y':
            o._canvasMoveCd = EDsCanvasDrag.Y;
            o._templateRenderable = sr;
            return;
         case 'ms_rotation_z':
            o._canvasMoveCd = EDsCanvasDrag.Z;
            o._templateRenderable = sr;
            return;
         case 'ms_scale_x':
            o._canvasMoveCd = EDsCanvasDrag.X;
            o._templateRenderable = sr;
            return;
         case 'ms_scale_y':
            o._canvasMoveCd = EDsCanvasDrag.Y;
            o._templateRenderable = sr;
            return;
         case 'ms_scale_z':
            o._canvasMoveCd = EDsCanvasDrag.Z;
            o._templateRenderable = sr;
            return;
         case 'ms_scale_all':
            o._canvasMoveCd = EDsCanvasDrag.All;
            o._templateRenderable = sr;
            return;
         default:
            o._canvasMoveCd = EDsCanvasDrag.Unknown;
            o._templateRenderable = null;
      }
   }
   // 选中当前对象
   o.selectNone();
   if(p){
      o._selectRenderables.push(p);
      p._optionSelected = true;
      p.showBoundBox();
      o._workspace._catalog.showObject(p);
   }
   // 设置变量
   var t = o._templateTranslation;
   var r = o._templateRotation;
   var s = o._templateScale;
   // 模式判定
   var mc = o._canvasModeCd;
   switch(mc){
      case EDsCanvasMode.Drop:
         break;
      case EDsCanvasMode.Select:
         break;
      case EDsCanvasMode.Translate:
         t.setVisible(sr != null);
         r.hide();
         s.hide();
         o._templateFace = t;
         break;
      case EDsCanvasMode.Rotation:
         t.hide();
         r.setVisible(sr != null);
         s.hide();
         o._templateFace = r;
         break;
      case EDsCanvasMode.Scale:
         t.hide();
         r.hide();
         s.setVisible(sr != null);
         o._templateFace = s;
         break;
   }
   // 设置位置
   var st = o._templateFace;
   if(sr && st){
      var d = sr.display();
      var m = st.matrix();
      m.assign(d.matrix());
      m.setScaleAll(o._templateViewScale);
      m.update();
   }
}

//==========================================================
// <T>切换工作模式。</T>
//
// @method
// @param p:modeCd:Integer 
//==========================================================
function FDsSceneCanvas_switchMode(p){
   var o = this;
   o._canvasModeCd = p;
   // 设置变量
   o.selectRenderable(o._selectRenderable);
}

//==========================================================
// <T>切换播放模式。</T>
//
// @method
// @param p:modeCd:Integer 
//==========================================================
function FDsSceneCanvas_switchPlay(p){
   var o = this;
   var s = o._activeScene;
   var ds = s.allDisplays();
   var c = ds.count();
   for(var i = 0; i < c; i++){
      var d = ds.get(i);
      if(d._movies){
         d._optionPlay = p;
      }
   }
}

//==========================================================
// <T>切换动画模式。</T>
//
// @method
// @param p:modeCd:Integer 
//==========================================================
function FDsSceneCanvas_switchMovie(p, f){
   var o = this;
   var s = o._activeScene;
   var ds = s.allDisplays();
   var c = ds.count();
   for(var i = 0; i < c; i++){
      var d = ds.get(i);
      if(d._movies){
         d._optionMovie = p;
      }
   }
}

//==========================================================
// <T>重新加载区域。</T>
//
// @method
//==========================================================
function FDsSceneCanvas_reloadRegion(p){
   var o = this;
   var s = o._activeScene;
   var r = s._region._resource;
   o._cameraMoveRate = r.moveSpeed();
   o._cameraKeyRotation = r.rotationKeySpeed();
   o._cameraMouseRotation = r.rotationMouseSpeed();
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
//==========================================================
function FDsSceneCanvas_loadScene(p){
   var o = this;
   var c = o._graphicContext;
   // 收集场景
   var sc = RConsole.find(FE3dSceneConsole);
   if(o._activeScene != null){
      sc.free(o._activeScene);
   }
   // 监听加载完成
   var s = sc.alloc(o._graphicContext, p);
   s.addLoadListener(o, o.onSceneLoad);
   s.selectTechnique(c, FE3dGeneralTechnique);
   o._stage = o._activeScene = s;
   RStage.register('stage3d', s);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsSceneCanvas_dispose(){
   var o = this;
   // 释放旋转
   var v = o._rotation;
   if(v){
      v.dispose();
      o._rotation = null;
   }
   // 父处理
   o.__base.FDsCanvas.dispose.call(o);
}
