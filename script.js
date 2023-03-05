{
    const tasks = [
        {
            name: "asdf",
            done: false,
        },
        {
            name: "ghjk",
            done: true,
        },
        {
            name: "adim",
            done: false,
        },
    ];

    const render = () => {

        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list--item">
                <span ${task.done ? " style=\"text-decoration: line-through\"" : ""}>${task.name}</span>
                <button class="js-delete delete">🗑</button>
                <button class="js-done done">✓</button>
            </li>
            `
        };

        document.querySelector(".js-list").innerHTML = htmlString;

        removeButton();
        taskDoneCheck();
    };

    const taskDoneCheck = () => {
        const doneButtons = document.querySelectorAll(".js-done");

        doneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                tasks[index].done = !tasks[index].done;
                render();
            });
        })
    };

    const removeButton = () => {
        const deleteButtons = document.querySelectorAll(".js-delete");

        deleteButtons.forEach((deleteButton, index) => {
            deleteButton.addEventListener("click", () => {
                tasks.splice(index, 1);
                render();
            });
        });
    };

    const addTask = () => {

        const newTask = document.querySelector(".js-button");

        newTask.addEventListener("click", (event) => {

            event.preventDefault();

            const newTaskName = document.querySelector(".js-input").value.trim();

            tasks.push({
                name: newTaskName,
                done: false,
            });

            render();
        });
    };

    const init = () => {
        addTask();
        render();
    };
    init();
}