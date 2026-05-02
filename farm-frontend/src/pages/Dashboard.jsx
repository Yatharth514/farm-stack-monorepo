import { useState, useEffect } from 'react';
import apiClient from '../services/api';

const Dashboard = () => {
    // 1. State for the list of tasks
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // 2. YOUR State for the new task input!
    const [title, setTitle] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editingString, setEditingString] = useState("");


    // --- READ (Fetch Tasks) ---
    useEffect(() => {
        const fetchMyTodos = async () => {
            try {
                const response = await apiClient.get('/todos');
                // Safety check: Make sure we only set an array!
                if (Array.isArray(response.data)) {
                    setTodos(response.data);
                } else {
                    setTodos([]);
                }
            } catch (error) {
                console.error("Error fetching todos", error);
                setTodos([]);
            } finally {
                setIsLoading(false);
            }
        }
        fetchMyTodos();
    }, []);

    // --- CREATE (Your Function, upgraded!) ---
    const handleCreate = async (e) => {
        e.preventDefault();
        if (!title.trim()) return; // Prevent empty tasks

        try {
            // Send to FastAPI
            const response = await apiClient.post('/todos', { task: title, description: "" });

            // Instantly add it to the screen using the Spread Operator!
            const createdTodo = response.data;
            setTodos([...todos, createdTodo]);

            // Clear the input box
            setTitle("");

        } catch (error) {
            console.error("Failed to create task", error);
            alert("Failed to create task.");
        }
    };

    // --- DELETE ---
    const handleDelete = async (id) => {
        try {
            await apiClient.delete(`/todos/${id}`);
            // Instantly remove it from the screen
            setTodos(todos.filter((todo) => todo.id !== id && todo._id !== id));
        } catch (error) {
            console.error("Failed to delete task");
        }
    };

    const handleEdit = async (id) => {
        try {
            const response = await apiClient.patch(`/todos/${id}`, {
                task: editingString
            })

            setTodos(
                todos.map((todo) => {

                    if (todo.id === id || todo._id === id) {
                        return { ...todo, task: editingString };
                    }
                    else {
                        return todo
                    }
                }
                )
            )
            setEditingId(null);
        } catch (error) {
            console.error("Error", error);
        }

    };


    if (isLoading) return <h2>Loading your tasks...</h2>;

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1>My Dashboard</h1>

            {/* --- CREATE FORM --- */}
            <form onSubmit={handleCreate} style={{ display: 'flex', marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Enter the title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ flexGrow: 1, padding: '10px', marginRight: '10px' }}
                />
                <button type="submit" style={{ padding: '10px 20px' }}>Submit</button>
            </form>

            {/* --- THE LIST OF TASKS --- */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {todos.map((todo) => (
                    <div
                        key={todo.id || todo._id}
                        style={{
                            backgroundColor: '#1e1e1e',
                            padding: '15px',
                            borderRadius: '8px',
                            border: '1px solid #333',
                            display: 'flex',
                            justifyContent: 'space-between', // Fixed camelCase here
                            alignItems: 'center'
                        }}
                    >
                        {editingId === (todo.id || todo._id) ? (
                            <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                                <input
                                    type="text"
                                    value={editingString}
                                    onChange={(e) => setEditingString(e.target.value)}
                                    style={{ flexGrow: 1, padding: '5px' }}
                                />
                                <button onClick={() => handleEdit(todo.id || todo._id)}>Save</button>
                                <button onClick={() => setEditingId(null)}>Cancel</button>
                            </div>
                        ) : (
                            <>
                                <p style={{
                                    margin: 0,
                                    fontWeight: 'bold',
                                    color: '#ffffff', // Explicit hex for pure white
                                    fontSize: '18px',
                                    minHeight: '20px',
                                    display: 'block'
                                }}>
                                    {todo.task || "No Task Text Found"}
                                </p>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button
                                        onClick={() => { setEditingId(todo.id || todo._id); setEditingString(todo.task); }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(todo.id || todo._id)}
                                        style={{ cursor: 'pointer', color: '#ff4d4d' }}
                                    >
                                        Delete it!
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;