function GafSlider(e){let t=translate=timer=0,i=qS(e.target).parentNode,r={controls:e.dots?qS(".controls",i):null,sliderDiv:qS(e.target),sliderInner:qS(".sliderInner",i),slides:qSA(".slide",i)},s=r.sliderDiv.clientWidth,n=r.slides[0].clientWidth,l=r.slides.length;if(itemsPerSlide=parseInt(s/n,10)-1,e.dots)for(let e=0;e<l;++e){let i=document.createElement("span");i.innerHTML='<i class="fas fa-circle"></i>',i.addEventListener("mouseover",function(){t=this.dataset.number,o()}),i.setAttribute("data-number",e),r.controls.appendChild(i)}function d(){translate=-1*n*t,r.sliderInner.style.transform=`translateX(${translate}px)`,e.dots&&([].forEach.call(r.controls.children,e=>{e.style.color="#999"}),r.controls.children[t].style.color="#333")}function o(){e.speed&&(clearTimeout(timer),timer=setTimeout(c,e.speed)),d()}function a(){t>=1?t--:t<=0&&(t=l-itemsPerSlide),o()}function c(){t>=l-itemsPerSlide-1?t=0:t<l-1&&t++,o()}qS(".left",i).addEventListener("click",a),qS(".right",i).addEventListener("click",c),r.sliderDiv.addEventListener("swiperight",a),r.sliderDiv.addEventListener("swipeleft",c),e.speed&&(r.sliderDiv.addEventListener("mouseover",()=>{clearTimeout(timer)}),r.sliderDiv.addEventListener("mouseout",o),c())}