class AllItems extends React.Component {   
    constructor(props){
        super(props);
    }

    render(){   
        var items = this.props.items.map((item)=> {
            return (
                <div key={item.id}>
                    <Item item={item} 
                    handleEdit={this.props.handleUpdate}
                    handleDelete={this.props.handleDelete.bind(this, item.id)} />
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