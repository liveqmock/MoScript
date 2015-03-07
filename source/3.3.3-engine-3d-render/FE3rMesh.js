//==========================================================
// <T>渲染模型网格。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FE3rMesh(o){
   o = RClass.inherits(this, o, FE3rObject);
   //..........................................................
   // @attribute
   o._ready            = false;
   o._resource         = null;
   o._vertexCount      = 0;
   o._vertexBuffers    = null;
   o._indexBuffer      = null;
   o._resourceMaterial = null;
   o._material         = null;
   o._skins            = null;
   o._boneIds          = null;
   o._textures         = null;
   //..........................................................
   // @method
   o.construct         = FE3rMesh_construct;
   // @method
   o.testReady         = FE3rMesh_testReady;
   // @method
   o.guid              = FE3rMesh_guid;
   o.vertexCount       = FE3rMesh_vertexCount;
   o.findVertexBuffer  = FE3rMesh_findVertexBuffer;
   o.vertexBuffers     = FE3rMesh_vertexBuffers;
   o.indexBuffer       = FE3rMesh_indexBuffer;
   o.material          = FE3rMesh_material;
   o.skins             = FE3rMesh_skins;
   o.pushSkin          = FE3rMesh_pushSkin;
   o.findTexture       = FE3rMesh_findTexture;
   o.textures          = FE3rMesh_textures;
   o.boneIds           = FE3rMesh_boneIds;
   // @method
   o.resource          = FE3rMesh_resource;
   o.loadResource      = FE3rMesh_loadResource;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3rMesh_construct(){
   var o = this;
   o.__base.FE3rObject.construct.call(o);
   o._vertexBuffers = new TObjects();
}

//==========================================================
// <T>测试是否加载完成。</T>
//
// @method
// @return 是否完成
//==========================================================
function FE3rMesh_testReady(){
   var o = this;
   if(!o._ready){
      // 测试所有位图加载好
      var ts = o._textures;
      if(ts != null){
         var c = ts.count();
         for(var i = 0; i < c; i++){
            var t = ts.value(i);
            if(!t.testReady()){
               return false;
            }
         }
      }
      // 加载完成
      o._ready = true;
   }
   return o._ready;
}

//==========================================================
// <T>获得唯一编号。</T>
//
// @method
// @return String 唯一编号
//==========================================================
function FE3rMesh_guid(){
   return this._resource.guid();
}

//==========================================================
// <T>获得顶点总数。</T>
//
// @method
// @return Integer 顶点总数
//==========================================================
function FE3rMesh_vertexCount(){
   return this._vertexCount;
}

//==========================================================
// <T>查找顶点缓冲。</T>
//
// @method
// @param p:name:String 名称
//==========================================================
function FE3rMesh_findVertexBuffer(p){
   var o = this;
   var vs = o._vertexBuffers;
   var c = vs.count();
   for(var n = 0; n < c; n++){
      var v = vs.get(n);
      if(v.name() == p){
         return v;
      }
   }
   return null;
}

//==========================================================
// <T>获得顶点缓冲集合。</T>
//
// @method
// @return TObjects 顶点缓冲集合
//==========================================================
function FE3rMesh_vertexBuffers(){
   return this._vertexBuffers;
}

//==========================================================
// <T>获得索引缓冲。</T>
//
// @method
// @return FG3dIndexBuffer 索引缓冲
//==========================================================
function FE3rMesh_indexBuffer(){
   return this._indexBuffer;
}

//==========================================================
// <T>获得材质。</T>
//
// @method
// @return FRsMaterial 材质
//==========================================================
function FE3rMesh_material(){
   return this._material;
}

//==========================================================
// <T>获得渲染蒙皮集合。</T>
//
// @method
// @return TObjects<FE3rSkin> 渲染蒙皮集合
//==========================================================
function FE3rMesh_skins(){
   return this._skins;
}

//==========================================================
// <T>增加一个蒙皮。</T>
//
// @method
// @return FE3rSkin 蒙皮
//==========================================================
function FE3rMesh_pushSkin(p){
   var o = this;
   var r = o._skins;
   if(!r){
      r = o._skins = new TObjects();
   }
   r.push(p);
}

//==========================================================
// <T>根据名称查找纹理。</T>
//
// @method
// @param p:name:String 名称
// @return FG3dIndexBuffer 纹理
//==========================================================
function FE3rMesh_findTexture(p){
   return this._textures.get(p);
}

//==========================================================
// <T>获得纹理集合。</T>
//
// @method
// @return TDictionary 纹理集合
//==========================================================
function FE3rMesh_textures(){
   return this._textures;
}

//==========================================================
// <T>获得骨头集合。</T>
//
// @method
// @return TArray 骨头集合
//==========================================================
function FE3rMesh_boneIds(p){
   return this._boneIds;
}

//==========================================================
// <T>获得资源。</T>
//
// @method
// @return FE3sMesh 资源
//==========================================================
function FE3rMesh_resource(){
   return this._resource;
}

//==========================================================
// <T>加载资源。</T>
//
// @param p:resource:FE3sGeometry 资源
//==========================================================
function FE3rMesh_loadResource(p){
   var o = this;
   var c = o._graphicContext;
   // 设置属性
   o._resource = p;
   // 创建顶点缓冲集合
   var rss = p.streams();
   var rsc = rss.count();
   for(var i = 0; i < rsc; i++){
      var rs = rss.get(i);
      var rc = rs._code;
      if((rc == 'index16') || (rc == 'index32')){
         // 创建索引缓冲
         var b = o._indexBuffer = c.createIndexBuffer();
         b._resource = rs;
         b.upload(rs._data, 3 * rs._dataCount);
      }else{
         // 创建顶点缓冲
         var b = c.createVertexBuffer();
         b._name = rc;
         b._resource = rs;
         o._vertexCount = rs._dataCount;
         var d = null;
         switch(rc){
            case "position":
               d = new Float32Array(rs._data);
               b._formatCd = EG3dAttributeFormat.Float3;
               break;
            case "coord":
               d = new Float32Array(rs._data);
               b._formatCd = EG3dAttributeFormat.Float2;
               break;
            case "color":
               d = new Uint8Array(rs._data);
               b._formatCd = EG3dAttributeFormat.Byte4Normal;
               break;
            case "normal":
            case "binormal":
            case "tangent":
               d = new Uint8Array(rs._data);
               b._formatCd = EG3dAttributeFormat.Byte4Normal;
               break;
            default:
               throw new TError("Unknown code");
         }
         b.upload(d, rs._dataStride, rs._dataCount);
         o._vertexBuffers.push(b);
      }
   }
}
