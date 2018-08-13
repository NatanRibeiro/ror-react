class Item extends React.Component{
    constructor(props){
        super(props);
        this.state = {editable: false};
        this.handleEdit = this.handleEdit.bind(this);
    }    
    
    handleEdit(){
        if(this.state.editable){
            var id = this.props.item.id;
            var name= this.refs.name.value;
            var description = this.refs.description.value;
            var item = {id: id, name: name, description: description};
            this.props.handleUpdate(item);
        }

        this.setState({editable: !this.state.editable})
    }

    render(){
        var name = this.state.editable ? <input type='text' ref={name} defaultValue={this.props.item.name} />: <h3>{this.props.item.name}</h3>;
        var description = this.state.editable ? <input type='text' ref={description} defaultValue={this.props.item.description} /> : <p>{this.props.item.description}</p>
        return(
        <div>
            {name}{this.state.editable ? <br/>: ""}
            {description}{this.state.editable ? <br/>: ""}
            <button onClick={this.handleEdit}>
                {" "}{this.state.editable ? "Submit" : "Edit"}{" "}
            </button>
            <button onClick={this.props.handleDelete}>Delete</button>
        </div>
        );
    }
}