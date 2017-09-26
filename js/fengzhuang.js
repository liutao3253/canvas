/*
* 画板的属性 数据类型就是一个简单的值 功能就是方法
*构造函数里面写一些属性  原型对象上写一些方法
*
* 定义要实现的功能
*每次画图之前清除画板
*
* */


function Palette(obj,ctx,mask){
    this.obj=obj;
    this.mask=mask;
    this.ctx=ctx;
    this.width=obj.width;
    this.history=[];
    this.height=obj.height;
    this.lineWidth=2;
    this.fillStyle='#ff7609';
    this.strokeStyel='#d0d0d0';
    this.type='stroke';


}
Palette.prototype={
    //初始化样式  填充 描边
    init:function(){
      this.ctx.lineWidth=this.lineWidth;
      this.ctx.strokeStyle=this.strokeStyel;
      this.ctx.fillStyle=this.fillStyle;
    },


    line:function(){    //线
        let self=this;
        self.mask.onmousedown=function(e){
           let ox=e.offsetX,oy=e.offsetY;
           self.mask.onmousemove=function(e){
               let mx=e.offsetX,my=e.offsetY;
               self.init();
               self.ctx.clearRect(0,0,self.width,self.height);
               if(self.history.length>0){
                   self.ctx.putImageData(self.history[self.history.length-1],0,0);
               }
               self.ctx.beginPath();
               self.ctx.moveTo(ox,oy);
               self.ctx.lineTo(mx,my);
               self.ctx.closePath();
               self.ctx.stroke();
           }
           self.mask.onmouseup=function(){
               self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
               self.mask.onmousemove=null;
               self.mask.onmouseup=null;
           }
       }

    },

    pencil:function(){ //铅笔画线
        let self=this;
        self.mask.onmousedown=function(e) {
            let ox = e.offsetX, oy = e.offsetY;
            self.ctx.beginPath();
            self.ctx.lineTo(ox, oy)
            self.mask.onmousemove = function (e) {
                let cx = e.offsetX, cy = e.offsetY;
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }
                self.init();
                self.ctx.lineTo(cx, cy);
                self.ctx.stroke();
            }
            self.mask.onmouseup = function () {
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.mask.onmouseup = null;
                self.mask.onmousemove = null;

            }
        }
    },
    polygon:function(bian){     //多边形
        var self=this;
        var deg=360/bian/180*Math.PI;
        self.mask.onmousedown=function(e){
            var ox=e.offsetX,oy=e.offsetY;
            self.init();
            self.mask.onmousemove=function(e){
                self.ctx.clearRect(0,0,self.width,self.height);
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }
                var cx=e.offsetX,cy=e.offsetY;
                var bj=Math.sqrt((cx-ox)*(cx-ox)+(cy-oy)*(cy-oy))
                self.ctx.beginPath();
                self.ctx.moveTo(ox+bj,oy);
                for(var i=0;i<bian;i++){
                    self.ctx.lineTo(ox+bj*Math.cos(deg*i),oy+bj*Math.sin(deg*i));
                }
                self.ctx.closePath();
                self.ctx[self.type]();
            }
            self.mask.onmouseup=function(){
               self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.mask.onmousemove=null;
                self.mask.onmouseup=null;
            }
        }

    },



    round:function(){       //圆
        let self=this;
        self.mask.onmousedown=function(e){
            let ox=e.offsetX,oy=e.offsetY;
            self.mask.onmousemove=function(e){
                let mx=e.offsetX,my=e.offsetY;
                self.init();
                self.ctx.clearRect(0,0,self.width,self.height);
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }
                let jiaodu=Math.sqrt((mx-ox)*(mx-ox)+(my-oy)*(my-oy));
                self.ctx.beginPath();
                self.ctx.arc(ox,oy,jiaodu,0,2*Math.PI);
                self.ctx.closePath();
                self.ctx[self.type]();
            }
                self.mask.onmouseup=function () {
                    self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                    self.mask.onmousemove=null;
                    self.ctx.onmouseup=null;
                }


        }
    },

    rectangle:function(){    //矩形
        let self=this;
        self.mask.onmousedown=function(e){
            let ox=e.offsetX,oy=e.offsetY;
            self.mask.onmousemove=function(e){
                let cx=e.offsetX,cy=e.offsetY;
                self.init();
                self.ctx.clearRect(0,0,self.width,self.height)
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }
                self.ctx.strokeRect(ox,oy,cx-ox,cy-oy);
                self.ctx[self.type]();
            }
            self.mask.onmouseup=function(){
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.mask.onmousemove=null;
                self.mask.onmouseup=null;
            }
        }
    },

    /*
    * 算出十个点的坐标  五角星   第一个角  36   偶数 用大半径  奇数用小半径    外面五个点半径*con 72*对应的每个点
    *360除以边*2 *math.PI /180
    *
    * */
   duojiao:function (jiao) {
        let self=this;
        self.mask.onmousedown=function(e){
            let ox = e.offsetX,oy = e.offsetY;

            self.mask.onmousemove=function(e){
                let mx = e.offsetX, my = e.offsetY;
                self.init();
                let r = Math.sqrt(Math.pow(my - oy, 2) + Math.pow(mx - ox, 2));
                let r1=r/2;
                let deg=360/(self.jiao*2)/180*Math.PI;
                self.ctx.clearRect(0,0,self.width,self.height);
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }
                self.ctx.beginPath();

                for(let i=0;i<self.jiao*2;i++){
                    if(i%2==0){
                        let x=ox+r*Math.cos(deg*i);
                        let y=oy+r*Math.sin(deg*i);
                        self.ctx.lineTo(x,y);
                    }else{
                        let x=ox+r1*Math.cos(deg*i);
                        let y=oy+r1*Math.sin(deg*i);
                        self.ctx.lineTo(x,y);
                    }

                }
                self.ctx.closePath();
                self.ctx[self.type]();


            }
            self.mask.onmouseup=function(){
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.mask.onmousemove=null;
                self.mask.onmouseup=null;
            }
        }

    },

    yuanjiaojuxing:function(){
       let self=this;
       self.mask.onmousedown=function(e){
           let ox=e.offsetX,oy=e.offsetY;
           self.mask.onmousemove=function(e){
               let cx=e.offsetX,cy=e.offsetY;
               self.init();
               let w=cx-ox,h=cy-oy, r=10;
               self.ctx.clearRect(0,0,self.width,self.height);
               if(self.history.length>0){
                   self.ctx.putImageData(self.history[self.history.length-1],0,0);
               }
               self.ctx.beginPath();
               self.ctx.moveTo(ox-w+r,oy-h);
               self.ctx.lineTo(cx-r,oy-h);
               self.ctx.quadraticCurveTo(cx,oy-h,cx,oy-h+r);
               self.ctx.lineTo(cx,cy-r);
               self.ctx.quadraticCurveTo(cx,cy,cx-r,cy);
               self.ctx.lineTo(ox-w+r,cy);
               self.ctx.quadraticCurveTo(ox-w,cy,ox-w,cy-r);
               self.ctx.lineTo(ox-w,oy-h+r);
               self.ctx.quadraticCurveTo(ox-w,oy-h,ox-w+r,oy-h);
               self.ctx.closePath();
               self.ctx[self.type]();
           }
           self.mask.onmouseup=function(){
               self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
               self.mask.onmousemove=null;
               self.mask.onmouseup=null;
           }
       }
    },
    fanhui:function(){
        let self=this;
        document.body.onkeydown=function(e){
            if(e.ctrlKey&&e.keyCode==90){
                let last=self.history.pop();
                if(self.history.length==0){
                    alert('NO')
                }
                self.ctx.putImageData(last,0,0);
            }
        }
    },
    fanhui2:function(){
        let self=this;
        let last=self.history.pop();
        if(self.history.length==0){
            alert('NO')
        }
        self.ctx.putImageData(last,0,0);

},

    eraser:function(w,h,xiangpi){
        let self=this;
        self.mask.onmousedown=function(){
            xiangpi.style.display='block';
            xiangpi.style.width=`${w}px`;
            xiangpi.style.height=`${h}px`;
            if(self.history.length>0){
                self.ctx.putImageData(self.history[self.history.length-1],0,0);
            }
            self.mask.onmousemove=function(e){
                let mx=e.offsetX-w/2,my=e.offsetY-h/2;
                if(mx>=self.width-w){
                    mx=self.width-w;
                }
                if(mx<0){
                    mx=0;
                }
                if(my>=self.height-h){
                    my=self.height-h;
                }
                if(my<0){
                    my=0;
                }
                xiangpi.style.left=mx+'px';
                xiangpi.style.top=my+'px';
                self.ctx.clearRect(mx,my,w,h);
            }
            self.mask.onmouseup=function(){
                xiangpi.style.display='none';
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.mask.onmousemove=null;
                self.mask.onmouseup=null;
            }
        }
    },
    font:function() {
        let self = this;
        self.mask.onmousedown=function(e){
            let ox =e.offsetX, oy =e.offsetY;
            let zi=document.createElement('div');
            zi.style.cssText=
                `min-width:150px; height:70px;position:absolute; left:${ox}px;top:${oy}px;background:#d0d0d0;
            `;
            zi.contentEditable=true;
            self.mask.appendChild(zi);
            self.mask.onmousedown=null;
            self.zi=zi;
            self.zi.onmousedown=function(e){
                let ox=e.clientX-this.offsetLeft,oy=e.clientY-this.offsetTop;
                self.mask.onmousemove=function(e){
                    let cx=e.clientX,cy=e.clientY;
                    let lefts=cx-ox,tops=cy-oy;
                    self.zi.style.left=`${lefts}px`;
                    self.zi.style.top=`${tops}px`;
                    self.zi.onmouseup=function(e){
                        self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                        self.mask.onmousemove=null;
                        self.zi.onmouseup=null;
                    }
                }
                self.zi.onblur=function(){
                    self.ctx.font=self.text;
                    self.ctx.textAlign=self.textAlign;
                    self.ctx.textBaseline=self.textBaseline;
                    self.ctx.fillText(this.innerText,this.offsetLeft,this.offsetTop);
                    this.parentNode.removeChild(this);
                    self.zi=null;
                }
            }
        }


    },
    save:function(){
        let data
        data=this.obj.toDataURL('image/png').replace('data:image/png','data:stream/octet');
        location.href=data;
    },
    xinjian: function () {
        let aa = confirm('保存当前图片')
        if (aa) {
            this.save();
            this.ctx.clearRect(0, 0, this.width, this.height);
        } else {
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.arr.push(this.ctx.getImageData(0, 0, this.width, this.height));
        }
    },

}


