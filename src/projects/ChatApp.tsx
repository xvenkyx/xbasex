import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginForm from "../components/Auth/LoginForm";
import SignupForm from "../components/Auth/SignupForm";

interface Message {
  messageId: string;
  userId: string;
  username: string;
  message: string;
  timestamp: string;
  type: string;
}

interface ChatAppProps {}

const ChatApp: React.FC<ChatAppProps> = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [currentRoom, setCurrentRoom] = useState("general");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [authView, setAuthView] = useState<"login" | "signup">("login");

  const { user } = useAuth();
  const socketRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // WebSocket URL - replace with your actual WebSocket URL
  const WS_URL =
    "wss://fpnhjef44g.execute-api.us-west-2.amazonaws.com/production/";

  // Connect to WebSocket
  const connectWebSocket = () => {
    try {
      if (!user) {
        setError("Please login to use chat");
        return;
      }

      // Add user info to query string for authentication
      const queryParams = new URLSearchParams({
        userId: user.user_id,
        username: user.username,
      });

      const wsUrl = `${WS_URL}?${queryParams}`;
      socketRef.current = new WebSocket(wsUrl);

      socketRef.current.onopen = () => {
        console.log("WebSocket connected");
        setIsConnected(true);
        setError("");

        // Join the default room after connection
        joinRoom("general");
      };

      socketRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          handleWebSocketMessage(data);
        } catch (err) {
          console.error("Error parsing WebSocket message:", err);
        }
      };

      socketRef.current.onclose = () => {
        console.log("WebSocket disconnected");
        setIsConnected(false);
      };

      socketRef.current.onerror = (error) => {
        console.error("WebSocket error:", error);
        setError("Connection error");
        setIsConnected(false);
      };
    } catch (err) {
      console.error("Error connecting to WebSocket:", err);
      setError("Failed to connect to chat");
    }
  };

  // Handle incoming WebSocket messages
  const handleWebSocketMessage = (data: any) => {
    console.log("Received WebSocket message:", data);

    switch (data.action) {
      case "messageHistory":
        console.log("Setting message history:", data.messages);
        setMessages(data.messages || []);
        break;

      case "newMessage":
        console.log("Adding new message:", data.message);
        setMessages((prev) => [...prev, data.message]);
        break;

      case "userJoined":
        console.log("User joined:", data.username);
        const systemMessage: Message = {
          messageId: `system_${Date.now()}`,
          userId: "system",
          username: "System",
          message: `${data.username} joined the chat`,
          timestamp: data.timestamp,
          type: "system",
        };
        setMessages((prev) => [...prev, systemMessage]);
        break;

      default:
        console.log("Unknown action:", data.action);
    }
  };

  // Join a chat room
  const joinRoom = (roomId: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          action: "joinroom",
          roomId: roomId,
        })
      );
      setCurrentRoom(roomId);
    }
  };

  // Send a message
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Send message triggered");
    console.log("New message:", newMessage);
    console.log("WebSocket state:", socketRef.current?.readyState);
    console.log("Is connected:", isConnected);

    if (!newMessage.trim() || !socketRef.current || !isConnected) {
      console.log("Cannot send - conditions not met");
      return;
    }

    try {
      const messageData = {
        action: "sendmessage",
        message: newMessage.trim(),
      };
      console.log("Sending message data:", messageData);

      socketRef.current.send(JSON.stringify(messageData));
      setNewMessage("");
      console.log("Message sent successfully");
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message");
    }
  };

  // Get message history
  const getMessageHistory = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          action: "getmessages",
          roomId: currentRoom,
        })
      );
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Connect to WebSocket on component mount and user login
  useEffect(() => {
    if (user) {
      connectWebSocket();
    }

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [user]);

  // Format timestamp for display
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Available chat rooms
  const chatRooms = [
    { id: "general", name: "General Chat" },
    { id: "tech", name: "Technology" },
    { id: "random", name: "Random" },
  ];

  // Replace the "if (!user)" section with this:
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6">
          <Link
            to="/projects"
            className="text-blue-600 hover:text-blue-800 text-sm sm:text-base"
          >
            ← Back to Projects
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold mt-3 sm:mt-4">
            Chat Application
          </h1>
          <p className="text-gray-600 mt-2">
            Please login to use real-time chat
          </p>
        </div>

        {authView === "login" ? (
          <LoginForm onSwitchToSignup={() => setAuthView("signup")} />
        ) : (
          <SignupForm onSwitchToLogin={() => setAuthView("login")} />
        )}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6">
        <Link
          to="/projects"
          className="text-blue-600 hover:text-blue-800 text-sm sm:text-base"
        >
          ← Back to Projects
        </Link>
        <div className="flex justify-between items-start mt-3 sm:mt-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Chat Application</h1>
            <p className="text-gray-600 mt-2">Real-time chat with WebSockets</p>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isConnected ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <span className="text-sm text-gray-600">
              {isConnected ? "Connected" : "Disconnected"}
            </span>
            {!isConnected && (
              <button
                onClick={connectWebSocket}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
              >
                Reconnect
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => setError("")}
            className="text-red-600 hover:text-red-800 text-sm mt-2"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-4 gap-6">
        {/* Sidebar - Chat Rooms */}
        <div className="md:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-4">Chat Rooms</h3>
            <div className="space-y-2">
              {chatRooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => joinRoom(room.id)}
                  className={`w-full text-left px-3 py-2 rounded text-sm ${
                    currentRoom === room.id
                      ? "bg-blue-100 text-blue-700 border border-blue-300"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  # {room.name}
                </button>
              ))}
            </div>

            {/* User Info */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">Logged in as:</p>
              <p className="font-semibold text-sm">{user.username}</p>
              <p className="text-xs text-gray-500 mt-1">Room: #{currentRoom}</p>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="md:col-span-3">
          <div className="bg-white border border-gray-200 rounded-lg flex flex-col h-96">
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 mt-20">
                  <p>No messages yet. Start the conversation!</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.messageId}
                    className={`flex ${
                      message.userId === user.user_id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.type === "system"
                          ? "bg-yellow-100 text-yellow-800 text-center text-sm"
                          : message.userId === user.user_id
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {message.type !== "system" &&
                        message.userId !== user.user_id && (
                          <div className="font-semibold text-sm mb-1">
                            {message.username}
                          </div>
                        )}
                      <div className="break-words">{message.message}</div>
                      <div
                        className={`text-xs mt-1 ${
                          message.userId === user.user_id
                            ? "text-blue-200"
                            : "text-gray-500"
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="border-t border-gray-200 p-4">
              <form onSubmit={sendMessage} className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  disabled={!isConnected}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 disabled:bg-gray-100"
                />
                <button
                  type="submit"
                  disabled={!isConnected || !newMessage.trim()}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </form>
            </div>
          </div>

          {/* Connection Info */}
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>
              Powered by AWS API Gateway WebSockets •{" "}
              {isConnected ? "Real-time connection active" : "Connecting..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
