class taskModel{
    constructor(title,description,priority,status,dueDate){
        this.id=Date.now(); 
        this.title=title;
        this.description=description;
        this.priority=priority;
        this.status=status;
        this.dueDate=dueDate ;
        this.createdAt=new Date().toISOString();
        this.updatedAt =new Date().toISOString(); 
    }
}

module.exports=taskModel;