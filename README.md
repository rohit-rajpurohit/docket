# DOCKET

DOCKET is a command-line (CLI) program to help you manage your daily tasks.
<div><kbd><img src="https://raw.githubusercontent.com/rohit-rajpurohit/DOCKET/main/Screenshots/S1.png" alt="Docket"/></kbd></div>

## Usage

### 1. Start/Help

To start the program execute the command without any arguments and for usage information with a single argument help.

```
$ ./task 
Usage :-
--------------------------------------------------------------------------------------------------------------
                                                                                                                      
$ ./task add 2 draw doodle   # Add a new task with priority 2 and text "draw doodle" to the list.\n 
$ ./task ls                  # Show incomplete tasks sorted by priority in ascending order.\n      
$ ./task del INDEX           # Delete the incomplete task with the given index.\n                       
$ ./task done INDEX          # Mark the incomplete task with the given index as complete.\n             
$ ./task report              # Statistics.\n
$ ./task help                # Show usage.                                                              
                                                                                                                      
--------------------------------------------------------------------------------------------------------------
```
### 2. List all pending tasks

Use the ls command to see all the tasks that are not yet complete, in ascending order of priority.

```
$ ./task ls
1. protect Ciri [2]
2. find Jaskier [5]
```

Index starts from 1, this is used to identify a particular task to complete or delete it.

### 3. Add a new task

Use the add command to add a new task to the list. The text of the task should be enclosed within double quotes (otherwise only the first word is considered as the task text, and the remaining words are treated as different arguments).

```
$ ./task add 1 "draw a witcher doodle"
Added task: "draw a witcher doodle" with priority 1
```

### 4. Delete a task

Use the del command to remove a task by its index.

```
$ ./task del 3
Deleted task with index 3
```

Attempting to delete a non-existent task displays an error message.

```
$ ./task del 5
Error: task with index 5 does not exist. Nothing deleted.
```

### 5. Mark a task as completed

Use the done command to mark a task as completed by its index.

```
$ ./task done 1
Task "exampleTask" has been completed.
```

Attempting to mark a non-existed task as completed displays an error message.

```
$ ./task done 5
Error: no incomplete task with index 5 exists.
```

### 6. Generate a report

Shows the number of complete and incomplete tasks in the list.

```
$ ./task report
2021-12-27

Pending : 2
1. draw a witcher doodle [1]
2. stay hydrated [4]

Completed : 1
1. study for exams
```

## Screenshots

![2.png](https://raw.githubusercontent.com/rohit-rajpurohit/DOCKET/main/Screenshots/S2.png)

![3.png](https://raw.githubusercontent.com/rohit-rajpurohit/DOCKET/main/Screenshots/S3.png)
