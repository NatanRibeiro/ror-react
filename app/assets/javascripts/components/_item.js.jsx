class Item extends React.Component{
    constructor(props){
        super(props);
        this.state = {editable: false, item: {name: '', description: ''}, editedFields: { name: false, description: false}};
        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }    
    
    handleEdit(){
        if(this.state.editable){
            var id = this.props.item.id;
            var name=   this.state.editedFields.name ? this.state.item.name : this.props.item.name;
            var description = this.state.editedFields.description ? this.state.item.description : this.props.item.description;
            var item = {id: id, name: name, description: description};
            this.props.handleEdit(item);
        }
        var newState = this.state;
        newState.editable = !this.state.editable;
        this.setState(newState);
    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        var newState = this.state;
        newState.editable = this.state.editable;
        newState.item[name] = value;
        newState.editedFields[name] = true;
        this.setState(newState);
    }

    render(){
        return(
        <div>
            {
                this.state.editable ? 
                [
                    <br/>,<label>Name:</label>,<br/>,
                    <input type='text' name="name" onChange={this.handleChange} defaultValue={this.props.item.name} />,<br/>,
                    <input type='text' name="description" onChange={this.handleChange} defaultValue={this.props.item.description} />,<br/>,
                    <button onClick={this.handleEdit}>Submit</button>
                ]: 
                [
                    <h3>{this.props.item.name}</h3>,
                    <p>{this.props.item.description}</p>,
                    <button onClick={this.handleEdit}>Edit</button>
                ]
            }
            <button onClick={this.props.handleDelete}>Delete</button>
        </div>
        );
    }
}