import './main.html';
import './main.css';
import Sortable from 'sortablejs';

const tasks = [];

Meteor.startup(() => {
  const form = document.querySelector('.task-form');
  const taskList = document.querySelector('#task-list');

  new Sortable(taskList, {
    animation: 150
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const text = form.text.value.trim();
    const category = form.category.value;

    if (!text) return;

    tasks.push({
      text,
      category,
      completed: false
    });

    renderTasks();
    form.reset();
  });

  function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
      const li = document.createElement('li');

      if (task.category === 'Urgent') {
        li.style.borderLeft = '5px solid red';
      } else if (task.category === 'Personal') {
        li.style.borderLeft = '5px solid green';
      } else {
        li.style.borderLeft = '5px solid blue';
      }

      li.innerHTML = `
        <div>
          <input type="checkbox" ${task.completed ? 'checked' : ''}>
          <strong>${task.text}</strong>
          <span>[${task.category}]</span>
        </div>
        <button class="delete-btn">Delete</button>
      `;

      li.querySelector('input').addEventListener('change', () => {
        task.completed = !task.completed;
        renderTasks();
      });

      li.querySelector('.delete-btn').addEventListener('click', () => {
        tasks.splice(index, 1);
        renderTasks();
      });

      if (task.completed) {
        li.classList.add('completed');
      }

      taskList.appendChild(li);
    });
  }
});