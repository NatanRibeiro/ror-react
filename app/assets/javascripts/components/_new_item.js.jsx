class NewItem extends React.Component {   
    constructor(props){
        super(props);
        
        this.state = { name: '', description: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
        [name]: value
        });
    }

    handleSubmit(event){
        var name = this.state.name;
        var description = this.state.description;

        $.ajax({
            url: '/api/v1/items',
            type: 'POST',
            data: { item: { name: name, description: description}},
            success: response=> {
                this.props.handleSubmit(item);
            }
        });
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Name:</label> <br/>
                <input type="text" name="name" value={this.state.name} onChange={this.handleChange} /><br/>
                <input type="text" name="description" value={this.state.description} onChange={this.handleChange} /><br/>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}