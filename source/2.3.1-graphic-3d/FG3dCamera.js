//==========================================================
// <T>渲染相机。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FG3dCamera(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute 变换矩阵
   o._matrix      = null;
   // @attribute 相机位置
   o._position    = null;
   // @attribute 相机方向
   o._direction   = null;
   // @attribute 相机旋转
   o._rotation    = null;
   // @attribute 中心位置
   o._centerFront = 1.0;
   o._centerBack  = 1.0;
   // @attribute 焦平面
   o._focalNear   = 0.1;
   o._focalFar    = 200.0;
   // @attribute 视截体
   o._planes      = null;
   o._frustum     = null;
   o._viewport    = null;
   // @attribute 轴线
   o.__axisUp     = null;
   o.__axisX      = null;
   o.__axisY      = null;
   o.__axisZ      = null;
   // @attribute 旋转
   o.__rotationX  = null;
   o.__rotationY  = null;
   o.__rotationZ  = null;
   //..........................................................
   // @method
   o.construct    = FG3dCamera_construct;
   // @method
   o.matrix       = FG3dCamera_matrix;
   o.position     = FG3dCamera_position;
   o.setPosition  = FG3dCamera_setPosition;
   o.direction    = FG3dCamera_direction;
   o.setDirection = FG3dCamera_setDirection;
   o.frustum      = FG3dCamera_frustum;
   // @method
   o.doWalk       = FG3dCamera_doWalk;
   o.doStrafe     = FG3dCamera_doStrafe;
   o.doFly        = FG3dCamera_doFly;
   o.doYaw        = FG3dCamera_doYaw;
   o.doPitch      = FG3dCamera_doPitch;
   // @method
   o.lookAt       = FG3dCamera_lookAt;
   o.update       = FG3dCamera_update;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FG3dCamera_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 初始化变量
   o._matrix = new SMatrix3d();
   o._position = new SPoint3();
   o._direction = new SVector3();
   o._rotation = new SQuaternion();
   // 初始化变量
   //o._planes = null;
   o._frustum = new SFrustum();
   o._viewport = RClass.create(FG3dViewport);
   // 初始化变量
   o.__axisUp = new SVector3();
   o.__axisUp.set(0, 1, 0);
   o.__axisX = new SVector3();
   o.__axisY = new SVector3();
   o.__axisZ = new SVector3();
   // 初始化变量
   o.__rotationX = new SQuaternion();
   o.__rotationY = new SQuaternion();
   o.__rotationZ = new SQuaternion();
}

//==========================================================
// <T>获得位置。</T>
//
// @method
// @return 位置
//==========================================================
function FG3dCamera_position(){
   return this._position;
}

//==========================================================
// <T>获得矩阵。</T>
//
// @method
// @return SMatrix3d 矩阵
//==========================================================
function FG3dCamera_matrix(){
   return this._matrix;
}

//==========================================================
// <T>设置位置。</T>
//
// @method
// @param x:Number X坐标
// @param y:Number Y坐标
// @param z:Number Z坐标
//==========================================================
function FG3dCamera_setPosition(x, y, z){
   this._position.set(x, y, z);
}

//==========================================================
// <T>获得方向。</T>
//
// @method
// @return SVector3 方向
//==========================================================
function FG3dCamera_direction(){
   return this._direction;
}

//==========================================================
// <T>设置方向。</T>
//
// @method
// @param x:Number X坐标
// @param y:Number Y坐标
// @param z:Number Z坐标
//==========================================================
function FG3dCamera_setDirection(x, y, z){
   this._direction.set(x, y, z);
}

//==========================================================
// <T>获得视截体。</T>
//
// @method
// @return SFrustum 视截体
//==========================================================
function FG3dCamera_frustum(){
   return this._frustum;
}

//==========================================================
// <T>向前/向后移动</T>
//
// @method
// @param p:value:Number 距离
//==========================================================
function FG3dCamera_doWalk(p){
   var o = this;
   o._position.x += o._direction.x * p;
   o._position.z += o._direction.z * p;
}

//==========================================================
// <T>向左/向右平移</T>
//
// @method
// @param p:value:Number 距离
//==========================================================
function FG3dCamera_doStrafe(p){
   var o = this;
   o._position.x += o.__axisY.x * p;
   o._position.z += o.__axisY.z * p;
}

//==========================================================
// <T>向上/向下移动</T>
//
// @method
// @param p:value:Number 距离
//==========================================================
function FG3dCamera_doFly(p){
   var o = this;
   o._position.y += p;
}

//==========================================================
// <T>向左/向右旋转</T>
//
// @method
// @param p:value:Number 弧度
//==========================================================
function FG3dCamera_doYaw(p){
   var o = this;
   //o.__rotationZ.fromAxisAngle(RMath.vectorAxisZ, p);
   //o._rotation.mul(o.__rotationZ);
   // 旋转Y轴
   //var matrix = new SFloatMatrix3d();
   //matrix.rotationY(angle);
   // 旋转方向
   //var direction = o._direction;
   //direction.mormalize();
   //_direction = matrix.TransformVector3(direction);
   //_direction.Normalize();
}

//==========================================================
// <T>向上/向下旋转</T>
//
// @method
// @param p:value:Number 弧度
//==========================================================
function FG3dCamera_doPitch(p){
   var o = this;
   //o.__rotationX.fromAxisAngle(RMath.vectorAxisX, p);
   //o._rotation.mul(o.__rotationX);
}

//==========================================================
// <T>朝向目标。</T>
//==========================================================
function FG3dCamera_lookAt(x, y, z){
   var o = this;
   var p = o._position;
   o._direction.set(x - p.x, y - p.y, z - p.z);
   o._direction.normalize();
}

//==========================================================
// <T>更新相机信息。</T>
// <P>1. 更新空间矩阵。</P>
// <P>2. 更新目标点。</P>
//==========================================================
function FG3dCamera_update(){
   var o = this;
   var ax = o.__axisX;
   var ay = o.__axisY;
   var az = o.__axisZ;
   // 计算坐标轴
   az.assign(o._direction);
   az.normalize();
   o.__axisUp.cross2(ax, az);
   ax.normalize();
   az.cross2(ay, ax);
   ay.normalize();
   // 计算矩阵
   var d = o._matrix.data();
   d[ 0] = ax.x;
   d[ 1] = ay.x;
   d[ 2] = az.x;
   d[ 3] = 0.0;
   d[ 4] = ax.y;
   d[ 5] = ay.y;
   d[ 6] = az.y;
   d[ 7] = 0.0;
   d[ 8] = ax.z;
   d[ 9] = ay.z;
   d[10] = az.z;
   d[11] = 0.0;
   d[12] = -ax.dotPoint3(o._position);
   d[13] = -ay.dotPoint3(o._position);
   d[14] = -az.dotPoint3(o._position);
   d[15] = 1.0;
}
