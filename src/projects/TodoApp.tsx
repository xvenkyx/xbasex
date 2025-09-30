import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginForm from "../components/Auth/LoginForm";
import SignupForm from "../components/Auth/SignupForm";

interface Todo {
  todo_id: string;
  user_id: string;
  task: string;
  status: "pending" | "done";
  created_at: string;
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [authView, setAuthView] = useState<"login" | "signup">("login");

  const { user, token, logout } = useAuth();
  const API_URL =
    import.meta.env.VITE_TODO_API_URL ||
    "https://xydxsg2ope.execute-api.us-east-1.amazonaws.com/default";

  // Fetch all todos for the user
  // const fetchTodos = async () => {
  //   if (!token) return;

  //   setLoading(true);
  //   try {
  //     const response = await fetch(`${API_URL}/todos`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Failed to fetch todos: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     setTodos(data);
  //     setError('');
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : 'Failed to fetch todos');
  //     console.error('Error fetching todos:', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchTodos = async () => {
    if (!token) {
      console.error("No token available");
      setError("No authentication token found. Please login again.");
      return;
    }

    setLoading(true);
    try {
      console.log(
        "Making GET request to /todos with token:",
        token.substring(0, 20) + "..."
      );

      const response = await fetch(`${API_URL}/todos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      if (!response.ok) {
        // Try to get error message from response
        let errorMessage = `HTTP error: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          // If response is not JSON, get text
          const text = await response.text();
          errorMessage = text || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("Received todos:", data);
      setTodos(data);
      setError("");
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to fetch todos";
      setError(errorMsg);
      console.error("Error fetching todos:", err);
    } finally {
      setLoading(false);
    }
  };

  // Add new todo
  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim() || !token) return;

    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          task: newTodo.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add todo: ${response.status}`);
      }

      const newTodoItem = await response.json();
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add todo");
      console.error("Error adding todo:", err);
    }
  };

  // Toggle todo status
  const toggleTodo = async (todoId: string, currentStatus: string) => {
    if (!token) return;

    const newStatus = currentStatus === "pending" ? "done" : "pending";

    try {
      const response = await fetch(`${API_URL}/todos/${todoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update todo: ${response.status}`);
      }

      setTodos(
        todos.map((todo) =>
          todo.todo_id === todoId ? { ...todo, status: newStatus } : todo
        )
      );
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update todo");
      console.error("Error updating todo:", err);
    }
  };

  // Delete todo
  const deleteTodo = async (todoId: string) => {
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/todos/${todoId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete todo: ${response.status}`);
      }

      setTodos(todos.filter((todo) => todo.todo_id !== todoId));
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete todo");
      console.error("Error deleting todo:", err);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Load todos when user logs in
  useEffect(() => {
    if (user && token) {
      fetchTodos();
    }
  }, [user, token]);

  const pendingTodos = todos.filter((todo) => todo.status === "pending");
  const completedTodos = todos.filter((todo) => todo.status === "done");

  // Show auth forms if not logged in
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
            Todo Application
          </h1>
          <p className="text-gray-600 mt-2">
            Please login to manage your tasks
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

  // Show todo app if logged in
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
            <h1 className="text-xl sm:text-2xl font-bold">Todo Application</h1>
            <p className="text-gray-600 mt-2">Welcome, {user.username}!</p>
          </div>
          <button
            onClick={logout}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 text-sm"
          >
            Logout
          </button>
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

      {/* Add Todo Form */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 mb-6">
        <form onSubmit={addTodo} className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter a new task..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !newTodo.trim()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {loading ? "Adding..." : "Add Task"}
          </button>
        </form>
      </div>

      {/* Loading State */}
      {loading && todos.length === 0 && (
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading todos...</p>
        </div>
      )}

      {/* Todo Lists */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Pending Todos */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Pending Tasks ({pendingTodos.length})
          </h2>
          <div className="space-y-3">
            {pendingTodos.map((todo) => (
              <div
                key={todo.todo_id}
                className="bg-white border border-gray-200 rounded-lg p-4 flex items-start justify-between hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-3 flex-1">
                  <button
                    onClick={() => toggleTodo(todo.todo_id, todo.status)}
                    className="w-5 h-5 border border-gray-300 rounded mt-1 flex-shrink-0 hover:border-blue-500"
                  />
                  <div className="flex-1">
                    <p className="text-gray-800">{todo.task}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Created: {formatDate(todo.created_at)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => deleteTodo(todo.todo_id)}
                  className="text-red-500 hover:text-red-700 ml-2 flex-shrink-0"
                  title="Delete task"
                >
                  🗑️
                </button>
              </div>
            ))}
            {pendingTodos.length === 0 && !loading && (
              <p className="text-gray-500 text-center py-4">No pending tasks</p>
            )}
          </div>
        </div>

        {/* Completed Todos */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Completed Tasks ({completedTodos.length})
          </h2>
          <div className="space-y-3">
            {completedTodos.map((todo) => (
              <div
                key={todo.todo_id}
                className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start justify-between"
              >
                <div className="flex items-start space-x-3 flex-1">
                  <button
                    onClick={() => toggleTodo(todo.todo_id, todo.status)}
                    className="w-5 h-5 bg-green-500 border border-green-500 rounded mt-1 flex-shrink-0 flex items-center justify-center"
                    title="Mark as pending"
                  >
                    ✓
                  </button>
                  <div className="flex-1">
                    <p className="text-gray-800 line-through">{todo.task}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Created: {formatDate(todo.created_at)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => deleteTodo(todo.todo_id)}
                  className="text-red-500 hover:text-red-700 ml-2 flex-shrink-0"
                  title="Delete task"
                >
                  🗑️
                </button>
              </div>
            ))}
            {completedTodos.length === 0 && !loading && (
              <p className="text-gray-500 text-center py-4">
                No completed tasks
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="mt-6 text-center">
        <button
          onClick={fetchTodos}
          disabled={loading}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:bg-gray-400"
        >
          {loading ? "Refreshing..." : "Refresh Tasks"}
        </button>
      </div>

      {/* API Info */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Powered by AWS Lambda & DynamoDB • User: {user.username}</p>
      </div>
    </div>
  );
};

export default TodoApp;
