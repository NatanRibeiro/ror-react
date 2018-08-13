class NewItem extends React.Component {   
    constructor(props){
        super(props);
        this.state = { name: '', description: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }
    
    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }

    handleCreate(event){
        var name = this.state.name;
        var description = this.state.description;

        $.ajax({
            url: '/api/v1/items',
            type: 'POST',
            data: { item: { name: name, description: description}},
            success: response=> {
                this.props.createItemClient(response);
            },
            complete: ()=>{
                this.clearFields();
            }
        });
    }

    clearFields(){
        this.setState({name: '', description: ''});
    }

    render() {
        return (
            <div>
                <label>Name:</label> <br/>
                <input type="text" autocomplete="off" name="name" value={this.state.name} onChange={this.handleChange} /><br/>
                <input type="text" autocomplete="off" name="description" value={this.state.description} onChange={this.handleChange} /><br/>
                <button type="submit" onClick={this.handleCreate}>Submit</button>
            </div>
        );
    }
}