class Food{
    constructor(){
        this.image = loadImage("images/milk.png");
        this. foodStock;
        this. lastFeed=12;
    
    }

    getFoodStock(){
        var foodStock=database.ref('getstock');
        foodStock.on("value",function(data){
           foodstock=data.val();
       })
    }
      updateFoodStock(){
        database.ref('/').update({
            foodStock:food
        })
    }
    
    deductFood(){
        
        database.ref(getstock).set({
        
        })
        }

        bedRoom(){
     background(bed,550,500);
        }
        garden(){
            background(garden,550,500);
        }
        washroom(){
            background(washroom,550,500);
        }

    display(){
      
       var x=80,y=100;
       
       imageMode(CENTER);
       image(this.image,720,220,70,70)

       if(this.foodStock!=0){
           for(var i =0;i<this.foodStock;i++){
               if(i%10==0){
                   x=80;
                   y=y+50;    
                }
                image(this.image,x,y,50,50);
                x=x+30;
           }

       }
    }  
}
