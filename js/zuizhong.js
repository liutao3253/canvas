/**
 * Created by Diligent on 2017/5/18.
 */
window.onload=function () {
    let line=document.querySelector('.xian');
    let pencil=document.querySelector('.icon-iconupload');
    let polygon=document.querySelector('.icon-duobianxing');
    let rectangle=document.querySelector('.icon-juxing');
    let round=document.querySelector('.icon-yuan');
    let duojiao=document.querySelector('.icon-wujiaoxingkong')
    let yuanjiaojuxing=document.querySelector('.icon-yuanjiaojuxingxuanzekuang');
    let mask=document.querySelector('.mask');
    let tccolor=document.querySelector('.tccolor');
    let mbcolor=document.querySelector('.mbcolor');
    let tc=document.querySelector('.icon-tianchong');
    let mb=document.querySelector('.icon-miaobian');
    let xp=document.querySelector('.icon-xiangpi');
    let xiangpi=document.querySelector('.xiangpi');
    let wen=document.querySelector('.icon-wenzi');
    let chexiao=document.querySelector('.icon-undo');
    let baocun=document.querySelector('.icon-baocun');
    let xj=document.querySelector('.icon-iconfontxinjian')


    let canvas=document.querySelector('canvas');
    let ctx=canvas.getContext('2d');
    let palette=new Palette(canvas,ctx,mask);

    line.onclick=function () {
        palette.line()
    }
    pencil.onclick=function(){
        palette.pencil();
    }
    polygon.onclick=function () {
        palette.bian=prompt('要画的边数','5')
        palette.polygon( palette.bian);
    }
    rectangle.onclick=function(){
        palette.rectangle();
    }
    round.onclick=function(){
        palette.round();
    }
    duojiao.onclick=function(){
        palette.jiao=prompt('要画的角数','5')
        palette.polygon( palette.jiao);
    }
    yuanjiaojuxing.onclick=function(){
        palette.yuanjiaojuxing();
    }

    palette.fanhui();

    tc.onclick=function(){
        palette.type='fill';
    }
    mb.onclick=function(){
        palette.type='stroke'
    }
    tccolor.onchange=function(){
        palette.fillStyle=this.value;
    }
    mbcolor.onchange=function(){
        palette.strokeStyel=this.value;
    }
    xp.onclick=function(){
        let w=prompt('橡皮大小','10')
        palette.eraser(w,h=w,xiangpi);
    }
    wen.onclick=function(){
        palette.font();
    }
    chexiao.onclick=function(){
        palette.fanhui2();
    }
    baocun.onclick=function(){
        palette.save();
    }
    xj.onclick=function(){
        palette.xinjian();
    }

}