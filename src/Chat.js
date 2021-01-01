import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, SearchOutlined, MoreVert } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";
import db from "./firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";
function Chat() {
  const [seed, setSeed] = useState("");
  // const [input, setInput] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot(snap => setRoomName(snap.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot(snap => setMessages(snap.docs.map(doc => doc.data())));
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = e => {
    e.preventDefault();
    console.log(`you typed ${input}`);
    setInput("");
    console.log(`input value after clearning ${input}`);
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp() //get the server time stamp for dealing with different time zone
    });
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last seen at{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map(msg => (
          <p
            className={`chat__message ${
              msg.name === user.displayName && "chat__reciever"
            }`}
          >
            <span className="chat__name">{msg.name}</span>
            {msg.message}
            <span className="chat__timestamp">
              {new Date(msg.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            placeholder="Type a message "
            type="text"
            onChange={e => setInput(e.target.value)}
          />
          <button type="submit" onClick={sendMessage}>
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
