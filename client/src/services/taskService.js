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
  return await axios.post(apiEndpoint, task, config);
}

export async function deleteTask(id) {
  return await axios.delete(taskUrl);
}

export async function editTask(task) {
  return await axios.put(
    taskUrl(task.id),
    {
      title: task.title,
      content: task.content,
      status: task.status,
      icon: task.icon,
    },
    config
  );
}
