function Dialog({'isDialog': isDialog, 'title': title, 'description' : description, 'positivebtn' : positivebtn , 
        'negativebtn' : negativebtn }){
    
        this.isDialog = isDialog;
        this.title = title;
        this.description = description;
        this.positivebtn = positivebtn;
        this.negativebtn = negativebtn;

        this.getisDialog = function(){
            return this.isDialog;
        }

        this.getTitile = function(){
            return this.title;
        }

        this.getDescription = function(){
            return this.description;
        }

        this.getPositiveBtn = function(){
            return this.positivebtn;
        }

        this.getNegativeBtn = function(){
            return this.negativebtn;
        }

}