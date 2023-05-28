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
    let allTasksDone = false;

    const allDoneCheck = () => {
        let amount = 0;
        for(let i = 0; i < tasks.length; i++){
            if(tasks[i].done === true){
                amount++
            };
        };

        if(amount === tasks.length){
            allTasksDone = true;
        }else{
            allTasksDone = false;
        };
        renderButtons();
    };

    const renderTasks = () => {

        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list--item" ${(task.done && hideCompleted) ? "style=\"display: none\"" : ""}>
                <span ${task.done ? " style=\"text-decoration: line-through\"" : ""}>${task.name}</span>
                <button class="js-delete delete task__button">🗑</button>
                <button class="js-done done task__button">✓</button>
            </li>
            <hr ${(task.done && hideCompleted) ? "style=\"display: none\"" : ""}>
            `
        };

        document.querySelector(".js-list").innerHTML = htmlString;

        bindToggleDoneEvents();
        bindRemoveEvents();
    };

    const renderButtons = () => {

        let htmlString = "";

        htmlString += `
        <button class="js-hide hide">${hideCompleted ? "Pokaż" : "Ukryj"} Ukończone</button>
        <button class="js-complete complete" ${allTasksDone ? "disabled" : ""}>Ukończ wszystkie</button>
        `;

        document.querySelector(".js-buttons-div").innerHTML = htmlString;

        bindButtonEvents();
    };

    const bindButtonEvents = () => {
        const hideButton = document.querySelector(".js-hide");
        const completeButton = document.querySelector(".js-complete");

        completeButton.addEventListener("click", (event) => {
            event.preventDefault();
            for(let i = 0; i < tasks.length; i++){
                if(tasks[i].done === false){
                    tasks[i].done = true;
                };
            };
            renderTasks();
            allDoneCheck();
            renderButtons();
        });

        hideButton.addEventListener("click", (event) => {
            event.preventDefault();

            hideCompleted = !hideCompleted;

            renderButtons();
            renderTasks();
        })
    };

    const bindToggleDoneEvents = () => {

        const doneButtons = document.querySelectorAll(".js-done");

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
                allDoneCheck();
                renderTasks();
            });
        })
    };

    const bindRemoveEvents = () => {

        const deleteButtons = document.querySelectorAll(".js-delete");

        deleteButtons.forEach((deleteButton, index) => {
            deleteButton.addEventListener("click", () => {
                tasks = [
                    ...tasks.slice(0,index),
                    ...tasks.slice(index + 1)
                ];
                renderTasks();
            });
        });
    };

    const bindAddTaskEvents = () => {

        const newTask = document.querySelector(".js-button");

        newTask.addEventListener("click", (event) => {

            event.preventDefault();

            const newTaskName = document.querySelector(".js-input").value.trim();

            if(newTaskName === ""){
                return;
            };

            tasks = [
                ...tasks,
                {name: newTaskName, done: false}
            ];

            document.querySelector(".js-input").value = "";

            renderTasks();
        });
    };

    const init = () => {
        renderTasks();
        renderButtons();

        bindButtonEvents();
        bindAddTaskEvents();
    };
    init();
};