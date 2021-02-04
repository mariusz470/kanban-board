import axios from "axios";

const apiEndpoint = "/api/v1/tasks";

function taskUrl(id) {
  return `${apiEndpoint}/${id}`;
}

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export async function getTasks() {
  try {
    const res = await axios.get(apiEndpoint);
    const data = res.data.data;
    return data;
  } catch (error) {
    return error.response.data.error;
  }
}

export async function addTask(task) {
  try {
    const res = await axios.post(apiEndpoint, task, config);
    const data = res.data.data;
    return data;
  } catch (error) {
    return error.response.data.error;
  }
}

export async function deleteTask(id) {
  return await axios.delete(taskUrl(id));
}

export async function editTask(task) {
  try {
    const res = await axios.put(
      taskUrl(task._id),
      {
        title: task.title,
        content: task.content,
        status: task.status,
        icon: task.icon,
      },
      config
    );
    const data = res.data.data;
    return data;
  } catch (error) {
    return error.response.data.error;
  }
}
