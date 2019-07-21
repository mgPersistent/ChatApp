from flask import (
    Flask,make_response,request,abort
    )
from flask_cors import CORS
import pymongo
import datetime
import json


myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["chat"]
chat_rec=mydb["chatRecords"]
app=Flask(__name__)
CORS(app)


@app.route('/message',methods=['POST'])
def store_message():
    msg=request.form["msg"]
    print('POST:',msg)
    if msg:
        x=chat_rec.insert_one({"msg":msg,"time":datetime.datetime.now().strftime("%H:%M")})
        if x:
            return make_response("Success",200)
    return abort(400)



@app.route('/message',methods=['GET'])
def get_messages():
    msgs=chat_rec.find({},{"_id":0})
    msgs=list(msgs)
    if msgs:
        return make_response(json.dumps(msgs),200,{'content-type':'application/json'})
    else:
        return "[]"

if __name__ == "__main__":
    app.run(debug=True)