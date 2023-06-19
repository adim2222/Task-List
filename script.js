{
    let tasks = [
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

    let hideCompleted = false;

    const renderTasks = () => {

        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list--item" style="border-bottom: solid black 2px; ${(task.done && hideCompleted) ? "display: none" : ""}">
                <span ${task.done ? " style=\"text-decoration: line-through\"" : ""}>${task.name}</span>
                <button class="js-delete delete task__button">🗑</button>
                <button class="js-done done task__button">${(task.done) ? "✓" : ""}</button>
            </li>
            `
        };

        document.querySelector(".js-list").innerHTML = htmlString;

        bindToggleDoneEvents();
        bindRemoveEvents();
    };

    const renderButtons = () => {

        let htmlString = "<div class=\"list__label\">Lista zadań</div>";

        htmlString += `
        <button class="js-hide hide">${hideCompleted ? "Pokaż" : "Ukryj"} Ukończone</button>
        <button class="js-complete complete" ${tasks.every(({done}) => done) ? "disabled" : ""}>Ukończ wszystkie</button>
        `;

        document.querySelector(".js-buttons-div").innerHTML = htmlString;

        hideButtonEvents();
        completeButtonEvents();
    };

    const hideButtonEvents = () => {
        const hideButton = document.querySelector(".js-hide");

        hideButton.addEventListener("click", (event) => {
            event.preventDefault();
            hideTasks();
        });
    };

    const hideTasks = () => {
        hideCompleted = !hideCompleted;

        renderButtons();
        renderTasks();
    };

    const completeButtonEvents = () => {
        
        const completeButton = document.querySelector(".js-complete");

        completeButton.addEventListener("click", (event) => {
            event.preventDefault();
            completeAllTasks();
        });
    };

    const completeAllTasks = () => {
        for(let i = 0; i < tasks.length; i++){
            if(tasks[i].done === false){
                tasks[i].done = true;
            };
        };
        renderButtons();
        renderTasks();
    };

    const bindToggleDoneEvents = () => {
        const doneButtons = document.querySelectorAll(".js-done");
        toggleDone(doneButtons);
    };

    const toggleDone = (doneButtons) => {
        doneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                tasks = [
                    ...tasks.slice(0, index),
                    {
                      ...tasks[index],
                      done: !tasks[index].done,
                    },
                    ...tasks.slice(index + 1),
                ];
                renderTasks();
                renderButtons();
            });
        })
    };

    const bindRemoveEvents = () => {

        const deleteButtons = document.querySelectorAll(".js-delete");

        deleteButtons.forEach((deleteButton, index) => {
            deleteButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(0,index),
            ...tasks.slice(index + 1)
        ];
        renderTasks();
    };

    const bindAddTaskEvents = () => {

        const newTask = document.querySelector(".js-button");

        newTask.addEventListener("click", (event) => {
            event.preventDefault();
            const newTaskName = document.querySelector(".js-input").value.trim();
            if(newTaskName === ""){
                return;
            };
            addTask(newTaskName);
            document.querySelector(".js-input").value = "";
        });
    };

    const addTask = (newTaskName) => {
            tasks = [
                ...tasks,
                {name: newTaskName, done: false}
            ];
            renderTasks();
    };

    const init = () => {
        renderTasks();
        renderButtons();

        hideButtonEvents();
        completeButtonEvents();
        bindAddTaskEvents();
    };
    init();
};