//==========================================================
// <T>控制台对象的管理类。</T>
//
// @reference
// @author maocy
// @version 141230
//==========================================================
var RConsole = new function RConsole(){
   var o = this;
   //..........................................................
   // @constant
   o.ConsolePreFix = 'console:';
   //..........................................................
   // @attribute
   o.registers     = new TObjects();
   o.consoles      = new TDictionary();
   o.localConsoles = new TDictionary();
   //..........................................................
   // @method
   o.register      = RConsole_register;
   o.initialize    = RConsole_initialize;
   o.create        = RConsole_create;
   o.createByName  = RConsole_createByName;
   o.find          = RConsole_find;
   o.release       = RConsole_release;
   return o;
}

//==========================================================
//
//==========================================================
function RConsole_initialize(){
   var o = this;
   var rs = o.registers;
   var c = rs.count;
   for(var n = 0; n < rs; n++){
      var r = rs.get(n);
      if(r.force){
         o.find(r.clazz);
      }
   }
}
 
//==========================================================
// TConsole
//==========================================================
function RConsole_register(c){
   this.registers.push(c);
}

//==========================================================
// <T>根据类名称创建一个控制台实例。</T>
// <P>如果实例中有属性用'lnk'开始，并且内容以'&开始的话，可以自动和其他对象关联。</P>
//
// @method
// @param n:name:String 类名称
// @return Object 控制台实例
//==========================================================
function RConsole_create(n){
   var r = null;
   if(n){
      // 创建对象实例
      r = RClass.create(n);
      // 关联对象属性
      var o = this;
      for(var rn in r){
         if(RString.startsWith(rn, 'lnk')){
            var v = r[rn];
            if('string' == typeof(v) && RString.startsWith(v, '&')){
               var c = o.find(v.substr(1));
               if(!c){
                  return RMessage.fatal(o, null, "Can't link console. (name={0}, property={1}:{2})", n, rn, v);
               }
               r[rn] = c;
            }
         }
      }
   }
   return r;
}
//==========================================================
// <T>根据名称创建对象。</T>
//
// @method
// @param v:value:Object 类名称/类函数
// @return Object 控制台实例
//==========================================================
function RConsole_createByName(n){
   var r = null;
   if(n){
      // 创建对象实例
      r = RClass.createByName(n);
      // 关联对象属性
      var o = this;
      for(var rn in r){
         if(RString.startsWith(rn, 'lnk')){
            var v = r[rn];
            if('string' == typeof(v) && RString.startsWith(v, '&')){
               var c = o.find(v.substr(1));
               if(!c){
                  return RMessage.fatal(o, null, "Can't link console. (name={0}, property={1}:{2})", n, rn, v);
               }
               r[rn] = c;
            }
         }
      }
   }
   return r;
}

//==========================================================
// <T>根据类函数查找一个控制台实例。</T>
//
// @method
// @param v:value:Object 类名称/类函数
// @return Object 控制台实例
//==========================================================
function RConsole_find(v){
   var o = this;
   // 获得名称
   var n = null;
   if(v.constructor = String){
      n = RClass.name(v);
   }else if(v.constructor == Function){
      n = v;
   }else{
      return RLogger.fatal(o, null, 'Parameter type is invalid. (console={1})', v);
   }
   // 查找全局控制台
   var r = RGlobal.get(o.ConsolePreFix + n);
   if(r){
      return r;
   }
   // 查找本地控制台
   r = o.consoles.get(n);
   if(r){
      return r;
   }
   // 创建控制台实例
   var c = RClass.forName(n);
   var s = c.instance.scopeCd();
   switch(s){
      case EScope.Global:
         // 从顶层对象重新创建
         r = top.RConsole.createByName(n);
         RGlobal.set(o.ConsolePreFix + n, r);
         // 在本地保存当前对象
         o.consoles.set(n, r);
         break;
      case EScope.Local:
         // 在本地保存当前对象
         r = o.createByName(n);
         o.localConsoles.set(n, r);
         o.consoles.set(n, r);
         break;
      default:
         return RLogger.fatal(o, 'Unknown scope code. (name={1})', n);
   }
   RLogger.info(o, 'Create console. (name={1}, scope={2})', n, REnum.decode(EScope, s));
   return r;
}

//==========================================================
// <T>释放当前页面内的所有控制台。</T>
//
// @method
// @param n:name:Object 类名称，类函数
// @return Object 控制台实例
//==========================================================
function RConsole_release(){
   var o = this;
   RMemory.free(this.localConsoles);
   o.registers = null;
   o.consoles = null;
   o.localConsoles = null;
}