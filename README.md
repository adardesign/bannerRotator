# Banner Rotator
![Banner rotator on adorama.com](http://ebraun.adorama.com/images/bannerRotator.png)

#### Overview
bannerRotate allows you to have banner rotating but is very light and took web page loading speed to a new level, By not having all these images sources load initially. 
  
It also allows you to have a wide range of markup options avaliable.   

**Requires**: jQuery *1.4 and up*.


### Basic Markup
	
	<container> 
		<itmes/>
		<itmes/>
		<itmes/>
	</container>    

Where `<items>` can be any element.	
        
### HTML Markup
The follwing is just a demo:

    <div class="rotateWidget"> <!-- name it as you want -->
        <a href="#" rel="url(path/to/img)"></a>
        <a href="#" rel="url(path/to/img)"></a>
        <img rel="path/to/img/"/>
        <div>
            <img rel="rel="path/to/img/"/>
        </div>
    </div>         



### CSS Markup
    .rotateWidget {
    	position: relative;
        width: 550px; /*varies*/
        height: 245px; /*varies*/
        float: left;
        border: 1px solid #CCC;
        text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
      }
     .rotateWidget > * { display: none; 
         position: absolute; 
         width: 550px; /*varies*/
         height: 245px; /*varies*/
         top: 0; 
         left: 0;
         float: left;
      }
     .rotateWidget > :first-child {
         z-index: 1;
         display: block;
       }
	.rotateWidget > .controlscontainer {
	   position: absolute;
	   display: block;
	   height: 15px;
	   width: auto;
	   left: auto;
	   right: 10px;
	   top: 10px;
	   z-index: 2;
	  }
    .rotateWidget > .controlscontainer > a {
        position: relative;
        width: 13px;
        height: 6px;
        border-radius: 2px;
        top: -2px;
        margin-right: 2px;
        float:left;
        background-color: #999;
        background-color: rgba(0, 0, 0, 0.3);
        box-shadow: 0 0 1px rgba(255,255,255,0.9), 0 1px 0 rgba(0,0,0,0.2) inset;
     }
    .rotateWidget > .controlscontainer > a.active {
        background-color: white;
        background-color: rgba(255, 255, 255, 0.85);
        box-shadow: 0 0 1px rgba(0,0,0,0.2), 0 1px 0 white inset, 0 1px 0 rgba(0,0,0,0.25);
      }


### javaScript Markup
   After document.ready or load 
    	
    	$(".rotateWidget").bannerRotate({speed:1000, interval:6000});

#### Options
Banner Rotator Lets you have many layouts 
	
	speed [default = 500],
	secSpeed: [default = 500],
	interval: [default = 4000],
	shouldHoverSwitch: [default =false],
	builedNav [default = builds controlContianer],
	addHoverUsability [default = true]


Follow [@adardesign](http://twitter.com/adardesign) on Twitter for the latest news.

For feedback, use the menu `Help` - `Send Feedback`