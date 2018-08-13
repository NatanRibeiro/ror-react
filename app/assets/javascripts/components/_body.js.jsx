console.log(React);
class Body extends React.Component {   
    constructor(props){
        super(props);
        this.state = { items: []}

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    
    componentDidMount(){
        $.getJSON('/api/v1/items.json', (response)=> { this.setState({ items: response})});
    }

    handleUpdate(item){
        $.ajax({
            url: `/api/v1/items/${item.id}`,
            type: 'PUT',
            data: { item: item},
            success: ()=>{
                this.updateItemClient(item);
            }
        })
    }

    updateItemClient(item){
        var items = this.state.items.filter((i)=> { return i.id != item.id});
        items.push(item);
        
        this.setState({ items: items});
    }

    handleDelete(id){
        $.ajax({
          url: `/api/v1/items/${id}`,
          type: 'DELETE',
          success: ()=> {
            this.deleteItemClient(id);
          }
        });
    }

    deleteItemClient(id){
        var newItems = this.state.items.filter((item) => {
            return item.id != id;
        });

        this.setState({ items: newItems});
    }

    createItemClient(item){
        var newItems = this.state.items.concat(item);
        this.setState({items: newItems});
    }

    render(){
        return(
            <div>
                <NewItem items={this.state.items} createItemClient={this.createItemClient.bind(this)}/>
                <AllItems items={this.state.items} handleUpdate={this.handleUpdate}  handleDelete={this.handleDelete} />
            </div>
        );
    }
};