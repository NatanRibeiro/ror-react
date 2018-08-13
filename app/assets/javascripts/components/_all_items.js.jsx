class AllItems extends React.Component {   
    constructor(props){
        super(props);
        this.state = { items: []}
    }

    componentDidMount(){
        $.getJSON('/api/v1/items.json', (response)=> { this.setState({ items: response})});
    }

    handleDelete(id){
        $.ajax({
          url: `/api/v1/items/${id}`,
          type: 'DELETE',
          success: ()=> {
            this.removeItemClient(id);
          }
        });
    }

    removeItemClient(id){
        var newItems = this.state.items.filter((item) => {
            return item.id != id;
        });

        this.setState({ items: newItems});
    }

    render(){   
        var items = this.state.items.map((item)=> {
            return (
                <div key={item.id}>
                    <Item item={item} 
                    handleEdit={this.handleEdit}
                    handleDelete={this.handleDelete.bind(this, item.id)} />
                </div>
            )
        });

        return(
            <div>  
                {items}
            </div>
        );
    }
};