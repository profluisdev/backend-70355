
export const Task = ({ _id, task, status, changeStatus, deleteTask }) => {
  console.log(_id);
  return (
    <div className="d-flex col mt-2 p-2 align-items-center justify-content-between border border-2 ">
      <p style={status ? { textDecoration: "line-through" } : {}}> {task} </p>
      <div>
        <button className="btn btn-success mx-2" onClick={() => changeStatus(_id)}>Realizado</button>
        <button className="btn btn-danger mx-2" onClick={() => deleteTask(_id)}>Eliminar</button>
      </div>
    </div>
  );
};
