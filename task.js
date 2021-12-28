const fs = require("fs"); // Import file system module
const process = require("process"); // Import process module

const colors = require("colors"); // Requiring colors module
const CFonts = require("cfonts"); //Requiring cfonts module

let args = process.argv; // Accessing arguments

let command = args[2];

// Display usage format
const info = () => {
  const name = CFonts.render("--Docket--", {
    font: "block",
    align: "center",
    colors: ["#880E4F", "#AA00FF"],
    space: false,
  });
  console.log(name.string);
  const greeting = CFonts.render(
    `Welcome to DOCKET !\nDOCKET manages the daily tasks you plan for your day.`,
    {
      font: "tiny",
      lineHeight: 2,
      align: "center",
      colors: ["white"],
      space: true,
    }
  );
  console.log(greeting.string);
  console.log(
    `   Usage :-
  --------------------------------------------------------------------------------------------------------------
                                                                                                                      
   $ ./task add 2 draw doodle   # Add a new task with priority 2 and text "draw doodle" to the list.\n 
   $ ./task ls                  # Show incomplete tasks sorted by priority in ascending order.\n      
   $ ./task del INDEX           # Delete the incomplete task with the given index.\n                       
   $ ./task done INDEX          # Mark the incomplete task with the given index as complete.\n             
   $ ./task report              # Statistics.\n
   $ ./task help                # Show usage.                                                              
                                                                                                                      
  --------------------------------------------------------------------------------------------------------------
    `.green
  );
};

// List command function
const pendingTasks = () => {
  currentDate = new Date();
  let dateString = currentDate.toISOString().substring(0, 10);
  console.log(dateString.yellow);
  fs.readFile("task.txt", (err, data) => {
    if (err) {
      console.log(`There are no pending tasks!`.blue);
    } else {
      let taskData = data.toString().split("\n");
      if (taskData == "") {
        console.log(`There are no pending tasks!`.blue);
      } else {
        taskData.sort();
        if (taskData[0] == "") {
          taskData.shift();
        }
        console.log(`\nPending : ${taskData.length}`.yellow);
        for (let i = 0; i < taskData.length; i++) {
          var temp = taskData[i].toString().split("");
          var task = taskData[i].toString().substring(1);
          console.log(`${i + 1}.${task} [${temp[0]}]`);
        }
      }
    }
  });
};

// Add pending tasks function
const add = () => {
  let p = args[3];
  let argument = args[4];
  if (p && argument) {
    let addTask = `\n${p} ${argument}`;
    fs.appendFile("task.txt", addTask, (err) => {
      if (err) throw err;
      else console.log(`Added task: "${argument}" with priority ${p}`.green);
    });
  } else {
    console.log(`Error: Missing tasks string. Nothing added!`.red);
  }
};

// Delete command function
const del = () => {
  let index = args[3];
  if (index) {
    fs.readFile("task.txt", (err, data) => {
      if (err)
        console.log(
          `Error: task with index #${index} does not exist. Nothing deleted.`
            .red
        );
      else {
        let taskData = data.toString().split("\n");
        taskData.sort();
        if (taskData[0] == "") {
          taskData.shift();
        }
        if (index > taskData.length || index < 1) {
          console.log(
            `Error: task with index #${index} does not exist. Nothing deleted.`
              .red
          );
        } else {
          taskData.splice(index - 1, 1);
          let newData = taskData.join("\n");
          fs.writeFile("task.txt", newData, (err) => {
            if (err) throw err;
            else console.log(`Deleted task #${index}`.green);
          });
        }
      }
    });
  } else {
    console.log(`Error: Missing NUMBER for deleting tasks.`.red);
  }
};

// Completed command function
const done = () => {
  let index = args[3];
  if (index) {
    fs.readFile("task.txt", (err, data) => {
      if (err)
        console.log(
          `Error: no incomplete item with index #${index} exists.`.red
        );
      else {
        let taskData = data.toString().split("\n");
        taskData.sort();
        if (index > taskData.length || index < 1)
          console.log(`Error: no incomplete item with index #${index} exists.`);
        else {
          if (taskData[0] == "") taskData.shift();
          let doneTask = taskData[index - 1].slice(1).trim();
          fs.appendFile("completed.txt", doneTask + "\n", (err) => {
            if (err) throw err;
            else console.log(`Task "${doneTask}" has been completed.`.green);
          });
          taskData.splice(index - 1, 1);
          let newData = taskData.join("\n");
          fs.writeFile("task.txt", newData, (err) => {
            if (err) throw err;
          });
        }
      }
    });
  } else {
    console.log(`Error: Missing NUMBER for marking tasks as done.`);
  }
};

//List completed tasks function
const completedTask = () => {
  fs.readFile("completed.txt", (err, data) => {
    if (err) {
      console.log(`There are no completed tasks!`.blue);
    } else {
      let ctaskData = data.toString().split("\n");
      if (ctaskData == "") {
        console.log(`There are no completed tasks!`.blue);
      } else {
        ctaskData.pop();
        console.log(`\nCompleted : ${ctaskData.length}`.yellow);
        for (let k = 0; k < ctaskData.length; k++) {
          var cTask = ctaskData[k];
          console.log(`${k + 1}. ${cTask}`);
        }
      }
    }
  });
};

//Report function
const report = () => {
  pendingTasks();
  completedTask();
};

//Switch case for checking all commands
switch (command) {
  case "help":
    info();
    break;
  case "ls":
    pendingTasks();
    break;
  case "add":
    add();
    break;
  case "del":
    del();
    break;
  case "done":
    done();
    break;
  case "report":
    report();
    break;
  default:
    info();
}
