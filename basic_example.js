const { createStore, combineReducers } = Redux;
const { Component } = React;
const { connect } = ReactRedux;

// Seclectors
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case "SHOW_ALL":
      return todos;
    case "SHOW_COMPLETED":
      return todos.filter(t => t.completed);
    case "SHOW_ACTIVE":
      return todos.filter(t => !t.completed);
  }
};

// Reducers

const todo = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case "TOGGLE_TODO":
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, todo(undefined, action)];
    case "TOGGLE_TODO":
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

const visibilityFilter = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter;
    default:
      return state;
  }
};

const todoApp = combineReducers({
  todos,
  visibilityFilter
});

// Action Creators

let nextTodoId = 0;
const addTodo = text => {
  return {
    type: "ADD_TODO",
    id: nextTodoId++,
    text
  };
};

const setVisibilityFilter = filter => {
  return {
    type: "SET_VISIBILITY_FILTER",
    filter
  };
};

const toggleTodo = id => {
  return {
    type: "TOGGLE_TODO",
    id
  };
};

// React

const Link = connect(mapStateToLinkProps, mapDispatchToLinkProps)((
  {
    active,
    children,
    onClick
  }
) => {
  if (active) {
    return <span>{children}</span>;
  }
  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
});

const mapStateToLinkProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  };
};

const mapDispatchToLinkProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter));
    }
  };
};

const Footer = () => (
  <p>
    Show:
    {" "}
    <Link filter="SHOW_ALL">
      All
    </Link>
    {" "}
    <Link filter="SHOW_ACTIVE">
      Active
    </Link>
    {" "}
    <Link filter="SHOW_COMPLETED">
      Completed
    </Link>
  </p>
);

const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? "line-through" : "none"
    }}
  >
    {text}
  </li>
);

const mapStateToTodoListProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  };
};

const mapDispatchToTodoListProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id));
    }
  };
};

const TodoList = connect(mapStateToTodoListProps, mapDispatchToTodoListProps)((
  {
    todos,
    onTodoClick
  }
) => (
  <ul>
    {todos.map(todo => (
      <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
    ))}
  </ul>
));

const AddTodo = connect()(({ dispatch }) => {
  let input;
  return (
    <div>
      <input
        ref={node => {
          input = node;
        }}
      />
      <button
        onClick={() => {
          dispatch(addTodo(input.value));
          input.value = "";
        }}
      >
        Add Todo
      </button>
    </div>
  );
});

const TodoApp = () => (
  <div>
    <AddTodo />
    <TodoList />
    <Footer />
  </div>
);

class Provider extends Component {
  getChildContext() {
    return {
      store: this.props.store
    };
  }
  render() {
    return this.props.children;
  }
}

Provider.childContextTypes = {
  store: React.PropTypes.object
};

ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <TodoApp />
  </Provider>,
  document.getElementById("root")
);
