import React from 'react';
import List from '@material-ui/core/List';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from '@material-ui/core/ListItemText';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import './message-view.css'

class MessageView extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            items: []
          };
    }

    componentDidMount(){
        fetch("http://localhost:5000/message")
        .then(res=>res.json())
        .then(
            (res)=>{
                console.log(res);
                this.setState({
                    isLoaded: true,
                    items: res
                  });
            },
            (error) => {
                this.setState({
                  isLoaded: true,
                  error
                });
              }            
        )
        
    }
    

    componentWillReceiveProps({newMsg}){
      let d=new Date();
      let obj={msg:newMsg,time:d.getHours()+":"+d.getMinutes()}
      
      console.log(obj);
      this.state.items.push(obj);
    }

    render(){
        const { error, isLoaded, items } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
            <List>
              {items.map((item,i) => (
                <ListItem key={i}>
                   <ListItemText
                        className="list-item-text"
                        primary={item.msg}
                        secondary={
                            <React.Fragment>
                                <Typography
                                  varient="h6"
                                  component="span"
                                  >
                                    {item.time}
                                </Typography>
                            </React.Fragment>
                        }
                   />
                   <Divider  variant="inset"/>
                </ListItem>
                
              ))}
              <div style={{ float:"left", clear: "both" }}
                  ref={(el) => { this.messagesEnd = el; }}>
              </div>
            </List>
          );
        }
    }
    scrollToBottom = () => {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
    
    componentDidUpdate() {
      this.scrollToBottom();
    }
}
export default MessageView;