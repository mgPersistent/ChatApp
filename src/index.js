import React from 'react';
import ReactDOM from 'react-dom';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import './index.css';
import  MessageView from './message-view';
import $ from 'jquery';

class ChatCard extends React.Component{
    constructor(props){
        super(props)
        this.state={newMsg:null}
    }

    render(){
        return (
        <Grid container direction="row" justify="center" alignItems="center">
            <Card className="card">
                <CardContent className="card-content">
                    <MessageView newMsg={this.state.newMsg}/>
                </CardContent>
                <CardActions>

                <TextField
                        id="standard-multiline-flexible"
                        label="Your Message"
                        multiline
                        rowsMax="4"
                        placeholder="Enter Message"
                        id="inputText"
                        className="textField"
                        margin="normal"
                        onKeyDown={this.hardSend}
                    />
                <IconButton aria-label="Send" id="sendBtn" onClick={this.sendMessage}>
                    <SendIcon/>
                </IconButton>
                </CardActions>
            </Card>
        </Grid>
        );
    }


    sendMessage=()=>{

        let msg=$("#inputText").val();
        msg=msg.trim();
        if(msg.length>0){
            $.post("http://localhost:5000/message",{
                msg:msg
            },function(data,status){
                console.log('success post')
            });

            this.setState({newMsg:msg});
            $("#inputText").val("");
        }
        
    }

    hardSend=(event)=>{
        if(event.ctrlKey && event.which == 13) { 
            $('#sendBtn').trigger("click")
            event.preventDefault(); 
        }

    }

}

ReactDOM.render(<ChatCard />, document.getElementById('root'));
